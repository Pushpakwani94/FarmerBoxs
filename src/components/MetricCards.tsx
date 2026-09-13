import React from 'react';
import {
  Building2,
  Users,
  MapPin,
  ShoppingCart,
  FileText,
  Truck,
  IndianRupee,
  Coins
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const MetricCards: React.FC = () => {
  const { setActiveTab, hotels, joiners, zones, orders, isDatabaseConnected } = useApp();

  const activeHotels = hotels.filter(h => h.status === 'Active').length;
  const activeJoiners = joiners.filter(j => j.status === 'Active').length;
  const activeZones = zones.filter(z => z.status === 'Active').length;
  const pendingOrders = orders.filter(o => o.status === 'Pending').length;
  const deliveredOrders = orders.filter(o => o.status === 'Delivered').length;
  const totalSales = orders.reduce((sum, o) => sum + (Number(o.amount) || 0), 0);
  const totalCommission = deliveredOrders * 100;

  const cards = [
    {
      title: 'Total Hotels',
      value: isDatabaseConnected ? hotels.length.toLocaleString('en-IN') : '1,620',
      subtext: isDatabaseConnected ? `${activeHotels} Active` : '↑ 1,450 Active',
      bgColor: 'bg-[#edfcf2]',
      iconBg: 'bg-[#bbf7d0] text-[#15803d]',
      icon: Building2,
      subtextColor: 'text-[#15803d] font-semibold',
      tab: 'Hotels'
    },
    {
      title: 'Hotel Joiners',
      value: isDatabaseConnected ? joiners.length.toLocaleString('en-IN') : '85',
      subtext: isDatabaseConnected ? `${activeJoiners} Active` : '↑ 72 Active',
      bgColor: 'bg-[#eff6ff]',
      iconBg: 'bg-[#bfdbfe] text-[#1d4ed8]',
      icon: Users,
      subtextColor: 'text-[#15803d] font-semibold',
      tab: 'Hotel Joiners'
    },
    {
      title: 'Total Zones',
      value: isDatabaseConnected ? zones.length.toLocaleString('en-IN') : '12',
      subtext: isDatabaseConnected ? `${activeZones} Active` : '↑ 12 Active',
      bgColor: 'bg-[#fff7ed]',
      iconBg: 'bg-[#fed7aa] text-[#ea580c]',
      icon: MapPin,
      subtextColor: 'text-[#15803d] font-semibold',
      tab: 'Zones'
    },
    {
      title: "Today's Orders",
      value: isDatabaseConnected ? orders.length.toLocaleString('en-IN') : '248',
      subtext: isDatabaseConnected ? `${orders.length} in database` : '↑ +18% from yesterday',
      bgColor: 'bg-[#f5f3ff]',
      iconBg: 'bg-[#ddd6fe] text-[#7c3aed]',
      icon: ShoppingCart,
      subtextColor: 'text-[#15803d] font-semibold',
      tab: 'Orders'
    },
    {
      title: 'Pending Orders',
      value: isDatabaseConnected ? pendingOrders.toLocaleString('en-IN') : '48',
      subtext: 'Awaiting Processing',
      bgColor: 'bg-[#fefce8]',
      iconBg: 'bg-[#fef08a] text-[#ca8a04]',
      icon: FileText,
      subtextColor: 'text-slate-500 font-normal',
      tab: 'Orders'
    },
    {
      title: 'Delivered Orders',
      value: isDatabaseConnected ? deliveredOrders.toLocaleString('en-IN') : '200',
      subtext: isDatabaseConnected ? `${deliveredOrders} Completed` : '↑ +22% from yesterday',
      bgColor: 'bg-[#ecfdf5]',
      iconBg: 'bg-[#a7f3d0] text-[#15803d]',
      icon: Truck,
      subtextColor: 'text-[#15803d] font-semibold',
      tab: 'Orders'
    },
    {
      title: "Today's Sales",
      value: isDatabaseConnected ? `₹${totalSales.toLocaleString('en-IN')}` : '₹4,85,000',
      subtext: isDatabaseConnected ? 'Live Firestore revenue' : '↑ +18% from yesterday',
      bgColor: 'bg-[#fff1f2]',
      iconBg: 'bg-[#fecdd3] text-[#e11d48]',
      icon: IndianRupee,
      subtextColor: 'text-[#15803d] font-semibold',
      tab: 'Reports'
    },
    {
      title: 'Joiner Commission',
      value: isDatabaseConnected ? `₹${totalCommission.toLocaleString('en-IN')}` : '₹20,000',
      subtext: `${deliveredOrders} orders × ₹100`,
      bgColor: 'bg-[#f0f9ff]',
      iconBg: 'bg-[#bae6fd] text-[#0284c7]',
      icon: Coins,
      subtextColor: 'text-slate-500 font-normal',
      tab: 'Joiner Commission'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            key={idx}
            onClick={() => setActiveTab(card.tab)}
            className={`${card.bgColor} p-3.5 rounded-xl border border-black/5 shadow-2xs flex items-center gap-3.5 transition-all hover:shadow-md hover:scale-[1.01] active:scale-[0.99] cursor-pointer`}
          >
            <div className={`w-11 h-11 rounded-xl ${card.iconBg} flex items-center justify-center flex-shrink-0 shadow-2xs`}>
              <Icon className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-slate-700 leading-none">{card.title}</p>
              <h3 className="text-2xl font-extrabold text-slate-900 mt-1 tracking-tight leading-none">{card.value}</h3>
              <p className={`text-[11px] mt-1.5 leading-none ${card.subtextColor}`}>{card.subtext}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
