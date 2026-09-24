import React from 'react';
import { Home, LayoutGrid, Search, ShoppingBag, ClipboardList, User } from 'lucide-react';
import { useCustomerApp } from '../CustomerAppContext';

export const CustomerBottomNav: React.FC = () => {
  const { currentScreen, setCurrentScreen, cartItemCount } = useCustomerApp();

  const navItems = [
    { id: 'HOME' as const, label: 'Home', icon: Home },
    { id: 'CATEGORIES' as const, label: 'Categories', icon: LayoutGrid },
    { id: 'SEARCH' as const, label: 'Search', icon: Search },
    { id: 'CART' as const, label: 'Cart', icon: ShoppingBag, badge: cartItemCount },
    { id: 'MY_ORDERS' as const, label: 'Orders', icon: ClipboardList },
    { id: 'PROFILE' as const, label: 'Profile', icon: User }
  ];

  // Only show bottom nav on main browsing screens
  const showNav = [
    'HOME',
    'CATEGORIES',
    'PRODUCT_LISTING',
    'SEARCH',
    'CART',
    'WISHLIST',
    'PROFILE',
    'MY_ORDERS',
    'WALLET',
    'OFFERS',
    'HELP_SUPPORT',
    'SETTINGS'
  ].includes(currentScreen);

  if (!showNav) return null;

  return (
    <div className="bg-white border-t border-slate-200/90 px-2 py-1.5 flex items-center justify-around shrink-0 z-20 shadow-lg">
      {navItems.map(item => {
        const Icon = item.icon;
        const isActive = 
          currentScreen === item.id || 
          (item.id === 'CATEGORIES' && currentScreen === 'PRODUCT_LISTING') ||
          (item.id === 'PROFILE' && ['SETTINGS', 'HELP_SUPPORT', 'WALLET'].includes(currentScreen));

        return (
          <button
            key={item.id}
            onClick={() => setCurrentScreen(item.id)}
            className={`flex flex-col items-center py-1 px-2.5 rounded-xl transition-all cursor-pointer relative ${
              isActive ? 'text-emerald-700' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <div className="relative">
              <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
              {item.badge !== undefined && item.badge > 0 && (
                <span className="absolute -top-1.5 -right-2.5 bg-rose-500 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-white shadow-xs">
                  {item.badge}
                </span>
              )}
            </div>
            <span className={`text-[9.5px] mt-0.5 ${isActive ? 'font-black' : 'font-medium'}`}>
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};
