import type {
  Order,
  Zone,
  Joiner,
  Driver,
  Hotel,
  Product,
  PaymentTransaction,
  NotificationItem
} from './types';

export const initialZones: Zone[] = [
  {
    id: 1,
    name: 'Kharadi',
    areaLocations: 'Kharadi, Mundhwa',
    joinersCount: 5,
    hotelsCount: 120,
    ordersThisMonth: 352,
    salesThisMonth: 85000,
    status: 'Active',
    color: '#fb923c',
    assignedJoinersList: [
      { name: 'Nitin Jadhav', hotelsCount: 10, phone: '9208308509', status: 'Active' },
      { name: 'Raj Patil', hotelsCount: 8, phone: '9284308509', status: 'Active' },
      { name: 'Pushpak wani', hotelsCount: 15, phone: '9834341830', status: 'Active' }
    ]
  },
  { id: 2, name: 'Viman Nagar', areaLocations: 'Viman Nagar, Airport', joinersCount: 3, hotelsCount: 80, ordersThisMonth: 220, salesThisMonth: 52000, status: 'Active', color: '#38bdf8' },
  { id: 3, name: 'Hinjawadi', areaLocations: 'Hinjawadi, Phase 1/2/3', joinersCount: 8, hotelsCount: 150, ordersThisMonth: 410, salesThisMonth: 110000, status: 'Active', color: '#c084fc' },
  { id: 4, name: 'Magarpatta', areaLocations: 'Magarpatta, Hadapsar', joinersCount: 4, hotelsCount: 95, ordersThisMonth: 280, salesThisMonth: 68000, status: 'Active', color: '#4ade80' },
  { id: 5, name: 'Hadapsar', areaLocations: 'Hadapsar, Amanora', joinersCount: 6, hotelsCount: 110, ordersThisMonth: 320, salesThisMonth: 75000, status: 'Active', color: '#f87171' },
  { id: 6, name: 'Kothrud', areaLocations: 'Kothrud, Karve Nagar', joinersCount: 3, hotelsCount: 75, ordersThisMonth: 210, salesThisMonth: 48000, status: 'Active', color: '#facc15' },
  { id: 7, name: 'Shivajinagar', areaLocations: 'Shivajinagar, JM Road', joinersCount: 2, hotelsCount: 60, ordersThisMonth: 140, salesThisMonth: 35000, status: 'Active', color: '#fb923c' },
  { id: 8, name: 'Aundh', areaLocations: 'Aundh, Baner', joinersCount: 4, hotelsCount: 90, ordersThisMonth: 260, salesThisMonth: 64000, status: 'Active', color: '#4ade80' },
  { id: 9, name: 'Baner', areaLocations: 'Baner, Balewadi', joinersCount: 3, hotelsCount: 80, ordersThisMonth: 200, salesThisMonth: 50000, status: 'Active', color: '#f472b6' },
  { id: 10, name: 'Wakad', areaLocations: 'Wakad, Tathawade', joinersCount: 3, hotelsCount: 70, ordersThisMonth: 165, salesThisMonth: 42000, status: 'Active', color: '#60a5fa' },
  { id: 11, name: 'Pimpri Chinchwad', areaLocations: 'Pimpri, Chinchwad', joinersCount: 4, hotelsCount: 85, ordersThisMonth: 190, salesThisMonth: 46000, status: 'Inactive', color: '#e879f9' },
  { id: 12, name: 'Undri', areaLocations: 'Undri, NIBM', joinersCount: 2, hotelsCount: 50, ordersThisMonth: 115, salesThisMonth: 28000, status: 'Active', color: '#38bdf8' }
];

export const initialJoiners: Joiner[] = [
  {
    id: 'usr_9130188793',
    joinerCode: 'JN8793',
    name: 'Yash kolhe',
    mobile: '9130188793',
    phone: '9130188793',
    email: 'yashkolhe@farmerbox.in',
    zone: 'Shivajinagar',
    totalHotels: 0,
    totalOrders: 0,
    totalEarnings: 0,
    paidAmount: 0,
    pendingAmount: 0,
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
    joinedDate: '11 Sep 2026'
  },
  {
    id: 'usr_9208308509',
    joinerCode: 'JN8509',
    name: 'Nitin Jadhav',
    mobile: '9208308509',
    phone: '9208308509',
    email: 'nitinjadhav@farmerbox.in',
    zone: 'Kharadi',
    totalHotels: 0,
    totalOrders: 0,
    totalEarnings: 0,
    paidAmount: 0,
    pendingAmount: 0,
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
    joinedDate: '11 Sep 2026'
  },
  {
    id: 'usr_9284308509',
    joinerCode: 'JN8509B',
    name: 'Raj Patil',
    mobile: '9284308509',
    phone: '9284308509',
    email: 'rajpatil@farmerbox.in',
    zone: 'Kharadi',
    totalHotels: 0,
    totalOrders: 0,
    totalEarnings: 0,
    paidAmount: 0,
    pendingAmount: 0,
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
    joinedDate: '11 Sep 2026'
  },
  {
    id: 'usr_9834341830',
    joinerCode: 'JN1830',
    name: 'Pushpak wani',
    mobile: '9834341830',
    phone: '9834341830',
    email: 'pushpak@farmerbox.in',
    zone: 'Kharadi',
    totalHotels: 0,
    totalOrders: 0,
    totalEarnings: 0,
    paidAmount: 0,
    pendingAmount: 0,
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
    joinedDate: '11 Sep 2026'
  }
];

export const initialDrivers: Driver[] = [
  { id: 1, name: 'Rohit Sharma', mobile: '9876543210', zone: 'Kharadi', vehicleNo: 'MH12 AB 1234', status: 'Active', totalDeliveries: 120, rating: 4.8, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100' },
  { id: 2, name: 'Suresh Patil', mobile: '8765432109', zone: 'Viman Nagar', vehicleNo: 'MH12 CD 5678', status: 'Active', totalDeliveries: 98, rating: 4.6, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100' },
  { id: 3, name: 'Imran Khan', mobile: '9988776655', zone: 'Hadapsar', vehicleNo: 'MH14 EF 9012', status: 'Active', totalDeliveries: 85, rating: 4.7, avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100' },
  { id: 4, name: 'Amit Kumar', mobile: '9823456789', zone: 'Wakad', vehicleNo: 'MH12 GH 3456', status: 'Active', totalDeliveries: 76, rating: 4.5, avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100' },
  { id: 5, name: 'Ramesh Yadav', mobile: '9134567890', zone: 'Kothrud', vehicleNo: 'MH14 IJ 7890', status: 'Active', totalDeliveries: 70, rating: 4.4, avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100' },
  { id: 6, name: 'Vikram Singh', mobile: '9001234567', zone: 'Magarpatta', vehicleNo: 'MH12 KL 2345', status: 'On Leave', totalDeliveries: 55, rating: 4.2, avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100' },
  { id: 7, name: 'Sanjay More', mobile: '8877665544', zone: 'Shivajinagar', vehicleNo: 'MH14 MN 6789', status: 'Active', totalDeliveries: 62, rating: 4.3, avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100' },
  { id: 8, name: 'Deepak Jadhav', mobile: '9765432108', zone: 'Baner', vehicleNo: 'MH12 OP 0123', status: 'Active', totalDeliveries: 48, rating: 4.1, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100' },
  { id: 9, name: 'Prakash Gaikwad', mobile: '9898987654', zone: 'Aundh', vehicleNo: 'MH14 QR 3456', status: 'Inactive', totalDeliveries: 35, rating: 3.9, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100' },
  { id: 10, name: 'Santosh Wagh', mobile: '9543210987', zone: 'Pimple Saudagar', vehicleNo: 'MH12 ST 5678', status: 'Active', totalDeliveries: 28, rating: 4.0, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100' }
];

export const initialOrders: Order[] = [
  {
    id: 'FB1001',
    orderId: 'FB1001',
    hotelId: '1',
    date: '11 Sep',
    time: '10:24 AM',
    hotelName: 'Hotel Spice Villa',
    hotelImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=100',
    hotelOwner: 'Amit Sharma',
    hotelPhone: '9876543210',
    zone: 'Kharadi',
    joiner: 'Nitin Jadhav',
    joinerId: 'usr_9208308509',
    joinedBy: 'usr_9208308509',
    joinerPhone: '9208308509',
    amount: 2500,
    totalAmount: 2500,
    subtotal: 3850,
    deliveryCharge: 0,
    discount: 350,
    paymentMode: 'Online',
    paymentMethod: 'Online',
    paymentStatus: 'Paid',
    transactionId: 'pay_N7d9K2h8L1',
    driver: 'Suresh',
    driverPhone: '9876123456',
    deliveryAddress: 'S.No. 12, Kharadi, Pune - 411014',
    status: 'Delivered',
    orderStatus: 'Delivered',
    commission: 100,
    items: [
      { id: 1, productName: 'Tomato', qty: 50, unit: 'KG', price: 40, total: 2000 },
      { id: 2, productName: 'Onion', qty: 20, unit: 'KG', price: 30, total: 600 },
      { id: 3, productName: 'Potato', qty: 30, unit: 'KG', price: 25, total: 750 },
      { id: 4, productName: 'Green Chili', qty: 10, unit: 'KG', price: 50, total: 500 }
    ]
  },
  {
    id: 'FB1002',
    orderId: 'FB1002',
    hotelId: '2',
    date: '11 Sep',
    time: '10:10 AM',
    hotelName: 'Hotel Grand Pune',
    hotelImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=100',
    zone: 'Viman Nagar',
    joiner: 'Yash kolhe',
    joinerId: 'usr_9130188793',
    joinedBy: 'usr_9130188793',
    joinerPhone: '9130188793',
    amount: 1800,
    totalAmount: 1800,
    paymentMode: 'COD',
    paymentStatus: 'Pending',
    driver: 'Ramesh',
    status: 'Out for Delivery',
    orderStatus: 'Out for Delivery',
    commission: 100,
    items: [
      { id: 1, productName: 'Tomato', qty: 30, unit: 'KG', price: 40, total: 1200 },
      { id: 2, productName: 'Onion', qty: 20, unit: 'KG', price: 30, total: 600 }
    ]
  },
  {
    id: 'FB1003',
    orderId: 'FB1003',
    hotelId: '3',
    date: '11 Sep',
    time: '09:45 AM',
    hotelName: 'Hotel Food Plaza',
    hotelImage: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=100',
    zone: 'Hinjawadi',
    joiner: 'Pushpak wani',
    joinerId: 'usr_9834341830',
    joinedBy: 'usr_9834341830',
    joinerPhone: '9834341830',
    amount: 3200,
    totalAmount: 3200,
    paymentMode: 'Online',
    paymentStatus: 'Paid',
    driver: 'Sameer',
    status: 'Preparing',
    orderStatus: 'Preparing',
    commission: 100,
    items: [
      { id: 1, productName: 'Potato', qty: 80, unit: 'KG', price: 25, total: 2000 },
      { id: 2, productName: 'Tomato', qty: 30, unit: 'KG', price: 40, total: 1200 }
    ]
  },
  {
    id: 'FB1004',
    orderId: 'FB1004',
    hotelId: '4',
    date: '11 Sep',
    time: '09:20 AM',
    hotelName: 'Hotel Maharaja',
    hotelImage: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=100',
    zone: 'Magarpatta',
    joiner: 'Raj Patil',
    joinerId: 'usr_9284308509',
    joinedBy: 'usr_9284308509',
    joinerPhone: '9284308509',
    amount: 2100,
    totalAmount: 2100,
    paymentMode: 'COD',
    paymentStatus: 'Pending',
    driver: 'Suresh',
    status: 'Confirmed',
    orderStatus: 'Confirmed',
    commission: 100,
    items: [
      { id: 1, productName: 'Tomato', qty: 35, unit: 'KG', price: 40, total: 1400 },
      { id: 2, productName: 'Potato', qty: 28, unit: 'KG', price: 25, total: 700 }
    ]
  },
  {
    id: 'FB1005',
    orderId: 'FB1005',
    hotelId: '5',
    date: '11 Sep',
    time: '08:50 AM',
    hotelName: 'Hotel Green Leaf',
    hotelImage: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=100',
    zone: 'Hadapsar',
    joiner: 'Pushpak wani',
    joinerId: 'usr_9834341830',
    joinedBy: 'usr_9834341830',
    joinerPhone: '9834341830',
    amount: 4000,
    totalAmount: 4000,
    paymentMode: 'Online',
    paymentStatus: 'Pending',
    driver: 'Imran',
    status: 'Pending',
    orderStatus: 'Pending',
    commission: 100,
    items: [
      { id: 1, productName: 'Tomato', qty: 60, unit: 'KG', price: 40, total: 2400 },
      { id: 2, productName: 'Onion', qty: 40, unit: 'KG', price: 30, total: 1200 },
      { id: 3, productName: 'Green Chili', qty: 8, unit: 'KG', price: 50, total: 400 }
    ]
  },
  {
    id: 'FB1006',
    orderId: 'FB1006',
    hotelId: '6',
    date: '10 Sep',
    time: '07:30 PM',
    hotelName: 'Hotel Sai Sagar',
    hotelImage: 'https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?w=100',
    zone: 'Baner',
    joiner: 'Nitin Jadhav',
    joinerId: 'usr_9208308509',
    joinedBy: 'usr_9208308509',
    joinerPhone: '9208308509',
    amount: 1650,
    totalAmount: 1650,
    paymentMode: 'Online',
    paymentStatus: 'Paid',
    driver: 'Anand',
    status: 'Delivered',
    orderStatus: 'Delivered',
    commission: 100,
    items: [
      { id: 1, productName: 'Tomato', qty: 25, unit: 'KG', price: 40, total: 1000 },
      { id: 2, productName: 'Potato', qty: 26, unit: 'KG', price: 25, total: 650 }
    ]
  },
  {
    id: 'FB1007',
    orderId: 'FB1007',
    hotelId: '7',
    date: '10 Sep',
    time: '06:15 PM',
    hotelName: 'Hotel City Tadka',
    hotelImage: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=100',
    zone: 'Wakad',
    joiner: 'Raj Patil',
    joinerId: 'usr_9284308509',
    joinedBy: 'usr_9284308509',
    joinerPhone: '9284308509',
    amount: 2800,
    totalAmount: 2800,
    paymentMode: 'COD',
    paymentStatus: 'Paid',
    driver: 'Ramesh',
    status: 'Delivered',
    orderStatus: 'Delivered',
    commission: 100,
    items: [
      { id: 1, productName: 'Tomato', qty: 40, unit: 'KG', price: 40, total: 1600 },
      { id: 2, productName: 'Onion', qty: 40, unit: 'KG', price: 30, total: 1200 }
    ]
  },
  {
    id: 'FB1008',
    orderId: 'FB1008',
    hotelId: '8',
    date: '10 Sep',
    time: '05:40 PM',
    hotelName: 'Hotel Royal Treat',
    hotelImage: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=100',
    zone: 'Aundh',
    joiner: 'Pushpak wani',
    joinerId: 'usr_9834341830',
    joinedBy: 'usr_9834341830',
    joinerPhone: '9834341830',
    amount: 1200,
    totalAmount: 1200,
    paymentMode: 'Online',
    paymentStatus: 'Refunded',
    driver: '—',
    status: 'Cancelled',
    orderStatus: 'Cancelled',
    commission: 0,
    items: [
      { id: 1, productName: 'Tomato', qty: 30, unit: 'KG', price: 40, total: 1200 }
    ]
  },
  {
    id: 'FB1009',
    orderId: 'FB1009',
    hotelId: '9',
    date: '10 Sep',
    time: '04:30 PM',
    hotelName: 'Hotel Parampara',
    hotelImage: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=100',
    zone: 'Shivajinagar',
    joiner: 'Yash kolhe',
    joinerId: 'usr_9130188793',
    joinedBy: 'usr_9130188793',
    joinerPhone: '9130188793',
    amount: 3600,
    totalAmount: 3600,
    paymentMode: 'Online',
    paymentStatus: 'Paid',
    driver: 'Suresh',
    status: 'Delivered',
    orderStatus: 'Delivered',
    commission: 100,
    items: [
      { id: 1, productName: 'Tomato', qty: 50, unit: 'KG', price: 40, total: 2000 },
      { id: 2, productName: 'Onion', qty: 40, unit: 'KG', price: 30, total: 1200 },
      { id: 3, productName: 'Green Chili', qty: 8, unit: 'KG', price: 50, total: 400 }
    ]
  },
  {
    id: 'FB1010',
    orderId: 'FB1010',
    hotelId: '10',
    date: '10 Sep',
    time: '03:15 PM',
    hotelName: 'Hotel Keshav',
    hotelImage: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=100',
    zone: 'Pimple Chinchwad',
    joiner: 'Raj Patil',
    joinerId: 'usr_9284308509',
    joinedBy: 'usr_9284308509',
    joinerPhone: '9284308509',
    amount: 2200,
    totalAmount: 2200,
    paymentMode: 'COD',
    paymentStatus: 'Pending',
    driver: 'Sameer',
    status: 'Out for Delivery',
    orderStatus: 'Out for Delivery',
    commission: 100,
    items: [
      { id: 1, productName: 'Tomato', qty: 40, unit: 'KG', price: 40, total: 1600 },
      { id: 2, productName: 'Onion', qty: 20, unit: 'KG', price: 30, total: 600 }
    ]
  }
];

export const initialHotels: Hotel[] = [
  {
    id: 1,
    name: 'Hotel Spice Villa',
    ownerName: 'Amit Sharma',
    mobile: '9876543210',
    email: 'amit@spicevilla.com',
    zone: 'Kharadi',
    joiner: 'Nitin Jadhav',
    joinerId: 'usr_9208308509',
    joinedBy: 'usr_9208308509',
    address: 'S.No. 12, Kharadi, Pune - 411014',
    totalOrders: 320,
    totalSpent: 485000,
    registrationDate: '12 Jan 2024',
    gstNumber: '27ABCDE1234F1Z5',
    fssaiNumber: '11521007000123',
    rating: 4.5,
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300',
    orderHistory: [
      { id: 'FB1001', date: '11 Sep 2026', amount: 2500, status: 'Delivered' }
    ]
  },
  { id: 2, name: 'Hotel Grand Pune', ownerName: 'Suresh Iyer', mobile: '8765432109', email: 'suresh@grandpune.com', zone: 'Viman Nagar', joiner: 'Yash kolhe', joinerId: 'usr_9130188793', joinedBy: 'usr_9130188793', address: 'Viman Nagar, Pune', totalOrders: 280, totalSpent: 390000, registrationDate: '15 Feb 2024', gstNumber: '27ABCDE1234F1Z6', fssaiNumber: '11521007000124', rating: 4.6, status: 'Active', image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=300' },
  { id: 3, name: 'Hotel Food Plaza', ownerName: 'Ramesh Gupta', mobile: '9988776655', email: 'ramesh@foodplaza.com', zone: 'Hinjawadi', joiner: 'Pushpak wani', joinerId: 'usr_9834341830', joinedBy: 'usr_9834341830', address: 'Hinjawadi Phase 1, Pune', totalOrders: 165, totalSpent: 240000, registrationDate: '10 Mar 2024', gstNumber: '27ABCDE1234F1Z7', fssaiNumber: '11521007000125', rating: 4.4, status: 'Active', image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=300' },
  { id: 4, name: 'Hotel Maharaja', ownerName: 'Vikram Desai', mobile: '9823456789', email: 'vikram@maharaja.com', zone: 'Magarpatta', joiner: 'Raj Patil', joinerId: 'usr_9284308509', joinedBy: 'usr_9284308509', address: 'Magarpatta City, Pune', totalOrders: 210, totalSpent: 310000, registrationDate: '01 Apr 2024', gstNumber: '27ABCDE1234F1Z8', fssaiNumber: '11521007000126', rating: 4.7, status: 'Active', image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=300' },
  { id: 5, name: 'Hotel Green Leaf', ownerName: 'Neha Kulkarni', mobile: '9134567890', email: 'neha@greenleaf.com', zone: 'Hadapsar', joiner: 'Pushpak wani', joinerId: 'usr_9834341830', joinedBy: 'usr_9834341830', address: 'Hadapsar, Pune', totalOrders: 190, totalSpent: 275000, registrationDate: '20 May 2024', gstNumber: '27ABCDE1234F1Z9', fssaiNumber: '11521007000127', rating: 4.3, status: 'Active', image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=300' },
  { id: 6, name: 'Hotel Sai Sagar', ownerName: 'Anand Yadav', mobile: '9001234567', email: 'anand@saisagar.com', zone: 'Baner', joiner: 'Nitin Jadhav', joinerId: 'usr_9208308509', joinedBy: 'usr_9208308509', address: 'Baner Road, Pune', totalOrders: 175, totalSpent: 245000, registrationDate: '11 Jun 2024', gstNumber: '27ABCDE1234F2Z1', fssaiNumber: '11521007000128', rating: 4.5, status: 'Active', image: 'https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?w=300' },
  { id: 7, name: 'Hotel City Tadka', ownerName: 'Imran Khan', mobile: '8877665544', email: 'imran@citytadka.com', zone: 'Wakad', joiner: 'Raj Patil', joinerId: 'usr_9284308509', joinedBy: 'usr_9284308509', address: 'Wakad, Pune', totalOrders: 140, totalSpent: 195000, registrationDate: '05 Jul 2024', gstNumber: '27ABCDE1234F2Z2', fssaiNumber: '11521007000129', rating: 4.1, status: 'Inactive', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=300' },
  { id: 8, name: 'Hotel Royal Treat', ownerName: 'Mahesh Patil', mobile: '9988112233', email: 'mahesh@royaltreat.com', zone: 'Aundh', joiner: 'Pushpak wani', joinerId: 'usr_9834341830', joinedBy: 'usr_9834341830', address: 'Aundh, Pune', totalOrders: 120, totalSpent: 168000, registrationDate: '19 Aug 2024', gstNumber: '27ABCDE1234F2Z3', fssaiNumber: '11521007000130', rating: 4.2, status: 'Active', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300' },
  { id: 9, name: 'Hotel Parampara', ownerName: 'Santosh Wagh', mobile: '9765432100', email: 'santosh@parampara.com', zone: 'Shivajinagar', joiner: 'Yash kolhe', joinerId: 'usr_9130188793', joinedBy: 'usr_9130188793', address: 'JM Road, Pune', totalOrders: 110, totalSpent: 155000, registrationDate: '01 Sep 2024', gstNumber: '27ABCDE1234F2Z4', fssaiNumber: '11521007000131', rating: 4.4, status: 'Active', image: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=300' },
  { id: 10, name: 'Hotel Keshav', ownerName: 'Deepak Jagtap', mobile: '9654321098', email: 'deepak@keshav.com', zone: 'Pimple Chinchwad', joiner: 'Raj Patil', joinerId: 'usr_9284308509', joinedBy: 'usr_9284308509', address: 'Chinchwad, Pune', totalOrders: 105, totalSpent: 142000, registrationDate: '05 Sep 2024', gstNumber: '27ABCDE1234F2Z5', fssaiNumber: '11521007000132', rating: 4.0, status: 'Active', image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=300' }
];

export const initialProducts: Product[] = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=100',
    name: 'Tomato',
    category: 'Vegetables',
    unit: 'KG',
    purchasePrice: 25,
    salePrice: 40,
    stock: 500,
    minimumStock: 50,
    status: 'Active',
    addedOn: '01 Sep 2026, 10:30 AM',
    stockHistory: [
      { date: '11 Sep 2026', type: 'Stock In', qty: '+200 KG', ref: 'PO-001', user: 'Admin' },
      { date: '09 Sep 2026', type: 'Stock Out', qty: '-50 KG', ref: 'ORD-1001', user: 'System' },
      { date: '05 Sep 2026', type: 'Stock In', qty: '+300 KG', ref: 'PO-002', user: 'Admin' },
      { date: '02 Sep 2026', type: 'Stock Out', qty: '-100 KG', ref: 'ORD-0987', user: 'System' }
    ]
  },
  { id: 2, image: '/products/onion.jpg', name: 'Onion', category: 'Vegetables', unit: 'KG', purchasePrice: 20, salePrice: 30, stock: 300, minimumStock: 40, status: 'Active', addedOn: '01 Sep 2026' },
  { id: 3, image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=100', name: 'Potato', category: 'Vegetables', unit: 'KG', purchasePrice: 18, salePrice: 25, stock: 800, minimumStock: 100, status: 'Active', addedOn: '01 Sep 2026' },
  { id: 4, image: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=100', name: 'Green Chilli', category: 'Vegetables', unit: 'KG', purchasePrice: 35, salePrice: 50, stock: 50, minimumStock: 30, status: 'Low Stock', addedOn: '01 Sep 2026' },
  { id: 5, image: 'https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?w=100', name: 'Capsicum', category: 'Vegetables', unit: 'KG', purchasePrice: 40, salePrice: 60, stock: 0, minimumStock: 20, status: 'Out of Stock', addedOn: '01 Sep 2026' },
  { id: 6, image: 'https://images.unsplash.com/photo-1447175008436-0841709069c0?w=100', name: 'Carrot', category: 'Vegetables', unit: 'KG', purchasePrice: 30, salePrice: 45, stock: 200, minimumStock: 30, status: 'Active', addedOn: '01 Sep 2026' },
  { id: 7, image: 'https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?w=100', name: 'Cabbage', category: 'Vegetables', unit: 'KG', purchasePrice: 22, salePrice: 35, stock: 150, minimumStock: 25, status: 'Active', addedOn: '01 Sep 2026' },
  { id: 8, image: '/products/cauliflower.jpg', name: 'Cauliflower', category: 'Vegetables', unit: 'KG', purchasePrice: 28, salePrice: 42, stock: 25, minimumStock: 20, status: 'Low Stock', addedOn: '01 Sep 2026' },
  { id: 9, image: 'https://images.unsplash.com/photo-1628773822503-930a7eaecf80?w=100', name: 'Lady Finger', category: 'Vegetables', unit: 'KG', purchasePrice: 40, salePrice: 60, stock: 100, minimumStock: 25, status: 'Active', addedOn: '01 Sep 2026' },
  { id: 10, image: '/products/brinjal.jpg', name: 'Brinjal', category: 'Vegetables', unit: 'KG', purchasePrice: 32, salePrice: 48, stock: 70, minimumStock: 20, status: 'Active', addedOn: '01 Sep 2026' }
];

export const initialPayments: PaymentTransaction[] = [
  { id: 1, dateTime: '11 Sep 2026, 10:24 AM', referenceId: 'PAY001256', type: 'Order Payment', fromTo: 'Hotel Spice Villa', orderId: 'FB1001', amount: 2500, status: 'Success', paymentMode: 'Online (Razorpay)' },
  { id: 2, dateTime: '11 Sep 2026, 10:10 AM', referenceId: 'PAY001255', type: 'COD Payment', fromTo: 'Hotel Grand Pune', orderId: 'FB1002', amount: 1800, status: 'Success', paymentMode: 'COD' },
  { id: 3, dateTime: '11 Sep 2026, 09:45 AM', referenceId: 'PAY001254', type: 'Joiner Commission', fromTo: 'Nitin Jadhav', orderId: 'FB1001', amount: 100, status: 'Success', paymentMode: 'Wallet' },
  { id: 4, dateTime: '11 Sep 2026, 09:20 AM', referenceId: 'PAY001253', type: 'Driver Payout', fromTo: 'Suresh Kumar', orderId: 'FB1001', amount: 60, status: 'Success', paymentMode: 'Wallet' },
  { id: 5, dateTime: '10 Sep 2026, 08:15 PM', referenceId: 'PAY001252', type: 'Order Payment', fromTo: 'Hotel Maharaja', orderId: 'FB1004', amount: 2100, status: 'Success', paymentMode: 'Online (UPI)' },
  { id: 6, dateTime: '10 Sep 2026, 07:30 PM', referenceId: 'PAY001251', type: 'Refund', fromTo: 'Hotel City Tadka', orderId: 'FB1007', amount: 500, status: 'Refunded', paymentMode: 'Online' },
  { id: 7, dateTime: '10 Sep 2026, 06:45 PM', referenceId: 'PAY001250', type: 'Joiner Commission', fromTo: 'Yash kolhe', orderId: 'FB1002', amount: 100, status: 'Success', paymentMode: 'Wallet' },
  { id: 8, dateTime: '10 Sep 2026, 05:10 PM', referenceId: 'PAY001249', type: 'Driver Payout', fromTo: 'Amit Kumar', orderId: 'FB1003', amount: 60, status: 'Success', paymentMode: 'Wallet' },
  { id: 9, dateTime: '10 Sep 2026, 04:20 PM', referenceId: 'PAY001248', type: 'Order Payment', fromTo: 'Hotel Green Leaf', orderId: 'FB1005', amount: 4000, status: 'Success', paymentMode: 'Online (Card)' },
  { id: 10, dateTime: '10 Sep 2026, 03:15 PM', referenceId: 'PAY001247', type: 'COD Payment', fromTo: 'Hotel Sai Sagar', orderId: 'FB1006', amount: 1650, status: 'Success', paymentMode: 'COD' }
];

export const initialNotifications: NotificationItem[] = [];

export const weeklyOrdersChartData = [
  { day: 'Mon', Delivered: 280, Pending: 220, Cancelled: 30 },
  { day: 'Tue', Delivered: 210, Pending: 130, Cancelled: 20 },
  { day: 'Wed', Delivered: 250, Pending: 170, Cancelled: 25 },
  { day: 'Thu', Delivered: 210, Pending: 120, Cancelled: 15 },
  { day: 'Fri', Delivered: 240, Pending: 160, Cancelled: 35 },
  { day: 'Sat', Delivered: 210, Pending: 130, Cancelled: 20 },
  { day: 'Sun', Delivered: 210, Pending: 120, Cancelled: 15 }
];

export const monthlySalesChartData = [
  { date: '1 Sep', sales: 210000 },
  { date: '5 Sep', sales: 260000 },
  { date: '10 Sep', sales: 340000 },
  { date: '15 Sep', sales: 340000 },
  { date: '20 Sep', sales: 480000 },
  { date: '25 Sep', sales: 620000 },
  { date: '30 Sep', sales: 700000 }
];
