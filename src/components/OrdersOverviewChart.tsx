import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { weeklyOrdersChartData } from '../mockData';

export const OrdersOverviewChart: React.FC = () => {
  const [period, setPeriod] = useState<'This Week' | 'Last Week'>('This Week');

  const lastWeekData = [
    { day: 'Mon', Delivered: 210, Pending: 140, Cancelled: 30 },
    { day: 'Tue', Delivered: 195, Pending: 110, Cancelled: 20 },
    { day: 'Wed', Delivered: 230, Pending: 155, Cancelled: 45 },
    { day: 'Thu', Delivered: 180, Pending: 90, Cancelled: 15 },
    { day: 'Fri', Delivered: 240, Pending: 130, Cancelled: 35 },
    { day: 'Sat', Delivered: 190, Pending: 100, Cancelled: 25 },
    { day: 'Sun', Delivered: 215, Pending: 120, Cancelled: 20 }
  ];

  const currentData = period === 'This Week' ? weeklyOrdersChartData : lastWeekData;

  return (
    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-xs text-slate-800">Orders Overview</h3>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 text-[10px] font-medium mr-1">
            <span className="flex items-center gap-1 text-slate-600">
              <span className="w-2 h-2 rounded-xs bg-[#168a44] inline-block"></span> Delivered
            </span>
            <span className="flex items-center gap-1 text-slate-600">
              <span className="w-2 h-2 rounded-xs bg-[#f59e0b] inline-block"></span> Pending
            </span>
            <span className="flex items-center gap-1 text-slate-600">
              <span className="w-2 h-2 rounded-xs bg-[#e2e8f0] inline-block"></span> Cancelled
            </span>
          </div>
          <select
            value={period}
            onChange={e => setPeriod(e.target.value as 'This Week' | 'Last Week')}
            className="text-[11px] border border-slate-200 rounded px-2 py-0.5 bg-white font-medium text-slate-700 cursor-pointer hover:border-slate-400 focus:outline-none"
          >
            <option value="This Week">This Week</option>
            <option value="Last Week">Last Week</option>
          </select>
        </div>
      </div>

      {/* Chart */}
      <div className="h-52 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={currentData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }} barGap={3}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} domain={[0, 400]} />
            <Tooltip
              contentStyle={{ backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '11px' }}
            />
            <Bar dataKey="Delivered" fill="#168a44" radius={[2, 2, 0, 0]} maxBarSize={10} />
            <Bar dataKey="Pending" fill="#f59e0b" radius={[2, 2, 0, 0]} maxBarSize={10} />
            <Bar dataKey="Cancelled" fill="#e2e8f0" radius={[2, 2, 0, 0]} maxBarSize={10} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
