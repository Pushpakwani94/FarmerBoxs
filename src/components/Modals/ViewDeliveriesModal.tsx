import React, { useState } from 'react';
import { X, Truck, CheckCircle2, Clock, Search, MapPin } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface ViewDeliveriesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ViewDeliveriesModal: React.FC<ViewDeliveriesModalProps> = ({ isOpen, onClose }) => {
  const { orders } = useApp();
  const [filterTab, setFilterTab] = useState<'All' | 'Delivered' | 'In Transit'>('All');
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const liveDeliveries = orders.map(o => ({
    id: String(o.id || o.orderId || 'FB1001'),
    hotel: o.hotelName || 'Partner Hotel',
    zone: o.zone || 'Pune',
    driver: o.driver || 'Assigned Driver',
    time: o.time || o.date || 'Today',
    amount: Number(o.amount || o.totalAmount) || 0,
    status: o.status === 'Delivered' ? 'Delivered' : 'In Transit'
  }));

  const deliveredCount = liveDeliveries.filter(d => d.status === 'Delivered').length;
  const inTransitCount = liveDeliveries.filter(d => d.status === 'In Transit').length;

  const filtered = liveDeliveries.filter(d => {
    const matchesTab = filterTab === 'All' || d.status === filterTab;
    const matchesSearch =
      d.hotel.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.driver.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.zone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center font-bold">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-800">Today's Delivery Runs</h3>
              <p className="text-xs text-slate-500">
                {liveDeliveries.length} Total Deliveries • {deliveredCount} Completed ({liveDeliveries.length > 0 ? Math.round((deliveredCount / liveDeliveries.length) * 100) : 100}%) • {inTransitCount} In Transit
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toolbar & Filters */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 py-3 shrink-0">
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-lg text-xs font-semibold">
            {(['All', 'Delivered', 'In Transit'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setFilterTab(tab)}
                className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                  filterTab === tab
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab === 'All' ? `All (${liveDeliveries.length})` : tab === 'Delivered' ? `Delivered (${deliveredCount})` : `In Transit (${inTransitCount})`}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-56">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search delivery or driver..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-sky-600"
            />
          </div>
        </div>

        {/* Table of deliveries */}
        <div className="overflow-y-auto flex-1 border border-slate-100 rounded-xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold sticky top-0">
              <tr>
                <th className="py-2.5 px-3">Order ID</th>
                <th className="py-2.5 px-3">Hotel Name</th>
                <th className="py-2.5 px-3">Zone</th>
                <th className="py-2.5 px-3">Assigned Driver</th>
                <th className="py-2.5 px-3">Time</th>
                <th className="py-2.5 px-3 text-right">Amount</th>
                <th className="py-2.5 px-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400">
                    No matching deliveries found.
                  </td>
                </tr>
              ) : (
                filtered.map(item => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-2.5 px-3 font-bold font-mono text-sky-600">{item.id}</td>
                    <td className="py-2.5 px-3 font-semibold text-slate-800">{item.hotel}</td>
                    <td className="py-2.5 px-3 text-slate-600">{item.zone}</td>
                    <td className="py-2.5 px-3 font-medium text-slate-800 flex items-center gap-1.5">
                      <Truck className="w-3 h-3 text-slate-400" />
                      {item.driver}
                    </td>
                    <td className="py-2.5 px-3 text-slate-500 text-[11px]">{item.time}</td>
                    <td className="py-2.5 px-3 text-right font-bold text-slate-800">₹{item.amount.toLocaleString('en-IN')}</td>
                    <td className="py-2.5 px-3 text-center">
                      <span
                        className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                          item.status === 'Delivered'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-sky-100 text-sky-800'
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="pt-4 mt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 shrink-0">
          <span>Displaying {filtered.length} active delivery dispatches</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
