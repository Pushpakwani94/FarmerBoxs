import React from 'react';
import { Sprout } from 'lucide-react';
import { useJoinerApp } from '../JoinerAppContext';

export const WelcomeScreen: React.FC = () => {
  const { setCurrentScreen } = useJoinerApp();

  return (
    <div className="flex flex-col h-full bg-white px-6 py-4 justify-between select-none">
      {/* Brand Header */}
      <div className="flex flex-col items-center pt-2">
        <div className="flex items-center gap-2 mb-0.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-[#15803d]">
            <Sprout className="w-6 h-6 fill-[#15803d]" />
          </div>
          <h1 className="text-2xl font-extrabold text-[#15803d] tracking-tight">FarmerBox</h1>
        </div>
        <p className="text-[11px] text-slate-500 font-medium tracking-wide">
          Fresh from Farmers to Hotels
        </p>
      </div>

      {/* Hero Title & Vegetables Image */}
      <div className="flex flex-col items-center text-center space-y-3 my-auto">
        <div className="space-y-1">
          <h2 className="text-xl font-extrabold text-slate-900 leading-tight">
            Hotel Joiner App
          </h2>
          <p className="text-xs text-slate-600 font-semibold leading-relaxed">
            Grow More Hotels<br />Earn More Commission
          </p>
        </div>

        {/* Vegetables Basket Illustration */}
        <div className="w-full max-w-[280px] h-48 rounded-2xl overflow-hidden shadow-xs relative bg-emerald-50/50 p-2">
          <img
            src="https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=600&q=80"
            alt="Fresh Vegetables Basket"
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-2.5 pb-2">
        <button
          onClick={() => setCurrentScreen('LOGIN')}
          className="w-full py-3 bg-[#15803d] hover:bg-[#166534] text-white font-bold text-sm rounded-xl shadow-xs transition-colors cursor-pointer"
        >
          Login
        </button>

        <button
          onClick={() => setCurrentScreen('REGISTER')}
          className="w-full py-2.5 bg-white border border-[#15803d] text-[#15803d] hover:bg-emerald-50 font-bold text-sm rounded-xl transition-colors cursor-pointer"
        >
          Register as Joiner
        </button>

        <div className="text-center pt-2">
          <p className="text-[11px] font-bold text-slate-700 leading-snug">
            Fresh Partnerships<br />Stronger Businesses
          </p>
        </div>
      </div>
    </div>
  );
};
