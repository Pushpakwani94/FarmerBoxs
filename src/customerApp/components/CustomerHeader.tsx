import React, { useState, useEffect } from 'react';
import { MapPin, ChevronDown, Search, Mic, Bell, Heart, Sparkles } from 'lucide-react';
import { useCustomerApp } from '../CustomerAppContext';

interface CustomerHeaderProps {
  showSearch?: boolean;
  bgGradient?: string;
}

const SEARCH_PLACEHOLDERS = [
  'Search for Fresh Apples, Mangoes...',
  'Search for Farm Fresh Chikoo & Bananas...',
  'Search for Sweet Shimla Red Apples...',
  'Search for Mahabaleshwar Strawberries...',
  'Search for 100% Organic Vegetables...'
];

export const CustomerHeader: React.FC<CustomerHeaderProps> = ({ 
  showSearch = true,
  bgGradient = 'from-[#e8f5e9] via-[#f1f8e9] to-[#ffffff]'
}) => {
  const {
    setCurrentScreen,
    selectedAddress,
    setSearchQuery,
    wishlist
  } = useCustomerApp();

  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setPlaceholderIndex(prev => (prev + 1) % SEARCH_PLACEHOLDERS.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={`bg-gradient-to-b ${bgGradient} text-slate-900 px-3.5 pt-9 pb-3 shrink-0 transition-all duration-500 border-b border-emerald-100/80`}>
      {/* Top Row: Brand & Location & Quick Actions */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div 
            onClick={() => setCurrentScreen('HOME')}
            className="w-9 h-9 rounded-xl bg-white shadow-xs p-1 border border-emerald-200/80 flex items-center justify-center cursor-pointer shrink-0"
          >
            <img
              src="/farmerbox_app_icon.png"
              alt="FarmerBox"
              className="w-full h-full object-contain rounded-lg"
            />
          </div>
          <div>
            <div 
              onClick={() => setCurrentScreen('ADDRESS')}
              className="flex items-center gap-1 cursor-pointer group"
            >
              <MapPin className="w-3.5 h-3.5 text-emerald-700 group-hover:scale-110 transition-transform" />
              <span className="font-black text-xs text-slate-900 tracking-wide flex items-center gap-0.5">
                {selectedAddress ? (selectedAddress.label || selectedAddress.type) : 'Deliver to Home'}
                <ChevronDown className="w-3 h-3 text-slate-500" />
              </span>
            </div>
            <p className="text-[10px] text-slate-500 truncate max-w-[180px] font-medium">
              {selectedAddress ? `${selectedAddress.flat}, ${selectedAddress.area}` : 'Select your delivery address'}
            </p>
          </div>
        </div>

        {/* Right Actions: Notifications & Wishlist */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={() => setCurrentScreen('NOTIFICATIONS')}
            className="w-8 h-8 rounded-full bg-white shadow-xs hover:bg-emerald-50 border border-slate-200/80 flex items-center justify-center text-slate-700 cursor-pointer transition-colors"
            title="Notifications"
          >
            <Bell className="w-4 h-4 text-slate-700" />
          </button>
          <button
            onClick={() => setCurrentScreen('WISHLIST')}
            className="w-8 h-8 rounded-full bg-white shadow-xs hover:bg-rose-50 border border-slate-200/80 flex items-center justify-center text-slate-700 cursor-pointer transition-colors relative"
            title="Wishlist"
          >
            <Heart className="w-4 h-4 text-slate-700" />
            {wishlist.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-rose-500 text-white text-[9px] font-black w-3.5 h-3.5 rounded-full flex items-center justify-center border border-white shadow-xs">
                {wishlist.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Search Bar */}
      {showSearch && (
        <div className="mt-2.5">
          <div
            onClick={() => {
              setSearchQuery('');
              setCurrentScreen('SEARCH');
            }}
            className="bg-white text-slate-700 rounded-xl px-3.5 py-2 flex items-center justify-between text-xs cursor-pointer shadow-xs border border-emerald-200/80 hover:border-emerald-400 transition-all group"
          >
            <div className="flex items-center gap-2 text-slate-400 overflow-hidden flex-1">
              <Search className="w-4 h-4 text-emerald-600 shrink-0 group-hover:scale-110 transition-transform" />
              <div className="h-4 overflow-hidden relative flex-1">
                <span
                  key={placeholderIndex}
                  className="text-slate-600 font-medium truncate block animate-in fade-in slide-in-from-bottom-1 duration-300 text-[11px]"
                >
                  {SEARCH_PLACEHOLDERS[placeholderIndex]}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 pl-2 border-l border-slate-200">
              <Mic className="w-3.5 h-3.5 text-emerald-600" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
