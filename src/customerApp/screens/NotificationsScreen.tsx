import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Bell, 
  Package, 
  Tag, 
  Sparkles, 
  Clock, 
  CheckCheck, 
  Trash2,
  ChevronRight,
  ShoppingBag
} from 'lucide-react';
import { useCustomerApp } from '../CustomerAppContext';

export const NotificationsScreen: React.FC = () => {
  const { navigateTo, orders } = useCustomerApp();
  const [activeTab, setActiveTab] = useState<'all' | 'orders' | 'offers'>('all');

  const notifications = [
    {
      id: 'notif-1',
      type: 'order',
      title: 'Order Out for Delivery! 🚚',
      message: 'Your fresh produce box (Order #FB-8842) is on the way with driver Ramesh Kumar.',
      time: '10 mins ago',
      read: false,
      tag: 'Order Update',
      actionScreen: 'my-orders' as const,
    },
    {
      id: 'notif-2',
      type: 'offer',
      title: '⚡ 40% OFF Flash Deal',
      message: 'Grab fresh Himachal Royal Gala Apples and Custard Apples at flat 40% discount today only!',
      time: '2 hours ago',
      read: false,
      tag: 'Flash Sale',
      actionScreen: 'offers' as const,
    },
    {
      id: 'notif-3',
      type: 'order',
      title: 'Order Confirmed 🎉',
      message: 'We have received your order #FB-8842. Farm harvesting has begun.',
      time: '4 hours ago',
      read: true,
      tag: 'Order',
      actionScreen: 'my-orders' as const,
    },
    {
      id: 'notif-4',
      type: 'offer',
      title: '₹100 Cashback Added 💰',
      message: 'Weekend harvest bonus ₹100 has been credited to your FarmerBox Wallet.',
      time: '1 day ago',
      read: true,
      tag: 'Wallet',
      actionScreen: 'wallet' as const,
    },
    {
      id: 'notif-5',
      type: 'offer',
      title: 'Hydroponic Salad Greens Restocked 🌱',
      message: 'Crisp iceberg lettuce, baby spinach, and cherry tomatoes harvested this morning.',
      time: '2 days ago',
      read: true,
      tag: 'Fresh Arrival',
      actionScreen: 'product-listing' as const,
    }
  ];

  const filteredNotifs = notifications.filter(n => {
    if (activeTab === 'orders') return n.type === 'order';
    if (activeTab === 'offers') return n.type === 'offer';
    return true;
  });

  return (
    <div className="min-h-full bg-slate-50 flex flex-col pb-24">
      {/* Header */}
      <div className="bg-white sticky top-0 z-20 border-b border-slate-100 shadow-sm px-4 pt-12 pb-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigateTo('home')}
            className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 hover:bg-slate-200 active:scale-95 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-lg font-bold text-slate-900">Notifications</h1>
            <p className="text-xs text-slate-500">Stay updated on your fresh orders & deals</p>
          </div>
        </div>

        <button 
          onClick={() => alert('All marked as read')}
          className="text-xs font-semibold text-emerald-600 flex items-center gap-1 hover:text-emerald-700"
        >
          <CheckCheck className="w-3.5 h-3.5" />
          Mark Read
        </button>
      </div>

      {/* Tabs */}
      <div className="bg-white px-4 py-2 border-b border-slate-100 flex gap-2">
        <button
          onClick={() => setActiveTab('all')}
          className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
            activeTab === 'all'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          All (5)
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'orders'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          <Package className="w-3 h-3" />
          Orders (2)
        </button>
        <button
          onClick={() => setActiveTab('offers')}
          className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'offers'
              ? 'bg-emerald-600 text-white shadow-sm'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          <Tag className="w-3 h-3" />
          Deals (3)
        </button>
      </div>

      {/* List */}
      <div className="p-4 space-y-3 flex-1">
        {filteredNotifs.map((item) => (
          <div
            key={item.id}
            onClick={() => navigateTo(item.actionScreen)}
            className={`p-3.5 rounded-2xl border transition-all cursor-pointer active:scale-[0.99] ${
              !item.read
                ? 'bg-emerald-50/60 border-emerald-200/80 shadow-xs'
                : 'bg-white border-slate-100 hover:border-slate-200 shadow-xs'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                item.type === 'order'
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'bg-amber-100 text-amber-700'
              }`}>
                {item.type === 'order' ? (
                  <Package className="w-5 h-5" />
                ) : (
                  <Sparkles className="w-5 h-5" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-0.5">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                    item.type === 'order' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {item.tag}
                  </span>
                  <span className="text-[10px] text-slate-400 flex items-center gap-1">
                    <Clock className="w-2.5 h-2.5" />
                    {item.time}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-slate-900 mt-1 leading-snug">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed line-clamp-2">
                  {item.message}
                </p>

                <div className="mt-2.5 flex items-center justify-between pt-2 border-t border-slate-100/80">
                  <span className="text-[11px] font-bold text-emerald-700 flex items-center gap-1">
                    View Details
                    <ChevronRight className="w-3 h-3" />
                  </span>
                  {!item.read && (
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
