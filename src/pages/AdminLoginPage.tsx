import React, { useState } from 'react';
import {
  Sprout,
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  User,
  Phone,
  MapPin,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { authService } from '../firebase/authService';

export const AdminLoginPage: React.FC = () => {
  const { loginAdmin, isDatabaseConnected } = useApp();

  const [activeTab, setActiveTab] = useState<'LOGIN' | 'REGISTER'>('LOGIN');

  // Login State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Register State
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [regZone, setRegZone] = useState('All Zones (HQ)');
  const [showRegPassword, setShowRegPassword] = useState(false);

  // Status State
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!email.trim()) {
      setErrorMsg('Please enter your email address.');
      return;
    }
    if (!password) {
      setErrorMsg('Please enter your password.');
      return;
    }

    setIsLoading(true);
    try {
      await loginAdmin(email.trim(), password);
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to authenticate admin.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!regName.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    if (!regEmail.trim()) {
      setErrorMsg('Please enter your email address.');
      return;
    }
    if (!regPhone.trim()) {
      setErrorMsg('Please enter your 10-digit mobile number.');
      return;
    }
    if (!regPassword || regPassword.length < 6) {
      setErrorMsg('Password must be at least 6 characters.');
      return;
    }
    if (regPassword !== regConfirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }

    setIsLoading(true);
    try {
      // Register with authService
      await authService.registerJoiner({
        name: regName.trim(),
        email: regEmail.trim(),
        phone: regPhone.trim(),
        zone: regZone,
        password: regPassword
      });

      setSuccessMsg('Account registered successfully! Logging you in...');
      setTimeout(async () => {
        await loginAdmin(regEmail.trim(), regPassword);
      }, 700);
    } catch (err: any) {
      setErrorMsg(err.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 text-slate-800 flex flex-col justify-between relative overflow-y-auto font-sans select-none">
      {/* Background Soft Glow Accents */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-72 bg-gradient-to-b from-emerald-100/60 to-transparent blur-3xl pointer-events-none" />

      {/* Top Header with Status */}
      <header className="px-6 py-4 max-w-5xl mx-auto w-full flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <img
            src="/farmerbox_app_icon.png"
            alt="FarmerBoxs App Icon"
            className="w-10 h-10 rounded-xl object-contain bg-white p-0.5 border border-slate-200 shadow-sm shrink-0"
          />
          <div>
            <h1 className="font-extrabold text-xl text-slate-900 tracking-tight leading-none">FarmerBoxs</h1>
            <p className="text-[11px] text-[#15803d] font-semibold mt-0.5">Farm Fresh to Your Door</p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-600 font-semibold shadow-2xs">
            <span className={`w-2 h-2 rounded-full ${isDatabaseConnected ? 'bg-emerald-500 animate-pulse' : 'bg-amber-400'}`} />
            {isDatabaseConnected ? 'System Online' : 'Database Active'}
          </span>
        </div>
      </header>

      {/* Center Auth Card */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 z-10 my-4">
        <div className="bg-white rounded-3xl p-7 sm:p-9 border border-slate-200/90 shadow-xl shadow-slate-200/50 max-w-md w-full space-y-6">
          
          {/* Logo & Brand Header */}
          <div className="text-center space-y-2">
            <img
              src="/farmerbox_app_icon.png"
              alt="FarmerBoxs Logo"
              className="w-16 h-16 rounded-2xl object-contain mx-auto shadow-sm p-1 border border-slate-200 bg-white"
            />
            <div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">FarmerBoxs</h2>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                {activeTab === 'LOGIN' ? 'Sign in to access Admin Console' : 'Create a new FarmerBox account'}
              </p>
            </div>
          </div>

          {/* Segmented Switcher: Login | Register */}
          <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-2xl border border-slate-200 text-xs font-bold">
            <button
              type="button"
              onClick={() => {
                setActiveTab('LOGIN');
                setErrorMsg(null);
                setSuccessMsg(null);
              }}
              className={`py-2.5 rounded-xl transition-all cursor-pointer ${
                activeTab === 'LOGIN'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab('REGISTER');
                setErrorMsg(null);
                setSuccessMsg(null);
              }}
              className={`py-2.5 rounded-xl transition-all cursor-pointer ${
                activeTab === 'REGISTER'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Register
            </button>
          </div>

          {/* Error & Success Feedback Banners */}
          {errorMsg && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs font-medium flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-medium flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* 1. LOGIN FORM */}
          {activeTab === 'LOGIN' && (
            <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs text-left">
              <div>
                <label className="block font-bold text-slate-700 mb-1.5">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="admin@farmerbox.com"
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none placeholder:text-slate-400 text-xs"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="font-bold text-slate-700">Password</label>
                  <span className="text-[11px] text-emerald-700 font-semibold cursor-pointer hover:underline">
                    Default: Admin@123
                  </span>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none placeholder:text-slate-400 text-xs font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500 pt-0.5">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={e => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                  />
                  <span className="text-slate-600 font-medium">Keep me signed in</span>
                </label>
                <span className="text-slate-400 text-[11px]">256-bit Secure</span>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-[#15803d] hover:bg-[#166534] disabled:opacity-50 text-white font-black text-xs rounded-xl shadow-md shadow-emerald-700/20 flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                {isLoading ? (
                  <span>Signing in...</span>
                ) : (
                  <>
                    <span>Sign In to FarmerBox</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* 2. REGISTER FORM */}
          {activeTab === 'REGISTER' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-3.5 text-xs text-left">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={regName}
                    onChange={e => setRegName(e.target.value)}
                    placeholder="Enter full name"
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none placeholder:text-slate-400 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={regEmail}
                    onChange={e => setRegEmail(e.target.value)}
                    placeholder="admin@farmerbox.com"
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none placeholder:text-slate-400 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Mobile Number</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    value={regPhone}
                    onChange={e => setRegPhone(e.target.value.replace(/[^0-9]/g, ''))}
                    placeholder="9876543210"
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none placeholder:text-slate-400 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Operating Zone</label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <select
                    value={regZone}
                    onChange={e => setRegZone(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none text-xs cursor-pointer font-medium"
                  >
                    <option value="All Zones (HQ)">All Zones (HQ)</option>
                    <option value="Kharadi Zone">Kharadi Zone</option>
                    <option value="Viman Nagar Zone">Viman Nagar Zone</option>
                    <option value="Hinjawadi Zone">Hinjawadi Zone</option>
                    <option value="Baner Zone">Baner Zone</option>
                    <option value="Magarpatta Zone">Magarpatta Zone</option>
                    <option value="Wakad Zone">Wakad Zone</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Password</label>
                  <div className="relative">
                    <input
                      type={showRegPassword ? 'text' : 'password'}
                      required
                      value={regPassword}
                      onChange={e => setRegPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none placeholder:text-slate-400 text-xs font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Confirm</label>
                  <div className="relative">
                    <input
                      type={showRegPassword ? 'text' : 'password'}
                      required
                      value={regConfirmPassword}
                      onChange={e => setRegConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none placeholder:text-slate-400 text-xs font-mono"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-[#15803d] hover:bg-[#166534] disabled:opacity-50 text-white font-black text-xs rounded-xl shadow-md shadow-emerald-700/20 flex items-center justify-center gap-2 cursor-pointer transition-all mt-2"
              >
                {isLoading ? (
                  <span>Registering...</span>
                ) : (
                  <>
                    <span>Create FarmerBox Account</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

        </div>
      </main>

      {/* Clean Bottom Footer */}
      <footer className="p-4 text-center text-slate-400 text-[11px] border-t border-slate-200/80 z-10 bg-white/70 backdrop-blur-xs">
        © 2026 FarmerBox Technologies Private Limited • Fresh from Farmers to Hotels
      </footer>
    </div>
  );
};
