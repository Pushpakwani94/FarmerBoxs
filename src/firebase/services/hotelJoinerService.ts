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
import type { Joiner } from '../../types';

const COLLECTION = 'joiners';

export const hotelJoinerService = {
  subscribe(onUpdate: (joiners: Joiner[]) => void, onError?: (error: Error) => void): Unsubscribe {
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

          const joiners: Joiner[] = [];
          snapshot.forEach((d) => {
            const data = d.data();
            const idVal = typeof data.id === 'number' ? data.id : Number(d.id) || Date.now();
            joiners.push({
              ...data,
              id: idVal,
              joinerCode: data.joinerCode || `JN0${idVal.toString().slice(-2)}`,
              name: data.name || 'Unnamed Joiner',
              mobile: data.mobile || data.phone || '9876543210',
              phone: data.phone || data.mobile || '9876543210',
              email: data.email || `${(data.name || 'joiner').toLowerCase().replace(/\s+/g, '')}@farmerbox.in`,
              zone: data.zone || 'Kharadi',
              totalHotels: Number(data.totalHotels ?? data.hotelsCount ?? 0),
              hotelsCount: Number(data.hotelsCount ?? data.totalHotels ?? 0),
              totalOrders: Number(data.totalOrders ?? 0),
              activeOrdersToday: Number(data.activeOrdersToday ?? 0),
              totalEarnings: Number(data.totalEarnings ?? data.commissionEarned ?? 0),
              commissionEarned: Number(data.commissionEarned ?? data.totalEarnings ?? 0),
              paidAmount: Number(data.paidAmount ?? 0),
              pendingAmount: Number(data.pendingAmount ?? 0),
              status: data.status === 'Inactive' ? 'Inactive' : 'Active',
              avatar: data.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
              joinedDate: data.joinedDate || 'Just now'
            } as Joiner);
          });

          onUpdate(joiners);
        },
        (error) => {
          console.error('hotelJoinerService snapshot error:', error);
          if (onError) onError(error);
          onUpdate([]);
        }
      );
    } catch (err: any) {
      console.error('hotelJoinerService subscribe exception:', err);
      if (onError) onError(err);
      onUpdate([]);
      return () => {};
    }
  },

  async getAll(): Promise<Joiner[]> {
    if (!isFirebaseConfigured() || !db) return [];
    try {
      const colRef = collection(db, COLLECTION);
      const snap = await getDocs(colRef);
      return snap.docs.map((d) => ({
        ...d.data(),
        id: typeof d.data().id === 'number' ? d.data().id : Number(d.id) || Date.now()
      })) as Joiner[];
    } catch (e) {
      console.error('hotelJoinerService.getAll error:', e);
      return [];
    }
  },

  async add(joiner: Partial<Joiner>): Promise<number> {
    const id = typeof joiner.id === 'number' ? joiner.id : Date.now();
    const docId = String(id);
    const newJoiner: any = {
      ...joiner,
      id,
      joinerCode: joiner.joinerCode || `JN0${id.toString().slice(-2)}`,
      name: joiner.name || 'Unnamed Joiner',
      mobile: joiner.mobile || (joiner as any).phone || '9876543210',
      email: joiner.email || '',
      zone: joiner.zone || 'Kharadi',
      totalHotels: Number(joiner.totalHotels ?? (joiner as any).hotelsCount ?? 0),
      totalOrders: Number(joiner.totalOrders ?? 0),
      totalEarnings: Number(joiner.totalEarnings ?? (joiner as any).commissionEarned ?? 0),
      paidAmount: Number(joiner.paidAmount ?? 0),
      pendingAmount: Number(joiner.pendingAmount ?? 0),
      status: joiner.status || 'Active',
      avatar: joiner.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      joinedDate: joiner.joinedDate || 'Just now',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };

    if (isFirebaseConfigured() && db) {
      const docRef = doc(db, COLLECTION, docId);
      await setDoc(docRef, newJoiner, { merge: true });
      const verifySnap = await getDoc(docRef);
      if (!verifySnap.exists()) {
        throw new Error(`Failed to verify joiner document ${docId} in Firestore`);
      }
    }

    return id;
  },

  async update(id: number | string, data: Partial<Joiner>): Promise<void> {
    const docId = String(id);
    if (isFirebaseConfigured() && db) {
      const docRef = doc(db, COLLECTION, docId);
      await updateDoc(docRef, {
        ...data,
        updatedAt: serverTimestamp()
      });
      const verifySnap = await getDoc(docRef);
      if (!verifySnap.exists()) {
        throw new Error(`Joiner ${docId} not found in Firestore after update`);
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
