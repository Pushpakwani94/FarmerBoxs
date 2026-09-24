import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, CheckCircle2, ShieldAlert } from 'lucide-react';
import { useCustomerApp } from '../CustomerAppContext';

export const OtpVerifyScreen: React.FC = () => {
  const { loginPhone, verifyOtp, setCurrentScreen } = useCustomerApp();
  const [otp, setOtp] = useState(['1', '2', '3', '4', '5', '6']);
  const [timer, setTimer] = useState(28);
  const [isVerifying, setIsVerifying] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer(t => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleChange = (index: number, val: string) => {
    if (!/^\d*$/.test(val)) return;
    const newOtp = [...otp];
    newOtp[index] = val.slice(-1);
    setOtp(newOtp);

    // Auto-advance
    if (val && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const fullOtp = otp.join('');
    if (fullOtp.length < 6) {
      alert('Please enter complete 6-digit OTP code');
      return;
    }
    setIsVerifying(true);
    await verifyOtp(fullOtp);
    setIsVerifying(false);
    setCurrentScreen('HOME');
  };

  return (
    <div className="flex flex-col justify-between h-full bg-white p-6 select-none">
      {/* Top Bar */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setCurrentScreen('LOGIN')}
          className="p-1 text-slate-600 hover:text-slate-900 cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <span className="font-bold text-sm text-slate-800">OTP Verification</span>
      </div>

      {/* Center Form */}
      <div className="space-y-6 max-w-sm mx-auto w-full my-auto text-center">
        <div className="space-y-2">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Verify OTP
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Enter the 6-digit code sent to
          </p>
          <p className="text-sm font-black text-emerald-800 font-mono tracking-wider">
            +91 {loginPhone || '98765 43210'}
          </p>
        </div>

        {/* 6 Digit Input Boxes */}
        <div className="flex items-center justify-center gap-2 pt-2">
          {otp.map((digit, idx) => (
            <input
              key={idx}
              ref={el => { inputRefs.current[idx] = el; }}
              type="text"
              maxLength={1}
              value={digit}
              onChange={e => handleChange(idx, e.target.value)}
              onKeyDown={e => handleKeyDown(idx, e)}
              className="w-11 h-12 text-center text-lg font-black text-slate-900 bg-slate-50 border-2 border-slate-200 focus:border-emerald-600 focus:bg-white rounded-xl focus:outline-none transition-all"
            />
          ))}
        </div>

        {/* Resend Timer */}
        <div className="pt-2 text-xs text-slate-500 font-medium">
          {timer > 0 ? (
            <p>
              Resend OTP in <span className="font-black text-emerald-700 font-mono">00:{timer < 10 ? `0${timer}` : timer}</span>
            </p>
          ) : (
            <button
              onClick={() => setTimer(30)}
              className="text-emerald-700 hover:text-emerald-900 font-black underline cursor-pointer"
            >
              Resend OTP Code
            </button>
          )}
        </div>

        <button
          onClick={handleVerify}
          disabled={isVerifying}
          className="w-full py-3.5 bg-[#15803d] hover:bg-[#166534] text-white font-black text-sm rounded-2xl shadow-md flex items-center justify-center gap-2 transition-transform active:scale-98 cursor-pointer disabled:opacity-50"
        >
          <span>{isVerifying ? 'Verifying...' : 'Verify'}</span>
        </button>
      </div>

      <div className="text-center">
        <p className="text-[10px] text-slate-400">Secured with 256-bit FarmerBoxs encryption</p>
      </div>
    </div>
  );
};
