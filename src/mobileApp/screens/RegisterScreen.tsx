import React, { useState } from 'react';
import {
  ArrowLeft,
  Sprout,
  User,
  Smartphone,
  Mail,
  MapPin,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  Gift
} from 'lucide-react';
import { useJoinerApp } from '../JoinerAppContext';

export const RegisterScreen: React.FC = () => {
  const { setCurrentScreen, registerUser } = useJoinerApp();

  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [zone, setZone] = useState('Kharadi');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const zonesList = [
    'Kharadi',
    'Viman Nagar',
    'Hinjawadi',
    'Magarpatta',
    'Hadapsar',
    'Baner',
    'Wakad',
    'Aundh',
    'Shivajinagar',
    'Undri',
    'Kothrud',
    'Pimpri Chinchwad'
  ];

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !mobile || !email || !zone || !password) {
      alert('Please fill all required fields');
      return;
    }

    if (mobile.length < 10) {
      alert('Please enter a valid 10-digit mobile number');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    if (!agreeTerms) {
      alert('Please agree to terms and conditions');
      return;
    }

    setIsLoading(true);
    try {
      await registerUser({
        name,
        phone: mobile,
        email,
        zone,
        password
      });
      setIsLoading(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        setCurrentScreen('DASHBOARD');
      }, 1200);
    } catch (err: any) {
      setIsLoading(false);
      alert(err.message || 'Registration failed');
    }
  };

  return (
    <div className="flex flex-col h-full bg-white select-none">
      {/* Top Header */}
      <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
        <button
          onClick={() => setCurrentScreen('LOGIN')}
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
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3.5">
        {isSuccess ? (
          <div className="py-16 text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-lg font-black text-slate-900">Welcome to FarmerBox!</h3>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              Your Joiner Account for <strong>{name}</strong> in {zone} Zone has been created successfully.
            </p>
          </div>
        ) : (
          <>
            {/* Headline */}
            <div className="space-y-1">
              <h2 className="text-xl font-black text-slate-900 leading-tight">
                Joiner Registration
              </h2>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                Connect hotels with fresh vegetables & earn <strong className="text-emerald-700">₹100</strong> per delivered order.
              </p>
            </div>

            {/* Registration Form */}
            <form onSubmit={handleRegister} className="space-y-3 text-xs">
              {/* Full Name */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="e.g. Rahul Patil"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:outline-emerald-600"
                  />
                </div>
              </div>

              {/* Mobile Number */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Mobile Number <span className="text-rose-500">*</span>
                </label>
                <div className="flex border border-slate-200 rounded-xl overflow-hidden focus-within:ring-1 focus-within:ring-emerald-600">
                  <span className="px-3 py-2 bg-slate-50 text-slate-500 font-semibold border-r border-slate-200 text-xs flex items-center gap-1">
                    <Smartphone className="w-3.5 h-3.5 text-slate-400" /> +91
                  </span>
                  <input
                    type="tel"
                    placeholder="10-digit mobile"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    maxLength={10}
                    required
                    className="flex-1 px-3 py-2 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Email Address */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Email Address <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="email"
                    placeholder="rahul@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:outline-emerald-600"
                  />
                </div>
              </div>

              {/* Operating Zone */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Operating Zone <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                  <select
                    value={zone}
                    onChange={(e) => setZone(e.target.value)}
                    required
                    className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-xl text-xs text-slate-800 bg-white focus:outline-emerald-600"
                  >
                    {zonesList.map(z => (
                      <option key={z} value={z}>{z} Zone</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Password & Confirm */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Password <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Min 6 chars"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full pl-3 pr-8 py-2 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:outline-emerald-600"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2.5 top-2.5 text-slate-400 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Confirm <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Re-enter"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:outline-emerald-600"
                  />
                </div>
              </div>

              {/* Referral Code */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Referral Code <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <div className="relative">
                  <Gift className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Enter referral code (e.g. JOIN500)"
                    value={referralCode}
                    onChange={(e) => setReferralCode(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:outline-emerald-600 uppercase"
                  />
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="pt-1">
                <label className="flex items-start gap-2 cursor-pointer text-slate-600 text-[11px] leading-tight">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    required
                    className="rounded text-emerald-600 focus:ring-emerald-500 w-3.5 h-3.5 mt-0.5"
                  />
                  <span>
                    I agree to the <strong className="text-[#15803d]">FarmerBox Joiner Terms</strong> and commission payout policy.
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-[#15803d] hover:bg-[#166534] text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  {isLoading ? 'Creating Account...' : 'Create Joiner Account'}
                </button>
              </div>
            </form>
          </>
        )}
      </div>

      {/* Bottom Switcher */}
      <div className="p-4 border-t border-slate-100 text-center text-xs">
        <p className="text-slate-600 font-medium">
          Already registered?{' '}
          <button
            onClick={() => setCurrentScreen('LOGIN')}
            className="font-extrabold text-[#15803d] hover:underline cursor-pointer"
          >
            Login here
          </button>
        </p>
      </div>
    </div>
  );
};
