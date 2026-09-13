import React, { useState } from 'react';
import { ArrowLeft, Plus, Search, ChevronRight, Building2 } from 'lucide-react';
import { useJoinerApp } from '../JoinerAppContext';
import type { MobileHotel } from '../JoinerAppContext';
import { MobileBottomNav } from '../components/MobileBottomNav';

export const MyHotelsScreen: React.FC = () => {
  const { hotels, setCurrentScreen, setSelectedHotel } = useJoinerApp();
  const [activeFilter, setActiveFilter] = useState<'All' | 'Active' | 'Pending' | 'Inactive'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const allCount = hotels.length;
  const activeCount = hotels.filter(h => h.status === 'Active').length;
  const pendingCount = hotels.filter(h => h.status === 'Pending').length;
  const inactiveCount = hotels.filter(h => h.status === 'Inactive').length;

  const filterTabs = [
    { label: `All (${allCount})`, value: 'All' },
    { label: `Active (${activeCount})`, value: 'Active' },
    { label: `Pending (${pendingCount})`, value: 'Pending' },
    { label: `Inactive (${inactiveCount})`, value: 'Inactive' }
  ];

  const filteredHotels = hotels.filter(h => {
    const matchesFilter = activeFilter === 'All' || h.status === activeFilter;
    const matchesSearch =
      h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.zone.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleSelectHotel = (hotel: MobileHotel) => {
    setSelectedHotel(hotel);
    setCurrentScreen('PLACE_ORDER');
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 justify-between select-none">
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setCurrentScreen('DASHBOARD')}
              className="p-1 -ml-1 text-slate-700 hover:text-slate-900 cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h2 className="text-base font-extrabold text-slate-900">My Hotels</h2>
          </div>

          <button
            onClick={() => setCurrentScreen('ADD_HOTEL')}
            className="px-3 py-1.5 bg-[#15803d] hover:bg-[#166534] text-white text-xs font-bold rounded-lg flex items-center gap-1 shadow-2xs transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" /> Add Hotel
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search hotel name, area..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-800 placeholder:text-slate-400 focus:outline-emerald-600 shadow-2xs"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 text-xs">
          {filterTabs.map(tab => (
            <button
              key={tab.value}
              onClick={() => setActiveFilter(tab.value as any)}
              className={`px-3 py-1 rounded-lg text-[11px] font-bold whitespace-nowrap transition-colors cursor-pointer ${
                activeFilter === tab.value
                  ? 'bg-[#15803d] text-white'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Hotels List or Empty State */}
        <div className="space-y-2 pt-1">
          {hotels.length === 0 ? (
            <div className="py-12 px-4 text-center space-y-3.5 bg-white rounded-2xl border border-dashed border-slate-300/90 shadow-2xs mt-1">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-[#15803d] flex items-center justify-center mx-auto shadow-xs">
                <Building2 className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-black text-slate-900">No Hotels Added Yet</h3>
                <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
                  This is a fresh partner account. No hotels are displayed here until you add them. Onboard your first hotel to start placing orders!
                </p>
              </div>
              <button
                onClick={() => setCurrentScreen('ADD_HOTEL')}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#15803d] hover:bg-[#166534] text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Add First Hotel
              </button>
            </div>
          ) : filteredHotels.length === 0 ? (
            <div className="py-10 text-center space-y-2 bg-white rounded-2xl border border-slate-200 shadow-2xs">
              <p className="text-xs font-bold text-slate-700">No matching hotels found</p>
              <p className="text-[11px] text-slate-400">Try changing your search query or filter</p>
            </div>
          ) : (
            filteredHotels.map(hotel => (
              <div
                key={hotel.id}
                onClick={() => handleSelectHotel(hotel)}
                className="bg-white p-2.5 rounded-xl border border-slate-200/80 flex items-center justify-between hover:border-emerald-500 transition-all cursor-pointer shadow-2xs"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <h4 className="font-extrabold text-slate-900 text-xs truncate">
                      {hotel.name}
                    </h4>
                    <p className="text-[10px] text-slate-500 font-medium">
                      {hotel.zone}
                    </p>
                    <p className="text-[10px] text-slate-600 font-semibold mt-0.5">
                      Orders: {hotel.orders}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 flex-shrink-0">
                  <span
                    className={`text-[9.5px] px-2 py-0.5 rounded-md font-extrabold ${
                      hotel.status === 'Active'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : hotel.status === 'Pending'
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {hotel.status}
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Bottom Navigation */}
      <MobileBottomNav />
    </div>
  );
};
