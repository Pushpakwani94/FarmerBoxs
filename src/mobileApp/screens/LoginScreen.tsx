import React, { useState, useEffect, useRef } from 'react';
import {
  Lock,
  Smartphone,
  Eye,
  EyeOff,
  ArrowRight,
  UserPlus,
  Building2,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Edit2,
  ShieldCheck,
  ChevronDown
} from 'lucide-react';
import { useJoinerApp } from '../JoinerAppContext';

export const LoginScreen: React.FC = () => {
  const { setCurrentScreen, sendPhoneOtp, verifyPhoneOtp, resendPhoneOtp, loginUser } = useJoinerApp();

  // Tabs: PASSWORD vs QUICK OTP
  const [loginMode, setLoginMode] = useState<'PASSWORD' | 'OTP'>('PASSWORD');

  // Phone / Password State
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // OTP Flow State
  const [step, setStep] = useState<'ENTER_PHONE' | 'ENTER_OTP'>('ENTER_PHONE');
  const [formattedMobile, setFormattedMobile] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const otpInputsRef = useRef<Array<HTMLInputElement | null>>([]);
  const [resendCooldown, setResendCooldown] = useState(0);

  // Feedback State
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Resend OTP Cooldown Timer
  useEffect(() => {
    let timer: any = null;
    if (resendCooldown > 0) {
      timer = setInterval(() => {
        setResendCooldown(prev => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [resendCooldown]);

  const clearFeedback = () => {
    setErrorMessage('');
    setSuccessMessage('');
  };

  // Password Login Submission
  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    clearFeedback();

    const cleanMobile = mobileNumber.replace(/[^0-9]/g, '');
    if (!cleanMobile) {
      setErrorMessage('Please enter your mobile number.');
      return;
    }
    if (!password) {
      setErrorMessage('Please enter your password.');
      return;
    }

    setIsLoading(true);
    try {
      await loginUser(cleanMobile, password);
      setSuccessMessage('Logged in successfully! Loading dashboard...');
    } catch (err: any) {
      setErrorMessage(err.message || 'Login failed. Please check credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  // Quick Phone OTP Send
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    clearFeedback();

    const cleanMobile = mobileNumber.replace(/[^0-9]/g, '');
    if (cleanMobile.length !== 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await sendPhoneOtp(cleanMobile, 'recaptcha-container');
      setFormattedMobile(res.formattedPhone || `+91 ${cleanMobile}`);
      setSuccessMessage(res.message || 'OTP code generated successfully!');
      setStep('ENTER_OTP');
      setResendCooldown(30);
      setOtp(['', '', '', '', '', '']);
      setTimeout(() => {
        otpInputsRef.current[0]?.focus();
      }, 150);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to send OTP. Please check your number.');
    } finally {
      setIsLoading(false);
    }
  };

  // Verify OTP
  const handleVerifyOtp = async (e?: React.FormEvent, customOtpCode?: string) => {
    if (e) e.preventDefault();
    clearFeedback();

    const otpCode = (customOtpCode || otp.join('')).trim();
    if (otpCode.length !== 6) {
      setErrorMessage('Please enter all 6 digits of the OTP.');
      return;
    }

    setIsLoading(true);
    try {
      await verifyPhoneOtp(otpCode, mobileNumber);
      setSuccessMessage('OTP verified successfully! Redirecting...');
    } catch (err: any) {
      setErrorMessage(err.message || 'Invalid OTP code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFillTestOtp = () => {
    const testCode = ['1', '2', '3', '4', '5', '6'];
    setOtp(testCode);
    clearFeedback();
    setSuccessMessage('Test OTP 123456 filled! Tap Verify to login.');
    setTimeout(() => {
      otpInputsRef.current[5]?.focus();
    }, 50);
  };

  // Resend OTP Code
  const handleResendOtp = async () => {
    if (resendCooldown > 0 || isLoading) return;
    clearFeedback();
    setIsLoading(true);
    try {
      await resendPhoneOtp(mobileNumber, 'recaptcha-container');
      setSuccessMessage('New OTP sent successfully!');
      setResendCooldown(30);
      setOtp(['', '', '', '', '', '']);
    } catch (err: any) {
      setErrorMessage(err.message || 'Could not resend OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle OTP digit navigation
  const handleOtpChange = (index: number, value: string) => {
    clearFeedback();
    const cleanVal = value.replace(/[^0-9]/g, '');
    if (cleanVal.length === 6) {
      setOtp(cleanVal.split(''));
      otpInputsRef.current[5]?.focus();
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = cleanVal ? cleanVal.slice(-1) : '';
    setOtp(newOtp);

    if (cleanVal && index < 5) {
      otpInputsRef.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpInputsRef.current[index - 1]?.focus();
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#FAFDFB] select-none justify-between overflow-y-auto overflow-x-hidden relative">
      <div id="recaptcha-container"></div>

      {/* Top Header with Brand Logo */}
      <div className="pt-6 pb-2 px-6 flex flex-col items-center text-center space-y-2">
        <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-sm border border-emerald-100 bg-white p-1">
          <img
            src="/images/farmerbox_brand_logo.png"
            alt="FarmerBox"
            className="w-full h-full object-contain"
          />
        </div>
        <div>
          <h1 className="text-2xl font-black text-slate-900 leading-tight">
            Hotel Joiner Login
          </h1>
          <p className="text-xs font-bold text-slate-500 mt-0.5">
            Access your joiner dashboard
          </p>
        </div>
      </div>

      {/* Main Form Sheet */}
      <div className="flex-1 bg-white rounded-t-3xl border-t border-slate-100 shadow-lg p-6 flex flex-col justify-between space-y-4">
        
        {/* Mode Switcher Tabs: Password vs Quick OTP */}
        <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-2xl text-xs font-black">
          <button
            type="button"
            onClick={() => {
              setLoginMode('PASSWORD');
              clearFeedback();
            }}
            className={`py-2 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              loginMode === 'PASSWORD'
                ? 'bg-[#15803d] text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Password</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setLoginMode('OTP');
              clearFeedback();
            }}
            className={`py-2 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              loginMode === 'OTP'
                ? 'bg-[#15803d] text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Quick OTP</span>
          </button>
        </div>

        {/* Error / Success Feedback Banners */}
        {errorMessage && (
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <span className="font-bold leading-tight">{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="font-bold">{successMessage}</span>
          </div>
        )}

        {/* ================= PASSWORD FORM ================= */}
        {loginMode === 'PASSWORD' && (
          <form onSubmit={handlePasswordLogin} className="space-y-3.5 text-xs">
            {/* Mobile Number */}
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Mobile Number <span className="text-rose-500">*</span>
              </label>
              <div className="flex border border-slate-200 rounded-xl overflow-hidden focus-within:ring-1 focus-within:ring-emerald-600 bg-white">
                <span className="px-3 py-2.5 bg-slate-50 text-slate-600 font-bold border-r border-slate-200 text-xs flex items-center gap-1">
                  +91
                </span>
                <input
                  type="tel"
                  placeholder="Mobile number"
                  value={mobileNumber}
                  onChange={(e) => {
                    clearFeedback();
                    setMobileNumber(e.target.value.replace(/[^0-9]/g, ''));
                  }}
                  maxLength={10}
                  required
                  className="flex-1 px-3 py-2.5 text-xs text-slate-900 font-bold placeholder:text-slate-400 focus:outline-none"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="font-bold text-slate-700">
                  Password <span className="text-rose-500">*</span>
                </label>
              </div>
              <div className="relative border border-slate-200 rounded-xl overflow-hidden focus-within:ring-1 focus-within:ring-emerald-600 bg-white">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => {
                    clearFeedback();
                    setPassword(e.target.value);
                  }}
                  required
                  className="w-full pl-3 pr-10 py-2.5 text-xs text-slate-900 font-bold placeholder:text-slate-400 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center justify-between pt-0.5">
              <label className="flex items-center gap-2 cursor-pointer text-slate-600 text-xs font-medium">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4 accent-[#15803d]"
                />
                <span>Remember me on this device</span>
              </label>
            </div>

            {/* Login Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 bg-[#15803d] hover:bg-[#166534] active:scale-[0.99] disabled:opacity-60 text-white font-bold text-sm rounded-xl shadow-xs transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 animate-spin" /> Logging in...
                  </span>
                ) : (
                  <span>Login</span>
                )}
              </button>
            </div>
          </form>
        )}

        {/* ================= QUICK OTP FORM ================= */}
        {loginMode === 'OTP' && (
          <>
            {step === 'ENTER_PHONE' ? (
              <form onSubmit={handleSendOtp} className="space-y-3.5 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Mobile Number <span className="text-rose-500">*</span>
                  </label>
                  <div className="flex border border-slate-200 rounded-xl overflow-hidden focus-within:ring-1 focus-within:ring-emerald-600 bg-white">
                    <span className="px-3 py-2.5 bg-slate-50 text-slate-600 font-bold border-r border-slate-200 text-xs flex items-center gap-1">
                      +91
                    </span>
                    <input
                      type="tel"
                      placeholder="Mobile number"
                      value={mobileNumber}
                      onChange={(e) => {
                        clearFeedback();
                        setMobileNumber(e.target.value.replace(/[^0-9]/g, ''));
                      }}
                      maxLength={10}
                      autoFocus
                      required
                      className="flex-1 px-3 py-2.5 text-xs text-slate-900 font-bold placeholder:text-slate-400 focus:outline-none"
                    />
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    A 6-digit OTP will be sent to your mobile.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isLoading || mobileNumber.length < 10}
                  className="w-full py-3.5 bg-[#15803d] hover:bg-[#166534] disabled:opacity-50 text-white font-bold text-sm rounded-xl shadow-xs transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <RefreshCw className="w-4 h-4 animate-spin" /> Sending OTP...
                    </span>
                  ) : (
                    <span>Send OTP</span>
                  )}
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-3.5 text-xs">
                <div className="bg-emerald-50 p-2.5 rounded-xl border border-emerald-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-[#15803d]" />
                    <span className="font-bold text-slate-800 text-xs">{formattedMobile || '+91 ' + mobileNumber}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep('ENTER_PHONE')}
                    className="text-[#15803d] font-bold text-[11px] flex items-center gap-1 cursor-pointer"
                  >
                    <Edit2 className="w-3 h-3" /> Change
                  </button>
                </div>

                <div className="space-y-2 text-center">
                  <div className="flex items-center justify-between px-1">
                    <label className="block font-bold text-slate-700 text-xs">
                      Enter 6-Digit OTP
                    </label>
                    <button
                      type="button"
                      onClick={handleFillTestOtp}
                      className="text-[10px] font-black text-emerald-700 bg-emerald-100/70 hover:bg-emerald-200 px-2 py-0.5 rounded-md transition-colors cursor-pointer"
                    >
                      Fill 123456
                    </button>
                  </div>
                  <div className="flex items-center justify-center gap-1.5">
                    {[0, 1, 2, 3, 4, 5].map((index) => (
                      <input
                        key={index}
                        ref={(el) => { otpInputsRef.current[index] = el; }}
                        type="tel"
                        maxLength={1}
                        value={otp[index]}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                        className="w-10 h-12 text-center font-black text-lg border border-slate-300 rounded-xl bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                      />
                    ))}
                  </div>
                </div>

                <div className="text-center flex items-center justify-center gap-2">
                  {resendCooldown > 0 ? (
                    <span className="text-[11px] font-semibold text-slate-400">
                      Resend in <strong className="text-emerald-700">{resendCooldown}s</strong>
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={handleResendOtp}
                      disabled={isLoading}
                      className="text-[11px] font-bold text-[#15803d] hover:underline cursor-pointer"
                    >
                      Resend OTP
                    </button>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isLoading || otp.join('').length < 6}
                  className="w-full py-3.5 bg-[#15803d] hover:bg-[#166534] disabled:opacity-50 text-white font-bold text-sm rounded-xl shadow-xs transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <RefreshCw className="w-4 h-4 animate-spin" /> Verifying...
                    </span>
                  ) : (
                    <span>Verify & Login</span>
                  )}
                </button>
              </form>
            )}
          </>
        )}

        {/* OR Divider */}
        <div className="flex items-center justify-center gap-3">
          <span className="flex-1 h-[1px] bg-slate-200" />
          <span className="text-[10.5px] font-bold text-slate-400 uppercase tracking-wider">OR</span>
          <span className="flex-1 h-[1px] bg-slate-200" />
        </div>

        {/* Register as Joiner Secondary Button */}
        <button
          onClick={() => setCurrentScreen('REGISTER')}
          className="w-full py-3 bg-white hover:bg-emerald-50 active:scale-[0.99] border-2 border-[#15803d] text-[#15803d] font-bold text-xs rounded-xl shadow-2xs transition-all cursor-pointer flex items-center justify-center gap-2"
        >
          <UserPlus className="w-4 h-4" />
          <span>Register as Joiner</span>
        </button>
      </div>
    </div>
  );
};
