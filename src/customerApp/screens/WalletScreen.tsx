import React, { useState } from 'react';
import { ArrowLeft, Wallet, Plus, ArrowDownLeft, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { useCustomerApp } from '../CustomerAppContext';

export const WalletScreen: React.FC = () => {
  const { walletBalance, walletTransactions, addWalletMoney, setCurrentScreen } = useCustomerApp();
  const [addAmount, setAddAmount] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const presets = [100, 200, 500, 1000];

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = Number(addAmount);
    if (!val || val <= 0) return;
    addWalletMoney(val);
    setAddAmount('');
    setIsAdding(false);
  };

  return (
    <div className="flex flex-col h-full bg-[#F8FAF9] overflow-y-auto no-scrollbar select-none">
      {/* Header */}
      <div className="bg-[#15803d] text-white px-4 py-3 shrink-0 shadow-sm sticky top-0 z-10 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setCurrentScreen('PROFILE')}
            className="p-1 text-white/90 hover:text-white cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-base font-black tracking-tight">My Wallet</h2>
        </div>
      </div>

      {/* Main Content matching Screen 19 */}
      <div className="p-4 space-y-4 pb-8">
        {/* Wallet Balance Card */}
        <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 rounded-3xl p-5 text-white shadow-md space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-white/20 backdrop-blur-xs">
                <Wallet className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs font-bold text-emerald-100 uppercase tracking-wider">
                FarmerBoxs Pay
              </span>
            </div>
            <span className="text-[10px] bg-emerald-950/40 border border-emerald-400/30 px-2 py-0.5 rounded-full font-bold">
              Instant Refund Enabled
            </span>
          </div>

          <div>
            <span className="text-[11px] text-emerald-200 font-medium">Available Balance</span>
            <div className="text-3xl font-black text-white tracking-tight mt-0.5">
              ₹{walletBalance}
            </div>
          </div>

          <button
            onClick={() => setIsAdding(true)}
            className="w-full py-2.5 bg-white hover:bg-emerald-50 text-emerald-900 font-black text-xs rounded-xl shadow-sm flex items-center justify-center gap-1.5 transition-transform active:scale-98 cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Add Money to Wallet</span>
          </button>
        </div>

        {/* Add Money Modal / Input Drawer */}
        {isAdding && (
          <form onSubmit={handleAddSubmit} className="bg-white p-4 rounded-2xl border border-emerald-300 shadow-md space-y-3 animate-scaleUp">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-xs text-slate-900">Top-up Wallet Balance</h4>
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="text-xs text-slate-400 font-bold"
              >
                Cancel
              </button>
            </div>

            <div className="flex items-center bg-slate-50 border border-slate-200 rounded-xl px-3 py-2">
              <span className="font-black text-base text-slate-600 mr-2">₹</span>
              <input
                type="number"
                min={10}
                required
                autoFocus
                value={addAmount}
                onChange={e => setAddAmount(e.target.value)}
                placeholder="Enter amount (e.g. 500)"
                className="w-full bg-transparent text-sm font-black text-slate-900 focus:outline-none"
              />
            </div>

            {/* Presets */}
            <div className="flex gap-2">
              {presets.map(amt => (
                <button
                  type="button"
                  key={amt}
                  onClick={() => setAddAmount(String(amt))}
                  className="flex-1 py-1.5 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 rounded-lg text-xs font-bold text-slate-700 cursor-pointer"
                >
                  +₹{amt}
                </button>
              ))}
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-[#15803d] text-white font-bold text-xs rounded-xl shadow-xs"
            >
              Add ₹{addAmount || 0}
            </button>
          </form>
        )}

        {/* Transactions List matching Screen 19 */}
        <div className="space-y-2.5">
          <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">
            Recent Transactions
          </h4>

          <div className="space-y-2">
            {walletTransactions.map(tx => {
              const isCredit = tx.type === 'credit';
              return (
                <div
                  key={tx.id}
                  className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                        isCredit ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                      }`}
                    >
                      {isCredit ? <ArrowDownLeft className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
                    </div>
                    <div>
                      <p className="font-bold text-xs text-slate-900 leading-tight">{tx.title}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">{tx.date}</p>
                    </div>
                  </div>

                  <span
                    className={`font-black text-sm ${
                      isCredit ? 'text-emerald-700' : 'text-slate-900'
                    }`}
                  >
                    {isCredit ? `+₹${tx.amount}` : `-₹${tx.amount}`}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
