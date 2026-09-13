import React, { useState } from 'react';
import { X, History, TrendingUp, TrendingDown, Filter } from 'lucide-react';
import type { Product } from '../../types';

interface StockHistoryModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export const StockHistoryModal: React.FC<StockHistoryModalProps> = ({ product, isOpen, onClose }) => {
  const [filterType, setFilterType] = useState<'All' | 'Stock In' | 'Stock Out'>('All');

  if (!isOpen || !product) return null;

  const history = (product.stockHistory && product.stockHistory.length > 0 ? product.stockHistory : [
    { date: '11 Sep 2026', type: 'Stock In' as const, qty: '+200 KG', ref: 'PO-001', user: 'Admin' },
    { date: '09 Sep 2026', type: 'Stock Out' as const, qty: '-50 KG', ref: 'ORD-1001', user: 'System' },
    { date: '05 Sep 2026', type: 'Stock In' as const, qty: '+300 KG', ref: 'PO-002', user: 'Admin' },
    { date: '02 Sep 2026', type: 'Stock Out' as const, qty: '-100 KG', ref: 'ORD-0987', user: 'System' },
    { date: '28 Aug 2026', type: 'Stock In' as const, qty: '+400 KG', ref: 'PO-000', user: 'Admin' },
    { date: '25 Aug 2026', type: 'Stock Out' as const, qty: '-150 KG', ref: 'ORD-0912', user: 'System' }
  ]).filter(item => filterType === 'All' || item.type === filterType);

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <History className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-800">Stock Audit Log - {product.name}</h3>
              <p className="text-xs text-slate-500">Current Balance: {product.stock} {product.unit} (Min: {product.minimumStock} {product.unit})</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 py-3 text-xs font-semibold">
          <span className="text-slate-400 mr-1 flex items-center gap-1"><Filter className="w-3.5 h-3.5" /> Filter:</span>
          {(['All', 'Stock In', 'Stock Out'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilterType(f)}
              className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                filterType === f
                  ? 'bg-emerald-700 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* History Table */}
        <div className="border border-slate-200 rounded-xl overflow-hidden max-h-72 overflow-y-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200 sticky top-0">
              <tr>
                <th className="py-2.5 px-3">Date</th>
                <th className="py-2.5 px-3">Type</th>
                <th className="py-2.5 px-3 text-center">Quantity</th>
                <th className="py-2.5 px-3">Reference</th>
                <th className="py-2.5 px-3">Authorized By</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {history.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/70 text-xs">
                  <td className="py-2 px-3 text-slate-600 font-medium">{row.date}</td>
                  <td className="py-2 px-3">
                    <span className={`inline-flex items-center gap-1 font-bold ${
                      row.type === 'Stock In' ? 'text-emerald-700' : 'text-rose-600'
                    }`}>
                      {row.type === 'Stock In' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                      {row.type}
                    </span>
                  </td>
                  <td className={`py-2 px-3 text-center font-bold font-mono ${
                    row.type === 'Stock In' ? 'text-emerald-800' : 'text-rose-700'
                  }`}>
                    {row.qty}
                  </td>
                  <td className="py-2 px-3 font-mono text-slate-600">{row.ref}</td>
                  <td className="py-2 px-3 text-slate-700">{row.user}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
