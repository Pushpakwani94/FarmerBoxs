import React, { useEffect } from 'react';
import {
  Bell,
  Volume2,
  Sparkles,
  ShoppingBag,
  Building2,
  CircleDollarSign,
  Package,
  X,
  ChevronRight
} from 'lucide-react';
import { useJoinerApp } from '../JoinerAppContext';

export const GlobalNotificationToast: React.FC = () => {
  const {
    activeToast,
    dismissToast,
    setCurrentScreen,
    setIsUpdateModalOpen,
    playNotificationSound
  } = useJoinerApp();

  useEffect(() => {
    if (!activeToast) return;
    const timer = setTimeout(() => {
      dismissToast();
    }, 4500);
    return () => clearTimeout(timer);
  }, [activeToast, dismissToast]);

  if (!activeToast) return null;

  const handleClick = () => {
    playNotificationSound('pop');
    if (activeToast.category === 'System' || activeToast.title.toLowerCase().includes('update')) {
      setIsUpdateModalOpen(true);
    } else if (activeToast.category === 'Orders' || activeToast.iconType === 'order') {
      setCurrentScreen('MY_ORDERS');
    } else if (activeToast.category === 'Hotels' || activeToast.iconType === 'hotel') {
      setCurrentScreen('MY_HOTELS');
    } else if (activeToast.category === 'Commission' || activeToast.iconType === 'commission') {
      setCurrentScreen('COMMISSION');
    } else {
      setCurrentScreen('NOTIFICATIONS');
    }
    dismissToast();
  };

  const getIcon = () => {
    switch (activeToast.iconType) {
      case 'order':
        return (
          <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center border border-amber-400/30 flex-shrink-0">
            <ShoppingBag className="w-4 h-4" />
          </div>
        );
      case 'hotel':
        return (
          <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center border border-emerald-400/30 flex-shrink-0">
            <Building2 className="w-4 h-4" />
          </div>
        );
      case 'commission':
        return (
          <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center border border-purple-400/30 flex-shrink-0">
            <CircleDollarSign className="w-4 h-4" />
          </div>
        );
      case 'product':
        return (
          <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center border border-cyan-400/30 flex-shrink-0">
            <Package className="w-4 h-4" />
          </div>
        );
      default:
        return (
          <div className="w-8 h-8 rounded-xl bg-white/20 text-yellow-300 flex items-center justify-center border border-white/20 flex-shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
        );
    }
  };

  return (
    <div className="absolute top-2 left-3 right-3 z-[9999] pointer-events-auto transition-all animate-in fade-in slide-in-from-top-4 duration-300">
      <div
        onClick={handleClick}
        className="bg-slate-900/95 backdrop-blur-md text-white p-3 rounded-2xl shadow-2xl border border-emerald-500/40 cursor-pointer flex items-center justify-between gap-2.5 group hover:border-emerald-400"
      >
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          {getIcon()}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-black tracking-wider uppercase px-1.5 py-0.2 rounded bg-emerald-500/30 text-emerald-300">
                {activeToast.category || 'Live Alert'}
              </span>
              <span className="text-[9.5px] text-slate-400 flex items-center gap-0.5">
                <Volume2 className="w-2.5 h-2.5 text-emerald-400 animate-pulse" /> Live
              </span>
            </div>
            <h4 className="text-xs font-bold text-white truncate mt-0.5">
              {activeToast.title}
            </h4>
            {activeToast.subtitle && (
              <p className="text-[10.5px] text-slate-300 truncate mt-0.5 font-medium">
                {activeToast.subtitle}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1 flex-shrink-0">
          <div className="p-1 text-slate-400 group-hover:text-emerald-400 transition-colors">
            <ChevronRight className="w-4 h-4" />
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              dismissToast();
            }}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
