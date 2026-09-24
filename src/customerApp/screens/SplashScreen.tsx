import React, { useEffect } from 'react';
import { Loader2, Sprout, Sparkles } from 'lucide-react';
import { useCustomerApp } from '../CustomerAppContext';

export const SplashScreen: React.FC = () => {
  const { setCurrentScreen } = useCustomerApp();

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentScreen('ONBOARDING_1');
    }, 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-between h-full bg-gradient-to-b from-white via-emerald-50/40 to-emerald-100/60 p-8 text-center select-none">
      <div className="w-full flex justify-end">
        <button
          onClick={() => setCurrentScreen('HOME')}
          className="text-xs font-bold text-emerald-800 hover:text-emerald-950 px-3 py-1 rounded-full bg-emerald-100/80 cursor-pointer"
        >
          Skip
        </button>
      </div>

      <div className="flex flex-col items-center space-y-4 animate-scaleUp">
        <div className="relative">
          <div className="w-28 h-28 rounded-3xl bg-white p-3 shadow-xl border border-emerald-100 flex items-center justify-center">
            <img
              src="/farmerbox_app_icon.png"
              alt="FarmerBoxs"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="absolute -top-2 -right-2 p-1.5 bg-[#15803d] text-white rounded-full shadow-md">
            <Sparkles className="w-4 h-4 text-amber-300" />
          </div>
        </div>

        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center justify-center gap-1.5">
            <span>FarmerBoxs</span>
            <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-[#15803d] text-white">B2C</span>
          </h1>
          <p className="text-xs font-bold text-emerald-700 mt-1">Farm Fresh, Just For You</p>
        </div>

        <div className="pt-6">
          <Loader2 className="w-6 h-6 text-[#15803d] animate-spin mx-auto" />
        </div>
      </div>

      <div className="space-y-1">
        <p className="text-xs text-slate-500 font-semibold flex items-center justify-center gap-1">
          <Sprout className="w-3.5 h-3.5 text-emerald-600" />
          <span>Freshness is a Better Tomorrow</span>
        </p>
        <p className="text-[10px] text-slate-400">Version 2.5 • Official Customer App</p>
      </div>
    </div>
  );
};
