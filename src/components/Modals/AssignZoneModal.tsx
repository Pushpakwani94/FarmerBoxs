import React, { useState } from 'react';
import { X, MapPin, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface AssignZoneModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AssignZoneModal: React.FC<AssignZoneModalProps> = ({ isOpen, onClose }) => {
  const { drivers, zones, updateDriver } = useApp();

  const [selectedDriverId, setSelectedDriverId] = useState<number>(drivers[0]?.id || 1);
  const [selectedZone, setSelectedZone] = useState<string>('Kharadi');
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const currentDriver = drivers.find(d => d.id === selectedDriverId) || drivers[0];

  const handleAssign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentDriver) return;

    updateDriver(currentDriver.id, { zone: selectedZone });
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      onClose();
    }, 700);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center font-bold">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-800">Assign Delivery Zone</h3>
              <p className="text-xs text-slate-500">Reassign driver operational coverage</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {success ? (
          <div className="py-10 flex flex-col items-center justify-center text-center">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 animate-bounce" />
            <p className="mt-2 font-bold text-slate-800 text-sm">Zone Reassigned Successfully!</p>
            <p className="text-xs text-slate-500">{currentDriver?.name} assigned to {selectedZone}</p>
          </div>
        ) : (
          <form onSubmit={handleAssign} className="mt-4 space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Select Driver</label>
              <select
                value={selectedDriverId}
                onChange={e => setSelectedDriverId(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-semibold"
              >
                {drivers.map(d => (
                  <option key={d.id} value={d.id}>
                    {d.name} ({d.zone} • {d.vehicleNo})
                  </option>
                ))}
              </select>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex items-center gap-3">
              <img
                src={currentDriver?.avatar}
                alt={currentDriver?.name}
                className="w-10 h-10 rounded-full object-cover border border-slate-300"
              />
              <div>
                <p className="font-bold text-slate-800 text-xs">{currentDriver?.name}</p>
                <p className="text-[11px] text-slate-500">Current Zone: <span className="font-semibold text-slate-700">{currentDriver?.zone}</span></p>
                <p className="text-[10px] text-slate-400">Vehicle: {currentDriver?.vehicleNo}</p>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">New Target Zone</label>
              <select
                value={selectedZone}
                onChange={e => setSelectedZone(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-semibold"
              >
                {zones.map(z => (
                  <option key={z.id} value={z.name}>{z.name} (Pune)</option>
                ))}
              </select>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-lg font-semibold shadow-xs cursor-pointer"
              >
                Assign Zone
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
