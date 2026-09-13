import React, { useState } from 'react';
import { X, Search, Download, CheckCircle2, Clock, Calendar, ArrowUpRight } from 'lucide-react';
import type { JoinerCommissionRecord } from '../../data/commissionData';

interface JoinerCommissionHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  joiner: JoinerCommissionRecord | null;
}

export const JoinerCommissionHistoryModal: React.FC<JoinerCommissionHistoryModalProps> = ({
  isOpen,
  onClose,
  joiner
}) => {
  if (!isOpen || !joiner) return null;

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Paid' | 'Pending'>('All');

  // Generate a realistic list of 15 ledger entries for the joiner
  const transactions = [
    { id: 'TXN101', date: '11 Sep 2026', orderId: 'FB1001', hotelName: 'Hotel Spice Villa', amount: 100, status: 'Paid', paymentMode: 'UPI', utr: 'UTR98321045' },
    { id: 'TXN102', date: '10 Sep 2026', orderId: 'FB1006', hotelName: 'Hotel Grand Pune', amount: 100, status: 'Paid', paymentMode: 'Bank', utr: 'UTR98321046' },
    { id: 'TXN103', date: '09 Sep 2026', orderId: 'FB1010', hotelName: 'Hotel Parampara', amount: 100, status: 'Paid', paymentMode: 'UPI', utr: 'UTR98321047' },
    { id: 'TXN104', date: '08 Sep 2026', orderId: 'FB1015', hotelName: 'Hotel Maharaja', amount: 100, status: 'Pending', paymentMode: 'Pending', utr: '—' },
    { id: 'TXN105', date: '07 Sep 2026', orderId: 'FB1018', hotelName: 'Hotel Food Plaza', amount: 100, status: 'Paid', paymentMode: 'UPI', utr: 'UTR98321048' },
    { id: 'TXN106', date: '06 Sep 2026', orderId: 'FB1022', hotelName: 'Hotel Sai Sagar', amount: 100, status: 'Paid', paymentMode: 'Bank', utr: 'UTR98321049' },
    { id: 'TXN107', date: '05 Sep 2026', orderId: 'FB1025', hotelName: 'Hotel City Tadka', amount: 100, status: 'Paid', paymentMode: 'UPI', utr: 'UTR98321050' },
    { id: 'TXN108', date: '04 Sep 2026', orderId: 'FB1030', hotelName: 'Hotel Royal Treat', amount: 100, status: 'Paid', paymentMode: 'UPI', utr: 'UTR98321051' },
    { id: 'TXN109', date: '03 Sep 2026', orderId: 'FB1034', hotelName: 'Hotel Keshav', amount: 100, status: 'Pending', paymentMode: 'Pending', utr: '—' },
    { id: 'TXN110', date: '02 Sep 2026', orderId: 'FB1039', hotelName: 'Hotel Spice Villa', amount: 100, status: 'Paid', paymentMode: 'Bank', utr: 'UTR98321052' },
    { id: 'TXN111', date: '01 Sep 2026', orderId: 'FB1043', hotelName: 'Hotel Grand Pune', amount: 100, status: 'Paid', paymentMode: 'UPI', utr: 'UTR98321053' },
    { id: 'TXN112', date: '31 Aug 2026', orderId: 'FB1048', hotelName: 'Hotel Parampara', amount: 100, status: 'Paid', paymentMode: 'UPI', utr: 'UTR98321054' }
  ];

  const filteredTxns = transactions.filter(t => {
    const matchesSearch = t.orderId.toLowerCase().includes(search.toLowerCase()) ||
                          t.hotelName.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || t.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleExportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," +
      ["Date,Order ID,Hotel Name,Commission (INR),Status,Payment Mode,UTR Ref"].join(",") + "\n" +
      filteredTxns.map(t => `"${t.date}","${t.orderId}","${t.hotelName}","${t.amount}","${t.status}","${t.paymentMode}","${t.utr}"`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${joiner.name.replace(/\s+/g, '_')}_Commission_History.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-3xl w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-[#15803d] px-6 py-4 flex items-center justify-between text-white flex-shrink-0">
          <div className="flex items-center gap-3">
            <img src={joiner.avatar} alt={joiner.name} className="w-10 h-10 rounded-full object-cover border-2 border-emerald-300" />
            <div>
              <h2 className="text-base font-bold">{joiner.name} — Full Commission Ledger</h2>
              <p className="text-xs text-emerald-100">{joiner.zone} Zone • Rate: ₹{joiner.commissionRate}/order • Mobile: {joiner.mobile}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg bg-emerald-800/60 hover:bg-emerald-800 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Top Summary Badges */}
        <div className="p-5 bg-slate-50 border-b border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs flex-shrink-0">
          <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
            <p className="text-[11px] text-slate-500 font-medium">Total Delivered Orders</p>
            <h4 className="text-lg font-extrabold text-slate-800 mt-0.5">{joiner.deliveredOrders}</h4>
            <p className="text-[10px] text-emerald-600 font-bold mt-0.5">✅ 100% Verified</p>
          </div>
          <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
            <p className="text-[11px] text-slate-500 font-medium">Total Commission</p>
            <h4 className="text-lg font-extrabold text-slate-800 mt-0.5">₹{joiner.commission.toLocaleString('en-IN')}</h4>
            <p className="text-[10px] text-slate-400 mt-0.5">₹100 per order</p>
          </div>
          <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
            <p className="text-[11px] text-slate-500 font-medium">Paid Amount</p>
            <h4 className="text-lg font-extrabold text-emerald-700 mt-0.5">₹{joiner.paidAmount.toLocaleString('en-IN')}</h4>
            <p className="text-[10px] text-emerald-600 font-bold mt-0.5">Disbursed to bank/UPI</p>
          </div>
          <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
            <p className="text-[11px] text-slate-500 font-medium">Pending Commission</p>
            <h4 className="text-lg font-extrabold text-amber-700 mt-0.5">₹{joiner.pendingAmount.toLocaleString('en-IN')}</h4>
            <p className="text-[10px] text-amber-600 font-bold mt-0.5">Available for payout</p>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="px-5 py-3 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2" />
              <input
                type="text"
                placeholder="Search order or hotel..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg w-52 focus:outline-emerald-600"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 font-medium text-slate-700"
            >
              <option value="All">All Status</option>
              <option value="Paid">Paid Only</option>
              <option value="Pending">Pending Only</option>
            </select>
          </div>

          <button
            onClick={handleExportCSV}
            className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-2xs transition-colors"
          >
            <Download className="w-3.5 h-3.5" /> Export Ledger CSV
          </button>
        </div>

        {/* Transactions Table */}
        <div className="overflow-y-auto flex-1 p-5">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 sticky top-0">
              <tr className="text-slate-500 font-semibold">
                <th className="py-2.5 px-3">Date</th>
                <th className="py-2.5 px-3">Order ID</th>
                <th className="py-2.5 px-3">Hotel Partner</th>
                <th className="py-2.5 px-3 text-right">Commission</th>
                <th className="py-2.5 px-3 text-center">Status</th>
                <th className="py-2.5 px-3">Payment Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTxns.length > 0 ? (
                filteredTxns.map((t, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-2.5 px-3 text-slate-600 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-400" /> {t.date}
                    </td>
                    <td className="py-2.5 px-3 font-bold text-slate-800">{t.orderId}</td>
                    <td className="py-2.5 px-3 font-medium text-slate-700">{t.hotelName}</td>
                    <td className="py-2.5 px-3 text-right font-bold text-slate-900">₹{t.amount}</td>
                    <td className="py-2.5 px-3 text-center">
                      <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] inline-flex items-center gap-1 ${
                        t.status === 'Paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {t.status === 'Paid' ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                        {t.status}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-slate-500 text-[11px] font-mono">
                      {t.paymentMode !== 'Pending' ? (
                        <span>{t.paymentMode} • {t.utr}</span>
                      ) : (
                        <span className="text-amber-700 font-sans font-medium">Pending Disbursal</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-400 font-medium">
                    No transactions match your search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600 flex-shrink-0">
          <span>Showing {filteredTxns.length} records</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg font-bold text-slate-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
