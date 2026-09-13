import React from 'react';
import { ArrowLeft, Sprout, Wallet, Clock } from 'lucide-react';
import { useJoinerApp } from '../JoinerAppContext';
import { MobileBottomNav } from '../components/MobileBottomNav';

export const CommissionScreen: React.FC = () => {
  const { commissionBalance, commissionHistory, setCurrentScreen } = useJoinerApp();

  return (
    <div className="flex flex-col h-full bg-slate-50 justify-between select-none">
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
        {/* Top Header */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setCurrentScreen('DASHBOARD')}
            className="p-1 -ml-1 text-slate-700 hover:text-slate-900 cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-base font-extrabold text-slate-900">Commission</h2>
        </div>

        {/* Hero Card: Total Commission */}
        <div className="bg-gradient-to-r from-[#15803d] to-[#16a34a] rounded-2xl p-4 text-white shadow-xs relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-white backdrop-blur-xs">
                <Sprout className="w-6 h-6 fill-white" />
              </div>
              <div>
                <p className="text-[11px] text-emerald-100 font-medium">Total Commission</p>
                <h2 className="text-2xl font-black tracking-tight leading-none mt-0.5">
                  ₹{commissionBalance.thisMonth.toLocaleString('en-IN')}
                </h2>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] bg-emerald-800/80 px-2 py-0.5 rounded-full font-bold inline-flex items-center gap-1">
                ↑ {commissionBalance.growth}%
              </span>
              <p className="text-[9.5px] text-emerald-100 font-medium mt-1">This Month</p>
            </div>
          </div>
        </div>

        {/* 2 Sub-Cards: Paid & Pending */}
        <div className="grid grid-cols-2 gap-2.5">
          <div className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Wallet className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-medium">Paid</p>
              <h4 className="text-sm font-extrabold text-slate-900 leading-tight">
                ₹{commissionBalance.paid.toLocaleString('en-IN')}
              </h4>
            </div>
          </div>

          <div className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-medium">Pending</p>
              <h4 className="text-sm font-extrabold text-slate-900 leading-tight">
                ₹{commissionBalance.pending.toLocaleString('en-IN')}
              </h4>
            </div>
          </div>
        </div>

        {/* Commission History */}
        <div className="space-y-2 pt-1">
          <h3 className="font-extrabold text-xs text-slate-900">Commission History</h3>

          {commissionHistory.length === 0 ? (
            <div className="bg-white rounded-xl border border-dashed border-slate-300/90 shadow-2xs p-6 text-center space-y-2">
              <p className="text-xs font-bold text-slate-700">No Commission Earned Yet</p>
              <p className="text-[11px] text-slate-400 max-w-xs mx-auto">
                Add hotels and place vegetable orders to earn ₹100 for every successfully delivered order.
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-slate-200/80 shadow-2xs divide-y divide-slate-100 text-xs">
              {commissionHistory.map((item, idx) => (
                <div key={idx} className="p-3 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-slate-800 text-[11px] block">
                      {item.date}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono font-medium">
                      {item.orderId}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-black text-slate-900 text-xs">
                      ₹{item.amount}
                    </span>
                    <span
                      className={`text-[9.5px] px-2 py-0.5 rounded-md font-extrabold min-w-14 text-center ${
                        item.status === 'Paid'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Navigation */}
      <MobileBottomNav />
    </div>
  );
};
