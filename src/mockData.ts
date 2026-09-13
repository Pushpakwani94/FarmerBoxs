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
      { name: 'Rahul Patil', hotelsCount: 45, phone: '9876543210', status: 'Active' },
      { name: 'Sneha More', hotelsCount: 38, phone: '8765432109', status: 'Active' },
      { name: 'Amit Shinde', hotelsCount: 22, phone: '9988776655', status: 'Active' }
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
    id: 1,
    joinerCode: 'JN001',
    name: 'Rahul Patil',
    mobile: '9876543210',
    email: 'rahulpatil@email.com',
    zone: 'Kharadi',
    totalHotels: 45,
    totalOrders: 320,
    totalEarnings: 32000,
    paidAmount: 24000,
    pendingAmount: 8000,
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
    joinedDate: '12 Jan 2024',
    assignedHotelsList: [
      { name: 'Hotel Spice Villa', location: 'Kharadi', status: 'Active' },
      { name: 'Hotel Grand Food', location: 'Kharadi', status: 'Active' },
      { name: 'Hotel Green Leaf', location: 'Mundhwa', status: 'Active' },
      { name: 'Hotel Maharaja', location: 'EON IT Park', status: 'Active' },
      { name: 'Hotel Sai Sagar', location: 'Kharadi', status: 'Active' }
    ],
    performanceHistory: [
      { month: 'Apr', orders: 180 },
      { month: 'May', orders: 220 },
      { month: 'Jun', orders: 260 },
      { month: 'Jul', orders: 300 },
      { month: 'Aug', orders: 320 },
      { month: 'Sep', orders: 280 }
    ]
  },
  { id: 2, joinerCode: 'JN002', name: 'Sneha More', mobile: '8765432109', email: 'sneha@email.com', zone: 'Viman Nagar', totalHotels: 38, totalOrders: 280, totalEarnings: 28000, paidAmount: 20000, pendingAmount: 8000, status: 'Active', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100', joinedDate: '15 Feb 2024' },
  { id: 3, joinerCode: 'JN003', name: 'Amit Shinde', mobile: '9988776655', email: 'amit@email.com', zone: 'Hinjawadi', totalHotels: 22, totalOrders: 165, totalEarnings: 16500, paidAmount: 16500, pendingAmount: 0, status: 'Active', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100', joinedDate: '10 Mar 2024' },
  { id: 4, joinerCode: 'JN004', name: 'Prakash Jadhav', mobile: '9823456789', email: 'prakash@email.com', zone: 'Magarpatta', totalHotels: 30, totalOrders: 210, totalEarnings: 21000, paidAmount: 18000, pendingAmount: 3000, status: 'Active', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100', joinedDate: '01 Apr 2024' },
  { id: 5, joinerCode: 'JN005', name: 'Vikram Kale', mobile: '9134567890', email: 'vikram@email.com', zone: 'Hadapsar', totalHotels: 28, totalOrders: 190, totalEarnings: 19000, paidAmount: 15000, pendingAmount: 4000, status: 'Active', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100', joinedDate: '20 May 2024' },
  { id: 6, joinerCode: 'JN006', name: 'Neha Kadam', mobile: '9001234567', email: 'neha@email.com', zone: 'Baner', totalHotels: 25, totalOrders: 175, totalEarnings: 17500, paidAmount: 17500, pendingAmount: 0, status: 'Active', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100', joinedDate: '11 Jun 2024' },
  { id: 7, joinerCode: 'JN007', name: 'Suresh Pathak', mobile: '8877665544', email: 'suresh@email.com', zone: 'Wakad', totalHotels: 18, totalOrders: 120, totalEarnings: 12000, paidAmount: 10000, pendingAmount: 2000, status: 'Active', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100', joinedDate: '05 Jul 2024' },
  { id: 8, joinerCode: 'JN008', name: 'Imran Shaikh', mobile: '9988112233', email: 'imran@email.com', zone: 'Aundh', totalHotels: 20, totalOrders: 140, totalEarnings: 14000, paidAmount: 14000, pendingAmount: 0, status: 'Inactive', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100', joinedDate: '19 Aug 2024' },
  { id: 9, joinerCode: 'JN009', name: 'Ramesh Yadav', mobile: '9765432100', email: 'ramesh@email.com', zone: 'Shivajinagar', totalHotels: 15, totalOrders: 110, totalEarnings: 11000, paidAmount: 11000, pendingAmount: 0, status: 'Active', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100', joinedDate: '01 Sep 2024' },
  { id: 10, joinerCode: 'JN010', name: 'Anand Pawar', mobile: '9654321098', email: 'anand@email.com', zone: 'Pimple Chinchwad', totalHotels: 16, totalOrders: 105, totalEarnings: 10500, paidAmount: 8500, pendingAmount: 2000, status: 'Active', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100', joinedDate: '05 Sep 2024' },
  { id: 11, joinerCode: 'JN011', name: 'Kiran Deshmukh', mobile: '9543210981', email: 'kiran@email.com', zone: 'Kharadi', totalHotels: 20, totalOrders: 75, totalEarnings: 7500, paidAmount: 6000, pendingAmount: 1500, status: 'Active', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100', joinedDate: '12 Sep 2024' },
  { id: 12, joinerCode: 'JN012', name: 'Mahesh Jagtap', mobile: '9432109872', email: 'mahesh@email.com', zone: 'Undri', totalHotels: 25, totalOrders: 60, totalEarnings: 6000, paidAmount: 6000, pendingAmount: 0, status: 'Active', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100', joinedDate: '15 Sep 2024' },
  { id: 13, joinerCode: 'JN013', name: 'Pradeep Salunkhe', mobile: '9321098763', email: 'pradeep@email.com', zone: 'Kothrud', totalHotels: 22, totalOrders: 55, totalEarnings: 5500, paidAmount: 4500, pendingAmount: 1000, status: 'Active', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100', joinedDate: '20 Sep 2024' },
  { id: 14, joinerCode: 'JN014', name: 'Sunil Bhosale', mobile: '9210987654', email: 'sunil@email.com', zone: 'Hinjawadi', totalHotels: 24, totalOrders: 50, totalEarnings: 5000, paidAmount: 5000, pendingAmount: 0, status: 'Active', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100', joinedDate: '25 Sep 2024' },
  { id: 15, joinerCode: 'JN015', name: 'Nilesh Thorat', mobile: '9109876545', email: 'nilesh@email.com', zone: 'Hadapsar', totalHotels: 18, totalOrders: 42, totalEarnings: 4200, paidAmount: 3200, pendingAmount: 1000, status: 'Active', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100', joinedDate: '01 Oct 2024' },
  { id: 16, joinerCode: 'JN016', name: 'Sanjay Chavan', mobile: '9098765436', email: 'sanjay@email.com', zone: 'Magarpatta', totalHotels: 19, totalOrders: 38, totalEarnings: 3800, paidAmount: 3800, pendingAmount: 0, status: 'Active', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100', joinedDate: '05 Oct 2024' },
  { id: 17, joinerCode: 'JN017', name: 'Ajay Kulkarni', mobile: '8987654327', email: 'ajay@email.com', zone: 'Baner', totalHotels: 17, totalOrders: 35, totalEarnings: 3500, paidAmount: 3000, pendingAmount: 500, status: 'Active', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100', joinedDate: '10 Oct 2024' },
  { id: 18, joinerCode: 'JN018', name: 'Ganesh Gite', mobile: '8876543218', email: 'ganesh@email.com', zone: 'Viman Nagar', totalHotels: 15, totalOrders: 30, totalEarnings: 3000, paidAmount: 3000, pendingAmount: 0, status: 'Active', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100', joinedDate: '15 Oct 2024' },
  { id: 19, joinerCode: 'JN019', name: 'Deepak Sonawane', mobile: '8765432109', email: 'deepak@email.com', zone: 'Wakad', totalHotels: 14, totalOrders: 28, totalEarnings: 2800, paidAmount: 2000, pendingAmount: 800, status: 'Active', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100', joinedDate: '20 Oct 2024' },
  { id: 20, joinerCode: 'JN020', name: 'Yogesh Ghodke', mobile: '8654321090', email: 'yogesh@email.com', zone: 'Aundh', totalHotels: 16, totalOrders: 25, totalEarnings: 2500, paidAmount: 2500, pendingAmount: 0, status: 'Active', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100', joinedDate: '25 Oct 2024' },
  { id: 21, joinerCode: 'JN021', name: 'Chetan Shirole', mobile: '8543210981', email: 'chetan@email.com', zone: 'Shivajinagar', totalHotels: 14, totalOrders: 22, totalEarnings: 2200, paidAmount: 1800, pendingAmount: 400, status: 'Active', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100', joinedDate: '01 Nov 2024' },
  { id: 22, joinerCode: 'JN022', name: 'Rohit Nikam', mobile: '8432109872', email: 'rohit@email.com', zone: 'Pimpri Chinchwad', totalHotels: 15, totalOrders: 20, totalEarnings: 2000, paidAmount: 2000, pendingAmount: 0, status: 'Active', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100', joinedDate: '05 Nov 2024' },
  { id: 23, joinerCode: 'JN023', name: 'Santosh Tambe', mobile: '8321098763', email: 'santosh@email.com', zone: 'Kharadi', totalHotels: 12, totalOrders: 18, totalEarnings: 1800, paidAmount: 1500, pendingAmount: 300, status: 'Active', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100', joinedDate: '10 Nov 2024' },
  { id: 24, joinerCode: 'JN024', name: 'Ashok Bankar', mobile: '8210987654', email: 'ashok@email.com', zone: 'Undri', totalHotels: 10, totalOrders: 12, totalEarnings: 1200, paidAmount: 1200, pendingAmount: 0, status: 'Inactive', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100', joinedDate: '15 Nov 2024' },
  { id: 25, joinerCode: 'JN025', name: 'Vinod Kokate', mobile: '8109876545', email: 'vinod@email.com', zone: 'Kothrud', totalHotels: 8, totalOrders: 10, totalEarnings: 1000, paidAmount: 1000, pendingAmount: 0, status: 'Inactive', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100', joinedDate: '20 Nov 2024' },
  { id: 26, joinerCode: 'JN026', name: 'Tushar Dhumal', mobile: '8098765436', email: 'tushar@email.com', zone: 'Hadapsar', totalHotels: 6, totalOrders: 8, totalEarnings: 800, paidAmount: 800, pendingAmount: 0, status: 'Inactive', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100', joinedDate: '25 Nov 2024' }
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
    date: '11 Sep',
    time: '10:24 AM',
    hotelName: 'Hotel Spice Villa',
    hotelImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=100',
    hotelOwner: 'Amit Sharma',
    hotelPhone: '9876543210',
    zone: 'Kharadi',
    joiner: 'Rahul Patil',
    amount: 2500,
    paymentMode: 'Online',
    paymentStatus: 'Paid',
    transactionId: 'pay_N7d9K2h8L1',
    driver: 'Suresh',
    driverPhone: '9876123456',
    deliveryAddress: 'S.No. 12, Kharadi, Pune - 411014',
    status: 'Delivered',
    commission: 100,
    subtotal: 3850,
    deliveryCharge: 0,
    discount: 350,
    items: [
      { id: 1, productName: 'Tomato', qty: 50, unit: 'KG', price: 40, total: 2000 },
      { id: 2, productName: 'Onion', qty: 20, unit: 'KG', price: 30, total: 600 },
      { id: 3, productName: 'Potato', qty: 30, unit: 'KG', price: 25, total: 750 },
      { id: 4, productName: 'Green Chili', qty: 10, unit: 'KG', price: 50, total: 500 }
    ]
  },
  { id: 'FB1002', date: '11 Sep', time: '10:10 AM', hotelName: 'Hotel Grand Pune', hotelImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=100', zone: 'Viman Nagar', joiner: 'Sneha More', amount: 1800, paymentMode: 'COD', paymentStatus: 'Pending', driver: 'Ramesh', status: 'Out for Delivery', commission: 0 },
  { id: 'FB1003', date: '11 Sep', time: '09:45 AM', hotelName: 'Hotel Food Plaza', hotelImage: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=100', zone: 'Hinjawadi', joiner: 'Amit Shinde', amount: 3200, paymentMode: 'Online', paymentStatus: 'Paid', driver: 'Sameer', status: 'Preparing', commission: 0 },
  { id: 'FB1004', date: '11 Sep', time: '09:20 AM', hotelName: 'Hotel Maharaja', hotelImage: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=100', zone: 'Magarpatta', joiner: 'Prakash Jadhav', amount: 2100, paymentMode: 'COD', paymentStatus: 'Pending', driver: 'Suresh', status: 'Confirmed', commission: 0 },
  { id: 'FB1005', date: '11 Sep', time: '08:50 AM', hotelName: 'Hotel Green Leaf', hotelImage: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=100', zone: 'Hadapsar', joiner: 'Vikram Kale', amount: 4000, paymentMode: 'Online', paymentStatus: 'Pending', driver: 'Imran', status: 'Pending', commission: 0 },
  { id: 'FB1006', date: '10 Sep', time: '07:30 PM', hotelName: 'Hotel Sai Sagar', hotelImage: 'https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?w=100', zone: 'Baner', joiner: 'Neha Kadam', amount: 1650, paymentMode: 'Online', paymentStatus: 'Paid', driver: 'Anand', status: 'Delivered', commission: 100 },
  { id: 'FB1007', date: '10 Sep', time: '06:15 PM', hotelName: 'Hotel City Tadka', hotelImage: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=100', zone: 'Wakad', joiner: 'Suresh Pathak', amount: 2800, paymentMode: 'COD', paymentStatus: 'Paid', driver: 'Ramesh', status: 'Delivered', commission: 100 },
  { id: 'FB1008', date: '10 Sep', time: '05:40 PM', hotelName: 'Hotel Royal Treat', hotelImage: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=100', zone: 'Aundh', joiner: 'Imran Shaikh', amount: 1200, paymentMode: 'Online', paymentStatus: 'Refunded', driver: '—', status: 'Cancelled', commission: 0 },
  { id: 'FB1009', date: '10 Sep', time: '04:30 PM', hotelName: 'Hotel Parampara', hotelImage: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=100', zone: 'Shivajinagar', joiner: 'Ramesh Yadav', amount: 3600, paymentMode: 'Online', paymentStatus: 'Paid', driver: 'Suresh', status: 'Delivered', commission: 100 },
  { id: 'FB1010', date: '10 Sep', time: '03:15 PM', hotelName: 'Hotel Keshav', hotelImage: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=100', zone: 'Pimple Chinchwad', joiner: 'Anand Pawar', amount: 2200, paymentMode: 'COD', paymentStatus: 'Pending', driver: 'Sameer', status: 'Out for Delivery', commission: 0 }
];

export const initialHotels: Hotel[] = [
  {
    id: 1,
    name: 'Hotel Spice Villa',
    ownerName: 'Amit Sharma',
    mobile: '9876543210',
    email: 'amit@spicevilla.com',
    zone: 'Kharadi',
    joiner: 'Rahul Patil',
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
      { id: 'FB1001', date: '11 Sep 2026', amount: 2500, status: 'Delivered' },
      { id: 'FB1002', date: '10 Sep 2026', amount: 1800, status: 'Delivered' },
      { id: 'FB1003', date: '09 Sep 2026', amount: 3200, status: 'Out for Delivery' },
      { id: 'FB1004', date: '08 Sep 2026', amount: 2100, status: 'Cancelled' },
      { id: 'FB1005', date: '07 Sep 2026', amount: 4000, status: 'Delivered' }
    ]
  },
  { id: 2, name: 'Hotel Grand Pune', ownerName: 'Suresh Iyer', mobile: '8765432109', email: 'suresh@grandpune.com', zone: 'Viman Nagar', joiner: 'Sneha More', address: 'Viman Nagar, Pune', totalOrders: 280, totalSpent: 390000, registrationDate: '15 Feb 2024', gstNumber: '27ABCDE1234F1Z6', fssaiNumber: '11521007000124', rating: 4.6, status: 'Active', image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=300' },
  { id: 3, name: 'Hotel Food Plaza', ownerName: 'Ramesh Gupta', mobile: '9988776655', email: 'ramesh@foodplaza.com', zone: 'Hinjawadi', joiner: 'Amit Shinde', address: 'Hinjawadi Phase 1, Pune', totalOrders: 165, totalSpent: 240000, registrationDate: '10 Mar 2024', gstNumber: '27ABCDE1234F1Z7', fssaiNumber: '11521007000125', rating: 4.4, status: 'Active', image: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=300' },
  { id: 4, name: 'Hotel Maharaja', ownerName: 'Vikram Desai', mobile: '9823456789', email: 'vikram@maharaja.com', zone: 'Magarpatta', joiner: 'Prakash Jadhav', address: 'Magarpatta City, Pune', totalOrders: 210, totalSpent: 310000, registrationDate: '01 Apr 2024', gstNumber: '27ABCDE1234F1Z8', fssaiNumber: '11521007000126', rating: 4.7, status: 'Active', image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=300' },
  { id: 5, name: 'Hotel Green Leaf', ownerName: 'Neha Kulkarni', mobile: '9134567890', email: 'neha@greenleaf.com', zone: 'Hadapsar', joiner: 'Vikram Kale', address: 'Hadapsar, Pune', totalOrders: 190, totalSpent: 275000, registrationDate: '20 May 2024', gstNumber: '27ABCDE1234F1Z9', fssaiNumber: '11521007000127', rating: 4.3, status: 'Active', image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=300' },
  { id: 6, name: 'Hotel Sai Sagar', ownerName: 'Anand Yadav', mobile: '9001234567', email: 'anand@saisagar.com', zone: 'Baner', joiner: 'Neha Kadam', address: 'Baner Road, Pune', totalOrders: 175, totalSpent: 245000, registrationDate: '11 Jun 2024', gstNumber: '27ABCDE1234F2Z1', fssaiNumber: '11521007000128', rating: 4.5, status: 'Active', image: 'https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?w=300' },
  { id: 7, name: 'Hotel City Tadka', ownerName: 'Imran Khan', mobile: '8877665544', email: 'imran@citytadka.com', zone: 'Wakad', joiner: 'Suresh Pathak', address: 'Wakad, Pune', totalOrders: 140, totalSpent: 195000, registrationDate: '05 Jul 2024', gstNumber: '27ABCDE1234F2Z2', fssaiNumber: '11521007000129', rating: 4.1, status: 'Inactive', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=300' },
  { id: 8, name: 'Hotel Royal Treat', ownerName: 'Mahesh Patil', mobile: '9988112233', email: 'mahesh@royaltreat.com', zone: 'Aundh', joiner: 'Imran Shaikh', address: 'Aundh, Pune', totalOrders: 120, totalSpent: 168000, registrationDate: '19 Aug 2024', gstNumber: '27ABCDE1234F2Z3', fssaiNumber: '11521007000130', rating: 4.2, status: 'Active', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300' },
  { id: 9, name: 'Hotel Parampara', ownerName: 'Santosh Wagh', mobile: '9765432100', email: 'santosh@parampara.com', zone: 'Shivajinagar', joiner: 'Ramesh Yadav', address: 'JM Road, Pune', totalOrders: 110, totalSpent: 155000, registrationDate: '01 Sep 2024', gstNumber: '27ABCDE1234F2Z4', fssaiNumber: '11521007000131', rating: 4.4, status: 'Active', image: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=300' },
  { id: 10, name: 'Hotel Keshav', ownerName: 'Deepak Jagtap', mobile: '9654321098', email: 'deepak@keshav.com', zone: 'Pimple Chinchwad', joiner: 'Anand Pawar', address: 'Chinchwad, Pune', totalOrders: 105, totalSpent: 142000, registrationDate: '05 Sep 2024', gstNumber: '27ABCDE1234F2Z5', fssaiNumber: '11521007000132', rating: 4.0, status: 'Active', image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=300' }
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
  { id: 2, image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8ce?w=100', name: 'Onion', category: 'Vegetables', unit: 'KG', purchasePrice: 20, salePrice: 30, stock: 300, minimumStock: 40, status: 'Active', addedOn: '01 Sep 2026' },
  { id: 3, image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=100', name: 'Potato', category: 'Vegetables', unit: 'KG', purchasePrice: 18, salePrice: 25, stock: 800, minimumStock: 100, status: 'Active', addedOn: '01 Sep 2026' },
  { id: 4, image: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=100', name: 'Green Chilli', category: 'Vegetables', unit: 'KG', purchasePrice: 35, salePrice: 50, stock: 50, minimumStock: 30, status: 'Low Stock', addedOn: '01 Sep 2026' },
  { id: 5, image: 'https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?w=100', name: 'Capsicum', category: 'Vegetables', unit: 'KG', purchasePrice: 40, salePrice: 60, stock: 0, minimumStock: 20, status: 'Out of Stock', addedOn: '01 Sep 2026' },
  { id: 6, image: 'https://images.unsplash.com/photo-1447175008436-0841709069c0?w=100', name: 'Carrot', category: 'Vegetables', unit: 'KG', purchasePrice: 30, salePrice: 45, stock: 200, minimumStock: 30, status: 'Active', addedOn: '01 Sep 2026' },
  { id: 7, image: 'https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?w=100', name: 'Cabbage', category: 'Vegetables', unit: 'KG', purchasePrice: 22, salePrice: 35, stock: 150, minimumStock: 25, status: 'Active', addedOn: '01 Sep 2026' },
  { id: 8, image: 'https://images.unsplash.com/photo-1568584711075-3d021a7c3ca3?w=100', name: 'Cauliflower', category: 'Vegetables', unit: 'KG', purchasePrice: 28, salePrice: 42, stock: 25, minimumStock: 20, status: 'Low Stock', addedOn: '01 Sep 2026' },
  { id: 9, image: 'https://images.unsplash.com/photo-1628773822503-930a7eaecf80?w=100', name: 'Lady Finger', category: 'Vegetables', unit: 'KG', purchasePrice: 40, salePrice: 60, stock: 100, minimumStock: 25, status: 'Active', addedOn: '01 Sep 2026' },
  { id: 10, image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=100', name: 'Brinjal', category: 'Vegetables', unit: 'KG', purchasePrice: 32, salePrice: 48, stock: 70, minimumStock: 20, status: 'Active', addedOn: '01 Sep 2026' }
];

export const initialPayments: PaymentTransaction[] = [
  { id: 1, dateTime: '11 Sep 2026, 10:24 AM', referenceId: 'PAY001256', type: 'Order Payment', fromTo: 'Hotel Spice Villa', orderId: 'FB1001', amount: 2500, status: 'Success', paymentMode: 'Online (Razorpay)' },
  { id: 2, dateTime: '11 Sep 2026, 10:10 AM', referenceId: 'PAY001255', type: 'COD Payment', fromTo: 'Hotel Grand Pune', orderId: 'FB1002', amount: 1800, status: 'Success', paymentMode: 'COD' },
  { id: 3, dateTime: '11 Sep 2026, 09:45 AM', referenceId: 'PAY001254', type: 'Joiner Commission', fromTo: 'Rahul Patil', orderId: 'FB1001', amount: 100, status: 'Success', paymentMode: 'Wallet' },
  { id: 4, dateTime: '11 Sep 2026, 09:20 AM', referenceId: 'PAY001253', type: 'Driver Payout', fromTo: 'Suresh Kumar', orderId: 'FB1001', amount: 60, status: 'Success', paymentMode: 'Wallet' },
  { id: 5, dateTime: '10 Sep 2026, 08:15 PM', referenceId: 'PAY001252', type: 'Order Payment', fromTo: 'Hotel Maharaja', orderId: 'FB1004', amount: 2100, status: 'Success', paymentMode: 'Online (UPI)' },
  { id: 6, dateTime: '10 Sep 2026, 07:30 PM', referenceId: 'PAY001251', type: 'Refund', fromTo: 'Hotel City Tadka', orderId: 'FB1007', amount: 500, status: 'Refunded', paymentMode: 'Online' },
  { id: 7, dateTime: '10 Sep 2026, 06:45 PM', referenceId: 'PAY001250', type: 'Joiner Commission', fromTo: 'Sneha More', orderId: 'FB1002', amount: 100, status: 'Success', paymentMode: 'Wallet' },
  { id: 8, dateTime: '10 Sep 2026, 05:10 PM', referenceId: 'PAY001249', type: 'Driver Payout', fromTo: 'Amit Kumar', orderId: 'FB1003', amount: 60, status: 'Success', paymentMode: 'Wallet' },
  { id: 9, dateTime: '10 Sep 2026, 04:20 PM', referenceId: 'PAY001248', type: 'Order Payment', fromTo: 'Hotel Green Leaf', orderId: 'FB1005', amount: 4000, status: 'Success', paymentMode: 'Online (Card)' },
  { id: 10, dateTime: '10 Sep 2026, 03:15 PM', referenceId: 'PAY001247', type: 'COD Payment', fromTo: 'Hotel Sai Sagar', orderId: 'FB1006', amount: 1650, status: 'Success', paymentMode: 'COD' }
];

export const initialNotifications: NotificationItem[] = [
  { id: 1, title: 'New Offer', message: 'Get 10% extra on vegetable orders...', userType: 'Hotels', status: 'Sent', dateTime: '11 Sep 2026, 10:30 AM' },
  { id: 2, title: 'Order Assigned', message: 'Your order #FB1001 has been assigned...', userType: 'Drivers', status: 'Sent', dateTime: '11 Sep 2026, 09:45 AM' },
  { id: 3, title: 'Commission Credited', message: 'You have received ₹500 commission...', userType: 'Joiners', status: 'Sent', dateTime: '10 Sep 2026, 06:20 PM' },
  { id: 4, title: 'New Product Added', message: 'Fresh Ratnagiri Mangoes available now...', userType: 'Hotels', status: 'Sent', dateTime: '10 Sep 2026, 12:10 PM' },
  { id: 5, title: 'Low Stock Alert', message: 'Tomato stock is running low...', userType: 'Admins', status: 'Sent', dateTime: '10 Sep 2026, 11:00 AM' },
  { id: 6, title: 'Delivery Schedule', message: 'Your delivery is scheduled for tomorrow...', userType: 'Drivers', status: 'Scheduled', dateTime: '12 Sep 2026, 08:00 AM' },
  { id: 7, title: 'Festival Offer', message: 'Special Ganesh Chaturthi offer...', userType: 'Hotels', status: 'Sent', dateTime: '09 Sep 2026, 04:30 PM' },
  { id: 8, title: 'KYC Reminder', message: 'Please complete your KYC verification...', userType: 'Joiners', status: 'Failed', dateTime: '09 Sep 2026, 11:20 AM' },
  { id: 9, title: 'Top Performer', message: 'Congratulations! You are the joiner of the month...', userType: 'Drivers', status: 'Sent', dateTime: '08 Sep 2026, 07:10 PM' },
  { id: 10, title: 'App Update', message: 'New features are now available...', userType: 'All Users', status: 'Sent', dateTime: '08 Sep 2026, 10:00 AM' }
];

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
