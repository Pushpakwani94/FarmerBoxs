import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useCustomerApp } from '../CustomerAppContext';

export const OnboardingScreen1: React.FC = () => {
  const { setCurrentScreen } = useCustomerApp();

  return (
    <div className="flex flex-col justify-between h-full bg-white p-6 select-none">
      {/* Top bar with Skip */}
      <div className="flex justify-end">
        <button
          onClick={() => setCurrentScreen('HOME')}
          className="text-xs font-bold text-slate-400 hover:text-slate-700 px-3 py-1 cursor-pointer"
        >
          Skip
        </button>
      </div>

      {/* Hero Illustration */}
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="w-56 h-56 rounded-3xl overflow-hidden bg-emerald-50 border border-emerald-100 p-2 shadow-lg flex items-center justify-center">
          <img
            src="https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=500"
            alt="Fresh Produce Basket"
            className="w-full h-full object-cover rounded-2xl"
          />
        </div>

        <div className="space-y-2 max-w-xs">
          <h2 className="text-xl font-black text-slate-900 leading-tight">
            Fresh From Farmers to Your Home
          </h2>
          <p className="text-xs text-slate-500 leading-relaxed font-medium">
            Direct from farms • No middlemen • 100% fresh & healthy vegetables and fruits delivered daily.
          </p>
        </div>

        {/* Feature Checkpoints */}
        <div className="grid grid-cols-1 gap-1.5 text-left w-full max-w-xs pt-1">
          <div className="flex items-center gap-2 bg-emerald-50/70 p-2 rounded-xl border border-emerald-100">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="text-xs font-bold text-slate-800">Direct farm harvested at 4 AM</span>
          </div>
          <div className="flex items-center gap-2 bg-emerald-50/70 p-2 rounded-xl border border-emerald-100">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="text-xs font-bold text-slate-800">Zero artificial chemical ripening</span>
          </div>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="space-y-4 pt-4">
        {/* Pagination Dots */}
        <div className="flex items-center justify-center gap-2">
          <div className="w-6 h-2 rounded-full bg-[#15803d]" />
          <div className="w-2 h-2 rounded-full bg-slate-200" />
          <div className="w-2 h-2 rounded-full bg-slate-200" />
        </div>

        {/* Next Button */}
        <button
          onClick={() => setCurrentScreen('ONBOARDING_2')}
          className="w-full py-3.5 bg-[#15803d] hover:bg-[#166534] text-white font-black text-sm rounded-2xl shadow-md flex items-center justify-center gap-2 transition-transform active:scale-98 cursor-pointer"
        >
          <span>Next</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
