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
  query,
  orderBy,
  type Unsubscribe
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from '../config';
import type { Product } from '../../types';

const COLLECTION = 'products';

export const productService = {
  /**
   * Subscribe to real-time product updates exclusively from Cloud Firestore
   */
  subscribe(onUpdate: (products: Product[]) => void, onError?: (error: Error) => void): Unsubscribe {
    if (!isFirebaseConfigured() || !db) {
      if (onError) onError(new Error('Firebase Firestore is not configured.'));
      onUpdate([]);
      return () => {};
    }

    try {
      const colRef = collection(db, COLLECTION);
      const q = query(colRef, orderBy('name', 'asc'));

      return onSnapshot(
        q,
        (snapshot) => {
          if (snapshot.empty) {
            onUpdate([]);
            return;
          }

          const products: Product[] = [];
          snapshot.forEach((d) => {
            const data = d.data();
            const idVal = typeof data.id === 'number' ? data.id : Number(d.id) || Date.now();
            products.push({
              ...data,
              id: idVal,
              name: data.name || 'Unnamed Product',
              category: data.category || 'Vegetables',
              unit: data.unit || 'KG',
              purchasePrice: Number(data.purchasePrice ?? 30),
              salePrice: Number(data.salePrice ?? data.price ?? 45),
              stock: Number(data.stock ?? 100),
              minimumStock: Number(data.minimumStock ?? 25),
              status: data.status || 'Active',
              image: data.imageUrl || data.image || '/products/fenugreek.jpg'
            } as Product);
          });

          onUpdate(products);
        },
        (error) => {
          console.error('productService snapshot error:', error);
          if (onError) onError(error);
          onUpdate([]);
        }
      );
    } catch (err: any) {
      console.error('productService subscribe exception:', err);
      if (onError) onError(err);
      onUpdate([]);
      return () => {};
    }
  },

  async getAll(): Promise<Product[]> {
    if (!isFirebaseConfigured() || !db) return [];
    try {
      const colRef = collection(db, COLLECTION);
      const snap = await getDocs(colRef);
      return snap.docs.map((d) => ({
        ...d.data(),
        id: typeof d.data().id === 'number' ? d.data().id : Number(d.id) || Date.now()
      })) as Product[];
    } catch (e) {
      console.error('productService.getAll error:', e);
      return [];
    }
  },

  async getById(id: number | string): Promise<Product | null> {
    if (!isFirebaseConfigured() || !db) return null;
    try {
      const docRef = doc(db, COLLECTION, String(id));
      const snap = await getDoc(docRef);
      if (!snap.exists()) return null;
      return { ...snap.data(), id: typeof snap.data().id === 'number' ? snap.data().id : Number(snap.id) } as Product;
    } catch (e) {
      console.error(`productService.getById(${id}) error:`, e);
      return null;
    }
  },

  async add(product: Partial<Product>): Promise<number> {
    const id = typeof product.id === 'number' ? product.id : Date.now();
    const docId = String(id);
    const newProduct: any = {
      ...product,
      id,
      name: product.name || 'Unnamed Product',
      category: product.category || 'Vegetables',
      unit: product.unit || 'KG',
      purchasePrice: Number(product.purchasePrice ?? 30),
      salePrice: Number(product.salePrice ?? 45),
      stock: Number(product.stock ?? 100),
      minimumStock: Number(product.minimumStock ?? 25),
      status: product.status || 'Active',
      image: product.image || '/products/fenugreek.jpg',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };

    if (isFirebaseConfigured() && db) {
      const docRef = doc(db, COLLECTION, docId);
      await setDoc(docRef, newProduct, { merge: true });
      // Verification read from Firestore
      const verifySnap = await getDoc(docRef);
      if (!verifySnap.exists()) {
        throw new Error(`Failed to verify product document ${docId} in Firestore`);
      }
    }

    return id;
  },

  async update(id: number | string, data: Partial<Product>): Promise<void> {
    const docId = String(id);
    if (isFirebaseConfigured() && db) {
      const docRef = doc(db, COLLECTION, docId);
      await updateDoc(docRef, {
        ...data,
        updatedAt: serverTimestamp()
      });
      // Verification read
      const verifySnap = await getDoc(docRef);
      if (!verifySnap.exists()) {
        throw new Error(`Product ${docId} not found in Firestore after update`);
      }
    }
  },

  async delete(id: number | string): Promise<void> {
    const docId = String(id);
    if (isFirebaseConfigured() && db) {
      const docRef = doc(db, COLLECTION, docId);
      await deleteDoc(docRef);
    }
  },

  async updateStock(id: number | string, newStock: number): Promise<void> {
    await this.update(id, { stock: newStock });
  },

  async updatePrice(id: number | string, salePrice: number, purchasePrice?: number): Promise<void> {
    const updates: Partial<Product> = { salePrice };
    if (purchasePrice !== undefined) updates.purchasePrice = purchasePrice;
    await this.update(id, updates);
  },

  async toggleStatus(id: number | string, currentStatus: string): Promise<void> {
    const newStatus = currentStatus === 'Active' ? 'Inactive' : 'Active';
    await this.update(id, { status: newStatus as any });
  }
};
