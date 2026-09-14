import React from 'react';
import { X, Bell, CheckCheck, Clock, Trash2, ArrowRight, CheckCircle2, ShoppingBag, Building2, AlertCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const NotificationsDrawer: React.FC = () => {
  const {
    isNotificationsOpen,
    setIsNotificationsOpen,
    notifications,
    markNotificationsAsRead,
    markNotificationAsRead,
    deleteNotification,
    clearAllNotifications,
    setActiveTab
  } = useApp();

  if (!isNotificationsOpen) return null;

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleNotificationClick = (n: any) => {
    markNotificationAsRead(n.id);
    const titleLower = (n.title || '').toLowerCase();
    const messageLower = (n.message || n.subtitle || '').toLowerCase();

    if (titleLower.includes('order') || messageLower.includes('order')) {
      setActiveTab('Orders');
      setIsNotificationsOpen(false);
    } else if (titleLower.includes('hotel') || messageLower.includes('hotel')) {
      setActiveTab('Hotels');
      setIsNotificationsOpen(false);
    } else if (titleLower.includes('joiner') || messageLower.includes('joiner') || titleLower.includes('commission')) {
      setActiveTab('Hotel Joiners');
      setIsNotificationsOpen(false);
    }
  };

  const getCategoryIcon = (category?: string, title?: string) => {
    const text = `${category || ''} ${title || ''}`.toLowerCase();
    if (text.includes('order')) return <ShoppingBag className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />;
    if (text.includes('hotel')) return <Building2 className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />;
    if (text.includes('alert') || text.includes('failed')) return <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />;
    return <Bell className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />;
  };

  return (
    <div
      className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex justify-end animate-in fade-in duration-200"
      onClick={() => setIsNotificationsOpen(false)}
    >
      <div
        className="bg-white w-full max-w-sm sm:max-w-md h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300 border-l border-slate-200"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div>
          <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <Bell className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm text-slate-800">Admin Notifications</h3>
                  {unreadCount > 0 && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-rose-500 text-white">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-500">Live operational events & alerts</p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              {unreadCount > 0 && (
                <button
                  onClick={markNotificationsAsRead}
                  title="Mark all as read"
                  className="px-2.5 py-1 text-xs text-emerald-700 hover:bg-emerald-100/70 rounded-lg font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <CheckCheck className="w-3.5 h-3.5" /> Read all
                </button>
              )}
              {notifications.length > 0 && (
                <button
                  onClick={() => {
                    if (confirm('Clear all notifications?')) {
                      clearAllNotifications();
                    }
                  }}
                  title="Clear all notifications"
                  className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={() => setIsNotificationsOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 cursor-pointer transition-colors"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* List of Notifications */}
          <div className="p-3 space-y-2 overflow-y-auto max-h-[calc(100vh-140px)]">
            {notifications.length === 0 ? (
              <div className="py-20 px-4 text-center flex flex-col items-center justify-center space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center">
                  <CheckCircle2 className="w-7 h-7 text-emerald-500" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-800">All Caught Up!</h4>
                  <p className="text-xs text-slate-500 mt-0.5 max-w-xs">
                    No active notifications. New orders, hotel sign-ups, and driver updates will appear here automatically.
                  </p>
                </div>
              </div>
            ) : (
              notifications.map(n => (
                <div
                  key={n.id}
                  onClick={() => handleNotificationClick(n)}
                  className={`p-3 rounded-xl border text-xs transition-all relative group cursor-pointer ${
                    !n.read
                      ? 'bg-emerald-50/60 border-emerald-200 hover:border-emerald-300'
                      : 'bg-white border-slate-100 hover:bg-slate-50/80'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    {getCategoryIcon(n.category, n.title)}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-0.5">
                        <h4 className="font-bold text-slate-900 truncate flex items-center gap-1.5">
                          {!n.read && <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0" />}
                          {n.title}
                        </h4>
                        <span className="text-[10px] text-slate-400 flex items-center gap-1 shrink-0">
                          <Clock className="w-3 h-3" /> {n.time || n.dateTime || 'Just now'}
                        </span>
                      </div>

                      <p className="text-slate-600 leading-snug break-words">
                        {n.message || n.subtitle || 'Operational alert received.'}
                      </p>

                      <div className="mt-2 flex items-center justify-between text-[10px]">
                        <span className="px-2 py-0.5 rounded-md font-semibold bg-slate-100 text-slate-600">
                          {n.userType || n.category || 'All Users'}
                        </span>

                        <div className="flex items-center gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
                          {!n.read && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                markNotificationAsRead(n.id);
                              }}
                              className="text-emerald-700 hover:underline font-bold"
                            >
                              Mark read
                            </button>
                          )}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteNotification(n.id);
                            }}
                            className="text-slate-400 hover:text-rose-600 p-0.5 rounded"
                            title="Delete"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Footer Link */}
        <div className="p-3 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <span className="text-[11px] text-slate-500 font-medium">
            {notifications.length} total notifications
          </span>
          <button
            onClick={() => {
              setActiveTab('Notifications');
              setIsNotificationsOpen(false);
            }}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 cursor-pointer transition-colors"
          >
            Notification Center <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
