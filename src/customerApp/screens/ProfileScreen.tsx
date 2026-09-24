import React, { useState } from 'react';
import { 
  User, 
  MapPin, 
  Wallet, 
  Package, 
  Heart, 
  Tag, 
  Gift, 
  Bell, 
  HelpCircle, 
  Settings, 
  LogOut, 
  ChevronRight, 
  ShieldCheck, 
  Award,
  Sparkles,
  Edit2,
  Phone,
  Mail,
  Share2
} from 'lucide-react';
import { useCustomerApp } from '../CustomerAppContext';

export const ProfileScreen: React.FC = () => {
  const { 
    user, 
    walletBalance, 
    orders, 
    wishlist, 
    navigateTo, 
    logout 
  } = useCustomerApp();

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const menuSections = [
    {
      title: 'Orders & Payments',
      items: [
        {
          icon: Package,
          label: 'My Orders',
          sub: `${orders.length} orders placed`,
          action: () => navigateTo('my-orders'),
          badge: orders.length > 0 ? `${orders.length}` : undefined,
          color: 'bg-emerald-100 text-emerald-700',
        },
        {
          icon: Wallet,
          label: 'FarmerBox Wallet',
          sub: `₹${walletBalance} Available Balance`,
          action: () => navigateTo('wallet'),
          badge: '₹' + walletBalance,
          badgeGreen: true,
          color: 'bg-amber-100 text-amber-700',
        },
        {
          icon: Heart,
          label: 'My Wishlist',
          sub: `${wishlist.length} saved favorites`,
          action: () => navigateTo('wishlist'),
          badge: wishlist.length > 0 ? `${wishlist.length}` : undefined,
          color: 'bg-rose-100 text-rose-700',
        },
        {
          icon: MapPin,
          label: 'Saved Addresses',
          sub: 'Home, Office & others',
          action: () => navigateTo('address-selection'),
          color: 'bg-blue-100 text-blue-700',
        },
      ]
    },
    {
      title: 'Discounts & Perks',
      items: [
        {
          icon: Tag,
          label: 'Offers & Coupons',
          sub: 'Save flat 20% & farm freebies',
          action: () => navigateTo('offers'),
          badge: '2 New',
          badgeGreen: true,
          color: 'bg-purple-100 text-purple-700',
        },
        {
          icon: Gift,
          label: 'Refer & Earn ₹150',
          sub: 'Invite friends, earn farm credits',
          action: () => {
            if (navigator.share) {
              navigator.share({
                title: 'Join FarmerBox',
                text: 'Get 100% farm-fresh chemical-free produce delivered daily. Use my code FARM150 for ₹150 off!',
                url: window.location.href,
              }).catch(() => {});
            } else {
              alert('Referral Code FARM150 copied to clipboard! Share with friends to get ₹150.');
            }
          },
          badge: '₹150 Free',
          badgeGreen: true,
          color: 'bg-orange-100 text-orange-700',
        },
      ]
    },
    {
      title: 'Support & Settings',
      items: [
        {
          icon: Bell,
          label: 'Notifications',
          sub: 'Delivery alerts & deals',
          action: () => navigateTo('notifications'),
          color: 'bg-slate-100 text-slate-700',
        },
        {
          icon: HelpCircle,
          label: 'Help & 24/7 Support',
          sub: 'Live chat, FAQ & call us',
          action: () => navigateTo('help-support'),
          color: 'bg-teal-100 text-teal-700',
        },
        {
          icon: Settings,
          label: 'App Settings',
          sub: 'Language, theme & alerts',
          action: () => navigateTo('settings'),
          color: 'bg-slate-100 text-slate-700',
        },
      ]
    }
  ];

  return (
    <div className="min-h-full bg-slate-50 flex flex-col pb-28">
      {/* Profile Header Card */}
      <div className="bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 text-white pt-12 pb-6 px-4 rounded-b-[2.5rem] shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-bold tracking-wider uppercase bg-white/20 px-3 py-1 rounded-full backdrop-blur-xs flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            FarmerBox VIP Member
          </span>
          <button 
            onClick={() => navigateTo('settings')}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <Settings className="w-4 h-4 text-white" />
          </button>
        </div>

        <div className="flex items-center gap-3.5">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md border-2 border-white/40 flex items-center justify-center shadow-inner text-white font-black text-2xl">
              {user.name.charAt(0)}
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-amber-400 border-2 border-emerald-700 flex items-center justify-center text-[10px] text-amber-900 font-bold">
              ★
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-black text-white truncate">{user.name}</h2>
            <p className="text-xs text-emerald-100 flex items-center gap-1 mt-0.5">
              <Phone className="w-3 h-3" />
              {user.phone}
            </p>
            <p className="text-[11px] text-emerald-200/80 truncate">{user.email}</p>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-3 gap-2 mt-5 bg-white/10 backdrop-blur-md p-2.5 rounded-2xl border border-white/20 text-center">
          <div 
            onClick={() => navigateTo('my-orders')}
            className="cursor-pointer hover:bg-white/10 p-1 rounded-xl transition-colors"
          >
            <div className="text-base font-black text-white">{orders.length}</div>
            <div className="text-[10px] text-emerald-100 font-medium">Orders Placed</div>
          </div>
          <div 
            onClick={() => navigateTo('wallet')}
            className="cursor-pointer hover:bg-white/10 p-1 rounded-xl border-x border-white/20 transition-colors"
          >
            <div className="text-base font-black text-amber-300">₹{walletBalance}</div>
            <div className="text-[10px] text-emerald-100 font-medium">Wallet Cash</div>
          </div>
          <div 
            onClick={() => navigateTo('wishlist')}
            className="cursor-pointer hover:bg-white/10 p-1 rounded-xl transition-colors"
          >
            <div className="text-base font-black text-white">{wishlist.length}</div>
            <div className="text-[10px] text-emerald-100 font-medium">Saved Items</div>
          </div>
        </div>
      </div>

      {/* Menus */}
      <div className="p-4 space-y-4">
        {/* Farm Fresh Guarantee Banner */}
        <div className="bg-emerald-50 border border-emerald-200/80 rounded-2xl p-3.5 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <h4 className="text-xs font-bold text-emerald-950">100% Farm Fresh Pledge</h4>
            <p className="text-[11px] text-emerald-800">Harvested under 4 hours • Direct farmer payout</p>
          </div>
        </div>

        {menuSections.map((section, sIdx) => (
          <div key={sIdx} className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-xs">
            <div className="px-4 pt-3 pb-1 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              {section.title}
            </div>

            <div className="divide-y divide-slate-100">
              {section.items.map((item, iIdx) => {
                const Icon = item.icon;
                return (
                  <button
                    key={iIdx}
                    onClick={item.action}
                    className="w-full p-3.5 flex items-center gap-3 hover:bg-slate-50/80 transition-colors text-left"
                  >
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${item.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-800">{item.label}</span>
                        {item.badge && (
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            item.badgeGreen
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-slate-100 text-slate-700'
                          }`}>
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-400 truncate mt-0.5">{item.sub}</p>
                    </div>

                    <ChevronRight className="w-4 h-4 text-slate-300 shrink-0" />
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {/* Logout Button */}
        <button
          onClick={() => setShowLogoutModal(true)}
          className="w-full p-3.5 bg-white hover:bg-red-50 text-red-600 border border-slate-200 hover:border-red-200 rounded-2xl flex items-center justify-center gap-2 font-bold text-xs transition-colors shadow-xs"
        >
          <LogOut className="w-4 h-4" />
          Log Out from Account
        </button>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="absolute inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-xs w-full text-center space-y-4 shadow-2xl animate-in zoom-in-95 duration-150">
            <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mx-auto">
              <LogOut className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Are you sure?</h3>
              <p className="text-xs text-slate-500 mt-1">You will be logged out of your FarmerBox account.</p>
            </div>
            <div className="flex gap-2.5 pt-2">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 py-2.5 border border-slate-200 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowLogoutModal(false);
                  logout();
                }}
                className="flex-1 py-2.5 bg-red-600 text-white font-bold text-xs rounded-xl hover:bg-red-700 shadow-md shadow-red-200"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
