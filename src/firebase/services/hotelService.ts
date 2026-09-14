import {
  collection,
  doc,
  setDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  onSnapshot,
  serverTimestamp,
  type Unsubscribe
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from '../config';
import type { Hotel } from '../../types';
import { initialHotels } from '../../mockData';

const COLLECTION = 'hotels';

const getLocalHotels = (): Hotel[] => {
  if (typeof window === 'undefined') return initialHotels;
  try {
    const saved = localStorage.getItem(`farmerbox_${COLLECTION}`);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.warn('Local read error', e);
  }
  return initialHotels;
};

const saveLocalHotels = (items: Hotel[]): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(`farmerbox_${COLLECTION}`, JSON.stringify(items));
  } catch (e) {
    console.warn('Local write error', e);
  }
};

export const hotelService = {
  subscribe(onUpdate: (hotels: Hotel[]) => void): Unsubscribe {
    const cached = getLocalHotels();
    if (cached.length > 0) {
      onUpdate(cached);
    }

    if (!isFirebaseConfigured() || !db) return () => {};

    try {
      const colRef = collection(db, COLLECTION);
      return onSnapshot(
        colRef,
        (snapshot) => {
          if (snapshot.empty) {
            const local = getLocalHotels();
            if (local.length > 0) {
              onUpdate(local);
            } else {
              onUpdate([]);
            }
            return;
          }

          const hotels: Hotel[] = [];
          snapshot.forEach((d) => {
            const data = d.data();
            const idVal = typeof data.id === 'number' ? data.id : Number(d.id) || Date.now();
            hotels.push({
              ...data,
              id: idVal,
              name: data.name || 'Unnamed Hotel',
              ownerName: data.ownerName || 'Hotel Owner',
              mobile: data.mobile || '+91 98000 00000',
              email: data.email || 'hotel@example.com',
              zone: data.zone || 'Kharadi',
              joiner: data.joiner || 'Assigned Joiner',
              address: data.address || 'Pune, Maharashtra',
              totalOrders: Number(data.totalOrders ?? 0),
              totalSpent: Number(data.totalSpent ?? 0),
              registrationDate: data.registrationDate || 'Recent',
              gstNumber: data.gstNumber || '27AABCU9603R1ZM',
              fssaiNumber: data.fssaiNumber || '11518034000123',
              rating: Number(data.rating ?? 4.5),
              status: data.status || 'Active',
              image: data.image || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=200'
            } as Hotel);
          });

          saveLocalHotels(hotels);
          onUpdate(hotels);
        },
        (error) => {
          console.warn('hotelService snapshot error:', error);
          onUpdate(getLocalHotels());
        }
      );
    } catch (err) {
      console.error('hotelService error:', err);
      onUpdate(getLocalHotels());
      return () => {};
    }
  },

  async add(hotel: Partial<Hotel>): Promise<Hotel> {
    const id = hotel.id || Date.now();
    const docId = String(id);
    const newHotel: Hotel = {
      id,
      name: hotel.name || 'New Hotel',
      ownerName: hotel.ownerName || 'Hotel Manager',
      mobile: hotel.mobile || '+91 98000 00000',
      email: hotel.email || `${(hotel.name || 'hotel').toLowerCase().replace(/\s+/g, '')}@example.com`,
      zone: hotel.zone || 'Kharadi',
      joiner: hotel.joiner || 'Rahul Patil',
      address: hotel.address || `${hotel.zone || 'Kharadi'}, Pune`,
      totalOrders: Number(hotel.totalOrders ?? 0),
      totalSpent: Number(hotel.totalSpent ?? 0),
      registrationDate: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      gstNumber: hotel.gstNumber || '27AABCU9603R1ZM',
      fssaiNumber: hotel.fssaiNumber || '11518034000123',
      rating: Number(hotel.rating ?? 4.8),
      status: hotel.status || 'Active',
      image: hotel.image || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=200'
    };

    const local = getLocalHotels();
    saveLocalHotels([newHotel, ...local.filter(h => h.id !== id)]);

    if (isFirebaseConfigured() && db) {
      try {
        await setDoc(doc(db, COLLECTION, docId), {
          ...newHotel,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        }, { merge: true });
      } catch (err) {
        console.warn('hotelService.add Firestore error:', err);
      }
    }

    return newHotel;
  },

  async update(id: number | string, data: Partial<Hotel>): Promise<void> {
    const docId = String(id);
    const local = getLocalHotels();
    const idx = local.findIndex(h => String(h.id) === docId);
    if (idx >= 0) {
      local[idx] = { ...local[idx], ...data };
      saveLocalHotels(local);
    }

    if (isFirebaseConfigured() && db) {
      try {
        await setDoc(doc(db, COLLECTION, docId), {
          ...data,
          updatedAt: serverTimestamp()
        }, { merge: true });
      } catch (err) {
        console.error('hotelService.update error:', err);
      }
    }
  },

  async delete(id: number | string): Promise<void> {
    const docId = String(id);
    const local = getLocalHotels().filter(h => String(h.id) !== docId);
    saveLocalHotels(local);

    if (isFirebaseConfigured() && db) {
      try {
        await deleteDoc(doc(db, COLLECTION, docId));
      } catch (err) {
        console.error('hotelService.delete error:', err);
      }
    }
  }
};
