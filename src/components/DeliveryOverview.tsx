import React from 'react';
import { UserCheck, Truck, CheckCircle2, Users } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const DeliveryOverview: React.FC = () => {
  const { setActiveTab, drivers, orders, isDatabaseConnected } = useApp();

  const totalDrivers = isDatabaseConnected ? drivers.length : 45;
  const availableDrivers = isDatabaseConnected
    ? drivers.filter(d => d.status === 'Active').length
    : 12;
  const outForDelivery = isDatabaseConnected
    ? orders.filter(o => o.status === 'Out for Delivery').length
    : 18;
  const completedToday = isDatabaseConnected
    ? orders.filter(o => o.status === 'Delivered').length
    : 35;

  return (
    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex flex-col justify-between h-full">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-xs text-slate-800">Delivery Overview</h3>
        <button
          onClick={() => setActiveTab('Delivery Drivers')}
          className="text-xs text-blue-600 hover:text-blue-800 font-semibold cursor-pointer"
        >
          View All
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 my-auto">
        <div
          onClick={() => setActiveTab('Delivery Drivers')}
          className="bg-[#f0f7ff] p-3 rounded-xl border border-blue-100/60 flex items-center gap-3 cursor-pointer hover:shadow-sm hover:scale-[1.01] active:scale-[0.99] transition-all"
        >
          <div className="w-10 h-10 rounded-xl bg-[#dbeafe] flex items-center justify-center text-[#1d4ed8] flex-shrink-0">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-semibold text-slate-500">Total Drivers</p>
            <h4 className="text-xl font-extrabold text-slate-800 leading-tight">{totalDrivers}</h4>
          </div>
        </div>

        <div
          onClick={() => setActiveTab('Delivery Drivers')}
          className="bg-[#f0fdf4] p-3 rounded-xl border border-emerald-100/60 flex items-center gap-3 cursor-pointer hover:shadow-sm hover:scale-[1.01] active:scale-[0.99] transition-all"
        >
          <div className="w-10 h-10 rounded-xl bg-[#dcfce7] flex items-center justify-center text-[#168a44] flex-shrink-0">
            <UserCheck className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-semibold text-slate-500">Available</p>
            <h4 className="text-xl font-extrabold text-slate-800 leading-tight">{availableDrivers}</h4>
          </div>
        </div>

        <div
          onClick={() => setActiveTab('Delivery Drivers')}
          className="bg-[#fffbeb] p-3 rounded-xl border border-amber-100/60 flex items-center gap-3 cursor-pointer hover:shadow-sm hover:scale-[1.01] active:scale-[0.99] transition-all"
        >
          <div className="w-10 h-10 rounded-xl bg-[#fef3c7] flex items-center justify-center text-[#d97706] flex-shrink-0">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-semibold text-slate-500">Out for Delivery</p>
            <h4 className="text-xl font-extrabold text-slate-800 leading-tight">{outForDelivery}</h4>
          </div>
        </div>

        <div
          onClick={() => setActiveTab('Delivery Drivers')}
          className="bg-[#f0fdf4] p-3 rounded-xl border border-emerald-100/60 flex items-center gap-3 cursor-pointer hover:shadow-sm hover:scale-[1.01] active:scale-[0.99] transition-all"
        >
          <div className="w-10 h-10 rounded-xl bg-[#dcfce7] flex items-center justify-center text-[#168a44] flex-shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-semibold text-slate-500">Completed Today</p>
            <h4 className="text-xl font-extrabold text-slate-800 leading-tight">{completedToday}</h4>
          </div>
        </div>
      </div>
    </div>
  );
};
