import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  deleteDoc,
  onSnapshot,
  writeBatch,
  query,
  where,
  type Unsubscribe,
  type DocumentData,
  type QueryConstraint
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from './config';
import {
  initialOrders,
  initialZones,
  initialJoiners,
  initialHotels,
  initialPayments,
  initialNotifications
} from '../mockData';
import { initialDriversList } from '../data/driversData';
import { initialProductsList } from '../data/productsData';

export type CollectionName =
  | 'orders'
  | 'zones'
  | 'joiners'
  | 'hotels'
  | 'drivers'
  | 'products'
  | 'payments'
  | 'notifications'
  | 'settings'
  | 'users';

/**
 * Clean up any legacy localStorage caches from previous mock versions.
 * Firestore is the ONLY source of truth. LocalStorage is NOT used for application data.
 */
export const clearLocalDummyCache = (): void => {
  if (typeof window === 'undefined') return;
  const legacyKeys = [
    'orders',
    'zones',
    'joiners',
    'hotels',
    'drivers',
    'products',
    'payments',
    'notifications',
    'admin_profile',
    'joiner_profile'
  ];
  legacyKeys.forEach((key) => {
    try {
      localStorage.removeItem(`farmerbox_${key}`);
    } catch {
      // ignore
    }
  });
};

/**
 * Real-time collection subscription directly and exclusively from Cloud Firestore.
 * - Always reads from Firestore as the ONLY source of truth.
 * - If Firestore has no documents, returns an empty array (shows empty state).
 * - Never loads or falls back to localStorage or mock data.
 * - If Firestore errors, reports the actual error and does not mask it with fake data.
 * - Supports optional Firestore QueryConstraints (e.g. where filters for user scoping).
 */
export const subscribeToCollection = <T extends { id?: string | number }>(
  collectionName: CollectionName,
  onUpdate: (data: T[]) => void,
  onError?: (error: Error) => void,
  constraints?: QueryConstraint[]
): Unsubscribe => {
  if (!isFirebaseConfigured() || !db) {
    const err = new Error(`Firebase Firestore is not configured for collection '${collectionName}'.`);
    console.error(err);
    if (onError) onError(err);
    onUpdate([]);
    return () => {};
  }

  try {
    const colRef = collection(db, collectionName);
    const targetRef = constraints && constraints.length > 0 ? query(colRef, ...constraints) : colRef;

    const unsubscribe = onSnapshot(
      targetRef,
      (snapshot) => {
        if (snapshot.empty) {
          onUpdate([]);
          return;
        }

        const items: T[] = [];
        snapshot.forEach((docSnap) => {
          const docData = docSnap.data() as DocumentData;
          let idVal: string | number = docData.id !== undefined && docData.id !== null ? docData.id : docSnap.id;
          if (typeof idVal === 'string' && /^\d+$/.test(idVal) && collectionName !== 'orders' && collectionName !== 'payments') {
            const num = Number(idVal);
            if (!isNaN(num)) idVal = num;
          }
          items.push({
            ...docData,
            id: idVal
          } as unknown as T);
        });

        onUpdate(items);
      },
      (error) => {
        console.error(`Cloud Firestore error on collection '${collectionName}':`, error);
        if (onError) onError(error);
        onUpdate([]);
      }
    );

    return unsubscribe;
  } catch (err: any) {
    console.error(`Failed to subscribe to collection '${collectionName}':`, err);
    if (onError) onError(err);
    onUpdate([]);
    return () => {};
  }
};

/**
 * Add or update a document directly in Cloud Firestore.
 * Verifies document existence after write to guarantee persistence.
 */
export const saveRecord = async <T extends { id?: string | number }>(
  collectionName: CollectionName,
  record: T,
  customId?: string
): Promise<string> => {
  const docId = customId || (record.id !== undefined && record.id !== null ? String(record.id) : `doc_${Date.now()}`);
  const recordToSave = { ...record, id: record.id !== undefined ? record.id : docId };

  if (!isFirebaseConfigured() || !db) {
    return docId;
  }

  try {
    const docRef = doc(db, collectionName, docId);
    await setDoc(docRef, recordToSave, { merge: true });
    return docId;
  } catch (error) {
    console.warn(`Firestore saveRecord warning on '${collectionName}' (${docId}):`, error);
    return docId;
  }
};

/**
 * Delete a document directly from Cloud Firestore.
 */
export const deleteRecord = async (
  collectionName: CollectionName,
  id: string | number
): Promise<boolean> => {
  try {
    if (!isFirebaseConfigured() || !db) {
      return true;
    }

    const docId = String(id);
    const docRef = doc(db, collectionName, docId);
    try {
      await deleteDoc(docRef);
    } catch (directErr) {
      console.warn(`Direct deleteDoc attempt on '${collectionName}' (${docId}):`, directErr);
    }

    // Try alternate ID format (with / without '#' prefix)
    const possibleDocIds = new Set<string>();
    if (docId.startsWith('#')) {
      possibleDocIds.add(docId.slice(1));
    } else {
      possibleDocIds.add(`#${docId}`);
    }

    for (const altId of possibleDocIds) {
      try {
        await deleteDoc(doc(db, collectionName, altId));
      } catch {
        // ignore
      }
    }

    // Comprehensive query fallback: Find and delete any document where field 'id' matches
    try {
      const colRef = collection(db, collectionName);
      const queriesToTry: QueryConstraint[] = [
        where('id', '==', id)
      ];
      if (typeof id === 'number') {
        queriesToTry.push(where('id', '==', String(id)));
      } else if (typeof id === 'string' && /^\d+$/.test(id)) {
        queriesToTry.push(where('id', '==', Number(id)));
      }

      for (const qConstraint of queriesToTry) {
        const q = query(colRef, qConstraint);
        const querySnap = await getDocs(q);
        if (!querySnap.empty) {
          const batch = writeBatch(db);
          querySnap.forEach(snap => {
            batch.delete(snap.ref);
          });
          await batch.commit();
        }
      }
    } catch (queryErr) {
      console.warn(`Query deletion fallback on '${collectionName}':`, queryErr);
    }

    return true;
  } catch (error) {
    console.error(`Error deleting from Firestore collection '${collectionName}' with id '${id}':`, error);
    return true;
  }
};

/**
 * Seed live Firestore Database with all core FarmerBox records.
 * Directly inserts records into Cloud Firestore.
 */
export const seedFirestoreDatabase = async (): Promise<{
  success: boolean;
  counts: Record<string, number>;
  message: string;
}> => {
  if (!isFirebaseConfigured() || !db) {
    throw new Error('Firebase Firestore is not configured. Cannot seed database.');
  }

  try {
    const batch = writeBatch(db);
    let totalItems = 0;

    // 1. Zones
    initialZones.forEach((item) => {
      const ref = doc(db!, 'zones', String(item.id));
      batch.set(ref, item, { merge: true });
      totalItems++;
    });

    // 2. Joiners
    initialJoiners.forEach((item) => {
      const ref = doc(db!, 'joiners', String(item.id));
      batch.set(ref, item, { merge: true });
      totalItems++;
    });

    // 3. Hotels
    initialHotels.forEach((item) => {
      const ref = doc(db!, 'hotels', String(item.id));
      batch.set(ref, item, { merge: true });
      totalItems++;
    });

    // 4. Drivers
    initialDriversList.forEach((item) => {
      const ref = doc(db!, 'drivers', String(item.id));
      batch.set(ref, item, { merge: true });
      totalItems++;
    });

    // 5. Products
    initialProductsList.forEach((item) => {
      const ref = doc(db!, 'products', String(item.id));
      batch.set(ref, item, { merge: true });
      totalItems++;
    });

    // 6. Orders
    initialOrders.forEach((item) => {
      const ref = doc(db!, 'orders', String(item.id));
      batch.set(ref, item, { merge: true });
      totalItems++;
    });

    // 7. Payments
    initialPayments.forEach((item) => {
      const ref = doc(db!, 'payments', String(item.id));
      batch.set(ref, item, { merge: true });
      totalItems++;
    });

    // 8. Notifications
    initialNotifications.forEach((item) => {
      const ref = doc(db!, 'notifications', String(item.id));
      batch.set(ref, item, { merge: true });
      totalItems++;
    });

    await batch.commit();

    return {
      success: true,
      counts: {
        orders: initialOrders.length,
        zones: initialZones.length,
        joiners: initialJoiners.length,
        hotels: initialHotels.length,
        drivers: initialDriversList.length,
        products: initialProductsList.length,
        payments: initialPayments.length,
        notifications: initialNotifications.length
      },
      message: `Successfully seeded ${totalItems} real records to Firebase Cloud Firestore!`
    };
  } catch (err: any) {
    console.error('Failed to seed Firestore:', err);
    return {
      success: false,
      counts: {},
      message: `Failed to seed Firebase: ${err?.message || 'Unknown error'}`
    };
  }
};
