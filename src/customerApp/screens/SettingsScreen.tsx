import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Bell, 
  Shield, 
  Globe, 
  Moon, 
  Smartphone, 
  FileText, 
  Trash2, 
  ChevronRight,
  Check,
  Lock,
  ExternalLink
} from 'lucide-react';
import { useCustomerApp } from '../CustomerAppContext';

export const SettingsScreen: React.FC = () => {
  const { navigateTo } = useCustomerApp();

  const [pushNotifs, setPushNotifs] = useState(true);
  const [orderSms, setOrderSms] = useState(true);
  const [promos, setPromos] = useState(false);
  const [language, setLanguage] = useState<'English' | 'Hindi' | 'Marathi'>('English');
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="min-h-full bg-slate-50 flex flex-col pb-24">
      {/* Header */}
      <div className="bg-white sticky top-0 z-20 border-b border-slate-100 shadow-sm px-4 pt-12 pb-3 flex items-center gap-3">
        <button 
          onClick={() => navigateTo('profile')}
          className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 hover:bg-slate-200 active:scale-95 transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-lg font-bold text-slate-900">App Settings</h1>
          <p className="text-xs text-slate-500">Preferences, notifications & privacy</p>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Notifications Section */}
        <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-xs space-y-3">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Bell className="w-3.5 h-3.5 text-slate-500" />
            Notifications
          </h3>

          <div className="flex items-center justify-between py-1">
            <div>
              <p className="text-xs font-bold text-slate-800">Order Updates</p>
              <p className="text-[11px] text-slate-500">Real-time harvest & delivery tracking alerts</p>
            </div>
            <button
              onClick={() => setPushNotifs(!pushNotifs)}
              className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-0.5 ${
                pushNotifs ? 'bg-emerald-600' : 'bg-slate-300'
              }`}
            >
              <div className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
                pushNotifs ? 'translate-x-5' : 'translate-x-0'
              }`} />
            </button>
          </div>

          <div className="flex items-center justify-between py-1 border-t border-slate-100">
            <div>
              <p className="text-xs font-bold text-slate-800">SMS Notifications</p>
              <p className="text-[11px] text-slate-500">OTP & invoice verification texts</p>
            </div>
            <button
              onClick={() => setOrderSms(!orderSms)}
              className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-0.5 ${
                orderSms ? 'bg-emerald-600' : 'bg-slate-300'
              }`}
            >
              <div className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
                orderSms ? 'translate-x-5' : 'translate-x-0'
              }`} />
            </button>
          </div>

          <div className="flex items-center justify-between py-1 border-t border-slate-100">
            <div>
              <p className="text-xs font-bold text-slate-800">Exclusive Deals & Offers</p>
              <p className="text-[11px] text-slate-500">Daily harvest discounts & seasonal alerts</p>
            </div>
            <button
              onClick={() => setPromos(!promos)}
              className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-0.5 ${
                promos ? 'bg-emerald-600' : 'bg-slate-300'
              }`}
            >
              <div className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
                promos ? 'translate-x-5' : 'translate-x-0'
              }`} />
            </button>
          </div>
        </div>

        {/* Language & Display */}
        <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-xs space-y-3">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-slate-500" />
            Language & Display
          </h3>

          <div>
            <p className="text-xs font-bold text-slate-800 mb-2">Preferred Language</p>
            <div className="grid grid-cols-3 gap-2">
              {(['English', 'Hindi', 'Marathi'] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-1 ${
                    language === lang
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-800'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {language === lang && <Check className="w-3 h-3 text-emerald-600" />}
                  {lang === 'English' ? 'English' : lang === 'Hindi' ? 'हिंदी' : 'मराठी'}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            <div>
              <p className="text-xs font-bold text-slate-800">Dark Mode</p>
              <p className="text-[11px] text-slate-500">Easier on the eyes at night</p>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-0.5 ${
                darkMode ? 'bg-slate-900' : 'bg-slate-300'
              }`}
            >
              <div className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform ${
                darkMode ? 'translate-x-5' : 'translate-x-0'
              }`} />
            </button>
          </div>
        </div>

        {/* Legal & Security */}
        <div className="bg-white rounded-2xl border border-slate-100 p-4 shadow-xs space-y-2">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-slate-500" />
            Security & Legal
          </h3>

          {[
            { label: 'Privacy Policy', sub: 'How we protect your data' },
            { label: 'Terms of Service', sub: 'FarmerBox user agreement' },
            { label: 'GAP Organic Standards', sub: 'Our chemical-free pledge' },
          ].map((item, idx) => (
            <button
              key={idx}
              onClick={() => alert(`Viewing ${item.label}`)}
              className="w-full flex items-center justify-between py-2 border-b border-slate-50 last:border-0 hover:bg-slate-50/50 rounded-lg px-1 transition-colors text-left"
            >
              <div>
                <p className="text-xs font-bold text-slate-800">{item.label}</p>
                <p className="text-[11px] text-slate-400">{item.sub}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
          ))}
        </div>

        {/* Delete / Danger zone */}
        <button
          onClick={() => alert('Account deletion request registered. Farm support will confirm within 24 hours.')}
          className="w-full p-3 bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold rounded-2xl border border-red-200/80 flex items-center justify-center gap-2 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
          Delete FarmerBox Account
        </button>

        <div className="text-center pt-2">
          <p className="text-[11px] font-bold text-slate-400">FarmerBox B2C App v2.4.0 (Build 2026.09)</p>
          <p className="text-[10px] text-slate-400">Direct From Soil To Table</p>
        </div>
      </div>
    </div>
  );
};
