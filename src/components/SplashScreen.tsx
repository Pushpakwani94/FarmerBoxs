import React, { useEffect, useState } from 'react';

interface SplashScreenProps {
  onFinish: () => void;
  duration?: number; // duration in ms, default 1800
}

export const SplashScreen: React.FC<SplashScreenProps> = ({
  onFinish,
  duration = 1800
}) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const startTime = Date.now();
    const interval = 16;

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const currentProgress = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(currentProgress);

      if (elapsed >= duration) {
        clearInterval(timer);
        setIsExiting(true);
        setTimeout(() => {
          onFinish();
        }, 300);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [duration, onFinish]);

  const handleSkip = () => {
    setIsExiting(true);
    setTimeout(() => {
      onFinish();
    }, 100);
  };

  return (
    <div
      onClick={handleSkip}
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-between p-8 select-none cursor-pointer bg-white text-slate-800 transition-all duration-300 ease-out ${
        isExiting ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Top minimal skip indicator */}
      <div className="w-full max-w-md flex justify-end pt-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleSkip();
          }}
          className="text-xs font-semibold text-slate-400 hover:text-emerald-700 transition-colors"
        >
          Skip &rarr;
        </button>
      </div>

      {/* Center: Clean Logo & Brand */}
      <div className="flex flex-col items-center text-center my-auto max-w-sm w-full space-y-6">
        <div className="relative flex items-center justify-center">
          <img
            src="/farmerbox_logo.png"
            alt="FarmerBox Logo"
            className="w-48 sm:w-56 h-auto object-contain select-none drop-shadow-xs"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = '/images/farmerbox_brand_logo.png';
            }}
          />
        </div>

        <div className="space-y-1">
          <h2 className="text-xl font-bold text-slate-800 tracking-tight">
            Admin Operations Panel
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            100% Fresh Produce Direct to Hotel Kitchens
          </p>
        </div>

        {/* Minimal Progress Bar */}
        <div className="w-48 space-y-2 pt-2">
          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-600 rounded-full transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-[11px] font-semibold text-slate-400">
            {progress < 100 ? 'Loading dashboard...' : 'Ready'}
          </p>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="pb-4 text-center">
        <p className="text-[11px] text-slate-400 font-medium">
          FarmerBox Enterprise &copy; {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
};
