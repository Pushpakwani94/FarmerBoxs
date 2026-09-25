import React, { useState } from 'react';
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  Shield,
  Building2,
  Smartphone,
  CheckCircle2,
  AlertCircle,
  MapPin,
  User,
  Phone,
  HelpCircle,
  KeyRound,
  ShieldAlert,
  Send,
  Check,
  Clock
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { authService, type AdminAccessRequest } from '../firebase/authService';

export const LoginPage: React.FC = () => {
  const { loginAdmin, isDatabaseConnected } = useApp();

  const [activeTab, setActiveTab] = useState<'LOGIN' | 'REQUEST_ACCESS'>('LOGIN');

  // Login Form State
  const [email, setEmail] = useState('admin@farmerbox.com');
  const [password, setPassword] = useState('Admin@123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Request Access State
  const [reqName, setReqName] = useState('');
  const [reqEmail, setReqEmail] = useState('');
  const [reqPhone, setReqPhone] = useState('');
  const [reqDepartment, setReqDepartment] = useState('Operations & Dispatch');
  const [reqRole, setReqRole] = useState('Operations Manager');
  const [reqReason, setReqReason] = useState('');

  // Status State
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!email.trim()) {
      setErrorMsg('Please enter your admin email or phone number.');
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
      setErrorMsg(err.message || 'Access Denied: Only Super Admin (Pushpak Wani) or Super Admin approved accounts can access this console.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRequestAccessSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!reqName.trim() || !reqEmail.trim() || !reqPhone.trim()) {
      setErrorMsg('Please fill in your name, email, and mobile number.');
      return;
    }

    setIsLoading(true);
    try {
      await authService.requestAdminAccess({
        name: reqName.trim(),
        email: reqEmail.trim(),
        phone: reqPhone.trim(),
        department: reqDepartment,
        requestedRole: reqRole,
        reason: reqReason.trim() || `Requesting ${reqRole} access to manage operations.`
      });

      setSuccessMsg(`Access Request submitted to Super Admin (Pushpak Wani)! Only Super Admin can approve and grant permission to this portal. You will receive an alert once approved.`);
      setReqName('');
      setReqEmail('');
      setReqPhone('');
      setReqReason('');
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to submit request. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickSuperAdminLogin = async () => {
    setEmail('admin@farmerbox.com');
    setPassword('Admin@123');
    setIsLoading(true);
    setErrorMsg(null);
    try {
      await loginAdmin('admin@farmerbox.com', 'Admin@123');
    } catch (err: any) {
      setErrorMsg(err.message || 'Login error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 flex flex-col justify-between select-none font-sans text-slate-800 relative overflow-y-auto">
      
      {/* Top Background Ambient Banner */}
      <div className="absolute top-0 left-0 right-0 h-80 bg-gradient-to-b from-[#15803d] via-emerald-800 to-slate-900 pointer-events-none" />

      {/* Top Header */}
      <header className="relative z-10 px-6 py-4 max-w-5xl mx-auto w-full flex items-center justify-between text-white">
        <div className="flex items-center gap-3">
          <img
            src="/farmerbox_app_icon.png"
            alt="FarmerBoxs Logo"
            className="w-10 h-10 rounded-xl object-contain bg-white p-1 shadow-md shrink-0"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-black text-lg tracking-tight leading-none text-white">FarmerBoxs</h1>
              <span className="text-[10px] bg-white/20 text-white font-mono font-bold px-1.5 py-0.2 rounded">v2.5</span>
            </div>
            <p className="text-[11px] text-emerald-100 font-medium mt-0.5">Farm Fresh to Your Door</p>
          </div>
        </div>

        {/* Security & Cloud Status Pill */}
        <div className="flex items-center gap-2 text-xs">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold text-[11px]">
            <span className={`w-2 h-2 rounded-full ${isDatabaseConnected ? 'bg-emerald-300 animate-pulse' : 'bg-amber-300'}`} />
            <span>{isDatabaseConnected ? 'System Secured' : 'Active'}</span>
          </span>
        </div>
      </header>

      {/* Main Container */}
      <main className="relative z-10 flex-1 flex items-center justify-center p-4 sm:p-6 my-2">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl shadow-slate-900/15 border border-slate-200 overflow-hidden">
          
          {/* Card Top Banner with Super Admin Access Notice */}
          <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-[#15803d] p-6 text-white text-center relative">
            <div className="w-14 h-14 rounded-2xl bg-white p-1 shadow-lg mx-auto mb-3 flex items-center justify-center">
              <img
                src="/farmerbox_app_icon.png"
                alt="FarmerBox"
                className="w-full h-full object-contain rounded-xl"
              />
            </div>
            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-900/60 border border-emerald-400/40 text-[10.5px] font-bold text-emerald-200 mb-1">
              <KeyRound className="w-3 h-3 text-emerald-300" />
              <span>Restricted Administrative Portal</span>
            </div>
            <h2 className="text-xl font-extrabold tracking-tight text-white">Super Admin Access Console</h2>
            <p className="text-xs text-emerald-100 font-medium mt-1">
              Access is strictly governed by Super Admin (Pushpak Wani)
            </p>
          </div>

          <div className="p-6 sm:p-7 space-y-5">
            {/* Segmented Switcher: Sign In | Request Access */}
            <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-2xl border border-slate-200 text-xs font-bold">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('LOGIN');
                  setErrorMsg(null);
                  setSuccessMsg(null);
                }}
                className={`py-2 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  activeTab === 'LOGIN'
                    ? 'bg-white text-slate-900 shadow-xs font-extrabold'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Lock className="w-3.5 h-3.5 text-emerald-700" />
                <span>Admin Sign In</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab('REQUEST_ACCESS');
                  setErrorMsg(null);
                  setSuccessMsg(null);
                }}
                className={`py-2 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  activeTab === 'REQUEST_ACCESS'
                    ? 'bg-white text-slate-900 shadow-xs font-extrabold'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Shield className="w-3.5 h-3.5 text-amber-600" />
                <span>Request Permission</span>
              </button>
            </div>

            {/* Error Message */}
            {errorMsg && (
              <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs font-medium flex items-start gap-2.5 animate-in fade-in">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-600 mt-0.5" />
                <span className="leading-snug">{errorMsg}</span>
              </div>
            )}

            {/* Success Message */}
            {successMsg && (
              <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-medium flex items-start gap-2.5 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600 mt-0.5" />
                <span className="leading-snug">{successMsg}</span>
              </div>
            )}

            {/* 1. ADMIN SIGN IN FORM */}
            {activeTab === 'LOGIN' && (
              <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs text-left">
                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">Admin Email / Mobile</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="admin@farmerbox.com"
                      className="w-full pl-10 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none placeholder:text-slate-400 text-xs font-medium"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="font-bold text-slate-700">Password</label>
                    <button
                      type="button"
                      onClick={() => {
                        setEmail('admin@farmerbox.com');
                        setPassword('Admin@123');
                      }}
                      className="text-[11px] text-emerald-700 font-bold hover:underline cursor-pointer"
                    >
                      Fill Default (Admin@123)
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none placeholder:text-slate-400 text-xs font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
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
                  <span className="text-slate-400 text-[11px] flex items-center gap-1">
                    <Shield className="w-3 h-3 text-emerald-600" />
                    <span>256-bit Encrypted</span>
                  </span>
                </div>

                {/* Primary Sign In Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-[#15803d] hover:bg-[#166534] disabled:opacity-50 text-white font-black text-xs rounded-xl shadow-md shadow-emerald-700/20 flex items-center justify-center gap-2 cursor-pointer transition-all"
                >
                  {isLoading ? (
                    <span>Verifying Permissions...</span>
                  ) : (
                    <>
                      <span>Sign In to Super Admin Console</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                {/* 1-Click Fast Login as Pushpak Wani (Super Admin) */}
                <div className="pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={handleQuickSuperAdminLogin}
                    disabled={isLoading}
                    className="w-full py-2.5 px-3.5 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 font-bold text-xs rounded-xl flex items-center justify-between cursor-pointer transition-all shadow-2xs group"
                  >
                    <div className="flex items-center gap-2.5">
                      <img
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100"
                        alt="Pushpak Wani"
                        className="w-6 h-6 rounded-full object-cover border border-emerald-600 shrink-0"
                      />
                      <div className="text-left leading-tight">
                        <p className="font-extrabold text-slate-900 text-[11px]">Pushpak Wani</p>
                        <p className="text-[9.5px] text-emerald-700 font-semibold">Super Admin (Authorized Access)</p>
                      </div>
                    </div>
                    <Sparkles className="w-4 h-4 text-emerald-600 group-hover:scale-110 transition-transform" />
                  </button>
                </div>
              </form>
            )}

            {/* 2. REQUEST ADMIN ACCESS / PERMISSION FORM */}
            {activeTab === 'REQUEST_ACCESS' && (
              <form onSubmit={handleRequestAccessSubmit} className="space-y-3 text-xs text-left">
                {/* Permission Warning Callout */}
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-xs text-amber-950">
                    <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0" />
                    <span>Super Admin Approval Required</span>
                  </div>
                  <p className="text-[11px] text-amber-800 leading-tight">
                    Others cannot self-join. You must submit your details so <strong>Super Admin Pushpak Wani</strong> can grant you access.
                  </p>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Full Name *</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={reqName}
                      onChange={e => setReqName(e.target.value)}
                      placeholder="Enter your full name"
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none placeholder:text-slate-400 text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Work Email Address *</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={reqEmail}
                      onChange={e => setReqEmail(e.target.value)}
                      placeholder="your.name@farmerbox.in"
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none placeholder:text-slate-400 text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Mobile Number (WhatsApp) *</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      maxLength={10}
                      value={reqPhone}
                      onChange={e => setReqPhone(e.target.value.replace(/[^0-9]/g, ''))}
                      placeholder="9822100000"
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none placeholder:text-slate-400 text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Department</label>
                    <select
                      value={reqDepartment}
                      onChange={e => setReqDepartment(e.target.value)}
                      className="w-full px-2.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none text-xs cursor-pointer font-medium"
                    >
                      <option value="Operations & Dispatch">Operations & Dispatch</option>
                      <option value="Hotel Procurement">Hotel Procurement</option>
                      <option value="Finance & Accounts">Finance & Accounts</option>
                      <option value="Driver Fleet Management">Driver Fleet</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Requested Role</label>
                    <select
                      value={reqRole}
                      onChange={e => setReqRole(e.target.value)}
                      className="w-full px-2.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none text-xs cursor-pointer font-medium"
                    >
                      <option value="Operations Manager">Operations Manager</option>
                      <option value="Dispatch Supervisor">Dispatch Supervisor</option>
                      <option value="Finance Auditor">Finance Auditor</option>
                      <option value="Zone Admin">Zone Admin</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Reason for Access</label>
                  <textarea
                    rows={2}
                    value={reqReason}
                    onChange={e => setReqReason(e.target.value)}
                    placeholder="Briefly state your operational responsibilities..."
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none placeholder:text-slate-400 text-xs resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2.5 bg-[#15803d] hover:bg-[#166534] disabled:opacity-50 text-white font-black text-xs rounded-xl shadow-md shadow-emerald-700/20 flex items-center justify-center gap-2 cursor-pointer transition-all mt-1"
                >
                  {isLoading ? (
                    <span>Submitting Request...</span>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Submit Request to Super Admin</span>
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Quick App Navigation Links */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
              <a
                href="?app=customer"
                className="text-emerald-700 hover:text-emerald-800 font-bold hover:underline flex items-center gap-1"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Customer B2C App</span>
              </a>
              <span>•</span>
              <a
                href="?mode=mobile"
                className="text-orange-600 hover:text-orange-700 font-bold hover:underline flex items-center gap-1"
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>Joiner B2B App</span>
              </a>
              <span>•</span>
              <span className="text-slate-400">HQ Pune</span>
            </div>

          </div>
        </div>
      </main>

      {/* Clean Bottom Footer */}
      <footer className="relative z-10 p-4 text-center text-slate-400 text-[11px] border-t border-slate-200 bg-white">
        © 2026 FarmerBox Technologies Private Limited • Super Admin Console Governed by Pushpak Wani
      </footer>
    </div>
  );
};
