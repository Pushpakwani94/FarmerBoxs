import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type {
  Order,
  Zone,
  Joiner,
  Driver,
  Hotel,
  Product,
  PaymentTransaction,
  NotificationItem,
  OrderStatus
} from '../types';
import {
  initialOrders,
  initialZones,
  initialJoiners,
  initialHotels,
  initialPayments,
  initialNotifications
} from '../mockData';
import { initialDriversList } from '../data/driversData';
import { initialProductsList } from '../data/productsData';
import {
  subscribeToCollection,
  saveRecord,
  deleteRecord,
  seedFirestoreDatabase,
  clearLocalDummyCache
} from '../firebase/dbService';
import { isFirebaseConfigured } from '../firebase/config';

export interface AdminProfile {
  name: string;
  role: string;
  email: string;
  phone: string;
  avatar: string;
  zone: string;
  location: string;
  department: string;
  joinedDate: string;
}

interface AppContextType {
  orders: Order[];
  zones: Zone[];
  joiners: Joiner[];
  drivers: Driver[];
  hotels: Hotel[];
  products: Product[];
  payments: PaymentTransaction[];
  notifications: NotificationItem[];
  isDatabaseConnected: boolean;
  seedDatabaseToFirebase: () => Promise<any>;

  activeTab: string;
  setActiveTab: (tab: string) => void;

  selectedOrder: Order | null;
  setSelectedOrder: (order: Order | null) => void;
  selectedZone: Zone | null;
  setSelectedZone: (zone: Zone | null) => void;
  selectedJoiner: Joiner | null;
  setSelectedJoiner: (joiner: Joiner | null) => void;
  selectedHotel: Hotel | null;
  setSelectedHotel: (hotel: Hotel | null) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  selectedDriver: Driver | null;
  setSelectedDriver: (driver: Driver | null) => void;

  // Modals visibility
  isAddHotelOpen: boolean;
  setIsAddHotelOpen: (open: boolean) => void;
  isAddJoinerOpen: boolean;
  setIsAddJoinerOpen: (open: boolean) => void;
  isAddZoneOpen: boolean;
  setIsAddZoneOpen: (open: boolean) => void;
  isAddDriverOpen: boolean;
  setIsAddDriverOpen: (open: boolean) => void;
  isAddProductOpen: boolean;
  setIsAddProductOpen: (open: boolean) => void;
  isNotificationsOpen: boolean;
  setIsNotificationsOpen: (open: boolean) => void;
  isOrderDetailModalOpen: boolean;
  setIsOrderDetailModalOpen: (open: boolean) => void;
  isAdminProfileOpen: boolean;
  setIsAdminProfileOpen: (open: boolean) => void;

  // Admin Profile
  adminProfile: AdminProfile;
  updateAdminProfile: (data: Partial<AdminProfile>) => void;
  markNotificationsAsRead: () => void;

  // Actions
  updateOrderStatus: (orderId: string, newStatus: OrderStatus) => void;
  addZone: (name: string, area?: string, status?: 'Active' | 'Inactive') => void;
  updateZone: (zoneId: number, data: Partial<Zone>) => void;
  deleteZone: (zoneId: number) => void;
  addJoiner: (name: string, mobile: string, zone: string, email?: string, status?: 'Active' | 'Inactive') => void;
  updateJoiner: (joinerId: number, data: Partial<Joiner>) => void;
  deleteJoiner: (joinerId: number) => void;
  addHotel: (
    nameOrData: string | { name: string; contactPerson?: string; ownerName?: string; phone?: string; mobile?: string; zone: string; joiner: string; address?: string; status?: 'Active' | 'Inactive' },
    owner?: string,
    mobile?: string,
    zone?: string,
    joiner?: string
  ) => void;
  addDriver: (driver: Partial<Driver>) => void;
  updateDriver: (driverId: number, data: Partial<Driver>) => void;
  deleteDriver: (driverId: number) => void;
  addProduct: (product: Partial<Product>) => void;
  updateProduct: (productId: number, data: Partial<Product>) => void;
  deleteProduct: (productId: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const isConnected = isFirebaseConfigured();

  const [orders, setOrders] = useState<Order[]>([]);
  const [zones, setZones] = useState<Zone[]>([]);
  const [joiners, setJoiners] = useState<Joiner[]>([]);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [payments, setPayments] = useState<PaymentTransaction[]>([]);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  // Subscriptions to Realtime Database (Dummy data removed if Firebase is connected)
  useEffect(() => {
    // If Firebase is active, purge any old mock data from local storage
    if (isConnected) {
      clearLocalDummyCache();
    }

    const unsubOrders = subscribeToCollection<Order>('orders', isConnected ? [] : initialOrders, setOrders);
    const unsubZones = subscribeToCollection<Zone>('zones', isConnected ? [] : initialZones, (z) => {
      setZones(z);
      setSelectedZone(prev => prev ? (z.find(item => String(item.id) === String(prev.id)) || z[0] || null) : (z[0] || null));
    });
    const unsubJoiners = subscribeToCollection<Joiner>('joiners', isConnected ? [] : initialJoiners, (j) => {
      setJoiners(j);
      setSelectedJoiner(prev => prev ? (j.find(item => String(item.id) === String(prev.id)) || j[0] || null) : (j[0] || null));
    });
    const unsubDrivers = subscribeToCollection<Driver>('drivers', isConnected ? [] : initialDriversList, (d) => {
      setDrivers(d);
      setSelectedDriver(prev => prev ? (d.find(item => String(item.id) === String(prev.id)) || d[0] || null) : (d[0] || null));
    });
    const unsubHotels = subscribeToCollection<Hotel>('hotels', isConnected ? [] : initialHotels, (h) => {
      setHotels(h);
      setSelectedHotel(prev => prev ? (h.find(item => String(item.id) === String(prev.id)) || h[0] || null) : (h[0] || null));
    });
    const unsubProducts = subscribeToCollection<Product>('products', isConnected ? [] : initialProductsList, (p) => {
      setProducts(p);
      setSelectedProduct(prev => prev ? (p.find(item => String(item.id) === String(prev.id)) || p[0] || null) : (p[0] || null));
    });
    const unsubPayments = subscribeToCollection<PaymentTransaction>('payments', isConnected ? [] : initialPayments, setPayments);
    const unsubNotifs = subscribeToCollection<NotificationItem>('notifications', isConnected ? [] : initialNotifications, setNotifications);

    return () => {
      unsubOrders();
      unsubZones();
      unsubJoiners();
      unsubDrivers();
      unsubHotels();
      unsubProducts();
      unsubPayments();
      unsubNotifs();
    };
  }, [isConnected]);

  const [activeTab, setActiveTab] = useState<string>('Dashboard');

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [selectedZone, setSelectedZone] = useState<Zone | null>(isConnected ? null : initialZones[0]);
  const [selectedJoiner, setSelectedJoiner] = useState<Joiner | null>(isConnected ? null : initialJoiners[0]);
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(isConnected ? null : initialHotels[0]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(isConnected ? null : initialProductsList[0]);
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(isConnected ? null : initialDriversList[0]);

  const [isAddHotelOpen, setIsAddHotelOpen] = useState(false);
  const [isAddJoinerOpen, setIsAddJoinerOpen] = useState(false);
  const [isAddZoneOpen, setIsAddZoneOpen] = useState(false);
  const [isAddDriverOpen, setIsAddDriverOpen] = useState(false);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isOrderDetailModalOpen, setIsOrderDetailModalOpen] = useState(false);
  const [isAdminProfileOpen, setIsAdminProfileOpen] = useState(false);

  const [adminProfile, setAdminProfile] = useState<AdminProfile>({
    name: 'Pushpak Wani',
    role: 'Super Admin',
    email: 'admin@farmerbox.com',
    phone: '+91 98765 43210',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300',
    zone: 'All Zones (HQ)',
    location: 'Pune, Maharashtra',
    department: 'Operations & Management',
    joinedDate: 'Jan 2025'
  });

  const updateAdminProfile = (data: Partial<AdminProfile>) => {
    setAdminProfile(prev => ({ ...prev, ...data }));
  };

  const markNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const updateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    const existing = orders.find(o => String(o.id) === String(orderId));
    if (existing) {
      const updated = {
        ...existing,
        status: newStatus,
        commission: newStatus === 'Delivered' ? 100 : existing.commission
      };
      saveRecord('orders', updated);
    }
    setOrders(prev =>
      prev.map(ord => {
        if (String(ord.id) === String(orderId)) {
          return {
            ...ord,
            status: newStatus,
            commission: newStatus === 'Delivered' ? 100 : ord.commission
          };
        }
        return ord;
      })
    );
  };

  const addZone = (name: string, area?: string, status?: 'Active' | 'Inactive') => {
    const newZone: Zone = {
      id: Date.now(),
      name,
      areaLocations: area || `${name}, Pune`,
      joinersCount: 0,
      hotelsCount: 0,
      ordersThisMonth: 0,
      salesThisMonth: 0,
      status: status || 'Active',
      color: '#38bdf8'
    };
    saveRecord('zones', newZone);
    setZones(prev => [newZone, ...prev]);
  };

  const updateZone = (zoneId: number, data: Partial<Zone>) => {
    const existing = zones.find(z => z.id === zoneId);
    if (existing) {
      const updated = { ...existing, ...data };
      saveRecord('zones', updated);
    }
    setZones(prev => prev.map(z => z.id === zoneId ? { ...z, ...data } : z));
    if (selectedZone && selectedZone.id === zoneId) {
      setSelectedZone({ ...selectedZone, ...data });
    }
  };

  const deleteZone = (zoneId: number) => {
    deleteRecord('zones', zoneId);
    setZones(prev => prev.filter(z => z.id !== zoneId));
    if (selectedZone && selectedZone.id === zoneId) {
      setSelectedZone(null);
    }
  };

  const addJoiner = (name: string, mobile: string, zone: string, email?: string, status?: 'Active' | 'Inactive') => {
    const newJoiner: Joiner = {
      id: Date.now(),
      joinerCode: `JN0${joiners.length + 1}`,
      name,
      mobile,
      email: email || `${name.toLowerCase().replace(/\s+/g, '')}@email.com`,
      zone,
      totalHotels: 0,
      totalOrders: 0,
      totalEarnings: 0,
      paidAmount: 0,
      pendingAmount: 0,
      status: status || 'Active',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
      joinedDate: 'Just now'
    };
    saveRecord('joiners', newJoiner);
    setJoiners(prev => [newJoiner, ...prev]);
  };

  const updateJoiner = (joinerId: number, data: Partial<Joiner>) => {
    const existing = joiners.find(j => j.id === joinerId);
    if (existing) {
      const updated = { ...existing, ...data };
      saveRecord('joiners', updated);
    }
    setJoiners(prev => prev.map(j => j.id === joinerId ? { ...j, ...data } : j));
    if (selectedJoiner && selectedJoiner.id === joinerId) {
      setSelectedJoiner({ ...selectedJoiner, ...data });
    }
  };

  const deleteJoiner = (joinerId: number) => {
    deleteRecord('joiners', joinerId);
    setJoiners(prev => prev.filter(j => j.id !== joinerId));
    if (selectedJoiner && selectedJoiner.id === joinerId) {
      setSelectedJoiner(null);
    }
  };

  const addHotel = (
    hotelOrName: string | any,
    ownerName?: string,
    mobile?: string,
    zone?: string,
    joiner?: string
  ) => {
    let nameVal = '';
    let ownerVal = '';
    let mobileVal = '';
    let zoneVal = '';
    let joinerVal = '';
    let addressVal = '';

    if (typeof hotelOrName === 'object' && hotelOrName !== null) {
      nameVal = hotelOrName.name || 'New Hotel';
      ownerVal = hotelOrName.contactPerson || hotelOrName.ownerName || 'Owner';
      mobileVal = hotelOrName.phone || hotelOrName.mobile || '9876543210';
      zoneVal = hotelOrName.zone || 'Kharadi';
      joinerVal = hotelOrName.joiner || 'Rahul Sharma';
      addressVal = hotelOrName.address || `${zoneVal}, Pune`;
    } else {
      nameVal = hotelOrName;
      ownerVal = ownerName || 'Owner';
      mobileVal = mobile || '9876543210';
      zoneVal = zone || 'Kharadi';
      joinerVal = joiner || 'Rahul Sharma';
      addressVal = `${zoneVal}, Pune`;
    }

    const newHotel: Hotel = {
      id: Date.now(),
      name: nameVal,
      ownerName: ownerVal,
      mobile: mobileVal,
      email: `${nameVal.toLowerCase().replace(/\s+/g, '')}@hotel.com`,
      zone: zoneVal,
      joiner: joinerVal,
      address: addressVal,
      totalOrders: 0,
      totalSpent: 0,
      registrationDate: 'Just now',
      gstNumber: '27ABCDE1234F9Z9',
      fssaiNumber: '11521007000999',
      rating: 5.0,
      status: 'Active',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300'
    };
    saveRecord('hotels', newHotel);
    setHotels(prev => [newHotel, ...prev]);
  };

  const addDriver = (driverData: Partial<Driver>) => {
    const newDriver: Driver = {
      id: Date.now(),
      name: driverData.name || 'New Driver',
      mobile: driverData.mobile || '9876543210',
      zone: driverData.zone || 'Kharadi',
      vehicleNo: driverData.vehicleNo || 'MH12 AB 9999',
      status: driverData.status || 'Active',
      totalDeliveries: 0,
      rating: 5.0,
      avatar: driverData.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
      email: driverData.email || `${(driverData.name || 'driver').toLowerCase().replace(/\s+/g, '')}@farmerbox.in`,
      emergencyContact: driverData.emergencyContact || '9876543210',
      licenseNumber: driverData.licenseNumber || `MH12-${Date.now().toString().slice(-8)}`,
      vehicleModel: driverData.vehicleModel || 'Tata Ace Gold',
      joiningDate: 'Just now',
      completedToday: 0,
      activeDeliveries: 0,
      onTimeRate: '100%',
      recentOrders: []
    };
    saveRecord('drivers', newDriver);
    setDrivers(prev => [newDriver, ...prev]);
  };

  const updateDriver = (driverId: number, data: Partial<Driver>) => {
    const existing = drivers.find(d => d.id === driverId);
    if (existing) {
      const updated = { ...existing, ...data };
      saveRecord('drivers', updated);
    }
    setDrivers(prev => prev.map(d => (d.id === driverId ? { ...d, ...data } : d)));
    if (selectedDriver && selectedDriver.id === driverId) {
      setSelectedDriver(prev => (prev ? { ...prev, ...data } : null));
    }
  };

  const deleteDriver = (driverId: number) => {
    deleteRecord('drivers', driverId);
    setDrivers(prev => prev.filter(d => d.id !== driverId));
    if (selectedDriver && selectedDriver.id === driverId) {
      setSelectedDriver(null);
    }
  };

  const addProduct = (prodData: Partial<Product>) => {
    const newProduct: Product = {
      id: Date.now(),
      name: prodData.name || 'New Vegetable',
      category: prodData.category || 'Vegetables',
      unit: prodData.unit || 'KG',
      purchasePrice: prodData.purchasePrice || 30,
      salePrice: prodData.salePrice || 45,
      stock: prodData.stock ?? 100,
      minimumStock: prodData.minimumStock ?? 25,
      status: (prodData.status as any) || 'Active',
      addedOn: 'Just now',
      image: prodData.image || 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=200',
      description: prodData.description || 'Fresh farm-sourced produce.',
      images: prodData.images || [prodData.image || 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=200'],
      stockHistory: [
        { date: 'Today', type: 'Stock In', qty: `+${prodData.stock ?? 100} ${prodData.unit || 'KG'}`, ref: `PO-${Date.now().toString().slice(-4)}`, user: 'Admin' }
      ]
    };
    saveRecord('products', newProduct);
    setProducts(prev => [newProduct, ...prev]);
    setSelectedProduct(newProduct);
  };

  const updateProduct = (productId: number, data: Partial<Product>) => {
    const existing = products.find(p => p.id === productId);
    if (existing) {
      const updated = { ...existing, ...data };
      saveRecord('products', updated);
    }
    setProducts(prev => prev.map(p => (p.id === productId ? { ...p, ...data } : p)));
    if (selectedProduct && selectedProduct.id === productId) {
      setSelectedProduct(prev => (prev ? { ...prev, ...data } : null));
    }
  };

  const deleteProduct = (productId: number) => {
    deleteRecord('products', productId);
    setProducts(prev => prev.filter(p => p.id !== productId));
    if (selectedProduct && selectedProduct.id === productId) {
      setSelectedProduct(products.find(p => p.id !== productId) || null);
    }
  };

  return (
    <AppContext.Provider
      value={{
        orders,
        zones,
        joiners,
        drivers,
        hotels,
        products,
        payments,
        notifications,
        isDatabaseConnected: isFirebaseConfigured(),
        seedDatabaseToFirebase: seedFirestoreDatabase,
        activeTab,
        setActiveTab,
        selectedOrder,
        setSelectedOrder,
        selectedZone,
        setSelectedZone,
        selectedJoiner,
        setSelectedJoiner,
        selectedHotel,
        setSelectedHotel,
        selectedProduct,
        setSelectedProduct,
        selectedDriver,
        setSelectedDriver,
        isAddHotelOpen,
        setIsAddHotelOpen,
        isAddJoinerOpen,
        setIsAddJoinerOpen,
        isAddZoneOpen,
        setIsAddZoneOpen,
        isAddDriverOpen,
        setIsAddDriverOpen,
        isAddProductOpen,
        setIsAddProductOpen,
        isNotificationsOpen,
        setIsNotificationsOpen,
        isOrderDetailModalOpen,
        setIsOrderDetailModalOpen,
        isAdminProfileOpen,
        setIsAdminProfileOpen,
        adminProfile,
        updateAdminProfile,
        markNotificationsAsRead,
        updateOrderStatus,
        addZone,
        updateZone,
        deleteZone,
        addJoiner,
        updateJoiner,
        deleteJoiner,
        addHotel,
        addDriver,
        updateDriver,
        deleteDriver,
        addProduct,
        updateProduct,
        deleteProduct
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
