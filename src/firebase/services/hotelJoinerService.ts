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
import type { Joiner } from '../../types';
import { initialJoiners } from '../../mockData';

const COLLECTION = 'joiners';

const getLocalJoiners = (): Joiner[] => {
  if (typeof window === 'undefined') return initialJoiners;
  try {
    const saved = localStorage.getItem(`farmerbox_${COLLECTION}`);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.warn('Local read error', e);
  }
  return initialJoiners;
};

const saveLocalJoiners = (items: Joiner[]): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(`farmerbox_${COLLECTION}`, JSON.stringify(items));
  } catch (e) {
    console.warn('Local write error', e);
  }
};

export const hotelJoinerService = {
  subscribe(onUpdate: (joiners: Joiner[]) => void): Unsubscribe {
    const cached = getLocalJoiners();
    if (cached.length > 0) onUpdate(cached);

    if (!isFirebaseConfigured() || !db) return () => {};

    try {
      const colRef = collection(db, COLLECTION);
      return onSnapshot(
        colRef,
        (snapshot) => {
          if (snapshot.empty) {
            const local = getLocalJoiners();
            if (local.length > 0) {
              onUpdate(local);
            } else {
              onUpdate([]);
            }
            return;
          }

          const joiners: Joiner[] = [];
          snapshot.forEach((d) => {
            const data = d.data();
            const idVal = typeof data.id === 'number' ? data.id : Number(d.id) || Date.now();
            joiners.push({
              ...data,
              id: idVal,
              joinerCode: data.joinerCode || `JN0${idVal}`,
              name: data.name || 'Joiner',
              mobile: data.mobile || '+91 98000 00000',
              email: data.email || 'joiner@example.com',
              zone: data.zone || 'Kharadi',
              totalHotels: Number(data.totalHotels ?? 0),
              totalOrders: Number(data.totalOrders ?? 0),
              totalEarnings: Number(data.totalEarnings ?? 0),
              paidAmount: Number(data.paidAmount ?? 0),
              pendingAmount: Number(data.pendingAmount ?? 0),
              status: data.status || 'Active',
              avatar: data.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
              joinedDate: data.joinedDate || 'Recent'
            } as Joiner);
          });

          saveLocalJoiners(joiners);
          onUpdate(joiners);
        },
        (err) => {
          console.warn('hotelJoinerService snapshot error:', err);
          onUpdate(getLocalJoiners());
        }
      );
    } catch (err) {
      console.error('hotelJoinerService error:', err);
      onUpdate(getLocalJoiners());
      return () => {};
    }
  },

  async add(joiner: Partial<Joiner>): Promise<Joiner> {
    const id = joiner.id || Date.now();
    const docId = String(id);
    const newJoiner: Joiner = {
      id,
      joinerCode: joiner.joinerCode || `JN0${id}`,
      name: joiner.name || 'New Joiner',
      mobile: joiner.mobile || '+91 98000 00000',
      email: joiner.email || `${(joiner.name || 'joiner').toLowerCase().replace(/\s+/g, '')}@example.com`,
      zone: joiner.zone || 'Kharadi',
      totalHotels: Number(joiner.totalHotels ?? 0),
      totalOrders: Number(joiner.totalOrders ?? 0),
      totalEarnings: Number(joiner.totalEarnings ?? 0),
      paidAmount: Number(joiner.paidAmount ?? 0),
      pendingAmount: Number(joiner.pendingAmount ?? 0),
      status: joiner.status || 'Active',
      avatar: joiner.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
      joinedDate: 'Just now'
    };

    const local = getLocalJoiners();
    saveLocalJoiners([newJoiner, ...local.filter(j => j.id !== id)]);

    if (isFirebaseConfigured() && db) {
      try {
        await setDoc(doc(db, COLLECTION, docId), {
          ...newJoiner,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        }, { merge: true });
      } catch (err) {
        console.warn('hotelJoinerService.add error:', err);
      }
    }

    return newJoiner;
  },

  async update(id: number | string, data: Partial<Joiner>): Promise<void> {
    const docId = String(id);
    const local = getLocalJoiners();
    const idx = local.findIndex(j => String(j.id) === docId);
    if (idx >= 0) {
      local[idx] = { ...local[idx], ...data };
      saveLocalJoiners(local);
    }

    if (isFirebaseConfigured() && db) {
      try {
        await setDoc(doc(db, COLLECTION, docId), {
          ...data,
          updatedAt: serverTimestamp()
        }, { merge: true });
      } catch (err) {
        console.error('hotelJoinerService.update error:', err);
      }
    }
  },

  async delete(id: number | string): Promise<void> {
    const docId = String(id);
    const local = getLocalJoiners().filter(j => String(j.id) !== docId);
    saveLocalJoiners(local);

    if (isFirebaseConfigured() && db) {
      try {
        await deleteDoc(doc(db, COLLECTION, docId));
      } catch (err) {
        console.error('hotelJoinerService.delete error:', err);
      }
    }
  }
};
