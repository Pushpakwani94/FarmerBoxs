import React, { useState } from 'react';
import { X, Save, Edit3, IndianRupee, Smartphone, Building2 } from 'lucide-react';
import type { JoinerCommissionRecord } from '../../data/commissionData';

interface EditCommissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  joiner: JoinerCommissionRecord | null;
  onSave: (updated: Partial<JoinerCommissionRecord>) => void;
}

export const EditCommissionModal: React.FC<EditCommissionModalProps> = ({
  isOpen,
  onClose,
  joiner,
  onSave
}) => {
  if (!isOpen || !joiner) return null;

  const [rate, setRate] = useState<number>(joiner.commissionRate || 100);
  const [mobile, setMobile] = useState<string>(joiner.mobile);
  const [zone, setZone] = useState<string>(joiner.zone);
  const [upiId, setUpiId] = useState<string>(joiner.upiId);
  const [bankName, setBankName] = useState<string>(joiner.bankName);
  const [accountNo, setAccountNo] = useState<string>(joiner.accountNo);
  const [ifscCode, setIfscCode] = useState<string>(joiner.ifscCode);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      commissionRate: rate,
      mobile,
      zone,
      upiId,
      bankName,
      accountNo,
      ifscCode,
      commission: joiner.deliveredOrders * rate
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="bg-[#15803d] px-6 py-4 flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
            <Edit3 className="w-5 h-5 text-emerald-200" />
            <div>
              <h2 className="text-base font-bold">Edit Joiner Commission & Payout Info</h2>
              <p className="text-xs text-emerald-100">{joiner.name} • {joiner.zone} Zone</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg bg-emerald-800/60 hover:bg-emerald-800 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          {/* Rate per order */}
          <div className="bg-emerald-50/70 p-3.5 rounded-xl border border-emerald-100">
            <label className="block font-bold text-slate-800 mb-1">
              Commission Rate Per Delivered Order (₹)
            </label>
            <div className="relative">
              <IndianRupee className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="number"
                min="10"
                max="500"
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                required
                className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-sm font-bold text-slate-900 focus:outline-emerald-600 bg-white"
              />
            </div>
            <p className="text-[11px] text-emerald-700 font-medium mt-1">
              Standard platform rate is ₹100 per delivered order.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Mobile Number</label>
              <input
                type="tel"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                required
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Assigned Zone</label>
              <select
                value={zone}
                onChange={(e) => setZone(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs bg-white"
              >
                {['Kharadi', 'Viman Nagar', 'Hinjawadi', 'Magarpatta', 'Hadapsar', 'Baner', 'Wakad', 'Aundh', 'Shivajinagar', 'Pimple Chinchwad', 'Undri', 'Kothrud'].map(z => (
                  <option key={z} value={z}>{z}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1 flex items-center gap-1">
              <Smartphone className="w-3.5 h-3.5 text-slate-400" /> UPI ID
            </label>
            <input
              type="text"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-mono"
            />
          </div>

          <div className="border-t border-slate-100 pt-3 space-y-3">
            <h4 className="font-bold text-slate-800 flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-slate-400" /> Bank Account Details
            </h4>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block font-semibold text-slate-600 mb-1">Bank Name</label>
                <input
                  type="text"
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-600 mb-1">Account No</label>
                <input
                  type="text"
                  value={accountNo}
                  onChange={(e) => setAccountNo(e.target.value)}
                  className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs font-mono"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-600 mb-1">IFSC Code</label>
                <input
                  type="text"
                  value={ifscCode}
                  onChange={(e) => setIfscCode(e.target.value)}
                  className="w-full px-2.5 py-1.5 border border-slate-300 rounded-lg text-xs font-mono"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg font-semibold hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg font-bold flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <Save className="w-4 h-4" /> Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
