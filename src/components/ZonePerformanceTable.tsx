import React from 'react';
import { useApp } from '../context/AppContext';

export const ZonePerformanceTable: React.FC = () => {
  const { setActiveTab, zones, setSelectedZone, hotels, joiners, orders, isDatabaseConnected } = useApp();

  const handleZoneClick = (zoneName: string) => {
    const matched = zones.find(z => z.name.toLowerCase() === zoneName.toLowerCase());
    if (matched) {
      setSelectedZone(matched);
    }
    setActiveTab('Zones');
  };

  const zonesData = isDatabaseConnected
    ? zones.map(z => {
        const zoneHotels = hotels.filter(h => h.zone?.toLowerCase() === z.name.toLowerCase()).length;
        const zoneJoiners = joiners.filter(j => j.zone?.toLowerCase() === z.name.toLowerCase()).length;
        const zoneOrders = orders.filter(o => o.zone?.toLowerCase() === z.name.toLowerCase());
        const deliveredCount = zoneOrders.filter(o => o.status === 'Delivered').length;
        const totalSales = zoneOrders.reduce((acc, o) => acc + (Number(o.amount) || 0), 0);
        return {
          zone: z.name,
          hotels: zoneHotels,
          joiners: zoneJoiners,
          orders: zoneOrders.length,
          delivered: deliveredCount,
          sales: `₹${totalSales.toLocaleString('en-IN')}`
        };
      })
    : [
        { zone: 'Kharadi', hotels: 120, joiners: 5, orders: 35, delivered: 30, sales: '₹85,000' },
        { zone: 'Viman Nagar', hotels: 80, joiners: 3, orders: 22, delivered: 19, sales: '₹52,000' },
        { zone: 'Hinjawadi', hotels: 150, joiners: 8, orders: 48, delivered: 42, sales: '₹1,10,000' },
        { zone: 'Magarpatta', hotels: 95, joiners: 4, orders: 28, delivered: 24, sales: '₹68,000' },
        { zone: 'Hadapsar', hotels: 110, joiners: 6, orders: 32, delivered: 28, sales: '₹75,000' }
      ];

  return (
    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex flex-col justify-between h-full">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-bold text-xs text-slate-800">Zone Performance</h3>
        <button
          onClick={() => setActiveTab('Zones')}
          className="text-xs text-blue-600 hover:text-blue-800 font-semibold cursor-pointer"
        >
          View All
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-[11px]">
          <thead>
            <tr className="border-b border-slate-100 text-slate-500">
              <th className="py-2 px-1.5 font-semibold">Zone</th>
              <th className="py-2 px-1.5 font-semibold text-center">Hotels</th>
              <th className="py-2 px-1.5 font-semibold text-center">Joiners</th>
              <th className="py-2 px-1.5 font-semibold text-center">Orders</th>
              <th className="py-2 px-1.5 font-semibold text-center">Delivered</th>
              <th className="py-2 px-1.5 font-semibold text-right">Sales</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {zonesData.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-slate-400 font-medium text-xs">
                  No zones yet in database.
                </td>
              </tr>
            ) : (
              zonesData.map((item, idx) => (
                <tr
                  key={idx}
                  onClick={() => handleZoneClick(item.zone)}
                  className="hover:bg-emerald-50/50 cursor-pointer transition-colors"
                  title={`Click to view ${item.zone} details`}
                >
                  <td className="py-2 px-1.5 font-medium text-slate-800 hover:text-emerald-700">{item.zone}</td>
                  <td className="py-2 px-1.5 text-center text-slate-600">{item.hotels}</td>
                  <td className="py-2 px-1.5 text-center text-slate-600">{item.joiners}</td>
                  <td className="py-2 px-1.5 text-center text-slate-600">{item.orders}</td>
                  <td className="py-2 px-1.5 text-center text-slate-600">{item.delivered}</td>
                  <td className="py-2 px-1.5 text-right font-semibold text-slate-800">{item.sales}</td>
                </tr>
              ))
            )}

            {zonesData.length > 0 && (
              <tr className="bg-[#eaf7ed] font-bold text-slate-900 border-t border-emerald-200">
                <td className="py-2 px-1.5 text-[#168a44]">Total</td>
                <td className="py-2 px-1.5 text-center">
                  {zonesData.reduce((acc, z) => acc + z.hotels, 0)}
                </td>
                <td className="py-2 px-1.5 text-center">
                  {zonesData.reduce((acc, z) => acc + z.joiners, 0)}
                </td>
                <td className="py-2 px-1.5 text-center">
                  {zonesData.reduce((acc, z) => acc + z.orders, 0)}
                </td>
                <td className="py-2 px-1.5 text-center">
                  {zonesData.reduce((acc, z) => acc + z.delivered, 0)}
                </td>
                <td className="py-2 px-1.5 text-right text-[#168a44]">
                  {isDatabaseConnected
                    ? `₹${orders.reduce((acc, o) => acc + (Number(o.amount) || 0), 0).toLocaleString('en-IN')}`
                    : '₹3,90,000'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
