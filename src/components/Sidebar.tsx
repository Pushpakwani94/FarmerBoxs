import React from 'react';
import {
  LayoutDashboard,
  MapPin,
  Users,
  Building2,
  ShoppingBag,
  Truck,
  Package,
  CircleDollarSign,
  CreditCard,
  BarChart3,
  Bell,
  Settings,
  LogOut,
  Sprout,
  Smartphone,
  User
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab, notifications, setIsNotificationsOpen } = useApp();

  const menuItems = [
    { id: 'Dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'Joiner Mobile App', label: 'Joiner App Management', icon: Smartphone, tag: 'APK' },
    { id: 'Zones', label: 'Zones', icon: MapPin },
    { id: 'Hotel Joiners', label: 'Hotel Joiners', icon: Users },
    { id: 'Hotels', label: 'Hotels', icon: Building2 },
    { id: 'Orders', label: 'Orders', icon: ShoppingBag },
    { id: 'Delivery Drivers', label: 'Delivery Drivers', icon: Truck },
    { id: 'Products / Inventory', label: 'Products / Inventory', icon: Package },
    { id: 'Joiner Commission', label: 'Joiner Commission', icon: CircleDollarSign },
    { id: 'Payments', label: 'Payments', icon: CreditCard },
    { id: 'Reports', label: 'Reports', icon: BarChart3 },
    { id: 'Notifications', label: 'Notifications', icon: Bell, badge: 5 },
    { id: 'Settings', label: 'Settings', icon: Settings },
    { id: 'Profile', label: 'My Profile', icon: User },
    { id: 'Logout', label: 'Logout', icon: LogOut }
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200/80 flex flex-col h-screen select-none flex-shrink-0 overflow-y-auto z-20">
      <div>
        {/* Brand Header with solid green background */}
        <div className="bg-[#15803d] px-5 py-4 flex items-center gap-3 text-white">
          <div className="w-10 h-10 flex items-center justify-center flex-shrink-0 text-[#86efac]">
            <Sprout className="w-8 h-8 fill-[#86efac]" />
          </div>
          <div>
            <h1 className="font-extrabold text-xl text-white tracking-tight leading-none">FarmerBox</h1>
            <p className="text-[11px] text-green-100/90 font-medium mt-1">Fresh from Farmers to Hotels</p>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="p-3 space-y-1.5">
          {menuItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id || (item.id === 'Dashboard' && activeTab === 'Dashboard');
            return (
              <button
                key={item.id}
                onClick={() => {
                  if (item.id === 'Notifications') {
                    setIsNotificationsOpen(true);
                  } else if (item.id === 'Logout') {
                    alert('Logged out successfully');
                  } else {
                    setActiveTab(item.id);
                  }
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-[13.5px] font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#16a34a] text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  {(item as any).tag && (
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider ${
                      isActive ? 'bg-white/25 text-white' : 'bg-emerald-100 text-[#15803d]'
                    }`}>
                      {(item as any).tag}
                    </span>
                  )}
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-extrabold flex items-center justify-center shadow-2xs">
                      {item.badge}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};
