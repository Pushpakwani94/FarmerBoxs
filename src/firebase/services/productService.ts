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
import { initialProductsList } from '../../data/productsData';

const COLLECTION = 'products';

const getLocalProducts = (): Product[] => {
  if (typeof window === 'undefined') return initialProductsList;
  try {
    const saved = localStorage.getItem(`farmerbox_${COLLECTION}`);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.warn('Local read error', e);
  }
  return initialProductsList;
};

const saveLocalProducts = (items: Product[]): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(`farmerbox_${COLLECTION}`, JSON.stringify(items));
  } catch (e) {
    console.warn('Local write error', e);
  }
};

export const productService = {
  /**
   * Subscribe to real-time product updates using onSnapshot()
   */
  subscribe(onUpdate: (products: Product[]) => void): Unsubscribe {
    // Return cached immediately
    const cached = getLocalProducts();
    if (cached.length > 0) {
      onUpdate(cached);
    }

    if (!isFirebaseConfigured() || !db) {
      return () => {};
    }

    try {
      const colRef = collection(db, COLLECTION);
      const q = query(colRef, orderBy('name', 'asc'));

      return onSnapshot(
        q,
        (snapshot) => {
          if (snapshot.empty) {
            const local = getLocalProducts();
            if (local.length > 0) {
              onUpdate(local);
            } else {
              onUpdate([]);
            }
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
              image: data.image || '/products/fenugreek.jpg'
            } as Product);
          });

          saveLocalProducts(products);
          onUpdate(products);
        },
        (error) => {
          console.warn('productService snapshot notice:', error);
          onUpdate(getLocalProducts());
        }
      );
    } catch (err) {
      console.error('productService subscription error:', err);
      onUpdate(getLocalProducts());
      return () => {};
    }
  },

  /**
   * Fetch all products once
   */
  async getAll(): Promise<Product[]> {
    if (!isFirebaseConfigured() || !db) return getLocalProducts();
    try {
      const snapshot = await getDocs(collection(db, COLLECTION));
      if (snapshot.empty) return getLocalProducts();
      return snapshot.docs.map(d => ({ ...d.data(), id: Number(d.id) || d.data().id }) as Product);
    } catch (err) {
      console.error('productService.getAll error:', err);
      return getLocalProducts();
    }
  },

  /**
   * Add a new product to Firestore
   */
  async add(productData: Partial<Product>): Promise<Product> {
    const id = productData.id || Date.now();
    const docId = String(id);
    const newProduct: Product = {
      id,
      name: productData.name || 'New Vegetable',
      category: productData.category || 'Vegetables',
      unit: productData.unit || 'KG',
      purchasePrice: Number(productData.purchasePrice ?? 30),
      salePrice: Number(productData.salePrice ?? 45),
      stock: Number(productData.stock ?? 100),
      minimumStock: Number(productData.minimumStock ?? 25),
      status: (productData.status as any) || 'Active',
      addedOn: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      image: productData.image || 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=200',
      description: productData.description || 'Fresh farm-sourced produce.',
      images: productData.images || [productData.image || 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=200'],
      stockHistory: [
        { date: 'Today', type: 'Stock In', qty: `+${productData.stock ?? 100} ${productData.unit || 'KG'}`, ref: `PO-${String(id).slice(-4)}`, user: 'Admin' }
      ]
    };

    // 1. Save locally immediately
    const local = getLocalProducts();
    saveLocalProducts([newProduct, ...local.filter(p => p.id !== id)]);

    // 2. Persist to Firestore
    if (isFirebaseConfigured() && db) {
      try {
        const docRef = doc(db, COLLECTION, docId);
        await setDoc(docRef, {
          ...newProduct,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        }, { merge: true });
      } catch (err) {
        console.warn('productService.add Firestore write notice:', err);
      }
    }

    return newProduct;
  },

  /**
   * Update an existing product
   */
  async update(id: number | string, data: Partial<Product>): Promise<void> {
    const docId = String(id);

    // 1. Update local
    const local = getLocalProducts();
    const idx = local.findIndex(p => String(p.id) === docId);
    if (idx >= 0) {
      local[idx] = { ...local[idx], ...data };
      saveLocalProducts(local);
    }

    // 2. Update Firestore
    if (isFirebaseConfigured() && db) {
      try {
        const docRef = doc(db, COLLECTION, docId);
        await updateDoc(docRef, {
          ...data,
          updatedAt: serverTimestamp()
        });
      } catch (err) {
        console.warn('productService.update fallback to setDoc:', err);
        try {
          const docRef = doc(db, COLLECTION, docId);
          await setDoc(docRef, { ...data, updatedAt: serverTimestamp() }, { merge: true });
        } catch (e) {
          console.error('productService.update error:', e);
        }
      }
    }
  },

  /**
   * Delete product
   */
  async delete(id: number | string): Promise<void> {
    const docId = String(id);

    // 1. Update local
    const local = getLocalProducts().filter(p => String(p.id) !== docId);
    saveLocalProducts(local);

    // 2. Delete from Firestore
    if (isFirebaseConfigured() && db) {
      try {
        const docRef = doc(db, COLLECTION, docId);
        await deleteDoc(docRef);
      } catch (err) {
        console.error('productService.delete error:', err);
      }
    }
  }
};
