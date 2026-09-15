import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  onSnapshot,
  serverTimestamp,
  type Unsubscribe
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from '../config';
import type { Driver } from '../../types';

const COLLECTION = 'drivers';

export const deliveryService = {
  subscribe(onUpdate: (drivers: Driver[]) => void, onError?: (error: Error) => void): Unsubscribe {
    if (!isFirebaseConfigured() || !db) {
      if (onError) onError(new Error('Firebase Firestore is not configured.'));
      onUpdate([]);
      return () => {};
    }

    try {
      const colRef = collection(db, COLLECTION);
      return onSnapshot(
        colRef,
        (snapshot) => {
          if (snapshot.empty) {
            onUpdate([]);
            return;
          }

          const drivers: Driver[] = [];
          snapshot.forEach((d) => {
            const data = d.data();
            const idVal = typeof data.id === 'number' ? data.id : Number(d.id) || Date.now();
            drivers.push({
              ...data,
              id: idVal,
              name: data.name || 'Unnamed Driver',
              mobile: data.mobile || data.phone || '9876543210',
              phone: data.phone || data.mobile || '9876543210',
              vehicleNo: data.vehicleNo || data.vehicleNumber || 'MH12 AB 9999',
              vehicleNumber: data.vehicleNumber || data.vehicleNo || 'MH12 AB 9999',
              vehicleType: data.vehicleType || data.vehicleModel || 'Tata Ace (1.5 Ton)',
              zone: data.zone || 'Kharadi',
              assignedOrdersCount: Number(data.assignedOrdersCount ?? 0),
              totalDeliveries: Number(data.totalDeliveries ?? 0),
              rating: Number(data.rating ?? 5.0),
              avatar: data.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
              status: (data.status === 'Inactive' || data.status === 'On Leave') ? data.status : 'Active'
            } as Driver);
          });

          onUpdate(drivers);
        },
        (error) => {
          console.error('deliveryService snapshot error:', error);
          if (onError) onError(error);
          onUpdate([]);
        }
      );
    } catch (err: any) {
      console.error('deliveryService subscribe exception:', err);
      if (onError) onError(err);
      onUpdate([]);
      return () => {};
    }
  },

  async getAll(): Promise<Driver[]> {
    if (!isFirebaseConfigured() || !db) return [];
    try {
      const colRef = collection(db, COLLECTION);
      const snap = await getDocs(colRef);
      return snap.docs.map((d) => ({
        ...d.data(),
        id: typeof d.data().id === 'number' ? d.data().id : Number(d.id) || Date.now()
      })) as Driver[];
    } catch (e) {
      console.error('deliveryService.getAll error:', e);
      return [];
    }
  },

  async add(driver: Partial<Driver>): Promise<number> {
    const id = typeof driver.id === 'number' ? driver.id : Date.now();
    const docId = String(id);
    const newDriver: any = {
      ...driver,
      id,
      name: driver.name || 'Unnamed Driver',
      mobile: driver.mobile || (driver as any).phone || '9876543210',
      vehicleNo: driver.vehicleNo || (driver as any).vehicleNumber || 'MH12 AB 9999',
      zone: driver.zone || 'Kharadi',
      totalDeliveries: Number(driver.totalDeliveries ?? 0),
      rating: Number(driver.rating ?? 5.0),
      avatar: driver.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
      status: driver.status || 'Active',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };

    if (isFirebaseConfigured() && db) {
      const docRef = doc(db, COLLECTION, docId);
      await setDoc(docRef, newDriver, { merge: true });
      const verifySnap = await getDoc(docRef);
      if (!verifySnap.exists()) {
        throw new Error(`Failed to verify driver document ${docId} in Firestore`);
      }
    }

    return id;
  },

  async update(id: number | string, data: Partial<Driver>): Promise<void> {
    const docId = String(id);
    if (isFirebaseConfigured() && db) {
      const docRef = doc(db, COLLECTION, docId);
      await updateDoc(docRef, {
        ...data,
        updatedAt: serverTimestamp()
      });
      const verifySnap = await getDoc(docRef);
      if (!verifySnap.exists()) {
        throw new Error(`Driver ${docId} not found in Firestore after update`);
      }
    }
  },

  async delete(id: number | string): Promise<void> {
    const docId = String(id);
    if (isFirebaseConfigured() && db) {
      const docRef = doc(db, COLLECTION, docId);
      await deleteDoc(docRef);
    }
  }
};
