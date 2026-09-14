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
import type { Order, OrderStatus } from '../../types';
import { initialOrders } from '../../mockData';

const COLLECTION = 'orders';

const getLocalOrders = (): Order[] => {
  if (typeof window === 'undefined') return initialOrders;
  try {
    const saved = localStorage.getItem(`farmerbox_${COLLECTION}`);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.warn('Local read error', e);
  }
  return initialOrders;
};

const saveLocalOrders = (items: Order[]): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(`farmerbox_${COLLECTION}`, JSON.stringify(items));
  } catch (e) {
    console.warn('Local write error', e);
  }
};

export const orderService = {
  subscribe(onUpdate: (orders: Order[]) => void): Unsubscribe {
    const cached = getLocalOrders();
    if (cached.length > 0) onUpdate(cached);

    if (!isFirebaseConfigured() || !db) return () => {};

    try {
      const colRef = collection(db, COLLECTION);
      return onSnapshot(
        colRef,
        (snapshot) => {
          if (snapshot.empty) {
            const local = getLocalOrders();
            if (local.length > 0) {
              onUpdate(local);
            } else {
              onUpdate([]);
            }
            return;
          }

          const orders: Order[] = [];
          snapshot.forEach((d) => {
            const data = d.data();
            const idVal = data.id || d.id;
            orders.push({
              ...data,
              id: idVal,
              orderId: data.orderId || idVal,
              hotelName: data.hotelName || 'Partner Hotel',
              zone: data.zone || data.hotelZone || 'Central Zone',
              joiner: data.joiner || 'Rahul Patil',
              amount: Number(data.amount ?? data.totalAmount ?? 0),
              totalAmount: Number(data.totalAmount ?? data.amount ?? 0),
              status: (data.status || data.orderStatus || 'Pending') as OrderStatus,
              orderStatus: (data.orderStatus || data.status || 'Pending') as OrderStatus,
              paymentMode: data.paymentMode || data.paymentMethod || 'Online',
              paymentStatus: data.paymentStatus || 'Pending',
              driver: data.driver || 'Suresh Jadhav',
              date: data.date || new Date().toISOString().split('T')[0],
              time: data.time || '10:00 AM',
              commission: Number(data.commission ?? 100),
              items: data.items || []
            } as Order);
          });

          saveLocalOrders(orders);
          onUpdate(orders);
        },
        (err) => {
          console.warn('orderService snapshot error:', err);
          onUpdate(getLocalOrders());
        }
      );
    } catch (err) {
      console.error('orderService error:', err);
      onUpdate(getLocalOrders());
      return () => {};
    }
  },

  async add(orderData: Partial<Order>): Promise<Order> {
    const id = String(orderData.id || `FB${Math.floor(1000 + Math.random() * 9000)}`);
    const newOrder: Order = {
      id,
      orderId: id,
      hotelId: orderData.hotelId || 'HT01',
      hotelName: orderData.hotelName || 'Partner Hotel',
      hotelImage: orderData.hotelImage || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=100',
      zone: orderData.zone || 'Kharadi',
      joiner: orderData.joiner || 'Rahul Patil',
      joinerId: orderData.joinerId || 'JN01',
      amount: Number(orderData.amount ?? 0),
      totalAmount: Number(orderData.totalAmount ?? orderData.amount ?? 0),
      subtotal: Number(orderData.subtotal ?? orderData.amount ?? 0),
      deliveryCharge: Number(orderData.deliveryCharge ?? 0),
      paymentMode: orderData.paymentMode || 'Online',
      paymentMethod: orderData.paymentMethod || orderData.paymentMode || 'Online',
      paymentStatus: orderData.paymentStatus || 'Pending',
      driver: orderData.driver || 'Suresh Jadhav',
      deliveryPartnerId: orderData.deliveryPartnerId || 'DR01',
      status: orderData.status || 'Pending',
      orderStatus: orderData.orderStatus || orderData.status || 'Pending',
      commission: Number(orderData.commission ?? 100),
      date: orderData.date || new Date().toISOString().split('T')[0],
      time: orderData.time || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      items: orderData.items || []
    };

    const local = getLocalOrders();
    saveLocalOrders([newOrder, ...local.filter(o => String(o.id) !== id)]);

    if (isFirebaseConfigured() && db) {
      try {
        await setDoc(doc(db, COLLECTION, id), {
          ...newOrder,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        }, { merge: true });
      } catch (err) {
        console.warn('orderService.add error:', err);
      }
    }

    return newOrder;
  },

  async updateStatus(id: string, status: OrderStatus): Promise<void> {
    const local = getLocalOrders();
    const idx = local.findIndex(o => String(o.id) === String(id));
    if (idx >= 0) {
      local[idx] = {
        ...local[idx],
        status,
        orderStatus: status,
        commission: status === 'Delivered' ? 100 : local[idx].commission
      };
      saveLocalOrders(local);
    }

    if (isFirebaseConfigured() && db) {
      try {
        await setDoc(doc(db, COLLECTION, String(id)), {
          status,
          orderStatus: status,
          commission: status === 'Delivered' ? 100 : 0,
          updatedAt: serverTimestamp()
        }, { merge: true });
      } catch (err) {
        console.error('orderService.updateStatus error:', err);
      }
    }
  },

  async delete(id: string): Promise<void> {
    const local = getLocalOrders().filter(o => String(o.id) !== String(id));
    saveLocalOrders(local);

    if (isFirebaseConfigured() && db) {
      try {
        await deleteDoc(doc(db, COLLECTION, String(id)));
      } catch (err) {
        console.error('orderService.delete error:', err);
      }
    }
  }
};
