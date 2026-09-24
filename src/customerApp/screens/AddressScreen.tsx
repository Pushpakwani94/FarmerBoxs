import React, { useState } from 'react';
import { ArrowLeft, Plus, MapPin, Check, Home, Briefcase, Building, ArrowRight, Trash2 } from 'lucide-react';
import { useCustomerApp } from '../CustomerAppContext';
import type { CustomerAddress } from '../types';

export const AddressScreen: React.FC = () => {
  const {
    addresses,
    selectedAddress,
    setSelectedAddress,
    addAddress,
    deleteAddress,
    setCurrentScreen
  } = useCustomerApp();

  const [isAddingNew, setIsAddingNew] = useState(false);
  const [flat, setFlat] = useState('');
  const [area, setArea] = useState('');
  const [landmark, setLandmark] = useState('');
  const [city, setCity] = useState('Pune');
  const [pincode, setPincode] = useState('411045');
  const [type, setType] = useState<'Home' | 'Work' | 'Other'>('Home');

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!flat.trim() || !area.trim()) {
      alert('Please fill in flat / house number and street area');
      return;
    }
    addAddress({
      type,
      label: type,
      flat: flat.trim(),
      area: area.trim(),
      landmark: landmark.trim(),
      city,
      pincode,
      isDefault: false
    });
    setIsAddingNew(false);
    setFlat('');
    setArea('');
    setLandmark('');
  };

  return (
    <div className="flex flex-col h-full bg-[#F8FAF9] justify-between overflow-y-auto no-scrollbar select-none">
      {/* Top Header */}
      <div className="bg-[#15803d] text-white px-4 py-3 shrink-0 shadow-sm sticky top-0 z-10 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setCurrentScreen('CART')}
            className="p-1 text-white/90 hover:text-white cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-base font-black tracking-tight">Select Delivery Address</h2>
        </div>
      </div>

      {/* Address List & New Form matching Screen 14 */}
      <div className="p-4 space-y-4 pb-28">
        {/* Add New Address Button */}
        {!isAddingNew && (
          <button
            onClick={() => setIsAddingNew(true)}
            className="w-full py-3 bg-[#15803d] hover:bg-[#166534] text-white font-bold text-xs rounded-2xl shadow-xs flex items-center justify-center gap-2 cursor-pointer transition-transform active:scale-98"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Add New Address</span>
          </button>
        )}

        {/* Add Address Form */}
        {isAddingNew && (
          <form onSubmit={handleSaveAddress} className="bg-white p-4 rounded-2xl border border-emerald-200 shadow-md space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h4 className="font-bold text-xs text-slate-900">Add New Delivery Location</h4>
              <button
                type="button"
                onClick={() => setIsAddingNew(false)}
                className="text-xs text-slate-400 hover:text-slate-600 font-bold"
              >
                Cancel
              </button>
            </div>

            {/* Type Pills */}
            <div className="flex gap-2">
              {(['Home', 'Work', 'Other'] as const).map(t => (
                <button
                  type="button"
                  key={t}
                  onClick={() => setType(t)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    type === t ? 'bg-[#15803d] text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <div className="space-y-2 text-xs">
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase">Flat / House / Floor</label>
                <input
                  type="text"
                  required
                  value={flat}
                  onChange={e => setFlat(e.target.value)}
                  placeholder="e.g. Flat 502, Orchid Tower"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600 mt-0.5"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase">Area / Street / Colony</label>
                <input
                  type="text"
                  required
                  value={area}
                  onChange={e => setArea(e.target.value)}
                  placeholder="e.g. Baner Road, Near Bitwise"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600 mt-0.5"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">City</label>
                  <input
                    type="text"
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600 mt-0.5"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Pincode</label>
                  <input
                    type="text"
                    value={pincode}
                    onChange={e => setPincode(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600 mt-0.5"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-[#15803d] text-white font-bold text-xs rounded-xl shadow-xs"
            >
              Save Address
            </button>
          </form>
        )}

        {/* Saved Addresses List matching Screen 14 */}
        <div className="space-y-2.5">
          <h4 className="text-xs font-black text-slate-700 uppercase tracking-wider">
            Saved Delivery Addresses
          </h4>

          {addresses.map(addr => {
            const isSelected = selectedAddress?.id === addr.id;
            const Icon = addr.type === 'Home' ? Home : addr.type === 'Work' ? Briefcase : Building;

            return (
              <div
                key={addr.id}
                onClick={() => setSelectedAddress(addr)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-start justify-between gap-3 ${
                  isSelected
                    ? 'bg-emerald-50/70 border-emerald-400 shadow-xs'
                    : 'bg-white border-slate-200/80 hover:bg-slate-50 shadow-2xs'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5 ${
                      isSelected ? 'border-emerald-600 bg-emerald-600 text-white' : 'border-slate-300'
                    }`}
                  >
                    {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>

                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <Icon className="w-3.5 h-3.5 text-emerald-700" />
                      <span className="font-bold text-xs text-slate-900">{addr.label}</span>
                      {addr.isDefault && (
                        <span className="text-[9px] bg-slate-100 text-slate-500 font-bold px-1.5 py-0.2 rounded">
                          Default
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-700 font-medium leading-snug">{addr.flat}</p>
                    <p className="text-[11px] text-slate-500">{addr.area}, {addr.city} - {addr.pincode}</p>
                  </div>
                </div>

                {addresses.length > 1 && (
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      deleteAddress(addr.id);
                    }}
                    className="p-1.5 text-slate-300 hover:text-rose-500 cursor-pointer transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Continue Button */}
      <div className="shrink-0 bg-white border-t border-slate-200 p-4 shadow-lg z-30">
        <button
          onClick={() => {
            if (!selectedAddress) {
              alert('Please select a delivery address');
              return;
            }
            setCurrentScreen('PAYMENT');
          }}
          className="w-full py-3.5 bg-[#15803d] hover:bg-[#166534] text-white font-black text-sm rounded-2xl shadow-md flex items-center justify-center gap-2 cursor-pointer transition-transform active:scale-98"
        >
          <span>Continue to Payment</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
