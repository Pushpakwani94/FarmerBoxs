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
import type { Driver } from '../../types';
import { initialDriversList } from '../../data/driversData';

const COLLECTION = 'drivers';

const getLocalDrivers = (): Driver[] => {
  if (typeof window === 'undefined') return initialDriversList;
  try {
    const saved = localStorage.getItem(`farmerbox_${COLLECTION}`);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.warn('Local read error', e);
  }
  return initialDriversList;
};

const saveLocalDrivers = (items: Driver[]): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(`farmerbox_${COLLECTION}`, JSON.stringify(items));
  } catch (e) {
    console.warn('Local write error', e);
  }
};

export const deliveryService = {
  subscribe(onUpdate: (drivers: Driver[]) => void): Unsubscribe {
    const cached = getLocalDrivers();
    if (cached.length > 0) onUpdate(cached);

    if (!isFirebaseConfigured() || !db) return () => {};

    try {
      const colRef = collection(db, COLLECTION);
      return onSnapshot(
        colRef,
        (snapshot) => {
          if (snapshot.empty) {
            const local = getLocalDrivers();
            if (local.length > 0) {
              onUpdate(local);
            } else {
              onUpdate([]);
            }
            return;
          }

          const drivers: Driver[] = [];
          snapshot.forEach((d) => {
            const data = d.data();
            const idVal = typeof data.id === 'number' ? data.id : Number(d.id) || Date.now();
            drivers.push({
              ...data,
              id: idVal,
              name: data.name || 'Driver',
              mobile: data.mobile || '+91 98000 00000',
              zone: data.zone || 'Kharadi',
              vehicleNo: data.vehicleNo || 'MH-12-AB-1234',
              status: data.status || 'Active',
              totalDeliveries: Number(data.totalDeliveries ?? 0),
              rating: Number(data.rating ?? 4.9),
              avatar: data.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100'
            } as Driver);
          });

          saveLocalDrivers(drivers);
          onUpdate(drivers);
        },
        (err) => {
          console.warn('deliveryService snapshot error:', err);
          onUpdate(getLocalDrivers());
        }
      );
    } catch (err) {
      console.error('deliveryService error:', err);
      onUpdate(getLocalDrivers());
      return () => {};
    }
  },

  async add(driver: Partial<Driver>): Promise<Driver> {
    const id = driver.id || Date.now();
    const docId = String(id);
    const newDriver: Driver = {
      id,
      name: driver.name || 'New Driver',
      mobile: driver.mobile || '+91 98000 00000',
      zone: driver.zone || 'Kharadi',
      vehicleNo: driver.vehicleNo || 'MH-12-FB-0001',
      status: driver.status || 'Active',
      totalDeliveries: Number(driver.totalDeliveries ?? 0),
      rating: Number(driver.rating ?? 5.0),
      avatar: driver.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100',
      email: driver.email || `${(driver.name || 'driver').toLowerCase().replace(/\s+/g, '')}@farmerbox.com`,
      emergencyContact: driver.emergencyContact || '+91 98000 00000',
      licenseNumber: driver.licenseNumber || 'MH12 20220012345',
      vehicleModel: driver.vehicleModel || 'Tata Ace Gold',
      joiningDate: 'Just now',
      completedToday: 0,
      activeDeliveries: 0,
      onTimeRate: '100%',
      recentOrders: []
    };

    const local = getLocalDrivers();
    saveLocalDrivers([newDriver, ...local.filter(d => d.id !== id)]);

    if (isFirebaseConfigured() && db) {
      try {
        await setDoc(doc(db, COLLECTION, docId), {
          ...newDriver,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        }, { merge: true });
      } catch (err) {
        console.warn('deliveryService.add error:', err);
      }
    }

    return newDriver;
  },

  async update(id: number | string, data: Partial<Driver>): Promise<void> {
    const docId = String(id);
    const local = getLocalDrivers();
    const idx = local.findIndex(d => String(d.id) === docId);
    if (idx >= 0) {
      local[idx] = { ...local[idx], ...data };
      saveLocalDrivers(local);
    }

    if (isFirebaseConfigured() && db) {
      try {
        await setDoc(doc(db, COLLECTION, docId), {
          ...data,
          updatedAt: serverTimestamp()
        }, { merge: true });
      } catch (err) {
        console.error('deliveryService.update error:', err);
      }
    }
  },

  async delete(id: number | string): Promise<void> {
    const docId = String(id);
    const local = getLocalDrivers().filter(d => String(d.id) !== docId);
    saveLocalDrivers(local);

    if (isFirebaseConfigured() && db) {
      try {
        await deleteDoc(doc(db, COLLECTION, docId));
      } catch (err) {
        console.error('deliveryService.delete error:', err);
      }
    }
  }
};
