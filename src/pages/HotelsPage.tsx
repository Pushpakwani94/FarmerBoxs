import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import type { Hotel } from '../types';
import {
  Building2,
  UserCheck,
  UserX,
  MapPin,
  Users,
  Plus,
  Search,
  Eye,
  Edit,
  Trash2,
  Phone,
  Star,
  Download,
  ChevronLeft,
  ChevronRight,
  X,
  CheckCircle2,
  Shield
} from 'lucide-react';

export const HotelsPage: React.FC = () => {
  const {
    hotels,
    selectedHotel,
    setSelectedHotel,
    setIsAddHotelOpen,
    zones,
    joiners,
    isDatabaseConnected,
    deleteHotel,
    updateHotel,
    setActiveTab
  } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedZone, setSelectedZone] = useState('All Zones');
  const [selectedJoiner, setSelectedJoiner] = useState('All Joiners');
  const [selectedTab, setSelectedTab] = useState<'Order History' | 'Payment History' | 'Hotel Info' | 'Documents'>('Order History');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Edit Hotel modal state
  const [editingHotel, setEditingHotel] = useState<Hotel | null>(null);
  const [editForm, setEditForm] = useState({
    name: '',
    ownerName: '',
    mobile: '',
    zone: '',
    joiner: '',
    address: '',
    status: 'Active' as 'Active' | 'Inactive'
  });

  const filteredHotels = hotels.filter(h => {
    const nameMatch = (h.name || '').toLowerCase().includes(searchTerm.toLowerCase());
    const ownerMatch = (h.ownerName || '').toLowerCase().includes(searchTerm.toLowerCase());
    const zoneMatch = (h.zone || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSearch = nameMatch || ownerMatch || zoneMatch;

    const matchesZone = selectedZone === 'All Zones' || h.zone === selectedZone;
    const matchesJoiner = selectedJoiner === 'All Joiners' || h.joiner === selectedJoiner;

    return matchesSearch && matchesZone && matchesJoiner;
  });

  const totalPages = Math.max(1, Math.ceil(filteredHotels.length / itemsPerPage));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const paginatedHotels = filteredHotels.slice((safeCurrentPage - 1) * itemsPerPage, safeCurrentPage * itemsPerPage);

  const activeHotel: Hotel | null =
    selectedHotel && hotels.some(h => String(h.id) === String(selectedHotel.id))
      ? selectedHotel
      : filteredHotels[0] || hotels[0] || null;

  const totalHotelsCount = isDatabaseConnected ? hotels.length : 555;
  const activeHotelsCount = isDatabaseConnected ? hotels.filter(h => h.status === 'Active').length : 520;
  const inactiveHotelsCount = isDatabaseConnected ? hotels.filter(h => h.status !== 'Active').length : 35;
  const zonesCount = isDatabaseConnected ? zones.length : 12;
  const joinersCount = isDatabaseConnected ? joiners.length : 26;

  const handleOpenEdit = (h: Hotel) => {
    setEditingHotel(h);
    setEditForm({
      name: h.name || '',
      ownerName: h.ownerName || '',
      mobile: h.mobile || '',
      zone: h.zone || (zones[0]?.name || 'Kharadi'),
      joiner: h.joiner || (joiners[0]?.name || ''),
      address: h.address || '',
      status: h.status === 'Active' ? 'Active' : 'Inactive'
    });
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingHotel) return;
    updateHotel(editingHotel.id, {
      name: editForm.name,
      ownerName: editForm.ownerName,
      mobile: editForm.mobile,
      zone: editForm.zone,
      joiner: editForm.joiner,
      address: editForm.address,
      status: editForm.status
    });
    setEditingHotel(null);
  };

  const handleDownloadReport = () => {
    const headers = ['ID', 'Hotel Name', 'Owner', 'Mobile', 'Zone', 'Joiner', 'Total Orders', 'Status', 'Address'];
    const rows = filteredHotels.map(h => [
      h.id,
      `"${(h.name || '').replace(/"/g, '""')}"`,
      `"${(h.ownerName || '').replace(/"/g, '""')}"`,
      h.mobile || '',
      `"${(h.zone || '').replace(/"/g, '""')}"`,
      `"${(h.joiner || '').replace(/"/g, '""')}"`,
      h.totalOrders ?? 0,
      h.status || 'Active',
      `"${(h.address || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `farmerbox_hotels_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-6 max-w-[1600px] mx-auto space-y-5">
      {/* Top Header Metrics (5 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-center">
        <div className="bg-emerald-50/80 p-3.5 rounded-xl border border-emerald-100 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-slate-500">Total Hotels</p>
            <h3 className="text-xl font-bold text-slate-900 leading-none mt-0.5">{totalHotelsCount}</h3>
            <p className="text-[10px] text-emerald-700 font-semibold mt-1">
              {isDatabaseConnected ? `${activeHotelsCount} active` : '↑ +12 this month'}
            </p>
          </div>
        </div>

        <div className="bg-sky-50/80 p-3.5 rounded-xl border border-sky-100 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sky-600 text-white flex items-center justify-center font-bold">
            <UserCheck className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-slate-500">Active Hotels</p>
            <h3 className="text-xl font-bold text-slate-900 leading-none mt-0.5">{activeHotelsCount}</h3>
            <p className="text-[10px] text-sky-700 font-semibold mt-1">
              {totalHotelsCount > 0 ? `${Math.round((activeHotelsCount / totalHotelsCount) * 100)}% of total` : '0%'}
            </p>
          </div>
        </div>

        <div className="bg-rose-50/80 p-3.5 rounded-xl border border-rose-100 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-500 text-white flex items-center justify-center font-bold">
            <UserX className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-slate-500">Inactive Hotels</p>
            <h3 className="text-xl font-bold text-slate-900 leading-none mt-0.5">{inactiveHotelsCount}</h3>
            <p className="text-[10px] text-rose-700 font-semibold mt-1">
              {totalHotelsCount > 0 ? `${Math.round((inactiveHotelsCount / totalHotelsCount) * 100)}% of total` : '0%'}
            </p>
          </div>
        </div>

        <div className="bg-amber-50/80 p-3.5 rounded-xl border border-amber-100 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-slate-500">Zones</p>
            <h3 className="text-xl font-bold text-slate-900 leading-none mt-0.5">{zonesCount}</h3>
            <p className="text-[10px] text-amber-700 font-semibold mt-1">Coverage areas</p>
          </div>
        </div>

        <div className="bg-purple-50/80 p-3.5 rounded-xl border border-purple-100 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-slate-500">Hotel Joiners</p>
            <h3 className="text-xl font-bold text-slate-900 leading-none mt-0.5">{joinersCount}</h3>
            <p className="text-[10px] text-purple-700 font-semibold mt-1">Managing hotels</p>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Table + Right Hotel Details Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Column: Hotels List (7 cols) */}
        <div className="lg:col-span-7 bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-base text-slate-800">Hotels List</h3>
              <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full">
                {filteredHotels.length}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="relative w-36 sm:w-44">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search hotel, owner..."
                  value={searchTerm}
                  onChange={e => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-emerald-600"
                />
              </div>

              <select
                value={selectedZone}
                onChange={e => {
                  setSelectedZone(e.target.value);
                  setCurrentPage(1);
                }}
                className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5 font-medium text-slate-700 focus:outline-emerald-600"
              >
                <option value="All Zones">All Zones</option>
                {zones.map(z => (
                  <option key={z.id} value={z.name}>{z.name}</option>
                ))}
              </select>

              <select
                value={selectedJoiner}
                onChange={e => {
                  setSelectedJoiner(e.target.value);
                  setCurrentPage(1);
                }}
                className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5 font-medium text-slate-700 focus:outline-emerald-600"
              >
                <option value="All Joiners">All Joiners</option>
                {joiners.map(j => (
                  <option key={j.id} value={j.name}>{j.name}</option>
                ))}
              </select>

              <button
                onClick={() => setIsAddHotelOpen(true)}
                className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs rounded-lg flex items-center gap-1 cursor-pointer transition-colors shrink-0"
              >
                <Plus className="w-3.5 h-3.5" /> New
              </button>
            </div>
          </div>

          {/* Table Container without inner vertical scrolling */}
          <div className="overflow-x-auto border border-slate-200 rounded-xl shadow-2xs">
            <table className="w-full min-w-[780px] text-left text-xs border-collapse">
              <thead className="bg-slate-100 border-b border-slate-200 text-slate-600 font-bold">
                <tr>
                  <th className="py-2.5 px-3 whitespace-nowrap">#</th>
                  <th className="py-2.5 px-3 whitespace-nowrap">Hotel Name</th>
                  <th className="py-2.5 px-3 whitespace-nowrap">Owner Name</th>
                  <th className="py-2.5 px-3 whitespace-nowrap">Mobile</th>
                  <th className="py-2.5 px-3 whitespace-nowrap">Zone</th>
                  <th className="py-2.5 px-3 whitespace-nowrap">Joiner</th>
                  <th className="py-2.5 px-3 text-center whitespace-nowrap">Orders</th>
                  <th className="py-2.5 px-3 text-center whitespace-nowrap">Status</th>
                  <th className="py-2.5 px-3 text-center whitespace-nowrap">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {paginatedHotels.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="py-12 text-center text-slate-400 font-medium">
                      <div className="flex flex-col items-center justify-center space-y-2">
                        <Building2 className="w-8 h-8 text-slate-300" />
                        <p>No hotels found matching your search.</p>
                        <button
                          onClick={() => setIsAddHotelOpen(true)}
                          className="text-emerald-700 hover:underline font-bold text-xs cursor-pointer"
                        >
                          + Register New Hotel
                        </button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  paginatedHotels.map(h => (
                    <tr
                      key={h.id}
                      onClick={() => setSelectedHotel(h)}
                      className={`cursor-pointer transition-colors ${
                        activeHotel && String(activeHotel.id) === String(h.id) ? 'bg-emerald-50/80 font-semibold' : 'hover:bg-slate-50/60'
                      }`}
                    >
                      <td className="py-2.5 px-3 font-mono text-[11px] text-slate-500 whitespace-nowrap">{h.id}</td>
                      <td className="py-2.5 px-3 font-bold text-slate-800 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <img
                            src={h.image || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=100'}
                            alt={h.name || 'Hotel'}
                            className="w-6 h-6 rounded object-cover border border-slate-200 shrink-0"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=100';
                            }}
                          />
                          <span className="truncate max-w-[150px]">{h.name || 'Unnamed Hotel'}</span>
                        </div>
                      </td>
                      <td className="py-2.5 px-3 text-slate-700 whitespace-nowrap">{h.ownerName || '—'}</td>
                      <td className="py-2.5 px-3 text-slate-600 font-mono whitespace-nowrap">{h.mobile || '—'}</td>
                      <td className="py-2.5 px-3 text-slate-700 font-medium whitespace-nowrap">{h.zone || '—'}</td>
                      <td className="py-2.5 px-3 text-slate-600 whitespace-nowrap">
                        {h.addedBy === 'Admin' || h.joiner === 'Admin' || h.assignedJoiner === 'Admin' ? (
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-bold">
                            <Shield className="w-2.5 h-2.5 text-amber-600" /> Admin
                          </span>
                        ) : (
                          h.joiner || '—'
                        )}
                      </td>
                      <td className="py-2.5 px-3 text-center font-bold text-slate-800 whitespace-nowrap">{h.totalOrders ?? 0}</td>
                      <td className="py-2.5 px-3 text-center whitespace-nowrap">
                        <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                          h.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                        }`}>
                          {h.status || 'Active'}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-center whitespace-nowrap">
                        <div className="flex items-center justify-center gap-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedHotel(h);
                            }}
                            className="p-1 text-slate-500 hover:text-blue-600 rounded hover:bg-slate-100 cursor-pointer"
                            title="View Hotel Details"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenEdit(h);
                            }}
                            className="p-1 text-slate-500 hover:text-emerald-700 rounded hover:bg-slate-100 cursor-pointer"
                            title="Edit Hotel"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (window.confirm(`Delete hotel ${h.name}?`)) {
                                deleteHotel(h.id);
                              }
                            }}
                            className="p-1 text-slate-500 hover:text-rose-600 rounded hover:bg-slate-100 cursor-pointer"
                            title="Delete Hotel"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <span>
                Showing {filteredHotels.length === 0 ? 0 : (safeCurrentPage - 1) * itemsPerPage + 1} to{' '}
                {Math.min(safeCurrentPage * itemsPerPage, filteredHotels.length)} of {filteredHotels.length} hotels
              </span>
              <div className="flex items-center gap-1 pl-2 border-l border-slate-200">
                <span className="text-[11px] text-slate-400">Rows:</span>
                <select
                  value={itemsPerPage}
                  onChange={e => {
                    setItemsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="px-1.5 py-0.5 text-xs bg-slate-50 border border-slate-200 rounded font-semibold text-slate-700 focus:outline-emerald-600 cursor-pointer"
                >
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={safeCurrentPage <= 1}
                className="p-1 rounded border border-slate-200 disabled:opacity-40 cursor-pointer hover:bg-slate-50"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).slice(0, 5).map(pageNum => (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`px-2.5 py-1 rounded font-bold text-xs cursor-pointer ${
                    safeCurrentPage === pageNum ? 'bg-emerald-700 text-white' : 'border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {pageNum}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={safeCurrentPage >= totalPages}
                className="p-1 rounded border border-slate-200 disabled:opacity-40 cursor-pointer hover:bg-slate-50"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Quick Action Footer Buttons */}
          <div className="pt-3 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <button
              onClick={() => setIsAddHotelOpen(true)}
              className="py-2.5 bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold text-xs rounded-xl flex items-center justify-center gap-1 hover:bg-emerald-100 cursor-pointer transition-colors"
            >
              <Plus className="w-4 h-4 text-emerald-700" /> Register Hotel
            </button>
            <button
              onClick={() => setActiveTab('Hotel Joiners')}
              className="py-2.5 bg-sky-50 border border-sky-200 text-sky-800 font-bold text-xs rounded-xl flex items-center justify-center gap-1 hover:bg-sky-100 cursor-pointer transition-colors"
            >
              <Users className="w-4 h-4 text-sky-700" /> Assign Joiner
            </button>
            <button
              onClick={() => setActiveTab('Zones')}
              className="py-2.5 bg-orange-50 border border-orange-200 text-orange-800 font-bold text-xs rounded-xl flex items-center justify-center gap-1 hover:bg-orange-100 cursor-pointer transition-colors"
            >
              <MapPin className="w-4 h-4 text-orange-700" /> Manage Zones
            </button>
            <button
              onClick={handleDownloadReport}
              className="py-2.5 bg-purple-50 border border-purple-200 text-purple-800 font-bold text-xs rounded-xl flex items-center justify-center gap-1 hover:bg-purple-100 cursor-pointer transition-colors"
            >
              <Download className="w-4 h-4 text-purple-700" /> Export CSV
            </button>
          </div>
        </div>

        {/* Right Column: Selected Hotel Details (5 cols) */}
        <div className="lg:col-span-5 bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4 sticky top-6 self-start max-h-[calc(100vh-100px)] overflow-y-auto">
          {activeHotel ? (
            <>
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="font-bold text-sm text-slate-800">Hotel Details</h3>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleOpenEdit(activeHotel)}
                    className="px-2.5 py-1 bg-emerald-700 text-white text-xs font-semibold rounded-lg hover:bg-emerald-800 flex items-center gap-1 cursor-pointer"
                  >
                    <Edit className="w-3 h-3" /> Edit
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm(`Are you sure you want to delete ${activeHotel.name}?`)) {
                        deleteHotel(activeHotel.id);
                        setSelectedHotel(null);
                      }
                    }}
                    className="p-1 bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200 text-xs font-semibold rounded-lg flex items-center justify-center cursor-pointer transition-colors"
                    title="Delete Hotel"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <img
                  src={activeHotel.image || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300'}
                  alt={activeHotel.name || 'Hotel'}
                  className="w-16 h-14 rounded-lg object-cover border border-slate-200 shrink-0"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300';
                  }}
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-bold text-base text-slate-800 truncate">{activeHotel.name || 'Unnamed Hotel'}</h4>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      activeHotel.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                    }`}>
                      {activeHotel.status || 'Active'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-0.5 truncate">👤 {activeHotel.ownerName || 'Owner'} (Contact)</p>
                  <p className="text-xs text-slate-600 truncate">📞 {activeHotel.mobile || '—'} • ✉️ {activeHotel.email || '—'}</p>
                </div>
              </div>

              <div className="space-y-1 text-xs text-slate-600 bg-slate-50/80 p-3 rounded-xl border border-slate-100">
                <p className="flex items-start gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                  <span>{activeHotel.address || 'Address not specified'}</span>
                </p>
                <p className="pl-5">
                  Zone: <strong className="text-slate-800">{activeHotel.zone || 'Kharadi'}</strong> • Assigned Joiner: <strong className="text-slate-800">{activeHotel.joiner || 'Admin'}</strong>
                </p>
                <p className="pl-5 flex items-center gap-1.5 pt-0.5">
                  <span className="text-slate-400">Added By:</span>
                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-bold">
                    <Shield className="w-2.5 h-2.5 text-amber-600" /> {activeHotel.addedBy || activeHotel.createdBy || 'Admin'}
                  </span>
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-sky-50 p-2.5 rounded-lg border border-sky-100 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-slate-400">Total Orders</p>
                    <p className="font-bold text-sky-900 text-base">{activeHotel.totalOrders ?? 0}</p>
                  </div>
                  <span className="text-xl">📋</span>
                </div>

                <div className="bg-rose-50 p-2.5 rounded-lg border border-rose-100 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-slate-400">Total Order Value</p>
                    <p className="font-bold text-rose-900 text-base">₹{(activeHotel.totalSpent ?? 0).toLocaleString('en-IN')}</p>
                  </div>
                  <span className="text-xl">📊</span>
                </div>

                <div className="bg-slate-50 p-2 rounded-lg border border-slate-200">
                  <p className="text-[10px] text-slate-400">Registration Date</p>
                  <p className="font-bold text-slate-800 truncate">{activeHotel.registrationDate || 'Just now'}</p>
                </div>

                <div className="bg-slate-50 p-2 rounded-lg border border-slate-200">
                  <p className="text-[10px] text-slate-400">GST Number</p>
                  <p className="font-bold text-slate-800 truncate">{activeHotel.gstNumber || '27ABCDE1234F9Z9'}</p>
                </div>

                <div className="bg-slate-50 p-2 rounded-lg border border-slate-200">
                  <p className="text-[10px] text-slate-400">FSSAI Number</p>
                  <p className="font-bold text-slate-800 truncate">{activeHotel.fssaiNumber || '11521007000999'}</p>
                </div>

                <div className="bg-amber-50 p-2 rounded-lg border border-amber-200 flex items-center gap-2">
                  <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
                  <div>
                    <p className="text-[10px] text-slate-400">Rating</p>
                    <p className="font-bold text-slate-800">{activeHotel.rating ?? 5.0} / 5.0</p>
                  </div>
                </div>
              </div>

              {/* Sub-Tabs for Order History */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between border-b border-slate-200 text-xs font-bold text-slate-600">
                  {(['Order History', 'Payment History', 'Hotel Info', 'Documents'] as const).map(tab => (
                    <button
                      key={tab}
                      onClick={() => setSelectedTab(tab)}
                      className={`pb-1.5 transition-all cursor-pointer ${
                        selectedTab === tab ? 'text-emerald-700 border-b-2 border-emerald-700' : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {selectedTab === 'Order History' && (
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-400 font-semibold">
                        <th className="py-1 px-2">Order ID</th>
                        <th className="py-1 px-2">Date</th>
                        <th className="py-1 px-2 text-right">Amount</th>
                        <th className="py-1 px-2 text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {(activeHotel.orderHistory || [
                        { id: 'FB1001', date: '11 Sep 2026', amount: 2500, status: 'Delivered' },
                        { id: 'FB1002', date: '10 Sep 2026', amount: 1800, status: 'Delivered' },
                        { id: 'FB1003', date: '09 Sep 2026', amount: 3200, status: 'Out for Delivery' }
                      ]).map(ord => (
                        <tr key={ord.id} className="hover:bg-slate-50">
                          <td className="py-1.5 px-2 font-bold text-slate-800">{ord.id}</td>
                          <td className="py-1.5 px-2 text-slate-500">{ord.date}</td>
                          <td className="py-1.5 px-2 text-right font-bold text-slate-900">₹{ord.amount.toLocaleString('en-IN')}</td>
                          <td className="py-1.5 px-2 text-center">
                            <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                              ord.status === 'Delivered' ? 'bg-emerald-100 text-emerald-800' : 'bg-sky-100 text-sky-800'
                            }`}>
                              {ord.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}

                {selectedTab === 'Payment History' && (
                  <div className="py-6 text-center text-slate-400 text-xs">
                    All payment records are settled up to date.
                  </div>
                )}

                {selectedTab === 'Hotel Info' && (
                  <div className="py-3 text-xs space-y-2 text-slate-600">
                    <p><strong>Full Address:</strong> {activeHotel.address || 'Pune, Maharashtra'}</p>
                    <p><strong>Assigned Territory:</strong> {activeHotel.zone || 'Kharadi'} Zone</p>
                    <p><strong>Key Account Executive:</strong> {activeHotel.joiner || '—'}</p>
                  </div>
                )}

                {selectedTab === 'Documents' && (
                  <div className="py-3 text-xs space-y-2 text-slate-600">
                    <div className="flex items-center justify-between p-2 bg-slate-50 rounded-lg border border-slate-200">
                      <span>FSSAI License Certificate</span>
                      <span className="text-[10px] font-bold text-emerald-700 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-slate-50 rounded-lg border border-slate-200">
                      <span>GST Registration Certificate</span>
                      <span className="text-[10px] font-bold text-emerald-700 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="py-16 px-4 flex flex-col items-center justify-center text-center space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <Building2 className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-base text-slate-800">No Hotel Selected</h3>
              <p className="text-xs text-slate-500 max-w-xs">
                {hotels.length === 0
                  ? 'No hotels exist in the database yet. Click below to register your first hotel.'
                  : 'Click on any hotel from the list to view its complete details, stats, and order history.'}
              </p>
              {hotels.length === 0 && (
                <button
                  onClick={() => setIsAddHotelOpen(true)}
                  className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" /> Register Hotel
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Edit Hotel Modal */}
      {editingHotel && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-800">Edit Hotel</h3>
                  <p className="text-xs text-slate-500">Update hotel partner details</p>
                </div>
              </div>
              <button
                onClick={() => setEditingHotel(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="mt-4 space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Hotel Name *</label>
                <input
                  type="text"
                  required
                  value={editForm.name}
                  onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Zone</label>
                  <select
                    value={editForm.zone}
                    onChange={e => setEditForm({ ...editForm, zone: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  >
                    {zones.map(z => (
                      <option key={z.id} value={z.name}>{z.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Assigned Joiner</label>
                  <select
                    value={editForm.joiner}
                    onChange={e => setEditForm({ ...editForm, joiner: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  >
                    {joiners.map(j => (
                      <option key={j.id} value={j.name}>{j.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Contact Person</label>
                  <input
                    type="text"
                    value={editForm.ownerName}
                    onChange={e => setEditForm({ ...editForm, ownerName: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={editForm.mobile}
                    onChange={e => setEditForm({ ...editForm, mobile: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Status</label>
                  <select
                    value={editForm.status}
                    onChange={e => setEditForm({ ...editForm, status: e.target.value as 'Active' | 'Inactive' })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Address</label>
                  <input
                    type="text"
                    value={editForm.address}
                    onChange={e => setEditForm({ ...editForm, address: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-3 flex items-center justify-between border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm(`Are you sure you want to delete ${editingHotel.name}?`)) {
                      deleteHotel(editingHotel.id);
                      setEditingHotel(null);
                    }
                  }}
                  className="px-3 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold rounded-lg text-xs flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                  <span>Delete</span>
                </button>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingHotel(null)}
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
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
