import React, { useState } from 'react';
import {
  ArrowLeft,
  User,
  Smartphone,
  Mail,
  MapPin,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
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
  const [errorMessage, setErrorMessage] = useState('');
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
    setErrorMessage('');

    if (!name || !mobile || !email || !zone || !password) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    const cleanMobile = mobile.replace(/[^0-9]/g, '');
    if (cleanMobile.length !== 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number.');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    if (!agreeTerms) {
      setErrorMessage('Please accept the Terms & Conditions.');
      return;
    }

    setIsLoading(true);
    try {
      await registerUser({
        name: name.trim(),
        phone: cleanMobile,
        email: email.trim(),
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
      setErrorMessage(err.message || 'Registration failed. Please try again.');
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
        <div className="flex items-center gap-2">
          <img
            src="/images/farmerbox_brand_logo.png"
            alt="FarmerBox"
            className="w-6 h-6 object-contain rounded-md"
          />
          <span className="font-black text-sm text-[#0D472B] tracking-tight">FarmerBox</span>
        </div>
        <div className="w-5"></div>
      </div>

      {/* Form Content */}
      <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
        {isSuccess ? (
          <div className="py-16 text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-lg font-black text-slate-900">Registration Successful!</h3>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              Your account has been created successfully. Loading dashboard...
            </p>
          </div>
        ) : (
          <>
            {/* Headline */}
            <div className="space-y-1 text-center">
              <h2 className="text-2xl font-black text-slate-900">
                Create Account
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Register as a Hotel Joiner
              </p>
            </div>

            {/* Error Notification Banner */}
            {errorMessage && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span className="font-medium leading-tight">{errorMessage}</span>
              </div>
            )}

            {/* Registration Form */}
            <form onSubmit={handleRegister} className="space-y-3.5 text-xs">
              {/* Full Name */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:outline-emerald-600"
                  />
                </div>
              </div>

              {/* Mobile Number */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Mobile Number <span className="text-rose-500">*</span>
                </label>
                <div className="flex border border-slate-200 rounded-xl overflow-hidden focus-within:ring-1 focus-within:ring-emerald-600">
                  <span className="px-3 py-2.5 bg-slate-50 text-slate-500 font-semibold border-r border-slate-200 text-xs flex items-center gap-1">
                    <Smartphone className="w-3.5 h-3.5 text-slate-400" /> +91
                  </span>
                  <input
                    type="tel"
                    placeholder="Mobile number"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    maxLength={10}
                    required
                    className="flex-1 px-3 py-2.5 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Email Address */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Email Address <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:outline-emerald-600"
                  />
                </div>
              </div>

              {/* Operating Zone */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Operating Zone <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <select
                    value={zone}
                    onChange={(e) => setZone(e.target.value)}
                    required
                    className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl text-xs text-slate-800 bg-white focus:outline-emerald-600"
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
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full pl-3 pr-8 py-2.5 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:outline-emerald-600"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2.5 top-3 text-slate-400 cursor-pointer"
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
                    placeholder="Confirm"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:outline-emerald-600"
                  />
                </div>
              </div>

              {/* Referral Code */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Referral Code <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <div className="relative">
                  <Gift className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="Referral code"
                    value={referralCode}
                    onChange={(e) => setReferralCode(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:outline-emerald-600 uppercase"
                  />
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-slate-600 text-xs">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    required
                    className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                  />
                  <span>
                    I agree to the <strong className="text-[#15803d]">Terms & Conditions</strong>
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3.5 bg-[#15803d] hover:bg-[#166534] text-white font-bold text-sm rounded-xl shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  {isLoading ? 'Creating Account...' : 'Register'}
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
            Login
          </button>
        </p>
      </div>
    </div>
  );
};
