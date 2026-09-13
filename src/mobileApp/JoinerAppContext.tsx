import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { soundEngine } from './utils/sound';
import { subscribeToCollection, saveRecord } from '../firebase/dbService';
import { isFirebaseConfigured } from '../firebase/config';

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
  id: number;
  name: string;
  zone: string;
  orders: number;
  status: 'Active' | 'Pending' | 'Inactive';
  image: string;
}

export interface MobileProduct {
  id: number;
  name: string;
  category: 'Vegetables' | 'Fruits' | 'Leafy' | 'Other';
  price: number;
  unit: string;
  image: string;
}

export interface CartItem {
  product: MobileProduct;
  quantity: number;
}

export interface MobileOrder {
  id: string;
  hotelName: string;
  hotelZone: string;
  date: string;
  timeSlot: string;
  amount: number;
  status: 'Pending' | 'Confirmed' | 'Delivered';
  items: CartItem[];
}

export interface MobileNotification {
  id: string;
  title: string;
  subtitle: string;
  time: string;
  category: 'Orders' | 'Hotels' | 'Commission' | 'System';
  iconType: 'order' | 'hotel' | 'commission' | 'product' | 'system';
}

interface JoinerAppContextType {
  currentScreen: MobileScreen;
  setCurrentScreen: (screen: MobileScreen) => void;
  selectedHotel: MobileHotel | null;
  setSelectedHotel: (hotel: MobileHotel | null) => void;
  hotels: MobileHotel[];
  addHotel: (hotel: Omit<MobileHotel, 'id'>) => void;
  products: MobileProduct[];
  cart: CartItem[];
  addToCart: (product: MobileProduct) => void;
  updateCartQty: (productId: number, qty: number) => void;
  removeFromCart: (productId: number) => void;
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
  userProfile: {
    name: string;
    role: string;
    zone: string;
    phone: string;
    email: string;
    avatar: string;
    totalHotels: number;
    totalOrders: number;
  };
  registerUser: (data: { name: string; phone: string; email: string; zone: string }) => void;
  loginUser: (phone: string) => void;
  updateUserProfile: (data: Partial<{
    name: string;
    role: string;
    zone: string;
    phone: string;
    email: string;
    avatar: string;
    totalHotels: number;
    totalOrders: number;
  }>) => void;
}

const defaultHotels: MobileHotel[] = [
  { id: 1, name: 'Hotel Spice Villa', zone: 'Kharadi', orders: 320, status: 'Active', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=100' },
  { id: 2, name: 'Hotel Grand Pune', zone: 'Viman Nagar', orders: 280, status: 'Active', image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=100' },
  { id: 3, name: 'Hotel Green Leaf', zone: 'Mundhwa', orders: 190, status: 'Active', image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=100' },
  { id: 4, name: 'Hotel Maharaja', zone: 'EON IT Park', orders: 210, status: 'Active', image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=100' },
  { id: 5, name: 'Hotel Sai Sagar', zone: 'Kharadi', orders: 175, status: 'Pending', image: 'https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?w=100' },
  { id: 6, name: 'Hotel Shree Palace', zone: 'Viman Nagar', orders: 140, status: 'Active', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=100' }
];

const defaultProducts: MobileProduct[] = [
  { id: 101, name: 'Fresh Fenugreek (Methi)', category: 'Leafy', price: 25, unit: 'bunch', image: '/products/fenugreek.jpg' },
  { id: 102, name: 'Green Pumpkin (Kaddu)', category: 'Vegetables', price: 35, unit: 'kg', image: '/products/pumpkin.jpg' },
  { id: 103, name: 'Eggplant / Brinjal (Baingan)', category: 'Vegetables', price: 42, unit: 'kg', image: '/products/brinjal.jpg' },
  { id: 104, name: 'Fresh Mint (Pudina)', category: 'Leafy', price: 18, unit: 'bunch', image: '/products/mint.jpg' },
  { id: 105, name: 'Fresh Ginger (Adrak)', category: 'Vegetables', price: 90, unit: 'kg', image: '/products/ginger.jpg' },
  { id: 1, name: 'Tomato', category: 'Vegetables', price: 30, unit: 'kg', image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=200' },
  { id: 2, name: 'Onion', category: 'Vegetables', price: 28, unit: 'kg', image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8ce?w=200' },
  { id: 3, name: 'Potato', category: 'Vegetables', price: 24, unit: 'kg', image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=200' },
  { id: 4, name: 'Green Chilli', category: 'Vegetables', price: 40, unit: 'kg', image: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=200' },
  { id: 5, name: 'Capsicum', category: 'Vegetables', price: 60, unit: 'kg', image: 'https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?w=200' },
  { id: 6, name: 'Carrot', category: 'Vegetables', price: 45, unit: 'kg', image: 'https://images.unsplash.com/photo-1447175008436-0841709069c0?w=200' },
  { id: 7, name: 'Cabbage', category: 'Leafy', price: 35, unit: 'kg', image: 'https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?w=200' },
  { id: 8, name: 'Fresh Coriander', category: 'Leafy', price: 20, unit: 'bunch', image: 'https://images.unsplash.com/photo-1608686207856-001b95cf60ca?w=200' },
  { id: 9, name: 'Banana Robusta', category: 'Fruits', price: 45, unit: 'dozen', image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=200' }
];

const defaultInitialCart: CartItem[] = [
  { product: defaultProducts[0], quantity: 5 },  // Methi 5 bunch * 25 = 125
  { product: defaultProducts[1], quantity: 2 },  // Pumpkin 2kg * 35 = 70
  { product: defaultProducts[2], quantity: 4 },  // Brinjal 4kg * 42 = 168
  { product: defaultProducts[3], quantity: 3 },  // Mint 3 bunch * 18 = 54
  { product: defaultProducts[4], quantity: 2 }   // Ginger 2kg * 90 = 180
];

const defaultOrders: MobileOrder[] = [
  {
    id: '#FB1001',
    hotelName: 'Hotel Spice Villa',
    hotelZone: 'Kharadi',
    date: '12 Sep 2026',
    timeSlot: '8 AM - 10 AM',
    amount: 680,
    status: 'Delivered',
    items: [
      { product: defaultProducts[0], quantity: 10 },
      { product: defaultProducts[1], quantity: 5 },
      { product: defaultProducts[2], quantity: 10 },
      { product: defaultProducts[3], quantity: 2 }
    ]
  },
  {
    id: '#FB1002',
    hotelName: 'Hotel Grand Pune',
    hotelZone: 'Viman Nagar',
    date: '11 Sep 2026',
    timeSlot: '7 AM - 9 AM',
    amount: 1200,
    status: 'Confirmed',
    items: [
      { product: defaultProducts[0], quantity: 20 },
      { product: defaultProducts[4], quantity: 10 }
    ]
  },
  {
    id: '#FB1003',
    hotelName: 'Hotel Green Leaf',
    hotelZone: 'Mundhwa',
    date: '10 Sep 2026',
    timeSlot: '9 AM - 11 AM',
    amount: 950,
    status: 'Pending',
    items: [
      { product: defaultProducts[2], quantity: 25 },
      { product: defaultProducts[1], quantity: 10 }
    ]
  },
  {
    id: '#FB1004',
    hotelName: 'Hotel Maharaja',
    hotelZone: 'EON IT Park',
    date: '09 Sep 2026',
    timeSlot: '8 AM - 10 AM',
    amount: 1450,
    status: 'Delivered',
    items: [
      { product: defaultProducts[0], quantity: 30 },
      { product: defaultProducts[3], quantity: 5 }
    ]
  }
];

const defaultNotifications: MobileNotification[] = [
  { id: '1', title: 'New order received', subtitle: 'Hotel Spice Villa • ₹760', time: '10:45 AM', category: 'Orders', iconType: 'order' },
  { id: '2', title: 'Hotel approved', subtitle: 'Hotel Sai Sagar', time: 'Yesterday', category: 'Hotels', iconType: 'hotel' },
  { id: '3', title: 'Commission credited', subtitle: '₹100 for order #FB1001', time: 'Yesterday', category: 'Commission', iconType: 'commission' },
  { id: '4', title: 'Order delivered', subtitle: 'Hotel Green Leaf', time: '10 Sep', category: 'Orders', iconType: 'order' },
  { id: '5', title: 'New product added', subtitle: 'Fresh Cauliflower', time: '09 Sep', category: 'System', iconType: 'product' },
  { id: '6', title: 'System update', subtitle: 'App version 1.2 is live', time: '08 Sep', category: 'System', iconType: 'system' }
];

const JoinerAppContext = createContext<JoinerAppContextType | undefined>(undefined);

export const JoinerAppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const isConnected = isFirebaseConfigured();
  const [currentScreen, setCurrentScreen] = useState<MobileScreen>('DASHBOARD');
  const [hotels, setHotels] = useState<MobileHotel[]>(isConnected ? [] : defaultHotels);
  const [selectedHotel, setSelectedHotel] = useState<MobileHotel | null>(isConnected ? null : defaultHotels[0]);
  const [products, setProducts] = useState<MobileProduct[]>(isConnected ? [] : defaultProducts);
  const [cart, setCart] = useState<CartItem[]>(isConnected ? [] : defaultInitialCart);
  const [orders, setOrders] = useState<MobileOrder[]>(isConnected ? [] : defaultOrders);
  const [lastPlacedOrder, setLastPlacedOrder] = useState<MobileOrder | null>(null);
  const [selectedOrderForReorder, setSelectedOrderForReorder] = useState<MobileOrder | null>(isConnected ? null : defaultOrders[0]);
  const [notifications, setNotifications] = useState<MobileNotification[]>(isConnected ? [] : defaultNotifications);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Subscriptions to live database
  useEffect(() => {
    const unsubHotels = subscribeToCollection<MobileHotel>('hotels', isConnected ? [] : defaultHotels, (h) => {
      setHotels(h);
      if (h.length > 0) {
        setSelectedHotel(prev => prev ? (h.find(item => item.id === prev.id) || h[0]) : h[0]);
      } else {
        setSelectedHotel(null);
      }
    });
    const unsubProducts = subscribeToCollection<any>('products', isConnected ? [] : defaultProducts, (rawProducts) => {
      if (rawProducts && rawProducts.length > 0) {
        const mapped: MobileProduct[] = rawProducts.map((p: any) => {
          let img = p.image;
          const nameLower = (p.name || '').toLowerCase();
          if (nameLower.includes('methi') || nameLower.includes('fenugreek')) img = '/products/fenugreek.jpg';
          else if (nameLower.includes('pumpkin') || nameLower.includes('kaddu')) img = '/products/pumpkin.jpg';
          else if (nameLower.includes('brinjal') || nameLower.includes('eggplant') || nameLower.includes('baingan')) img = '/products/brinjal.jpg';
          else if (nameLower.includes('mint') || nameLower.includes('pudina')) img = '/products/mint.jpg';
          else if (nameLower.includes('ginger') || nameLower.includes('adrak')) img = '/products/ginger.jpg';

          return {
            id: p.id,
            name: p.name,
            category: p.category || 'Vegetables',
            price: Number(p.price ?? p.salePrice ?? 30),
            unit: p.unit ? String(p.unit).toLowerCase() : 'kg',
            image: img || '/products/fenugreek.jpg'
          };
        });

        setProducts(mapped);
      } else {
        setProducts(isConnected ? [] : defaultProducts);
      }
    });
    const unsubOrders = subscribeToCollection<MobileOrder>('orders', isConnected ? [] : defaultOrders, (o) => {
      setOrders(o);
    });
    const unsubNotifs = subscribeToCollection<MobileNotification>('notifications', isConnected ? [] : defaultNotifications, setNotifications);

    return () => {
      unsubHotels();
      unsubProducts();
      unsubOrders();
      unsubNotifs();
    };
  }, [isConnected]);

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
      console.warn('Audio play error', e);
    }
  };

  const addNotification = (notifData: Omit<MobileNotification, 'id'>) => {
    const newNotif: MobileNotification = {
      id: String(Date.now()),
      ...notifData
    };
    saveRecord('notifications', newNotif);
    setNotifications(prev => [newNotif, ...prev]);
    playNotificationSound('notification');
  };

  const clearNotifications = () => {
    setNotifications([]);
    playNotificationSound('pop');
  };

  const [commissionBalance, setCommissionBalance] = useState({
    thisMonth: 4200,
    growth: 18,
    paid: 2800,
    pending: 1400
  });

  const [commissionHistory, setCommissionHistory] = useState([
    { date: '12 Sep 2026', orderId: '#FB1001', amount: 100, status: 'Paid' as const },
    { date: '11 Sep 2026', orderId: '#FB0998', amount: 100, status: 'Paid' as const },
    { date: '10 Sep 2026', orderId: '#FB0990', amount: 100, status: 'Pending' as const },
    { date: '09 Sep 2026', orderId: '#FB0985', amount: 100, status: 'Paid' as const },
    { date: '08 Sep 2026', orderId: '#FB0978', amount: 100, status: 'Paid' as const }
  ]);

  const [userProfile, setUserProfile] = useState({
    name: 'Rahul Patil',
    role: 'Hotel Joiner',
    zone: 'Kharadi Zone',
    phone: '9876543210',
    email: 'rahul.patil@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    totalHotels: 45,
    totalOrders: 320
  });

  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const addToCart = (product: MobileProduct) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const updateCartQty = (productId: number, qty: number) => {
    if (qty <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity: qty } : item
      )
    );
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const addHotel = (newHotel: Omit<MobileHotel, 'id'>) => {
    const hotel: MobileHotel = {
      ...newHotel,
      id: Date.now()
    };
    saveRecord('hotels', hotel);
    setHotels(prev => [hotel, ...prev]);
    setSelectedHotel(hotel);
    setUserProfile(prev => ({
      ...prev,
      totalHotels: prev.totalHotels + 1
    }));
    addNotification({
      title: 'Hotel Partner Added!',
      subtitle: `${hotel.name} • ${hotel.zone}`,
      time: 'Just now',
      category: 'Hotels',
      iconType: 'hotel'
    });
  };

  const addOrder = (orderData: Partial<MobileOrder>): MobileOrder => {
    const newOrder: MobileOrder = {
      id: `#FB${Math.floor(1050 + Math.random() * 50)}`,
      hotelName: selectedHotel ? selectedHotel.name : 'Selected Hotel',
      hotelZone: selectedHotel ? selectedHotel.zone : userProfile.zone,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      timeSlot: '8 AM - 10 AM',
      amount: cartTotal,
      status: 'Pending',
      items: [...cart],
      ...orderData
    };
    saveRecord('orders', newOrder);
    setOrders(prev => [newOrder, ...prev]);
    setLastPlacedOrder(newOrder);
    setUserProfile(prev => ({
      ...prev,
      totalOrders: prev.totalOrders + 1
    }));
    addNotification({
      title: 'New Order Placed!',
      subtitle: `${newOrder.hotelName} • ₹${newOrder.amount}`,
      time: 'Just now',
      category: 'Orders',
      iconType: 'order'
    });
    return newOrder;
  };

  // When a NEW joiner registers: Fresh account with NO hotels!
  const registerUser = (data: { name: string; phone: string; email: string; zone: string }) => {
    setHotels([]);
    setSelectedHotel(null);
    setOrders([]);
    setCart([]);
    setCommissionBalance({
      thisMonth: 0,
      growth: 0,
      paid: 0,
      pending: 0
    });
    setCommissionHistory([]);
    setUserProfile({
      name: data.name,
      phone: data.phone,
      email: data.email,
      zone: `${data.zone} Zone`,
      role: 'Hotel Joiner',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
      totalHotels: 0,
      totalOrders: 0
    });
  };

  const loginUser = (phone: string) => {
    if (phone === '9876543210') {
      // Restore Rahul Patil Demo account
      setUserProfile({
        name: 'Rahul Patil',
        role: 'Hotel Joiner',
        zone: 'Kharadi Zone',
        phone: '9876543210',
        email: 'rahul.patil@gmail.com',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
        totalHotels: 45,
        totalOrders: 320
      });
      setHotels(defaultHotels);
      setSelectedHotel(defaultHotels[0]);
      setOrders(defaultOrders);
      setCart(defaultInitialCart);
      setCommissionBalance({
        thisMonth: 4200,
        growth: 18,
        paid: 2800,
        pending: 1400
      });
    } else {
      setUserProfile(prev => ({ ...prev, phone }));
    }
  };

  const updateUserProfile = (data: Partial<typeof userProfile>) => {
    setUserProfile(prev => ({ ...prev, ...data }));
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
