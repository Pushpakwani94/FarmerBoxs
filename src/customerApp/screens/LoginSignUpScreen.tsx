import React, { useState } from 'react';
import { Smartphone, ArrowRight, ShieldCheck } from 'lucide-react';
import { useCustomerApp } from '../CustomerAppContext';

export const LoginSignUpScreen: React.FC = () => {
  const { loginPhone, setLoginPhone, sendOtp, setCurrentScreen } = useCustomerApp();
  const [activeTab, setActiveTab] = useState<'LOGIN' | 'SIGNUP'>('LOGIN');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginPhone || loginPhone.length < 10) {
      alert('Please enter a valid 10-digit mobile number');
      return;
    }
    setIsLoading(true);
    await sendOtp(loginPhone);
    setIsLoading(false);
    setCurrentScreen('OTP');
  };

  return (
    <div className="flex flex-col justify-between h-full bg-white p-6 select-none">
      {/* Top Header with Skip */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img
            src="/farmerbox_app_icon.png"
            alt="FarmerBoxs"
            className="w-7 h-7 rounded-lg object-contain"
          />
          <span className="font-black text-sm text-slate-900">FarmerBoxs</span>
        </div>
        <button
          onClick={() => setCurrentScreen('HOME')}
          className="text-xs font-bold text-emerald-700 hover:text-emerald-900 px-3 py-1 rounded-full bg-emerald-50 cursor-pointer"
        >
          Explore as Guest
        </button>
      </div>

      {/* Main Content */}
      <div className="space-y-6 max-w-sm mx-auto w-full my-auto">
        {/* Brand Banner */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-100 p-2 mx-auto flex items-center justify-center shadow-md">
            <img
              src="/farmerbox_app_icon.png"
              alt="FarmerBoxs"
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              {activeTab === 'LOGIN' ? 'Welcome Back' : 'Join FarmerBoxs'}
            </h2>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Enter your mobile number to get instant OTP
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setActiveTab('LOGIN')}
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'LOGIN' ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-500'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setActiveTab('SIGNUP')}
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'SIGNUP' ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-500'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSendOtp} className="space-y-4">
          {activeTab === 'SIGNUP' && (
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Rahul Sharma"
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white font-medium"
              />
            </div>
          )}

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">
              Mobile Number
            </label>
            <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-emerald-600 focus-within:bg-white">
              <span className="px-3 text-xs font-black text-slate-600 border-r border-slate-200 bg-slate-100/80 py-2.5">
                +91
              </span>
              <input
                type="tel"
                maxLength={10}
                value={loginPhone}
                onChange={e => setLoginPhone(e.target.value.replace(/\D/g, ''))}
                placeholder="Enter 10-digit mobile"
                className="w-full px-3 py-2.5 text-xs bg-transparent focus:outline-none font-bold text-slate-900 tracking-wider"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 bg-[#15803d] hover:bg-[#166534] text-white font-black text-sm rounded-2xl shadow-md flex items-center justify-center gap-2 transition-transform active:scale-98 cursor-pointer disabled:opacity-50"
          >
            <span>{isLoading ? 'Sending OTP...' : 'Send OTP'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Social Login Options */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center gap-2">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-[10px] text-slate-400 font-bold uppercase">Or continue with</span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <button
              onClick={() => setCurrentScreen('HOME')}
              className="py-2.5 px-3 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl text-xs font-bold text-slate-700 flex items-center justify-center gap-2 shadow-2xs cursor-pointer"
            >
              <span>🌐</span>
              <span>Google</span>
            </button>
            <button
              onClick={() => setCurrentScreen('HOME')}
              className="py-2.5 px-3 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl text-xs font-bold text-slate-700 flex items-center justify-center gap-2 shadow-2xs cursor-pointer"
            >
              <span>🍎</span>
              <span>Apple</span>
            </button>
          </div>
        </div>
      </div>

      {/* Footer Terms */}
      <div className="text-center pt-4">
        <p className="text-[10px] text-slate-400">
          By continuing, you agree to our{' '}
          <span className="text-emerald-700 font-bold underline cursor-pointer">Terms & Conditions</span> and{' '}
          <span className="text-emerald-700 font-bold underline cursor-pointer">Privacy Policy</span>.
        </p>
      </div>
    </div>
  );
};
