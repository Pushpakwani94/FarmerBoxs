import React, { useState } from 'react';
import { X, MapPin } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AddZoneModal: React.FC = () => {
  const { isAddZoneOpen, setIsAddZoneOpen, addZone } = useApp();
  const [zoneName, setZoneName] = useState('');
  const [areaLocations, setAreaLocations] = useState('');
  const [status, setStatus] = useState<'Active' | 'Inactive'>('Active');

  if (!isAddZoneOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!zoneName.trim()) return;
    addZone(zoneName.trim(), areaLocations.trim() || `${zoneName.trim()}, Pune`, status);
    setIsAddZoneOpen(false);
    setZoneName('');
    setAreaLocations('');
    setStatus('Active');
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-800">Add New Zone</h3>
              <p className="text-xs text-slate-500">Define operational zone in Pune</p>
            </div>
          </div>
          <button
            onClick={() => setIsAddZoneOpen(false)}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-3.5 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Zone Name *</label>
            <input
              type="text"
              required
              placeholder="e.g. Bavdhan / Wakad"
              value={zoneName}
              onChange={e => setZoneName(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Area / Locations Covered</label>
            <input
              type="text"
              placeholder="e.g. Bavdhan, Chandani Chowk, NDA Road"
              value={areaLocations}
              onChange={e => setAreaLocations(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Initial Status</label>
            <select
              value={status}
              onChange={e => setStatus(e.target.value as 'Active' | 'Inactive')}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:outline-none font-medium text-slate-700"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsAddZoneOpen(false)}
              className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-semibold cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg font-semibold shadow-xs cursor-pointer"
            >
              Create Zone
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
