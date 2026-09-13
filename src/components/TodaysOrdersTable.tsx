import React from 'react';
import { useApp } from '../context/AppContext';

export const TodaysOrdersTable: React.FC = () => {
  const { setSelectedOrder, setActiveTab, orders, setIsOrderDetailModalOpen } = useApp();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Delivered':
        return <span className="bg-[#dcfce7] text-[#168a44] px-2 py-0.5 rounded-full font-bold text-[10px]">Delivered</span>;
      case 'Out for Delivery':
        return <span className="bg-[#dbeafe] text-[#1d4ed8] px-2 py-0.5 rounded-full font-bold text-[10px]">Out for Delivery</span>;
      case 'Preparing':
        return <span className="bg-[#fef3c7] text-[#b45309] px-2 py-0.5 rounded-full font-bold text-[10px]">Preparing</span>;
      case 'Confirmed':
        return <span className="bg-[#e0e7ff] text-[#3730a3] px-2 py-0.5 rounded-full font-bold text-[10px]">Confirmed</span>;
      case 'Pending':
        return <span className="bg-[#fee2e2] text-[#b91c1c] px-2 py-0.5 rounded-full font-bold text-[10px]">Pending</span>;
      default:
        return <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full text-[10px]">{status}</span>;
    }
  };

  return (
    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex flex-col justify-between h-full">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-bold text-xs text-slate-800">Today's Orders</h3>
        <button
          onClick={() => setActiveTab('Orders')}
          className="text-xs text-blue-600 hover:text-blue-800 font-semibold cursor-pointer"
        >
          View All
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-[11px]">
          <thead>
            <tr className="border-b border-slate-100 text-slate-500 font-semibold">
              <th className="py-2 px-2 font-semibold">Order ID</th>
              <th className="py-2 px-2 font-semibold">Hotel Name</th>
              <th className="py-2 px-2 font-semibold">Zone</th>
              <th className="py-2 px-2 font-semibold">Joiner</th>
              <th className="py-2 px-2 font-semibold">Amount</th>
              <th className="py-2 px-2 font-semibold">Driver</th>
              <th className="py-2 px-2 font-semibold text-center">Status</th>
              <th className="py-2 px-2 font-semibold text-center">Commission</th>
              <th className="py-2 px-2 font-semibold text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {orders.slice(0, 6).map(order => (
              <tr key={order.id} className="hover:bg-slate-50/60 transition-colors">
                <td className="py-2 px-2 font-medium text-slate-700">{order.id}</td>
                <td className="py-2 px-2 font-bold text-slate-800">{order.hotelName}</td>
                <td className="py-2 px-2 text-slate-600">{order.zone}</td>
                <td className="py-2 px-2 text-slate-600">{order.joiner}</td>
                <td className="py-2 px-2 font-bold text-slate-800">₹{order.amount.toLocaleString('en-IN')}</td>
                <td className="py-2 px-2 text-slate-600">{order.driver}</td>
                <td className="py-2 px-2 text-center">{getStatusBadge(order.status)}</td>
                <td className="py-2 px-2 text-center font-medium text-slate-700">
                  {order.commission > 0 ? `₹${order.commission}` : '-'}
                </td>
                <td className="py-2 px-2 text-right">
                  <button
                    onClick={() => {
                      setSelectedOrder(order);
                      setIsOrderDetailModalOpen(true);
                    }}
                    className="text-blue-600 hover:text-blue-800 font-bold cursor-pointer"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
