import React from 'react';
import { X, Bell, CheckCheck, Clock } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const NotificationsDrawer: React.FC = () => {
  const { isNotificationsOpen, setIsNotificationsOpen, notifications, markNotificationsAsRead } = useApp();

  if (!isNotificationsOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 flex justify-end">
      <div className="bg-white w-full max-w-sm h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
        <div>
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-emerald-700" />
              <h3 className="font-bold text-base text-slate-800">Notifications</h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={markNotificationsAsRead}
                title="Mark all as read"
                className="text-xs text-emerald-700 hover:text-emerald-900 font-medium flex items-center gap-1"
              >
                <CheckCheck className="w-4 h-4" /> Read all
              </button>
              <button
                onClick={() => setIsNotificationsOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="p-3 space-y-2 overflow-y-auto max-h-[calc(100vh-100px)]">
            {notifications.map(n => (
              <div
                key={n.id}
                className={`p-3 rounded-xl border text-xs transition-colors ${
                  !n.read ? 'bg-emerald-50/50 border-emerald-200' : 'bg-white border-slate-100'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-bold text-slate-800">{n.title}</h4>
                  <span className="text-[10px] text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {n.time}
                  </span>
                </div>
                <p className="text-slate-600 leading-snug">{n.message}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
