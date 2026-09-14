import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { Users, UserCheck, UserX, Building2, ShoppingBag, Plus, Search, Eye, Edit, Trash2, Phone, Mail, MapPin, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import type { Joiner } from '../types';
import { JoinerHotelsModal } from '../components/Modals/JoinerHotelsModal';
import { getHotelsForJoiner } from '../data/joinerHotelsData';

export const JoinersPage: React.FC = () => {
  const { joiners, selectedJoiner, setSelectedJoiner, setIsAddJoinerOpen, updateJoiner, deleteJoiner, zones, setActiveTab, setSelectedHotel, hotels, orders, isDatabaseConnected } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedZoneFilter, setSelectedZoneFilter] = useState('All Zones');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('All Status');
  const [currentPage, setCurrentPage] = useState(1);
  const [editingJoiner, setEditingJoiner] = useState<Joiner | null>(null);
  const [isHotelsListModalOpen, setIsHotelsListModalOpen] = useState(false);

  const filteredJoiners = joiners.filter(j => {
    const matchesSearch = j.name.toLowerCase().includes(searchTerm.toLowerCase()) || j.mobile.includes(searchTerm);
    const matchesZone = selectedZoneFilter === 'All Zones' || j.zone === selectedZoneFilter;
    const matchesStatus = selectedStatusFilter === 'All Status' || j.status === selectedStatusFilter;
    return matchesSearch && matchesZone && matchesStatus;
  });

  const activeJoiner = selectedJoiner || filteredJoiners[0] || joiners[0];
  const activeJoinerHotels = useMemo(() => {
    return activeJoiner ? getHotelsForJoiner(activeJoiner) : [];
  }, [activeJoiner]);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredJoiners.length / itemsPerPage) || 1;
  const paginatedJoiners = filteredJoiners.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleDelete = (e: React.MouseEvent, joinerId: number, joinerName: string) => {
    e.stopPropagation();
    if (confirm(`Are you sure you want to delete ${joinerName}?`)) {
      deleteJoiner(joinerId);
    }
  };

  const handleEditClick = (e: React.MouseEvent, joiner: Joiner) => {
    e.stopPropagation();
    setEditingJoiner(joiner);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingJoiner) return;
    updateJoiner(editingJoiner.id, editingJoiner);
    setEditingJoiner(null);
  };

  const handleHotelClick = (hotelName: string) => {
    const found = hotels.find(h => h.name.toLowerCase().includes(hotelName.toLowerCase()));
    if (found) {
      setSelectedHotel(found);
    }
    setActiveTab('Hotels');
  };

  const activeCount = joiners.filter(j => j.status === 'Active').length;
  const inactiveCount = joiners.filter(j => j.status === 'Inactive').length;

  return (
    <div className="p-6 max-w-[1600px] mx-auto space-y-5">
      {/* Header Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 items-center">
        <div className="bg-emerald-50/80 p-3.5 rounded-xl border border-emerald-100 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-slate-500">Total Joiners</p>
            <h3 className="text-xl font-bold text-slate-900 leading-none mt-0.5">{joiners.length}</h3>
          </div>
        </div>

        <div className="bg-emerald-50/80 p-3.5 rounded-xl border border-emerald-100 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-bold">
            <UserCheck className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-slate-500">Active Joiners</p>
            <h3 className="text-xl font-bold text-slate-900 leading-none mt-0.5">{activeCount}</h3>
          </div>
        </div>

        <div className="bg-rose-50/80 p-3.5 rounded-xl border border-rose-100 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-500 text-white flex items-center justify-center font-bold">
            <UserX className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-slate-500">Inactive Joiners</p>
            <h3 className="text-xl font-bold text-slate-900 leading-none mt-0.5">{inactiveCount}</h3>
          </div>
        </div>

        <div className="bg-sky-50/80 p-3.5 rounded-xl border border-sky-100 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sky-600 text-white flex items-center justify-center font-bold">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-slate-500">Total Hotels (Through Joiners)</p>
            <h3 className="text-xl font-bold text-slate-900 leading-none mt-0.5">
              {isDatabaseConnected ? hotels.length : 555}
            </h3>
          </div>
        </div>

        <div className="bg-amber-50/80 p-3.5 rounded-xl border border-amber-100 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-slate-500">Total Orders</p>
            <h3 className="text-xl font-bold text-slate-900 leading-none mt-0.5">
              {isDatabaseConnected ? orders.length : 1842}
            </h3>
          </div>
        </div>

        <div>
          <button
            onClick={() => setIsAddJoinerOpen(true)}
            className="w-full h-full py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
          >
            <Plus className="w-4 h-4" /> Add New Joiner
          </button>
        </div>
      </div>

      {/* Main Grid: Left Table + Right Joiner Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Hotel Joiners List (7 cols) */}
        <div className="lg:col-span-7 bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h3 className="font-bold text-base text-slate-800">Hotel Joiners List</h3>

            <div className="flex items-center gap-2">
              <div className="relative w-44">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by name or mobile..."
                  value={searchTerm}
                  onChange={e => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-600"
                />
              </div>

              <select
                value={selectedZoneFilter}
                onChange={e => {
                  setSelectedZoneFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5 font-medium text-slate-700 cursor-pointer"
              >
                <option value="All Zones">All Zones</option>
                {zones.map(z => <option key={z.id} value={z.name}>{z.name}</option>)}
              </select>

              <select
                value={selectedStatusFilter}
                onChange={e => {
                  setSelectedStatusFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5 font-medium text-slate-700 cursor-pointer"
              >
                <option value="All Status">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>

              <button className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs rounded-lg shadow-xs cursor-pointer">
                Search
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
                  <th className="py-2.5 px-2">#</th>
                  <th className="py-2.5 px-2">Joiner Name</th>
                  <th className="py-2.5 px-2">Mobile Number</th>
                  <th className="py-2.5 px-2">Zone</th>
                  <th className="py-2.5 px-2 text-center">Total Hotels</th>
                  <th className="py-2.5 px-2 text-center">Total Orders</th>
                  <th className="py-2.5 px-2 text-right">Total Earnings</th>
                  <th className="py-2.5 px-2 text-center">Status</th>
                  <th className="py-2.5 px-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {paginatedJoiners.map((j, idx) => (
                  <tr
                    key={j.id}
                    onClick={() => setSelectedJoiner(j)}
                    className={`cursor-pointer transition-colors ${
                      activeJoiner?.id === j.id ? 'bg-emerald-50/80 font-semibold' : 'hover:bg-slate-50/60'
                    }`}
                  >
                    <td className="py-2.5 px-2 font-medium text-slate-500">{(currentPage - 1) * itemsPerPage + idx + 1}</td>
                    <td className="py-2.5 px-2 font-bold text-slate-800 flex items-center gap-2">
                      <img src={j.avatar} alt={j.name} className="w-6 h-6 rounded-full object-cover" />
                      <span>{j.name}</span>
                    </td>
                    <td className="py-2.5 px-2 text-slate-600">{j.mobile}</td>
                    <td className="py-2.5 px-2 text-slate-700 font-medium">{j.zone}</td>
                    <td className="py-2.5 px-2 text-center font-bold text-slate-800">{j.totalHotels}</td>
                    <td className="py-2.5 px-2 text-center font-bold text-slate-800">{j.totalOrders}</td>
                    <td className="py-2.5 px-2 text-right font-bold text-slate-900">₹{j.totalEarnings.toLocaleString('en-IN')}</td>
                    <td className="py-2.5 px-2 text-center">
                      <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                        j.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                      }`}>
                        {j.status}
                      </span>
                    </td>
                    <td className="py-2.5 px-2 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          onClick={e => {
                            e.stopPropagation();
                            setSelectedJoiner(j);
                          }}
                          className="p-1 text-slate-500 hover:text-blue-600 rounded hover:bg-slate-100 cursor-pointer"
                          title="View Profile"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={e => handleEditClick(e, j)}
                          className="p-1 text-slate-500 hover:text-emerald-700 rounded hover:bg-slate-100 cursor-pointer"
                          title="Edit Joiner"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={e => handleDelete(e, j.id, j.name)}
                          className="p-1 text-slate-500 hover:text-rose-600 rounded hover:bg-slate-100 cursor-pointer"
                          title="Delete Joiner"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between pt-2 text-xs text-slate-500">
            <span>Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredJoiners.length)} of {filteredJoiners.length} joiners</span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="p-1 rounded border border-slate-200 hover:bg-slate-50 disabled:opacity-40 cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-2.5 py-1 rounded text-xs font-bold cursor-pointer ${
                    currentPage === page ? 'bg-emerald-700 text-white' : 'border border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="p-1 rounded border border-slate-200 hover:bg-slate-50 disabled:opacity-40 cursor-pointer"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Selected Joiner Details & Performance Chart (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          {/* Joiner Profile Card */}
          {activeJoiner && (
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <img src={activeJoiner.avatar} alt={activeJoiner.name} className="w-12 h-12 rounded-full object-cover border-2 border-emerald-600" />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-base text-slate-800">{activeJoiner.name}</h3>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        activeJoiner.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                      }`}>
                        {activeJoiner.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">Joiner ID: {activeJoiner.joinerCode} • Joined {activeJoiner.joinedDate}</p>
                  </div>
                </div>
                <button
                  onClick={e => handleEditClick(e, activeJoiner)}
                  className="px-3 py-1.5 bg-emerald-700 text-white text-xs font-semibold rounded-lg hover:bg-emerald-800 cursor-pointer transition-colors"
                >
                  Edit
                </button>
              </div>

              <div className="space-y-1.5 text-xs text-slate-600">
                <p className="flex items-center gap-2"><Phone className="w-3.5 h-3.5 text-slate-400" /> {activeJoiner.mobile}</p>
                <p className="flex items-center gap-2"><Mail className="w-3.5 h-3.5 text-slate-400" /> {activeJoiner.email}</p>
                <p className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-slate-400" /> {activeJoiner.zone} Zone</p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div
                  onClick={() => setIsHotelsListModalOpen(true)}
                  className="bg-sky-50 p-2.5 rounded-lg border border-sky-100 cursor-pointer hover:bg-sky-100/80 transition-colors"
                >
                  <p className="text-[10px] text-slate-400 font-medium">Hotels</p>
                  <p className="font-bold text-sky-900 text-base">{activeJoiner.totalHotels}</p>
                </div>
                <div
                  onClick={() => setIsHotelsListModalOpen(true)}
                  className="bg-purple-50 p-2.5 rounded-lg border border-purple-100 cursor-pointer hover:bg-purple-100/80 transition-colors"
                >
                  <p className="text-[10px] text-slate-400 font-medium">Orders</p>
                  <p className="font-bold text-purple-900 text-base">{activeJoiner.totalOrders}</p>
                </div>
                <div
                  onClick={() => setIsHotelsListModalOpen(true)}
                  className="bg-rose-50 p-2.5 rounded-lg border border-rose-100 cursor-pointer hover:bg-rose-100/80 transition-colors"
                >
                  <p className="text-[10px] text-slate-400 font-medium">Total Earnings</p>
                  <p className="font-bold text-rose-900 text-base">₹{activeJoiner.totalEarnings.toLocaleString('en-IN')}</p>
                </div>
              </div>

              {/* Paid / Pending Breakdown */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-emerald-50 p-2.5 rounded-lg border border-emerald-100 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-slate-400">Paid</p>
                    <p className="font-bold text-emerald-800">₹{activeJoiner.paidAmount.toLocaleString('en-IN')}</p>
                  </div>
                  <span className="text-xl">💳</span>
                </div>
                <div className="bg-amber-50 p-2.5 rounded-lg border border-amber-100 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-slate-400">Pending</p>
                    <p className="font-bold text-amber-800">₹{activeJoiner.pendingAmount.toLocaleString('en-IN')}</p>
                  </div>
                  <span className="text-xl">⏳</span>
                </div>
              </div>

              {/* Assigned Hotels (45) */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-xs text-slate-800">Assigned Hotels ({activeJoiner.totalHotels})</h4>
                  <button
                    onClick={() => setIsHotelsListModalOpen(true)}
                    className="text-[11px] text-blue-600 font-semibold hover:underline cursor-pointer"
                  >
                    View All
                  </button>
                </div>

                <div className="space-y-1.5 text-xs">
                  {activeJoinerHotels.slice(0, 4).map((h, idx) => (
                    <div
                      key={h.id || idx}
                      onClick={() => handleHotelClick(h.name)}
                      className="flex items-center justify-between p-2 bg-slate-50 hover:bg-slate-100 rounded-lg cursor-pointer transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-400">{idx + 1}</span>
                        <span className="font-bold text-slate-800">{h.name}</span>
                        <span className="text-slate-400 text-[11px]">({h.location})</span>
                      </div>
                      <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                        h.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                      }`}>
                        {h.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Joiner Performance Bar Chart */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <h4 className="font-bold text-xs text-slate-800">Joiner Performance (Last 6 Months)</h4>
                <div className="h-32 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={activeJoiner.performanceHistory || [
                      { month: 'Apr', orders: 180 },
                      { month: 'May', orders: 220 },
                      { month: 'Jun', orders: 260 },
                      { month: 'Jul', orders: 300 },
                      { month: 'Aug', orders: 320 },
                      { month: 'Sep', orders: 280 }
                    ]}>
                      <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
                      <Tooltip
                        contentStyle={{ backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '11px' }}
                      />
                      <Bar dataKey="orders" fill="#22c55e" radius={[4, 4, 0, 0]} maxBarSize={24} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Promo Banner */}
      <div className="bg-emerald-700 text-white p-4 rounded-2xl flex items-center justify-between shadow-md">
        <div>
          <h3 className="font-extrabold text-lg">Together We Grow</h3>
          <p className="text-xs text-emerald-100 mt-0.5">Connecting Hotels with Fresh Produce • More Orders Stronger Partnerships A Healthier Tomorrow</p>
        </div>
        <span className="text-3xl">🧺🥬🥕</span>
      </div>

      {/* Edit Joiner Modal */}
      {editingJoiner && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <Edit className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-800">Edit Hotel Joiner</h3>
                  <p className="text-xs text-slate-500">Update joiner profile details and assignment</p>
                </div>
              </div>
              <button
                onClick={() => setEditingJoiner(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="mt-4 space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={editingJoiner.name}
                  onChange={e => setEditingJoiner({ ...editingJoiner, name: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Mobile Number</label>
                  <input
                    type="text"
                    required
                    value={editingJoiner.mobile}
                    onChange={e => setEditingJoiner({ ...editingJoiner, mobile: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Assigned Zone</label>
                  <select
                    value={editingJoiner.zone}
                    onChange={e => setEditingJoiner({ ...editingJoiner, zone: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:outline-none font-medium text-slate-700"
                  >
                    {zones.map(z => (
                      <option key={z.id} value={z.name}>{z.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={editingJoiner.email}
                  onChange={e => setEditingJoiner({ ...editingJoiner, email: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Status</label>
                <select
                  value={editingJoiner.status}
                  onChange={e => setEditingJoiner({ ...editingJoiner, status: e.target.value as 'Active' | 'Inactive' })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:outline-none font-medium text-slate-700"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingJoiner(null)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg font-semibold shadow-xs cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* All Hotels Joined by Joiner Modal */}
      {activeJoiner && (
        <JoinerHotelsModal
          isOpen={isHotelsListModalOpen}
          onClose={() => setIsHotelsListModalOpen(false)}
          joiner={activeJoiner}
        />
      )}
    </div>
  );
};
