import React, { useState } from 'react';
import {
  X,
  User,
  Mail,
  Phone,
  MapPin,
  Building2,
  Shield,
  Key,
  CheckCircle2,
  Save,
  Camera,
  LogOut,
  ExternalLink,
  Eye,
  EyeOff,
  Activity,
  Calendar,
  Lock
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AdminProfileModal: React.FC = () => {
  const {
    isAdminProfileOpen,
    setIsAdminProfileOpen,
    adminProfile,
    updateAdminProfile,
    setActiveTab
  } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'DETAILS' | 'SECURITY' | 'PERMISSIONS' | 'ACTIVITY'>('DETAILS');

  // Form State
  const [formData, setFormData] = useState({
    name: adminProfile.name,
    email: adminProfile.email,
    phone: adminProfile.phone,
    avatar: adminProfile.avatar,
    location: adminProfile.location,
    department: adminProfile.department,
    zone: adminProfile.zone
  });

  React.useEffect(() => {
    setFormData({
      name: adminProfile.name,
      email: adminProfile.email,
      phone: adminProfile.phone,
      avatar: adminProfile.avatar,
      location: adminProfile.location,
      department: adminProfile.department,
      zone: adminProfile.zone
    });
  }, [adminProfile, isAdminProfileOpen]);

  // Password State
  const [passwords, setPasswords] = useState({
    current: '',
    newPass: '',
    confirmPass: ''
  });
  const [showPassword, setShowPassword] = useState(false);

  // Status message
  const [successMsg, setSuccessMsg] = useState('');

  if (!isAdminProfileOpen) return null;

  const avatarOptions = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300',
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300'
  ];

  const handleSaveDetails = (e: React.FormEvent) => {
    e.preventDefault();
    updateAdminProfile(formData);
    setSuccessMsg('Profile details updated successfully!');
    setTimeout(() => setSuccessMsg(''), 2500);
  };

  const handleSavePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwords.current || !passwords.newPass || !passwords.confirmPass) {
      alert('Please fill out all password fields');
      return;
    }
    if (passwords.newPass !== passwords.confirmPass) {
      alert('New passwords do not match');
      return;
    }
    if (passwords.newPass.length < 6) {
      alert('Password must be at least 6 characters');
      return;
    }

    setSuccessMsg('Password changed successfully!');
    setPasswords({ current: '', newPass: '', confirmPass: '' });
    setTimeout(() => setSuccessMsg(''), 2500);
  };

  const handleGoToFullProfile = () => {
    setIsAdminProfileOpen(false);
    setActiveTab('Profile');
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] border border-slate-200">
        {/* Modal Top Header Banner */}
        <div className="bg-gradient-to-r from-[#15803d] via-[#16a34a] to-emerald-700 px-6 py-5 text-white relative">
          <button
            onClick={() => setIsAdminProfileOpen(false)}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/20 hover:bg-black/30 flex items-center justify-center text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-4">
            <div className="relative group">
              <img
                src={formData.avatar}
                alt={formData.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-white/90 shadow-md"
              />
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center">
                <span className="w-2 h-2 bg-white rounded-full"></span>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black tracking-tight">{adminProfile.name}</h2>
                <span className="bg-white/20 text-emerald-100 text-[11px] font-extrabold px-2.5 py-0.5 rounded-full backdrop-blur-xs">
                  {adminProfile.role}
                </span>
              </div>
              <p className="text-xs text-emerald-100/90 font-medium mt-0.5">
                {adminProfile.email} • {adminProfile.department}
              </p>
              <div className="flex items-center gap-3 mt-1.5 text-[11px] text-white/80">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> {adminProfile.location}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> Member since {adminProfile.joinedDate}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Sub-Navigation Tabs */}
        <div className="flex items-center border-b border-slate-200 bg-slate-50 px-6 text-xs font-bold">
          <button
            onClick={() => setActiveSubTab('DETAILS')}
            className={`py-3 px-3 border-b-2 transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeSubTab === 'DETAILS'
                ? 'border-[#15803d] text-[#15803d]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <User className="w-3.5 h-3.5" /> Personal Info
          </button>
          <button
            onClick={() => setActiveSubTab('SECURITY')}
            className={`py-3 px-3 border-b-2 transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeSubTab === 'SECURITY'
                ? 'border-[#15803d] text-[#15803d]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Lock className="w-3.5 h-3.5" /> Security & Password
          </button>
          <button
            onClick={() => setActiveSubTab('PERMISSIONS')}
            className={`py-3 px-3 border-b-2 transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeSubTab === 'PERMISSIONS'
                ? 'border-[#15803d] text-[#15803d]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Shield className="w-3.5 h-3.5" /> Role Privileges
          </button>
          <button
            onClick={() => setActiveSubTab('ACTIVITY')}
            className={`py-3 px-3 border-b-2 transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeSubTab === 'ACTIVITY'
                ? 'border-[#15803d] text-[#15803d]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Activity className="w-3.5 h-3.5" /> Activity Log
          </button>
        </div>

        {/* Notification Banner */}
        {successMsg && (
          <div className="mx-6 mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-bold text-emerald-800 flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Scrollable Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4 text-xs">
          {/* 1. PERSONAL INFO TAB */}
          {activeSubTab === 'DETAILS' && (
            <form onSubmit={handleSaveDetails} className="space-y-4">
              {/* Avatar Selector */}
              <div>
                <label className="block text-slate-700 font-bold mb-1.5">Change Avatar Photo</label>
                <div className="flex items-center gap-3">
                  {avatarOptions.map((av, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setFormData({ ...formData, avatar: av })}
                      className={`w-10 h-10 rounded-full overflow-hidden border-2 transition-transform cursor-pointer ${
                        formData.avatar === av
                          ? 'border-[#15803d] ring-2 ring-emerald-300 scale-105'
                          : 'border-slate-200 hover:border-slate-400'
                      }`}
                    >
                      <img src={av} alt="Avatar option" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Full Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:outline-[#15803d]"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Email Address *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:outline-[#15803d]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    required
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:outline-[#15803d]"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Department</label>
                  <input
                    type="text"
                    value={formData.department}
                    onChange={e => setFormData({ ...formData, department: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:outline-[#15803d]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Office Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={e => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:outline-[#15803d]"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Assigned Operational Zone</label>
                  <input
                    type="text"
                    value={formData.zone}
                    onChange={e => setFormData({ ...formData, zone: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:outline-[#15803d]"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleGoToFullProfile}
                  className="text-emerald-700 hover:text-emerald-800 font-bold flex items-center gap-1 cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> View Full Profile Page
                </button>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAdminProfileOpen(false)}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#15803d] hover:bg-[#166534] text-white font-bold rounded-xl flex items-center gap-1.5 shadow-xs cursor-pointer"
                  >
                    <Save className="w-3.5 h-3.5" /> Save Changes
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* 2. SECURITY & PASSWORD TAB */}
          {activeSubTab === 'SECURITY' && (
            <form onSubmit={handleSavePassword} className="space-y-4">
              <div className="p-3.5 bg-amber-50/70 border border-amber-200 rounded-xl text-amber-900 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-xs">
                  <Shield className="w-4 h-4 text-amber-600" /> Account Security
                </div>
                <p className="text-[11px] text-amber-700">
                  Ensure your password has at least 6 characters with a combination of uppercase letters, numbers, and symbols.
                </p>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Current Password *</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={passwords.current}
                      onChange={e => setPasswords({ ...passwords, current: e.target.value })}
                      required
                      placeholder="Enter current password"
                      className="w-full px-3 py-2 pr-10 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:outline-[#15803d]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">New Password *</label>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={passwords.newPass}
                      onChange={e => setPasswords({ ...passwords, newPass: e.target.value })}
                      required
                      placeholder="At least 6 chars"
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:outline-[#15803d]"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Confirm New Password *</label>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={passwords.confirmPass}
                      onChange={e => setPasswords({ ...passwords, confirmPass: e.target.value })}
                      required
                      placeholder="Repeat new password"
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:outline-[#15803d]"
                    />
                  </div>
                </div>
              </div>

              {/* Two-Factor Authentication Status */}
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-800">Two-Factor Authentication (2FA)</h4>
                  <p className="text-[11px] text-slate-500 font-medium">Extra security layer for super admin logins</p>
                </div>
                <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 font-bold rounded-lg text-[10px]">
                  ✓ Enabled via SMS
                </span>
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAdminProfileOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#15803d] hover:bg-[#166534] text-white font-bold rounded-xl flex items-center gap-1.5 shadow-xs cursor-pointer"
                >
                  <Key className="w-3.5 h-3.5" /> Update Password
                </button>
              </div>
            </form>
          )}

          {/* 3. ROLE PERMISSIONS TAB */}
          {activeSubTab === 'PERMISSIONS' && (
            <div className="space-y-3">
              <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-xl text-blue-900">
                <h4 className="font-bold text-xs flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-blue-600" /> Super Admin Access Scope
                </h4>
                <p className="text-[11px] text-blue-700 mt-1">
                  You possess highest-level administrative privileges with read, write, update, and deletion rights across all systems.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {[
                  { title: 'Hotels & Onboarding', desc: 'Create, edit, verify and approve hotel accounts', active: true },
                  { title: 'Joiners & Commissions', desc: 'Manage commission rates, payouts, and joiner verification', active: true },
                  { title: 'Orders & Dispatch', desc: 'Full access to create, assign, override, and cancel orders', active: true },
                  { title: 'Product & Pricing', desc: 'Manage mandi stock, daily wholesale prices, categories', active: true },
                  { title: 'Delivery Fleet', desc: 'Driver allocation, live route monitoring, proof of delivery', active: true },
                  { title: 'Financial Settlements', desc: 'Weekly payout batching, ledger logs, dispute resolution', active: true },
                  { title: 'System Configurations', desc: 'Manage platform branding, zones, user roles, backups', active: true },
                  { title: 'Data Export & Reports', desc: 'Export full database records, GST invoices, CSV sheets', active: true }
                ].map((perm, idx) => (
                  <div key={idx} className="p-3 bg-white border border-slate-200 rounded-xl flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#15803d] shrink-0 mt-0.5" />
                    <div>
                      <h5 className="font-bold text-slate-900 text-xs">{perm.title}</h5>
                      <p className="text-[10.5px] text-slate-500 font-medium leading-tight mt-0.5">{perm.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. ACTIVITY LOG TAB */}
          {activeSubTab === 'ACTIVITY' && (
            <div className="space-y-2.5">
              {[
                { action: 'Updated onion wholesale price to ₹32/kg', time: '10 mins ago', category: 'Inventory', badge: 'bg-emerald-100 text-emerald-800' },
                { action: 'Approved weekly commission payout of ₹45,200', time: '1 hour ago', category: 'Finance', badge: 'bg-blue-100 text-blue-800' },
                { action: 'Verified new hotel: Hotel Taj Vivanta (Kharadi)', time: '3 hours ago', category: 'Hotels', badge: 'bg-purple-100 text-purple-800' },
                { action: 'Assigned 8 delivery orders to Driver Nilesh Shinde', time: '5 hours ago', category: 'Dispatch', badge: 'bg-amber-100 text-amber-800' },
                { action: 'Created new operational zone: Undri Zone', time: 'Yesterday at 04:20 PM', category: 'Zones', badge: 'bg-teal-100 text-teal-800' },
                { action: 'Exported monthly sales GST report (PDF/Excel)', time: 'Yesterday at 11:30 AM', category: 'Reports', badge: 'bg-slate-100 text-slate-800' }
              ].map((log, idx) => (
                <div key={idx} className="p-3 bg-slate-50/80 hover:bg-slate-100 border border-slate-200 rounded-xl flex items-center justify-between transition-colors">
                  <div className="space-y-0.5">
                    <p className="font-bold text-slate-800 text-xs">{log.action}</p>
                    <p className="text-[10px] text-slate-400 font-medium">{log.time}</p>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${log.badge}`}>
                    {log.category}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Bottom Footer */}
        <div className="bg-slate-50 border-t border-slate-200 px-6 py-3 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-slate-500 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Session: Active (ID: FB-ADMIN-8921)</span>
          </div>

          <button
            onClick={() => {
              setIsAdminProfileOpen(false);
              alert('Admin signed out successfully');
            }}
            className="text-rose-600 hover:text-rose-800 font-bold flex items-center gap-1 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" /> Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};
