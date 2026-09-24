import React from 'react';
import { Check, Sparkles, ShoppingBag, Clock, MapPin, CheckCircle2 } from 'lucide-react';
import { useCustomerApp } from '../CustomerAppContext';

export const OrderSuccessScreen: React.FC = () => {
  const { lastPlacedOrder, setCurrentScreen } = useCustomerApp();

  const orderId = lastPlacedOrder?.id || 'FB12345678';
  const total = lastPlacedOrder?.totalAmount || 380;
  const address = lastPlacedOrder?.deliveryAddress;

  return (
    <div className="flex flex-col justify-between h-full bg-white p-5 select-none text-center overflow-y-auto no-scrollbar">
      <div className="flex justify-end">
        <button
          onClick={() => setCurrentScreen('HOME')}
          className="text-xs font-bold text-slate-400 hover:text-slate-700 px-3 py-1 cursor-pointer"
        >
          Done
        </button>
      </div>

      <div className="space-y-5 max-w-sm mx-auto w-full my-auto">
        {/* Centered Animated Green Tick Circle with Ripple Effects */}
        <div className="flex flex-col items-center justify-center pt-2">
          <div className="relative flex items-center justify-center">
            {/* Outer pulsating glow rings */}
            <div className="absolute w-28 h-28 rounded-full bg-emerald-400/20 animate-ping" style={{ animationDuration: '2.5s' }} />
            <div className="absolute w-24 h-24 rounded-full bg-emerald-500/25 animate-pulse" />

            {/* Inner Emerald Gradient Circle with Centered Check */}
            <div className="relative w-20 h-20 rounded-full bg-gradient-to-tr from-[#15803d] via-[#16a34a] to-[#22c55e] flex items-center justify-center text-white shadow-xl shadow-emerald-700/30 border-4 border-white transform transition-transform duration-300">
              <Check className="w-10 h-10 stroke-[3.5] animate-in zoom-in-50 duration-300" />
            </div>

            {/* Sparkle Badges */}
            <div className="absolute -top-1 -right-1 p-1 bg-amber-400 text-slate-900 rounded-full shadow-md animate-bounce">
              <Sparkles className="w-3.5 h-3.5 fill-current" />
            </div>
            <div className="absolute -bottom-1 -left-1 p-1 bg-emerald-700 text-white rounded-full shadow-xs">
              <Sparkles className="w-3 h-3" />
            </div>
          </div>
        </div>

        {/* Text */}
        <div className="space-y-1.5 text-center">
          <span className="px-3 py-0.5 rounded-full bg-emerald-100 text-[#15803d] text-[10px] font-black uppercase tracking-wider inline-flex items-center gap-1 border border-emerald-200">
            <CheckCircle2 className="w-3 h-3" /> Order Confirmed
          </span>
          <h2 className="text-xl font-black text-slate-900 tracking-tight leading-tight">
            Order Placed Successfully!
          </h2>
          <p className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full inline-block border border-emerald-200">
            Order ID #{orderId}
          </p>
          <p className="text-xs text-slate-500 font-medium pt-1 max-w-xs mx-auto leading-relaxed">
            Your fresh farm vegetables and fruits are packed and will be delivered by{' '}
            <strong className="text-slate-800">Today by 06:30 PM</strong>.
          </p>
        </div>

        {/* Quick Order Info Card */}
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2 text-left text-xs">
          <div className="flex items-center justify-between">
            <span className="text-slate-500 font-medium">Total Paid</span>
            <span className="font-black text-slate-900 text-sm">₹{total}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-500 font-medium">Delivery Slot</span>
            <span className="font-bold text-emerald-700 flex items-center gap-1">
              <Clock className="w-3 h-3" /> Under 60 Mins
            </span>
          </div>

          {address && (
            <div className="pt-2 border-t border-slate-200/60 flex items-start gap-1.5 text-slate-600 text-[11px]">
              <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span className="truncate">{address.flat}, {address.area}</span>
            </div>
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className="space-y-2.5 pt-4 max-w-sm mx-auto w-full">
        <button
          onClick={() => setCurrentScreen('MY_ORDERS')}
          className="w-full py-3.5 bg-[#15803d] hover:bg-[#166534] text-white font-black text-xs rounded-2xl shadow-md cursor-pointer transition-transform active:scale-98"
        >
          View Order Status
        </button>

        <button
          onClick={() => setCurrentScreen('HOME')}
          className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-2xl cursor-pointer transition-all"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};
