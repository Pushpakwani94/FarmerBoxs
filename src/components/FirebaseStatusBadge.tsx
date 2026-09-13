import React, { useState } from 'react';
import {
  Database,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Sparkles,
  X,
  Settings,
  ShieldCheck,
  UploadCloud
} from 'lucide-react';
import {
  isFirebaseConfigured,
  currentFirebaseConfig,
  saveCustomFirebaseConfig
} from '../firebase/config';
import { seedFirestoreDatabase } from '../firebase/dbService';

export const FirebaseStatusBadge: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSeeding, setIsSeeding] = useState(false);
  const [seedResult, setSeedResult] = useState<string | null>(null);
  const [showConfigForm, setShowConfigForm] = useState(false);

  const [formData, setFormData] = useState({
    apiKey: currentFirebaseConfig.apiKey || '',
    projectId: currentFirebaseConfig.projectId || '',
    appId: currentFirebaseConfig.appId || '',
    authDomain: currentFirebaseConfig.authDomain || '',
    storageBucket: currentFirebaseConfig.storageBucket || '',
    messagingSenderId: currentFirebaseConfig.messagingSenderId || '',
    databaseURL: currentFirebaseConfig.databaseURL || ''
  });

  const isConfigured = isFirebaseConfigured();

  const handleSeed = async () => {
    setIsSeeding(true);
    setSeedResult(null);
    try {
      const res = await seedFirestoreDatabase();
      setSeedResult(res.message);
    } catch (e: any) {
      setSeedResult(`Error: ${e?.message || 'Failed'}`);
    } finally {
      setIsSeeding(false);
    }
  };

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.apiKey || !formData.projectId || !formData.appId) {
      alert('Please provide at least API Key, Project ID, and App ID.');
      return;
    }
    saveCustomFirebaseConfig({
      ...formData,
      authDomain: formData.authDomain || `${formData.projectId}.firebaseapp.com`,
      storageBucket: formData.storageBucket || `${formData.projectId}.appspot.com`
    });
  };

  return (
    <>
      {/* Badge Button in Header */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all shadow-2xs hover:scale-102 cursor-pointer bg-white/90 border-slate-200 text-slate-700 hover:border-emerald-500"
        title="Firebase Real-time Cloud Database Status"
      >
        <div className="relative flex items-center justify-center">
          <Database className={`w-3.5 h-3.5 ${isConfigured ? 'text-emerald-600' : 'text-amber-500'}`} />
          <span
            className={`absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full animate-ping ${
              isConfigured ? 'bg-emerald-500' : 'bg-amber-400'
            }`}
          />
          <span
            className={`absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full ${
              isConfigured ? 'bg-emerald-500' : 'bg-amber-400'
            }`}
          />
        </div>
        <span className="hidden sm:inline">
          {isConfigured ? 'Firebase Active' : 'Database (Local)'}
        </span>
      </button>

      {/* Firebase Status & Management Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-800 to-teal-700 px-6 py-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center border border-white/20">
                  <Database className="w-5 h-5 text-emerald-200" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base leading-tight text-white flex items-center gap-2">
                    Firebase Cloud Database
                    <span
                      className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                        isConfigured
                          ? 'bg-emerald-400/20 text-emerald-200 border border-emerald-300/30'
                          : 'bg-amber-400/20 text-amber-200 border border-amber-300/30'
                      }`}
                    >
                      {isConfigured ? 'Live Firestore' : 'Persistent Storage'}
                    </span>
                  </h3>
                  <p className="text-xs text-emerald-100/80">
                    Real-time cross-device sync for Orders, Hotels & Joiners
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-5 overflow-y-auto">
              {/* Status Banner */}
              <div
                className={`p-4 rounded-2xl border flex items-start gap-3.5 ${
                  isConfigured
                    ? 'bg-emerald-50/80 border-emerald-200 text-emerald-900'
                    : 'bg-amber-50/80 border-amber-200 text-amber-900'
                }`}
              >
                {isConfigured ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                )}
                <div>
                  <div className="font-bold text-sm">
                    {isConfigured
                      ? `Connected to Firebase Project: ${currentFirebaseConfig.projectId}`
                      : 'Running in Persistent Database Mode'}
                  </div>
                  <p className="text-xs mt-1 leading-relaxed opacity-90">
                    {isConfigured
                      ? 'Every order, hotel, driver, and product change is synchronized in real-time across your Web Admin Portal and Android Mobile App.'
                      : 'All data is stored and persisted in real time locally. You can connect your Firebase Cloud Firestore project at any time below.'}
                  </p>
                </div>
              </div>

              {/* Action 1: Seed / Push Database to Firebase */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4.5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                      <UploadCloud className="w-4 h-4 text-emerald-600" />
                      Seed Database to Firebase
                    </h4>
                    <p className="text-xs text-slate-500 mt-1">
                      Uploads complete initial orders, zones, hotels, drivers, and products into Firestore collections.
                    </p>
                  </div>
                  <button
                    onClick={handleSeed}
                    disabled={isSeeding}
                    className="shrink-0 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
                  >
                    {isSeeding ? (
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Sparkles className="w-3.5 h-3.5" />
                    )}
                    {isSeeding ? 'Seeding...' : 'Seed Data'}
                  </button>
                </div>

                {seedResult && (
                  <div className="mt-3 p-3 rounded-xl bg-white border border-emerald-200 text-xs text-emerald-800 font-medium">
                    {seedResult}
                  </div>
                )}
              </div>

              {/* Action 2: Toggle Config Form */}
              <div className="pt-2">
                <button
                  onClick={() => setShowConfigForm(!showConfigForm)}
                  className="text-xs text-slate-600 hover:text-emerald-700 font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <Settings className="w-3.5 h-3.5" />
                  {showConfigForm ? 'Hide Firebase Credentials Form' : 'Update / Enter Firebase Credentials'}
                </button>

                {showConfigForm && (
                  <form onSubmit={handleSaveConfig} className="mt-4 space-y-3 bg-slate-50/70 p-4 rounded-2xl border border-slate-200">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 uppercase">Project ID *</label>
                      <input
                        type="text"
                        value={formData.projectId}
                        onChange={(e) => setFormData({ ...formData, projectId: e.target.value })}
                        placeholder="e.g. farmerbox-production"
                        required
                        className="w-full mt-1 px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white focus:outline-emerald-600"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 uppercase">API Key *</label>
                      <input
                        type="text"
                        value={formData.apiKey}
                        onChange={(e) => setFormData({ ...formData, apiKey: e.target.value })}
                        placeholder="AIzaSy..."
                        required
                        className="w-full mt-1 px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white focus:outline-emerald-600"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 uppercase">App ID *</label>
                      <input
                        type="text"
                        value={formData.appId}
                        onChange={(e) => setFormData({ ...formData, appId: e.target.value })}
                        placeholder="1:1234567890:web:abcdef..."
                        required
                        className="w-full mt-1 px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white focus:outline-emerald-600"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer shadow-xs"
                    >
                      Save & Reconnect Firebase
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="bg-slate-50 px-6 py-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
              <span className="flex items-center gap-1.5 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                End-to-End Cloud Firestore Sync
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="px-3 py-1 font-bold text-slate-700 hover:text-slate-900 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
