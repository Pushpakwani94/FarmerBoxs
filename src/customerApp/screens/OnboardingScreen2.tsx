import React from 'react';
import { ArrowRight, ShieldCheck, HeartHandshake, IndianRupee, Users } from 'lucide-react';
import { useCustomerApp } from '../CustomerAppContext';

export const OnboardingScreen2: React.FC = () => {
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
        <div className="w-56 h-56 rounded-3xl overflow-hidden bg-amber-50 border border-amber-100 p-2 shadow-lg flex items-center justify-center">
          <img
            src="https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?w=500"
            alt="Farmer in Green Field"
            className="w-full h-full object-cover rounded-2xl"
          />
        </div>

        <div className="space-y-1 max-w-xs">
          <h2 className="text-xl font-black text-slate-900 leading-tight">
            Support Farmers Choose Fresh
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Empowering 5,000+ local farming families with transparent and fair prices.
          </p>
        </div>

        {/* 4 Feature Points matching image */}
        <div className="grid grid-cols-1 gap-2 text-left w-full max-w-xs pt-1">
          <div className="flex items-center gap-2.5 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
            <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800">
              <HeartHandshake className="w-3.5 h-3.5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900 leading-none">Direct from farmers</p>
              <p className="text-[10px] text-slate-400 mt-0.5">Ethically sourced daily</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
            <div className="p-1.5 rounded-lg bg-blue-100 text-blue-800">
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900 leading-none">Better quality produce</p>
              <p className="text-[10px] text-slate-400 mt-0.5">Triple-checked for freshness</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
            <div className="p-1.5 rounded-lg bg-amber-100 text-amber-800">
              <IndianRupee className="w-3.5 h-3.5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900 leading-none">Fair transparent prices</p>
              <p className="text-[10px] text-slate-400 mt-0.5">Wholesale rates for customers</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
            <div className="p-1.5 rounded-lg bg-teal-100 text-teal-800">
              <Users className="w-3.5 h-3.5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900 leading-none">Healthy happy families</p>
              <p className="text-[10px] text-slate-400 mt-0.5">Nutritious meals everyday</p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4 pt-4">
        {/* Pagination Dots */}
        <div className="flex items-center justify-center gap-2">
          <div className="w-2 h-2 rounded-full bg-slate-200" />
          <div className="w-6 h-2 rounded-full bg-[#15803d]" />
          <div className="w-2 h-2 rounded-full bg-slate-200" />
        </div>

        <button
          onClick={() => setCurrentScreen('ONBOARDING_3')}
          className="w-full py-3.5 bg-[#15803d] hover:bg-[#166534] text-white font-black text-sm rounded-2xl shadow-md flex items-center justify-center gap-2 transition-transform active:scale-98 cursor-pointer"
        >
          <span>Next</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
