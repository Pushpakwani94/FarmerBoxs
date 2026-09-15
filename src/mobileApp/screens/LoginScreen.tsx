import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowLeft,
  Sprout,
  Lock,
  Eye,
  EyeOff,
  Smartphone,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Edit2
} from 'lucide-react';
import { useJoinerApp } from '../JoinerAppContext';

export const LoginScreen: React.FC = () => {
  const { setCurrentScreen, sendPhoneOtp, verifyPhoneOtp, resendPhoneOtp, loginUser } = useJoinerApp();

  // Tabs: PHONE_OTP (default) vs PASSWORD
  const [loginMode, setLoginMode] = useState<'OTP' | 'PASSWORD'>('OTP');

  // Phone OTP Flow State
  const [step, setStep] = useState<'ENTER_PHONE' | 'ENTER_OTP'>('ENTER_PHONE');
  const [mobile, setMobile] = useState('');
  const [formattedMobile, setFormattedMobile] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const otpInputsRef = useRef<Array<HTMLInputElement | null>>([]);

  // Password Flow State
  const [passwordIdentifier, setPasswordIdentifier] = useState('9876543210');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Status & Feedback States
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Resend OTP Cooldown Timer (30 seconds)
  const [resendCooldown, setResendCooldown] = useState(0);

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

  // Clean error/success messages on input change
  const clearFeedback = () => {
    setErrorMessage('');
    setSuccessMessage('');
  };

  // Step 1: Send Phone OTP via Firebase Auth
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    clearFeedback();

    const cleanNumber = mobile.replace(/[^0-9]/g, '');
    if (cleanNumber.length !== 10) {
      setErrorMessage('Please enter a valid 10-digit Indian mobile number.');
      return;
    }

    if (!/^[6-9]\d{9}$/.test(cleanNumber)) {
      setErrorMessage('Mobile number must start with 6, 7, 8, or 9.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await sendPhoneOtp(cleanNumber, 'recaptcha-container');
      setFormattedMobile(res.formattedPhone || `+91 ${cleanNumber}`);
      setSuccessMessage('OTP sent successfully to your mobile number!');
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

  // Step 2: Verify Entered 6-Digit OTP with Firebase Auth
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    clearFeedback();

    const otpCode = otp.join('').trim();
    if (otpCode.length !== 6) {
      setErrorMessage('Please enter all 6 digits of the OTP.');
      return;
    }

    setIsLoading(true);
    try {
      await verifyPhoneOtp(otpCode, mobile);
      setSuccessMessage('OTP verified successfully! Loading your dashboard...');
    } catch (err: any) {
      setErrorMessage(err.message || 'Invalid OTP code. Please check and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Resend OTP
  const handleResendOtp = async () => {
    if (resendCooldown > 0 || isLoading) return;
    clearFeedback();
    setIsLoading(true);
    try {
      await resendPhoneOtp(mobile, 'recaptcha-container');
      setSuccessMessage('New OTP sent successfully!');
      setResendCooldown(30);
      setOtp(['', '', '', '', '', '']);
      setTimeout(() => {
        otpInputsRef.current[0]?.focus();
      }, 150);
    } catch (err: any) {
      setErrorMessage(err.message || 'Could not resend OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // OTP Input Box Navigation Helpers
  const handleOtpChange = (index: number, value: string) => {
    clearFeedback();
    const cleanVal = value.replace(/[^0-9]/g, '');

    // Handle full 6-digit paste
    if (cleanVal.length === 6) {
      const splitDigits = cleanVal.split('');
      setOtp(splitDigits);
      otpInputsRef.current[5]?.focus();
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = cleanVal ? cleanVal.slice(-1) : '';
    setOtp(newOtp);

    // Auto-advance to next input
    if (cleanVal && index < 5) {
      otpInputsRef.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpInputsRef.current[index - 1]?.focus();
    }
  };

  // Fallback: Password Login Handler
  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    clearFeedback();

    if (!passwordIdentifier.trim()) {
      setErrorMessage('Please enter your mobile or email.');
      return;
    }
    if (!password) {
      setErrorMessage('Please enter your password.');
      return;
    }

    setIsLoading(true);
    try {
      await loginUser(passwordIdentifier, password);
      setSuccessMessage('Logged in successfully!');
    } catch (err: any) {
      setErrorMessage(err.message || 'Login failed. Invalid credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white select-none">
      {/* Hidden reCAPTCHA container for Firebase Phone Auth */}
      <div id="recaptcha-container"></div>

      {/* Top Navigation Bar */}
      <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
        <button
          onClick={() => {
            if (step === 'ENTER_OTP') {
              setStep('ENTER_PHONE');
              clearFeedback();
            } else {
              setCurrentScreen('WELCOME');
            }
          }}
          className="p-1 -ml-1 text-slate-700 hover:text-slate-900 cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-1.5 text-[#15803d]">
          <Sprout className="w-4 h-4 fill-[#15803d]" />
          <span className="font-extrabold text-sm tracking-tight">FarmerBox Joiner</span>
        </div>
        <div className="w-5"></div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
        {/* Headline */}
        <div className="space-y-1">
          <h2 className="text-xl font-black text-slate-900 leading-tight">
            {loginMode === 'OTP'
              ? (step === 'ENTER_PHONE' ? 'Joiner Phone Login' : 'Verify Phone OTP')
              : 'Password Login'}
          </h2>
          <p className="text-xs text-slate-500 font-medium leading-relaxed">
            {loginMode === 'OTP'
              ? (step === 'ENTER_PHONE'
                ? 'Enter your 10-digit mobile number to receive a secure Firebase verification OTP.'
                : `Enter the 6-digit OTP code sent via SMS to ${formattedMobile || '+91 ' + mobile}.`)
              : 'Enter your credentials to access your hotels, orders & commission.'}
          </p>
        </div>

        {/* Tab Switcher: Phone OTP vs Password */}
        <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-xl text-xs font-bold text-slate-600">
          <button
            type="button"
            onClick={() => {
              setLoginMode('OTP');
              clearFeedback();
            }}
            className={`py-1.5 rounded-lg transition-all cursor-pointer ${
              loginMode === 'OTP' ? 'bg-white text-[#15803d] shadow-xs' : 'hover:text-slate-900'
            }`}
          >
            📱 Phone OTP
          </button>
          <button
            type="button"
            onClick={() => {
              setLoginMode('PASSWORD');
              clearFeedback();
            }}
            className={`py-1.5 rounded-lg transition-all cursor-pointer ${
              loginMode === 'PASSWORD' ? 'bg-white text-[#15803d] shadow-xs' : 'hover:text-slate-900'
            }`}
          >
            🔒 Password
          </button>
        </div>

        {/* Error Notification Banner */}
        {errorMessage && (
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-start gap-2 animate-in fade-in">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <span className="font-medium leading-tight">{errorMessage}</span>
          </div>
        )}

        {/* Success Notification Banner */}
        {successMessage && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="font-bold">{successMessage}</span>
          </div>
        )}

        {/* ================= MODE 1: PHONE OTP FLOW ================= */}
        {loginMode === 'OTP' && (
          <>
            {step === 'ENTER_PHONE' ? (
              /* STEP 1: Enter Mobile Number */
              <form onSubmit={handleSendOtp} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Mobile Number <span className="text-rose-500">*</span>
                  </label>
                  <div className="flex border border-slate-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-emerald-500 bg-white">
                    <span className="px-3 py-2.5 bg-slate-50 text-slate-600 font-bold border-r border-slate-200 text-xs flex items-center gap-1">
                      <Smartphone className="w-3.5 h-3.5 text-slate-400" /> +91
                    </span>
                    <input
                      type="tel"
                      placeholder="Enter 10-digit mobile"
                      value={mobile}
                      onChange={(e) => {
                        clearFeedback();
                        setMobile(e.target.value.replace(/[^0-9]/g, ''));
                      }}
                      maxLength={10}
                      autoFocus
                      required
                      className="flex-1 px-3 py-2.5 text-xs text-slate-800 font-bold placeholder:text-slate-400 focus:outline-none tracking-wider"
                    />
                  </div>
                  <p className="text-[10.5px] text-slate-400 mt-1">
                    Standard SMS rates may apply. OTP will be sent from Firebase.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isLoading || mobile.length < 10}
                  className="w-full py-3 bg-[#15803d] hover:bg-[#166534] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-1.5">
                      <RefreshCw className="w-4 h-4 animate-spin" /> Sending OTP via Firebase...
                    </span>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4" />
                      <span>Send Verification OTP</span>
                    </>
                  )}
                </button>
              </form>
            ) : (
              /* STEP 2: Enter & Verify 6-Digit OTP */
              <form onSubmit={handleVerifyOtp} className="space-y-4 text-xs">
                {/* Phone Number Display with Edit Option */}
                <div className="bg-emerald-50/70 p-3 rounded-xl border border-emerald-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-emerald-700" />
                    <div>
                      <p className="text-[10px] text-slate-400 font-semibold uppercase">OTP Sent To</p>
                      <p className="text-xs font-bold text-slate-800">{formattedMobile || '+91 ' + mobile}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setStep('ENTER_PHONE');
                      clearFeedback();
                    }}
                    className="text-emerald-700 hover:text-emerald-900 font-bold text-[11px] flex items-center gap-1 cursor-pointer"
                  >
                    <Edit2 className="w-3 h-3" /> Change
                  </button>
                </div>

                {/* 6 Digit OTP Inputs */}
                <div className="space-y-2">
                  <label className="block font-bold text-slate-700 text-center">
                    Enter 6-Digit Verification Code
                  </label>
                  <div className="flex items-center justify-center gap-2 max-w-[280px] mx-auto">
                    {[0, 1, 2, 3, 4, 5].map((index) => (
                      <input
                        key={index}
                        ref={(el) => { otpInputsRef.current[index] = el; }}
                        type="tel"
                        maxLength={1}
                        value={otp[index]}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                        className="w-10 h-12 text-center font-black text-lg border border-slate-300 rounded-xl bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-2xs"
                      />
                    ))}
                  </div>
                </div>

                {/* Resend OTP Section with Cooldown */}
                <div className="text-center pt-1">
                  {resendCooldown > 0 ? (
                    <span className="text-[11px] font-semibold text-slate-400">
                      Resend OTP in <strong className="text-emerald-700">{resendCooldown}s</strong>
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={handleResendOtp}
                      disabled={isLoading}
                      className="text-[11px] font-bold text-[#15803d] hover:underline cursor-pointer inline-flex items-center gap-1"
                    >
                      <RefreshCw className={`w-3 h-3 ${isLoading ? 'animate-spin' : ''}`} />
                      Resend OTP Code
                    </button>
                  )}
                </div>

                {/* Verify Button */}
                <button
                  type="submit"
                  disabled={isLoading || otp.join('').length < 6}
                  className="w-full py-3 bg-[#15803d] hover:bg-[#166534] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-1.5">
                      <RefreshCw className="w-4 h-4 animate-spin" /> Verifying Code with Firebase...
                    </span>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4" />
                      <span>Verify & Login to Dashboard</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </>
        )}

        {/* ================= MODE 2: PASSWORD LOGIN ================= */}
        {loginMode === 'PASSWORD' && (
          <form onSubmit={handlePasswordLogin} className="space-y-3.5 text-xs">
            {/* Mobile/Email Input */}
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Mobile Number or Email <span className="text-rose-500">*</span>
              </label>
              <div className="flex border border-slate-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-emerald-500 bg-white">
                <span className="px-3 py-2 bg-slate-50 text-slate-500 font-semibold border-r border-slate-200 text-xs flex items-center gap-1">
                  <Smartphone className="w-3.5 h-3.5 text-slate-400" /> ID
                </span>
                <input
                  type="text"
                  placeholder="Enter 10-digit mobile or email"
                  value={passwordIdentifier}
                  onChange={(e) => {
                    clearFeedback();
                    setPasswordIdentifier(e.target.value);
                  }}
                  required
                  className="flex-1 px-3 py-2 text-xs text-slate-800 font-medium placeholder:text-slate-400 focus:outline-none"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="font-bold text-slate-700">
                  Password <span className="text-rose-500">*</span>
                </label>
                <button
                  type="button"
                  onClick={() => alert('Please contact administrator or use Phone OTP login.')}
                  className="text-[11px] font-bold text-[#15803d] hover:underline cursor-pointer"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => {
                    clearFeedback();
                    setPassword(e.target.value);
                  }}
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
                className="w-full py-3 bg-[#15803d] hover:bg-[#166534] disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <span className="flex items-center gap-1.5">
                    <RefreshCw className="w-4 h-4 animate-spin" /> Logging in...
                  </span>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>Login to Dashboard</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {/* Demo Fast-Fill Helper for Testing */}
        <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/80 text-[10.5px] text-slate-500 text-center space-y-1">
          <p>
            Joiner Demo: <strong className="text-slate-800">9876543210</strong> (Rahul Patil)
          </p>
          <p className="text-[10px] text-slate-400">
            Real Firebase OTP will be sent directly to any active mobile number entered.
          </p>
        </div>
      </div>

      {/* Bottom Switcher: Register New Account */}
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
