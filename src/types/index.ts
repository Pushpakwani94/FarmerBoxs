export type OrderStatus = 'Delivered' | 'Out for Delivery' | 'Preparing' | 'Confirmed' | 'Pending' | 'Cancelled';
export const OrderStatus = {
  Delivered: 'Delivered',
  OutForDelivery: 'Out for Delivery',
  Preparing: 'Preparing',
  Confirmed: 'Confirmed',
  Pending: 'Pending',
  Cancelled: 'Cancelled'
} as const;

export interface OrderItem {
  id: number;
  productName: string;
  qty: number;
  unit: string;
  price: number;
  total: number;
}

export interface Order {
  id: string; // e.g., FB1001
  date: string;
  time: string;
  hotelName: string;
  hotelImage?: string;
  hotelOwner?: string;
  hotelPhone?: string;
  zone: string;
  joiner: string;
  amount: number;
  paymentMode: 'Online' | 'COD' | 'Wallet';
  paymentStatus: 'Paid' | 'Pending' | 'Refunded';
  transactionId?: string;
  driver: string;
  driverPhone?: string;
  deliveryAddress?: string;
  status: OrderStatus;
  commission: number;
  items?: OrderItem[];
  subtotal?: number;
  deliveryCharge?: number;
  discount?: number;
}

export interface Zone {
  id: number;
  name: string;
  areaLocations: string;
  joinersCount: number;
  hotelsCount: number;
  ordersThisMonth: number;
  salesThisMonth: number;
  status: 'Active' | 'Inactive';
  color?: string;
  assignedJoinersList?: { name: string; hotelsCount: number; phone: string; status: 'Active' | 'Inactive' }[];
}

export interface AssignedHotel {
  id?: number;
  name: string;
  location: string;
  owner?: string;
  phone?: string;
  orders?: number;
  joinedDate?: string;
  status: 'Active' | 'Inactive';
}

export interface Joiner {
  id: number;
  joinerCode: string;
  name: string;
  mobile: string;
  email: string;
  zone: string;
  totalHotels: number;
  totalOrders: number;
  totalEarnings: number;
  paidAmount: number;
  pendingAmount: number;
  status: 'Active' | 'Inactive';
  avatar: string;
  joinedDate: string;
  assignedHotelsList?: AssignedHotel[];
  performanceHistory?: { month: string; orders: number }[];
}

export const AssignedHotel = {} as unknown as AssignedHotel;

export interface Driver {
  id: number;
  name: string;
  mobile: string;
  zone: string;
  vehicleNo: string;
  status: 'Active' | 'On Leave' | 'Inactive';
  totalDeliveries: number;
  rating: number;
  avatar: string;
  email?: string;
  emergencyContact?: string;
  licenseNumber?: string;
  vehicleModel?: string;
  joiningDate?: string;
  completedToday?: number;
  activeDeliveries?: number;
  onTimeRate?: string;
  recentOrders?: {
    id: string;
    hotelName: string;
    zone: string;
    time: string;
    status: 'Delivered' | 'In Transit' | 'Assigned';
    amount: number;
  }[];
}

export interface Hotel {
  id: number;
  name: string;
  ownerName: string;
  mobile: string;
  email: string;
  zone: string;
  joiner: string;
  address: string;
  totalOrders: number;
  totalSpent: number;
  registrationDate: string;
  gstNumber: string;
  fssaiNumber: string;
  rating: number;
  status: 'Active' | 'Inactive';
  image: string;
  orderHistory?: { id: string; date: string; amount: number; status: OrderStatus }[];
}

export interface Product {
  id: number;
  image: string;
  name: string;
  category: string;
  unit: string;
  purchasePrice: number;
  salePrice: number;
  stock: number;
  minimumStock: number;
  status: 'Active' | 'Low Stock' | 'Out of Stock';
  addedOn: string;
  description?: string;
  images?: string[];
  stockHistory?: { date: string; type: 'Stock In' | 'Stock Out'; qty: string; ref: string; user: string }[];
}

export interface PaymentTransaction {
  id: number;
  dateTime: string;
  referenceId: string;
  type: 'Order Payment' | 'COD Payment' | 'Joiner Commission' | 'Driver Payout' | 'Refund';
  fromTo: string;
  orderId: string;
  amount: number;
  status: 'Success' | 'Pending' | 'Refunded';
  paymentMode: string;
}

export interface NotificationItem {
  id: number | string;
  title: string;
  message?: string;
  subtitle?: string;
  userType?: 'Hotels' | 'Drivers' | 'Joiners' | 'Admins' | 'All Users' | string;
  status?: 'Sent' | 'Scheduled' | 'Failed' | string;
  dateTime?: string;
  read?: boolean;
  time?: string;
  category?: string;
  iconType?: string;
}

// Runtime exports for Vite ES module safety
export const Zone = {} as unknown as Zone;
export const Joiner = {} as unknown as Joiner;
export const Driver = {} as unknown as Driver;
export const Hotel = {} as unknown as Hotel;
export const Product = {} as unknown as Product;
export const PaymentTransaction = {} as unknown as PaymentTransaction;
export const NotificationItem = {} as unknown as NotificationItem;
