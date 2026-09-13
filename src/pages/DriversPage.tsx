import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Truck,
  UserCheck,
  UserX,
  CheckCircle2,
  Plus,
  Search,
  Eye,
  Edit,
  Trash2,
  Star,
  MapPin,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Shield,
  Users,
  Clock,
  AlertCircle,
  Package,
  Layers
} from 'lucide-react';
import type { Driver } from '../types';
import { zoneWiseDriverStats } from '../data/driversData';
import { DriverDetailModal } from '../components/Modals/DriverDetailModal';
import { AddDriverModal } from '../components/Modals/AddDriverModal';
import { EditDriverModal } from '../components/Modals/EditDriverModal';
import { AssignZoneModal } from '../components/Modals/AssignZoneModal';
import { AssignOrderModal } from '../components/Modals/AssignOrderModal';
import { ViewDeliveriesModal } from '../components/Modals/ViewDeliveriesModal';

export const DriversPage: React.FC = () => {
  const { drivers, zones, deleteDriver, updateDriver } = useApp();

  // Filter & Search states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedZoneFilter, setSelectedZoneFilter] = useState('All Zones');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState('All Status');
  const [zoneTableFilter, setZoneTableFilter] = useState('All Zones');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Selected driver for modals
  const [activeDriver, setActiveDriver] = useState<Driver | null>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isAssignZoneOpen, setIsAssignZoneOpen] = useState(false);
  const [isAssignOrderOpen, setIsAssignOrderOpen] = useState(false);
  const [isViewDeliveriesOpen, setIsViewDeliveriesOpen] = useState(false);
  const [hoveredMapPin, setHoveredMapPin] = useState<string | null>(null);

  // Filter drivers
  const filteredDrivers = drivers.filter(d => {
    const term = searchTerm.toLowerCase().trim();
    const matchesSearch =
      !term ||
      d.name.toLowerCase().includes(term) ||
      d.mobile.includes(term) ||
      d.vehicleNo.toLowerCase().includes(term) ||
      d.zone.toLowerCase().includes(term);

    const matchesZone = selectedZoneFilter === 'All Zones' || d.zone === selectedZoneFilter;
    const matchesStatus = selectedStatusFilter === 'All Status' || d.status === selectedStatusFilter;

    return matchesSearch && matchesZone && matchesStatus;
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredDrivers.length / itemsPerPage) || 1;
  const paginatedDrivers = filteredDrivers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleOpenView = (driver: Driver) => {
    setActiveDriver(driver);
    setIsViewModalOpen(true);
  };

  const handleOpenEdit = (driver: Driver) => {
    setActiveDriver(driver);
    setIsEditModalOpen(true);
  };

  const handleDeleteDriver = (driver: Driver) => {
    if (window.confirm(`Are you sure you want to remove driver ${driver.name} (${driver.vehicleNo})?`)) {
      deleteDriver(driver.id);
    }
  };

  const handleToggleStatus = (driver: Driver) => {
    const nextStatus = driver.status === 'Active' ? 'On Leave' : 'Active';
    updateDriver(driver.id, { status: nextStatus });
    setActiveDriver(prev => (prev && prev.id === driver.id ? { ...prev, status: nextStatus } : prev));
  };

  // Quick stats calculation
  const totalDriversCount = drivers.length;
  const activeDriversCount = drivers.filter(d => d.status === 'Active').length;
  const onLeaveCount = drivers.filter(d => d.status === 'On Leave').length;
  const inactiveDriversCount = drivers.filter(d => d.status === 'Inactive').length;

  return (
    <div className="p-6 max-w-[1600px] mx-auto space-y-5">
      {/* Top 5 Metric Cards matching screenshot */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Card 1: Total Drivers */}
        <div className="bg-[#F0FDF4] p-4 rounded-xl border border-emerald-100/80 flex items-center gap-3.5 shadow-2xs">
          <div className="w-11 h-11 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold shadow-xs">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-slate-500">Total Drivers</p>
            <h3 className="text-2xl font-extrabold text-slate-900 leading-none mt-0.5">{totalDriversCount}</h3>
            <p className="text-[10px] text-emerald-700 font-bold mt-1 flex items-center gap-0.5">
              <span>↑</span> +5 this month
            </p>
          </div>
        </div>

        {/* Card 2: Active Drivers */}
        <div className="bg-[#EFF6FF] p-4 rounded-xl border border-blue-100/80 flex items-center gap-3.5 shadow-2xs">
          <div className="w-11 h-11 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold shadow-xs">
            <UserCheck className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-slate-500">Active Drivers</p>
            <h3 className="text-2xl font-extrabold text-slate-900 leading-none mt-0.5">{activeDriversCount}</h3>
            <p className="text-[10px] text-blue-700 font-bold mt-1">81% of total</p>
          </div>
        </div>

        {/* Card 3: Inactive Drivers */}
        <div className="bg-[#FFF7ED] p-4 rounded-xl border border-amber-100/80 flex items-center gap-3.5 shadow-2xs">
          <div className="w-11 h-11 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold shadow-xs">
            <UserX className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-slate-500">Inactive Drivers</p>
            <h3 className="text-2xl font-extrabold text-slate-900 leading-none mt-0.5">{inactiveDriversCount + onLeaveCount}</h3>
            <p className="text-[10px] text-amber-700 font-bold mt-1">19% of total</p>
          </div>
        </div>

        {/* Card 4: Today's Deliveries */}
        <div className="bg-[#FAF5FF] p-4 rounded-xl border border-purple-100/80 flex items-center gap-3.5 shadow-2xs">
          <div className="w-11 h-11 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold shadow-xs">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-slate-500">Today's Deliveries</p>
            <h3 className="text-2xl font-extrabold text-slate-900 leading-none mt-0.5">86</h3>
            <p className="text-[10px] text-purple-700 font-bold mt-1 flex items-center gap-0.5">
              <span>↑</span> +12% from yesterday
            </p>
          </div>
        </div>

        {/* Card 5: Completed Deliveries */}
        <div className="bg-[#F0FDF4] p-4 rounded-xl border border-emerald-100/80 flex items-center gap-3.5 shadow-2xs">
          <div className="w-11 h-11 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold shadow-xs">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-slate-500">Completed Deliveries</p>
            <h3 className="text-2xl font-extrabold text-slate-900 leading-none mt-0.5">78</h3>
            <p className="text-[10px] text-emerald-700 font-bold mt-1">90% success rate</p>
          </div>
        </div>
      </div>

      {/* Main Grid: Left (Table + Quick Actions) + Right (Overview, Zone Table, Map, Promo) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        
        {/* Left Column (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          
          {/* Main Delivery Drivers Table Card */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
            
            {/* Table Header & Search/Filter Toolbar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <h3 className="font-extrabold text-base text-slate-800 tracking-tight">Delivery Drivers</h3>

              <div className="flex flex-wrap items-center gap-2">
                {/* Search input */}
                <div className="relative w-full sm:w-64">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search driver name, mobile, vehicle..."
                    value={searchTerm}
                    onChange={e => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                  />
                </div>

                {/* Zone Filter */}
                <div className="relative">
                  <select
                    value={selectedZoneFilter}
                    onChange={e => {
                      setSelectedZoneFilter(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="appearance-none bg-slate-50 border border-slate-200 rounded-lg pl-3 pr-7 py-1.5 text-xs font-semibold text-slate-700 cursor-pointer focus:outline-none focus:ring-1 focus:ring-emerald-600"
                  >
                    <option value="All Zones">All Zones</option>
                    {zones.map(z => (
                      <option key={z.id} value={z.name}>{z.name}</option>
                    ))}
                  </select>
                  <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>

                {/* Status Filter */}
                <div className="relative">
                  <select
                    value={selectedStatusFilter}
                    onChange={e => {
                      setSelectedStatusFilter(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="appearance-none bg-slate-50 border border-slate-200 rounded-lg pl-3 pr-7 py-1.5 text-xs font-semibold text-slate-700 cursor-pointer focus:outline-none focus:ring-1 focus:ring-emerald-600"
                  >
                    <option value="All Status">All Status</option>
                    <option value="Active">Active</option>
                    <option value="On Leave">On Leave</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                  <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>

                {/* Add Driver Button */}
                <button
                  onClick={() => setIsAddModalOpen(true)}
                  className="px-3.5 py-1.5 bg-[#16A34A] hover:bg-[#15803D] text-white font-bold text-xs rounded-lg flex items-center gap-1 shadow-2xs cursor-pointer transition-colors shrink-0"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Driver
                </button>
              </div>
            </div>

            {/* Drivers Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs whitespace-nowrap">
                <thead>
                  <tr className="bg-slate-50/70 border-b border-slate-200 text-slate-500 font-semibold">
                    <th className="py-2.5 px-2.5">#</th>
                    <th className="py-2.5 px-2.5">Driver Name</th>
                    <th className="py-2.5 px-2.5">Mobile Number</th>
                    <th className="py-2.5 px-2.5">Zone</th>
                    <th className="py-2.5 px-2.5">Vehicle Number</th>
                    <th className="py-2.5 px-2.5 text-center">Status</th>
                    <th className="py-2.5 px-2.5 text-center">Total Deliveries</th>
                    <th className="py-2.5 px-2.5 text-center">Rating</th>
                    <th className="py-2.5 px-2.5 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {paginatedDrivers.length === 0 ? (
                    <tr>
                      <td colSpan={9} className="py-8 text-center text-slate-400">
                        No matching drivers found.
                      </td>
                    </tr>
                  ) : (
                    paginatedDrivers.map((driver, idx) => {
                      const displayIndex = (currentPage - 1) * itemsPerPage + idx + 1;
                      return (
                        <tr
                          key={driver.id}
                          className="hover:bg-slate-50/80 transition-colors cursor-pointer"
                          onClick={() => handleOpenView(driver)}
                        >
                          <td className="py-2.5 px-2.5 font-medium text-slate-400">{displayIndex}</td>

                          {/* Driver Name with avatar */}
                          <td className="py-2.5 px-2.5">
                            <div className="flex items-center gap-2.5">
                              <img
                                src={driver.avatar}
                                alt={driver.name}
                                className="w-7 h-7 rounded-full object-cover border border-slate-200 shrink-0"
                              />
                              <span className="font-bold text-slate-800 hover:text-emerald-700 transition-colors">
                                {driver.name}
                              </span>
                            </div>
                          </td>

                          {/* Mobile */}
                          <td className="py-2.5 px-2.5 text-slate-600 font-mono text-[11px]">{driver.mobile}</td>

                          {/* Zone */}
                          <td className="py-2.5 px-2.5 text-slate-700 font-medium">{driver.zone}</td>

                          {/* Vehicle Number */}
                          <td className="py-2.5 px-2.5 font-mono text-slate-700 text-[11px] uppercase font-semibold">
                            {driver.vehicleNo}
                          </td>

                          {/* Status Pill */}
                          <td className="py-2.5 px-2.5 text-center">
                            <span
                              className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] inline-block ${
                                driver.status === 'Active'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : driver.status === 'On Leave'
                                  ? 'bg-amber-100 text-amber-800'
                                  : 'bg-rose-100 text-rose-800'
                              }`}
                            >
                              {driver.status}
                            </span>
                          </td>

                          {/* Total Deliveries */}
                          <td className="py-2.5 px-2.5 text-center font-bold text-slate-800 text-xs">
                            {driver.totalDeliveries}
                          </td>

                          {/* Rating */}
                          <td className="py-2.5 px-2.5 text-center font-bold text-amber-600">
                            <span className="flex items-center justify-center gap-1">
                              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                              <span>{driver.rating.toFixed(1)}</span>
                            </span>
                          </td>

                          {/* Actions: Eye, Pencil, Trash in rounded squares */}
                          <td className="py-2.5 px-2.5 text-center" onClick={e => e.stopPropagation()}>
                            <div className="flex items-center justify-center gap-1.5">
                              {/* Eye */}
                              <button
                                onClick={() => handleOpenView(driver)}
                                className="w-6 h-6 rounded bg-sky-50 text-sky-600 hover:bg-sky-100 flex items-center justify-center cursor-pointer transition-colors border border-sky-100"
                                title="View Driver Details"
                              >
                                <Eye className="w-3 h-3" />
                              </button>

                              {/* Edit */}
                              <button
                                onClick={() => handleOpenEdit(driver)}
                                className="w-6 h-6 rounded bg-emerald-50 text-emerald-700 hover:bg-emerald-100 flex items-center justify-center cursor-pointer transition-colors border border-emerald-100"
                                title="Edit Driver"
                              >
                                <Edit className="w-3 h-3" />
                              </button>

                              {/* Delete */}
                              <button
                                onClick={() => handleDeleteDriver(driver)}
                                className="w-6 h-6 rounded bg-rose-50 text-rose-600 hover:bg-rose-100 flex items-center justify-center cursor-pointer transition-colors border border-rose-100"
                                title="Delete Driver"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls matching screenshot */}
            <div className="flex flex-col sm:flex-row items-center justify-between pt-2 text-xs text-slate-500 gap-3 border-t border-slate-100">
              <span>
                Showing {filteredDrivers.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1} to{' '}
                {Math.min(currentPage * itemsPerPage, filteredDrivers.length)} of {filteredDrivers.length} drivers
              </span>

              <div className="flex items-center gap-1">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  className="p-1 rounded border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                  <button
                    key={p}
                    onClick={() => setCurrentPage(p)}
                    className={`w-6 h-6 rounded flex items-center justify-center font-bold text-xs cursor-pointer ${
                      currentPage === p
                        ? 'bg-[#16A34A] text-white shadow-2xs'
                        : 'border border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {p}
                  </button>
                ))}

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  className="p-1 rounded border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 cursor-pointer"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Quick Actions Bar matching screenshot */}
          <div className="space-y-2">
            <h4 className="font-extrabold text-sm text-slate-800">Quick Actions</h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {/* + Add Driver (Green) */}
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="py-2.5 px-4 bg-[#16A34A] hover:bg-[#15803D] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer transition-colors"
              >
                <Plus className="w-4 h-4" /> Add Driver
              </button>

              {/* Assign Zone (Blue) */}
              <button
                onClick={() => setIsAssignZoneOpen(true)}
                className="py-2.5 px-4 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer transition-colors"
              >
                <MapPin className="w-4 h-4" /> Assign Zone
              </button>

              {/* Assign Order (Purple) */}
              <button
                onClick={() => setIsAssignOrderOpen(true)}
                className="py-2.5 px-4 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer transition-colors"
              >
                <Package className="w-4 h-4" /> Assign Order
              </button>

              {/* View Deliveries (Sky) */}
              <button
                onClick={() => setIsViewDeliveriesOpen(true)}
                className="py-2.5 px-4 bg-[#0284C7] hover:bg-[#0369A1] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer transition-colors"
              >
                <Truck className="w-4 h-4" /> View Deliveries
              </button>
            </div>
          </div>
        </div>

        {/* Right Column (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Driver Overview Card (2x2 Grid) */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-sm text-slate-800">Driver Overview</h3>
              <button
                onClick={() => {
                  setSelectedStatusFilter('All Status');
                  setSelectedZoneFilter('All Zones');
                }}
                className="text-xs text-blue-600 hover:text-blue-700 font-semibold cursor-pointer"
              >
                View All
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              {/* Total Drivers */}
              <div
                onClick={() => setSelectedStatusFilter('All Status')}
                className="bg-sky-50/70 hover:bg-sky-50 p-3 rounded-xl border border-sky-100 flex items-center gap-3 cursor-pointer transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-sky-600 text-white flex items-center justify-center font-bold">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 font-medium">Total Drivers</p>
                  <p className="font-extrabold text-slate-900 text-base leading-none mt-0.5">{totalDriversCount}</p>
                </div>
              </div>

              {/* Active Drivers */}
              <div
                onClick={() => setSelectedStatusFilter('Active')}
                className="bg-emerald-50/70 hover:bg-emerald-50 p-3 rounded-xl border border-emerald-100 flex items-center gap-3 cursor-pointer transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold">
                  <UserCheck className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 font-medium">Active Drivers</p>
                  <p className="font-extrabold text-slate-900 text-base leading-none mt-0.5">{activeDriversCount}</p>
                </div>
              </div>

              {/* On Leave */}
              <div
                onClick={() => setSelectedStatusFilter('On Leave')}
                className="bg-amber-50/70 hover:bg-amber-50 p-3 rounded-xl border border-amber-100 flex items-center gap-3 cursor-pointer transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-amber-500 text-white flex items-center justify-center font-bold">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 font-medium">On Leave</p>
                  <p className="font-extrabold text-slate-900 text-base leading-none mt-0.5">{onLeaveCount}</p>
                </div>
              </div>

              {/* Inactive Drivers */}
              <div
                onClick={() => setSelectedStatusFilter('Inactive')}
                className="bg-rose-50/70 hover:bg-rose-50 p-3 rounded-xl border border-rose-100 flex items-center gap-3 cursor-pointer transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-rose-500 text-white flex items-center justify-center font-bold">
                  <UserX className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 font-medium">Inactive Drivers</p>
                  <p className="font-extrabold text-slate-900 text-base leading-none mt-0.5">{inactiveDriversCount}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Zone Wise Drivers Table */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-sm text-slate-800">Zone Wise Drivers</h3>
              <div className="relative">
                <select
                  value={zoneTableFilter}
                  onChange={e => setZoneTableFilter(e.target.value)}
                  className="appearance-none text-[11px] bg-slate-50 border border-slate-200 rounded-lg pl-2 pr-6 py-1 font-semibold text-slate-700 cursor-pointer focus:outline-none"
                >
                  <option value="All Zones">All Zones</option>
                  {zoneWiseDriverStats.map(z => (
                    <option key={z.zone} value={z.zone}>{z.zone}</option>
                  ))}
                </select>
                <ChevronDown className="w-3 h-3 text-slate-400 absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-semibold bg-slate-50/60">
                  <th className="py-2 px-2.5">Zone</th>
                  <th className="py-2 px-2.5 text-center">Total Drivers</th>
                  <th className="py-2 px-2.5 text-center">Active</th>
                  <th className="py-2 px-2.5 text-center">Inactive</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {zoneWiseDriverStats
                  .filter(z => zoneTableFilter === 'All Zones' || z.zone === zoneTableFilter)
                  .map((z, idx) => (
                    <tr
                      key={idx}
                      onClick={() => {
                        setSelectedZoneFilter(z.zone);
                        setCurrentPage(1);
                      }}
                      className="hover:bg-slate-50 transition-colors cursor-pointer"
                    >
                      <td className="py-2 px-2.5 font-bold text-slate-800 hover:text-emerald-700">{z.zone}</td>
                      <td className="py-2 px-2.5 text-center font-bold text-slate-700">{z.total}</td>
                      <td className="py-2 px-2.5 text-center font-bold text-emerald-700">{z.active}</td>
                      <td className="py-2 px-2.5 text-center font-bold text-rose-600">{z.inactive}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          {/* Driver Map Panel with Realistic Pune Map & Colored Markers */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-sm text-slate-800">Driver Map</h3>
              <button
                onClick={() => {
                  setSelectedZoneFilter('All Zones');
                  setCurrentPage(1);
                }}
                className="text-xs text-blue-600 hover:text-blue-700 font-semibold cursor-pointer"
              >
                View All
              </button>
            </div>

            {/* Interactive Pune Map */}
            <div className="h-48 bg-[#F8FAFC] rounded-xl overflow-hidden relative border border-slate-200/80 flex items-center justify-center">
              <svg className="w-full h-full" viewBox="0 0 420 220">
                <defs>
                  <linearGradient id="puneRiverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#bae6fd" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#7dd3fc" stopOpacity="0.8" />
                  </linearGradient>
                  <filter id="pinShadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="1" dy="2" stdDeviation="1.5" floodColor="#000" floodOpacity="0.2" />
                  </filter>
                </defs>

                {/* Map Base & Street Grid */}
                <rect width="420" height="220" fill="#f8fafc" />

                {/* Light terrain/district outlines */}
                <path d="M 10 40 Q 90 20 180 30 T 360 40 L 410 110 L 390 190 L 220 210 L 40 190 Z" fill="#f1f5f9" opacity="0.7" />

                {/* Major Pune Roads (Sinhagad Rd, Nagar Rd, Solapur Rd, Mumbai-Pune Hwy) */}
                <path d="M 0 110 Q 120 100 240 115 T 420 110" stroke="#e2e8f0" strokeWidth="6" fill="none" />
                <path d="M 160 0 Q 180 90 210 220" stroke="#e2e8f0" strokeWidth="5" fill="none" />
                <path d="M 230 0 Q 250 110 320 220" stroke="#e2e8f0" strokeWidth="4" fill="none" />
                <path d="M 30 180 Q 180 140 380 70" stroke="#cbd5e1" strokeWidth="3" strokeDasharray="4 2" fill="none" />

                {/* Mula-Mutha River winding through Pune */}
                <path
                  d="M 20 60 Q 100 90 180 95 T 290 85 T 410 130"
                  stroke="url(#puneRiverGrad)"
                  strokeWidth="9"
                  strokeLinecap="round"
                  fill="none"
                />

                {/* City Center Marker Label */}
                <text x="185" y="138" fill="#94a3b8" fontSize="13" fontWeight="bold" letterSpacing="0.5">
                  Pune
                </text>

                {/* Pin 1: Kharadi (Green Pin - 8 drivers) */}
                <g
                  className="cursor-pointer transition-transform hover:scale-110"
                  onClick={() => { setSelectedZoneFilter('Kharadi'); setCurrentPage(1); }}
                  onMouseEnter={() => setHoveredMapPin('Kharadi: 8 Drivers (7 Active)')}
                  onMouseLeave={() => setHoveredMapPin(null)}
                >
                  <circle cx="340" cy="75" r="14" fill="#22c55e" fillOpacity="0.2" className="animate-ping" />
                  <path
                    d="M 340 60 C 333 60 328 65 328 72 C 328 81 340 92 340 92 C 340 92 352 81 352 72 C 352 65 347 60 340 60 Z"
                    fill="#16a34a"
                    filter="url(#pinShadow)"
                  />
                  <circle cx="340" cy="71" r="4" fill="#ffffff" />
                </g>

                {/* Pin 2: Viman Nagar (Blue Pin - 6 drivers) */}
                <g
                  className="cursor-pointer transition-transform hover:scale-110"
                  onClick={() => { setSelectedZoneFilter('Viman Nagar'); setCurrentPage(1); }}
                  onMouseEnter={() => setHoveredMapPin('Viman Nagar: 6 Drivers (5 Active)')}
                  onMouseLeave={() => setHoveredMapPin(null)}
                >
                  <circle cx="280" cy="65" r="12" fill="#3b82f6" fillOpacity="0.2" />
                  <path
                    d="M 280 52 C 273 52 268 57 268 64 C 268 73 280 84 280 84 C 280 84 292 73 292 64 C 292 57 287 52 280 52 Z"
                    fill="#2563eb"
                    filter="url(#pinShadow)"
                  />
                  <circle cx="280" cy="63" r="4" fill="#ffffff" />
                </g>

                {/* Pin 3: Hadapsar (Orange Pin - 6 drivers) */}
                <g
                  className="cursor-pointer transition-transform hover:scale-110"
                  onClick={() => { setSelectedZoneFilter('Hadapsar'); setCurrentPage(1); }}
                  onMouseEnter={() => setHoveredMapPin('Hadapsar: 6 Drivers (5 Active)')}
                  onMouseLeave={() => setHoveredMapPin(null)}
                >
                  <circle cx="320" cy="155" r="12" fill="#f97316" fillOpacity="0.2" />
                  <path
                    d="M 320 142 C 313 142 308 147 308 154 C 308 163 320 174 320 174 C 320 174 332 163 332 154 C 332 147 327 142 320 142 Z"
                    fill="#ea580c"
                    filter="url(#pinShadow)"
                  />
                  <circle cx="320" cy="153" r="4" fill="#ffffff" />
                </g>

                {/* Pin 4: Magarpatta (Red Pin - 5 drivers) */}
                <g
                  className="cursor-pointer transition-transform hover:scale-110"
                  onClick={() => { setSelectedZoneFilter('Magarpatta'); setCurrentPage(1); }}
                  onMouseEnter={() => setHoveredMapPin('Magarpatta: 5 Drivers (4 Active)')}
                  onMouseLeave={() => setHoveredMapPin(null)}
                >
                  <circle cx="260" cy="140" r="12" fill="#ef4444" fillOpacity="0.2" />
                  <path
                    d="M 260 127 C 253 127 248 132 248 139 C 248 148 260 159 260 159 C 260 159 272 148 272 139 C 272 132 267 127 260 127 Z"
                    fill="#dc2626"
                    filter="url(#pinShadow)"
                  />
                  <circle cx="260" cy="138" r="4" fill="#ffffff" />
                </g>
              </svg>

              {/* Map Hover Tooltip */}
              {hoveredMapPin && (
                <div className="absolute top-2 left-2 bg-slate-900/90 text-white text-[11px] px-2.5 py-1 rounded-lg font-medium shadow-md pointer-events-none animate-in fade-in">
                  {hoveredMapPin}
                </div>
              )}
            </div>

            {/* Map Legend matching screenshot */}
            <div className="grid grid-cols-2 gap-2 text-xs pt-1">
              <button
                onClick={() => { setSelectedZoneFilter('Kharadi'); setCurrentPage(1); }}
                className="flex items-center gap-2 text-slate-700 hover:text-emerald-700 font-medium cursor-pointer"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-[#16A34A] shrink-0" />
                <span>Kharadi (8)</span>
              </button>

              <button
                onClick={() => { setSelectedZoneFilter('Viman Nagar'); setCurrentPage(1); }}
                className="flex items-center gap-2 text-slate-700 hover:text-blue-700 font-medium cursor-pointer"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-[#2563EB] shrink-0" />
                <span>Viman Nagar (6)</span>
              </button>

              <button
                onClick={() => { setSelectedZoneFilter('Hadapsar'); setCurrentPage(1); }}
                className="flex items-center gap-2 text-slate-700 hover:text-orange-700 font-medium cursor-pointer"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-[#EA580C] shrink-0" />
                <span>Hadapsar (6)</span>
              </button>

              <button
                onClick={() => { setSelectedZoneFilter('Magarpatta'); setCurrentPage(1); }}
                className="flex items-center gap-2 text-slate-700 hover:text-red-700 font-medium cursor-pointer"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-[#DC2626] shrink-0" />
                <span>Magarpatta (5)</span>
              </button>
            </div>
          </div>

          {/* Bottom Delivery Truck Banner matching screenshot */}
          <div className="bg-gradient-to-r from-emerald-50 via-green-50 to-emerald-100 p-4 rounded-xl border border-emerald-200/80 flex items-center justify-between shadow-2xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold shadow-xs">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-extrabold text-xs text-emerald-950">Safe Deliveries</h4>
                <p className="text-[11px] font-semibold text-emerald-700">Fresh Vegetables</p>
              </div>
            </div>

            {/* Delivery Truck Graphic Illustration */}
            <div className="relative flex items-center">
              <div className="bg-emerald-700 text-white px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-xs">
                <span className="text-[10px] font-extrabold tracking-wider uppercase">FarmerBox</span>
                <Truck className="w-4 h-4 text-emerald-200" />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Driver Modals */}
      <DriverDetailModal
        driver={activeDriver}
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        onEdit={d => {
          setIsViewModalOpen(false);
          setActiveDriver(d);
          setIsEditModalOpen(true);
        }}
        onToggleStatus={handleToggleStatus}
      />

      <AddDriverModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />

      <EditDriverModal
        driver={activeDriver}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      />

      <AssignZoneModal
        isOpen={isAssignZoneOpen}
        onClose={() => setIsAssignZoneOpen(false)}
      />

      <AssignOrderModal
        isOpen={isAssignOrderOpen}
        onClose={() => setIsAssignOrderOpen(false)}
      />

      <ViewDeliveriesModal
        isOpen={isViewDeliveriesOpen}
        onClose={() => setIsViewDeliveriesOpen(false)}
      />
    </div>
  );
};
