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
import type { Hotel } from '../../types';

const COLLECTION = 'hotels';

export const hotelService = {
  subscribe(onUpdate: (hotels: Hotel[]) => void, onError?: (error: Error) => void): Unsubscribe {
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

          const hotels: Hotel[] = [];
          snapshot.forEach((d) => {
            const data = d.data();
            const idVal = typeof data.id === 'number' ? data.id : Number(d.id) || Date.now();
            hotels.push({
              ...data,
              id: idVal,
              hotelId: data.hotelId || String(idVal),
              name: data.name || 'Unnamed Hotel',
              ownerName: data.ownerName || data.contactPerson || 'Manager',
              mobile: data.mobile || data.phone || '9876543210',
              email: data.email || 'hotel@farmerbox.com',
              zone: data.zone || 'Kharadi',
              joiner: data.joiner || data.assignedJoiner || 'Rahul Patil',
              joinedBy: data.joinedBy || data.joinerId || '',
              joinerId: data.joinerId || data.joinedBy || '',
              address: data.address || '',
              totalOrders: Number(data.totalOrders ?? data.orders ?? 0),
              totalSpent: Number(data.totalSpent ?? 0),
              registrationDate: data.registrationDate || 'Just now',
              gstNumber: data.gstNumber || '',
              fssaiNumber: data.fssaiNumber || '',
              rating: Number(data.rating ?? 5.0),
              status: data.status === 'Inactive' ? 'Inactive' : 'Active',
              image: data.image || data.imageUrl || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=100'
            } as Hotel);
          });

          onUpdate(hotels);
        },
        (error) => {
          console.error('hotelService snapshot error:', error);
          if (onError) onError(error);
          onUpdate([]);
        }
      );
    } catch (err: any) {
      console.error('hotelService subscribe exception:', err);
      if (onError) onError(err);
      onUpdate([]);
      return () => {};
    }
  },

  subscribeForJoiner(uid: string, onUpdate: (hotels: Hotel[]) => void, onError?: (error: Error) => void): Unsubscribe {
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

          const hotels: Hotel[] = [];
          snapshot.forEach((d) => {
            const data = d.data();
            const joinedBy = String(data.joinedBy || data.joinerId || '');
            const joinerId = String(data.joinerId || data.joinedBy || '');
            // Enforce user-level isolation: Joiner sees ONLY hotels where joinedBy == currentUser.uid
            if (joinedBy === uid || joinerId === uid) {
              const idVal = typeof data.id === 'number' ? data.id : Number(d.id) || Date.now();
              hotels.push({
                ...data,
                id: idVal,
                hotelId: data.hotelId || String(idVal),
                name: data.name || 'Unnamed Hotel',
                ownerName: data.ownerName || data.contactPerson || 'Manager',
                mobile: data.mobile || data.phone || '9876543210',
                email: data.email || 'hotel@farmerbox.com',
                zone: data.zone || 'Kharadi',
                joiner: data.joiner || data.assignedJoiner || 'Rahul Patil',
                joinedBy: joinedBy,
                joinerId: joinerId,
                address: data.address || '',
                totalOrders: Number(data.totalOrders ?? data.orders ?? 0),
                totalSpent: Number(data.totalSpent ?? 0),
                registrationDate: data.registrationDate || 'Just now',
                gstNumber: data.gstNumber || '',
                fssaiNumber: data.fssaiNumber || '',
                rating: Number(data.rating ?? 5.0),
                status: data.status === 'Inactive' ? 'Inactive' : 'Active',
                image: data.image || data.imageUrl || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=100'
              } as Hotel);
            }
          });

          onUpdate(hotels);
        },
        (error) => {
          console.error('hotelService subscribeForJoiner error:', error);
          if (onError) onError(error);
          onUpdate([]);
        }
      );
    } catch (err: any) {
      console.error('hotelService subscribeForJoiner exception:', err);
      if (onError) onError(err);
      onUpdate([]);
      return () => {};
    }
  },

  async getAll(): Promise<Hotel[]> {
    if (!isFirebaseConfigured() || !db) return [];
    try {
      const colRef = collection(db, COLLECTION);
      const snap = await getDocs(colRef);
      return snap.docs.map((d) => ({
        ...d.data(),
        id: typeof d.data().id === 'number' ? d.data().id : Number(d.id) || Date.now()
      })) as Hotel[];
    } catch (e) {
      console.error('hotelService.getAll error:', e);
      return [];
    }
  },

  async add(hotel: Partial<Hotel>): Promise<number> {
    const id = typeof hotel.id === 'number' ? hotel.id : Date.now();
    const docId = String(id);
    const newHotel: any = {
      ...hotel,
      id,
      name: hotel.name || 'Unnamed Hotel',
      ownerName: hotel.ownerName || hotel.contactPerson || 'Manager',
      mobile: hotel.mobile || hotel.phone || '9876543210',
      email: hotel.email || 'hotel@farmerbox.com',
      zone: hotel.zone || 'Kharadi',
      joiner: hotel.joiner || hotel.assignedJoiner || 'Unassigned',
      address: hotel.address || '',
      totalOrders: Number(hotel.totalOrders ?? hotel.orders ?? 0),
      totalSpent: Number(hotel.totalSpent ?? 0),
      registrationDate: hotel.registrationDate || 'Just now',
      gstNumber: hotel.gstNumber || '',
      fssaiNumber: hotel.fssaiNumber || '',
      rating: Number(hotel.rating ?? 5.0),
      status: hotel.status || 'Active',
      image: hotel.image || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=100',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };

    if (isFirebaseConfigured() && db) {
      const docRef = doc(db, COLLECTION, docId);
      await setDoc(docRef, newHotel, { merge: true });
      const verifySnap = await getDoc(docRef);
      if (!verifySnap.exists()) {
        throw new Error(`Failed to verify hotel document ${docId} in Firestore`);
      }
    }

    return id;
  },

  async update(id: number | string, data: Partial<Hotel>): Promise<void> {
    const docId = String(id);
    if (isFirebaseConfigured() && db) {
      const docRef = doc(db, COLLECTION, docId);
      await updateDoc(docRef, {
        ...data,
        updatedAt: serverTimestamp()
      });
      const verifySnap = await getDoc(docRef);
      if (!verifySnap.exists()) {
        throw new Error(`Hotel ${docId} not found in Firestore after update`);
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
