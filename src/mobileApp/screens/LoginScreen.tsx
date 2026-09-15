import React, { useState } from 'react';
import { ArrowLeft, Sprout, Lock, Eye, EyeOff, Smartphone, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useJoinerApp } from '../JoinerAppContext';

export const LoginScreen: React.FC = () => {
  const { setCurrentScreen, loginUser } = useJoinerApp();

  const [loginMode, setLoginMode] = useState<'PASSWORD' | 'OTP'>('PASSWORD');
  const [mobile, setMobile] = useState('9876543210');
  const [password, setPassword] = useState('password123');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mobile || mobile.length < 10) {
      alert('Please enter a valid 10-digit mobile number');
      return;
    }

    if (loginMode === 'PASSWORD' && !password) {
      alert('Please enter your password');
      return;
    }

    if (loginMode === 'OTP' && otp.join('').length < 4) {
      alert('Please enter the 4-digit OTP');
      return;
    }

    setIsLoading(true);
    try {
      await loginUser(mobile, password);
      setIsLoading(false);
      setCurrentScreen('DASHBOARD');
    } catch (err: any) {
      setIsLoading(false);
      alert(err.message || 'Login failed');
    }
  };

  const handleSendOtp = () => {
    setOtpSent(true);
    setOtp(['4', '2', '8', '6']);
  };

  return (
    <div className="flex flex-col h-full bg-white select-none">
      {/* Top Header */}
      <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
        <button
          onClick={() => setCurrentScreen('WELCOME')}
          className="p-1 -ml-1 text-slate-700 hover:text-slate-900 cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-1.5 text-[#15803d]">
          <Sprout className="w-4 h-4 fill-[#15803d]" />
          <span className="font-extrabold text-sm tracking-tight">FarmerBox</span>
        </div>
        <div className="w-5"></div>
      </div>

      {/* Form Content */}
      <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
        {/* Headline */}
        <div className="space-y-1">
          <h2 className="text-xl font-black text-slate-900 leading-tight">
            Hotel Joiner Login
          </h2>
          <p className="text-xs text-slate-500 font-medium leading-relaxed">
            Welcome back! Enter your registered details to access orders & commission.
          </p>
        </div>

        {/* Login Mode Tabs */}
        <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-xl text-xs font-bold text-slate-600">
          <button
            type="button"
            onClick={() => setLoginMode('PASSWORD')}
            className={`py-1.5 rounded-lg transition-all cursor-pointer ${
              loginMode === 'PASSWORD' ? 'bg-white text-[#15803d] shadow-xs' : 'hover:text-slate-900'
            }`}
          >
            Password
          </button>
          <button
            type="button"
            onClick={() => {
              setLoginMode('OTP');
              if (!otpSent) handleSendOtp();
            }}
            className={`py-1.5 rounded-lg transition-all cursor-pointer ${
              loginMode === 'OTP' ? 'bg-white text-[#15803d] shadow-xs' : 'hover:text-slate-900'
            }`}
          >
            Quick OTP
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-3.5 text-xs">
          {/* Mobile Input */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Mobile Number <span className="text-rose-500">*</span>
            </label>
            <div className="flex border border-slate-200 rounded-xl overflow-hidden focus-within:ring-1 focus-within:ring-emerald-600 bg-white">
              <span className="px-3 py-2 bg-slate-50 text-slate-500 font-semibold border-r border-slate-200 text-xs flex items-center gap-1">
                <Smartphone className="w-3.5 h-3.5 text-slate-400" /> +91
              </span>
              <input
                type="tel"
                placeholder="Enter 10-digit mobile"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                maxLength={10}
                required
                className="flex-1 px-3 py-2 text-xs text-slate-800 font-medium placeholder:text-slate-400 focus:outline-none"
              />
            </div>
          </div>

          {/* Password Mode */}
          {loginMode === 'PASSWORD' ? (
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="font-bold text-slate-700">
                  Password <span className="text-rose-500">*</span>
                </label>
                <button
                  type="button"
                  onClick={() => alert('Password reset link sent to your registered mobile')}
                  className="text-[11px] font-bold text-[#15803d] hover:underline"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-3 pr-9 py-2 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:outline-emerald-600"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          ) : (
            /* OTP Mode */
            <div className="space-y-2 bg-emerald-50/50 p-3 rounded-xl border border-emerald-100">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-700 text-xs">Enter 4-Digit OTP</span>
                <span className="text-[10px] text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded">
                  Auto-filled: 4286
                </span>
              </div>
              <div className="flex items-center justify-between gap-2 max-w-[200px] mx-auto">
                {['4', '2', '8', '6'].map((val, idx) => (
                  <input
                    key={idx}
                    type="text"
                    maxLength={1}
                    value={otp[idx] || val}
                    onChange={(e) => {
                      const newOtp = [...otp];
                      newOtp[idx] = e.target.value;
                      setOtp(newOtp);
                    }}
                    className="w-10 h-10 text-center font-bold text-base border border-slate-300 rounded-xl bg-white focus:outline-emerald-600"
                  />
                ))}
              </div>
              <div className="text-center pt-1">
                <button
                  type="button"
                  onClick={handleSendOtp}
                  className="text-[11px] font-bold text-[#15803d] hover:underline"
                >
                  Resend OTP
                </button>
              </div>
            </div>
          )}

          {/* Remember Me */}
          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 cursor-pointer text-slate-600 font-medium text-[11px]">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded text-emerald-600 focus:ring-emerald-500 w-3.5 h-3.5"
              />
              <span>Remember me on this device</span>
            </label>
          </div>

          {/* Login Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-[#15803d] hover:bg-[#166534] text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <span>Logging in...</span>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Login to Dashboard</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Demo Fast Fill Pill */}
        <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/80 text-[10.5px] text-slate-500 text-center">
          <span>Demo Credentials: </span>
          <strong className="text-slate-800">9876543210</strong> / <strong className="text-slate-800">password123</strong>
        </div>
      </div>

      {/* Bottom Switcher */}
      <div className="p-4 border-t border-slate-100 text-center text-xs">
        <p className="text-slate-600 font-medium">
          Don't have an account?{' '}
          <button
            onClick={() => setCurrentScreen('REGISTER')}
            className="font-extrabold text-[#15803d] hover:underline cursor-pointer"
          >
            Register as Joiner
          </button>
        </p>
      </div>
    </div>
  );
};
