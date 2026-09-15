import React, { createContext, useContext, useState, useEffect, useMemo, type ReactNode } from 'react';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { soundEngine } from './utils/sound';
import { subscribeToCollection, saveRecord } from '../firebase/dbService';
import { hotelService } from '../firebase/services/hotelService';
import { orderService } from '../firebase/services/orderService';
import { authService, type AppUser } from '../firebase/authService';
import { db, isFirebaseConfigured } from '../firebase/config';

export type MobileScreen =
  | 'WELCOME'
  | 'LOGIN'
  | 'REGISTER'
  | 'DASHBOARD'
  | 'MY_HOTELS'
  | 'ADD_HOTEL'
  | 'PLACE_ORDER'
  | 'CART'
  | 'MY_ORDERS'
  | 'REORDER'
  | 'ORDER_SUCCESS'
  | 'COMMISSION'
  | 'NOTIFICATIONS'
  | 'PROFILE';

export interface MobileHotel {
  id: number | string;
  hotelId?: string;
  name: string;
  zone: string;
  contactPerson?: string;
  phone?: string;
  address?: string;
  gst?: string;
  fssai?: string;
  orders: number;
  status: 'Active' | 'Pending' | 'Inactive';
  image: string;
  joinedBy?: string;
  joinerId?: string;
  assignedJoiner?: string;
}

export interface MobileProduct {
  id: number | string;
  name: string;
  category: 'Vegetables' | 'Fruits' | 'Leafy' | 'Other';
  price: number;
  unit: string;
  image: string;
  stock: number;
}

export interface CartItem {
  product: MobileProduct;
  quantity: number;
}

export interface MobileOrder {
  id: string;
  orderId?: string;
  hotelId?: string | number;
  hotelName: string;
  hotelZone: string;
  zone?: string;
  joiner?: string;
  joinerId?: string | number;
  joinedBy?: string;
  date: string;
  timeSlot: string;
  amount: number;
  subtotal?: number;
  totalAmount?: number;
  deliveryCharge?: number;
  paymentMode?: string;
  paymentStatus?: string;
  status: 'Pending' | 'Confirmed' | 'Delivered' | 'Out for Delivery' | 'Preparing' | 'Cancelled';
  orderStatus?: string;
  items: any[];
}

export interface MobileNotification {
  id: string;
  title: string;
  subtitle: string;
  time: string;
  category: 'Orders' | 'Hotels' | 'Commission' | 'System';
  iconType: 'order' | 'hotel' | 'commission' | 'product' | 'system';
}

export interface JoinerUserProfile {
  uid: string;
  name: string;
  role: string;
  zone: string;
  phone: string;
  email: string;
  avatar: string;
  totalHotels: number;
  totalOrders: number;
}

interface JoinerAppContextType {
  currentScreen: MobileScreen;
  setCurrentScreen: (screen: MobileScreen) => void;
  selectedHotel: MobileHotel | null;
  setSelectedHotel: (hotel: MobileHotel | null) => void;
  hotels: MobileHotel[];
  addHotel: (hotel: Omit<MobileHotel, 'id'> & { [key: string]: any }) => Promise<void>;
  products: MobileProduct[];
  cart: CartItem[];
  addToCart: (product: MobileProduct) => void;
  updateCartQty: (productId: number | string, qty: number) => void;
  removeFromCart: (productId: number | string) => void;
  clearCart: () => void;
  cartTotal: number;
  orders: MobileOrder[];
  addOrder: (orderData: Partial<MobileOrder>) => MobileOrder;
  lastPlacedOrder: MobileOrder | null;
  selectedOrderForReorder: MobileOrder | null;
  setSelectedOrderForReorder: (order: MobileOrder | null) => void;
  notifications: MobileNotification[];
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  playNotificationSound: (type?: 'notification' | 'commission' | 'pop') => void;
  addNotification: (notification: Omit<MobileNotification, 'id'>) => void;
  clearNotifications: () => void;
  commissionBalance: {
    thisMonth: number;
    growth: number;
    paid: number;
    pending: number;
  };
  commissionHistory: Array<{
    date: string;
    orderId: string;
    amount: number;
    status: 'Paid' | 'Pending';
  }>;
  userProfile: JoinerUserProfile;
  registerUser: (data: { name: string; phone: string; email: string; zone: string; password?: string }) => Promise<void>;
  loginUser: (phone: string, password?: string) => Promise<void>;
  logoutUser: () => Promise<void>;
  updateUserProfile: (data: Partial<JoinerUserProfile>) => Promise<void>;
}

const JoinerAppContext = createContext<JoinerAppContextType | undefined>(undefined);

const getDefaultProfile = (storedUser: AppUser | null): JoinerUserProfile => {
  if (storedUser) {
    return {
      uid: storedUser.uid,
      name: storedUser.name,
      role: storedUser.role === 'admin' ? 'Super Admin' : 'Hotel Joiner',
      zone: storedUser.zone || 'Kharadi Zone',
      phone: storedUser.phone || '',
      email: storedUser.email || '',
      avatar: storedUser.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      totalHotels: 0,
      totalOrders: 0
    };
  }

  // Fallback initial User A (Rahul Patil)
  return {
    uid: 'usr_9876543210',
    name: 'Rahul Patil',
    role: 'Hotel Joiner',
    zone: 'Kharadi Zone',
    phone: '9876543210',
    email: 'rahul.patil@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    totalHotels: 0,
    totalOrders: 0
  };
};

export const JoinerAppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState<MobileScreen>('DASHBOARD');
  const [hotels, setHotels] = useState<MobileHotel[]>([]);
  const [selectedHotel, setSelectedHotel] = useState<MobileHotel | null>(null);
  const [products, setProducts] = useState<MobileProduct[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<MobileOrder[]>([]);
  const [lastPlacedOrder, setLastPlacedOrder] = useState<MobileOrder | null>(null);
  const [selectedOrderForReorder, setSelectedOrderForReorder] = useState<MobileOrder | null>(null);
  const [notifications, setNotifications] = useState<MobileNotification[]>([]);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // User Profile loaded and synchronized with authService and Firestore
  const [userProfile, setUserProfile] = useState<JoinerUserProfile>(() =>
    getDefaultProfile(authService.getCurrentUser())
  );

  // Listen to live Auth changes (persists across page reloads and browser refreshes)
  useEffect(() => {
    const unsubAuth = authService.onAuthChange((user) => {
      if (user) {
        setUserProfile(prev => ({
          ...prev,
          uid: user.uid,
          name: user.name,
          role: user.role === 'admin' ? 'Super Admin' : 'Hotel Joiner',
          zone: user.zone || prev.zone,
          phone: user.phone || prev.phone,
          email: user.email || prev.email,
          avatar: user.avatar || prev.avatar
        }));
      }
    });

    return () => unsubAuth();
  }, []);

  // Sync user profile document from Firestore 'users/{uid}'
  useEffect(() => {
    if (!isFirebaseConfigured() || !db || !userProfile.uid) return;
    try {
      const unsub = onSnapshot(doc(db, 'users', userProfile.uid), (snap) => {
        if (snap.exists()) {
          const data = snap.data();
          setUserProfile(prev => ({
            ...prev,
            name: data.name || prev.name,
            phone: data.phone || prev.phone,
            email: data.email || prev.email,
            zone: data.zone || prev.zone,
            avatar: data.avatar || prev.avatar
          }));
        }
      });
      return () => unsub();
    } catch (e) {
      console.warn('User profile subscription notice:', e);
    }
  }, [userProfile.uid]);

  // 1. Live Products and Notifications Subscriptions (Global / Catalog)
  useEffect(() => {
    const unsubProducts = subscribeToCollection<any>('products', (rawProducts) => {
      if (rawProducts && rawProducts.length > 0) {
        const mapped: MobileProduct[] = rawProducts.map((p: any) => {
          let fallbackImg = '/products/fenugreek.jpg';
          const nameLower = (p.name || '').toLowerCase();
          if (nameLower.includes('methi') || nameLower.includes('fenugreek')) fallbackImg = '/products/fenugreek.jpg';
          else if (nameLower.includes('pumpkin') || nameLower.includes('kaddu')) fallbackImg = '/products/pumpkin.jpg';
          else if (nameLower.includes('brinjal') || nameLower.includes('eggplant') || nameLower.includes('baingan')) fallbackImg = '/products/brinjal.jpg';
          else if (nameLower.includes('mint') || nameLower.includes('pudina')) fallbackImg = '/products/mint.jpg';
          else if (nameLower.includes('ginger') || nameLower.includes('adrak')) fallbackImg = '/products/ginger.jpg';
          else if (nameLower.includes('tomato')) fallbackImg = 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=200';
          else if (nameLower.includes('onion')) fallbackImg = 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8ce?w=200';
          else if (nameLower.includes('potato')) fallbackImg = 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=200';

          return {
            id: p.id !== undefined ? p.id : Date.now(),
            name: p.name || 'Unnamed Product',
            category: p.category || 'Vegetables',
            price: Number(p.salePrice ?? p.price ?? 30),
            unit: p.unit ? String(p.unit).toLowerCase() : 'kg',
            image: p.imageUrl || p.image || fallbackImg,
            stock: Number(p.stock ?? 100)
          };
        });
        setProducts(mapped);
      } else {
        setProducts([]);
      }
    });

    const unsubNotifs = subscribeToCollection<any>('notifications', (rawNotifs) => {
      const mapped: MobileNotification[] = (rawNotifs || []).map((n: any) => ({
        id: String(n.id || Date.now()),
        title: n.title || 'Notification',
        subtitle: n.subtitle || n.message || 'New alert',
        time: n.time || n.dateTime || 'Just now',
        category: n.category || (n.userType === 'Hotels' ? 'Hotels' : n.userType === 'Joiners' ? 'Commission' : 'Orders'),
        iconType: n.iconType || (n.category === 'Hotels' ? 'hotel' : n.category === 'Commission' ? 'commission' : 'order')
      }));
      setNotifications(mapped);
    });

    return () => {
      unsubProducts();
      unsubNotifs();
    };
  }, []);

  // 2. User-Scoped Hotels and Orders Subscriptions — strictly isolated by user UID
  useEffect(() => {
    if (!userProfile.uid) {
      setHotels([]);
      setSelectedHotel(null);
      setOrders([]);
      return;
    }

    const unsubHotels = hotelService.subscribeForJoiner(
      userProfile.uid,
      (mappedHotels) => {
        const transformed: MobileHotel[] = mappedHotels.map((item: any) => ({
          id: item.id ?? item.hotelId ?? Date.now(),
          hotelId: item.hotelId ?? String(item.id ?? ''),
          name: item.name || 'Unnamed Hotel',
          zone: item.zone || 'Kharadi',
          contactPerson: item.contactPerson || item.ownerName || '',
          phone: item.phone || item.mobile || '',
          address: item.address || '',
          gst: item.gst || item.gstNumber || '',
          fssai: item.fssai || item.fssaiNumber || '',
          orders: Number(item.orders || item.totalOrders || 0),
          status: (item.status === 'Active' || item.status === 'Pending' || item.status === 'Inactive') ? item.status : 'Active',
          image: item.image || item.imageUrl || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=100',
          joinedBy: item.joinedBy,
          joinerId: item.joinerId,
          assignedJoiner: item.assignedJoiner || item.joiner
        }));

        setHotels(transformed);
        setSelectedHotel(prev => {
          if (!prev && transformed.length > 0) return transformed[0];
          if (prev) {
            const found = transformed.find(item => String(item.id) === String(prev.id));
            return found || (transformed.length > 0 ? transformed[0] : null);
          }
          return null;
        });
      },
      (error) => {
        console.error('Mobile hotels Firestore error:', error);
      }
    );

    const unsubOrders = orderService.subscribeForJoiner(
      userProfile.uid,
      (rawOrders) => {
        const mapped: MobileOrder[] = (rawOrders || []).map((o: any) => ({
          id: String(o.id || o.orderId || '#FB0000'),
          orderId: String(o.orderId || o.id || '#FB0000'),
          hotelId: o.hotelId,
          hotelName: o.hotelName || 'Partner Hotel',
          hotelZone: o.hotelZone || o.zone || 'Kharadi',
          zone: o.zone || o.hotelZone || 'Kharadi',
          joiner: o.joiner || userProfile.name,
          joinerId: o.joinerId || userProfile.uid,
          joinedBy: o.joinedBy || userProfile.uid,
          date: o.date || 'Today',
          timeSlot: o.timeSlot || '8 AM - 10 AM',
          amount: Number(o.totalAmount ?? o.amount ?? 0),
          subtotal: Number(o.subtotal ?? o.amount ?? 0),
          totalAmount: Number(o.totalAmount ?? o.amount ?? 0),
          deliveryCharge: Number(o.deliveryCharge ?? 0),
          paymentMode: o.paymentMode || o.paymentMethod || 'Online',
          paymentStatus: o.paymentStatus || 'Pending',
          status: o.status || o.orderStatus || 'Pending',
          orderStatus: o.orderStatus || o.status || 'Pending',
          items: o.items || []
        }));
        setOrders(mapped);
      },
      (error) => {
        console.error('Mobile orders Firestore error:', error);
      }
    );

    return () => {
      unsubHotels();
      unsubOrders();
    };
  }, [userProfile.uid]);

  // Dynamic Commission calculation strictly from the current joiner's LIVE Orders
  const commissionBalance = useMemo(() => {
    let paid = 0;
    let pending = 0;
    orders.forEach(o => {
      const comm = Number((o as any).commission || 100);
      if (o.status === 'Delivered') {
        paid += comm;
      } else {
        pending += comm;
      }
    });
    return {
      thisMonth: paid + pending,
      growth: orders.length > 0 ? 18 : 0,
      paid,
      pending
    };
  }, [orders]);

  const commissionHistory = useMemo(() => {
    return orders.map(o => ({
      date: o.date || 'Today',
      orderId: o.id,
      amount: Number((o as any).commission || 100),
      status: (o.status === 'Delivered' ? 'Paid' : 'Pending') as 'Paid' | 'Pending'
    }));
  }, [orders]);

  const playNotificationSound = (type: 'notification' | 'commission' | 'pop' = 'notification') => {
    if (!soundEnabled) return;
    try {
      if (type === 'commission') {
        soundEngine.playCommissionChime();
      } else if (type === 'pop') {
        soundEngine.playPop();
      } else {
        soundEngine.playNotificationChime();
      }
    } catch (e) {
      console.warn('Audio play notice', e);
    }
  };

  const addNotification = (notifData: Omit<MobileNotification, 'id'>) => {
    const docId = String(Date.now());
    const nowStr = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });
    const newNotif = {
      id: docId,
      ...notifData,
      message: notifData.subtitle || notifData.title,
      dateTime: nowStr,
      userType: 'Joiners',
      status: 'Sent',
      read: false
    };
    saveRecord('notifications', newNotif, docId);
    setNotifications(prev => [newNotif as unknown as MobileNotification, ...prev]);
    playNotificationSound('notification');
  };

  const clearNotifications = () => {
    setNotifications([]);
    playNotificationSound('pop');
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const addToCart = (product: MobileProduct) => {
    setCart(prev => {
      const existing = prev.find(item => String(item.product.id) === String(product.id));
      if (existing) {
        return prev.map(item =>
          String(item.product.id) === String(product.id) ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const updateCartQty = (productId: number | string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        String(item.product.id) === String(productId) ? { ...item, quantity: qty } : item
      )
    );
  };

  const removeFromCart = (productId: number | string) => {
    setCart(prev => prev.filter(item => String(item.product.id) !== String(productId)));
  };

  const clearCart = () => {
    setCart([]);
  };

  // Add Hotel: Inserts hotel directly into Cloud Firestore 'hotels' collection with joinedBy & joinerId set to currentUser.uid
  const addHotel = async (newHotel: Omit<MobileHotel, 'id'> & { [key: string]: any }) => {
    const docId = `HT${Date.now().toString().slice(-6)}`;
    const hotelToSave: any = {
      id: docId,
      hotelId: docId,
      name: newHotel.name,
      zone: newHotel.zone || userProfile.zone.replace(' Zone', ''),
      orders: 0,
      status: 'Active',
      image: newHotel.image || 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=100',
      contactPerson: newHotel.contactPerson || newHotel.ownerName || 'Manager',
      phone: newHotel.phone || newHotel.mobile || '',
      address: newHotel.address || '',
      gst: newHotel.gst || '',
      fssai: newHotel.fssai || '',
      type: newHotel.type || 'Restaurant',
      assignedJoiner: userProfile.name,
      joinedBy: userProfile.uid,
      joinerId: userProfile.uid,
      dailyOrderKg: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    await saveRecord('hotels', hotelToSave, docId);
    setHotels(prev => [hotelToSave, ...prev]);
    setSelectedHotel(hotelToSave);

    const updatedProfile = { ...userProfile, totalHotels: (userProfile.totalHotels || 0) + 1 };
    setUserProfile(updatedProfile);

    addNotification({
      title: 'Hotel Partner Added!',
      subtitle: `${newHotel.name} • ${hotelToSave.zone}`,
      time: 'Just now',
      category: 'Hotels',
      iconType: 'hotel'
    });
  };

  // Add Order: Inserts order directly into Cloud Firestore 'orders' collection with joinerId set to currentUser.uid
  const addOrder = (orderData: Partial<MobileOrder>): MobileOrder => {
    const orderNum = Math.floor(1000 + Math.random() * 9000);
    const orderId = `#FB${orderNum}`;

    const mappedItems = cart.map(item => ({
      id: typeof item.product.id === 'number' ? item.product.id : 1,
      productName: item.product.name,
      qty: item.quantity,
      unit: item.product.unit,
      price: item.product.price,
      total: item.quantity * item.product.price
    }));

    const hotelObj = selectedHotel || (hotels.length > 0 ? hotels[0] : null);

    const newOrder: any = {
      id: orderId,
      orderId: orderId,
      hotelId: hotelObj ? hotelObj.id : 'HT01',
      hotelName: orderData.hotelName || (hotelObj ? hotelObj.name : 'Selected Hotel'),
      hotelZone: orderData.hotelZone || (hotelObj ? hotelObj.zone : userProfile.zone.replace(' Zone', '')),
      zone: orderData.hotelZone || (hotelObj ? hotelObj.zone : userProfile.zone.replace(' Zone', '')),
      joiner: userProfile.name || 'Rahul Patil',
      joinerId: userProfile.uid,
      joinedBy: userProfile.uid,
      date: orderData.date || new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      timeSlot: orderData.timeSlot || '8 AM - 10 AM',
      amount: cartTotal,
      totalAmount: cartTotal,
      subtotal: cartTotal,
      deliveryCharge: 0,
      paymentMode: 'Online',
      paymentMethod: 'Online',
      paymentStatus: 'Pending',
      driver: 'Assigned upon dispatch',
      deliveryPartnerId: 'DR01',
      status: 'Pending',
      orderStatus: 'Pending',
      commission: 100,
      items: mappedItems,
      rawItems: [...cart],
      ...orderData
    };

    saveRecord('orders', newOrder, orderId);
    setOrders(prev => [newOrder, ...prev]);
    setLastPlacedOrder(newOrder);
    clearCart();

    const updatedProfile = { ...userProfile, totalOrders: (userProfile.totalOrders || 0) + 1 };
    setUserProfile(updatedProfile);

    addNotification({
      title: 'New Order Placed!',
      subtitle: `${newOrder.hotelName} • ₹${newOrder.amount}`,
      time: 'Just now',
      category: 'Orders',
      iconType: 'order'
    });

    return newOrder;
  };

  const registerUser = async (data: { name: string; phone: string; email: string; zone: string; password?: string }) => {
    const user = await authService.registerJoiner(data);
    setUserProfile({
      uid: user.uid,
      name: user.name,
      role: 'Hotel Joiner',
      zone: user.zone,
      phone: user.phone,
      email: user.email,
      avatar: user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
      totalHotels: 0,
      totalOrders: 0
    });
  };

  const loginUser = async (identifier: string, password?: string) => {
    const user = await authService.loginWithPhoneOrEmail(identifier, password, 'joiner');
    setUserProfile({
      uid: user.uid,
      name: user.name,
      role: 'Hotel Joiner',
      zone: user.zone,
      phone: user.phone,
      email: user.email,
      avatar: user.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
      totalHotels: 0,
      totalOrders: 0
    });
  };

  const logoutUser = async () => {
    await authService.logout();
    setUserProfile({
      uid: '',
      name: '',
      role: 'joiner',
      zone: '',
      phone: '',
      email: '',
      avatar: '',
      totalHotels: 0,
      totalOrders: 0
    });
    setHotels([]);
    setOrders([]);
    setSelectedHotel(null);
    setCurrentScreen('LOGIN');
  };

  const updateUserProfile = async (data: Partial<JoinerUserProfile>) => {
    const updated = { ...userProfile, ...data };
    setUserProfile(updated);
    await authService.saveUserProfile({
      uid: userProfile.uid,
      name: updated.name,
      email: updated.email,
      phone: updated.phone,
      role: 'joiner',
      zone: updated.zone,
      avatar: updated.avatar
    });
  };

  return (
    <JoinerAppContext.Provider
      value={{
        currentScreen,
        setCurrentScreen,
        selectedHotel,
        setSelectedHotel,
        hotels,
        addHotel,
        products,
        cart,
        addToCart,
        updateCartQty,
        removeFromCart,
        clearCart,
        cartTotal,
        orders,
        addOrder,
        lastPlacedOrder,
        selectedOrderForReorder,
        setSelectedOrderForReorder,
        notifications,
        soundEnabled,
        setSoundEnabled,
        playNotificationSound,
        addNotification,
        clearNotifications,
        commissionBalance,
        commissionHistory,
        userProfile,
        registerUser,
        loginUser,
        logoutUser,
        updateUserProfile
      }}
    >
      {children}
    </JoinerAppContext.Provider>
  );
};

export const useJoinerApp = () => {
  const context = useContext(JoinerAppContext);
  if (!context) {
    throw new Error('useJoinerApp must be used within a JoinerAppProvider');
  }
  return context;
};
