import React, { useState } from 'react';
import {
  ArrowLeft,
  ShoppingBag,
  Building2,
  CircleDollarSign,
  Package,
  Info,
  Volume2,
  VolumeX,
  Bell,
  Sparkles,
  Trash2,
  ArrowRight
} from 'lucide-react';
import { useJoinerApp } from '../JoinerAppContext';
import type { MobileNotification } from '../JoinerAppContext';
import { MobileBottomNav } from '../components/MobileBottomNav';

export const NotificationsScreen: React.FC = () => {
  const {
    notifications,
    setCurrentScreen,
    soundEnabled,
    setSoundEnabled,
    playNotificationSound,
    clearNotifications,
    setIsUpdateModalOpen,
    markNotificationsRead
  } = useJoinerApp();

  React.useEffect(() => {
    markNotificationsRead();
  }, [markNotificationsRead]);

  const [activeFilter, setActiveFilter] = useState<'All' | 'Orders' | 'Hotels' | 'Commission' | 'System'>('All');

  const filterTabs: Array<'All' | 'Orders' | 'Hotels' | 'Commission' | 'System'> = [
    'All',
    'Orders',
    'Hotels',
    'Commission',
    'System'
  ];

  const getCategoryCount = (cat: 'All' | 'Orders' | 'Hotels' | 'Commission' | 'System') => {
    if (cat === 'All') return notifications.length;
    return notifications.filter(n => n.category === cat).length;
  };

  const filteredNotifications = notifications.filter(n => {
    if (activeFilter === 'All') return true;
    return n.category === activeFilter;
  });

  const handleNotificationClick = (item: MobileNotification) => {
    const isUpdateNotif = Boolean(item.hasUpdateFile || item.isAppUpdate);
    if (isUpdateNotif) {
      setIsUpdateModalOpen(true);
      playNotificationSound('pop');
    } else if (item.category === 'Orders' || item.iconType === 'order') {
      setCurrentScreen('MY_ORDERS');
      playNotificationSound('pop');
    } else if (item.category === 'Commission' || item.iconType === 'commission') {
      setCurrentScreen('COMMISSION');
      playNotificationSound('commission');
    } else if (item.category === 'Hotels' || item.iconType === 'hotel') {
      setCurrentScreen('MY_HOTELS');
      playNotificationSound('pop');
    } else {
      playNotificationSound('pop');
    }
  };

  const getIcon = (type: MobileNotification['iconType']) => {
    switch (type) {
      case 'order':
        return (
          <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0 border border-amber-200/60">
            <ShoppingBag className="w-4 h-4" />
          </div>
        );
      case 'hotel':
        return (
          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center flex-shrink-0 border border-emerald-200/60">
            <Building2 className="w-4 h-4" />
          </div>
        );
      case 'commission':
        return (
          <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center flex-shrink-0 border border-purple-200/60">
            <CircleDollarSign className="w-4 h-4" />
          </div>
        );
      case 'product':
        return (
          <div className="w-9 h-9 rounded-xl bg-cyan-50 text-cyan-700 flex items-center justify-center flex-shrink-0 border border-cyan-200/60">
            <Package className="w-4 h-4" />
          </div>
        );
      default:
        return (
          <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 border border-blue-200/60">
            <Info className="w-4 h-4" />
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 justify-between select-none relative">
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5 pb-6">
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentScreen('DASHBOARD')}
              className="p-1 -ml-1 text-slate-700 hover:text-slate-900 cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h2 className="text-base font-extrabold text-slate-900">Notifications</h2>
            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black">
              {notifications.length}
            </span>
          </div>

          {/* Sound Toggle Control */}
          <button
            onClick={() => {
              setSoundEnabled(!soundEnabled);
              if (!soundEnabled) {
                playNotificationSound('pop');
              }
            }}
            className={`px-2.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs ${
              soundEnabled
                ? 'bg-emerald-50 text-[#15803d] border border-emerald-200'
                : 'bg-slate-200 text-slate-500 border border-slate-300'
            }`}
            title={soundEnabled ? 'Mute sound' : 'Enable sound'}
          >
            {soundEnabled ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-[#15803d]" />
                <span className="text-[11px]">Sound ON</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-slate-500" />
                <span className="text-[11px]">Muted</span>
              </>
            )}
          </button>
        </div>

        {/* Filter Tabs & Clear Action */}
        <div className="flex items-center justify-between pt-0.5">
          <div className="flex items-center gap-1 overflow-x-auto text-xs no-scrollbar py-0.5">
            {filterTabs.map(tab => {
              const count = getCategoryCount(tab);
              return (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveFilter(tab);
                    playNotificationSound('pop');
                  }}
                  className={`px-2.5 py-1 rounded-lg text-[10.5px] font-bold whitespace-nowrap transition-colors cursor-pointer flex items-center gap-1 ${
                    activeFilter === tab
                      ? 'bg-[#15803d] text-white shadow-2xs'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span>{tab}</span>
                  <span className={`text-[9px] px-1 py-0.1 rounded-full font-extrabold ${
                    activeFilter === tab ? 'bg-white/25 text-white' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {notifications.length > 0 && (
            <button
              onClick={clearNotifications}
              className="text-[10.5px] font-bold text-slate-400 hover:text-rose-600 flex items-center gap-1 transition-colors cursor-pointer flex-shrink-0 ml-1"
            >
              <Trash2 className="w-3 h-3" /> Clear
            </button>
          )}
        </div>

        {/* Notifications List */}
        <div className="space-y-2 pt-0.5">
          {filteredNotifications.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-2xl border border-slate-200/80 space-y-2">
              <Bell className="w-8 h-8 text-slate-300 mx-auto" />
              <h4 className="text-xs font-bold text-slate-700">No notifications in {activeFilter}</h4>
              <p className="text-[10.5px] text-slate-400">You're all caught up for today!</p>
            </div>
          ) : (
            filteredNotifications.map(item => {
              const isUpdateNotif = Boolean(item.hasUpdateFile || item.isAppUpdate);

              return (
                <div
                  key={item.id}
                  onClick={() => handleNotificationClick(item)}
                  className={`bg-white p-3.5 rounded-2xl border transition-all cursor-pointer active:scale-[0.99] shadow-2xs group ${
                    isUpdateNotif
                      ? 'border-emerald-300 bg-gradient-to-r from-emerald-50/40 via-white to-teal-50/30 hover:border-emerald-400'
                      : 'border-slate-200/80 hover:border-emerald-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 min-w-0">
                      {getIcon(item.iconType)}
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <h4 className="font-extrabold text-slate-900 text-xs leading-tight">
                            {item.title}
                          </h4>
                          {isUpdateNotif && (
                            <span className="px-1.5 py-0.2 bg-amber-400 text-slate-900 font-extrabold text-[8.5px] rounded-md">
                              NEW
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-600 font-medium mt-0.5">
                          {item.subtitle}
                        </p>
                        <div className="flex items-center gap-2 mt-1.5">
                          <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 uppercase">
                            {item.category}
                          </span>
                          <span className="text-[9.5px] text-slate-400 font-semibold group-hover:text-emerald-700 flex items-center gap-0.5 transition-colors">
                            Tap to view <ArrowRight className="w-2.5 h-2.5" />
                          </span>
                        </div>
                      </div>
                    </div>

                    <span className="text-[10px] font-semibold text-slate-400 whitespace-nowrap flex-shrink-0 mt-0.5">
                      {item.time}
                    </span>
                  </div>

                  {isUpdateNotif && (
                    <div className="mt-2.5 pt-2 border-t border-emerald-100 flex items-center justify-between">
                      <span className="text-[10px] text-emerald-800 font-bold">
                        Fast direct APK installation
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsUpdateModalOpen(true);
                          playNotificationSound('pop');
                        }}
                        className="px-2.5 py-1 bg-[#15803d] hover:bg-[#166534] text-white text-[11px] font-extrabold rounded-lg shadow-xs flex items-center gap-1 cursor-pointer"
                      >
                        <Sparkles className="w-3 h-3 text-yellow-300" />
                        <span>Update App</span>
                      </button>
                    </div>
                  )}
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


