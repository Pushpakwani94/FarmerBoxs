import React, { useEffect, useState } from 'react';
import { useJoinerApp } from '../JoinerAppContext';

interface MobileSplashScreenProps {
  onComplete?: () => void;
  duration?: number;
}

export const MobileSplashScreen: React.FC<MobileSplashScreenProps> = ({
  onComplete,
  duration = 1800
}) => {
  const { setCurrentScreen, userProfile } = useJoinerApp();
  const [isExiting, setIsExiting] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    const interval = 16;

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setLoadProgress(pct);

      if (elapsed >= duration) {
        clearInterval(timer);
        setIsExiting(true);
        setTimeout(() => {
          if (onComplete) {
            onComplete();
          } else {
            setCurrentScreen(userProfile.uid ? 'DASHBOARD' : 'WELCOME');
          }
        }, 250);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [duration, onComplete, setCurrentScreen, userProfile.uid]);

  const handleSkip = () => {
    setIsExiting(true);
    setTimeout(() => {
      if (onComplete) {
        onComplete();
      } else {
        setCurrentScreen(userProfile.uid ? 'DASHBOARD' : 'WELCOME');
      }
    }, 100);
  };

  return (
    <div
      onClick={handleSkip}
      className={`h-full w-full bg-white text-slate-800 flex flex-col justify-between items-center relative overflow-hidden select-none cursor-pointer transition-all duration-300 ease-out px-6 py-10 ${
        isExiting ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
      }`}
    >
      {/* Top clean skip button */}
      <div className="w-full flex justify-end items-center">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleSkip();
          }}
          className="text-xs font-semibold text-slate-400 hover:text-emerald-700 transition-colors py-1 px-2"
        >
          Skip &rarr;
        </button>
      </div>

      {/* Center Hero: Official Partner Logo + Minimal Progress */}
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-xs space-y-6">
        <div className="flex items-center justify-center p-2">
          <img
            src="/images/farmerbox_partner_official.png"
            alt="FarmerBoxs Partner Logo"
            className="w-56 sm:w-64 h-auto object-contain select-none drop-shadow-xs"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = '/farmerbox_partner_logo.png';
            }}
          />
        </div>

        <p className="text-xs text-slate-500 font-medium text-center">
          Direct Farm to Hotel Kitchen Supply
        </p>

        {/* Clean minimal progress bar */}
        <div className="w-36 space-y-1.5 pt-2">
          <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-600 rounded-full transition-all duration-100 ease-out"
              style={{ width: `${loadProgress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Bottom subtle footer */}
      <div className="text-center pb-2">
        <p className="text-[11px] text-slate-400 font-semibold tracking-wide">
          100% Fresh Daily Procurement
        </p>
      </div>
    </div>
  );
};
