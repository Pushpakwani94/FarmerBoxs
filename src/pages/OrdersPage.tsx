import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  FileText,
  Hourglass,
  CheckCircle2,
  Truck,
  Package,
  XCircle,
  Plus,
  Search,
  Eye,
  Download,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Calendar,
  MoreVertical,
  X,
  Phone,
  MapPin,
  RotateCcw,
  Check,
  Building2,
  Clock,
  UserCheck
} from 'lucide-react';
import type { OrderStatus, Order } from '../types';

export const OrdersPage: React.FC = () => {
  const { orders, selectedOrder, setSelectedOrder, zones, joiners, drivers, hotels, setActiveTab, setSelectedHotel, isDatabaseConnected, addOrder } = useApp();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedZone, setSelectedZone] = useState('All Zones');
  const [selectedHotelFilter, setSelectedHotelFilter] = useState('All Hotels');
  const [selectedJoinerFilter, setSelectedJoinerFilter] = useState('All Joiners');
  const [selectedDriverFilter, setSelectedDriverFilter] = useState('All Drivers');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [dateRange, setDateRange] = useState('11 Sep 2026 - 11 Sep 2026');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrderIds, setSelectedOrderIds] = useState<string[]>([]);
  const [showTimeline, setShowTimeline] = useState(false);
  const [isCreateOrderOpen, setIsCreateOrderOpen] = useState(false);
  const [showOrderDetailPanel, setShowOrderDetailPanel] = useState(true);

  // New Order Form state
  const [newHotelName, setNewHotelName] = useState(hotels[0]?.name || 'Hotel Spice Villa');
  const [newPaymentMode, setNewPaymentMode] = useState<'Online' | 'COD'>('Online');
  const [newDriver, setNewDriver] = useState(drivers[0]?.name || 'Suresh');

  const filteredOrders = orders.filter(o => {
    const matchesSearch =
      (o.hotelName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (o.id || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (o.joiner || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesZone = selectedZone === 'All Zones' || o.zone === selectedZone;
    const matchesHotel = selectedHotelFilter === 'All Hotels' || o.hotelName === selectedHotelFilter;
    const matchesJoiner = selectedJoinerFilter === 'All Joiners' || o.joiner === selectedJoinerFilter;
    const matchesDriver = selectedDriverFilter === 'All Drivers' || o.driver === selectedDriverFilter;
    const matchesStatus = statusFilter === 'All Status' || o.status === statusFilter;
    return matchesSearch && matchesZone && matchesHotel && matchesJoiner && matchesDriver && matchesStatus;
  });

  const activeOrder: Order = selectedOrder || filteredOrders[0] || orders[0];

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedOrderIds(filteredOrders.map(o => o.id));
    } else {
      setSelectedOrderIds([]);
    }
  };

  const handleSelectRow = (id: string) => {
    if (selectedOrderIds.includes(id)) {
      setSelectedOrderIds(prev => prev.filter(item => item !== id));
    } else {
      setSelectedOrderIds(prev => [...prev, id]);
    }
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedZone('All Zones');
    setSelectedHotelFilter('All Hotels');
    setSelectedJoinerFilter('All Joiners');
    setSelectedDriverFilter('All Drivers');
    setStatusFilter('All Status');
    setCurrentPage(1);
  };

  const handleExportCSV = () => {
    const headers = ['Order ID', 'Date', 'Time', 'Hotel Name', 'Zone', 'Joiner', 'Amount', 'Payment Mode', 'Driver', 'Status', 'Commission'];
    const rows = filteredOrders.map(o => [
      o.id,
      o.date,
      o.time,
      `"${o.hotelName}"`,
      o.zone,
      `"${o.joiner}"`,
      o.amount,
      o.paymentMode,
      `"${o.driver}"`,
      o.status,
      o.commission
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `FarmerBox_Orders_Report_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadInvoice = () => {
    window.print();
  };

  const handleCreateOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const hotelObj = hotels.find(h => h.name.toLowerCase() === newHotelName.toLowerCase()) || hotels[0];
    const newOrderRecord: Order = {
      id: `#FB${1000 + orders.length + 1}`,
      hotelName: newHotelName || (hotelObj ? hotelObj.name : 'Hotel Guest'),
      hotelImage: hotelObj?.image || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=100',
      zone: hotelObj?.zone || 'Kharadi',
      joiner: hotelObj?.joiner || 'Rahul Sharma',
      amount: 1250,
      status: 'Pending',
      date: 'Today',
      time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      paymentMode: newPaymentMode,
      paymentStatus: newPaymentMode === 'Online' ? 'Paid' : 'Pending',
      driver: newDriver || (drivers[0] ? drivers[0].name : 'Assigned Driver'),
      driverPhone: drivers[0]?.mobile || '9876543210',
      commission: 0,
      deliveryAddress: hotelObj?.address || 'Pune, Maharashtra',
      items: [
        { id: 1, productName: 'Fresh Tomato', qty: 20, unit: 'KG', price: 30, total: 600 },
        { id: 2, productName: 'Red Onion', qty: 15, unit: 'KG', price: 35, total: 525 },
        { id: 3, productName: 'Green Chilli', qty: 2.5, unit: 'KG', price: 50, total: 125 }
      ]
    };
    addOrder(newOrderRecord);
    setIsCreateOrderOpen(false);
  };

  const handleViewHotel = (hotelName: string) => {
    const found = hotels.find(h => h.name.toLowerCase() === hotelName.toLowerCase());
    if (found) {
      setSelectedHotel(found);
    }
    setActiveTab('Hotels');
  };

  const activeHotelObj = hotels.find(h => h.name.toLowerCase() === activeOrder?.hotelName.toLowerCase());
  const hotelImg = activeOrder?.hotelImage || activeHotelObj?.image || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=100';

  const totalOrdersCount = isDatabaseConnected ? orders.length : 1842;
  const pendingOrdersCount = isDatabaseConnected ? orders.filter(o => o.status === 'Pending').length : 48;
  const confirmedOrdersCount = isDatabaseConnected ? orders.filter(o => o.status === 'Confirmed' || o.status === 'Preparing').length : 125;
  const outForDeliveryOrdersCount = isDatabaseConnected ? orders.filter(o => o.status === 'Out for Delivery').length : 68;
  const deliveredOrdersCount = isDatabaseConnected ? orders.filter(o => o.status === 'Delivered').length : 1520;
  const cancelledOrdersCount = isDatabaseConnected ? orders.filter(o => o.status === 'Cancelled').length : 81;

  return (
    <div className="p-5 max-w-[1600px] mx-auto space-y-4">
      {/* 6 Top Metric Cards with Exact Color Scheme & Alignment */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5 items-center">
        
        {/* 1. Total Orders */}
        <div className="bg-emerald-50/70 p-3.5 rounded-xl border border-emerald-100 flex items-center gap-3 shadow-2xs">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0">
            <FileText className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] font-semibold text-slate-500 truncate">Total Orders</p>
            <h3 className="text-xl font-extrabold text-slate-900 leading-none mt-0.5">{totalOrdersCount}</h3>
            <p className="text-[10px] text-emerald-700 font-semibold mt-1">
              {isDatabaseConnected ? `${totalOrdersCount} in database` : '↑ +18% this month'}
            </p>
          </div>
        </div>

        {/* 2. Pending */}
        <div className="bg-amber-50/70 p-3.5 rounded-xl border border-amber-100 flex items-center gap-3 shadow-2xs">
          <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold shrink-0">
            <Hourglass className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] font-semibold text-slate-500 truncate">Pending</p>
            <h3 className="text-xl font-extrabold text-slate-900 leading-none mt-0.5">{pendingOrdersCount}</h3>
            <p className="text-[10px] text-amber-700 font-semibold mt-1">Awaiting dispatch</p>
          </div>
        </div>

        {/* 3. Confirmed */}
        <div className="bg-sky-50/70 p-3.5 rounded-xl border border-sky-100 flex items-center gap-3 shadow-2xs">
          <div className="w-10 h-10 rounded-xl bg-sky-600 text-white flex items-center justify-center font-bold shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] font-semibold text-slate-500 truncate">Confirmed</p>
            <h3 className="text-xl font-extrabold text-slate-900 leading-none mt-0.5">{confirmedOrdersCount}</h3>
            <p className="text-[10px] text-sky-700 font-semibold mt-1">Ready to pack</p>
          </div>
        </div>

        {/* 4. Out for Delivery */}
        <div className="bg-purple-50/70 p-3.5 rounded-xl border border-purple-100 flex items-center gap-3 shadow-2xs">
          <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold shrink-0">
            <Truck className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] font-semibold text-slate-500 truncate">Out for Delivery</p>
            <h3 className="text-xl font-extrabold text-slate-900 leading-none mt-0.5">{outForDeliveryOrdersCount}</h3>
            <p className="text-[10px] text-purple-700 font-semibold mt-1">On the road</p>
          </div>
        </div>

        {/* 5. Delivered */}
        <div className="bg-emerald-50/70 p-3.5 rounded-xl border border-emerald-100 flex items-center gap-3 shadow-2xs">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0">
            <Package className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] font-semibold text-slate-500 truncate">Delivered</p>
            <h3 className="text-xl font-extrabold text-slate-900 leading-none mt-0.5">{deliveredOrdersCount}</h3>
            <p className="text-[10px] text-emerald-700 font-semibold mt-1">Successfully fulfilled</p>
          </div>
        </div>

        {/* 6. Cancelled */}
        <div className="bg-rose-50/70 p-3.5 rounded-xl border border-rose-100 flex items-center gap-3 shadow-2xs">
          <div className="w-10 h-10 rounded-xl bg-rose-500 text-white flex items-center justify-center font-bold shrink-0">
            <XCircle className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] font-semibold text-slate-500 truncate">Cancelled</p>
            <h3 className="text-xl font-extrabold text-slate-900 leading-none mt-0.5">{cancelledOrdersCount}</h3>
            <p className="text-[10px] text-rose-700 font-semibold mt-1">Cancelled orders</p>
          </div>
        </div>
      </div>

      {/* Filter Toolbar Bar with Single-Row Clean Alignment */}
      <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          
          {/* Date Picker Button */}
          <div className="flex items-center gap-1.5 border border-slate-200 bg-slate-50 rounded-lg px-2.5 py-1.5 text-slate-700 font-medium cursor-pointer hover:bg-slate-100 transition-colors">
            <Calendar className="w-3.5 h-3.5 text-slate-500" />
            <span>{dateRange}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </div>

          {/* Zones Dropdown */}
          <div className="relative">
            <select
              value={selectedZone}
              onChange={e => setSelectedZone(e.target.value)}
              className="appearance-none bg-slate-50 border border-slate-200 rounded-lg pl-3 pr-7 py-1.5 font-medium text-slate-700 cursor-pointer focus:outline-none focus:ring-1 focus:ring-emerald-600"
            >
              <option value="All Zones">All Zones</option>
              {zones.map(z => (
                <option key={z.id} value={z.name}>{z.name}</option>
              ))}
            </select>
            <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Hotels Dropdown */}
          <div className="relative">
            <select
              value={selectedHotelFilter}
              onChange={e => setSelectedHotelFilter(e.target.value)}
              className="appearance-none bg-slate-50 border border-slate-200 rounded-lg pl-3 pr-7 py-1.5 font-medium text-slate-700 cursor-pointer focus:outline-none focus:ring-1 focus:ring-emerald-600 max-w-[140px] truncate"
            >
              <option value="All Hotels">All Hotels</option>
              {hotels.map(h => (
                <option key={h.id} value={h.name}>{h.name}</option>
              ))}
            </select>
            <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Joiners Dropdown */}
          <div className="relative">
            <select
              value={selectedJoinerFilter}
              onChange={e => setSelectedJoinerFilter(e.target.value)}
              className="appearance-none bg-slate-50 border border-slate-200 rounded-lg pl-3 pr-7 py-1.5 font-medium text-slate-700 cursor-pointer focus:outline-none focus:ring-1 focus:ring-emerald-600 max-w-[130px] truncate"
            >
              <option value="All Joiners">All Joiners</option>
              {joiners.map(j => (
                <option key={j.id} value={j.name}>{j.name}</option>
              ))}
            </select>
            <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Drivers Dropdown */}
          <div className="relative">
            <select
              value={selectedDriverFilter}
              onChange={e => setSelectedDriverFilter(e.target.value)}
              className="appearance-none bg-slate-50 border border-slate-200 rounded-lg pl-3 pr-7 py-1.5 font-medium text-slate-700 cursor-pointer focus:outline-none focus:ring-1 focus:ring-emerald-600 max-w-[130px] truncate"
            >
              <option value="All Drivers">All Drivers</option>
              {drivers.map(d => (
                <option key={d.id} value={d.name}>{d.name}</option>
              ))}
            </select>
            <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Status Dropdown */}
          <div className="relative">
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="appearance-none bg-slate-50 border border-slate-200 rounded-lg pl-3 pr-7 py-1.5 font-medium text-slate-700 cursor-pointer focus:outline-none focus:ring-1 focus:ring-emerald-600"
            >
              <option value="All Status">All Status</option>
              <option value="Delivered">Delivered</option>
              <option value="Out for Delivery">Out for Delivery</option>
              <option value="Preparing">Preparing</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Pending">Pending</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Search Button */}
          <button
            onClick={() => setCurrentPage(1)}
            className="px-4 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded-lg shadow-2xs cursor-pointer transition-colors"
          >
            Search
          </button>

          {/* Reset Button */}
          <button
            onClick={handleResetFilters}
            className="px-3 py-1.5 text-slate-600 hover:text-slate-900 font-medium cursor-pointer transition-colors"
          >
            Reset
          </button>
        </div>

        {/* Right Action: Create Order */}
        <button
          onClick={() => setIsCreateOrderOpen(true)}
          className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" /> Create Order
        </button>
      </div>

      {/* Main Grid: Left Orders List (7 or 12 cols) + Right Selected Order Drawer (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        
        {/* Left Column: Orders List Table */}
        <div className={`${showOrderDetailPanel ? 'lg:col-span-7' : 'lg:col-span-12'} bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4 transition-all duration-200`}>
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-slate-800">
              Orders List (1,842)
            </h3>
            <button
              onClick={handleExportCSV}
              className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-lg flex items-center gap-1.5 shadow-2xs cursor-pointer transition-colors"
              title="Export Orders CSV"
            >
              <Download className="w-3.5 h-3.5 text-emerald-700" />
              <span>Export</span>
            </button>
          </div>

          {/* Orders Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[11px]">
              <thead>
                <tr className="bg-slate-50/90 border-b border-slate-200 text-slate-500 font-semibold">
                  <th className="py-2.5 px-1.5 w-6 text-center">
                    <input
                      type="checkbox"
                      checked={selectedOrderIds.length === filteredOrders.length && filteredOrders.length > 0}
                      onChange={handleSelectAll}
                      className="rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                    />
                  </th>
                  <th className="py-2.5 px-1.5 w-6 text-center">#</th>
                  <th className="py-2.5 px-1.5">Order ID</th>
                  <th className="py-2.5 px-1.5">Date & Time</th>
                  <th className="py-2.5 px-2">Hotel Name</th>
                  <th className="py-2.5 px-1.5">Zone</th>
                  <th className="py-2.5 px-1.5">Joiner</th>
                  <th className="py-2.5 px-1.5 text-right">Amount</th>
                  <th className="py-2.5 px-1.5 text-center">Payment</th>
                  <th className="py-2.5 px-1.5">Driver</th>
                  <th className="py-2.5 px-1.5 text-center">Status</th>
                  <th className="py-2.5 px-1.5 text-right">Commission</th>
                  <th className="py-2.5 px-1.5 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={13} className="py-8 text-center text-slate-400">
                      No matching orders found.
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((ord, idx) => (
                    <tr
                      key={ord.id}
                      onClick={() => {
                        setSelectedOrder(ord);
                        setShowOrderDetailPanel(true);
                      }}
                      className={`cursor-pointer transition-colors ${
                        activeOrder?.id === ord.id ? 'bg-emerald-50/70 font-medium' : 'hover:bg-slate-50/70'
                      }`}
                    >
                      <td className="py-2 px-1.5 text-center" onClick={e => e.stopPropagation()}>
                        <input
                          type="checkbox"
                          checked={selectedOrderIds.includes(ord.id)}
                          onChange={() => handleSelectRow(ord.id)}
                          className="rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                        />
                      </td>
                      <td className="py-2 px-1.5 text-center font-medium text-slate-400">{idx + 1}</td>
                      <td className="py-2 px-1.5 font-semibold text-sky-600 hover:underline whitespace-nowrap">
                        {ord.id}
                      </td>
                      <td className="py-2 px-1.5 text-slate-600 whitespace-nowrap">
                        <div>{ord.date}</div>
                        <div className="text-[10px] text-slate-400">{ord.time}</div>
                      </td>
                      <td className="py-2 px-2">
                        <div className="flex items-center gap-1.5 min-w-[120px]">
                          <img
                            src={ord.hotelImage || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=100'}
                            alt={ord.hotelName}
                            className="w-5 h-5 rounded-md object-cover shrink-0"
                          />
                          <span className="font-bold text-slate-800 truncate">{ord.hotelName}</span>
                        </div>
                      </td>
                      <td className="py-2 px-1.5 text-slate-600 whitespace-nowrap">{ord.zone}</td>
                      <td className="py-2 px-1.5 text-slate-700 whitespace-nowrap font-medium">{ord.joiner}</td>
                      <td className="py-2 px-1.5 text-right font-bold text-slate-900 whitespace-nowrap">
                        ₹{ord.amount.toLocaleString('en-IN')}
                      </td>
                      <td className="py-2 px-1.5 text-center whitespace-nowrap">
                        <span className={`px-1.5 py-0.5 rounded font-bold text-[10px] ${
                          ord.paymentMode === 'Online'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          {ord.paymentMode}
                        </span>
                      </td>
                      <td className="py-2 px-1.5 text-slate-600 whitespace-nowrap">{ord.driver}</td>
                      <td className="py-2 px-1.5 text-center whitespace-nowrap">
                        <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                          ord.status === 'Delivered' ? 'bg-emerald-100 text-emerald-800' :
                          ord.status === 'Out for Delivery' ? 'bg-sky-100 text-sky-800' :
                          ord.status === 'Preparing' ? 'bg-amber-100 text-amber-800' :
                          ord.status === 'Confirmed' ? 'bg-blue-100 text-blue-800' :
                          'bg-rose-100 text-rose-800'
                        }`}>
                          {ord.status}
                        </span>
                      </td>
                      <td className="py-2 px-1.5 text-right font-semibold text-slate-700 whitespace-nowrap">
                        {ord.commission > 0 ? `₹${ord.commission}` : '-'}
                      </td>
                      <td className="py-2 px-1.5 text-center" onClick={e => e.stopPropagation()}>
                        <div className="flex items-center justify-center gap-1">
                          <button
                            onClick={() => {
                              setSelectedOrder(ord);
                              setShowOrderDetailPanel(true);
                            }}
                            className="p-1 text-slate-400 hover:text-sky-600 rounded hover:bg-slate-100 cursor-pointer"
                            title="View Order Details"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              setSelectedOrder(ord);
                              setShowOrderDetailPanel(true);
                            }}
                            className="p-1 text-slate-400 hover:text-slate-700 rounded hover:bg-slate-100 cursor-pointer"
                            title="More Actions"
                          >
                            <MoreVertical className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between pt-2 text-xs text-slate-500 gap-3">
            <span>Showing 1 to 10 of 1,842 orders</span>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  className="p-1 rounded border border-slate-200 hover:bg-slate-50 disabled:opacity-40 cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                {[1, 2, 3, 4, 5].map(p => (
                  <button
                    key={p}
                    onClick={() => setCurrentPage(p)}
                    className={`w-6 h-6 rounded flex items-center justify-center font-bold text-xs cursor-pointer ${
                      currentPage === p
                        ? 'bg-emerald-700 text-white'
                        : 'border border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {p}
                  </button>
                ))}
                <span className="px-1 text-slate-400">...</span>
                <button
                  onClick={() => setCurrentPage(185)}
                  className="px-2 h-6 rounded border border-slate-200 text-slate-700 hover:bg-slate-50 font-medium text-xs cursor-pointer"
                >
                  185
                </button>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(185, prev + 1))}
                  className="p-1 rounded border border-slate-200 hover:bg-slate-50 cursor-pointer"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <select className="bg-slate-50 border border-slate-200 rounded px-2 py-1 text-xs text-slate-600 font-medium cursor-pointer">
                <option>10 / page</option>
                <option>25 / page</option>
                <option>50 / page</option>
              </select>
            </div>
          </div>
        </div>

        {/* Right Column: Selected Order Details Drawer / Card (5 cols) */}
        {showOrderDetailPanel && activeOrder && (
          <div className="lg:col-span-5 bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
            
            {/* Header */}
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div>
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Order Details</p>
                <h3 className="font-extrabold text-xl text-slate-900 mt-0.5">{activeOrder.id}</h3>
              </div>
              <div className="text-right">
                <div className="flex items-center justify-end gap-2">
                  <span className={`px-2.5 py-0.5 rounded-full font-bold text-xs ${
                    activeOrder.status === 'Delivered' ? 'bg-emerald-100 text-emerald-800' :
                    activeOrder.status === 'Out for Delivery' ? 'bg-sky-100 text-sky-800' :
                    activeOrder.status === 'Preparing' ? 'bg-amber-100 text-amber-800' :
                    activeOrder.status === 'Confirmed' ? 'bg-blue-100 text-blue-800' :
                    'bg-rose-100 text-rose-800'
                  }`}>
                    {activeOrder.status}
                  </span>
                  <button
                    onClick={() => setShowOrderDetailPanel(false)}
                    className="text-slate-400 hover:text-slate-600 p-0.5 rounded hover:bg-slate-100 cursor-pointer"
                    title="Close Details Panel"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">{activeOrder.date} 2026, {activeOrder.time}</p>
              </div>
            </div>

            {/* Hotel Info Box */}
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/80 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={hotelImg}
                  alt={activeOrder.hotelName}
                  className="w-12 h-12 rounded-lg object-cover border border-slate-200"
                />
                <div>
                  <h4
                    onClick={() => handleViewHotel(activeOrder.hotelName)}
                    className="font-bold text-sm text-slate-900 hover:text-emerald-700 cursor-pointer transition-colors"
                  >
                    {activeOrder.hotelName}
                  </h4>
                  <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                    <Phone className="w-3 h-3 text-slate-400" />
                    <span>{activeOrder.hotelPhone || '9876543210'}</span>
                  </p>
                  <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-slate-400" />
                    <span>{activeOrder.zone}, Pune</span>
                  </p>
                </div>
              </div>

              {/* Joiner Column */}
              <div className="flex items-center gap-2 text-right">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100"
                  alt={activeOrder.joiner}
                  className="w-8 h-8 rounded-full object-cover border border-emerald-600"
                />
                <div className="text-left">
                  <p className="font-bold text-xs text-slate-900">{activeOrder.joiner}</p>
                  <p className="text-[10px] text-slate-400">Hotel Joiner</p>
                </div>
              </div>
            </div>

            {/* Order Items Section */}
            <div className="space-y-2">
              <h4 className="font-bold text-xs text-slate-800">Order Items</h4>
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 font-semibold">
                    <th className="py-1 px-1">#</th>
                    <th className="py-1 px-1">Product</th>
                    <th className="py-1 px-1 text-center">Qty</th>
                    <th className="py-1 px-1 text-center">Unit</th>
                    <th className="py-1 px-1 text-right">Price</th>
                    <th className="py-1 px-1 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {(activeOrder.items || [
                    { id: 1, productName: 'Tomato', qty: 50, unit: 'KG', price: 40, total: 2000 },
                    { id: 2, productName: 'Onion', qty: 20, unit: 'KG', price: 30, total: 600 },
                    { id: 3, productName: 'Potato', qty: 30, unit: 'KG', price: 25, total: 750 },
                    { id: 4, productName: 'Green Chili', qty: 10, unit: 'KG', price: 50, total: 500 }
                  ]).map(item => (
                    <tr key={item.id} className="hover:bg-slate-50/60">
                      <td className="py-1.5 px-1 text-slate-400">{item.id}</td>
                      <td className="py-1.5 px-1 font-semibold text-slate-800">{item.productName}</td>
                      <td className="py-1.5 px-1 text-center text-slate-700">{item.qty}</td>
                      <td className="py-1.5 px-1 text-center text-slate-500">{item.unit}</td>
                      <td className="py-1.5 px-1 text-right text-slate-700">₹{item.price}</td>
                      <td className="py-1.5 px-1 text-right font-bold text-slate-900">₹{item.total.toLocaleString('en-IN')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Price Calculations */}
              <div className="pt-2 border-t border-slate-100 text-xs space-y-1.5">
                <div className="flex justify-between text-slate-500">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-700">₹{activeOrder.subtotal || 3850}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Delivery Charge</span>
                  <span className="font-semibold text-slate-700">₹{activeOrder.deliveryCharge || 0}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Discount</span>
                  <span className="font-semibold text-rose-600">- ₹{activeOrder.discount || 350}</span>
                </div>
                
                {/* Total Amount Green Highlight Banner */}
                <div className="flex justify-between items-center bg-emerald-50 text-emerald-900 font-extrabold text-sm py-2 px-3 rounded-lg border border-emerald-100">
                  <span>Total Amount</span>
                  <span className="text-base text-emerald-800">₹{activeOrder.amount.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            {/* Payment Information Box */}
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-xs text-slate-800">Payment Information</h4>
                <div className="flex items-center gap-1.5">
                  <span className="text-sky-700 font-semibold text-[11px]">
                    {activeOrder.paymentMode} ({activeOrder.paymentMode === 'Online' ? 'Razorpay' : 'COD'})
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px] flex items-center gap-0.5">
                    <Check className="w-3 h-3" /> Paid
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-500 bg-slate-50 p-2 rounded-lg">
                <span>Transaction ID</span>
                <span className="font-mono text-slate-700">{activeOrder.transactionId || 'pay_N7d9K2h8L1'}</span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-500 bg-slate-50 p-2 rounded-lg">
                <span>Payment Date</span>
                <span className="text-slate-700">{activeOrder.date} 2026, 10:25 AM</span>
              </div>
            </div>

            {/* Delivery Information Box */}
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-xs text-slate-800">Delivery Information</h4>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
                    {activeOrder.driver ? activeOrder.driver.charAt(0) : 'S'}
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 text-xs">{activeOrder.driver || 'Suresh Kumar'}</p>
                    <p className="text-[10px] text-slate-400">{activeOrder.driverPhone || '9876123456'}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-emerald-700 flex items-center justify-end gap-1">
                    <Truck className="w-3.5 h-3.5" /> Delivered
                  </p>
                  <p className="text-[10px] text-slate-400">11 Sep 2026, 12:10 PM</p>
                </div>
              </div>
            </div>

            {/* Joiner Commission Box */}
            <div className="bg-amber-50/60 p-3 rounded-xl border border-amber-100/80 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="text-xl">🤝</span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-slate-900 text-base">₹100</span>
                    <span className="px-2 py-0.2 bg-emerald-100 text-emerald-800 font-bold text-[10px] rounded-full">
                      Credited
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Commission credited to {activeOrder.joiner}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons: View Timeline & Download Invoice */}
            <div className="pt-2 grid grid-cols-2 gap-3">
              <button
                onClick={() => setShowTimeline(prev => !prev)}
                className="py-2.5 bg-white hover:bg-emerald-50 border border-emerald-600 text-emerald-700 font-bold text-xs rounded-xl shadow-2xs cursor-pointer transition-colors"
              >
                {showTimeline ? 'Hide Timeline' : 'View Timeline'}
              </button>
              <button
                onClick={handleDownloadInvoice}
                className="py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer transition-colors"
              >
                <Download className="w-4 h-4" /> Download Invoice
              </button>
            </div>

            {/* Expandable Order Timeline */}
            {showTimeline && (
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2 animate-in fade-in duration-200">
                <h5 className="font-bold text-slate-800 mb-2">Order Tracking Timeline</h5>
                <div className="relative pl-5 border-l-2 border-emerald-600 space-y-3">
                  <div>
                    <span className="absolute -left-1.5 top-0 w-3 h-3 bg-emerald-600 rounded-full"></span>
                    <p className="font-bold text-slate-800">Delivered Successfully</p>
                    <p className="text-[11px] text-slate-400">11 Sep 2026, 12:10 PM • By {activeOrder.driver}</p>
                  </div>
                  <div>
                    <span className="absolute -left-1.5 top-8 w-3 h-3 bg-emerald-600 rounded-full"></span>
                    <p className="font-bold text-slate-800">Out for Delivery</p>
                    <p className="text-[11px] text-slate-400">11 Sep 2026, 10:45 AM • Loaded into vehicle</p>
                  </div>
                  <div>
                    <span className="absolute -left-1.5 top-16 w-3 h-3 bg-emerald-600 rounded-full"></span>
                    <p className="font-bold text-slate-800">Order Confirmed & Packed</p>
                    <p className="text-[11px] text-slate-400">11 Sep 2026, 10:24 AM • Verified fresh produce</p>
                  </div>
                </div>
              </div>
            )}

          </div>
        )}

      </div>

      {/* Create Order Modal */}
      {isCreateOrderOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                  <Plus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-800">Create New Order</h3>
                  <p className="text-xs text-slate-500">Generate fresh vegetable order for hotel</p>
                </div>
              </div>
              <button
                onClick={() => setIsCreateOrderOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateOrderSubmit} className="mt-4 space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Select Hotel Partner *</label>
                <select
                  value={newHotelName}
                  onChange={e => setNewHotelName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:outline-none font-medium text-slate-700"
                >
                  {hotels.map(h => (
                    <option key={h.id} value={h.name}>{h.name} ({h.zone})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Payment Mode</label>
                  <select
                    value={newPaymentMode}
                    onChange={e => setNewPaymentMode(e.target.value as any)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:outline-none font-medium text-slate-700"
                  >
                    <option value="Online">Online (Razorpay)</option>
                    <option value="COD">Cash on Delivery (COD)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Assign Driver</label>
                  <select
                    value={newDriver}
                    onChange={e => setNewDriver(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:outline-none font-medium text-slate-700"
                  >
                    {drivers.map(d => (
                      <option key={d.id} value={d.name}>{d.name} ({d.zone})</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-100 text-emerald-800 font-medium">
                🥬 <strong>Fresh Stock Guarantee:</strong> Produce sourced directly from partnered farms at 04:00 AM daily.
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsCreateOrderOpen(false)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg font-semibold shadow-xs cursor-pointer"
                >
                  Confirm Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
