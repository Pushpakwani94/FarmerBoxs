export interface JoinerCommissionRecord {
  id: number | string;
  name: string;
  mobile: string;
  zone: string;
  totalOrders: number;
  completedOrders?: number;
  deliveredOrders: number;
  pendingOrders?: number;
  commissionRate: number; // default 100
  commission: number; // cumulative non-decreasing commission
  paidAmount: number;
  pendingAmount: number;
  status: 'Paid' | 'Pending';
  avatar: string;
  upiId: string;
  bankName: string;
  accountNo: string;
  ifscCode: string;
  walletBalance: number;
  recentTransactions: CommissionTransaction[];
}

export interface CommissionTransaction {
  id: string;
  date: string;
  orderId: string;
  hotelName?: string;
  amount: number;
  status: 'Paid' | 'Pending';
  paymentMode?: string;
  utr?: string;
}

export interface PayoutRequest {
  id: string;
  joinerId: number | string;
  joinerName: string;
  mobile: string;
  zone: string;
  amount: number;
  requestDate: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  paymentMethod: 'UPI' | 'Bank Transfer';
  upiOrAccount: string;
}

export const initialCommissionList: JoinerCommissionRecord[] = [
  {
    id: 'usr_9130188793',
    name: 'Yash kolhe',
    mobile: '9130188793',
    zone: 'Shivajinagar',
    totalOrders: 0,
    completedOrders: 0,
    deliveredOrders: 0,
    pendingOrders: 0,
    commissionRate: 100,
    commission: 0,
    paidAmount: 0,
    pendingAmount: 0,
    status: 'Pending',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
    upiId: 'yashkolhe@upi',
    bankName: 'HDFC Bank',
    accountNo: '50100458921134',
    ifscCode: 'HDFC0001234',
    walletBalance: 0,
    recentTransactions: []
  },
  {
    id: 'usr_9208308509',
    name: 'Nitin Jadhav',
    mobile: '9208308509',
    zone: 'Kharadi',
    totalOrders: 0,
    completedOrders: 0,
    deliveredOrders: 0,
    pendingOrders: 0,
    commissionRate: 100,
    commission: 0,
    paidAmount: 0,
    pendingAmount: 0,
    status: 'Pending',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
    upiId: 'nitinjadhav@upi',
    bankName: 'SBI',
    accountNo: '30248596123',
    ifscCode: 'SBIN0004521',
    walletBalance: 0,
    recentTransactions: []
  },
  {
    id: 'usr_9284308509',
    name: 'Raj Patil',
    mobile: '9284308509',
    zone: 'Kharadi',
    totalOrders: 0,
    completedOrders: 0,
    deliveredOrders: 0,
    pendingOrders: 0,
    commissionRate: 100,
    commission: 0,
    paidAmount: 0,
    pendingAmount: 0,
    status: 'Pending',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
    upiId: 'rajpatil@upi',
    bankName: 'ICICI Bank',
    accountNo: '002301596821',
    ifscCode: 'ICIC0000023',
    walletBalance: 0,
    recentTransactions: []
  },
  {
    id: 'usr_9834341830',
    name: 'Pushpak wani',
    mobile: '9834341830',
    zone: 'Kharadi',
    totalOrders: 0,
    completedOrders: 0,
    deliveredOrders: 0,
    pendingOrders: 0,
    commissionRate: 100,
    commission: 0,
    paidAmount: 0,
    pendingAmount: 0,
    status: 'Pending',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
    upiId: 'pushpak@upi',
    bankName: 'Axis Bank',
    accountNo: '912010048596123',
    ifscCode: 'UTIB0000542',
    walletBalance: 0,
    recentTransactions: []
  }
];

export const initialPayoutRequests: PayoutRequest[] = [
  {
    id: 'REQ-501',
    joinerId: 'usr_9130188793',
    joinerName: 'Yash kolhe',
    mobile: '9130188793',
    zone: 'Shivajinagar',
    amount: 500,
    requestDate: '11 Sep 2026, 09:30 AM',
    status: 'Pending',
    paymentMethod: 'UPI',
    upiOrAccount: 'yashkolhe@upi'
  },
  {
    id: 'REQ-502',
    joinerId: 'usr_9208308509',
    joinerName: 'Nitin Jadhav',
    mobile: '9208308509',
    zone: 'Kharadi',
    amount: 400,
    requestDate: '10 Sep 2026, 06:15 PM',
    status: 'Pending',
    paymentMethod: 'Bank Transfer',
    upiOrAccount: 'SBI - A/C 30248596123'
  }
];

export const initialPaymentHistory = [
  { id: 'PAY-8901', date: '11 Sep 2026, 10:30 AM', joinerName: 'Yash kolhe', mobile: '9130188793', zone: 'Shivajinagar', amount: 400, mode: 'UPI', utr: 'UTR9832104523', status: 'Completed' },
  { id: 'PAY-8902', date: '10 Sep 2026, 07:15 PM', joinerName: 'Nitin Jadhav', mobile: '9208308509', zone: 'Kharadi', amount: 500, mode: 'Bank Transfer', utr: 'UTR9832104524', status: 'Completed' }
];
