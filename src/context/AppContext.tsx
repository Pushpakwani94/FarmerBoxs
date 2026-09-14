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
  bio?: string;
  emergencyContact?: string;
  timezone?: string;
  language?: string;
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
  markNotificationAsRead: (id: number | string) => void;
  clearAllNotifications: () => void;

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
  updateHotel: (hotelId: number, data: Partial<Hotel>) => void;
  deleteHotel: (hotelId: number) => void;
  addDriver: (driver: Partial<Driver>) => void;
  updateDriver: (driverId: number, data: Partial<Driver>) => void;
  deleteDriver: (driverId: number) => void;
  addProduct: (product: Partial<Product>) => void;
  updateProduct: (productId: number, data: Partial<Product>) => void;
  deleteProduct: (productId: number) => void;
  addOrder: (order: Partial<Order>) => void;
  deleteOrder: (orderId: string) => void;
  addPayment: (payment: Partial<PaymentTransaction>) => void;
  addNotification: (notification: Partial<NotificationItem>) => void;
  deleteNotification: (id: number | string) => void;
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

  // Subscriptions to Cloud Firestore
  useEffect(() => {
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
    const unsubNotifs = subscribeToCollection<any>('notifications', isConnected ? [] : initialNotifications, (rawNotifs) => {
      const normalized: NotificationItem[] = (rawNotifs || []).map((n: any) => ({
        id: n.id !== undefined && n.id !== null ? n.id : Date.now(),
        title: n.title || 'Notification',
        message: n.message || n.subtitle || 'No details provided',
        subtitle: n.subtitle || n.message || '',
        userType: n.userType || n.category || 'All Users',
        status: n.status || 'Sent',
        dateTime: n.dateTime || n.time || new Date().toLocaleString(),
        time: n.time || n.dateTime || 'Just now',
        read: Boolean(n.read),
        category: n.category || 'System',
        iconType: n.iconType || 'system'
      }));
      setNotifications(normalized);
    });

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

  const [adminProfile, setAdminProfile] = useState<AdminProfile>(() => {
    try {
      const saved = localStorage.getItem('farmerbox_admin_profile');
      if (saved) {
        return {
          name: 'Pushpak Wani',
          role: 'Super Admin',
          email: 'admin@farmerbox.com',
          phone: '+91 98765 43210',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300',
          zone: 'All Zones (HQ)',
          location: 'Pune, Maharashtra',
          department: 'Operations & Management',
          joinedDate: 'Jan 2025',
          bio: 'Overseeing daily vegetable supply chain operations, hotel partner onboardings, and automated driver dispatch across Pune metropolitan area.',
          emergencyContact: '+91 98220 11223 (Operations Manager)',
          timezone: '(GMT+05:30) Asia/Kolkata',
          language: 'English (India)',
          ...JSON.parse(saved)
        };
      }
    } catch (e) {
      console.warn('Failed to parse admin profile', e);
    }
    return {
      name: 'Pushpak Wani',
      role: 'Super Admin',
      email: 'admin@farmerbox.com',
      phone: '+91 98765 43210',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300',
      zone: 'All Zones (HQ)',
      location: 'Pune, Maharashtra',
      department: 'Operations & Management',
      joinedDate: 'Jan 2025',
      bio: 'Overseeing daily vegetable supply chain operations, hotel partner onboardings, and automated driver dispatch across Pune metropolitan area.',
      emergencyContact: '+91 98220 11223 (Operations Manager)',
      timezone: '(GMT+05:30) Asia/Kolkata',
      language: 'English (India)'
    };
  });

  const updateAdminProfile = (data: Partial<AdminProfile>) => {
    setAdminProfile(prev => {
      const updated = { ...prev, ...data };
      try {
        localStorage.setItem('farmerbox_admin_profile', JSON.stringify(updated));
      } catch (e) {
        console.warn('Failed to persist admin profile', e);
      }
      return updated;
    });
  };

  const markNotificationsAsRead = () => {
    notifications.forEach(n => {
      if (!n.read) {
        saveRecord('notifications', { ...n, read: true }, String(n.id));
      }
    });
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const markNotificationAsRead = (id: number | string) => {
    const target = notifications.find(n => String(n.id) === String(id));
    if (target && !target.read) {
      saveRecord('notifications', { ...target, read: true }, String(target.id));
    }
    setNotifications(prev => prev.map(n => (String(n.id) === String(id) ? { ...n, read: true } : n)));
  };

  const clearAllNotifications = () => {
    notifications.forEach(n => {
      deleteRecord('notifications', n.id);
    });
    setNotifications([]);
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
      addNotification({
        title: `Order #${orderId} ${newStatus}`,
        message: `Order status changed to ${newStatus} for ${existing.hotelName}`,
        subtitle: `${existing.hotelName} • ${newStatus}`,
        userType: 'Admins',
        status: 'Sent',
        category: 'Orders',
        iconType: 'order',
        read: false
      });
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
    addNotification({
      title: 'New Hotel Registered',
      message: `${newHotel.name} registered in ${newHotel.zone} Zone`,
      subtitle: `${newHotel.name} • ${newHotel.zone}`,
      userType: 'Admins',
      status: 'Sent',
      category: 'Hotels',
      iconType: 'hotel',
      read: false
    });
  };

  const updateHotel = (hotelId: number, data: Partial<Hotel>) => {
    const existing = hotels.find(h => h.id === hotelId);
    if (existing) {
      const updated = { ...existing, ...data };
      saveRecord('hotels', updated);
    }
    setHotels(prev => prev.map(h => (h.id === hotelId ? { ...h, ...data } : h)));
    if (selectedHotel && selectedHotel.id === hotelId) {
      setSelectedHotel(prev => (prev ? { ...prev, ...data } : null));
    }
  };

  const deleteHotel = (hotelId: number) => {
    deleteRecord('hotels', hotelId);
    setHotels(prev => prev.filter(h => h.id !== hotelId));
    if (selectedHotel && selectedHotel.id === hotelId) {
      setSelectedHotel(null);
    }
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

  const addOrder = (orderData: Partial<Order>) => {
    const newOrder: Order = {
      id: orderData.id || `FB${Math.floor(1000 + Math.random() * 9000)}`,
      date: orderData.date || new Date().toISOString().split('T')[0],
      time: orderData.time || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      hotelName: orderData.hotelName || 'New Hotel',
      hotelImage: orderData.hotelImage || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=100',
      zone: orderData.zone || 'Kharadi',
      joiner: orderData.joiner || 'Rahul Patil',
      amount: orderData.amount || 0,
      paymentMode: orderData.paymentMode || 'Online',
      paymentStatus: orderData.paymentStatus || 'Pending',
      driver: orderData.driver || 'Suresh Jadhav',
      status: orderData.status || 'Pending',
      commission: orderData.commission || 0,
      items: orderData.items || [],
      ...orderData
    };
    saveRecord('orders', newOrder);
    setOrders(prev => [newOrder, ...prev]);
    addNotification({
      title: 'New Order Received',
      message: `${newOrder.hotelName} placed order #${newOrder.id} for ₹${newOrder.amount}`,
      subtitle: `${newOrder.hotelName} • ₹${newOrder.amount}`,
      userType: 'Admins',
      status: 'Sent',
      category: 'Orders',
      iconType: 'order',
      read: false
    });
  };

  const deleteOrder = (orderId: string) => {
    deleteRecord('orders', orderId);
    setOrders(prev => prev.filter(o => String(o.id) !== String(orderId)));
    if (selectedOrder && String(selectedOrder.id) === String(orderId)) {
      setSelectedOrder(null);
    }
  };

  const addPayment = (paymentData: Partial<PaymentTransaction>) => {
    const newPayment: PaymentTransaction = {
      id: paymentData.id || Date.now(),
      dateTime: paymentData.dateTime || new Date().toLocaleString(),
      referenceId: paymentData.referenceId || `TXN${Math.floor(100000 + Math.random() * 900000)}`,
      type: paymentData.type || 'Order Payment',
      fromTo: paymentData.fromTo || 'Customer',
      orderId: paymentData.orderId || `FB${Math.floor(1000 + Math.random() * 9000)}`,
      amount: paymentData.amount || 0,
      status: paymentData.status || 'Success',
      paymentMode: paymentData.paymentMode || 'Online',
      ...paymentData
    };
    saveRecord('payments', newPayment);
    setPayments(prev => [newPayment, ...prev]);
  };

  const addNotification = (notifData: Partial<NotificationItem>) => {
    const docId = notifData.id !== undefined && notifData.id !== null ? String(notifData.id) : String(Date.now());
    const nowStr = new Date().toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
    const newNotif: NotificationItem = {
      id: notifData.id !== undefined && notifData.id !== null ? notifData.id : Date.now(),
      title: notifData.title || 'Notification',
      message: notifData.message || notifData.subtitle || 'System notification',
      subtitle: notifData.subtitle || notifData.message || '',
      userType: notifData.userType || notifData.category || 'All Users',
      status: notifData.status || 'Sent',
      dateTime: notifData.dateTime || nowStr,
      time: notifData.time || 'Just now',
      read: false,
      category: notifData.category || 'System',
      iconType: notifData.iconType || 'system',
      ...notifData
    };
    saveRecord('notifications', newNotif, docId);
    setNotifications(prev => [newNotif, ...prev.filter(n => String(n.id) !== docId)]);
  };

  const deleteNotification = (id: number | string) => {
    deleteRecord('notifications', id);
    setNotifications(prev => prev.filter(n => String(n.id) !== String(id)));
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
        markNotificationAsRead,
        clearAllNotifications,
        updateOrderStatus,
        addZone,
        updateZone,
        deleteZone,
        addJoiner,
        updateJoiner,
        deleteJoiner,
        addHotel,
        updateHotel,
        deleteHotel,
        addDriver,
        updateDriver,
        deleteDriver,
        addProduct,
        updateProduct,
        deleteProduct,
        addOrder,
        deleteOrder,
        addPayment,
        addNotification,
        deleteNotification
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
