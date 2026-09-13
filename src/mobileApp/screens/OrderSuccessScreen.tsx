import React from 'react';
import { Check, Sparkles } from 'lucide-react';
import { useJoinerApp } from '../JoinerAppContext';

export const OrderSuccessScreen: React.FC = () => {
  const {
    lastPlacedOrder,
    selectedHotel,
    cartTotal,
    setCurrentScreen,
    clearCart
  } = useJoinerApp();

  const order = lastPlacedOrder || {
    id: '#FB1056',
    hotelName: selectedHotel?.name || 'Selected Hotel',
    amount: cartTotal || 760,
    date: '12 Sep 2026',
    timeSlot: '8 AM - 10 AM',
    status: 'Pending'
  };

  const handleContinue = () => {
    clearCart();
    setCurrentScreen('DASHBOARD');
  };

  const handleViewOrder = () => {
    clearCart();
    setCurrentScreen('MY_ORDERS');
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 justify-between p-5 select-none text-center">
      <div className="my-auto space-y-4">
        {/* Animated Checkmark Circle */}
        <div className="relative inline-block">
          <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mx-auto shadow-sm">
            <Check className="w-10 h-10 stroke-[3]" />
          </div>
          {/* Confetti particles */}
          <Sparkles className="w-5 h-5 text-amber-500 absolute -top-1 -right-2 animate-pulse" />
          <Sparkles className="w-4 h-4 text-emerald-500 absolute bottom-0 -left-2" />
        </div>

        {/* Title */}
        <div className="space-y-1">
          <h2 className="text-lg font-black text-slate-900 leading-tight">
            Order Placed Successfully!
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Your order has been sent to FarmerBox.
          </p>
        </div>

        {/* Receipt Card */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs text-left space-y-2.5 max-w-xs mx-auto text-xs">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <span className="text-slate-500 font-semibold">Order ID</span>
            <span className="font-mono font-extrabold text-slate-900">{order.id}</span>
          </div>

          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <span className="text-slate-500 font-semibold">Hotel</span>
            <span className="font-extrabold text-slate-900">{order.hotelName}</span>
          </div>

          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <span className="text-slate-500 font-semibold">Total Amount</span>
            <span className="font-black text-slate-900 text-sm">₹{order.amount}</span>
          </div>

          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <span className="text-slate-500 font-semibold">Delivery Date</span>
            <span className="font-bold text-slate-800">{order.date}</span>
          </div>

          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <span className="text-slate-500 font-semibold">Time Slot</span>
            <span className="font-bold text-slate-800">{order.timeSlot}</span>
          </div>

          <div className="flex items-center justify-between pt-0.5">
            <span className="text-slate-500 font-semibold">Status</span>
            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 border border-amber-200">
              {order.status}
            </span>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="space-y-2 pb-2">
        <button
          onClick={handleViewOrder}
          className="w-full py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl shadow-2xs transition-colors cursor-pointer"
        >
          View Order
        </button>

        <button
          onClick={handleContinue}
          className="w-full py-3 bg-[#15803d] hover:bg-[#166534] text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};
