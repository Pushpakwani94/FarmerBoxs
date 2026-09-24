import React from 'react';
import {
  Check,
  Sparkles,
  Building2,
  Calendar,
  Clock,
  ShoppingBag,
  CircleDollarSign,
  ArrowRight,
  Truck,
  CheckCircle2,
  Gift
} from 'lucide-react';
import { useJoinerApp } from '../JoinerAppContext';

export const OrderSuccessScreen: React.FC = () => {
  const {
    lastPlacedOrder,
    selectedHotel,
    cartTotal,
    setCurrentScreen,
    clearCart,
    playNotificationSound
  } = useJoinerApp();

  const nowFormatted = new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });

  const order = lastPlacedOrder || {
    id: '#FB1056',
    hotelName: selectedHotel?.name || 'Hotel Spice Villa',
    hotelZone: selectedHotel?.zone || 'Kharadi',
    amount: cartTotal || 1650,
    date: `Today (${nowFormatted})`,
    timeSlot: '6 AM - 8 AM',
    status: 'Confirmed',
    isBonusEligible: (cartTotal || 1650) >= 1500
  };

  const orderAmount = Number(order.amount || cartTotal || 0);
  const isBonusQualified = orderAmount >= 1500;

  const handleContinue = () => {
    clearCart();
    playNotificationSound('pop');
    setCurrentScreen('PLACE_ORDER');
  };

  const handleViewOrder = () => {
    clearCart();
    playNotificationSound('pop');
    setCurrentScreen('MY_ORDERS');
  };

  const handleDashboard = () => {
    clearCart();
    playNotificationSound('pop');
    setCurrentScreen('DASHBOARD');
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 justify-between p-4 select-none overflow-y-auto no-scrollbar">
      <div className="my-auto space-y-4 py-3 max-w-sm mx-auto w-full text-center">
        {/* Centered Animated Green Tick with Ripple Rings */}
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

        {/* Title and Confirmation Subtitle */}
        <div className="space-y-1.5 text-center">
          <span className="px-3 py-0.5 rounded-full bg-emerald-100 text-[#15803d] text-[10px] font-black uppercase tracking-wider inline-flex items-center gap-1 border border-emerald-200">
            <CheckCircle2 className="w-3 h-3" /> Order Confirmed
          </span>
          <h2 className="text-xl font-black text-slate-900 leading-tight tracking-tight">
            Order Placed Successfully!
          </h2>
          <p className="text-xs text-slate-600 font-medium">
            Supply order received for <span className="font-extrabold text-slate-900">{order.hotelName}</span>
          </p>
        </div>

        {/* ₹100 Joiner Wallet Bonus Confirmation Banner */}
        {isBonusQualified ? (
          <div className="bg-gradient-to-r from-emerald-950 via-[#15803d] to-emerald-900 text-white rounded-2xl p-3 shadow-md border border-emerald-500/40 text-left space-y-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 font-black text-xs text-yellow-300">
                <Sparkles className="w-3.5 h-3.5 fill-current" />
                <span>₹100 Wallet Bonus Qualified!</span>
              </div>
              <span className="px-2 py-0.5 bg-yellow-400 text-slate-950 font-black text-[9px] rounded-md shadow-2xs">
                +₹100 BONUS
              </span>
            </div>
            <p className="text-[10.5px] text-emerald-100 leading-snug font-medium">
              Order value is above ₹1,500. <strong>₹100 will be added to your Joiner Wallet</strong> as soon as Delivery is Done & Approved by Admin!
            </p>
          </div>
        ) : (
          <div className="bg-slate-100/90 text-slate-700 rounded-2xl p-2.5 border border-slate-200 text-left text-[11px] flex items-center justify-between">
            <span>Order Value: <strong>₹{orderAmount}</strong></span>
            <span className="text-[10px] text-slate-500 font-medium">Under ₹1,500</span>
          </div>
        )}

        {/* Hotel & Delivery Highlights Card */}
        <div className="bg-gradient-to-br from-emerald-800 to-emerald-950 rounded-2xl p-3.5 text-white shadow-md text-left space-y-2.5">
          <div className="flex items-center gap-2.5 border-b border-white/10 pb-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/15 backdrop-blur-xs flex items-center justify-center text-emerald-300 shrink-0">
              <Building2 className="w-5 h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[10px] text-emerald-200 uppercase font-black tracking-wider">Destination Hotel</p>
              <h3 className="text-sm font-black text-white truncate leading-tight">{order.hotelName}</h3>
              <p className="text-[10.5px] text-emerald-100 font-medium">{order.hotelZone || 'Kharadi Zone'}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs pt-0.5">
            <div className="bg-white/10 rounded-xl p-2 space-y-0.5">
              <div className="flex items-center gap-1 text-[10px] text-emerald-200 font-bold">
                <Calendar className="w-3 h-3 text-emerald-300" />
                <span>Delivery Date</span>
              </div>
              <p className="font-black text-white text-[11.5px] truncate">
                {order.date}
              </p>
            </div>

            <div className="bg-white/10 rounded-xl p-2 space-y-0.5">
              <div className="flex items-center gap-1 text-[10px] text-emerald-200 font-bold">
                <Clock className="w-3 h-3 text-emerald-300" />
                <span>Delivery Time</span>
              </div>
              <p className="font-black text-white text-[11.5px] truncate">
                {order.timeSlot}
              </p>
            </div>
          </div>
        </div>

        {/* Receipt & Status Summary Card */}
        <div className="bg-white rounded-2xl p-3.5 border border-slate-200/90 shadow-2xs text-left space-y-2 text-xs">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <span className="text-slate-500 font-semibold flex items-center gap-1.5">
              <ShoppingBag className="w-3.5 h-3.5 text-slate-400" /> Order Number
            </span>
            <span className="font-mono font-extrabold text-slate-900 text-xs">{order.id}</span>
          </div>

          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <span className="text-slate-500 font-semibold">Total Order Value</span>
            <span className="font-black text-slate-900 text-sm">₹{orderAmount}</span>
          </div>

          <div className="flex items-center justify-between pt-0.5">
            <span className="text-slate-500 font-semibold flex items-center gap-1">
              <Truck className="w-3.5 h-3.5 text-slate-400" /> Dispatch Status
            </span>
            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200">
              {order.status || 'Confirmed for Morning'}
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2 pt-2 max-w-sm mx-auto w-full">
        <button
          onClick={handleViewOrder}
          className="w-full py-2.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 font-bold text-xs rounded-xl shadow-2xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer active:scale-[0.99]"
        >
          <span>View in My Orders</span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
        </button>

        <button
          onClick={handleContinue}
          className="w-full py-3 bg-[#15803d] hover:bg-[#166534] text-white font-extrabold text-xs rounded-xl shadow-md shadow-emerald-700/20 flex items-center justify-center gap-1.5 transition-colors cursor-pointer active:scale-[0.99]"
        >
          <span>+ Place Another Order</span>
        </button>

        <button
          onClick={handleDashboard}
          className="w-full py-2 text-slate-500 hover:text-slate-700 font-semibold text-[11px] cursor-pointer"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};
