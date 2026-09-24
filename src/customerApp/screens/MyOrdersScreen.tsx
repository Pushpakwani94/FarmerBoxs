import React, { useState } from 'react';
import { ArrowLeft, ShoppingBag, Clock, CheckCircle2, XCircle, ChevronRight, Package, RefreshCw } from 'lucide-react';
import { useCustomerApp } from '../CustomerAppContext';
import type { CustomerOrder } from '../types';

export const MyOrdersScreen: React.FC = () => {
  const { orders, cancelOrder, setCurrentScreen } = useCustomerApp();
  const [activeTab, setActiveTab] = useState<'All' | 'Processing' | 'Delivered' | 'Cancelled'>('All');
  const [selectedOrderDetails, setSelectedOrderDetails] = useState<CustomerOrder | null>(null);

  const tabs = ['All', 'Processing', 'Delivered', 'Cancelled'] as const;

  const filteredOrders = orders.filter(o => {
    if (activeTab === 'All') return true;
    return o.status === activeTab;
  });

  return (
    <div className="flex flex-col h-full bg-[#F8FAF9] overflow-y-auto no-scrollbar select-none">
      {/* Top Header */}
      <div className="bg-[#15803d] text-white px-4 py-3 shrink-0 shadow-sm sticky top-0 z-10 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setCurrentScreen('HOME')}
            className="p-1 text-white/90 hover:text-white cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-base font-black tracking-tight">My Orders</h2>
            <p className="text-[10px] text-emerald-100 font-medium">{orders.length} Total Orders</p>
          </div>
        </div>
      </div>

      {/* Filter Tabs matching Screen 17 */}
      <div className="bg-white border-b border-slate-200 px-3 py-2 flex items-center gap-1.5 overflow-x-auto no-scrollbar sticky top-[57px] z-10 shadow-2xs">
        {tabs.map(t => {
          const isSelected = activeTab === t;
          return (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                isSelected
                  ? 'bg-[#15803d] text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {t}
            </button>
          );
        })}
      </div>

      {/* Orders List matching Screen 17 */}
      <div className="p-4 space-y-3 pb-8">
        {filteredOrders.length === 0 ? (
          <div className="p-12 text-center text-slate-400 space-y-2">
            <Package className="w-12 h-12 mx-auto text-slate-300" />
            <h4 className="font-bold text-slate-700 text-sm">No Orders Found</h4>
            <p className="text-xs text-slate-400">You don&apos;t have any {activeTab.toLowerCase()} orders at the moment.</p>
          </div>
        ) : (
          filteredOrders.map(order => {
            const isProcessing = order.status === 'Processing';
            const isDelivered = order.status === 'Delivered';
            const isCancelled = order.status === 'Cancelled';

            return (
              <div
                key={order.id}
                onClick={() => setSelectedOrderDetails(order)}
                className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs hover:shadow-md transition-all space-y-3 cursor-pointer group"
              >
                <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                  <div>
                    <span className="text-xs font-black font-mono text-slate-900">
                      #{order.id}
                    </span>
                    <p className="text-[10px] text-slate-400 font-medium mt-0.5">{order.orderDate}</p>
                  </div>

                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                      isProcessing
                        ? 'bg-amber-100 text-amber-800 border border-amber-200'
                        : isDelivered
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                        : 'bg-rose-100 text-rose-800 border border-rose-200'
                    }`}
                  >
                    {order.status}
                  </span>
                </div>

                {/* Items Thumbnails Row */}
                <div className="flex items-center gap-2">
                  {order.items.slice(0, 3).map((item, i) => (
                    <img
                      key={i}
                      src={item.image}
                      alt={item.name}
                      className="w-10 h-10 rounded-xl object-cover bg-slate-50 border border-slate-100 shrink-0"
                    />
                  ))}
                  {order.items.length > 3 && (
                    <span className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 text-slate-600 text-xs font-bold flex items-center justify-center">
                      +{order.items.length - 3}
                    </span>
                  )}
                  <div className="ml-1 text-xs text-slate-500 font-medium">
                    {order.items.length} {order.items.length === 1 ? 'Item' : 'Items'}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Total Amount</span>
                    <div className="font-black text-slate-900 text-sm">₹{order.totalAmount}</div>
                  </div>

                  <div className="flex items-center gap-2">
                    {isProcessing && (
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          if (window.confirm(`Are you sure you want to cancel order #${order.id}?`)) {
                            cancelOrder(order.id);
                          }
                        }}
                        className="px-2.5 py-1 text-rose-600 hover:bg-rose-50 rounded-lg text-xs font-bold border border-rose-200 cursor-pointer"
                      >
                        Cancel
                      </button>
                    )}
                    <span className="text-emerald-700 font-bold flex items-center gap-0.5 text-xs group-hover:translate-x-0.5 transition-transform">
                      <span>Details</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Order Details Drawer Modal */}
      {selectedOrderDetails && (
        <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex justify-end animate-fadeIn">
          <div className="w-full max-w-sm bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto animate-slideLeft">
            <div className="p-4 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div>
                  <h3 className="font-black text-sm text-slate-900">Order #{selectedOrderDetails.id}</h3>
                  <p className="text-[10px] text-slate-400">{selectedOrderDetails.orderDate}</p>
                </div>
                <button
                  onClick={() => setSelectedOrderDetails(null)}
                  className="text-slate-400 hover:text-slate-600 p-1"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
              </div>

              {/* Status Banner */}
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <p className="font-bold text-xs text-emerald-950">{selectedOrderDetails.status}</p>
                  <p className="text-[10px] text-emerald-700">{selectedOrderDetails.estimatedDelivery}</p>
                </div>
              </div>

              {/* Items */}
              <div className="space-y-2">
                <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">Ordered Items</h4>
                {selectedOrderDetails.items.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs p-2 bg-slate-50 rounded-xl">
                    <div className="flex items-center gap-2">
                      <img src={item.image} alt={item.name} className="w-9 h-9 rounded-lg object-cover" />
                      <div>
                        <p className="font-bold text-slate-900">{item.name}</p>
                        <p className="text-[10px] text-slate-400">{item.quantity} x ₹{item.price}</p>
                      </div>
                    </div>
                    <span className="font-bold text-slate-900">₹{item.quantity * item.price}</span>
                  </div>
                ))}
              </div>

              {/* Delivery Address */}
              <div className="space-y-1 bg-slate-50 p-3 rounded-2xl border border-slate-100 text-xs">
                <h4 className="font-bold text-slate-700 uppercase tracking-wider text-[10px]">Delivery Location</h4>
                <p className="font-semibold text-slate-900">{selectedOrderDetails.deliveryAddress?.flat}</p>
                <p className="text-[10px] text-slate-500">{selectedOrderDetails.deliveryAddress?.area}, {selectedOrderDetails.deliveryAddress?.city}</p>
              </div>
            </div>

            <div className="p-4 border-t border-slate-200 bg-slate-50">
              <button
                onClick={() => setSelectedOrderDetails(null)}
                className="w-full py-3 bg-[#15803d] text-white font-bold text-xs rounded-xl"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
