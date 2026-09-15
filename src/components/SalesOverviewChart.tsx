import React, { useState, useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useApp } from '../context/AppContext';

export const SalesOverviewChart: React.FC = () => {
  const { orders } = useApp();
  const [period, setPeriod] = useState<'This Month' | 'Last Month'>('This Month');

  const currentData = useMemo(() => {
    if (orders.length === 0) {
      return [
        { date: '1st', sales: 0 },
        { date: '10th', sales: 0 },
        { date: '20th', sales: 0 },
        { date: 'Today', sales: 0 }
      ];
    }

    const map = new Map<string, number>();
    orders.forEach((o: any) => {
      const d = o.date || 'Today';
      map.set(d, (map.get(d) || 0) + (Number(o.amount) || 0));
    });

    return Array.from(map.entries()).map(([date, sales]) => ({ date, sales }));
  }, [orders]);

  const maxSales = Math.max(10000, ...currentData.map(d => d.sales));

  const formatYAxis = (val: number) => {
    if (val === 0) return '0';
    if (val >= 100000) return `${(val / 100000).toFixed(1)}L`;
    if (val >= 1000) return `${(val / 1000).toFixed(0)}k`;
    return `${val}`;
  };

  return (
    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-xs text-slate-800">Sales Overview</h3>
        <select
          value={period}
          onChange={e => setPeriod(e.target.value as 'This Month' | 'Last Month')}
          className="text-[11px] border border-slate-200 rounded px-2 py-0.5 bg-white font-medium text-slate-700 cursor-pointer hover:border-slate-400 focus:outline-none"
        >
          <option value="This Month">This Month</option>
          <option value="Last Month">Last Month</option>
        </select>
      </div>

      {/* Chart */}
      <div className="h-52 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={currentData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#168a44" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#168a44" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: '#64748b' }}
              tickFormatter={formatYAxis}
              domain={[0, Math.ceil(maxSales * 1.2)]}
            />
            <Tooltip
              formatter={(value: any) => [`₹${Number(value || 0).toLocaleString('en-IN')}`, 'Sales']}
              contentStyle={{ backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '11px' }}
            />
            <Area
              type="monotone"
              dataKey="sales"
              stroke="#168a44"
              strokeWidth={2}
              fill="url(#salesGrad)"
              dot={{ fill: '#168a44', r: 3, strokeWidth: 1, stroke: '#ffffff' }}
              activeDot={{ r: 5, stroke: '#168a44', strokeWidth: 2, fill: '#ffffff' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
