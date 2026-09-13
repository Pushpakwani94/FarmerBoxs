import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CreditCard, Wallet, ArrowDownRight, ArrowUpRight, Plus, Search, Eye, Download, PieChart, ChevronLeft, ChevronRight, Send, RefreshCw } from 'lucide-react';
import { PieChart as RechartsPie, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export const PaymentsPage: React.FC = () => {
  const { payments } = useApp();
  const [activeTab, setActiveTab] = useState<'All Transactions' | 'Order Payments' | 'Joiner Payouts' | 'Driver Payouts' | 'Refunds'>('All Transactions');

  const pieData = [
    { name: 'UPI', value: 38, color: '#22c55e' },
    { name: 'Card', value: 24, color: '#3b82f6' },
    { name: 'COD', value: 23, color: '#f97316' },
    { name: 'Wallet', value: 10, color: '#a855f7' },
    { name: 'Others', value: 5, color: '#94a3b8' }
  ];

  return (
    <div className="p-6 max-w-[1600px] mx-auto space-y-5">
      {/* Top Header Metrics (5 Cards + Action Button) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 items-center">
        <div className="bg-emerald-50/80 p-3.5 rounded-xl border border-emerald-100 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
            <CreditCard className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-slate-500">Total Payments</p>
            <h3 className="text-xl font-bold text-slate-900 leading-none mt-0.5">₹5,48,320</h3>
            <p className="text-[10px] text-emerald-700 font-semibold mt-1">↑ +18% this month</p>
          </div>
        </div>

        <div className="bg-sky-50/80 p-3.5 rounded-xl border border-sky-100 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sky-600 text-white flex items-center justify-center font-bold">
            <CreditCard className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-slate-500">Online Payments</p>
            <h3 className="text-xl font-bold text-slate-900 leading-none mt-0.5">₹3,62,450</h3>
            <p className="text-[10px] text-sky-700 font-semibold mt-1">66% of total</p>
          </div>
        </div>

        <div className="bg-amber-50/80 p-3.5 rounded-xl border border-amber-100 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold">
            <Wallet className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-slate-500">COD Payments</p>
            <h3 className="text-xl font-bold text-slate-900 leading-none mt-0.5">₹1,25,870</h3>
            <p className="text-[10px] text-amber-700 font-semibold mt-1">23% of total</p>
          </div>
        </div>

        <div className="bg-purple-50/80 p-3.5 rounded-xl border border-purple-100 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold">
            <Wallet className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-slate-500">Joiner Commissions</p>
            <h3 className="text-xl font-bold text-slate-900 leading-none mt-0.5">₹24,500</h3>
            <p className="text-[10px] text-purple-700 font-semibold mt-1">4.5% of total</p>
          </div>
        </div>

        <div className="bg-rose-50/80 p-3.5 rounded-xl border border-rose-100 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-500 text-white flex items-center justify-center font-bold">
            <RefreshCw className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-slate-500">Refunds</p>
            <h3 className="text-xl font-bold text-slate-900 leading-none mt-0.5">₹5,500</h3>
            <p className="text-[10px] text-rose-700 font-semibold mt-1">1% of total</p>
          </div>
        </div>

        <div>
          <button className="w-full h-full py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs flex items-center justify-center gap-2">
            <Plus className="w-4 h-4" /> Record Manual Payment
          </button>
        </div>
      </div>

      {/* Main Grid: Left Table + Right Payment Methods & Recent Payments */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Payments List Table (8 cols) */}
        <div className="lg:col-span-8 bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-4 border-b border-slate-200 text-xs font-bold text-slate-600">
            {(['All Transactions', 'Order Payments', 'Joiner Payouts', 'Driver Payouts', 'Refunds'] as const).map(t => (
              <button
                key={t}
                onClick={() => setActiveTab(t)}
                className={`pb-2.5 transition-all ${
                  activeTab === t ? 'text-emerald-700 border-b-2 border-emerald-700' : 'text-slate-500'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <div className="border border-slate-200 bg-slate-50 rounded-lg px-3 py-1.5 text-slate-600 font-medium">
                📅 11 Sep 2026 - 11 Sep 2026
              </div>

              <select className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 font-medium text-slate-700">
                <option>All Payment Types</option>
              </select>

              <select className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 font-medium text-slate-700">
                <option>All Zones</option>
              </select>

              <select className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 font-medium text-slate-700">
                <option>All Status</option>
              </select>

              <button className="px-4 py-1.5 bg-emerald-700 text-white font-semibold rounded-lg">Search</button>
              <button className="px-3 py-1.5 bg-slate-100 text-slate-600 font-semibold rounded-lg">Reset</button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <h4 className="font-bold text-sm text-slate-800">Payments List (156)</h4>
            <button className="px-3 py-1.5 bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg flex items-center gap-1">
              📥 Export
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
                  <th className="py-2.5 px-2"><input type="checkbox" /></th>
                  <th className="py-2.5 px-2">#</th>
                  <th className="py-2.5 px-2">Date & Time</th>
                  <th className="py-2.5 px-2">Reference ID</th>
                  <th className="py-2.5 px-2">Type</th>
                  <th className="py-2.5 px-2">From / To</th>
                  <th className="py-2.5 px-2">Order ID</th>
                  <th className="py-2.5 px-2 text-right">Amount</th>
                  <th className="py-2.5 px-2 text-center">Status</th>
                  <th className="py-2.5 px-2">Payment Mode</th>
                  <th className="py-2.5 px-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {payments.map(p => (
                  <tr key={p.id} className="hover:bg-slate-50">
                    <td className="py-2.5 px-2"><input type="checkbox" /></td>
                    <td className="py-2.5 px-2 text-slate-500">{p.id}</td>
                    <td className="py-2.5 px-2 text-slate-600 text-[11px]">{p.dateTime}</td>
                    <td className="py-2.5 px-2 font-mono text-slate-600">{p.referenceId}</td>
                    <td className="py-2.5 px-2">
                      <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                        p.type === 'Order Payment' ? 'bg-emerald-100 text-emerald-800' :
                        p.type === 'COD Payment' ? 'bg-amber-100 text-amber-800' :
                        p.type === 'Joiner Commission' ? 'bg-purple-100 text-purple-800' :
                        p.type === 'Driver Payout' ? 'bg-sky-100 text-sky-800' : 'bg-rose-100 text-rose-800'
                      }`}>
                        {p.type}
                      </span>
                    </td>
                    <td className="py-2.5 px-2 font-bold text-slate-800">{p.fromTo}</td>
                    <td className="py-2.5 px-2 font-bold text-emerald-800">{p.orderId}</td>
                    <td className="py-2.5 px-2 text-right font-bold text-slate-900">₹{p.amount.toLocaleString('en-IN')}</td>
                    <td className="py-2.5 px-2 text-center">
                      <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                        p.status === 'Success' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                      }`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="py-2.5 px-2 text-slate-600 text-[11px]">{p.paymentMode}</td>
                    <td className="py-2.5 px-2 text-center">
                      <button className="p-1 text-slate-500 hover:text-blue-600"><Eye className="w-3.5 h-3.5" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between pt-2 text-xs text-slate-500">
            <span>Showing 1 to 10 of 156 transactions</span>
            <div className="flex items-center gap-1">
              <button className="p-1 rounded border border-slate-200"><ChevronLeft className="w-3.5 h-3.5" /></button>
              <span className="px-2.5 py-1 bg-emerald-700 text-white rounded font-bold text-xs">1</span>
              <span className="px-2 py-1 rounded border text-xs">2</span>
              <span className="px-2 py-1 rounded border text-xs">3</span>
              <button className="p-1 rounded border border-slate-200"><ChevronRight className="w-3.5 h-3.5" /></button>
            </div>
          </div>
        </div>

        {/* Right Column: Payment Methods Chart & Recent Payments (4 cols) */}
        <div className="lg:col-span-4 space-y-5">
          {/* Payment Methods Donut Chart */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
            <h3 className="font-bold text-sm text-slate-800">Payment Methods</h3>
            <div className="h-44 w-full relative flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPie>
                  <Pie data={pieData} innerRadius={55} outerRadius={75} paddingAngle={4} dataKey="value">
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </RechartsPie>
              </ResponsiveContainer>
              <div className="absolute text-center">
                <p className="font-extrabold text-slate-800 text-base">₹5,48,320</p>
                <p className="text-[10px] text-slate-400">Total Payments</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-100">
              {pieData.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></span>
                  <span className="text-slate-600 font-medium">{item.name}</span>
                  <span className="font-bold text-slate-800 ml-auto">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Payments Feed */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-slate-800">Recent Payments</h3>
              <button className="text-xs text-blue-600 font-semibold">View All</button>
            </div>

            <div className="space-y-2 text-xs">
              {[
                { title: 'Hotel Spice Villa', sub: 'Order Payment • FB1001', amount: '+₹2,500', time: '11 Sep, 10:24 AM', color: 'text-emerald-700' },
                { title: 'Rahul Patil', sub: 'Joiner Commission', amount: '+₹100', time: '11 Sep, 09:45 AM', color: 'text-purple-700' },
                { title: 'Suresh Kumar', sub: 'Driver Payout', amount: '+₹60', time: '11 Sep, 09:20 AM', color: 'text-sky-700' },
                { title: 'Hotel City Tadka', sub: 'Refund • FB1007', amount: '-₹500', time: '10 Sep, 06:45 PM', color: 'text-rose-600' },
                { title: 'Hotel Green Leaf', sub: 'Order Payment • FB1005', amount: '+₹4,000', time: '10 Sep, 04:20 PM', color: 'text-emerald-700' }
              ].map((tx, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
                  <div>
                    <p className="font-bold text-slate-800">{tx.title}</p>
                    <p className="text-[10px] text-slate-400">{tx.sub} • {tx.time}</p>
                  </div>
                  <span className={`font-bold ${tx.color}`}>{tx.amount}</span>
                </div>
              ))}
            </div>

            {/* Quick Actions Grid */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
              <button className="py-2 bg-emerald-50 text-emerald-800 font-bold text-xs rounded-lg">Make Payout</button>
              <button className="py-2 bg-rose-50 text-rose-800 font-bold text-xs rounded-lg">Refund Payment</button>
              <button className="py-2 bg-amber-50 text-amber-800 font-bold text-xs rounded-lg">Wallet Topup</button>
              <button className="py-2 bg-purple-50 text-purple-800 font-bold text-xs rounded-lg">Payment Report</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
