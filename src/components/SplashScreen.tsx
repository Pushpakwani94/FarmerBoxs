import React, { useEffect, useState } from 'react';
import { Sprout, Sparkles, ShieldCheck, Leaf } from 'lucide-react';

interface SplashScreenProps {
  onFinish: () => void;
  duration?: number; // duration in ms, default 2200
}

export const SplashScreen: React.FC<SplashScreenProps> = ({
  onFinish,
  duration = 2200
}) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [statusMessage, setStatusMessage] = useState('Starting FarmerBox...');

  useEffect(() => {
    const startTime = Date.now();
    const interval = 20;

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const currentProgress = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(currentProgress);

      if (currentProgress < 30) {
        setStatusMessage('Connecting to fresh produce network...');
      } else if (currentProgress < 65) {
        setStatusMessage('Loading verified hotel & joiner catalogs...');
      } else if (currentProgress < 95) {
        setStatusMessage('Securing live rates & orders...');
      } else {
        setStatusMessage('Welcome to FarmerBox!');
      }

      if (elapsed >= duration) {
        clearInterval(timer);
        setIsExiting(true);
        setTimeout(() => {
          onFinish();
        }, 450); // allow exit animation to complete
      }
    }, interval);

    return () => clearInterval(timer);
  }, [duration, onFinish]);

  const handleSkip = () => {
    setIsExiting(true);
    setTimeout(() => {
      onFinish();
    }, 200);
  };

  return (
    <div
      onClick={handleSkip}
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-between p-6 select-none cursor-pointer overflow-hidden transition-all duration-500 ease-out bg-gradient-to-b from-[#052e16] via-[#064e3b] to-[#022c22] text-white ${
        isExiting
          ? 'opacity-0 scale-105 pointer-events-none filter blur-xs'
          : 'opacity-100 scale-100'
      }`}
    >
      {/* Ambient background glow effects */}
      <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-emerald-500/20 blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute top-1/2 -right-24 w-96 h-96 rounded-full bg-teal-500/15 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 left-1/3 w-80 h-80 rounded-full bg-emerald-400/15 blur-3xl pointer-events-none" />

      {/* Top Header Tag */}
      <div className="pt-6 flex items-center gap-2 z-10">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold tracking-wider uppercase shadow-inner">
          <Sparkles className="w-3.5 h-3.5 text-emerald-300 animate-spin" style={{ animationDuration: '6s' }} />
          Farm to Hotel Direct
        </span>
      </div>

      {/* Center Branding Area */}
      <div className="flex flex-col items-center text-center my-auto z-10 max-w-sm px-4">
        {/* Animated Pulsing Logo */}
        <div className="relative mb-6 flex items-center justify-center">
          {/* Outer Ring 1 */}
          <div className="absolute w-36 h-36 rounded-3xl bg-emerald-400/10 border border-emerald-400/20 animate-ping" style={{ animationDuration: '3s' }} />
          {/* Outer Ring 2 */}
          <div className="absolute w-30 h-30 rounded-3xl bg-emerald-500/20 border border-emerald-300/30 animate-pulse" style={{ animationDuration: '2s' }} />
          
          {/* Logo Container */}
          <div className="relative w-24 h-24 rounded-3xl bg-gradient-to-tr from-emerald-600 via-emerald-500 to-teal-400 shadow-2xl shadow-emerald-900/60 border-2 border-emerald-300/50 flex items-center justify-center transform transition-transform hover:scale-105">
            <Sprout className="w-13 h-13 text-white drop-shadow-md fill-white/20" />
            <div className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-amber-400 border-2 border-[#052e16] flex items-center justify-center shadow-xs">
              <Leaf className="w-3 h-3 text-amber-950 fill-amber-950" />
            </div>
          </div>
        </div>

        {/* Brand Name */}
        <h1 className="text-4xl font-black tracking-tight text-white flex items-center justify-center gap-1.5 drop-shadow-sm">
          <span>Farmer</span>
          <span className="text-emerald-400 bg-gradient-to-r from-emerald-400 to-teal-200 bg-clip-text text-transparent">Box</span>
        </h1>

        {/* Tagline */}
        <p className="mt-2 text-sm text-emerald-200/90 font-medium tracking-wide">
          Direct from Farm to Hotel Kitchens
        </p>

        {/* Loading Progress Bar */}
        <div className="w-64 max-w-xs mt-8 flex flex-col items-center gap-2.5">
          <div className="w-full h-2 bg-emerald-950/80 rounded-full overflow-hidden border border-emerald-500/30 p-0.5 shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-200 rounded-full transition-all duration-100 ease-out relative"
              style={{ width: `${progress}%` }}
            >
              {/* Shimmer light effect */}
              <div className="absolute inset-0 bg-white/30 animate-pulse" />
            </div>
          </div>

          <div className="flex items-center justify-between w-full text-[11px] text-emerald-300/80 font-semibold px-0.5">
            <span className="truncate pr-2">{statusMessage}</span>
            <span className="font-mono text-emerald-200 font-bold">{progress}%</span>
          </div>
        </div>
      </div>

      {/* Footer / Version Info */}
      <div className="pb-6 flex flex-col items-center gap-1.5 z-10">
        <div className="flex items-center gap-1.5 text-xs text-emerald-300/70 font-medium">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Verified Agro Supply Chain</span>
        </div>
        <div className="text-[10px] text-emerald-400/50 font-mono tracking-wider">
          v2.4.1 • Mobile & Web Edition
        </div>
      </div>
    </div>
  );
};
