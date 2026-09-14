import {
  collection,
  doc,
  setDoc,
  getDocs,
  deleteDoc,
  onSnapshot,
  serverTimestamp,
  type Unsubscribe
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from '../config';

export interface Farmer {
  id: string | number;
  name: string;
  phone: string;
  village?: string;
  district?: string;
  produceTypes?: string[];
  bankAccount?: string;
  status?: 'Active' | 'Inactive';
  rating?: number;
  createdAt?: any;
}

const COLLECTION = 'farmers';

export const farmerService = {
  subscribe(onUpdate: (farmers: Farmer[]) => void): Unsubscribe {
    if (!isFirebaseConfigured() || !db) return () => {};

    try {
      const colRef = collection(db, COLLECTION);
      return onSnapshot(
        colRef,
        (snapshot) => {
          const list: Farmer[] = [];
          snapshot.forEach((d) => list.push({ ...d.data(), id: d.id } as Farmer));
          onUpdate(list);
        },
        (err) => console.warn('farmerService snapshot error:', err)
      );
    } catch (err) {
      console.error('farmerService error:', err);
      return () => {};
    }
  },

  async add(farmer: Partial<Farmer>): Promise<string> {
    const docId = String(farmer.id || Date.now());
    if (isFirebaseConfigured() && db) {
      try {
        await setDoc(doc(db, COLLECTION, docId), {
          ...farmer,
          id: docId,
          createdAt: serverTimestamp()
        }, { merge: true });
      } catch (err) {
        console.error('farmerService.add error:', err);
      }
    }
    return docId;
  },

  async delete(id: string | number): Promise<void> {
    if (isFirebaseConfigured() && db) {
      try {
        await deleteDoc(doc(db, COLLECTION, String(id)));
      } catch (err) {
        console.error('farmerService.delete error:', err);
      }
    }
  }
};
