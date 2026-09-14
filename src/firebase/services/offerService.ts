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

export interface Offer {
  id: string;
  title: string;
  code: string;
  discountPercentage?: number;
  flatDiscount?: number;
  validTill: string;
  targetCategory?: string;
  active: boolean;
  createdAt?: any;
}

const COLLECTION = 'offers';

export const offerService = {
  subscribe(onUpdate: (offers: Offer[]) => void): Unsubscribe {
    if (!isFirebaseConfigured() || !db) return () => {};

    try {
      const colRef = collection(db, COLLECTION);
      return onSnapshot(
        colRef,
        (snapshot) => {
          const list: Offer[] = [];
          snapshot.forEach((d) => list.push({ ...d.data(), id: d.id } as Offer));
          onUpdate(list);
        },
        (err) => console.warn('offerService error:', err)
      );
    } catch (err) {
      console.error('offerService error:', err);
      return () => {};
    }
  },

  async add(offer: Partial<Offer>): Promise<string> {
    const id = offer.id || `OFFER_${Date.now()}`;
    if (isFirebaseConfigured() && db) {
      try {
        await setDoc(doc(db, COLLECTION, id), {
          ...offer,
          id,
          active: offer.active ?? true,
          createdAt: serverTimestamp()
        }, { merge: true });
      } catch (err) {
        console.error('offerService.add error:', err);
      }
    }
    return id;
  },

  async delete(id: string): Promise<void> {
    if (isFirebaseConfigured() && db) {
      try {
        await deleteDoc(doc(db, COLLECTION, id));
      } catch (err) {
        console.error('offerService.delete error:', err);
      }
    }
  }
};
