import type { Driver } from '../types';

export interface DriverDetail extends Driver {
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

export const initialDriversList: DriverDetail[] = [
  {
    id: 1,
    name: 'Rohit Sharma',
    mobile: '9876543210',
    zone: 'Kharadi',
    vehicleNo: 'MH12 AB 1234',
    status: 'Active',
    totalDeliveries: 120,
    rating: 4.8,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
    email: 'rohit.sharma@farmerbox.in',
    emergencyContact: '9822114455',
    licenseNumber: 'MH12-20180023411',
    vehicleModel: 'Tata Ace Gold (CNG)',
    joiningDate: '15 Jan 2023',
    completedToday: 5,
    activeDeliveries: 1,
    onTimeRate: '98%',
    recentOrders: [
      { id: 'FB1001', hotelName: 'Hotel Spice Villa', zone: 'Kharadi', time: '10:24 AM', status: 'Delivered', amount: 2500 },
      { id: 'FB1022', hotelName: 'Kharadi Barbeque', zone: 'Kharadi', time: '09:15 AM', status: 'Delivered', amount: 3400 },
      { id: 'FB1035', hotelName: 'Royal Biryani Kharadi', zone: 'Kharadi', time: '11:30 AM', status: 'In Transit', amount: 1850 }
    ]
  },
  {
    id: 2,
    name: 'Suresh Patil',
    mobile: '8765432109',
    zone: 'Viman Nagar',
    vehicleNo: 'MH12 CD 5678',
    status: 'Active',
    totalDeliveries: 98,
    rating: 4.6,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
    email: 'suresh.patil@farmerbox.in',
    emergencyContact: '8765432199',
    licenseNumber: 'MH12-20190087422',
    vehicleModel: 'Mahindra Bolero Maxi Truck',
    joiningDate: '10 Mar 2023',
    completedToday: 4,
    activeDeliveries: 1,
    onTimeRate: '95%',
    recentOrders: [
      { id: 'FB1002', hotelName: 'Hotel Grand Pune', zone: 'Viman Nagar', time: '10:10 AM', status: 'Delivered', amount: 1800 },
      { id: 'FB1018', hotelName: 'Airport View Hotel', zone: 'Viman Nagar', time: '08:45 AM', status: 'Delivered', amount: 2900 }
    ]
  },
  {
    id: 3,
    name: 'Imran Khan',
    mobile: '9988776655',
    zone: 'Hadapsar',
    vehicleNo: 'MH14 EF 9012',
    status: 'Active',
    totalDeliveries: 85,
    rating: 4.7,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
    email: 'imran.khan@farmerbox.in',
    emergencyContact: '9988112233',
    licenseNumber: 'MH14-20200054321',
    vehicleModel: 'Piaggio Ape Extra LDX',
    joiningDate: '22 Apr 2023',
    completedToday: 6,
    activeDeliveries: 0,
    onTimeRate: '97%',
    recentOrders: [
      { id: 'FB1005', hotelName: 'Hotel Green Leaf', zone: 'Hadapsar', time: '08:50 AM', status: 'Delivered', amount: 4000 }
    ]
  },
  {
    id: 4,
    name: 'Amit Kumar',
    mobile: '9823456789',
    zone: 'Wakad',
    vehicleNo: 'MH12 GH 3456',
    status: 'Active',
    totalDeliveries: 76,
    rating: 4.5,
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100',
    email: 'amit.kumar@farmerbox.in',
    emergencyContact: '9823450000',
    licenseNumber: 'MH12-20210098765',
    vehicleModel: 'Tata Ace Mega',
    joiningDate: '05 Jun 2023',
    completedToday: 3,
    activeDeliveries: 1,
    onTimeRate: '94%',
    recentOrders: [
      { id: 'FB1007', hotelName: 'Hotel City Tadka', zone: 'Wakad', time: '06:15 PM', status: 'Delivered', amount: 2800 }
    ]
  },
  {
    id: 5,
    name: 'Ramesh Yadav',
    mobile: '9134567890',
    zone: 'Kothrud',
    vehicleNo: 'MH14 IJ 7890',
    status: 'Active',
    totalDeliveries: 70,
    rating: 4.4,
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100',
    email: 'ramesh.yadav@farmerbox.in',
    emergencyContact: '9134560000',
    licenseNumber: 'MH14-20170067890',
    vehicleModel: 'Ashok Leyland Dost+',
    joiningDate: '18 Jul 2023',
    completedToday: 4,
    activeDeliveries: 0,
    onTimeRate: '93%',
    recentOrders: [
      { id: 'FB1009', hotelName: 'Hotel Parampara', zone: 'Kothrud', time: '04:30 PM', status: 'Delivered', amount: 3600 }
    ]
  },
  {
    id: 6,
    name: 'Vikram Singh',
    mobile: '9001234567',
    zone: 'Magarpatta',
    vehicleNo: 'MH12 KL 2345',
    status: 'On Leave',
    totalDeliveries: 55,
    rating: 4.2,
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100',
    email: 'vikram.singh@farmerbox.in',
    emergencyContact: '9001239999',
    licenseNumber: 'MH12-20220034567',
    vehicleModel: 'Mahindra Supro Van',
    joiningDate: '01 Aug 2023',
    completedToday: 0,
    activeDeliveries: 0,
    onTimeRate: '90%',
    recentOrders: []
  },
  {
    id: 7,
    name: 'Sanjay More',
    mobile: '8877665544',
    zone: 'Shivajinagar',
    vehicleNo: 'MH14 MN 6789',
    status: 'Active',
    totalDeliveries: 62,
    rating: 4.3,
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100',
    email: 'sanjay.more@farmerbox.in',
    emergencyContact: '8877660000',
    licenseNumber: 'MH14-20190012345',
    vehicleModel: 'Tata Ace Gold',
    joiningDate: '12 Sep 2023',
    completedToday: 4,
    activeDeliveries: 1,
    onTimeRate: '92%',
    recentOrders: []
  },
  {
    id: 8,
    name: 'Deepak Jadhav',
    mobile: '9765432108',
    zone: 'Baner',
    vehicleNo: 'MH12 OP 0123',
    status: 'Active',
    totalDeliveries: 48,
    rating: 4.1,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
    email: 'deepak.jadhav@farmerbox.in',
    emergencyContact: '9765430000',
    licenseNumber: 'MH12-20230045678',
    vehicleModel: 'Piaggio Ape Delivery',
    joiningDate: '05 Nov 2023',
    completedToday: 3,
    activeDeliveries: 1,
    onTimeRate: '91%',
    recentOrders: []
  },
  {
    id: 9,
    name: 'Prakash Gaikwad',
    mobile: '9898987654',
    zone: 'Aundh',
    vehicleNo: 'MH14 QR 3456',
    status: 'Inactive',
    totalDeliveries: 35,
    rating: 3.9,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
    email: 'prakash.gaikwad@farmerbox.in',
    emergencyContact: '9898980000',
    licenseNumber: 'MH14-20160078912',
    vehicleModel: 'Mahindra Bolero Maxi Truck',
    joiningDate: '20 Dec 2023',
    completedToday: 0,
    activeDeliveries: 0,
    onTimeRate: '86%',
    recentOrders: []
  },
  {
    id: 10,
    name: 'Santosh Wagh',
    mobile: '9543210987',
    zone: 'Pimple Saudagar',
    vehicleNo: 'MH12 ST 5678',
    status: 'Active',
    totalDeliveries: 28,
    rating: 4.0,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
    email: 'santosh.wagh@farmerbox.in',
    emergencyContact: '9543210000',
    licenseNumber: 'MH12-20240011223',
    vehicleModel: 'Tata Ace EV',
    joiningDate: '10 Jan 2024',
    completedToday: 2,
    activeDeliveries: 1,
    onTimeRate: '93%',
    recentOrders: []
  },

  // Drivers 11-18: Kharadi Zone (Completing Kharadi 8 drivers: 7 Active, 1 Inactive)
  {
    id: 11,
    name: 'Ganesh Kulkarni',
    mobile: '9822101011',
    zone: 'Kharadi',
    vehicleNo: 'MH12 UV 9012',
    status: 'Active',
    totalDeliveries: 64,
    rating: 4.6,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
    email: 'ganesh.k@farmerbox.in',
    completedToday: 4,
    activeDeliveries: 0
  },
  {
    id: 12,
    name: 'Sachin Thorat',
    mobile: '9822101012',
    zone: 'Kharadi',
    vehicleNo: 'MH12 WX 3456',
    status: 'Active',
    totalDeliveries: 58,
    rating: 4.5,
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100',
    email: 'sachin.t@farmerbox.in',
    completedToday: 3,
    activeDeliveries: 0
  },
  {
    id: 13,
    name: 'Mahesh Ghadge',
    mobile: '9822101013',
    zone: 'Kharadi',
    vehicleNo: 'MH12 YZ 7890',
    status: 'Active',
    totalDeliveries: 52,
    rating: 4.7,
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100',
    email: 'mahesh.g@farmerbox.in',
    completedToday: 4,
    activeDeliveries: 1
  },
  {
    id: 14,
    name: 'Vinod Shinde',
    mobile: '9822101014',
    zone: 'Kharadi',
    vehicleNo: 'MH12 AA 1122',
    status: 'Active',
    totalDeliveries: 45,
    rating: 4.4,
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100',
    email: 'vinod.s@farmerbox.in',
    completedToday: 3,
    activeDeliveries: 0
  },
  {
    id: 15,
    name: 'Kailash Salunkhe',
    mobile: '9822101015',
    zone: 'Kharadi',
    vehicleNo: 'MH12 BB 3344',
    status: 'Active',
    totalDeliveries: 41,
    rating: 4.3,
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100',
    email: 'kailash.s@farmerbox.in',
    completedToday: 2,
    activeDeliveries: 0
  },
  {
    id: 16,
    name: 'Manoj Bhosale',
    mobile: '9822101016',
    zone: 'Kharadi',
    vehicleNo: 'MH12 CC 5566',
    status: 'Active',
    totalDeliveries: 39,
    rating: 4.5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
    email: 'manoj.b@farmerbox.in',
    completedToday: 3,
    activeDeliveries: 0
  },
  {
    id: 17,
    name: 'Dnyaneshwar Pawar',
    mobile: '9822101017',
    zone: 'Kharadi',
    vehicleNo: 'MH12 DD 7788',
    status: 'Inactive',
    totalDeliveries: 22,
    rating: 3.8,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
    email: 'dnyan.p@farmerbox.in',
    completedToday: 0,
    activeDeliveries: 0
  },

  // Drivers 18-22: Viman Nagar Zone (Completing Viman Nagar 6 drivers: 5 Active, 1 Inactive)
  {
    id: 18,
    name: 'Tushar Jagtap',
    mobile: '9822102018',
    zone: 'Viman Nagar',
    vehicleNo: 'MH12 EE 9900',
    status: 'Active',
    totalDeliveries: 60,
    rating: 4.7,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
    completedToday: 3,
    activeDeliveries: 0
  },
  {
    id: 19,
    name: 'Nitin Chavan',
    mobile: '9822102019',
    zone: 'Viman Nagar',
    vehicleNo: 'MH12 FF 1234',
    status: 'Active',
    totalDeliveries: 54,
    rating: 4.6,
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100',
    completedToday: 4,
    activeDeliveries: 1
  },
  {
    id: 20,
    name: 'Balaji Mane',
    mobile: '9822102020',
    zone: 'Viman Nagar',
    vehicleNo: 'MH12 GG 5678',
    status: 'Active',
    totalDeliveries: 47,
    rating: 4.4,
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100',
    completedToday: 3,
    activeDeliveries: 0
  },
  {
    id: 21,
    name: 'Avinash Landge',
    mobile: '9822102021',
    zone: 'Viman Nagar',
    vehicleNo: 'MH12 HH 9012',
    status: 'Active',
    totalDeliveries: 36,
    rating: 4.5,
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100',
    completedToday: 2,
    activeDeliveries: 0
  },
  {
    id: 22,
    name: 'Pradeep Kamble',
    mobile: '9822102022',
    zone: 'Viman Nagar',
    vehicleNo: 'MH12 II 3456',
    status: 'Inactive',
    totalDeliveries: 19,
    rating: 3.7,
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100',
    completedToday: 0,
    activeDeliveries: 0
  },

  // Drivers 23-27: Hadapsar Zone (Completing Hadapsar 6 drivers: 5 Active, 1 Inactive)
  {
    id: 23,
    name: 'Akash Sonawane',
    mobile: '9822103023',
    zone: 'Hadapsar',
    vehicleNo: 'MH14 JJ 7890',
    status: 'Active',
    totalDeliveries: 66,
    rating: 4.7,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
    completedToday: 4,
    activeDeliveries: 0
  },
  {
    id: 24,
    name: 'Vikas Shelar',
    mobile: '9822103024',
    zone: 'Hadapsar',
    vehicleNo: 'MH14 KK 1122',
    status: 'Active',
    totalDeliveries: 59,
    rating: 4.5,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
    completedToday: 3,
    activeDeliveries: 1
  },
  {
    id: 25,
    name: 'Sandip Dhumal',
    mobile: '9822103025',
    zone: 'Hadapsar',
    vehicleNo: 'MH14 LL 3344',
    status: 'Active',
    totalDeliveries: 44,
    rating: 4.4,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
    completedToday: 3,
    activeDeliveries: 0
  },
  {
    id: 26,
    name: 'Nilesh Kate',
    mobile: '9822103026',
    zone: 'Hadapsar',
    vehicleNo: 'MH14 MM 5566',
    status: 'Active',
    totalDeliveries: 38,
    rating: 4.3,
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100',
    completedToday: 2,
    activeDeliveries: 0
  },
  {
    id: 27,
    name: 'Sunil Gholap',
    mobile: '9822103027',
    zone: 'Hadapsar',
    vehicleNo: 'MH14 NN 7788',
    status: 'Inactive',
    totalDeliveries: 17,
    rating: 3.6,
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100',
    completedToday: 0,
    activeDeliveries: 0
  },

  // Drivers 28-31: Magarpatta Zone (Completing Magarpatta 5 drivers: 4 Active, 1 On Leave - Vikram Singh)
  {
    id: 28,
    name: 'Sagar Gaikwad',
    mobile: '9822104028',
    zone: 'Magarpatta',
    vehicleNo: 'MH12 OO 9900',
    status: 'Active',
    totalDeliveries: 72,
    rating: 4.8,
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100',
    completedToday: 5,
    activeDeliveries: 1
  },
  {
    id: 29,
    name: 'Dhananjay Phalke',
    mobile: '9822104029',
    zone: 'Magarpatta',
    vehicleNo: 'MH12 PP 1234',
    status: 'Active',
    totalDeliveries: 61,
    rating: 4.6,
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100',
    completedToday: 3,
    activeDeliveries: 0
  },
  {
    id: 30,
    name: 'Abhijit Bankar',
    mobile: '9822104030',
    zone: 'Magarpatta',
    vehicleNo: 'MH12 QQ 5678',
    status: 'Active',
    totalDeliveries: 49,
    rating: 4.5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
    completedToday: 3,
    activeDeliveries: 0
  },
  {
    id: 31,
    name: 'Rahul Nalawade',
    mobile: '9822104031',
    zone: 'Magarpatta',
    vehicleNo: 'MH12 RR 9012',
    status: 'Active',
    totalDeliveries: 42,
    rating: 4.4,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
    completedToday: 2,
    activeDeliveries: 0
  },

  // Drivers 32-35: Wakad Zone (Completing Wakad 5 drivers: 4 Active, 1 Inactive)
  {
    id: 32,
    name: 'Vishal Dhawale',
    mobile: '9822105032',
    zone: 'Wakad',
    vehicleNo: 'MH12 SS 3456',
    status: 'Active',
    totalDeliveries: 63,
    rating: 4.6,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
    completedToday: 4,
    activeDeliveries: 0
  },
  {
    id: 33,
    name: 'Chetan Borse',
    mobile: '9822105033',
    zone: 'Wakad',
    vehicleNo: 'MH12 TT 7890',
    status: 'Active',
    totalDeliveries: 51,
    rating: 4.5,
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100',
    completedToday: 3,
    activeDeliveries: 1
  },
  {
    id: 34,
    name: 'Anand Lokhande',
    mobile: '9822105034',
    zone: 'Wakad',
    vehicleNo: 'MH12 UU 1122',
    status: 'Active',
    totalDeliveries: 46,
    rating: 4.3,
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100',
    completedToday: 2,
    activeDeliveries: 0
  },
  {
    id: 35,
    name: 'Rohidas Kadam',
    mobile: '9822105035',
    zone: 'Wakad',
    vehicleNo: 'MH12 VV 3344',
    status: 'Inactive',
    totalDeliveries: 24,
    rating: 3.9,
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100',
    completedToday: 0,
    activeDeliveries: 0
  },

  // Drivers 36-38: Kothrud Zone (Completing Kothrud 4 drivers: 3 Active, 1 On Leave)
  {
    id: 36,
    name: 'Swapnil Joshi',
    mobile: '9822106036',
    zone: 'Kothrud',
    vehicleNo: 'MH14 WW 5566',
    status: 'Active',
    totalDeliveries: 57,
    rating: 4.6,
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100',
    completedToday: 4,
    activeDeliveries: 0
  },
  {
    id: 37,
    name: 'Hemant Kulkarni',
    mobile: '9822106037',
    zone: 'Kothrud',
    vehicleNo: 'MH14 XX 7788',
    status: 'Active',
    totalDeliveries: 48,
    rating: 4.5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
    completedToday: 3,
    activeDeliveries: 0
  },
  {
    id: 38,
    name: 'Ajay Deshmukh',
    mobile: '9822106038',
    zone: 'Kothrud',
    vehicleNo: 'MH14 YY 9900',
    status: 'On Leave',
    totalDeliveries: 31,
    rating: 4.1,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
    completedToday: 0,
    activeDeliveries: 0
  },

  // Drivers 39-41: Baner Zone (Completing Baner 4 drivers: 3 Active, 1 Inactive)
  {
    id: 39,
    name: 'Siddheshwar Shinde',
    mobile: '9822107039',
    zone: 'Baner',
    vehicleNo: 'MH12 ZZ 1234',
    status: 'Active',
    totalDeliveries: 53,
    rating: 4.5,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
    completedToday: 3,
    activeDeliveries: 0
  },
  {
    id: 40,
    name: 'Pandurang Jagdale',
    mobile: '9822107040',
    zone: 'Baner',
    vehicleNo: 'MH12 AB 5678',
    status: 'Active',
    totalDeliveries: 42,
    rating: 4.4,
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100',
    completedToday: 2,
    activeDeliveries: 1
  },
  {
    id: 41,
    name: 'Rohan Gaikwad',
    mobile: '9822107041',
    zone: 'Baner',
    vehicleNo: 'MH12 CD 9012',
    status: 'Inactive',
    totalDeliveries: 18,
    rating: 3.7,
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100',
    completedToday: 0,
    activeDeliveries: 0
  },

  // Driver 42: Aundh Zone (Completing Aundh 4 drivers: 3 Active, 1 Inactive - Prakash Gaikwad)
  {
    id: 42,
    name: 'Kishore Bhende',
    mobile: '9822108042',
    zone: 'Aundh',
    vehicleNo: 'MH14 EF 3456',
    status: 'Active',
    totalDeliveries: 49,
    rating: 4.6,
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100',
    completedToday: 3,
    activeDeliveries: 0
  }
];

export const zoneWiseDriverStats = [
  { zone: 'Kharadi', total: 8, active: 7, inactive: 1 },
  { zone: 'Viman Nagar', total: 6, active: 5, inactive: 1 },
  { zone: 'Hadapsar', total: 6, active: 5, inactive: 1 },
  { zone: 'Magarpatta', total: 5, active: 4, inactive: 1 },
  { zone: 'Wakad', total: 5, active: 4, inactive: 1 },
  { zone: 'Kothrud', total: 4, active: 3, inactive: 1 },
  { zone: 'Baner', total: 4, active: 3, inactive: 1 },
  { zone: 'Aundh', total: 4, active: 3, inactive: 1 }
];
