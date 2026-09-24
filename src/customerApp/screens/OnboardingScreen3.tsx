import React from 'react';
import { Truck, Clock, Sparkles } from 'lucide-react';
import { useCustomerApp } from '../CustomerAppContext';

export const OnboardingScreen3: React.FC = () => {
  const { setCurrentScreen } = useCustomerApp();

  return (
    <div className="flex flex-col justify-between h-full bg-white p-6 select-none">
      <div className="flex justify-end">
        <button
          onClick={() => setCurrentScreen('HOME')}
          className="text-xs font-bold text-slate-400 hover:text-slate-700 px-3 py-1 cursor-pointer"
        >
          Skip
        </button>
      </div>

      <div className="flex flex-col items-center text-center space-y-4">
        <div className="w-56 h-56 rounded-3xl overflow-hidden bg-teal-50 border border-teal-100 p-2 shadow-lg flex items-center justify-center">
          <img
            src="https://images.unsplash.com/photo-1526367790999-0150786686a2?w=500"
            alt="Delivery Driver Scooter"
            className="w-full h-full object-cover rounded-2xl"
          />
        </div>

        <div className="space-y-2 max-w-xs">
          <h2 className="text-xl font-black text-slate-900 leading-tight">
            Fast & Safe Delivery At Your Doorstep
          </h2>
          <p className="text-xs text-slate-500 leading-relaxed font-medium">
            Fresh fruits, vegetables, and more delivered with care in under 60 minutes across Pune.
          </p>
        </div>

        {/* Highlights */}
        <div className="grid grid-cols-2 gap-2 w-full max-w-xs pt-2">
          <div className="bg-emerald-50/80 p-3 rounded-2xl border border-emerald-100 text-center space-y-1">
            <Clock className="w-5 h-5 text-emerald-600 mx-auto" />
            <p className="text-xs font-bold text-slate-900">Morning 7 AM</p>
            <p className="text-[10px] text-slate-400">Early slot delivery</p>
          </div>
          <div className="bg-emerald-50/80 p-3 rounded-2xl border border-emerald-100 text-center space-y-1">
            <Truck className="w-5 h-5 text-emerald-600 mx-auto" />
            <p className="text-xs font-bold text-slate-900">Express Delivery</p>
            <p className="text-[10px] text-slate-400">Temperature safe</p>
          </div>
        </div>
      </div>

      <div className="space-y-4 pt-4">
        {/* Pagination Dots */}
        <div className="flex items-center justify-center gap-2">
          <div className="w-2 h-2 rounded-full bg-slate-200" />
          <div className="w-2 h-2 rounded-full bg-slate-200" />
          <div className="w-6 h-2 rounded-full bg-[#15803d]" />
        </div>

        <button
          onClick={() => setCurrentScreen('LOGIN')}
          className="w-full py-3.5 bg-[#15803d] hover:bg-[#166534] text-white font-black text-sm rounded-2xl shadow-md flex items-center justify-center gap-2 transition-transform active:scale-98 cursor-pointer"
        >
          <span>Get Started</span>
          <Sparkles className="w-4 h-4 text-amber-300" />
        </button>
      </div>
    </div>
  );
};
