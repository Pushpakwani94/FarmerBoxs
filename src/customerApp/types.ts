export type CustomerScreen =
  | 'splash' | 'SPLASH'
  | 'onboarding-1' | 'ONBOARDING_1'
  | 'onboarding-2' | 'ONBOARDING_2'
  | 'onboarding-3' | 'ONBOARDING_3'
  | 'login-signup' | 'login' | 'LOGIN' | 'LOGIN_SIGNUP'
  | 'otp-verify' | 'otp' | 'OTP' | 'OTP_VERIFY'
  | 'home' | 'HOME'
  | 'categories' | 'CATEGORIES'
  | 'product-listing' | 'PRODUCT_LISTING'
  | 'product-detail' | 'PRODUCT_DETAIL'
  | 'search' | 'SEARCH'
  | 'cart' | 'CART'
  | 'address-selection' | 'address' | 'ADDRESS' | 'ADDRESS_SELECTION'
  | 'payment-method' | 'payment' | 'PAYMENT' | 'PAYMENT_METHOD'
  | 'order-success' | 'ORDER_SUCCESS'
  | 'my-orders' | 'MY_ORDERS'
  | 'wishlist' | 'WISHLIST'
  | 'wallet' | 'WALLET'
  | 'offers' | 'OFFERS'
  | 'notifications' | 'NOTIFICATIONS'
  | 'help-support' | 'HELP_SUPPORT'
  | 'settings' | 'SETTINGS'
  | 'profile' | 'PROFILE';

export type CustomerScreenType = CustomerScreen;

export interface CustomerUser {
  id: string;
  name: string;
  phone: string;
  email: string;
  avatar: string;
  walletBalance: number;
}

export interface CustomerAddress {
  id: string;
  type: 'Home' | 'Work' | 'Other';
  label: string;
  flat: string;
  area: string;
  landmark?: string;
  city: string;
  pincode: string;
  isDefault?: boolean;
}

export interface CustomerCartItem {
  productId: number;
  name: string;
  category: string;
  unit: string;
  price: number;
  originalPrice?: number;
  image: string;
  quantity: number;
  isImported?: boolean;
  originCountry?: string;
}

export interface CustomerOrder {
  id: string;
  items: CustomerCartItem[];
  totalAmount: number;
  itemTotal: number;
  deliveryFee: number;
  discountAmount: number;
  couponCode?: string;
  paymentMethod: 'UPI' | 'Card' | 'NetBanking' | 'COD';
  deliveryAddress: CustomerAddress;
  status: 'Processing' | 'Delivered' | 'Cancelled' | 'Out for Delivery';
  orderDate: string;
  estimatedDelivery: string;
  customerName: string;
  customerPhone: string;
}

export interface CustomerNotification {
  id: string;
  title: string;
  message: string;
  type: 'order' | 'offer' | 'system';
  time: string;
  read: boolean;
  orderId?: string;
}

export interface CustomerWalletTransaction {
  id: string;
  title: string;
  date: string;
  amount: number;
  type: 'credit' | 'debit';
  status: 'Success' | 'Pending';
}

export interface CustomerCoupon {
  code: string;
  title: string;
  discountPercent?: number;
  discountAmount?: number;
  minOrderAmount: number;
  description: string;
  tag: string;
}
