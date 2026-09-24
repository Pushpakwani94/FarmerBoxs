import React, { useState } from 'react';
import { ArrowLeft, ShoppingCart, Plus, CheckCircle2, Clock, Sparkles } from 'lucide-react';
import { useJoinerApp } from '../JoinerAppContext';
import type { MobileOrder } from '../JoinerAppContext';
import { MobileBottomNav } from '../components/MobileBottomNav';

export const MyOrdersScreen: React.FC = () => {
  const {
    orders,
    hotels,
    setCurrentScreen,
    setSelectedOrderForReorder,
    setSelectedHotel
  } = useJoinerApp();

  const [activeFilter, setActiveFilter] = useState<'All' | 'Pending' | 'Confirmed' | 'Delivered'>('All');

  const filterTabs = ['All', 'Pending', 'Confirmed', 'Delivered'];

  const filteredOrders = orders.filter(o => {
    if (activeFilter === 'All') return true;
    return o.status === activeFilter;
  });

  const handleReorder = (order: MobileOrder) => {
    setSelectedOrderForReorder(order);
    if (order.hotelName) {
      const matched = hotels.find(
        h => h.name.toLowerCase() === order.hotelName.toLowerCase() || (order.hotelId && h.id === order.hotelId)
      );
      if (matched) {
        setSelectedHotel(matched);
      } else {
        setSelectedHotel({
          id: order.hotelId || `HT_${Date.now().toString().slice(-4)}`,
          name: order.hotelName,
          zone: order.hotelZone || 'Kharadi',
          status: 'Active',
          image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=100',
          orders: 1,
          contactPerson: 'Manager'
        });
      }
    }
    setCurrentScreen('REORDER');
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 justify-between select-none">
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 pb-20 no-scrollbar">
        {/* Top Header */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setCurrentScreen('DASHBOARD')}
            className="p-1 -ml-1 text-slate-700 hover:text-slate-900 cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-base font-extrabold text-slate-900 leading-tight">My Hotel Orders</h2>
            <p className="text-[10px] text-slate-500 font-medium">Orders Above ₹1,500 Earn ₹100 Wallet Bonus</p>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto text-xs pb-0.5 no-scrollbar">
          {filterTabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab as any)}
              className={`px-3 py-1 rounded-lg text-[11px] font-bold whitespace-nowrap transition-colors cursor-pointer ${
                activeFilter === tab
                  ? 'bg-[#15803d] text-white shadow-2xs'
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
                  You haven't placed any orders yet. Place orders above ₹1,500 for hotel partners to earn ₹100 for every successfully delivered order.
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
            filteredOrders.map(order => {
              const amt = Number(order.amount || order.totalAmount || 0);
              const isEligible = amt >= 1500;
              const isDelivered = order.status === 'Delivered';

              return (
                <div
                  key={order.id}
                  className="bg-white p-3.5 rounded-2xl border border-slate-200/90 shadow-2xs space-y-2.5 hover:shadow-xs transition-shadow"
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
                    <h4 className="font-black text-xs text-slate-900">{order.hotelName}</h4>
                    <p className="text-[10px] text-slate-500 font-medium mt-0.5">
                      {order.date} • Total: <strong className="text-slate-900">₹{amt.toLocaleString('en-IN')}</strong>
                    </p>
                  </div>

                  {/* ₹100 Wallet Bonus Indicator Badge */}
                  {isEligible && (
                    <div className={`p-2 rounded-xl text-[10px] font-bold flex items-center justify-between border ${
                      isDelivered 
                        ? 'bg-emerald-50 text-emerald-900 border-emerald-200' 
                        : 'bg-amber-50 text-amber-900 border-amber-200'
                    }`}>
                      <span className="flex items-center gap-1.5">
                        <Sparkles className={`w-3.5 h-3.5 ${isDelivered ? 'text-emerald-600' : 'text-amber-600'}`} />
                        <span>
                          {isDelivered ? '₹100 Wallet Bonus Credited (Approved)' : '₹100 Bonus on Delivery Approval'}
                        </span>
                      </span>
                      <span className={`px-1.5 py-0.2 rounded font-black text-[9px] ${
                        isDelivered ? 'bg-emerald-600 text-white' : 'bg-amber-200 text-amber-900'
                      }`}>
                        {isDelivered ? '+₹100' : 'PENDING'}
                      </span>
                    </div>
                  )}

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
              );
            })
          )}
        </div>
      </div>

      {/* Bottom Navigation */}
      <MobileBottomNav />
    </div>
  );
};
