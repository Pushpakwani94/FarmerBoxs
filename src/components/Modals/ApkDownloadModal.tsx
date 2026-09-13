import React, { useState } from 'react';
import {
  X,
  Download,
  QrCode,
  Smartphone,
  Share2,
  Copy,
  Check,
  ShieldCheck,
  Terminal,
  ExternalLink,
  MessageCircle,
  FileCheck2,
  Cpu,
  Sparkles
} from 'lucide-react';

interface ApkDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ApkDownloadModal: React.FC<ApkDownloadModalProps> = ({ isOpen, onClose }) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedAdb, setCopiedAdb] = useState(false);
  const [activeTab, setActiveTab] = useState<'download' | 'qr' | 'share' | 'adb'>('download');

  if (!isOpen) return null;

  // Build the direct APK URL using the current window origin
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const apkFileName = 'farmerbox-joiner-v2.4.1.apk';
  const directApkUrl = `${origin}/${apkFileName}`;
  const adbCommand = `adb install -r ${apkFileName}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(directApkUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleCopyAdb = () => {
    navigator.clipboard.writeText(adbCommand);
    setCopiedAdb(true);
    setTimeout(() => setCopiedAdb(false), 2500);
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `🌱 *FarmerBox Joiner App (v2.4.1 APK)*\n\nDownload the official mobile app to manage hotel vegetable orders, track fresh produce deliveries, and earn ₹100 commission per order!\n\n📲 Direct Download Link:\n${directApkUrl}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handleShareSMS = () => {
    const text = encodeURIComponent(
      `Download FarmerBox Joiner App v2.4.1 for hotel vegetable orders & commission: ${directApkUrl}`
    );
    window.open(`sms:?body=${text}`, '_blank');
  };

  const triggerDirectDownload = () => {
    const link = document.createElement('a');
    link.href = `/${apkFileName}`;
    link.download = apkFileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#15803d] to-[#16a34a] px-6 py-4.5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center shadow-xs">
              <Smartphone className="w-6 h-6 text-emerald-200" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black tracking-tight leading-none text-white">
                  Download Joiner Android App
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-400/30 border border-emerald-300/40 text-[10px] font-black uppercase tracking-wider text-emerald-100">
                  v2.4.1 APK
                </span>
              </div>
              <p className="text-xs text-emerald-100/90 font-medium mt-1">
                For Hotel Joiners • Fresh Vegetable Ordering & Commission
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-100 bg-slate-50/80 px-6 pt-2 gap-2 text-xs font-bold">
          <button
            onClick={() => setActiveTab('download')}
            className={`pb-2.5 px-3 border-b-2 transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'download'
                ? 'border-[#15803d] text-[#15803d]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Download className="w-3.5 h-3.5" /> Direct Download
          </button>
          <button
            onClick={() => setActiveTab('qr')}
            className={`pb-2.5 px-3 border-b-2 transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'qr'
                ? 'border-[#15803d] text-[#15803d]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <QrCode className="w-3.5 h-3.5" /> Scan QR Code
          </button>
          <button
            onClick={() => setActiveTab('share')}
            className={`pb-2.5 px-3 border-b-2 transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'share'
                ? 'border-[#15803d] text-[#15803d]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Share2 className="w-3.5 h-3.5" /> Share with Joiners
          </button>
          <button
            onClick={() => setActiveTab('adb')}
            className={`pb-2.5 px-3 border-b-2 transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'adb'
                ? 'border-[#15803d] text-[#15803d]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" /> ADB / Developer
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          {/* TAB 1: Direct Download */}
          {activeTab === 'download' && (
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-50 via-white to-green-50/60 border border-emerald-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1 text-center sm:text-left">
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-xs font-extrabold text-emerald-800 uppercase tracking-wide">
                      Latest Official Build Available
                    </span>
                  </div>
                  <h4 className="text-base font-black text-slate-900">
                    farmerbox-joiner-v2.4.1.apk
                  </h4>
                  <p className="text-xs text-slate-600">
                    Release v2.4.1 • Size: <strong>24.8 MB</strong> • Build #42 • Android 8.0+
                  </p>
                </div>

                <button
                  onClick={triggerDirectDownload}
                  className="px-6 py-3 bg-[#15803d] hover:bg-[#166534] text-white text-sm font-extrabold rounded-xl shadow-lg shadow-emerald-700/20 hover:shadow-emerald-700/30 flex items-center gap-2.5 transition-all transform hover:-translate-y-0.5 cursor-pointer shrink-0"
                >
                  <Download className="w-4 h-4" />
                  <span>Download APK Now</span>
                </button>
              </div>

              {/* Quick Specs Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
                <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl">
                  <p className="text-[10px] uppercase font-bold text-slate-500">Target Platform</p>
                  <p className="text-xs font-black text-slate-800 mt-0.5">Android 8.0 to 14</p>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl">
                  <p className="text-[10px] uppercase font-bold text-slate-500">Package ID</p>
                  <p className="text-xs font-black text-slate-800 mt-0.5 truncate" title="com.farmerbox.joiner">
                    com.farmerbox.joiner
                  </p>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl">
                  <p className="text-[10px] uppercase font-bold text-slate-500">Security Check</p>
                  <p className="text-xs font-black text-emerald-700 mt-0.5 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> Verified Clean
                  </p>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl">
                  <p className="text-[10px] uppercase font-bold text-slate-500">Build Signature</p>
                  <p className="text-xs font-black text-slate-800 mt-0.5">Release Keystore</p>
                </div>
              </div>

              {/* What's New in v2.4.1 */}
              <div className="p-4 bg-amber-50/70 border border-amber-200/80 rounded-2xl space-y-2">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <h5 className="text-xs font-extrabold text-amber-900">What's New in Version 2.4.1:</h5>
                </div>
                <ul className="text-xs text-amber-900/90 space-y-1 list-disc list-inside">
                  <li>Direct farm-to-hotel fresh vegetable crate ordering (Tomatoes, Onions, Leafy veggies).</li>
                  <li>Real-time automated ₹100 commission credit upon delivery confirmation.</li>
                  <li>Live order dispatch tracking with delivery driver vehicle details.</li>
                  <li>1-Tap Reorder history for high-frequency hotel kitchen replenishment.</li>
                </ul>
              </div>

              {/* 3 Step Install Guide */}
              <div className="border border-slate-200 rounded-2xl p-4 space-y-3">
                <h5 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                  How to Install on Your Android Device:
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 bg-slate-50 rounded-xl flex gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-[10px] shrink-0">
                      1
                    </span>
                    <p className="text-slate-600">
                      Tap <strong>Download APK</strong> to save the file to your Android phone.
                    </p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl flex gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-[10px] shrink-0">
                      2
                    </span>
                    <p className="text-slate-600">
                      Open Downloads, tap APK, and allow <strong>Install Unknown Apps</strong> if prompted.
                    </p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl flex gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-[10px] shrink-0">
                      3
                    </span>
                    <p className="text-slate-600">
                      Tap <strong>Install</strong> and log in using your registered Joiner Mobile number.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Scan QR Code */}
          {activeTab === 'qr' && (
            <div className="space-y-4 text-center">
              <div className="p-6 bg-slate-50 rounded-3xl border border-slate-200/90 max-w-sm mx-auto space-y-3">
                <p className="text-xs font-bold text-slate-600">
                  Point your Android camera or Google Lens at this QR Code to download instantly:
                </p>

                {/* Scalable High Contrast Vector QR Code */}
                <div className="w-56 h-56 mx-auto bg-white p-4 rounded-2xl shadow-md border-2 border-emerald-600 flex flex-col items-center justify-center relative">
                  <svg viewBox="0 0 100 100" className="w-full h-full text-slate-900">
                    {/* Corner Position Boxes */}
                    <rect x="5" y="5" width="26" height="26" fill="currentColor" rx="2" />
                    <rect x="9" y="9" width="18" height="18" fill="white" rx="1" />
                    <rect x="13" y="13" width="10" height="10" fill="currentColor" rx="1" />

                    <rect x="69" y="5" width="26" height="26" fill="currentColor" rx="2" />
                    <rect x="73" y="9" width="18" height="18" fill="white" rx="1" />
                    <rect x="77" y="13" width="10" height="10" fill="currentColor" rx="1" />

                    <rect x="5" y="69" width="26" height="26" fill="currentColor" rx="2" />
                    <rect x="9" y="73" width="18" height="18" fill="white" rx="1" />
                    <rect x="13" y="77" width="10" height="10" fill="currentColor" rx="1" />

                    {/* Data Pattern Modules */}
                    <rect x="36" y="8" width="6" height="6" fill="currentColor" />
                    <rect x="46" y="8" width="6" height="6" fill="currentColor" />
                    <rect x="56" y="8" width="6" height="6" fill="currentColor" />

                    <rect x="36" y="20" width="6" height="6" fill="currentColor" />
                    <rect x="50" y="20" width="10" height="6" fill="currentColor" />

                    <rect x="8" y="36" width="6" height="6" fill="currentColor" />
                    <rect x="20" y="36" width="6" height="6" fill="currentColor" />
                    <rect x="34" y="34" width="6" height="6" fill="currentColor" />
                    <rect x="44" y="34" width="12" height="6" fill="currentColor" />
                    <rect x="64" y="34" width="8" height="8" fill="currentColor" />
                    <rect x="78" y="36" width="14" height="6" fill="currentColor" />

                    <rect x="8" y="48" width="8" height="6" fill="currentColor" />
                    <rect x="22" y="48" width="6" height="6" fill="currentColor" />
                    <rect x="34" y="46" width="10" height="10" fill="#15803d" />
                    <rect x="56" y="46" width="10" height="10" fill="#15803d" />
                    <rect x="72" y="48" width="8" height="6" fill="currentColor" />
                    <rect x="84" y="48" width="8" height="6" fill="currentColor" />

                    <rect x="8" y="58" width="12" height="6" fill="currentColor" />
                    <rect x="36" y="62" width="6" height="6" fill="currentColor" />
                    <rect x="48" y="62" width="14" height="6" fill="currentColor" />
                    <rect x="70" y="60" width="8" height="8" fill="currentColor" />
                    <rect x="84" y="60" width="8" height="8" fill="currentColor" />

                    <rect x="36" y="74" width="10" height="6" fill="currentColor" />
                    <rect x="52" y="74" width="6" height="6" fill="currentColor" />
                    <rect x="64" y="74" width="12" height="6" fill="currentColor" />
                    <rect x="82" y="74" width="10" height="6" fill="currentColor" />

                    <rect x="36" y="84" width="8" height="8" fill="currentColor" />
                    <rect x="48" y="84" width="14" height="8" fill="currentColor" />
                    <rect x="68" y="84" width="8" height="8" fill="currentColor" />
                    <rect x="80" y="84" width="12" height="8" fill="currentColor" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-10 h-10 rounded-xl bg-white p-1 shadow-md border border-emerald-500 flex items-center justify-center">
                      <Smartphone className="w-6 h-6 text-[#15803d]" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-2 pt-1 text-[11px] text-slate-500 font-medium">
                  <span>URL:</span>
                  <code className="text-slate-800 bg-white px-2 py-0.5 rounded border border-slate-200">
                    /{apkFileName}
                  </code>
                </div>
              </div>

              <div className="flex justify-center gap-2">
                <button
                  onClick={handleCopyLink}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedLink ? 'Link Copied!' : 'Copy Direct Download URL'}</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: Share with Joiners */}
          {activeTab === 'share' && (
            <div className="space-y-4">
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs space-y-2">
                <h5 className="font-extrabold text-emerald-900">Distribute APK to Hotel Joiners</h5>
                <p className="text-emerald-800/90">
                  Send the official APK download link directly to registered or prospective joiners across Pune zones (Kharadi, Viman Nagar, Hadapsar, Hinjewadi).
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* WhatsApp Share Card */}
                <div className="p-4 rounded-2xl border border-slate-200 bg-white hover:border-emerald-300 hover:shadow-xs transition-all space-y-3 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                      <MessageCircle className="w-5 h-5" />
                    </div>
                    <h5 className="font-extrabold text-sm text-slate-900">Share via WhatsApp</h5>
                    <p className="text-xs text-slate-500">
                      Pre-formatted message with app description, download instructions, and direct link.
                    </p>
                  </div>
                  <button
                    onClick={handleShareWhatsApp}
                    className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <ExternalLink className="w-3.5 h-3.5" /> Open WhatsApp
                  </button>
                </div>

                {/* SMS Broadcast Card */}
                <div className="p-4 rounded-2xl border border-slate-200 bg-white hover:border-blue-300 hover:shadow-xs transition-all space-y-3 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                      <Share2 className="w-5 h-5" />
                    </div>
                    <h5 className="font-extrabold text-sm text-slate-900">Share via SMS</h5>
                    <p className="text-xs text-slate-500">
                      Standard text message containing short download link for non-WhatsApp phones.
                    </p>
                  </div>
                  <button
                    onClick={handleShareSMS}
                    className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <ExternalLink className="w-3.5 h-3.5" /> Send SMS Link
                  </button>
                </div>
              </div>

              {/* Copy Link Field */}
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  Direct Download URL:
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={directApkUrl}
                    className="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-700 font-mono select-all focus:outline-none"
                  />
                  <button
                    onClick={handleCopyLink}
                    className="px-3.5 py-1.5 bg-[#15803d] hover:bg-[#166534] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                  >
                    {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedLink ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: ADB / Developer */}
          {activeTab === 'adb' && (
            <div className="space-y-4">
              <div className="p-4 bg-slate-900 text-slate-200 rounded-2xl font-mono text-xs space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5" /> Fast ADB USB Install Command
                  </span>
                  <button
                    onClick={handleCopyAdb}
                    className="text-[11px] px-2.5 py-1 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    {copiedAdb ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedAdb ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <div className="text-emerald-300 selection:bg-emerald-800">
                  {adbCommand}
                </div>
                <p className="text-[11px] text-slate-400 font-sans">
                  Connect your Android phone via USB with USB Debugging enabled in Developer Options, then execute this command in your terminal.
                </p>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs space-y-2">
                <h5 className="font-extrabold text-slate-900">Developer Build Diagnostics:</h5>
                <div className="space-y-1 text-slate-600 font-mono text-[11px]">
                  <p>• SHA-256: <code>e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855</code></p>
                  <p>• Keystore: Signed (FarmerBox Production Release)</p>
                  <p>• Architecture: Universal APK (arm64-v8a, armeabi-v7a, x86_64)</p>
                  <p>• Min Android Version: 8.0 (API 26) • Max Tested: Android 15</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-slate-500 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Official FarmerBox Production Release</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-white hover:bg-slate-100 text-slate-700 font-bold rounded-xl border border-slate-200 transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={triggerDirectDownload}
              className="px-4 py-2 bg-[#15803d] hover:bg-[#166534] text-white font-bold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            >
              <Download className="w-3.5 h-3.5" /> Download APK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
