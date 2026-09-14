import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MapPin, Building2, Users, ShoppingBag, BarChart3, Plus, Search, Edit, Trash2, ChevronLeft, ChevronRight, Phone, CheckCircle2, X } from 'lucide-react';
import type { Zone } from '../types';

export const ZonesPage: React.FC = () => {
  const { zones, selectedZone, setSelectedZone, setIsAddZoneOpen, updateZone, deleteZone, setActiveTab, setSelectedJoiner, joiners, hotels, orders, isDatabaseConnected } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [cityFilter, setCityFilter] = useState('Pune');
  const [editingZone, setEditingZone] = useState<Zone | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredZones = zones.filter(z => {
    const matchesSearch = z.name.toLowerCase().includes(searchTerm.toLowerCase()) || z.areaLocations.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || z.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const activeZone = selectedZone || filteredZones[0] || zones[0];

  const totalSalesAmount = orders.reduce((sum, o) => sum + (Number(o.amount) || 0), 0);

  const getZoneStats = (zone: Zone) => {
    const zHotels = hotels.filter(h => h.zone?.toLowerCase() === zone.name?.toLowerCase() || zone.areaLocations?.toLowerCase().includes(h.zone?.toLowerCase()));
    const zJoiners = joiners.filter(j => j.zone?.toLowerCase() === zone.name?.toLowerCase() || zone.areaLocations?.toLowerCase().includes(j.zone?.toLowerCase()));
    const zOrders = orders.filter(o => o.zone?.toLowerCase() === zone.name?.toLowerCase() || zone.areaLocations?.toLowerCase().includes(o.zone?.toLowerCase()));
    const zSales = zOrders.reduce((sum, o) => sum + (Number(o.amount) || 0), 0);

    return {
      hotelsCount: isDatabaseConnected ? zHotels.length : (zHotels.length || zone.hotelsCount || 0),
      joinersCount: isDatabaseConnected ? zJoiners.length : (zJoiners.length || zone.joinersCount || 0),
      ordersCount: isDatabaseConnected ? zOrders.length : (zOrders.length || zone.ordersThisMonth || 0),
      salesCount: isDatabaseConnected ? zSales : (zSales || zone.salesThisMonth || 0)
    };
  };

  const handleMapZoneClick = (zoneName: string) => {
    const found = zones.find(z => z.name.toLowerCase().includes(zoneName.toLowerCase()) || zoneName.toLowerCase().includes(z.name.toLowerCase()));
    if (found) {
      setSelectedZone(found);
    }
  };

  const handleDelete = (e: React.MouseEvent, zoneId: number, zoneName: string) => {
    e.stopPropagation();
    if (confirm(`Are you sure you want to delete ${zoneName}?`)) {
      deleteZone(zoneId);
    }
  };

  const handleEditClick = (e: React.MouseEvent, zone: Zone) => {
    e.stopPropagation();
    setEditingZone(zone);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingZone) return;
    updateZone(editingZone.id, editingZone);
    setEditingZone(null);
  };

  const handleJoinerClick = (joinerName: string) => {
    const found = joiners.find(j => j.name.toLowerCase().includes(joinerName.toLowerCase()));
    if (found) {
      setSelectedJoiner(found);
    }
    setActiveTab('Hotel Joiners');
  };

  const activeZoneJoiners = activeZone
    ? joiners.filter(j =>
        j.zone?.toLowerCase() === activeZone.name?.toLowerCase() ||
        activeZone.areaLocations?.toLowerCase().includes(j.zone?.toLowerCase())
      )
    : [];

  const displayJoiners = activeZoneJoiners.length > 0
    ? activeZoneJoiners.map(j => ({
        name: j.name,
        hotelsCount: hotels.filter(h => h.joiner?.toLowerCase() === j.name.toLowerCase()).length || j.totalHotels || 0,
        phone: j.mobile,
        status: j.status
      }))
    : (isDatabaseConnected ? [] : (activeZone?.assignedJoinersList || []));

  return (
    <div className="p-6 max-w-[1600px] mx-auto space-y-5">
      {/* Top Header Metrics (5 Cards + Action Button) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 items-center">
        <div className="bg-emerald-50/80 p-3.5 rounded-xl border border-emerald-100 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-slate-500">Total Zones</p>
            <h3 className="text-xl font-bold text-slate-900 leading-none mt-0.5">{zones.length}</h3>
          </div>
        </div>

        <div className="bg-sky-50/80 p-3.5 rounded-xl border border-sky-100 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sky-600 text-white flex items-center justify-center font-bold">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-slate-500">Total Hotels</p>
            <h3 className="text-xl font-bold text-slate-900 leading-none mt-0.5">{hotels.length}</h3>
          </div>
        </div>

        <div className="bg-orange-50/80 p-3.5 rounded-xl border border-orange-100 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center font-bold">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-slate-500">Total Joiners</p>
            <h3 className="text-xl font-bold text-slate-900 leading-none mt-0.5">{joiners.length}</h3>
          </div>
        </div>

        <div className="bg-purple-50/80 p-3.5 rounded-xl border border-purple-100 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-slate-500">Total Orders (This Month)</p>
            <h3 className="text-xl font-bold text-slate-900 leading-none mt-0.5">{orders.length}</h3>
          </div>
        </div>

        <div className="bg-rose-50/80 p-3.5 rounded-xl border border-rose-100 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-500 text-white flex items-center justify-center font-bold">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-slate-500">Total Sales (This Month)</p>
            <h3 className="text-xl font-bold text-slate-900 leading-none mt-0.5">₹{totalSalesAmount.toLocaleString('en-IN')}</h3>
          </div>
        </div>

        <div>
          <button
            onClick={() => setIsAddZoneOpen(true)}
            className="w-full h-full py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
          >
            <Plus className="w-4 h-4" /> Add New Zone
          </button>
        </div>
      </div>

      {/* Main Grid: Left (Zones List) + Right (Zone Map & Zone Details) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Zones List Table (7 cols) */}
        <div className="lg:col-span-7 bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h3 className="font-bold text-base text-slate-800">Zones List</h3>

            <div className="flex items-center gap-2">
              <div className="relative w-48">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search zone name..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-600"
                />
              </div>

              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5 font-medium text-slate-700 cursor-pointer"
              >
                <option value="All">Status: All</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>

              <select
                value={cityFilter}
                onChange={e => setCityFilter(e.target.value)}
                className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5 font-medium text-slate-700 cursor-pointer"
              >
                <option value="Pune">City: Pune</option>
              </select>

              <button
                onClick={() => {}}
                className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs rounded-lg shadow-xs cursor-pointer"
              >
                Search
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
                  <th className="py-2.5 px-2">#</th>
                  <th className="py-2.5 px-2">Zone Name</th>
                  <th className="py-2.5 px-2">Area / Locations</th>
                  <th className="py-2.5 px-2 text-center">Joiners</th>
                  <th className="py-2.5 px-2 text-center">Hotels</th>
                  <th className="py-2.5 px-2 text-center">Orders (Month)</th>
                  <th className="py-2.5 px-2 text-right">Sales (Month)</th>
                  <th className="py-2.5 px-2 text-center">Status</th>
                  <th className="py-2.5 px-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredZones.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="py-8 text-center text-slate-400 text-xs">
                      No zones found. Click "Add New Zone" to add one.
                    </td>
                  </tr>
                ) : (
                  filteredZones.map(zone => {
                    const stats = getZoneStats(zone);
                    return (
                      <tr
                        key={zone.id}
                        onClick={() => setSelectedZone(zone)}
                        className={`cursor-pointer transition-colors ${
                          activeZone?.id === zone.id ? 'bg-emerald-50/80 font-semibold' : 'hover:bg-slate-50/60'
                        }`}
                      >
                        <td className="py-2.5 px-2 font-medium text-slate-500">{zone.id}</td>
                        <td className="py-2.5 px-2 font-bold text-slate-800 flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-emerald-600 fill-emerald-100" />
                          {zone.name}
                        </td>
                        <td className="py-2.5 px-2 text-slate-500">{zone.areaLocations}</td>
                        <td className="py-2.5 px-2 text-center font-semibold text-slate-700">{stats.joinersCount}</td>
                        <td className="py-2.5 px-2 text-center font-semibold text-slate-700">{stats.hotelsCount}</td>
                        <td className="py-2.5 px-2 text-center font-bold text-slate-800">{stats.ordersCount}</td>
                        <td className="py-2.5 px-2 text-right font-bold text-slate-900">₹{stats.salesCount.toLocaleString('en-IN')}</td>
                        <td className="py-2.5 px-2 text-center">
                          <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                            zone.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                          }`}>
                            {zone.status}
                          </span>
                        </td>
                        <td className="py-2.5 px-2 text-center">
                          <div className="flex items-center justify-center gap-1">
                            <button
                              onClick={e => handleEditClick(e, zone)}
                              className="p-1 text-slate-500 hover:text-emerald-700 rounded hover:bg-slate-100 cursor-pointer"
                              title="Edit Zone"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={e => handleDelete(e, zone.id, zone.name)}
                              className="p-1 text-slate-500 hover:text-rose-600 rounded hover:bg-slate-100 cursor-pointer"
                              title="Delete Zone"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
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

          <div className="flex items-center justify-between pt-2 text-xs text-slate-500">
            <span>Showing 1 to {filteredZones.length} of {zones.length} zones</span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                className="p-1 rounded border border-slate-200 hover:bg-slate-50 cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <span className="px-2.5 py-1 bg-emerald-700 text-white rounded font-bold text-xs">{currentPage}</span>
              <button
                onClick={() => setCurrentPage(prev => prev + 1)}
                className="p-1 rounded border border-slate-200 hover:bg-slate-50 cursor-pointer"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Zone Map Pune & Selected Zone Details Panel (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          {/* Zone Map - Pune Canvas SVG */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-slate-800">Zone Map - Pune</h3>
              <select className="text-xs bg-slate-50 border border-slate-200 rounded px-2 py-0.5">
                <option>Pune</option>
              </select>
            </div>

            {/* Interactive Vector Map SVG */}
            <div className="h-56 bg-slate-100 rounded-xl overflow-hidden relative border border-slate-200/80 flex items-center justify-center">
              <svg className="w-full h-full cursor-pointer" viewBox="0 0 600 400" fill="none">
                <rect width="600" height="400" fill="#f8fafc" />

                {/* Pimpri Chinchwad */}
                <g onClick={() => handleMapZoneClick('Pimpri Chinchwad')} className="hover:opacity-80 transition-opacity">
                  <path d="M50 50 L200 60 L220 180 L80 160 Z" fill="#e9d5ff" stroke="#c084fc" strokeWidth="2" opacity="0.8" />
                  <text x="90" y="115" fill="#7e22ce" fontSize="12" fontWeight="bold">Pimpri Chinchwad</text>
                </g>

                {/* Aundh */}
                <g onClick={() => handleMapZoneClick('Aundh')} className="hover:opacity-80 transition-opacity">
                  <path d="M200 60 L350 70 L340 180 L220 180 Z" fill="#dcfce7" stroke="#4ade80" strokeWidth="2" opacity="0.8" />
                  <text x="250" y="125" fill="#15803d" fontSize="12" fontWeight="bold">Aundh</text>
                </g>

                {/* Viman Nagar */}
                <g onClick={() => handleMapZoneClick('Viman Nagar')} className="hover:opacity-80 transition-opacity">
                  <path d="M350 70 L520 80 L500 200 L340 180 Z" fill="#bae6fd" stroke="#38bdf8" strokeWidth="2" opacity="0.8" />
                  <text x="390" y="130" fill="#0369a1" fontSize="12" fontWeight="bold">Viman Nagar</text>
                </g>

                {/* Kharadi */}
                <g onClick={() => handleMapZoneClick('Kharadi')} className="hover:opacity-80 transition-opacity">
                  <path d="M400 200 L580 200 L560 320 L380 300 Z" fill="#ffedd5" stroke="#fb923c" strokeWidth="2" opacity="0.8" />
                  <text x="440" y="255" fill="#c2410c" fontSize="13" fontWeight="bold">Kharadi</text>
                </g>

                {/* Magarpatta */}
                <g onClick={() => handleMapZoneClick('Magarpatta')} className="hover:opacity-80 transition-opacity">
                  <path d="M380 300 L560 320 L520 390 L360 380 Z" fill="#dcfce7" stroke="#4ade80" strokeWidth="2" opacity="0.8" />
                  <text x="420" y="345" fill="#15803d" fontSize="12" fontWeight="bold">Magarpatta</text>
                </g>

                {/* Hadapsar */}
                <g onClick={() => handleMapZoneClick('Hadapsar')} className="hover:opacity-80 transition-opacity">
                  <path d="M360 380 L520 390 L480 400 L320 400 Z" fill="#fecdd3" stroke="#f87171" strokeWidth="2" opacity="0.8" />
                  <text x="380" y="390" fill="#b91c1c" fontSize="12" fontWeight="bold">Hadapsar</text>
                </g>

                {/* Pune Center */}
                <g onClick={() => handleMapZoneClick('Shivajinagar')} className="hover:opacity-80 transition-opacity">
                  <path d="M120 180 L340 180 L380 300 L160 280 Z" fill="#fef08a" stroke="#facc15" strokeWidth="2" opacity="0.8" />
                  <text x="210" y="240" fill="#a16207" fontSize="16" fontWeight="bold">Pune</text>
                </g>
              </svg>
            </div>
          </div>

          {/* Selected Zone Details Card */}
          {activeZone && (
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-base text-slate-800">{activeZone.name}</h3>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        activeZone.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                      }`}>
                        {activeZone.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">{activeZone.areaLocations}</p>
                  </div>
                </div>
                <button
                  onClick={e => handleEditClick(e, activeZone)}
                  className="px-3 py-1.5 bg-emerald-700 text-white text-xs font-semibold rounded-lg hover:bg-emerald-800 cursor-pointer transition-colors"
                >
                  Edit Zone
                </button>
              </div>

              {/* Zone Stats Grid */}
              {(() => {
                const activeStats = getZoneStats(activeZone);
                return (
                  <div className="grid grid-cols-4 gap-2 text-center text-xs">
                    <div className="bg-sky-50 p-2.5 rounded-lg border border-sky-100">
                      <p className="text-[10px] text-slate-400 font-medium">Total Hotels</p>
                      <p className="font-bold text-sky-900 text-base">{activeStats.hotelsCount}</p>
                    </div>
                    <div className="bg-orange-50 p-2.5 rounded-lg border border-orange-100">
                      <p className="text-[10px] text-slate-400 font-medium">Total Joiners</p>
                      <p className="font-bold text-orange-900 text-base">{activeStats.joinersCount}</p>
                    </div>
                    <div className="bg-purple-50 p-2.5 rounded-lg border border-purple-100">
                      <p className="text-[10px] text-slate-400 font-medium">Total Orders</p>
                      <p className="font-bold text-purple-900 text-base">{activeStats.ordersCount}</p>
                    </div>
                    <div className="bg-rose-50 p-2.5 rounded-lg border border-rose-100">
                      <p className="text-[10px] text-slate-400 font-medium">Total Sales</p>
                      <p className="font-bold text-rose-900 text-base">₹{activeStats.salesCount.toLocaleString('en-IN')}</p>
                    </div>
                  </div>
                );
              })()}

              {/* Assigned Joiners List */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-xs text-slate-800">Assigned Joiners ({displayJoiners.length})</h4>
                  <button
                    onClick={() => setActiveTab('Hotel Joiners')}
                    className="text-[11px] text-blue-600 font-semibold hover:underline cursor-pointer"
                  >
                    View All
                  </button>
                </div>

                <div className="space-y-1.5 text-xs">
                  {displayJoiners.length === 0 ? (
                    <div className="text-center py-6 bg-slate-50 rounded-lg border border-slate-100 text-slate-400 text-xs">
                      No joiners assigned to this zone yet.
                    </div>
                  ) : (
                    displayJoiners.map((j, idx) => (
                      <div
                        key={idx}
                        onClick={() => handleJoinerClick(j.name)}
                        className="flex items-center justify-between p-2 bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-100 cursor-pointer transition-colors"
                        title={`Click to view ${j.name}'s profile`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-500">{idx + 1}</span>
                          <span className="font-bold text-slate-800">{j.name}</span>
                          <span className="text-slate-400 text-[11px]">({j.hotelsCount} Hotels)</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-slate-600 flex items-center gap-1 text-[11px]">
                            <Phone className="w-3 h-3 text-slate-400" /> {j.phone}
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                            {j.status}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Edit Zone Modal */}
      {editingZone && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <Edit className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-800">Edit Zone</h3>
                  <p className="text-xs text-slate-500">Update zone details and locations</p>
                </div>
              </div>
              <button
                onClick={() => setEditingZone(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="mt-4 space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Zone Name</label>
                <input
                  type="text"
                  required
                  value={editingZone.name}
                  onChange={e => setEditingZone({ ...editingZone, name: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Area / Locations</label>
                <input
                  type="text"
                  required
                  value={editingZone.areaLocations}
                  onChange={e => setEditingZone({ ...editingZone, areaLocations: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Status</label>
                <select
                  value={editingZone.status}
                  onChange={e => setEditingZone({ ...editingZone, status: e.target.value as 'Active' | 'Inactive' })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:outline-none font-medium text-slate-700"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingZone(null)}
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
    </div>
  );
};
