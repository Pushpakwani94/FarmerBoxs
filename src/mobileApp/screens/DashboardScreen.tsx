import React from 'react';
import {
  Bell,
  Sprout,
  Building2,
  ShoppingCart,
  ClipboardList,
  ShoppingBag,
  CircleDollarSign,
  BarChart2,
  ArrowRight,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { useJoinerApp } from '../JoinerAppContext';
import { MobileBottomNav } from '../components/MobileBottomNav';

export const DashboardScreen: React.FC = () => {
  const { userProfile, commissionBalance, hotels, orders, setCurrentScreen } = useJoinerApp();

  const activeHotelsCount = hotels.filter(h => h.status === 'Active').length;
  const pendingHotelsCount = hotels.filter(h => h.status === 'Pending').length;

  return (
    <div className="flex flex-col h-full bg-slate-50 justify-between select-none">
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
        {/* Top Header: Profile + Notification */}
        <div className="flex items-center justify-between">
          <div
            onClick={() => setCurrentScreen('PROFILE')}
            className="flex items-center gap-2.5 cursor-pointer hover:opacity-90 transition-opacity"
            title="Open My Profile"
          >
            <div className="relative">
              <img
                src={userProfile.avatar}
                alt={userProfile.name}
                className="w-10 h-10 rounded-full object-cover border border-emerald-600 shadow-2xs"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full"></span>
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-sm leading-tight">
                {userProfile.name}
              </h3>
              <p className="text-[10.5px] text-slate-500 font-medium">
                {userProfile.role} • {userProfile.zone}
              </p>
            </div>
          </div>

          <button
            onClick={() => setCurrentScreen('NOTIFICATIONS')}
            className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center relative text-slate-600 hover:text-emerald-700 transition-colors cursor-pointer shadow-2xs"
          >
            <Bell className="w-4 h-4" />
            <span className="w-2 h-2 rounded-full bg-rose-500 absolute top-2 right-2 ring-2 ring-white"></span>
          </button>
        </div>

        {/* Fresh Account Welcome Card if 0 Hotels */}
        {hotels.length === 0 && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3.5 flex items-center justify-between shadow-2xs">
            <div className="space-y-1 max-w-[210px]">
              <div className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                <Sprout className="w-3 h-3 text-emerald-700" /> Fresh Account
              </div>
              <h4 className="text-xs font-black text-slate-900 leading-snug">
                Welcome, {userProfile.name}!
              </h4>
              <p className="text-[10.5px] text-slate-600 font-medium leading-relaxed">
                Add your first hotel partner to start placing vegetable orders & earning commission.
              </p>
            </div>
            <button
              onClick={() => setCurrentScreen('ADD_HOTEL')}
              className="px-3 py-1.5 bg-[#15803d] hover:bg-[#166534] text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer whitespace-nowrap"
            >
              + Add Hotel
            </button>
          </div>
        )}

        {/* Commission Hero Card (Green Gradient) */}
        <div
          onClick={() => setCurrentScreen('COMMISSION')}
          className="bg-gradient-to-r from-[#15803d] to-[#16a34a] rounded-2xl p-4 text-white shadow-xs cursor-pointer relative overflow-hidden"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-white backdrop-blur-xs">
                <Sprout className="w-6 h-6 fill-white" />
              </div>
              <div>
                <p className="text-[11px] text-emerald-100 font-medium">Total Commission</p>
                <h2 className="text-2xl font-black tracking-tight leading-none mt-0.5">
                  ₹{commissionBalance.thisMonth.toLocaleString('en-IN')}
                </h2>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] bg-emerald-800/80 px-2 py-0.5 rounded-full font-bold inline-flex items-center gap-1">
                ↑ {commissionBalance.growth}%
              </span>
              <p className="text-[9.5px] text-emerald-100 font-medium mt-1">This Month</p>
            </div>
          </div>
        </div>

        {/* 4 Stats Grid (2x2) with Rich Vibrant Colored Backgrounds */}
        <div className="grid grid-cols-2 gap-2.5">
          {/* Hotels Card - Rich Royal Blue Gradient */}
          <div
            onClick={() => setCurrentScreen('MY_HOTELS')}
            className="bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-700 p-3.5 rounded-2xl text-white shadow-sm cursor-pointer hover:shadow-md hover:scale-[1.02] transition-all group"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 rounded-xl bg-white/20 backdrop-blur-xs text-white flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
                <Building2 className="w-4 h-4" />
              </div>
              <span className="text-[9.5px] font-black text-white bg-white/20 backdrop-blur-xs px-2 py-0.5 rounded-full tracking-wider">
                HOTELS
              </span>
            </div>
            <h4 className="text-2xl font-black text-white leading-none tracking-tight">
              {hotels.length}
            </h4>
            <p className="text-[11px] font-bold text-blue-100 mt-1.5">Total Hotels</p>
          </div>

          {/* Orders Card - Rich Violet / Purple Gradient */}
          <div
            onClick={() => setCurrentScreen('MY_ORDERS')}
            className="bg-gradient-to-br from-purple-600 via-violet-600 to-indigo-700 p-3.5 rounded-2xl text-white shadow-sm cursor-pointer hover:shadow-md hover:scale-[1.02] transition-all group"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 rounded-xl bg-white/20 backdrop-blur-xs text-white flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
                <ClipboardList className="w-4 h-4" />
              </div>
              <span className="text-[9.5px] font-black text-white bg-white/20 backdrop-blur-xs px-2 py-0.5 rounded-full tracking-wider">
                ORDERS
              </span>
            </div>
            <h4 className="text-2xl font-black text-white leading-none tracking-tight">
              {orders.length}
            </h4>
            <p className="text-[11px] font-bold text-purple-100 mt-1.5">Total Orders</p>
          </div>

          {/* Active Hotels Card - Rich Emerald Green Gradient */}
          <div
            onClick={() => setCurrentScreen('MY_HOTELS')}
            className="bg-gradient-to-br from-emerald-600 via-green-600 to-teal-700 p-3.5 rounded-2xl text-white shadow-sm cursor-pointer hover:shadow-md hover:scale-[1.02] transition-all group"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 rounded-xl bg-white/20 backdrop-blur-xs text-white flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <span className="text-[9.5px] font-black text-white bg-white/20 backdrop-blur-xs px-2 py-0.5 rounded-full tracking-wider">
                ACTIVE
              </span>
            </div>
            <h4 className="text-2xl font-black text-white leading-none tracking-tight">
              {activeHotelsCount}
            </h4>
            <p className="text-[11px] font-bold text-emerald-100 mt-1.5">Active Hotels</p>
          </div>

          {/* Pending Approval Card - Rich Amber / Orange Gradient */}
          <div
            onClick={() => setCurrentScreen('MY_HOTELS')}
            className="bg-gradient-to-br from-amber-500 via-orange-500 to-rose-600 p-3.5 rounded-2xl text-white shadow-sm cursor-pointer hover:shadow-md hover:scale-[1.02] transition-all group"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 rounded-xl bg-white/20 backdrop-blur-xs text-white flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
                <Clock className="w-4 h-4" />
              </div>
              <span className="text-[9.5px] font-black text-white bg-white/20 backdrop-blur-xs px-2 py-0.5 rounded-full tracking-wider">
                PENDING
              </span>
            </div>
            <h4 className="text-2xl font-black text-white leading-none tracking-tight">
              {pendingHotelsCount}
            </h4>
            <p className="text-[11px] font-bold text-amber-100 mt-1.5">Pending Approval</p>
          </div>
        </div>

        {/* 6 Quick Action Grid (2x3) */}
        <div className="grid grid-cols-3 gap-2.5">
          <button
            onClick={() => setCurrentScreen('MY_HOTELS')}
            className="bg-white p-3 rounded-xl border border-slate-200/80 flex flex-col items-center justify-center gap-1.5 hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Building2 className="w-4 h-4" />
            </div>
            <span className="text-[10.5px] font-bold text-slate-700">My Hotels</span>
          </button>

          <button
            onClick={() => setCurrentScreen('PLACE_ORDER')}
            className="bg-white p-3 rounded-xl border border-slate-200/80 flex flex-col items-center justify-center gap-1.5 hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <ShoppingCart className="w-4 h-4" />
            </div>
            <span className="text-[10.5px] font-bold text-slate-700">Place Order</span>
          </button>

          <button
            onClick={() => setCurrentScreen('MY_ORDERS')}
            className="bg-white p-3 rounded-xl border border-slate-200/80 flex flex-col items-center justify-center gap-1.5 hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center">
              <ClipboardList className="w-4 h-4" />
            </div>
            <span className="text-[10.5px] font-bold text-slate-700">Orders</span>
          </button>

          <button
            onClick={() => setCurrentScreen('PLACE_ORDER')}
            className="bg-white p-3 rounded-xl border border-slate-200/80 flex flex-col items-center justify-center gap-1.5 hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <span className="text-[10.5px] font-bold text-slate-700">Products</span>
          </button>

          <button
            onClick={() => setCurrentScreen('COMMISSION')}
            className="bg-white p-3 rounded-xl border border-slate-200/80 flex flex-col items-center justify-center gap-1.5 hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <CircleDollarSign className="w-4 h-4" />
            </div>
            <span className="text-[10.5px] font-bold text-slate-700">Commission</span>
          </button>

          <button
            onClick={() => setCurrentScreen('COMMISSION')}
            className="bg-white p-3 rounded-xl border border-slate-200/80 flex flex-col items-center justify-center gap-1.5 hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <BarChart2 className="w-4 h-4" />
            </div>
            <span className="text-[10.5px] font-bold text-slate-700">Reports</span>
          </button>
        </div>

        {/* Promo Banner: Add More Hotels */}
        <div
          onClick={() => setCurrentScreen('ADD_HOTEL')}
          className="relative bg-gradient-to-r from-emerald-50 via-emerald-50/90 to-teal-50 border border-emerald-200/90 rounded-2xl p-3.5 flex items-center justify-between cursor-pointer overflow-hidden shadow-2xs group hover:shadow-xs transition-all min-h-[76px]"
        >
          {/* Background Vegetable Image with Gradient Fade */}
          <div className="absolute right-0 top-0 bottom-0 w-44 pointer-events-none overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400&auto=format&fit=crop&q=80"
              alt="Fresh Organic Vegetables"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-50 via-emerald-50/60 to-transparent"></div>
          </div>

          <div className="space-y-0.5 z-10 relative">
            <h4 className="text-xs font-black text-slate-900 leading-tight">
              Add More Hotels<br />Earn More Commission
            </h4>
            <p className="text-[10px] text-emerald-800 font-bold">Together We Grow</p>
          </div>

          <div className="w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center text-[#15803d] z-10 group-hover:scale-110 group-hover:bg-[#15803d] group-hover:text-white transition-all flex-shrink-0 border border-emerald-200">
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <MobileBottomNav />
    </div>
  );
};
