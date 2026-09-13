import React from 'react';
import { Home, Building2, ClipboardList, ShoppingBag, User } from 'lucide-react';
import { useJoinerApp } from '../JoinerAppContext';
import type { MobileScreen } from '../JoinerAppContext';

export const MobileBottomNav: React.FC = () => {
  const { currentScreen, setCurrentScreen } = useJoinerApp();

  const navItems = [
    {
      screen: 'DASHBOARD' as MobileScreen,
      label: 'Home',
      icon: Home,
      iconColor: 'text-[#15803d]',
      activeGradient: 'bg-gradient-to-br from-[#15803d] to-[#16a34a]'
    },
    {
      screen: 'MY_HOTELS' as MobileScreen,
      label: 'Hotels',
      icon: Building2,
      iconColor: 'text-blue-600',
      activeGradient: 'bg-gradient-to-br from-blue-600 to-indigo-600'
    },
    {
      screen: 'MY_ORDERS' as MobileScreen,
      label: 'Orders',
      icon: ClipboardList,
      iconColor: 'text-purple-600',
      activeGradient: 'bg-gradient-to-br from-purple-600 to-violet-600'
    },
    {
      screen: 'PLACE_ORDER' as MobileScreen,
      label: 'Products',
      icon: ShoppingBag,
      iconColor: 'text-teal-600',
      activeGradient: 'bg-gradient-to-br from-teal-600 to-emerald-600'
    },
    {
      screen: 'PROFILE' as MobileScreen,
      label: 'Profile',
      icon: User,
      iconColor: 'text-indigo-600',
      activeGradient: 'bg-gradient-to-br from-indigo-600 to-blue-600'
    }
  ];

  return (
    <div className="bg-white/95 backdrop-blur-md border-t-2 border-emerald-200/80 px-2 py-2 flex items-center justify-around select-none shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
      {navItems.map(item => {
        const Icon = item.icon;
        const isActive =
          currentScreen === item.screen ||
          (item.screen === 'MY_HOTELS' && currentScreen === 'ADD_HOTEL') ||
          (item.screen === 'MY_ORDERS' && (currentScreen === 'REORDER' || currentScreen === 'ORDER_SUCCESS')) ||
          (item.screen === 'PLACE_ORDER' && currentScreen === 'CART');

        return (
          <button
            key={item.label}
            onClick={() => setCurrentScreen(item.screen)}
            className={`flex flex-col items-center justify-center transition-all cursor-pointer rounded-xl px-2.5 py-1 ${
              isActive
                ? `${item.activeGradient} text-white shadow-sm scale-105`
                : 'text-slate-700 hover:bg-slate-100 active:scale-95'
            }`}
          >
            <Icon
              className={`w-5 h-5 transition-transform ${
                isActive ? 'text-white stroke-[2.8]' : `${item.iconColor} stroke-[2.4]`
              }`}
            />
            <span
              className={`text-[10px] tracking-tight mt-0.5 ${
                isActive ? 'font-black text-white' : 'font-extrabold text-slate-800'
              }`}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};
