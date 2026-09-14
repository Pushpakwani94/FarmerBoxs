import {
  collection,
  doc,
  setDoc,
  getDocs,
  updateDoc,
  onSnapshot,
  serverTimestamp,
  type Unsubscribe
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from '../config';

export interface InventoryItem {
  id: string;
  productId: string | number;
  productName: string;
  quantity: number;
  unit: string;
  price: number;
  minimumStock: number;
  maximumStock?: number;
  isAvailable: boolean;
  updatedAt?: any;
}

const COLLECTION = 'inventory';

export const inventoryService = {
  subscribe(onUpdate: (items: InventoryItem[]) => void): Unsubscribe {
    if (!isFirebaseConfigured() || !db) {
      return () => {};
    }

    try {
      const colRef = collection(db, COLLECTION);
      return onSnapshot(
        colRef,
        (snapshot) => {
          const items: InventoryItem[] = [];
          snapshot.forEach((d) => {
            items.push({ ...d.data(), id: d.id } as InventoryItem);
          });
          onUpdate(items);
        },
        (err) => console.warn('inventoryService snapshot error:', err)
      );
    } catch (err) {
      console.error('inventoryService error:', err);
      return () => {};
    }
  },

  async updateStock(productId: string | number, newQuantity: number, price?: number): Promise<void> {
    const docId = String(productId);
    if (!isFirebaseConfigured() || !db) return;

    try {
      const docRef = doc(db, COLLECTION, docId);
      await setDoc(docRef, {
        productId,
        quantity: newQuantity,
        isAvailable: newQuantity > 0,
        ...(price !== undefined ? { price } : {}),
        updatedAt: serverTimestamp()
      }, { merge: true });
    } catch (e) {
      console.error('inventoryService.updateStock error:', e);
    }
  }
};
