import React from 'react';
import { ArrowLeft, Sprout, Wallet, Clock, CheckCircle2, AlertCircle, Sparkles, Building2, Gift } from 'lucide-react';
import { useJoinerApp } from '../JoinerAppContext';
import { MobileBottomNav } from '../components/MobileBottomNav';

export const CommissionScreen: React.FC = () => {
  const { commissionBalance, commissionHistory, setCurrentScreen } = useJoinerApp();

  return (
    <div className="flex flex-col h-full bg-slate-50 justify-between select-none">
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5 pb-20 no-scrollbar">
        {/* Top Header */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setCurrentScreen('DASHBOARD')}
            className="p-1 -ml-1 text-slate-700 hover:text-slate-900 cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-base font-black text-slate-900 leading-tight">Joiner Wallet & Commission</h2>
            <p className="text-[10px] text-slate-500 font-medium">Earn ₹100 Bonus on Hotel Orders above ₹1,500</p>
          </div>
        </div>

        {/* Hero Card: Total Commission & Wallet Balance */}
        <div className="bg-gradient-to-br from-[#15803d] via-[#16a34a] to-[#15803d] rounded-3xl p-4.5 text-white shadow-md relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-white backdrop-blur-md shadow-inner">
                <Wallet className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[11px] text-emerald-100 font-semibold uppercase tracking-wider">Wallet Balance (Credited)</p>
                <h2 className="text-3xl font-black tracking-tight leading-none mt-0.5">
                  ₹{commissionBalance.paid.toLocaleString('en-IN')}
                </h2>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] bg-emerald-950/60 text-emerald-200 px-2.5 py-1 rounded-full font-extrabold inline-flex items-center gap-1 border border-emerald-400/30">
                <Sparkles className="w-3 h-3 text-yellow-300" /> ₹100 / Order
              </span>
              <p className="text-[9.5px] text-emerald-100 font-medium mt-1.5">Approved by Admin</p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-emerald-400/30 flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 text-emerald-100">
              <span>Delivered & Credited:</span>
              <span className="font-extrabold text-white">₹{commissionBalance.paid.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-100">
              <span>Awaiting Delivery:</span>
              <span className="font-extrabold text-yellow-300">₹{commissionBalance.pending.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>

        {/* 100 Rs Reward Rule Banner */}
        <div className="bg-amber-50 rounded-2xl p-3.5 border border-amber-200 shadow-2xs space-y-1.5">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl bg-amber-500 text-white flex items-center justify-center font-black text-xs shrink-0 shadow-xs">
              ₹100
            </div>
            <h4 className="font-black text-xs text-amber-950">₹100 Wallet Bonus Policy</h4>
          </div>
          <p className="text-[11px] text-amber-900 leading-snug">
            Place any vegetable or fruit order <strong>above ₹1,500</strong> for your hotel partner. When the order delivery is marked <strong>Delivered & Approved by Admin</strong>, ₹100 is credited straight to your Joiner Wallet!
          </p>
        </div>

        {/* 2 Sub-Cards: Paid & Pending Approvals */}
        <div className="grid grid-cols-2 gap-2.5">
          <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase">Credited to Wallet</p>
              <h4 className="text-base font-black text-slate-900 leading-tight">
                ₹{commissionBalance.paid.toLocaleString('en-IN')}
              </h4>
            </div>
          </div>

          <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase">Pending Delivery</p>
              <h4 className="text-base font-black text-amber-600 leading-tight">
                ₹{commissionBalance.pending.toLocaleString('en-IN')}
              </h4>
            </div>
          </div>
        </div>

        {/* Commission & Wallet Passbook History */}
        <div className="space-y-2 pt-1">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-xs text-slate-900">Wallet Passbook & Order History</h3>
            <span className="text-[10px] font-bold text-slate-400">{commissionHistory.length} Transactions</span>
          </div>

          {commissionHistory.length === 0 ? (
            <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-6 text-center space-y-2">
              <div className="text-3xl">🥦</div>
              <p className="text-xs font-bold text-slate-700">No Commission Earned Yet</p>
              <p className="text-[11px] text-slate-400 max-w-xs mx-auto">
                Place hotel orders above ₹1,500 to earn ₹100 for every successfully delivered and admin-approved order.
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs divide-y divide-slate-100 text-xs overflow-hidden">
              {commissionHistory.map((item, idx) => {
                const isPaid = item.status === 'Paid';
                const isPending = item.status === 'Pending Approval';

                return (
                  <div key={idx} className="p-3.5 flex items-center justify-between gap-2.5 hover:bg-slate-50/70 transition-colors">
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="font-black text-slate-900 text-xs truncate">
                          {item.hotelName}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono font-bold">
                          {item.orderId}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2 mt-0.5 text-[10px] text-slate-500 font-medium">
                        <span>{item.date}</span>
                        <span>•</span>
                        <span>Order Total: <strong className="text-slate-800">₹{(item.orderAmount || 0).toLocaleString('en-IN')}</strong></span>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="flex items-center justify-end gap-1 font-black text-xs text-slate-900">
                        {item.isBonusEligible ? (
                          <span className={isPaid ? 'text-emerald-700' : 'text-amber-600'}>
                            +₹{item.amount}
                          </span>
                        ) : (
                          <span className="text-slate-400 text-[11px]">₹0</span>
                        )}
                      </div>

                      <div className="mt-1">
                        {isPaid ? (
                          <span className="text-[9px] px-2 py-0.5 rounded-full font-black bg-emerald-100 text-emerald-800 border border-emerald-200 inline-flex items-center gap-0.5">
                            <CheckCircle2 className="w-2.5 h-2.5" /> Credited
                          </span>
                        ) : isPending ? (
                          <span className="text-[9px] px-2 py-0.5 rounded-full font-black bg-amber-100 text-amber-800 border border-amber-200 inline-flex items-center gap-0.5">
                            <Clock className="w-2.5 h-2.5" /> Awaiting Delivery
                          </span>
                        ) : (
                          <span className="text-[9px] px-2 py-0.5 rounded-full font-bold bg-slate-100 text-slate-500">
                            Under ₹1,500
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Navigation */}
      <MobileBottomNav />
    </div>
  );
};
