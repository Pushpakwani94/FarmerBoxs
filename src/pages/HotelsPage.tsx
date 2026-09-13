import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Building2, UserCheck, UserX, MapPin, Users, Plus, Search, Eye, Edit, Trash2, Phone, Star, Download, ChevronLeft, ChevronRight } from 'lucide-react';

export const HotelsPage: React.FC = () => {
  const { hotels, selectedHotel, setSelectedHotel, setIsAddHotelOpen, zones, joiners } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState<'Order History' | 'Payment History' | 'Hotel Info' | 'Documents'>('Order History');

  const activeHotel = selectedHotel || hotels[0];

  return (
    <div className="p-6 max-w-[1600px] mx-auto space-y-5">
      {/* Top Header Metrics (5 Cards + Action Buttons) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-center">
        <div className="bg-emerald-50/80 p-3.5 rounded-xl border border-emerald-100 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-slate-500">Total Hotels</p>
            <h3 className="text-xl font-bold text-slate-900 leading-none mt-0.5">555</h3>
            <p className="text-[10px] text-emerald-700 font-semibold mt-1">↑ +12 this month</p>
          </div>
        </div>

        <div className="bg-sky-50/80 p-3.5 rounded-xl border border-sky-100 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sky-600 text-white flex items-center justify-center font-bold">
            <UserCheck className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-slate-500">Active Hotels</p>
            <h3 className="text-xl font-bold text-slate-900 leading-none mt-0.5">520</h3>
            <p className="text-[10px] text-sky-700 font-semibold mt-1">94% of total</p>
          </div>
        </div>

        <div className="bg-rose-50/80 p-3.5 rounded-xl border border-rose-100 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-500 text-white flex items-center justify-center font-bold">
            <UserX className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-slate-500">Inactive Hotels</p>
            <h3 className="text-xl font-bold text-slate-900 leading-none mt-0.5">35</h3>
            <p className="text-[10px] text-rose-700 font-semibold mt-1">6% of total</p>
          </div>
        </div>

        <div className="bg-amber-50/80 p-3.5 rounded-xl border border-amber-100 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-slate-500">Zones</p>
            <h3 className="text-xl font-bold text-slate-900 leading-none mt-0.5">12</h3>
            <p className="text-[10px] text-amber-700 font-semibold mt-1">Across Pune</p>
          </div>
        </div>

        <div className="bg-purple-50/80 p-3.5 rounded-xl border border-purple-100 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-slate-500">Hotel Joiners</p>
            <h3 className="text-xl font-bold text-slate-900 leading-none mt-0.5">26</h3>
            <p className="text-[10px] text-purple-700 font-semibold mt-1">Managing hotels</p>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Table + Right Hotel Details Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Hotels List (7 cols) */}
        <div className="lg:col-span-7 bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h3 className="font-bold text-base text-slate-800">Hotels List</h3>

            <div className="flex items-center gap-2">
              <div className="relative w-44">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search hotel, owner..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg"
                />
              </div>

              <select className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5 font-medium text-slate-700">
                <option>All Zones</option>
              </select>

              <select className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2 py-1.5 font-medium text-slate-700">
                <option>All Joiners</option>
              </select>

              <button className="px-3 py-1.5 bg-emerald-700 text-white font-semibold text-xs rounded-lg">Search</button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
                  <th className="py-2.5 px-2"><input type="checkbox" /></th>
                  <th className="py-2.5 px-2">#</th>
                  <th className="py-2.5 px-2">Hotel Name</th>
                  <th className="py-2.5 px-2">Owner Name</th>
                  <th className="py-2.5 px-2">Mobile</th>
                  <th className="py-2.5 px-2">Zone</th>
                  <th className="py-2.5 px-2">Joiner</th>
                  <th className="py-2.5 px-2 text-center">Total Orders</th>
                  <th className="py-2.5 px-2 text-center">Status</th>
                  <th className="py-2.5 px-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {hotels.map(h => (
                  <tr
                    key={h.id}
                    onClick={() => setSelectedHotel(h)}
                    className={`cursor-pointer transition-colors ${
                      activeHotel.id === h.id ? 'bg-emerald-50/80 font-semibold' : 'hover:bg-slate-50/60'
                    }`}
                  >
                    <td className="py-2.5 px-2"><input type="checkbox" /></td>
                    <td className="py-2.5 px-2 font-medium text-slate-500">{h.id}</td>
                    <td className="py-2.5 px-2 font-bold text-slate-800 flex items-center gap-2">
                      <img src={h.image} alt={h.name} className="w-6 h-6 rounded object-cover" />
                      {h.name}
                    </td>
                    <td className="py-2.5 px-2 text-slate-700">{h.ownerName}</td>
                    <td className="py-2.5 px-2 text-slate-600">{h.mobile}</td>
                    <td className="py-2.5 px-2 text-slate-700 font-medium">{h.zone}</td>
                    <td className="py-2.5 px-2 text-slate-600">{h.joiner}</td>
                    <td className="py-2.5 px-2 text-center font-bold text-slate-800">{h.totalOrders}</td>
                    <td className="py-2.5 px-2 text-center">
                      <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                        h.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                      }`}>
                        {h.status}
                      </span>
                    </td>
                    <td className="py-2.5 px-2 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <button className="p-1 text-slate-500 hover:text-blue-600"><Eye className="w-3.5 h-3.5" /></button>
                        <button className="p-1 text-slate-500 hover:text-emerald-700"><Edit className="w-3.5 h-3.5" /></button>
                        <button className="p-1 text-slate-500 hover:text-rose-600"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between pt-2 text-xs text-slate-500">
            <span>Showing 1 to 10 of 555 hotels</span>
            <div className="flex items-center gap-1">
              <button className="p-1 rounded border border-slate-200"><ChevronLeft className="w-3.5 h-3.5" /></button>
              <span className="px-2.5 py-1 bg-emerald-700 text-white rounded font-bold text-xs">1</span>
              <span className="px-2 py-1 rounded border text-xs">2</span>
              <span className="px-2 py-1 rounded border text-xs">3</span>
              <button className="p-1 rounded border border-slate-200"><ChevronRight className="w-3.5 h-3.5" /></button>
            </div>
          </div>

          {/* Quick Action Footer Buttons */}
          <div className="pt-3 border-t border-slate-100 grid grid-cols-4 gap-3">
            <button
              onClick={() => setIsAddHotelOpen(true)}
              className="py-2.5 bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold text-xs rounded-xl flex items-center justify-center gap-1 hover:bg-emerald-100"
            >
              <Plus className="w-4 h-4 text-emerald-700" /> Register New Hotel
            </button>
            <button className="py-2.5 bg-sky-50 border border-sky-200 text-sky-800 font-bold text-xs rounded-xl flex items-center justify-center gap-1 hover:bg-sky-100">
              <Users className="w-4 h-4 text-sky-700" /> Assign Joiner
            </button>
            <button className="py-2.5 bg-orange-50 border border-orange-200 text-orange-800 font-bold text-xs rounded-xl flex items-center justify-center gap-1 hover:bg-orange-100">
              <MapPin className="w-4 h-4 text-orange-700" /> Manage Zones
            </button>
            <button className="py-2.5 bg-purple-50 border border-purple-200 text-purple-800 font-bold text-xs rounded-xl flex items-center justify-center gap-1 hover:bg-purple-100">
              <Download className="w-4 h-4 text-purple-700" /> Download Report
            </button>
          </div>
        </div>

        {/* Right Column: Selected Hotel Details (5 cols) */}
        <div className="lg:col-span-5 bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="font-bold text-sm text-slate-800">Hotel Details</h3>
            <button className="px-3 py-1 bg-emerald-700 text-white text-xs font-semibold rounded-lg hover:bg-emerald-800">
              Edit
            </button>
          </div>

          <div className="flex items-center gap-3">
            <img src={activeHotel.image} alt={activeHotel.name} className="w-16 h-14 rounded-lg object-cover border border-slate-200" />
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-base text-slate-800">{activeHotel.name}</h4>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                  {activeHotel.status}
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-0.5">👤 {activeHotel.ownerName} (Owner)</p>
              <p className="text-xs text-slate-600">📞 {activeHotel.mobile} • ✉️ {activeHotel.email}</p>
            </div>
          </div>

          <div className="space-y-1 text-xs text-slate-600">
            <p>📍 {activeHotel.address}</p>
            <p>📍 Zone: <strong>{activeHotel.zone} Zone</strong> • Joiner: <strong>{activeHotel.joiner}</strong></p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-sky-50 p-2.5 rounded-lg border border-sky-100 flex items-center justify-between">
              <div>
                <p className="text-[10px] text-slate-400">Total Orders</p>
                <p className="font-bold text-sky-900 text-base">{activeHotel.totalOrders}</p>
              </div>
              <span className="text-xl">📋</span>
            </div>

            <div className="bg-rose-50 p-2.5 rounded-lg border border-rose-100 flex items-center justify-between">
              <div>
                <p className="text-[10px] text-slate-400">Total Order Value</p>
                <p className="font-bold text-rose-900 text-base">₹{activeHotel.totalSpent.toLocaleString('en-IN')}</p>
              </div>
              <span className="text-xl">📊</span>
            </div>

            <div className="bg-slate-50 p-2 rounded-lg border border-slate-200">
              <p className="text-[10px] text-slate-400">Registration Date</p>
              <p className="font-bold text-slate-800">{activeHotel.registrationDate}</p>
            </div>

            <div className="bg-slate-50 p-2 rounded-lg border border-slate-200">
              <p className="text-[10px] text-slate-400">GST Number</p>
              <p className="font-bold text-slate-800">{activeHotel.gstNumber}</p>
            </div>

            <div className="bg-slate-50 p-2 rounded-lg border border-slate-200">
              <p className="text-[10px] text-slate-400">FSSAI Number</p>
              <p className="font-bold text-slate-800">{activeHotel.fssaiNumber}</p>
            </div>

            <div className="bg-amber-50 p-2 rounded-lg border border-amber-200 flex items-center gap-2">
              <Star className="w-5 h-5 fill-amber-500 text-amber-500" />
              <div>
                <p className="text-[10px] text-slate-400">Your Rating</p>
                <p className="font-bold text-slate-800">{activeHotel.rating}</p>
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
                  className={`pb-1.5 transition-all ${
                    selectedTab === tab ? 'text-emerald-700 border-b-2 border-emerald-700' : 'text-slate-500'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

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
          </div>
        </div>
      </div>
    </div>
  );
};
