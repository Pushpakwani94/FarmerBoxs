import React, { useState } from 'react';
import { X, CheckCircle2, IndianRupee, Send, ShieldCheck, Building2, Smartphone } from 'lucide-react';
import type { JoinerCommissionRecord } from '../../data/commissionData';

interface MakePayoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  joiner: JoinerCommissionRecord | null;
  onPaymentSuccess: (joinerId: number, amount: number, mode: string, txnId: string) => void;
}

export const MakePayoutModal: React.FC<MakePayoutModalProps> = ({
  isOpen,
  onClose,
  joiner,
  onPaymentSuccess
}) => {
  if (!isOpen || !joiner) return null;

  const [amount, setAmount] = useState<number>(joiner.pendingAmount > 0 ? joiner.pendingAmount : (joiner.commission - joiner.paidAmount > 0 ? joiner.commission - joiner.paidAmount : 5000));
  const [paymentMode, setPaymentMode] = useState<'UPI' | 'Bank Transfer' | 'Cash / Wallet'>('UPI');
  const [txnRef, setTxnRef] = useState<string>(`PAY${Math.floor(100000 + Math.random() * 900000)}`);
  const [note, setNote] = useState<string>('Commission settlement for delivered orders');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount <= 0) {
      alert('Please enter a valid payout amount');
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setTimeout(() => {
        onPaymentSuccess(joiner.id, amount, paymentMode, txnRef);
        setIsSuccess(false);
        onClose();
      }, 1200);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-[#15803d] px-6 py-4 flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
            <Send className="w-5 h-5 text-emerald-200" />
            <div>
              <h2 className="text-base font-bold">Make Commission Payment</h2>
              <p className="text-xs text-emerald-100">Disburse payout to joiner wallet or bank</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg bg-emerald-800/60 hover:bg-emerald-800 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSuccess ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-lg font-bold text-slate-800">Payment Processed Successfully!</h3>
            <p className="text-xs text-slate-600">
              ₹{amount.toLocaleString('en-IN')} transferred to {joiner.name} via {paymentMode}.
            </p>
            <p className="text-xs font-mono text-emerald-700 bg-emerald-50 py-1.5 px-3 rounded-lg inline-block font-semibold">
              Ref: {txnRef}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
            {/* Beneficiary Card */}
            <div className="bg-emerald-50/70 p-3.5 rounded-xl border border-emerald-100 flex items-center gap-3">
              <img src={joiner.avatar} alt={joiner.name} className="w-12 h-12 rounded-full object-cover border-2 border-emerald-600" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-slate-800 truncate">{joiner.name}</h4>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                    {joiner.zone} Zone
                  </span>
                </div>
                <p className="text-slate-500 text-[11px]">Mobile: {joiner.mobile}</p>
                <div className="flex items-center gap-3 mt-1 text-[11px] font-semibold text-slate-700">
                  <span>Total Comm: ₹{joiner.commission.toLocaleString('en-IN')}</span>
                  <span className="text-amber-700">Pending: ₹{joiner.pendingAmount.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            {/* Payout Amount */}
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Payout Amount (₹) <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <IndianRupee className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="number"
                  min="1"
                  max="50000"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  required
                  className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-sm font-bold text-slate-800 focus:outline-emerald-600"
                />
              </div>
              <div className="flex items-center gap-2 mt-1.5">
                <button
                  type="button"
                  onClick={() => setAmount(joiner.pendingAmount > 0 ? joiner.pendingAmount : 5000)}
                  className="text-[11px] px-2 py-0.5 bg-slate-100 hover:bg-slate-200 rounded text-slate-700 font-medium"
                >
                  Full Pending (₹{joiner.pendingAmount.toLocaleString('en-IN')})
                </button>
                <button
                  type="button"
                  onClick={() => setAmount(5000)}
                  className="text-[11px] px-2 py-0.5 bg-slate-100 hover:bg-slate-200 rounded text-slate-700 font-medium"
                >
                  ₹5,000
                </button>
                <button
                  type="button"
                  onClick={() => setAmount(10000)}
                  className="text-[11px] px-2 py-0.5 bg-slate-100 hover:bg-slate-200 rounded text-slate-700 font-medium"
                >
                  ₹10,000
                </button>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div>
              <label className="block font-bold text-slate-700 mb-1.5">Payment Method</label>
              <div className="grid grid-cols-3 gap-2">
                {(['UPI', 'Bank Transfer', 'Cash / Wallet'] as const).map(mode => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setPaymentMode(mode)}
                    className={`py-2 px-3 rounded-lg border text-center font-bold text-xs transition-all flex flex-col items-center gap-1 ${
                      paymentMode === mode
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-800 shadow-xs'
                        : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                    }`}
                  >
                    {mode === 'UPI' && <Smartphone className="w-4 h-4" />}
                    {mode === 'Bank Transfer' && <Building2 className="w-4 h-4" />}
                    {mode === 'Cash / Wallet' && <IndianRupee className="w-4 h-4" />}
                    <span>{mode}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Destination Preview */}
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-1">
              <p className="font-bold text-slate-700 text-[11px]">Transfer Destination:</p>
              {paymentMode === 'UPI' && (
                <p className="text-slate-600 text-xs font-mono">UPI ID: <span className="font-bold text-slate-900">{joiner.upiId}</span></p>
              )}
              {paymentMode === 'Bank Transfer' && (
                <div className="text-slate-600 text-[11px] space-y-0.5 font-mono">
                  <p>Bank: <span className="font-bold text-slate-900">{joiner.bankName}</span></p>
                  <p>A/C: <span className="font-bold text-slate-900">{joiner.accountNo}</span></p>
                  <p>IFSC: <span className="font-bold text-slate-900">{joiner.ifscCode}</span></p>
                </div>
              )}
              {paymentMode === 'Cash / Wallet' && (
                <p className="text-slate-600 text-xs">Direct internal wallet credit or cash payout register entry.</p>
              )}
            </div>

            {/* Transaction Reference & Remarks */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Transaction Ref / UTR</label>
                <input
                  type="text"
                  value={txnRef}
                  onChange={(e) => setTxnRef(e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs font-mono"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Payment Note</label>
                <input
                  type="text"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-lg text-xs"
                />
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-[11px] text-emerald-800 bg-emerald-50 p-2 rounded-lg font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Admin payout confirmation with instant ledger update and SMS receipt.</span>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg font-semibold hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isProcessing}
                className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg font-bold flex items-center gap-2 shadow-xs transition-colors disabled:opacity-50"
              >
                {isProcessing ? 'Processing Transfer...' : `Confirm & Pay ₹${amount.toLocaleString('en-IN')}`}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
