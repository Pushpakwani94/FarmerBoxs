import React, { useState } from 'react';
import { Search, Bell, Menu, Calendar, X, Building2, ShoppingBag, Users, Download, Smartphone } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ApkDownloadModal } from './Modals/ApkDownloadModal';
import { FirebaseStatusBadge } from './FirebaseStatusBadge';

export const Header: React.FC = () => {
  const {
    setIsNotificationsOpen,
    activeTab,
    setActiveTab,
    hotels,
    orders,
    joiners,
    setSelectedOrder,
    setSelectedJoiner,
    setSelectedHotel,
    adminProfile,
    setIsAdminProfileOpen
  } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isApkModalOpen, setIsApkModalOpen] = useState(false);

  const trimmed = searchQuery.trim().toLowerCase();
  const matchingHotels = trimmed ? hotels.filter(h => h.name.toLowerCase().includes(trimmed) || h.zone.toLowerCase().includes(trimmed)).slice(0, 3) : [];
  const matchingOrders = trimmed ? orders.filter(o => o.id.toLowerCase().includes(trimmed) || o.hotelName.toLowerCase().includes(trimmed)).slice(0, 3) : [];
  const matchingJoiners = trimmed ? joiners.filter(j => j.name.toLowerCase().includes(trimmed) || j.zone.toLowerCase().includes(trimmed)).slice(0, 3) : [];

  const hasResults = matchingHotels.length > 0 || matchingOrders.length > 0 || matchingJoiners.length > 0;

  return (
    <header className="bg-white border-b border-slate-200/80 px-6 py-3 flex items-center justify-between sticky top-0 z-20">
      {/* Left: Hamburger & Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setActiveTab('Dashboard')}
          className="text-slate-600 hover:text-slate-900 p-1.5 rounded-lg hover:bg-slate-100 cursor-pointer"
          title="Toggle Navigation / Return to Dashboard"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div>
          <h2 className="text-base font-bold text-slate-900 tracking-tight">
            {activeTab === 'Dashboard' ? 'Admin Dashboard' : `${activeTab} Management`}
          </h2>
          <p className="text-[11px] text-slate-500 font-normal leading-tight">
            Manage hotels, joiners, orders and deliver fresh vegetables
          </p>
        </div>
      </div>

      {/* Right: Search, Notifications, Profile, Date */}
      <div className="flex items-center gap-4">
        {/* Search Bar with live search dropdown */}
        <div className="relative hidden md:block w-72">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => {
              setSearchQuery(e.target.value);
              setIsSearchOpen(true);
            }}
            onFocus={() => setIsSearchOpen(true)}
            placeholder="Search hotels, orders, joiners..."
            className="w-full pl-8 pr-7 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-full focus:outline-none focus:ring-1 focus:ring-emerald-600 focus:bg-white placeholder:text-slate-400"
          />
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery('');
                setIsSearchOpen(false);
              }}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X className="w-3 h-3" />
            </button>
          )}

          {/* Search Results Dropdown */}
          {isSearchOpen && trimmed && (
            <div className="absolute left-0 right-0 top-full mt-1.5 bg-white border border-slate-200 rounded-xl shadow-xl z-50 p-2 max-h-80 overflow-y-auto">
              {!hasResults ? (
                <div className="p-3 text-center text-xs text-slate-500">No matching hotels, orders or joiners found</div>
              ) : (
                <div className="space-y-2">
                  {matchingOrders.length > 0 && (
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1">Orders</p>
                      {matchingOrders.map(o => (
                        <div
                          key={o.id}
                          onClick={() => {
                            setSelectedOrder(o);
                            setIsSearchOpen(false);
                            setSearchQuery('');
                          }}
                          className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 cursor-pointer text-xs"
                        >
                          <div className="flex items-center gap-2">
                            <ShoppingBag className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="font-bold text-slate-800">{o.id}</span>
                            <span className="text-slate-600">({o.hotelName})</span>
                          </div>
                          <span className="text-emerald-700 font-bold">₹{o.amount}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {matchingHotels.length > 0 && (
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1">Hotels</p>
                      {matchingHotels.map(h => (
                        <div
                          key={h.id}
                          onClick={() => {
                            setSelectedHotel(h);
                            setActiveTab('Hotels');
                            setIsSearchOpen(false);
                            setSearchQuery('');
                          }}
                          className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 cursor-pointer text-xs"
                        >
                          <div className="flex items-center gap-2">
                            <Building2 className="w-3.5 h-3.5 text-blue-600" />
                            <span className="font-semibold text-slate-800">{h.name}</span>
                          </div>
                          <span className="text-slate-500 text-[11px]">{h.zone}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {matchingJoiners.length > 0 && (
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1">Joiners</p>
                      {matchingJoiners.map(j => (
                        <div
                          key={j.id}
                          onClick={() => {
                            setSelectedJoiner(j);
                            setActiveTab('Hotel Joiners');
                            setIsSearchOpen(false);
                            setSearchQuery('');
                          }}
                          className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 cursor-pointer text-xs"
                        >
                          <div className="flex items-center gap-2">
                            <Users className="w-3.5 h-3.5 text-orange-600" />
                            <span className="font-semibold text-slate-800">{j.name}</span>
                          </div>
                          <span className="text-slate-500 text-[11px]">{j.zone}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Firebase Cloud Database Status */}
        <FirebaseStatusBadge />

        {/* Quick APK Download Action */}
        <button
          onClick={() => setIsApkModalOpen(true)}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-[#15803d] to-[#16a34a] hover:from-[#166534] hover:to-[#15803d] text-white text-xs font-extrabold rounded-xl shadow-xs transition-all cursor-pointer transform hover:scale-102"
          title="Download Joiner Android App APK (v2.4.1)"
        >
          <Smartphone className="w-3.5 h-3.5 text-emerald-200" />
          <span>Get Joiner APK</span>
          <span className="px-1.5 py-0.2 bg-white/20 rounded text-[9px] font-black uppercase">
            v2.4
          </span>
        </button>

        {/* Notification Bell */}
        <button
          onClick={() => setIsNotificationsOpen(true)}
          className="relative p-1.5 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
          title="Open Notifications"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-0.5 right-0.5 w-4 h-4 bg-rose-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center border-2 border-white">
            5
          </span>
        </button>

        {/* Admin Profile */}
        <div
          onClick={() => setIsAdminProfileOpen(true)}
          className="flex items-center gap-2.5 cursor-pointer p-1.5 rounded-xl hover:bg-emerald-50 border border-transparent hover:border-emerald-200 transition-all"
          title="Open Admin Profile Settings"
        >
          <div className="relative">
            <img
              src={adminProfile.avatar}
              alt={adminProfile.name}
              className="w-8 h-8 rounded-full object-cover border border-emerald-600 shadow-2xs"
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full"></span>
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-xs font-bold text-slate-800 leading-tight">{adminProfile.name}</p>
            <p className="text-[10px] text-emerald-700 font-semibold leading-tight">{adminProfile.role}</p>
          </div>
        </div>

        {/* Date Display */}
        <div className="hidden lg:flex items-center gap-1.5 text-[11px] text-slate-500 font-medium bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-md">
          <Calendar className="w-3.5 h-3.5 text-slate-400" />
          <span>Thu, 11 Sep 2026</span>
        </div>
      </div>

      {/* APK Download & QR Scan Modal */}
      <ApkDownloadModal isOpen={isApkModalOpen} onClose={() => setIsApkModalOpen(false)} />
    </header>
  );
};
