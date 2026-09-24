import React from 'react';
import { LogOut, X, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const LogoutConfirmModal: React.FC = () => {
  const {
    isLogoutConfirmOpen,
    setIsLogoutConfirmOpen,
    logoutAdmin,
    adminProfile
  } = useApp();

  if (!isLogoutConfirmOpen) return null;

  const handleConfirm = () => {
    logoutAdmin();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shadow-xs">
              <LogOut className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-900">Sign Out Admin</h3>
              <p className="text-[11px] text-slate-500">End active administrative session</p>
            </div>
          </div>
          <button
            onClick={() => setIsLogoutConfirmOpen(false)}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 cursor-pointer transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Admin Account Summary */}
        <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-3">
          <img
            src={adminProfile.avatar}
            alt={adminProfile.name}
            className="w-10 h-10 rounded-full object-cover border-2 border-emerald-600 shadow-2xs"
          />
          <div className="min-w-0 flex-1 text-left">
            <p className="text-xs font-bold text-slate-900 truncate">{adminProfile.name}</p>
            <p className="text-[11px] text-slate-500 truncate">{adminProfile.email}</p>
            <span className="inline-block mt-0.5 px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 font-extrabold text-[9px]">
              {adminProfile.role}
            </span>
          </div>
        </div>

        {/* Message */}
        <p className="mt-3 text-xs text-slate-600 leading-relaxed">
          Are you sure you want to log out from the <strong>FarmerBox Admin Portal</strong>? You will need to sign in again to access live operations, hotel orders, and driver dispatches.
        </p>

        {/* Action Buttons */}
        <div className="mt-5 flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
          <button
            type="button"
            onClick={() => setIsLogoutConfirmOpen(false)}
            className="px-4 py-2 text-slate-700 hover:bg-slate-100 rounded-xl font-bold text-xs cursor-pointer transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold text-xs shadow-xs flex items-center gap-1.5 cursor-pointer transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Confirm Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};
