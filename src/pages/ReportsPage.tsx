import React, { useState } from 'react';
import { BarChart3, IndianRupee, ShoppingBag, Building2, Users, Download, FileText, Calendar } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export const ReportsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'Sales Report' | 'Orders Report' | 'Hotel Report' | 'Products Report' | 'Drivers Report' | 'Joiner Report' | 'Payment Report'>('Sales Report');

  const salesTrend = [
    { date: '5 Sep', sales: 50000 },
    { date: '6 Sep', sales: 65000 },
    { date: '7 Sep', sales: 85000 },
    { date: '8 Sep', sales: 92450 },
    { date: '9 Sep', sales: 105600 },
    { date: '10 Sep', sales: 120300 },
    { date: '11 Sep', sales: 132450 }
  ];

  const pieOrdersStatus = [
    { name: 'Delivered', value: 1020, color: '#16a34a' },
    { name: 'Pending', value: 120, color: '#f59e0b' },
    { name: 'Cancelled', value: 65, color: '#ef4444' },
    { name: 'Returned', value: 40, color: '#3b82f6' }
  ];

  return (
    <div className="p-6 max-w-[1600px] mx-auto space-y-5">
      {/* Header Metric Cards (5 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-center">
        <div className="bg-emerald-50/80 p-3.5 rounded-xl border border-emerald-100 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
            <IndianRupee className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-slate-500">Total Revenue</p>
            <h3 className="text-xl font-bold text-slate-900 leading-none mt-0.5">₹5,48,320</h3>
            <p className="text-[10px] text-emerald-700 font-semibold mt-1">↑ +18% vs last month</p>
          </div>
        </div>

        <div className="bg-sky-50/80 p-3.5 rounded-xl border border-sky-100 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sky-600 text-white flex items-center justify-center font-bold">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-slate-500">Total Orders</p>
            <h3 className="text-xl font-bold text-slate-900 leading-none mt-0.5">1,245</h3>
            <p className="text-[10px] text-sky-700 font-semibold mt-1">↑ +12% vs last month</p>
          </div>
        </div>

        <div className="bg-amber-50/80 p-3.5 rounded-xl border border-amber-100 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-slate-500">Total Hotels</p>
            <h3 className="text-xl font-bold text-slate-900 leading-none mt-0.5">350</h3>
            <p className="text-[10px] text-amber-700 font-semibold mt-1">↑ +8% vs last month</p>
          </div>
        </div>

        <div className="bg-purple-50/80 p-3.5 rounded-xl border border-purple-100 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-slate-500">Active Joiners</p>
            <h3 className="text-xl font-bold text-slate-900 leading-none mt-0.5">26</h3>
            <p className="text-[10px] text-purple-700 font-semibold mt-1">↑ +13% vs last month</p>
          </div>
        </div>

        <div className="bg-rose-50/80 p-3.5 rounded-xl border border-rose-100 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-500 text-white flex items-center justify-center font-bold">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-slate-500">Total Customers</p>
            <h3 className="text-xl font-bold text-slate-900 leading-none mt-0.5">412</h3>
            <p className="text-[10px] text-rose-700 font-semibold mt-1">↑ +10% vs last month</p>
          </div>
        </div>
      </div>

      {/* Sub-Tabs for Reports */}
      <div className="flex items-center gap-6 border-b border-slate-200 text-xs font-bold text-slate-600 bg-white px-5 py-3 rounded-xl border">
        {(['Sales Report', 'Orders Report', 'Hotel Report', 'Products Report', 'Drivers Report', 'Joiner Report', 'Payment Report'] as const).map(t => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className={`pb-1 transition-all ${
              activeTab === t ? 'text-emerald-700 border-b-2 border-emerald-700 font-extrabold' : 'text-slate-500'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Grid Row 1: Sales Overview (Line), Orders Status (Donut), Generate Report Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-5 bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-800">Sales Overview</h3>
            <select className="text-xs bg-slate-50 border border-slate-200 rounded px-2 py-0.5"><option>Daily</option></select>
          </div>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesTrend}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Area type="monotone" dataKey="sales" stroke="#16a34a" fill="#dcfce7" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-4 bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
          <h3 className="font-bold text-sm text-slate-800">Orders Status</h3>
          <div className="h-48 w-full relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieOrdersStatus} innerRadius={50} outerRadius={70} dataKey="value">
                  {pieOrdersStatus.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute text-center">
              <p className="font-extrabold text-slate-800 text-sm">1,245</p>
              <p className="text-[10px] text-slate-400">Total Orders</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3 bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
          <h3 className="font-bold text-sm text-slate-800 pb-2 border-b border-slate-100">Generate Report</h3>
          <p className="text-xs text-slate-500">Download detailed reports in PDF or Excel format</p>

          <select className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-slate-50 font-medium">
            <option>Sales Report</option>
          </select>

          <div className="border border-slate-200 bg-slate-50 rounded-lg px-3 py-2 text-xs text-slate-600 font-medium">
            📅 01 Sep 2026 - 11 Sep 2026
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button className="py-2 bg-rose-50 border border-rose-200 text-rose-800 font-bold text-xs rounded-lg flex items-center justify-center gap-1">
              📄 PDF
            </button>
            <button className="py-2 bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold text-xs rounded-lg flex items-center justify-center gap-1">
              📊 Excel
            </button>
          </div>

          <button className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs mt-2">
            Generate Report
          </button>
        </div>
      </div>

      {/* Grid Row 2: Top Products, Top Hotels, Orders by Zone, Quick Reports */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-3 bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-xs text-slate-800">Top Products by Sales</h4>
            <button className="text-[10px] text-blue-600 font-semibold">View All</button>
          </div>
          <div className="space-y-2 text-xs">
            {[
              { name: 'Tomato', sales: '₹1,25,000', icon: '🍅' },
              { name: 'Onion', sales: '₹95,600', icon: '🧅' },
              { name: 'Potato', sales: '₹72,300', icon: '🥔' },
              { name: 'Green Chilli', sales: '₹48,200', icon: '🌶️' },
              { name: 'Capsicum', sales: '₹38,500', icon: '🫑' }
            ].map((p, idx) => (
              <div key={idx} className="flex items-center justify-between p-1.5 bg-slate-50 rounded">
                <span className="flex items-center gap-2 font-medium"><span>{p.icon}</span>{p.name}</span>
                <span className="font-bold text-slate-800">{p.sales}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-3 bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-xs text-slate-800">Top Hotels by Orders</h4>
            <button className="text-[10px] text-blue-600 font-semibold">View All</button>
          </div>
          <div className="space-y-2 text-xs">
            {[
              { name: 'Hotel Spice Villa', count: 180, code: 'HS' },
              { name: 'Hotel Grand Pune', count: 145, code: 'HG' },
              { name: 'Hotel Maharaja', count: 120, code: 'HM' },
              { name: 'Hotel City Tadka', count: 98, code: 'HC' },
              { name: 'Hotel Green Leaf', count: 85, code: 'HL' }
            ].map((h, idx) => (
              <div key={idx} className="flex items-center justify-between p-1.5 bg-slate-50 rounded">
                <span className="flex items-center gap-2 font-medium">
                  <span className="w-5 h-5 rounded bg-emerald-600 text-white flex items-center justify-center font-bold text-[9px]">{h.code}</span>
                  {h.name}
                </span>
                <span className="font-bold text-slate-800">{h.count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-3 bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-xs text-slate-800">Orders by Zone</h4>
            <button className="text-[10px] text-blue-600 font-semibold">View All</button>
          </div>
          <div className="space-y-2 text-xs">
            {[
              { name: 'Kharadi', count: 320 },
              { name: 'Viman Nagar', count: 210 },
              { name: 'Hinjawadi', count: 180 },
              { name: 'Magarpatta', count: 145 },
              { name: 'Hadapsar', count: 120 },
              { name: 'Baner', count: 98 }
            ].map((z, idx) => (
              <div key={idx} className="flex items-center justify-between p-1.5 bg-slate-50 rounded">
                <span className="font-medium text-slate-800">{z.name}</span>
                <span className="font-bold text-purple-800">{z.count}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-3 bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-2">
          <h4 className="font-bold text-xs text-slate-800">Quick Reports</h4>
          <div className="space-y-1.5 text-xs">
            {[
              'Daily Report', 'Weekly Report', 'Monthly Report',
              'Zone Wise Report', 'Hotel Wise Report', 'Product Wise Report',
              'Driver Performance', 'Joiner Commission Report'
            ].map((r, idx) => (
              <div key={idx} className="flex items-center justify-between p-2 rounded hover:bg-slate-50 cursor-pointer border border-slate-100">
                <span className="font-medium text-slate-700">{r}</span>
                <span className="text-slate-400">›</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Table: Recent Report Data (Sales) */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm text-slate-800">Recent Report Data (Sales)</h3>
          <button className="text-xs text-blue-600 font-semibold">View All</button>
        </div>

        <table className="w-full text-left text-xs">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
              <th className="py-2 px-2">#</th>
              <th className="py-2 px-2">Date</th>
              <th className="py-2 px-2 text-center">Total Orders</th>
              <th className="py-2 px-2 text-right">Revenue (₹)</th>
              <th className="py-2 px-2 text-center">Delivered</th>
              <th className="py-2 px-2 text-center">Pending</th>
              <th className="py-2 px-2 text-center">Cancelled</th>
              <th className="py-2 px-2">Top Product</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {[
              { id: 1, date: '11 Sep 2026', totalOrders: 125, rev: '1,32,450', del: 102, pen: 15, can: 8, top: 'Tomato' },
              { id: 2, date: '10 Sep 2026', totalOrders: 118, rev: '1,20,300', del: 98, pen: 12, can: 8, top: 'Onion' },
              { id: 3, date: '09 Sep 2026', totalOrders: 110, rev: '1,05,600', del: 90, pen: 14, can: 6, top: 'Potato' },
              { id: 4, date: '08 Sep 2026', totalOrders: 102, rev: '92,450', del: 84, pen: 12, can: 6, top: 'Green Chili' },
              { id: 5, date: '07 Sep 2026', totalOrders: 96, rev: '80,300', del: 78, pen: 12, can: 6, top: 'Capsicum' }
            ].map(row => (
              <tr key={row.id} className="hover:bg-slate-50">
                <td className="py-2 px-2 text-slate-500">{row.id}</td>
                <td className="py-2 px-2 font-bold text-slate-800">{row.date}</td>
                <td className="py-2 px-2 text-center font-bold text-slate-800">{row.totalOrders}</td>
                <td className="py-2 px-2 text-right font-bold text-emerald-800">₹{row.rev}</td>
                <td className="py-2 px-2 text-center font-bold text-emerald-700">{row.del}</td>
                <td className="py-2 px-2 text-center font-bold text-amber-600">{row.pen}</td>
                <td className="py-2 px-2 text-center font-bold text-rose-600">{row.can}</td>
                <td className="py-2 px-2 font-semibold text-slate-700">{row.top}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
