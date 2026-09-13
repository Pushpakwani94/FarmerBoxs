import React, { useState } from 'react';
import {
  ArrowLeft,
  Phone,
  Mail,
  Building2,
  Lock,
  HelpCircle,
  LogOut,
  ChevronRight,
  Edit2,
  X,
  CheckCircle2,
  Eye,
  EyeOff,
  CreditCard,
  MessageSquare,
  Headphones,
  FileQuestion
} from 'lucide-react';
import { useJoinerApp } from '../JoinerAppContext';
import { MobileBottomNav } from '../components/MobileBottomNav';

export const ProfileScreen: React.FC = () => {
  const { userProfile, hotels, orders, setCurrentScreen, updateUserProfile } = useJoinerApp();

  // Modals state
  const [activeModal, setActiveModal] = useState<'NONE' | 'EDIT_PROFILE' | 'BANK_DETAILS' | 'CHANGE_PASSWORD' | 'HELP_SUPPORT' | 'LOGOUT_CONFIRM'>('NONE');

  // Edit Profile Form State
  const [editName, setEditName] = useState(userProfile.name);
  const [editPhone, setEditPhone] = useState(userProfile.phone);
  const [editEmail, setEditEmail] = useState(userProfile.email);
  const [editZone, setEditZone] = useState(userProfile.zone.replace(' Zone', ''));
  const [editAvatar, setEditAvatar] = useState(userProfile.avatar);

  const avatarPresets = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'
  ];

  // Bank Details Form State
  const [bankDetails, setBankDetails] = useState({
    accountHolder: userProfile.name,
    bankName: 'HDFC Bank Ltd',
    accountNumber: '50100458921134',
    ifscCode: 'HDFC0001234',
    branch: 'Kharadi Pune Branch'
  });

  // Change Password Form State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Success Notification banner inside modal
  const [successMessage, setSuccessMessage] = useState('');

  const zonesList = [
    'Kharadi',
    'Viman Nagar',
    'Hinjawadi',
    'Magarpatta',
    'Hadapsar',
    'Baner',
    'Wakad',
    'Aundh',
    'Shivajinagar',
    'Undri',
    'Kothrud'
  ];

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editName || !editPhone || !editEmail) {
      alert('Please fill all fields');
      return;
    }
    updateUserProfile({
      name: editName,
      phone: editPhone,
      email: editEmail,
      zone: `${editZone} Zone`,
      avatar: editAvatar
    });
    setSuccessMessage('Profile updated successfully!');
    setTimeout(() => {
      setSuccessMessage('');
      setActiveModal('NONE');
    }, 1000);
  };

  const handleSaveBankDetails = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage('Bank account details saved securely!');
    setTimeout(() => {
      setSuccessMessage('');
      setActiveModal('NONE');
    }, 1000);
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || !confirmPassword) {
      alert('Please enter all password fields');
      return;
    }
    if (newPassword !== confirmPassword) {
      alert('New passwords do not match');
      return;
    }
    if (newPassword.length < 6) {
      alert('Password must be at least 6 characters');
      return;
    }
    setSuccessMessage('Password updated successfully!');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setTimeout(() => {
      setSuccessMessage('');
      setActiveModal('NONE');
    }, 1000);
  };

  const handleConfirmLogout = () => {
    setActiveModal('NONE');
    setCurrentScreen('LOGIN');
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 justify-between select-none relative">
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5 pb-6">
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setCurrentScreen('DASHBOARD')}
              className="p-1 -ml-1 text-slate-700 hover:text-slate-900 cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h2 className="text-base font-extrabold text-slate-900">My Profile</h2>
          </div>

          <button
            onClick={() => {
              setEditName(userProfile.name);
              setEditPhone(userProfile.phone);
              setEditEmail(userProfile.email);
              setEditZone(userProfile.zone.replace(' Zone', ''));
              setActiveModal('EDIT_PROFILE');
            }}
            className="px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold rounded-lg flex items-center gap-1 hover:bg-emerald-100 transition-colors cursor-pointer"
          >
            <Edit2 className="w-3.5 h-3.5" /> Edit Profile
          </button>
        </div>

        {/* Profile Card */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs space-y-3">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={userProfile.avatar}
                alt={userProfile.name}
                className="w-14 h-14 rounded-full object-cover border-2 border-[#15803d] shadow-2xs"
              />
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"></span>
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-sm font-black text-slate-900 truncate">
                {userProfile.name}
              </h3>
              <p className="text-[11px] text-emerald-700 font-bold">
                {userProfile.role}
              </p>
              <p className="text-[10px] text-slate-400 font-semibold">
                {userProfile.zone}
              </p>
            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs">
            <div className="flex items-center gap-2 text-slate-700 font-semibold">
              <Phone className="w-3.5 h-3.5 text-emerald-600" />
              <span>+91 {userProfile.phone}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-700 font-semibold">
              <Mail className="w-3.5 h-3.5 text-emerald-600" />
              <span className="truncate">{userProfile.email}</span>
            </div>
          </div>

          {/* Stats Badges (My Hotels | Total Orders) */}
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-center">
            <div
              onClick={() => setCurrentScreen('MY_HOTELS')}
              className="bg-emerald-50/80 hover:bg-emerald-100/70 p-2.5 rounded-xl border border-emerald-100 transition-colors cursor-pointer"
            >
              <h4 className="text-base font-black text-emerald-950 leading-none">
                {hotels.length}
              </h4>
              <p className="text-[10px] font-bold text-emerald-800 mt-1">My Hotels</p>
            </div>

            <div
              onClick={() => setCurrentScreen('MY_ORDERS')}
              className="bg-blue-50/80 hover:bg-blue-100/70 p-2.5 rounded-xl border border-blue-100 transition-colors cursor-pointer"
            >
              <h4 className="text-base font-black text-blue-950 leading-none">
                {orders.length}
              </h4>
              <p className="text-[10px] font-bold text-blue-800 mt-1">Total Orders</p>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs divide-y divide-slate-100 text-xs overflow-hidden">
          <button
            onClick={() => setActiveModal('BANK_DETAILS')}
            className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer text-left"
          >
            <div className="flex items-center gap-2.5 font-bold text-slate-700">
              <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <Building2 className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-extrabold text-slate-800">Bank Details</p>
                <p className="text-[10px] text-slate-400 font-medium">For weekly commission payout</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>

          <button
            onClick={() => setActiveModal('CHANGE_PASSWORD')}
            className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer text-left"
          >
            <div className="flex items-center gap-2.5 font-bold text-slate-700">
              <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
                <Lock className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-extrabold text-slate-800">Change Password</p>
                <p className="text-[10px] text-slate-400 font-medium">Update account security</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>

          <button
            onClick={() => setActiveModal('HELP_SUPPORT')}
            className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer text-left"
          >
            <div className="flex items-center gap-2.5 font-bold text-slate-700">
              <div className="w-7 h-7 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center">
                <HelpCircle className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-extrabold text-slate-800">Help & Support</p>
                <p className="text-[10px] text-slate-400 font-medium">FAQs, Helpline, WhatsApp</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>

          <button
            onClick={() => setActiveModal('LOGOUT_CONFIRM')}
            className="w-full p-3.5 flex items-center justify-between hover:bg-rose-50 text-rose-600 font-bold transition-colors cursor-pointer text-left"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
                <LogOut className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-extrabold text-rose-600">Logout</p>
                <p className="text-[10px] text-rose-400 font-medium">Sign out of your account</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-rose-400" />
          </button>
        </div>
      </div>

      {/* ================= MODALS & DRAWERS ================= */}

      {/* 1. Edit Profile Modal */}
      {activeModal === 'EDIT_PROFILE' && (
        <div className="absolute inset-0 z-50 bg-slate-900/60 backdrop-blur-2xs flex items-end justify-center">
          <div className="bg-white w-full rounded-t-3xl p-4 space-y-3.5 max-h-[85%] overflow-y-auto animate-in slide-in-from-bottom duration-200">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-extrabold text-sm text-slate-900">Edit Profile</h3>
              <button
                onClick={() => setActiveModal('NONE')}
                className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {successMessage && (
              <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-bold text-emerald-800 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{successMessage}</span>
              </div>
            )}

            <form onSubmit={handleSaveProfile} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1.5">Profile Photo</label>
                <div className="flex items-center gap-2">
                  {avatarPresets.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setEditAvatar(preset)}
                      className={`w-9 h-9 rounded-full overflow-hidden border-2 transition-transform cursor-pointer ${
                        editAvatar === preset
                          ? 'border-[#15803d] ring-2 ring-emerald-300 scale-105'
                          : 'border-slate-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={preset} alt="preset" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={editName}
                  onChange={e => setEditName(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-emerald-600"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Mobile Number</label>
                <input
                  type="tel"
                  value={editPhone}
                  onChange={e => setEditPhone(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-emerald-600"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  value={editEmail}
                  onChange={e => setEditEmail(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-emerald-600"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Operating Zone</label>
                <select
                  value={editZone}
                  onChange={e => setEditZone(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs text-slate-800 bg-white focus:outline-emerald-600"
                >
                  {zonesList.map(z => (
                    <option key={z} value={z}>{z} Zone</option>
                  ))}
                </select>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setActiveModal('NONE')}
                  className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#15803d] hover:bg-[#166534] text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. Bank Details Modal */}
      {activeModal === 'BANK_DETAILS' && (
        <div className="absolute inset-0 z-50 bg-slate-900/60 backdrop-blur-2xs flex items-end justify-center">
          <div className="bg-white w-full rounded-t-3xl p-4 space-y-3.5 max-h-[85%] overflow-y-auto animate-in slide-in-from-bottom duration-200">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-emerald-700" />
                <h3 className="font-extrabold text-sm text-slate-900">Payout Bank Details</h3>
              </div>
              <button
                onClick={() => setActiveModal('NONE')}
                className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {successMessage && (
              <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-bold text-emerald-800 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{successMessage}</span>
              </div>
            )}

            <form onSubmit={handleSaveBankDetails} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Account Holder Name</label>
                <input
                  type="text"
                  value={bankDetails.accountHolder}
                  onChange={e => setBankDetails({ ...bankDetails, accountHolder: e.target.value })}
                  required
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-emerald-600"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Bank Name</label>
                <input
                  type="text"
                  value={bankDetails.bankName}
                  onChange={e => setBankDetails({ ...bankDetails, bankName: e.target.value })}
                  required
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-emerald-600"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Account Number</label>
                <input
                  type="text"
                  value={bankDetails.accountNumber}
                  onChange={e => setBankDetails({ ...bankDetails, accountNumber: e.target.value })}
                  required
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-emerald-600 font-mono"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">IFSC Code</label>
                <input
                  type="text"
                  value={bankDetails.ifscCode}
                  onChange={e => setBankDetails({ ...bankDetails, ifscCode: e.target.value.toUpperCase() })}
                  required
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-emerald-600 font-mono uppercase"
                />
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setActiveModal('NONE')}
                  className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#15803d] hover:bg-[#166534] text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer"
                >
                  Save Bank Details
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3. Change Password Modal */}
      {activeModal === 'CHANGE_PASSWORD' && (
        <div className="absolute inset-0 z-50 bg-slate-900/60 backdrop-blur-2xs flex items-end justify-center">
          <div className="bg-white w-full rounded-t-3xl p-4 space-y-3.5 max-h-[85%] overflow-y-auto animate-in slide-in-from-bottom duration-200">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-blue-600" />
                <h3 className="font-extrabold text-sm text-slate-900">Change Password</h3>
              </div>
              <button
                onClick={() => setActiveModal('NONE')}
                className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {successMessage && (
              <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-bold text-emerald-800 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{successMessage}</span>
              </div>
            )}

            <form onSubmit={handleChangePassword} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Current Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={currentPassword}
                    onChange={e => setCurrentPassword(e.target.value)}
                    required
                    placeholder="Enter current password"
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-emerald-600 pr-8"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2.5 top-2.5 text-slate-400 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">New Password</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  required
                  placeholder="Min 6 characters"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-emerald-600"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Confirm New Password</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  required
                  placeholder="Re-enter new password"
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-emerald-600"
                />
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setActiveModal('NONE')}
                  className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs cursor-pointer"
                >
                  Update Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 4. Help & Support Modal */}
      {activeModal === 'HELP_SUPPORT' && (
        <div className="absolute inset-0 z-50 bg-slate-900/60 backdrop-blur-2xs flex items-end justify-center">
          <div className="bg-white w-full rounded-t-3xl p-4 space-y-3.5 max-h-[85%] overflow-y-auto animate-in slide-in-from-bottom duration-200">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Headphones className="w-4 h-4 text-purple-600" />
                <h3 className="font-extrabold text-sm text-slate-900">Partner Help & Support</h3>
              </div>
              <button
                onClick={() => setActiveModal('NONE')}
                className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2.5 text-xs">
              {/* Call Helpline */}
              <a
                href="tel:18002673344"
                className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center justify-between hover:bg-emerald-100 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-black text-slate-900">Toll Free Helpline</h5>
                    <p className="text-[10.5px] text-emerald-800 font-bold">1800-267-3344 (8 AM - 8 PM)</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </a>

              {/* WhatsApp Support */}
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noreferrer"
                className="p-3 bg-teal-50 rounded-xl border border-teal-200 flex items-center justify-between hover:bg-teal-100 transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-teal-600 text-white flex items-center justify-center">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-black text-slate-900">WhatsApp Joiner Desk</h5>
                    <p className="text-[10.5px] text-teal-800 font-bold">+91 98765 43210</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </a>

              {/* FAQs */}
              <div className="pt-2 space-y-1.5">
                <h5 className="font-black text-slate-900 flex items-center gap-1.5">
                  <FileQuestion className="w-3.5 h-3.5 text-slate-500" /> Frequently Asked Questions
                </h5>

                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <p className="font-bold text-slate-800">Q: When is commission credited?</p>
                  <p className="text-[10.5px] text-slate-500 font-medium leading-relaxed">
                    Commission (₹100/delivered order) is automatically calculated and credited every Tuesday to your registered bank account.
                  </p>
                </div>

                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <p className="font-bold text-slate-800">Q: How do I onboard a new hotel?</p>
                  <p className="text-[10.5px] text-slate-500 font-medium leading-relaxed">
                    Go to My Hotels &rarr; Tap '+ Add Hotel' &rarr; Enter details &rarr; Submitted hotels are activated immediately.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setActiveModal('NONE')}
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl cursor-pointer"
              >
                Close Support
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. Logout Confirmation Modal */}
      {activeModal === 'LOGOUT_CONFIRM' && (
        <div className="absolute inset-0 z-50 bg-slate-900/60 backdrop-blur-2xs flex items-center justify-center p-5">
          <div className="bg-white w-full rounded-2xl p-4 text-center space-y-3 shadow-xl max-w-xs animate-in zoom-in-95 duration-150">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <LogOut className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-black text-slate-900">Sign Out</h4>
              <p className="text-xs text-slate-500 font-medium">
                Are you sure you want to log out of FarmerBox Joiner App?
              </p>
            </div>
            <div className="flex gap-2 pt-2 text-xs">
              <button
                onClick={() => setActiveModal('NONE')}
                className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmLogout}
                className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl shadow-xs cursor-pointer"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <MobileBottomNav />
    </div>
  );
};
