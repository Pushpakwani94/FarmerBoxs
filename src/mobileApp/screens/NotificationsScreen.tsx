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
  CheckCircle2,
  Trash2,
  Clock,
  Plus
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
    addNotification,
    clearNotifications
  } = useJoinerApp();

  const [activeFilter, setActiveFilter] = useState<'All' | 'Orders' | 'Hotels' | 'Commission'>('All');
  const [soundTestPlaying, setSoundTestPlaying] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const filterTabs = ['All', 'Orders', 'Hotels', 'Commission'];

  const filteredNotifications = notifications.filter(n => {
    if (activeFilter === 'All') return true;
    return n.category === activeFilter;
  });

  const handleTestSound = (type: 'notification' | 'commission' = 'notification') => {
    setSoundTestPlaying(true);
    playNotificationSound(type);
    setToastMsg(type === 'commission' ? '🔔 Commission chime played!' : '🔔 Notification bell chime played!');
    setTimeout(() => {
      setSoundTestPlaying(false);
      setToastMsg('');
    }, 1800);
  };

  const handleSimulateNewNotification = () => {
    const randomHotels = ['Hotel Spice Villa', 'Hotel Sayaji', 'Hotel Green Leaf', 'Hotel Radisson Blu', 'Hotel Grand Pune'];
    const randomAmounts = [450, 780, 1200, 1650, 2300];
    const hotel = randomHotels[Math.floor(Math.random() * randomHotels.length)];
    const amount = randomAmounts[Math.floor(Math.random() * randomAmounts.length)];

    addNotification({
      title: 'New Order Received! 🥦',
      subtitle: `${hotel} placed order for ₹${amount}`,
      time: 'Just now',
      category: 'Orders',
      iconType: 'order'
    });

    setToastMsg(`🔔 New order alert arrived for ${hotel}!`);
    setTimeout(() => setToastMsg(''), 2200);
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
      {/* Toast Alert Banner */}
      {toastMsg && (
        <div className="absolute top-2 left-4 right-4 z-50 p-2.5 bg-[#15803d] text-white text-xs font-bold rounded-xl shadow-lg flex items-center justify-between animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 animate-bounce" />
            <span>{toastMsg}</span>
          </div>
          <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-md">Sound Active</span>
        </div>
      )}

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
                handleTestSound('notification');
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

        {/* Notification Sound & Test Banner */}
        <div className="bg-gradient-to-r from-[#15803d] to-[#16a34a] rounded-2xl p-3.5 text-white shadow-sm space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center backdrop-blur-xs">
                <Volume2 className={`w-4 h-4 ${soundTestPlaying ? 'animate-pulse text-yellow-300' : ''}`} />
              </div>
              <div>
                <h4 className="text-xs font-black leading-tight">Live Audio Alerts</h4>
                <p className="text-[10px] text-emerald-100 font-medium">Chimes play on new orders & payouts</p>
              </div>
            </div>

            <span className="text-[10px] bg-emerald-900/50 text-emerald-200 font-bold px-2 py-0.5 rounded-md">
              HD Audio
            </span>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={() => handleTestSound('notification')}
              className="flex-1 py-1.5 bg-white text-[#15803d] hover:bg-emerald-50 text-[11px] font-black rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1 cursor-pointer"
            >
              🔔 Test Bell Chime
            </button>

            <button
              onClick={() => handleTestSound('commission')}
              className="flex-1 py-1.5 bg-white/15 hover:bg-white/25 text-white text-[11px] font-bold rounded-xl transition-colors flex items-center justify-center gap-1 cursor-pointer"
            >
              💰 Test Cash Sound
            </button>

            <button
              onClick={handleSimulateNewNotification}
              className="p-1.5 bg-emerald-800/80 hover:bg-emerald-900 text-white rounded-xl transition-colors cursor-pointer"
              title="Simulate incoming order"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Filter Tabs & Clear Action */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
            {filterTabs.map(tab => (
              <button
                key={tab}
                onClick={() => {
                  setActiveFilter(tab as any);
                  playNotificationSound('pop');
                }}
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

          {notifications.length > 0 && (
            <button
              onClick={clearNotifications}
              className="text-[10.5px] font-bold text-slate-400 hover:text-rose-600 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <Trash2 className="w-3 h-3" /> Clear
            </button>
          )}
        </div>

        {/* Notifications List */}
        <div className="space-y-2 pt-1">
          {filteredNotifications.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-2xl border border-slate-200/80 space-y-2">
              <Bell className="w-8 h-8 text-slate-300 mx-auto" />
              <h4 className="text-xs font-bold text-slate-700">No notifications here</h4>
              <p className="text-[10.5px] text-slate-400">You're all caught up for today!</p>
              <button
                onClick={handleSimulateNewNotification}
                className="mt-2 px-3 py-1.5 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-xl border border-emerald-200 cursor-pointer"
              >
                + Trigger Test Alert
              </button>
            </div>
          ) : (
            filteredNotifications.map(item => (
              <div
                key={item.id}
                onClick={() => handleTestSound('notification')}
                className="bg-white p-3.5 rounded-2xl border border-slate-200/80 flex items-start justify-between gap-3 shadow-2xs hover:border-emerald-300 transition-all cursor-pointer active:scale-[0.99]"
              >
                <div className="flex items-start gap-3 min-w-0">
                  {getIcon(item.iconType)}
                  <div className="min-w-0">
                    <h4 className="font-extrabold text-slate-900 text-xs leading-tight">
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-slate-600 font-medium mt-0.5 truncate">
                      {item.subtitle}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 uppercase">
                        {item.category}
                      </span>
                      <span className="text-[10px] text-emerald-700 font-bold flex items-center gap-0.5">
                        <Volume2 className="w-2.5 h-2.5" /> Chime
                      </span>
                    </div>
                  </div>
                </div>

                <span className="text-[10px] font-semibold text-slate-400 whitespace-nowrap flex-shrink-0 mt-0.5">
                  {item.time}
                </span>
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
