import React, { useState } from 'react';
import { ArrowLeft, ShoppingCart, Plus } from 'lucide-react';
import { useJoinerApp } from '../JoinerAppContext';
import type { MobileOrder } from '../JoinerAppContext';
import { MobileBottomNav } from '../components/MobileBottomNav';

export const MyOrdersScreen: React.FC = () => {
  const {
    orders,
    hotels,
    setCurrentScreen,
    setSelectedOrderForReorder
  } = useJoinerApp();

  const [activeFilter, setActiveFilter] = useState<'All' | 'Pending' | 'Confirmed' | 'Delivered'>('All');

  const filterTabs = ['All', 'Pending', 'Confirmed', 'Delivered'];

  const filteredOrders = orders.filter(o => {
    if (activeFilter === 'All') return true;
    return o.status === activeFilter;
  });

  const handleReorder = (order: MobileOrder) => {
    setSelectedOrderForReorder(order);
    setCurrentScreen('REORDER');
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 justify-between select-none">
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {/* Top Header */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setCurrentScreen('DASHBOARD')}
            className="p-1 -ml-1 text-slate-700 hover:text-slate-900 cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-base font-extrabold text-slate-900">My Orders</h2>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto text-xs pb-0.5">
          {filterTabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab as any)}
              className={`px-3 py-1 rounded-lg text-[11px] font-bold whitespace-nowrap transition-colors cursor-pointer ${
                activeFilter === tab
                  ? 'bg-[#15803d] text-white'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Order Cards List or Empty State */}
        <div className="space-y-2.5 pt-1">
          {orders.length === 0 ? (
            <div className="py-12 px-4 text-center space-y-3.5 bg-white rounded-2xl border border-dashed border-slate-300/90 shadow-2xs mt-1">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-[#15803d] flex items-center justify-center mx-auto shadow-xs">
                <ShoppingCart className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-black text-slate-900">No Orders Yet</h3>
                <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
                  You haven't placed any orders yet. Select a hotel and order fresh vegetables to start earning commission.
                </p>
              </div>
              <button
                onClick={() => setCurrentScreen(hotels.length > 0 ? 'PLACE_ORDER' : 'ADD_HOTEL')}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#15803d] hover:bg-[#166534] text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" /> {hotels.length > 0 ? 'Place Order' : 'Add Hotel First'}
              </button>
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="py-10 text-center space-y-2 bg-white rounded-2xl border border-slate-200 shadow-2xs">
              <p className="text-xs font-bold text-slate-700">No orders found</p>
              <p className="text-[11px] text-slate-400">No orders match the '{activeFilter}' status</p>
            </div>
          ) : (
            filteredOrders.map(order => (
              <div
                key={order.id}
                className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-xs text-slate-900 font-mono">
                    {order.id}
                  </span>
                  <span
                    className={`text-[9.5px] px-2 py-0.5 rounded-md font-extrabold ${
                      order.status === 'Delivered'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : order.status === 'Confirmed'
                        ? 'bg-sky-50 text-sky-700 border border-sky-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}
                  >
                    {order.status}
                  </span>
                </div>

                <div>
                  <h4 className="font-bold text-xs text-slate-800">{order.hotelName}</h4>
                  <p className="text-[10px] text-slate-500 font-medium">
                    {order.date} • <strong className="text-slate-900">₹{order.amount}</strong>
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-end gap-2 pt-1 border-t border-slate-100 text-xs">
                  <button
                    onClick={() => handleReorder(order)}
                    className="px-3 py-1 border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold rounded-lg text-[10.5px] transition-colors cursor-pointer"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleReorder(order)}
                    className="px-3 py-1 bg-emerald-50 hover:bg-[#15803d] text-[#15803d] hover:text-white border border-emerald-200 font-bold rounded-lg text-[10.5px] transition-all cursor-pointer"
                  >
                    Reorder
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Bottom Navigation */}
      <MobileBottomNav />
    </div>
  );
};
