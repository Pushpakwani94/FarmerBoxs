import React, { useState } from 'react';
import { Settings, Users, Shield, CheckCircle2, Save, Plus, Edit, Trash2, Database, Lock, Key, User, ExternalLink } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const SettingsPage: React.FC = () => {
  const { adminProfile, setIsAdminProfileOpen, setActiveTab: setMainTab } = useApp();
  const [activeTab, setActiveTab] = useState('General Settings');

  return (
    <div className="p-6 max-w-[1600px] mx-auto space-y-5">
      {/* Header Metric Cards (4 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
        <div className="bg-emerald-50/80 p-4 rounded-xl border border-emerald-100 flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
            <Settings className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500">Total Users</p>
            <h3 className="text-2xl font-extrabold text-slate-900 leading-none mt-1">56</h3>
            <p className="text-[10px] text-emerald-700 font-semibold mt-1">Active users</p>
          </div>
        </div>

        <div className="bg-sky-50/80 p-4 rounded-xl border border-sky-100 flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-sky-600 text-white flex items-center justify-center font-bold">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500">Admin Users</p>
            <h3 className="text-2xl font-extrabold text-slate-900 leading-none mt-1">6</h3>
            <p className="text-[10px] text-sky-700 font-semibold mt-1">With full access</p>
          </div>
        </div>

        <div className="bg-amber-50/80 p-4 rounded-xl border border-amber-100 flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500">Roles</p>
            <h3 className="text-2xl font-extrabold text-slate-900 leading-none mt-1">5</h3>
            <p className="text-[10px] text-amber-700 font-semibold mt-1">User roles</p>
          </div>
        </div>

        <div className="bg-emerald-50/80 p-4 rounded-xl border border-emerald-100 flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500">System Status</p>
            <h3 className="text-2xl font-extrabold text-slate-900 leading-none mt-1">Healthy</h3>
            <p className="text-[10px] text-emerald-700 font-semibold mt-1">All systems running</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 text-xs font-bold text-slate-600 bg-white px-5 py-3 rounded-xl border">
        <div className="flex items-center gap-6 overflow-x-auto">
          {(['General Settings', 'User Management', 'Role & Permissions', 'Zone Management', 'App Settings', 'Integrations', 'Backup & Security'] as const).map(t => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`pb-1 transition-all whitespace-nowrap ${
                activeTab === t ? 'text-emerald-700 border-b-2 border-emerald-700 font-extrabold' : 'text-slate-500'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <button
          onClick={() => setIsAdminProfileOpen(true)}
          className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-[#15803d] border border-emerald-200 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer text-xs font-bold"
        >
          <img src={adminProfile.avatar} alt="Admin" className="w-4 h-4 rounded-full object-cover" />
          <span>My Profile ({adminProfile.name})</span>
        </button>
      </div>

      {/* Main Settings Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Row 1: General Settings (4 cols), Logo & Branding (4 cols), System Preferences (4 cols) */}
        <div className="lg:col-span-4 bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="font-bold text-sm text-slate-800">General Settings</h3>
            <button className="px-3 py-1 bg-emerald-700 text-white text-xs font-semibold rounded-lg flex items-center gap-1">
              <Save className="w-3.5 h-3.5" /> Save Changes
            </button>
          </div>

          <div className="space-y-2.5 text-xs">
            <div>
              <label className="block text-slate-600 font-semibold mb-0.5">Platform Name *</label>
              <input type="text" defaultValue="FarmerBox" className="w-full px-3 py-1.5 border border-slate-200 rounded-lg bg-slate-50" />
            </div>
            <div>
              <label className="block text-slate-600 font-semibold mb-0.5">Tagline</label>
              <input type="text" defaultValue="Fresh from Farmers to Hotels" className="w-full px-3 py-1.5 border border-slate-200 rounded-lg bg-slate-50" />
            </div>
            <div>
              <label className="block text-slate-600 font-semibold mb-0.5">Admin Email</label>
              <input type="email" defaultValue="admin@farmerbox.com" className="w-full px-3 py-1.5 border border-slate-200 rounded-lg bg-slate-50" />
            </div>
            <div>
              <label className="block text-slate-600 font-semibold mb-0.5">Support Phone</label>
              <input type="text" defaultValue="+91 98765 43210" className="w-full px-3 py-1.5 border border-slate-200 rounded-lg bg-slate-50" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-slate-600 font-semibold mb-0.5">Time Zone</label>
                <select className="w-full px-2 py-1.5 border border-slate-200 rounded-lg bg-slate-50 text-[11px]"><option>(GMT+05:30) Asia/Kolkata</option></select>
              </div>
              <div>
                <label className="block text-slate-600 font-semibold mb-0.5">Language</label>
                <select className="w-full px-2 py-1.5 border border-slate-200 rounded-lg bg-slate-50 text-[11px]"><option>English</option></select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-slate-600 font-semibold mb-0.5">Currency</label>
                <select className="w-full px-2 py-1.5 border border-slate-200 rounded-lg bg-slate-50 text-[11px]"><option>INR (₹)</option></select>
              </div>
              <div>
                <label className="block text-slate-600 font-semibold mb-0.5">Date Format</label>
                <select className="w-full px-2 py-1.5 border border-slate-200 rounded-lg bg-slate-50 text-[11px]"><option>DD MMM YYYY (11 Sep 2026)</option></select>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
          <h3 className="font-bold text-sm text-slate-800 pb-2 border-b border-slate-100">Platform Logo & Branding</h3>
          <div className="p-4 bg-slate-50 rounded-xl border border-dashed border-slate-300 text-center space-y-2">
            <div className="w-12 h-12 mx-auto rounded-xl bg-emerald-700 text-white flex items-center justify-center font-bold text-xl">🥦</div>
            <h4 className="font-extrabold text-emerald-800 text-lg">FarmerBox</h4>
            <p className="text-xs text-slate-500 font-medium">Fresh from Farmers to Hotels</p>
            <button className="px-4 py-1.5 bg-white border border-slate-300 text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-50">
              ✏️ Change Logo
            </button>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-600 font-semibold">Primary Color</span>
              <span className="font-mono text-emerald-700 font-bold">#16a34a 🟢</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600 font-semibold">Secondary Color</span>
              <span className="font-mono text-emerald-500 font-bold">#22c55e 🟢</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600 font-semibold">Accent Color</span>
              <span className="font-mono text-amber-500 font-bold">#f59e0b 🟡</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-600 font-semibold">Text Color</span>
              <span className="font-mono text-slate-800 font-bold">#1f2937 ⚫</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
          <h3 className="font-bold text-sm text-slate-800 pb-2 border-b border-slate-100">System Preferences</h3>
          <div className="space-y-2.5 text-xs">
            {[
              { label: 'Allow New Hotel Registration', enabled: true },
              { label: 'Allow New Joiner Registration', enabled: true },
              { label: 'Enable Order Notifications', enabled: true },
              { label: 'Auto Assign Orders to Drivers', enabled: true },
              { label: 'Require Order Approval (Admin)', enabled: false },
              { label: 'Enable Wallet System', enabled: true },
              { label: 'Send Email Notifications', enabled: true },
              { label: 'Send WhatsApp Notifications', enabled: true },
              { label: 'Maintenance Mode', enabled: false }
            ].map((pref, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <span className="text-slate-700 font-medium">{pref.label}</span>
                <span className={`w-9 h-5 rounded-full flex items-center px-0.5 cursor-pointer ${
                  pref.enabled ? 'bg-emerald-600 justify-end' : 'bg-slate-300 justify-start'
                }`}>
                  <span className="w-4 h-4 bg-white rounded-full shadow-xs"></span>
                </span>
              </div>
            ))}
          </div>

          <button className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs mt-2">
            Save Preferences
          </button>
        </div>

        {/* Row 2: User Management (5 cols), Role & Permissions (4 cols), Security & Backup (3 cols) */}
        <div className="lg:col-span-5 bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="font-bold text-sm text-slate-800">User Management</h3>
            <button className="px-3 py-1 bg-emerald-700 text-white text-xs font-semibold rounded-lg flex items-center gap-1">
              <Plus className="w-3.5 h-3.5" /> Add User
            </button>
          </div>

          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
                <th className="py-1.5 px-2">#</th>
                <th className="py-1.5 px-2">Name</th>
                <th className="py-1.5 px-2">Email</th>
                <th className="py-1.5 px-2">Role</th>
                <th className="py-1.5 px-2 text-center">Status</th>
                <th className="py-1.5 px-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { id: 1, name: 'Pushpak Wani', email: 'admin@farmerbox.com', role: 'Super Admin', status: 'Active' },
                { id: 2, name: 'Sneha Patil', email: 'sneha@farmerbox.com', role: 'Admin', status: 'Active' },
                { id: 3, name: 'Amit Shinde', email: 'amit@farmerbox.com', role: 'Operations', status: 'Active' },
                { id: 4, name: 'Priya Deshmukh', email: 'priya@farmerbox.com', role: 'Finance', status: 'Active' },
                { id: 5, name: 'Rohan More', email: 'rohan@farmerbox.com', role: 'Support', status: 'Inactive' }
              ].map(u => (
                <tr key={u.id} className="hover:bg-slate-50">
                  <td className="py-2 px-2 text-slate-500">{u.id}</td>
                  <td className="py-2 px-2 font-bold text-slate-800">{u.name}</td>
                  <td className="py-2 px-2 text-slate-600">{u.email}</td>
                  <td className="py-2 px-2 text-slate-700 font-medium">{u.role}</td>
                  <td className="py-2 px-2 text-center">
                    <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                      u.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                    }`}>{u.status}</span>
                  </td>
                  <td className="py-2 px-2 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <button className="p-1 text-slate-500 hover:text-emerald-700"><Edit className="w-3.5 h-3.5" /></button>
                      <button className="p-1 text-slate-500 hover:text-rose-600"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="lg:col-span-4 bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <h3 className="font-bold text-sm text-slate-800">Role & Permissions</h3>
            <button className="px-3 py-1 bg-emerald-700 text-white text-xs font-semibold rounded-lg flex items-center gap-1">
              <Plus className="w-3.5 h-3.5" /> Add Role
            </button>
          </div>

          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
                <th className="py-1.5 px-2">#</th>
                <th className="py-1.5 px-2">Role Name</th>
                <th className="py-1.5 px-2">Description</th>
                <th className="py-1.5 px-2 text-center">Users</th>
                <th className="py-1.5 px-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { id: 1, role: 'Super Admin', desc: 'Full system access', users: 3 },
                { id: 2, role: 'Admin', desc: 'Manage all modules', users: 5 },
                { id: 3, role: 'Operations', desc: 'Manage orders & delivery', users: 8 },
                { id: 4, role: 'Finance', desc: 'Handle payments & reports', users: 4 },
                { id: 5, role: 'Support', desc: 'Customer support access', users: 6 }
              ].map(r => (
                <tr key={r.id} className="hover:bg-slate-50">
                  <td className="py-2 px-2 text-slate-500">{r.id}</td>
                  <td className="py-2 px-2 font-bold text-slate-800">{r.role}</td>
                  <td className="py-2 px-2 text-slate-600">{r.desc}</td>
                  <td className="py-2 px-2 text-center font-bold text-slate-800">{r.users}</td>
                  <td className="py-2 px-2 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <button className="p-1 text-slate-500 hover:text-emerald-700"><Edit className="w-3.5 h-3.5" /></button>
                      <button className="p-1 text-slate-500 hover:text-rose-600"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="lg:col-span-3 bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
          <h3 className="font-bold text-sm text-slate-800 pb-2 border-b border-slate-100">Security & Backup</h3>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between bg-slate-50 p-2 rounded-lg">
              <span className="text-slate-600 font-semibold">Last Backup</span>
              <span className="font-bold text-emerald-800">11 Sep 2026, 02:30 AM</span>
            </div>
            <div className="flex items-center justify-between bg-slate-50 p-2 rounded-lg">
              <span className="text-slate-600 font-semibold">Auto Backup</span>
              <span className="font-bold text-slate-800">Daily at 02:00 AM</span>
            </div>
            <div className="flex items-center justify-between bg-slate-50 p-2 rounded-lg">
              <span className="text-slate-600 font-semibold">Database Size</span>
              <span className="font-bold text-slate-800">1.2 GB</span>
            </div>
            <div className="flex items-center justify-between bg-slate-50 p-2 rounded-lg">
              <span className="text-slate-600 font-semibold">Login Attempts</span>
              <span className="font-bold text-emerald-700">0 failed attempts</span>
            </div>
          </div>

          <button className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs flex items-center justify-center gap-1">
            ☁️ Backup Now
          </button>
        </div>
      </div>
    </div>
  );
};
