import React, { useState, useMemo, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  CircleDollarSign,
  Wallet,
  Clock,
  Users,
  Search,
  Eye,
  Phone,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Send,
  Calendar,
  Download,
  CheckCircle2,
  AlertCircle,
  FileText,
  CreditCard,
  Building2,
  RefreshCw,
  Filter
} from 'lucide-react';
import {
  initialCommissionList,
  initialPayoutRequests,
  initialPaymentHistory
} from '../data/commissionData';
import type {
  JoinerCommissionRecord,
  PayoutRequest,
  CommissionTransaction
} from '../data/commissionData';
import { MakePayoutModal } from '../components/Modals/MakePayoutModal';
import { JoinerCommissionHistoryModal } from '../components/Modals/JoinerCommissionHistoryModal';
import { EditCommissionModal } from '../components/Modals/EditCommissionModal';

export const CommissionPage: React.FC = () => {
  const { joiners, orders, isDatabaseConnected } = useApp();

  // Dynamically compute commission list from live Firestore / state data
  const dynamicCommissionList = useMemo<JoinerCommissionRecord[]>(() => {
    if (joiners.length === 0 && isDatabaseConnected) {
      return [];
    }
    if (joiners.length === 0) {
      return initialCommissionList;
    }
    return joiners.map((j, idx) => {
      const jOrders = orders.filter(
        o => o.joiner?.toLowerCase() === j.name?.toLowerCase() || String(o.joiner) === String(j.id)
      );
      const deliveredOrders = jOrders.filter(o => o.status === 'Delivered').length;
      const totalOrdersCount = jOrders.length > 0 ? jOrders.length : (j.totalOrders || 0);
      const commissionRate = 100;
      const totalCommission = jOrders.length > 0
        ? deliveredOrders * commissionRate
        : (j.totalEarnings || deliveredOrders * commissionRate);
      const paidAmount = j.paidAmount || 0;
      const pendingAmount = Math.max(0, totalCommission - paidAmount);
      const status: 'Paid' | 'Pending' = pendingAmount <= 0 ? 'Paid' : 'Pending';

      const recentTransactions: CommissionTransaction[] = jOrders.slice(0, 5).map(o => ({
        id: `TXN-${o.id}`,
        date: o.date,
        orderId: o.id,
        hotelName: o.hotelName,
        amount: commissionRate,
        status: o.status === 'Delivered' ? 'Paid' : 'Pending'
      }));

      return {
        id: j.id || (idx + 1),
        name: j.name,
        mobile: j.mobile,
        zone: j.zone || 'Kharadi',
        totalOrders: totalOrdersCount,
        deliveredOrders: deliveredOrders,
        commissionRate,
        commission: totalCommission,
        paidAmount,
        pendingAmount,
        status,
        avatar: j.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
        upiId: `${j.name.toLowerCase().replace(/\s+/g, '')}@okaxis`,
        bankName: 'HDFC Bank',
        accountNo: '•••• •••• 4521',
        ifscCode: 'HDFC0001234',
        walletBalance: pendingAmount,
        recentTransactions: recentTransactions.length > 0 ? recentTransactions : [
          { id: 'TXN101', date: 'Today', orderId: 'FB1001', hotelName: 'Hotel Shiv Sagar', amount: 100, status: 'Paid' }
        ]
      };
    });
  }, [joiners, orders, isDatabaseConnected]);

  // Master state
  const [commissionList, setCommissionList] = useState<JoinerCommissionRecord[]>(dynamicCommissionList);
  const [payoutRequests, setPayoutRequests] = useState<PayoutRequest[]>(isDatabaseConnected ? [] : initialPayoutRequests);
  const [paymentHistory, setPaymentHistory] = useState(isDatabaseConnected ? [] : initialPaymentHistory);

  useEffect(() => {
    setCommissionList(dynamicCommissionList);
  }, [dynamicCommissionList]);

  // Active Sub-Tab
  const [activeTab, setActiveTab] = useState<'Commission List' | 'Joiner Wallets' | 'Payment History' | 'Payout Requests'>('Commission List');

  // Selected Joiner for Right Drawer
  const [selectedJoinerId, setSelectedJoinerId] = useState<number>(1);
  const activeJoiner = commissionList.find(j => j.id === selectedJoinerId) || commissionList[0];

  // Filters
  const [zoneFilter, setZoneFilter] = useState<string>('All Zones');
  const [joinerFilter, setJoinerFilter] = useState<string>('All Joiners');
  const [statusFilter, setStatusFilter] = useState<string>('All Status');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [dateRange, setDateRange] = useState<string>('11 Sep 2026 - 11 Sep 2026');
  const [isDatePickerOpen, setIsDatePickerOpen] = useState<boolean>(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  // Checkbox selection
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  // Modals state
  const [isPayoutModalOpen, setIsPayoutModalOpen] = useState<boolean>(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);

  // Success notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Distinct Zones
  const zones = useMemo(() => {
    const list = Array.from(new Set(commissionList.map(j => j.zone)));
    return ['All Zones', ...list];
  }, [commissionList]);

  // Distinct Joiners
  const joinerNames = useMemo(() => {
    return ['All Joiners', ...commissionList.map(j => j.name)];
  }, [commissionList]);

  // Filtered List
  const filteredList = useMemo(() => {
    return commissionList.filter(item => {
      const matchZone = zoneFilter === 'All Zones' || item.zone === zoneFilter;
      const matchJoiner = joinerFilter === 'All Joiners' || item.name === joinerFilter;
      const matchStatus = statusFilter === 'All Status' || item.status === statusFilter;
      const matchSearch =
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.mobile.includes(searchTerm) ||
        item.zone.toLowerCase().includes(searchTerm.toLowerCase());
      return matchZone && matchJoiner && matchStatus && matchSearch;
    });
  }, [commissionList, zoneFilter, joinerFilter, statusFilter, searchTerm]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredList.length / itemsPerPage) || 1;
  const paginatedList = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredList.slice(start, start + itemsPerPage);
  }, [filteredList, currentPage]);

  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, filteredList.length);

  // Checkbox handlers
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(paginatedList.map(j => j.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleToggleRow = (id: number) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Export CSV function
  const handleExportCSV = () => {
    const headers = ["#", "Joiner Name", "Mobile", "Zone", "Total Orders", "Delivered Orders", "Commission Rate", "Total Commission", "Paid Amount", "Pending Amount", "Status"];
    const rows = filteredList.map(j => [
      j.id,
      `"${j.name}"`,
      `"${j.mobile}"`,
      `"${j.zone}"`,
      j.totalOrders,
      j.deliveredOrders,
      `"₹${j.commissionRate}"`,
      `"₹${j.commission}"`,
      `"₹${j.paidAmount}"`,
      `"₹${j.pendingAmount}"`,
      j.status
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Joiner_Commission_List_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Exported Commission List to CSV successfully!');
  };

  // Payment Success Handler
  const handlePaymentSuccess = (joinerId: number, amount: number, mode: string, txnRef: string) => {
    setCommissionList(prev =>
      prev.map(j => {
        if (j.id === joinerId) {
          const newPaid = j.paidAmount + amount;
          const newPending = Math.max(0, j.commission - newPaid);
          const newTx = {
            id: txnRef,
            date: '11 Sep 2026',
            orderId: `FB${Math.floor(1000 + Math.random() * 9000)}`,
            amount: amount,
            status: 'Paid' as const,
            paymentMode: mode,
            utr: txnRef
          };
          return {
            ...j,
            paidAmount: newPaid,
            pendingAmount: newPending,
            walletBalance: Math.max(0, j.walletBalance - amount),
            status: newPending === 0 ? 'Paid' : 'Pending',
            recentTransactions: [newTx, ...(j.recentTransactions || []).slice(0, 4)]
          };
        }
        return j;
      })
    );

    // Add to Payment History
    const historyItem = {
      id: txnRef,
      date: '11 Sep 2026, 11:30 AM',
      joinerName: activeJoiner.name,
      mobile: activeJoiner.mobile,
      zone: activeJoiner.zone,
      amount: amount,
      mode: mode,
      utr: txnRef,
      status: 'Completed'
    };
    setPaymentHistory(prev => [historyItem, ...prev]);

    showToast(`Payment of ₹${amount.toLocaleString('en-IN')} disbursed to ${activeJoiner.name}!`);
  };

  // Edit Joiner Save Handler
  const handleEditSave = (updated: Partial<JoinerCommissionRecord>) => {
    setCommissionList(prev =>
      prev.map(j => (j.id === selectedJoinerId ? { ...j, ...updated } : j))
    );
    showToast(`Updated details for ${activeJoiner.name}`);
  };

  // Payout Request Actions
  const handleApprovePayout = (req: PayoutRequest) => {
    setPayoutRequests(prev =>
      prev.map(r => (r.id === req.id ? { ...r, status: 'Approved' } : r))
    );
    handlePaymentSuccess(req.joinerId, req.amount, req.paymentMethod, `PAY-REQ-${req.id}`);
  };

  const handleRejectPayout = (reqId: string) => {
    setPayoutRequests(prev =>
      prev.map(r => (r.id === reqId ? { ...r, status: 'Rejected' } : r))
    );
    showToast('Payout request rejected');
  };

  // Bulk Payment for selected
  const handleBulkPay = () => {
    if (selectedIds.length === 0) return;
    setCommissionList(prev =>
      prev.map(j => {
        if (selectedIds.includes(j.id) && j.status === 'Pending') {
          return {
            ...j,
            paidAmount: j.commission,
            pendingAmount: 0,
            status: 'Paid',
            walletBalance: 0
          };
        }
        return j;
      })
    );
    setSelectedIds([]);
    showToast(`Successfully processed payouts for ${selectedIds.length} joiners!`);
  };

  // Metrics computed dynamically
  const totalCommissionSum = commissionList.reduce((sum, j) => sum + (Number(j.commission) || 0), 0);
  const paidCommissionSum = commissionList.reduce((sum, j) => sum + (Number(j.paidAmount) || 0), 0);
  const pendingCommissionSum = commissionList.reduce((sum, j) => sum + (Number(j.pendingAmount) || 0), 0);
  const totalJoinersCount = isDatabaseConnected ? joiners.length : (joiners.length || commissionList.length);
  const paidPercentage = totalCommissionSum > 0 ? Math.round((paidCommissionSum / totalCommissionSum) * 100) : 0;
  const pendingPercentage = totalCommissionSum > 0 ? Math.round((pendingCommissionSum / totalCommissionSum) * 100) : 0;

  return (
    <div className="p-6 max-w-[1600px] mx-auto space-y-5">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-emerald-800 text-white px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2 text-xs font-bold animate-in fade-in slide-in-from-top-3">
          <CheckCircle2 className="w-4 h-4 text-emerald-300" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
        {/* Total Commission */}
        <div className="bg-emerald-50/90 p-4 rounded-xl border border-emerald-100/90 flex items-center gap-3 shadow-2xs">
          <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold shadow-xs">
            <CircleDollarSign className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500">Total Commission</p>
            <h3 className="text-2xl font-extrabold text-slate-900 leading-none mt-1">₹{totalCommissionSum.toLocaleString('en-IN')}</h3>
            <p className="text-[10px] text-emerald-700 font-semibold mt-1">Total earned</p>
          </div>
        </div>

        {/* Paid Commission */}
        <div className="bg-sky-50/90 p-4 rounded-xl border border-sky-100/90 flex items-center gap-3 shadow-2xs">
          <div className="w-12 h-12 rounded-xl bg-sky-600 text-white flex items-center justify-center font-bold shadow-xs">
            <Wallet className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500">Paid Commission</p>
            <h3 className="text-2xl font-extrabold text-slate-900 leading-none mt-1">₹{paidCommissionSum.toLocaleString('en-IN')}</h3>
            <p className="text-[10px] text-sky-700 font-semibold mt-1">{paidPercentage}% of total</p>
          </div>
        </div>

        {/* Pending Commission */}
        <div className="bg-amber-50/90 p-4 rounded-xl border border-amber-100/90 flex items-center gap-3 shadow-2xs">
          <div className="w-12 h-12 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold shadow-xs">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500">Pending Commission</p>
            <h3 className="text-2xl font-extrabold text-slate-900 leading-none mt-1">₹{pendingCommissionSum.toLocaleString('en-IN')}</h3>
            <p className="text-[10px] text-amber-700 font-semibold mt-1">{pendingPercentage}% of total</p>
          </div>
        </div>

        {/* Total Joiners */}
        <div className="bg-purple-50/90 p-4 rounded-xl border border-purple-100/90 flex items-center gap-3 shadow-2xs">
          <div className="w-12 h-12 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold shadow-xs">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500">Total Joiners</p>
            <h3 className="text-2xl font-extrabold text-slate-900 leading-none mt-1">{totalJoinersCount}</h3>
            <p className="text-[10px] text-purple-700 font-semibold mt-1">Active fleet</p>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Table/Sub-Tab (8 cols) + Right Detail Drawer (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Column (8 cols) */}
        <div className="lg:col-span-8 bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
          {/* 4 Sub-Tabs */}
          <div className="flex items-center gap-4 border-b border-slate-200 text-xs font-bold text-slate-600 overflow-x-auto">
            {(['Commission List', 'Joiner Wallets', 'Payment History', 'Payout Requests'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setCurrentPage(1);
                }}
                className={`pb-2.5 transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === tab
                    ? 'text-emerald-700 border-b-2 border-emerald-700 font-extrabold'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {tab}
                {tab === 'Payout Requests' && payoutRequests.filter(r => r.status === 'Pending').length > 0 && (
                  <span className="ml-1.5 px-1.5 py-0.2 bg-rose-500 text-white text-[10px] rounded-full">
                    {payoutRequests.filter(r => r.status === 'Pending').length}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* TAB 1: COMMISSION LIST */}
          {activeTab === 'Commission List' && (
            <>
              {/* Filter Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  {/* Zone Filter */}
                  <select
                    value={zoneFilter}
                    onChange={(e) => {
                      setZoneFilter(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 font-medium text-slate-700 focus:outline-emerald-600"
                  >
                    {zones.map(z => <option key={z} value={z}>{z}</option>)}
                  </select>

                  {/* Joiner Filter */}
                  <select
                    value={joinerFilter}
                    onChange={(e) => {
                      setJoinerFilter(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 font-medium text-slate-700 focus:outline-emerald-600"
                  >
                    {joinerNames.map(j => <option key={j} value={j}>{j}</option>)}
                  </select>

                  {/* Status Filter */}
                  <select
                    value={statusFilter}
                    onChange={(e) => {
                      setStatusFilter(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 font-medium text-slate-700 focus:outline-emerald-600"
                  >
                    <option value="All Status">All Status</option>
                    <option value="Pending">Pending</option>
                    <option value="Paid">Paid</option>
                  </select>

                  {/* Search Input & Button */}
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search name/mobile..."
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="text-xs bg-slate-50 border border-slate-200 rounded-lg pl-3 pr-2 py-1.5 text-slate-700 w-36 focus:w-44 transition-all focus:outline-emerald-600"
                    />
                  </div>

                  <button
                    onClick={() => setCurrentPage(1)}
                    className="px-4 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs rounded-lg transition-colors cursor-pointer"
                  >
                    Search
                  </button>

                  {(zoneFilter !== 'All Zones' || joinerFilter !== 'All Joiners' || statusFilter !== 'All Status' || searchTerm !== '') && (
                    <button
                      onClick={() => {
                        setZoneFilter('All Zones');
                        setJoinerFilter('All Joiners');
                        setStatusFilter('All Status');
                        setSearchTerm('');
                        setCurrentPage(1);
                      }}
                      className="text-xs text-slate-500 hover:text-slate-800 underline font-medium"
                    >
                      Reset
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-2 relative">
                  {/* Date Range Button */}
                  <button
                    onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
                    className="text-xs border border-slate-200 bg-slate-50 hover:bg-slate-100 rounded-lg px-3 py-1.5 text-slate-700 font-medium flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>📅 {dateRange}</span>
                  </button>

                  {/* Date Picker Popover */}
                  {isDatePickerOpen && (
                    <div className="absolute right-0 top-10 z-30 bg-white border border-slate-200 rounded-xl shadow-xl p-3 w-64 space-y-2 text-xs">
                      <p className="font-bold text-slate-800">Select Date Preset</p>
                      {[
                        '11 Sep 2026 - 11 Sep 2026',
                        '01 Sep 2026 - 11 Sep 2026',
                        'Last 7 Days (04-11 Sep 2026)',
                        'All Time / Lifetime'
                      ].map(range => (
                        <button
                          key={range}
                          onClick={() => {
                            setDateRange(range);
                            setIsDatePickerOpen(false);
                            showToast(`Filtered for: ${range}`);
                          }}
                          className={`w-full text-left px-2.5 py-1.5 rounded-lg font-medium transition-colors ${
                            dateRange === range ? 'bg-emerald-50 text-emerald-800 font-bold' : 'hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          {range}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Export Button */}
                  <button
                    onClick={handleExportCSV}
                    className="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" /> Export
                  </button>
                </div>
              </div>

              {/* Bulk Action Banner */}
              {selectedIds.length > 0 && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-2.5 flex items-center justify-between text-xs animate-in fade-in">
                  <span className="font-bold text-emerald-900">
                    {selectedIds.length} joiner(s) selected
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleBulkPay}
                      className="px-3 py-1 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-lg shadow-2xs"
                    >
                      Bulk Pay Commission
                    </button>
                    <button
                      onClick={() => setSelectedIds([])}
                      className="px-2.5 py-1 bg-white border border-slate-200 text-slate-700 font-medium rounded-lg"
                    >
                      Deselect
                    </button>
                  </div>
                </div>
              )}

              {/* Table Title */}
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-sm text-slate-800">
                  Joiner Commission List ({filteredList.length})
                </h4>
                <span className="text-[11px] text-slate-500">
                  Rate: <strong className="text-emerald-700">₹100</strong> per delivered order
                </span>
              </div>

              {/* Commission List Table */}
              <div className="overflow-x-auto border border-slate-100 rounded-xl">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold select-none">
                      <th className="py-2.5 px-3">
                        <input
                          type="checkbox"
                          checked={selectedIds.length > 0 && selectedIds.length === paginatedList.length}
                          onChange={handleSelectAll}
                          className="rounded text-emerald-600 focus:ring-emerald-500"
                        />
                      </th>
                      <th className="py-2.5 px-2">#</th>
                      <th className="py-2.5 px-3">Joiner Name</th>
                      <th className="py-2.5 px-3">Mobile</th>
                      <th className="py-2.5 px-3">Zone</th>
                      <th className="py-2.5 px-2 text-center">Total Orders</th>
                      <th className="py-2.5 px-2 text-center">Delivered Orders</th>
                      <th className="py-2.5 px-3 text-right">Commission (₹100/order)</th>
                      <th className="py-2.5 px-3 text-center">Status</th>
                      <th className="py-2.5 px-3 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {paginatedList.length > 0 ? (
                      paginatedList.map(j => {
                        const isSelected = selectedJoinerId === j.id;
                        const isChecked = selectedIds.includes(j.id);
                        return (
                          <tr
                            key={j.id}
                            onClick={() => setSelectedJoinerId(j.id)}
                            className={`cursor-pointer transition-colors ${
                              isSelected
                                ? 'bg-emerald-50/80 border-l-4 border-l-emerald-600 font-medium'
                                : isChecked
                                ? 'bg-emerald-50/30'
                                : 'hover:bg-slate-50/80'
                            }`}
                          >
                            <td className="py-2.5 px-3" onClick={(e) => e.stopPropagation()}>
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => handleToggleRow(j.id)}
                                className="rounded text-emerald-600 focus:ring-emerald-500"
                              />
                            </td>
                            <td className="py-2.5 px-2 font-medium text-slate-500">{j.id}</td>
                            <td className="py-2.5 px-3">
                              <div className="flex items-center gap-2">
                                <img
                                  src={j.avatar}
                                  alt={j.name}
                                  className="w-7 h-7 rounded-full object-cover border border-slate-200"
                                />
                                <span className="font-bold text-slate-800 hover:text-emerald-700">
                                  {j.name}
                                </span>
                              </div>
                            </td>
                            <td className="py-2.5 px-3 text-slate-600 font-mono text-[11px]">{j.mobile}</td>
                            <td className="py-2.5 px-3 text-slate-700 font-medium">{j.zone}</td>
                            <td className="py-2.5 px-2 text-center font-bold text-slate-800">{j.totalOrders}</td>
                            <td className="py-2.5 px-2 text-center font-bold text-slate-800">{j.deliveredOrders}</td>
                            <td className="py-2.5 px-3 text-right font-bold text-slate-900">
                              ₹{j.commission.toLocaleString('en-IN')}
                            </td>
                            <td className="py-2.5 px-3 text-center">
                              <span
                                className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] inline-block ${
                                  j.status === 'Paid'
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : 'bg-amber-100 text-amber-800'
                                }`}
                              >
                                {j.status}
                              </span>
                            </td>
                            <td className="py-2.5 px-3 text-center">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedJoinerId(j.id);
                                }}
                                title="View Details"
                                className="p-1 rounded text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={10} className="py-10 text-center text-slate-400 font-medium">
                          No joiners match the selected filters.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination Bar */}
              <div className="flex items-center justify-between pt-2 text-xs text-slate-500 select-none">
                <span>
                  Showing {filteredList.length > 0 ? startIndex : 0} to {endIndex} of {filteredList.length} joiners
                </span>
                <div className="flex items-center gap-1">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    className="p-1 rounded border border-slate-200 disabled:opacity-30 hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`min-w-6 h-6 px-2 rounded text-xs font-bold transition-all cursor-pointer ${
                        currentPage === page
                          ? 'bg-emerald-700 text-white shadow-2xs'
                          : 'border border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    className="p-1 rounded border border-slate-200 disabled:opacity-30 hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </>
          )}

          {/* TAB 2: JOINER WALLETS */}
          {activeTab === 'Joiner Wallets' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-sm text-slate-800">Joiner Digital Wallets</h4>
                <p className="text-xs text-slate-500">Live ledger balance available for instant withdrawal</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {commissionList.slice(0, 10).map(j => (
                  <div
                    key={j.id}
                    onClick={() => setSelectedJoinerId(j.id)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                      selectedJoinerId === j.id
                        ? 'border-emerald-500 bg-emerald-50/40 shadow-xs'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                      <div className="flex items-center gap-2">
                        <img src={j.avatar} alt={j.name} className="w-8 h-8 rounded-full object-cover" />
                        <div>
                          <p className="font-bold text-slate-800">{j.name}</p>
                          <p className="text-[10px] text-slate-500">{j.zone} Zone • {j.mobile}</p>
                        </div>
                      </div>
                      <span className="font-mono text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                        ₹{j.walletBalance.toLocaleString('en-IN')}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-1 pt-2 text-[10px] text-center">
                      <div>
                        <span className="text-slate-400 block">Total Earned</span>
                        <strong className="text-slate-700">₹{j.commission.toLocaleString('en-IN')}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Paid</span>
                        <strong className="text-emerald-700">₹{j.paidAmount.toLocaleString('en-IN')}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Pending</span>
                        <strong className="text-amber-700">₹{j.pendingAmount.toLocaleString('en-IN')}</strong>
                      </div>
                    </div>

                    <div className="pt-2.5 flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedJoinerId(j.id);
                          setIsPayoutModalOpen(true);
                        }}
                        className="flex-1 py-1 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-[11px] rounded-lg shadow-2xs"
                      >
                        Payout
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedJoinerId(j.id);
                          setIsHistoryModalOpen(true);
                        }}
                        className="py-1 px-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-[11px] rounded-lg"
                      >
                        Ledger
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: PAYMENT HISTORY */}
          {activeTab === 'Payment History' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-sm text-slate-800">Disbursement & Payment History</h4>
                <button
                  onClick={handleExportCSV}
                  className="px-3 py-1 bg-emerald-700 text-white text-xs font-semibold rounded-lg flex items-center gap-1"
                >
                  <Download className="w-3.5 h-3.5" /> Export All
                </button>
              </div>

              <div className="overflow-x-auto border border-slate-100 rounded-xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 font-semibold text-slate-600">
                    <tr>
                      <th className="py-2 px-3">Date & Time</th>
                      <th className="py-2 px-3">Joiner Name</th>
                      <th className="py-2 px-3">Zone</th>
                      <th className="py-2 px-3">Payment Mode</th>
                      <th className="py-2 px-3">UTR / Ref</th>
                      <th className="py-2 px-3 text-right">Amount</th>
                      <th className="py-2 px-3 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {paymentHistory.map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-50">
                        <td className="py-2 px-3 text-slate-600">{item.date}</td>
                        <td className="py-2 px-3 font-bold text-slate-800">{item.joinerName}</td>
                        <td className="py-2 px-3 text-slate-600">{item.zone}</td>
                        <td className="py-2 px-3 font-medium text-slate-700">{item.mode}</td>
                        <td className="py-2 px-3 font-mono text-[11px] text-slate-500">{item.utr}</td>
                        <td className="py-2 px-3 text-right font-bold text-emerald-800">
                          ₹{item.amount.toLocaleString('en-IN')}
                        </td>
                        <td className="py-2 px-3 text-center">
                          <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: PAYOUT REQUESTS */}
          {activeTab === 'Payout Requests' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-slate-800">Joiner Payout Requests</h4>
                  <p className="text-xs text-slate-500">Withdrawal requests requested directly by hotel joiners</p>
                </div>
              </div>

              <div className="overflow-x-auto border border-slate-100 rounded-xl">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 font-semibold text-slate-600">
                    <tr>
                      <th className="py-2 px-3">Req ID</th>
                      <th className="py-2 px-3">Joiner</th>
                      <th className="py-2 px-3">Zone</th>
                      <th className="py-2 px-3">Requested Date</th>
                      <th className="py-2 px-3">Transfer Details</th>
                      <th className="py-2 px-3 text-right">Amount</th>
                      <th className="py-2 px-3 text-center">Status</th>
                      <th className="py-2 px-3 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {payoutRequests.map((req) => (
                      <tr key={req.id} className="hover:bg-slate-50">
                        <td className="py-2 px-3 font-mono font-bold text-slate-700">{req.id}</td>
                        <td className="py-2 px-3 font-bold text-slate-800">{req.joinerName}</td>
                        <td className="py-2 px-3 text-slate-600">{req.zone}</td>
                        <td className="py-2 px-3 text-slate-500">{req.requestDate}</td>
                        <td className="py-2 px-3 font-mono text-[11px] text-slate-600">
                          {req.paymentMethod} • {req.upiOrAccount}
                        </td>
                        <td className="py-2 px-3 text-right font-extrabold text-slate-900">
                          ₹{req.amount.toLocaleString('en-IN')}
                        </td>
                        <td className="py-2 px-3 text-center">
                          <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                            req.status === 'Approved'
                              ? 'bg-emerald-100 text-emerald-800'
                              : req.status === 'Pending'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}>
                            {req.status}
                          </span>
                        </td>
                        <td className="py-2 px-3 text-center">
                          {req.status === 'Pending' ? (
                            <div className="flex items-center justify-center gap-1.5">
                              <button
                                onClick={() => handleApprovePayout(req)}
                                className="px-2 py-0.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded text-[10px]"
                              >
                                Approve & Pay
                              </button>
                              <button
                                onClick={() => handleRejectPayout(req.id)}
                                className="px-2 py-0.5 bg-slate-100 hover:bg-rose-50 text-rose-700 border border-slate-200 rounded text-[10px] font-bold"
                              >
                                Reject
                              </button>
                            </div>
                          ) : (
                            <span className="text-slate-400 font-medium text-[11px]">Processed</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Selected Joiner Details & Recent Transactions (4 cols) */}
        {/* Sticky so it does not scroll with main panel */}
        <div className="lg:col-span-4 sticky top-4 self-start max-h-[calc(100vh-140px)] overflow-y-auto space-y-4">
          {activeJoiner ? (
            <>
              {/* Joiner Details Card */}
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h3 className="font-bold text-sm text-slate-800">Joiner Details</h3>
                  <button
                    onClick={() => setIsEditModalOpen(true)}
                    className="px-3 py-1 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                  >
                    Edit
                  </button>
                </div>

            {/* Profile banner */}
            <div className="flex items-center gap-3">
              <img
                src={activeJoiner.avatar}
                alt={activeJoiner.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-emerald-600 shadow-2xs"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-base text-slate-800">{activeJoiner.name}</h4>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                    Active
                  </span>
                </div>
                <p className="text-xs text-slate-500">Hotel Joiner</p>
                <p className="text-xs text-slate-600 font-medium flex items-center gap-1 mt-0.5">
                  <Phone className="w-3 h-3 text-slate-400" /> {activeJoiner.mobile}
                </p>
                <p className="text-xs text-slate-600 font-medium flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-slate-400" /> {activeJoiner.zone} Zone
                </p>
              </div>
            </div>

            {/* 4 Stat Badges (2x2 Grid) */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              {/* Total Orders */}
              <div className="bg-sky-50 p-2.5 rounded-lg border border-sky-100 flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-slate-500 font-medium">Total Orders</p>
                  <p className="font-bold text-sky-950 text-base">{activeJoiner.totalOrders}</p>
                </div>
                <span className="text-xl">📦</span>
              </div>

              {/* Delivered Orders */}
              <div className="bg-emerald-50 p-2.5 rounded-lg border border-emerald-100 flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-slate-500 font-medium">Delivered Orders</p>
                  <p className="font-bold text-emerald-950 text-base">{activeJoiner.deliveredOrders}</p>
                </div>
                <span className="text-xl">✅</span>
              </div>

              {/* Total Commission */}
              <div className="bg-amber-50 p-2.5 rounded-lg border border-amber-100 flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-slate-500 font-medium">Total Commission</p>
                  <p className="font-bold text-amber-950 text-base">
                    ₹{activeJoiner.commission.toLocaleString('en-IN')}
                  </p>
                </div>
                <span className="text-xl">💰</span>
              </div>

              {/* Paid Amount */}
              <div className="bg-purple-50 p-2.5 rounded-lg border border-purple-100 flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-slate-500 font-medium">Paid Amount</p>
                  <p className="font-bold text-purple-950 text-base">
                    ₹{activeJoiner.paidAmount.toLocaleString('en-IN')}
                  </p>
                </div>
                <span className="text-xl">💳</span>
              </div>
            </div>

            {/* View Full History Button */}
            <button
              onClick={() => setIsHistoryModalOpen(true)}
              className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <FileText className="w-4 h-4" /> View Full History
            </button>
          </div>

          {/* Recent Commission Transactions */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-slate-800">Recent Commission Transactions</h3>
              <button
                onClick={() => setIsHistoryModalOpen(true)}
                className="text-xs text-blue-600 hover:text-blue-800 font-semibold cursor-pointer"
              >
                View All
              </button>
            </div>

            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-semibold bg-slate-50">
                  <th className="py-1.5 px-2">Date</th>
                  <th className="py-1.5 px-2">Order ID</th>
                  <th className="py-1.5 px-2 text-right">Amount</th>
                  <th className="py-1.5 px-2 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {(activeJoiner.recentTransactions && activeJoiner.recentTransactions.length > 0
                  ? activeJoiner.recentTransactions
                  : [
                      { date: '11 Sep 2026', orderId: 'FB1001', amount: 100, status: 'Paid' as const },
                      { date: '10 Sep 2026', orderId: 'FB1006', amount: 100, status: 'Paid' as const },
                      { date: '09 Sep 2026', orderId: 'FB1010', amount: 100, status: 'Paid' as const },
                      { date: '08 Sep 2026', orderId: 'FB1015', amount: 100, status: 'Pending' as const },
                      { date: '07 Sep 2026', orderId: 'FB1018', amount: 100, status: 'Paid' as const }
                    ]
                ).map((tx, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="py-1.5 px-2 text-slate-600">{tx.date}</td>
                    <td className="py-1.5 px-2 font-bold text-slate-800">{tx.orderId}</td>
                    <td className="py-1.5 px-2 text-right font-bold text-slate-900">₹{tx.amount}</td>
                    <td className="py-1.5 px-2 text-center">
                      <span
                        className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                          tx.status === 'Paid'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Make Commission Payment Button */}
            <button
              onClick={() => setIsPayoutModalOpen(true)}
              className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Send className="w-4 h-4" /> Make Commission Payment
            </button>
          </div>
        </>
      ) : (
        <div className="bg-white p-8 rounded-xl border border-slate-200 text-center text-slate-400 text-xs">
          No joiner selected.
        </div>
      )}
    </div>
  </div>

  {/* Interactive Modals */}
  {activeJoiner && (
    <>
      <MakePayoutModal
        isOpen={isPayoutModalOpen}
        onClose={() => setIsPayoutModalOpen(false)}
        joiner={activeJoiner}
        onPaymentSuccess={handlePaymentSuccess}
      />

      <JoinerCommissionHistoryModal
        isOpen={isHistoryModalOpen}
        onClose={() => setIsHistoryModalOpen(false)}
        joiner={activeJoiner}
      />

      <EditCommissionModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        joiner={activeJoiner}
        onSave={handleEditSave}
      />
    </>
  )}
</div>
);
};
