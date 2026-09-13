import {
  collection,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  getDocs,
  writeBatch,
  type Unsubscribe,
  type DocumentData
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
  | 'settings';

// Helper for local storage fallback
const getLocalCollection = <T>(name: CollectionName, defaultData: T[]): T[] => {
  if (typeof window === 'undefined') return defaultData;
  try {
    const saved = localStorage.getItem(`farmerbox_${name}`);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.warn(`Error reading local ${name}`, e);
  }
  return defaultData;
};

const saveLocalCollection = <T>(name: CollectionName, data: T[]): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(`farmerbox_${name}`, JSON.stringify(data));
  } catch (e) {
    console.warn(`Error writing local ${name}`, e);
  }
};

/**
 * Real-time collection subscription with Firebase Firestore and LocalStorage fallback.
 */
export const subscribeToCollection = <T extends { id?: string | number }>(
  collectionName: CollectionName,
  fallbackData: T[],
  onUpdate: (data: T[]) => void
): Unsubscribe => {
  if (!isFirebaseConfigured() || !db) {
    // Provide initial local data
    const localData = getLocalCollection(collectionName, fallbackData);
    onUpdate(localData);

    // Listen to local storage changes for cross-tab sync
    const handleStorage = (e: StorageEvent) => {
      if (e.key === `farmerbox_${collectionName}` && e.newValue) {
        try {
          onUpdate(JSON.parse(e.newValue));
        } catch {
          // ignore
        }
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }

  try {
    const colRef = collection(db, collectionName);
    const unsubscribe = onSnapshot(
      colRef,
      (snapshot) => {
        if (snapshot.empty) {
          // Fallback to local or initial if Firestore collection is completely empty
          const localData = getLocalCollection(collectionName, fallbackData);
          onUpdate(localData);
          return;
        }

        const items: T[] = [];
        snapshot.forEach((docSnap) => {
          const docData = docSnap.data() as DocumentData;
          items.push({
            id: docSnap.id,
            ...docData
          } as unknown as T);
        });

        // Also update local cache
        saveLocalCollection(collectionName, items);
        onUpdate(items);
      },
      (error) => {
        console.warn(`Firestore subscription error on ${collectionName}:`, error);
        onUpdate(getLocalCollection(collectionName, fallbackData));
      }
    );

    return unsubscribe;
  } catch (err) {
    console.error(`Failed to subscribe to ${collectionName}:`, err);
    onUpdate(getLocalCollection(collectionName, fallbackData));
    return () => {};
  }
};

/**
 * Add or update a document in Firestore & local cache
 */
export const saveRecord = async <T extends { id?: string | number }>(
  collectionName: CollectionName,
  record: T,
  customId?: string
): Promise<string> => {
  const docId = customId || (record.id ? String(record.id) : `doc_${Date.now()}`);

  if (isFirebaseConfigured() && db) {
    try {
      const docRef = doc(db, collectionName, docId);
      await setDoc(docRef, { ...record, id: docId }, { merge: true });
      return docId;
    } catch (e) {
      console.error(`Failed to write ${collectionName} to Firebase:`, e);
    }
  }

  // Local storage fallback
  const items = getLocalCollection<T>(collectionName, []);
  const existingIdx = items.findIndex((i) => String(i.id) === docId);
  const updatedRecord = { ...record, id: docId };

  if (existingIdx >= 0) {
    items[existingIdx] = updatedRecord;
  } else {
    items.unshift(updatedRecord);
  }
  saveLocalCollection(collectionName, items);
  return docId;
};

/**
 * Delete a document from Firestore & local cache
 */
export const deleteRecord = async (
  collectionName: CollectionName,
  id: string | number
): Promise<boolean> => {
  const docId = String(id);

  if (isFirebaseConfigured() && db) {
    try {
      const docRef = doc(db, collectionName, docId);
      await deleteDoc(docRef);
      return true;
    } catch (e) {
      console.error(`Failed to delete ${collectionName} from Firebase:`, e);
    }
  }

  // Local storage fallback
  const items = getLocalCollection(collectionName, []);
  const filtered = items.filter((i: any) => String(i.id) !== docId);
  saveLocalCollection(collectionName, filtered);
  return true;
};

/**
 * Seed live Firestore Database with all core FarmerBox records
 */
export const seedFirestoreDatabase = async (): Promise<{
  success: boolean;
  counts: Record<string, number>;
  message: string;
}> => {
  if (!isFirebaseConfigured() || !db) {
    // Seed locally if Firebase isn't configured
    saveLocalCollection('orders', initialOrders);
    saveLocalCollection('zones', initialZones);
    saveLocalCollection('joiners', initialJoiners);
    saveLocalCollection('hotels', initialHotels);
    saveLocalCollection('drivers', initialDriversList);
    saveLocalCollection('products', initialProductsList);
    saveLocalCollection('payments', initialPayments);
    saveLocalCollection('notifications', initialNotifications);

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
      message: 'Database seeded to local persistent storage (Firebase credentials not yet provided).'
    };
  }

  try {
    const batch = writeBatch(db);
    let totalItems = 0;

    // 1. Zones
    initialZones.forEach((item) => {
      const ref = doc(db!, 'zones', String(item.id));
      batch.set(ref, item);
      totalItems++;
    });

    // 2. Joiners
    initialJoiners.forEach((item) => {
      const ref = doc(db!, 'joiners', String(item.id));
      batch.set(ref, item);
      totalItems++;
    });

    // 3. Hotels
    initialHotels.forEach((item) => {
      const ref = doc(db!, 'hotels', String(item.id));
      batch.set(ref, item);
      totalItems++;
    });

    // 4. Drivers
    initialDriversList.forEach((item) => {
      const ref = doc(db!, 'drivers', String(item.id));
      batch.set(ref, item);
      totalItems++;
    });

    // 5. Products
    initialProductsList.forEach((item) => {
      const ref = doc(db!, 'products', String(item.id));
      batch.set(ref, item);
      totalItems++;
    });

    // 6. Orders
    initialOrders.forEach((item) => {
      const ref = doc(db!, 'orders', String(item.id));
      batch.set(ref, item);
      totalItems++;
    });

    // 7. Payments
    initialPayments.forEach((item) => {
      const ref = doc(db!, 'payments', String(item.id));
      batch.set(ref, item);
      totalItems++;
    });

    // 8. Notifications
    initialNotifications.forEach((item) => {
      const ref = doc(db!, 'notifications', String(item.id));
      batch.set(ref, item);
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
