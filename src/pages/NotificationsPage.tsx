import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Bell, Send, Clock, AlertTriangle, Plus, Search, Eye, Edit, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';

export const NotificationsPage: React.FC = () => {
  const { notifications } = useApp();
  const [activeTab, setActiveTab] = useState<'All Notifications' | 'Scheduled' | 'Sent' | 'Failed'>('All Notifications');
  const [notifTitle, setNotifTitle] = useState('');
  const [notifMessage, setNotifMessage] = useState('');
  const [userType, setUserType] = useState('Hotels');

  return (
    <div className="p-6 max-w-[1600px] mx-auto space-y-5">
      {/* Header Metric Cards (4 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
        <div className="bg-emerald-50/80 p-4 rounded-xl border border-emerald-100 flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
            <Send className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500">Total Notifications</p>
            <h3 className="text-2xl font-extrabold text-slate-900 leading-none mt-1">248</h3>
            <p className="text-[10px] text-emerald-700 font-semibold mt-1">↑ +12% this month</p>
          </div>
        </div>

        <div className="bg-sky-50/80 p-4 rounded-xl border border-sky-100 flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-sky-600 text-white flex items-center justify-center font-bold">
            <Send className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500">Sent</p>
            <h3 className="text-2xl font-extrabold text-slate-900 leading-none mt-1">202</h3>
            <p className="text-[10px] text-sky-700 font-semibold mt-1">82% delivery rate</p>
          </div>
        </div>

        <div className="bg-amber-50/80 p-4 rounded-xl border border-amber-100 flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500">Scheduled</p>
            <h3 className="text-2xl font-extrabold text-slate-900 leading-none mt-1">18</h3>
            <p className="text-[10px] text-amber-700 font-semibold mt-1">To be sent</p>
          </div>
        </div>

        <div className="bg-rose-50/80 p-4 rounded-xl border border-rose-100 flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-rose-500 text-white flex items-center justify-center font-bold">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500">Failed</p>
            <h3 className="text-2xl font-extrabold text-slate-900 leading-none mt-1">4</h3>
            <p className="text-[10px] text-rose-700 font-semibold mt-1">1.6% failure rate</p>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Table + Right Create Form & Recent Notifications */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: Notifications List Table (8 cols) */}
        <div className="lg:col-span-8 bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-4 border-b border-slate-200 text-xs font-bold text-slate-600">
            {(['All Notifications', 'Scheduled', 'Sent', 'Failed'] as const).map(t => (
              <button
                key={t}
                onClick={() => setActiveTab(t)}
                className={`pb-2.5 transition-all ${
                  activeTab === t ? 'text-emerald-700 border-b-2 border-emerald-700' : 'text-slate-500'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <div className="relative w-44">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input type="text" placeholder="Search notifications..." className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg" />
              </div>

              <select className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 font-medium text-slate-700">
                <option>All User Types</option>
              </select>

              <select className="bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 font-medium text-slate-700">
                <option>All Status</option>
              </select>

              <div className="border border-slate-200 bg-slate-50 rounded-lg px-3 py-1.5 text-slate-600 font-medium">
                📅 11 Sep 2026 - 11 Sep 2026
              </div>

              <button className="px-4 py-1.5 bg-emerald-700 text-white font-semibold rounded-lg">Search</button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <h4 className="font-bold text-sm text-slate-800">Notifications List (248)</h4>
            <button className="px-3 py-1.5 bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg flex items-center gap-1">
              📥 Export
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
                  <th className="py-2.5 px-2"><input type="checkbox" /></th>
                  <th className="py-2.5 px-2">#</th>
                  <th className="py-2.5 px-2">Title</th>
                  <th className="py-2.5 px-2">Message</th>
                  <th className="py-2.5 px-2">User Type</th>
                  <th className="py-2.5 px-2 text-center">Status</th>
                  <th className="py-2.5 px-2">Date & Time</th>
                  <th className="py-2.5 px-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {notifications.map(n => (
                  <tr key={n.id} className="hover:bg-slate-50">
                    <td className="py-2.5 px-2"><input type="checkbox" /></td>
                    <td className="py-2.5 px-2 text-slate-500">{n.id}</td>
                    <td className="py-2.5 px-2 font-bold text-slate-800">{n.title}</td>
                    <td className="py-2.5 px-2 text-slate-600 max-w-xs truncate">{n.message}</td>
                    <td className="py-2.5 px-2">
                      <span className="px-2 py-0.5 rounded bg-sky-100 text-sky-800 font-bold text-[10px]">{n.userType}</span>
                    </td>
                    <td className="py-2.5 px-2 text-center">
                      <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                        n.status === 'Sent' ? 'bg-emerald-100 text-emerald-800' :
                        n.status === 'Scheduled' ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'
                      }`}>
                        {n.status}
                      </span>
                    </td>
                    <td className="py-2.5 px-2 text-slate-500 text-[11px]">{n.dateTime}</td>
                    <td className="py-2.5 px-2 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <button className="p-1 text-slate-500 hover:text-blue-600"><Eye className="w-3.5 h-3.5" /></button>
                        <button className="p-1 text-slate-500 hover:text-emerald-700"><Edit className="w-3.5 h-3.5" /></button>
                        <button className="p-1 text-slate-500 hover:text-rose-600"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between pt-2 text-xs text-slate-500">
            <span>Showing 1 to 10 of 248 notifications</span>
            <div className="flex items-center gap-1">
              <button className="p-1 rounded border border-slate-200"><ChevronLeft className="w-3.5 h-3.5" /></button>
              <span className="px-2.5 py-1 bg-emerald-700 text-white rounded font-bold text-xs">1</span>
              <span className="px-2 py-1 rounded border text-xs">2</span>
              <span className="px-2 py-1 rounded border text-xs">3</span>
              <button className="p-1 rounded border border-slate-200"><ChevronRight className="w-3.5 h-3.5" /></button>
            </div>
          </div>
        </div>

        {/* Right Column: Create New Notification Form & Recent Feed (4 cols) */}
        <div className="lg:col-span-4 space-y-5">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
            <h3 className="font-bold text-sm text-slate-800 pb-2 border-b border-slate-100">Create New Notification</h3>
            <div className="space-y-2.5 text-xs">
              <div>
                <label className="block text-slate-600 font-semibold mb-0.5">Title *</label>
                <input
                  type="text"
                  placeholder="Enter notification title"
                  value={notifTitle}
                  onChange={e => setNotifTitle(e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg bg-slate-50"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-0.5">Message *</label>
                <textarea
                  rows={3}
                  placeholder="Enter your message here..."
                  value={notifMessage}
                  onChange={e => setNotifMessage(e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg bg-slate-50"
                />
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-0.5">User Type *</label>
                <select
                  value={userType}
                  onChange={e => setUserType(e.target.value)}
                  className="w-full px-3 py-1.5 border border-slate-200 rounded-lg bg-slate-50"
                >
                  <option value="Hotels">Hotels</option>
                  <option value="Drivers">Drivers</option>
                  <option value="Joiners">Joiners</option>
                  <option value="Admins">Admins</option>
                  <option value="All Users">All Users</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-600 font-semibold mb-0.5">Schedule (Optional)</label>
                <input type="datetime-local" className="w-full px-3 py-1.5 border border-slate-200 rounded-lg bg-slate-50" />
              </div>

              <button
                onClick={() => {
                  alert('Notification broadcasted successfully!');
                  setNotifTitle('');
                  setNotifMessage('');
                }}
                className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs flex items-center justify-center gap-1"
              >
                <Send className="w-4 h-4" /> Send Notification
              </button>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-slate-800">Recent Notifications</h3>
              <button className="text-xs text-blue-600 font-semibold">View All</button>
            </div>

            <div className="space-y-2 text-xs">
              {[
                { icon: '🚚', title: 'Order #FB1005 delivered', time: 'Driver • 5 mins ago' },
                { icon: '🛒', title: 'New order from Hotel Spice Villa', time: 'Hotel • 12 mins ago' },
                { icon: '💰', title: '₹300 commission credited', time: 'Joiner • 1 hour ago' },
                { icon: '⚠️', title: 'Tomato stock low (20 KG left)', time: 'Admin • 2 hours ago' },
                { icon: '🎁', title: 'Festival offer started', time: 'All Users • 3 hours ago' }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5 p-2 rounded-lg bg-slate-50">
                  <span className="text-lg">{item.icon}</span>
                  <div>
                    <p className="font-bold text-slate-800">{item.title}</p>
                    <p className="text-[10px] text-slate-400">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
