import React from 'react';
import { Plus, Users, MapPin, FileText, Truck } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const QuickActions: React.FC = () => {
  const { setIsAddHotelOpen, setIsAddJoinerOpen, setIsAddZoneOpen, setActiveTab } = useApp();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 w-full">
      <button
        onClick={() => setIsAddHotelOpen(true)}
        className="flex items-center justify-center gap-2 px-3 py-2.5 bg-[#16a34a] hover:bg-[#15803d] text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer"
      >
        <Plus className="w-4 h-4" />
        <span>+ Add Hotel</span>
      </button>

      <button
        onClick={() => setIsAddJoinerOpen(true)}
        className="flex items-center justify-center gap-2 px-3 py-2.5 bg-[#0284c7] hover:bg-[#0369a1] text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer"
      >
        <Users className="w-4 h-4" />
        <span>+ Add Joiner</span>
      </button>

      <button
        onClick={() => setIsAddZoneOpen(true)}
        className="flex items-center justify-center gap-2 px-3 py-2.5 bg-[#ea580c] hover:bg-[#c2410c] text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer"
      >
        <MapPin className="w-4 h-4" />
        <span>+ Add Zone</span>
      </button>

      <button
        onClick={() => setActiveTab('Orders')}
        className="flex items-center justify-center gap-2 px-3 py-2.5 bg-[#6b47c0] hover:bg-[#5833aa] text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer"
      >
        <FileText className="w-4 h-4" />
        <span>View Orders</span>
      </button>

      <button
        onClick={() => setActiveTab('Delivery Drivers')}
        className="flex items-center justify-center gap-2 px-3 py-2.5 bg-[#15803d] hover:bg-[#166534] text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer"
      >
        <Truck className="w-4 h-4" />
        <span>View Deliveries</span>
      </button>
    </div>
  );
};
