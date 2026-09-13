import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Bell,
  Search,
  Plus,
  ShoppingCart,
  ArrowRight,
  ChevronDown,
  Building2
} from 'lucide-react';
import { useJoinerApp } from '../JoinerAppContext';
import type { MobileProduct } from '../JoinerAppContext';

export const PlaceOrderScreen: React.FC = () => {
  const {
    products,
    cart,
    addToCart,
    selectedHotel,
    hotels,
    setSelectedHotel,
    setCurrentScreen,
    cartTotal
  } = useJoinerApp();

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isHotelDropdownOpen, setIsHotelDropdownOpen] = useState(false);

  useEffect(() => {
    if (!selectedHotel && hotels.length > 0) {
      setSelectedHotel(hotels[0]);
    }
  }, [hotels, selectedHotel, setSelectedHotel]);

  const currentHotel = selectedHotel || (hotels.length > 0 ? hotels[0] : null);

  const categories = ['All', 'Fruits', 'Vegetables', 'Leafy', 'Other'];

  const filteredProducts = products.filter(p => {
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="flex flex-col h-full bg-slate-50 justify-between select-none relative">
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5 pb-20">
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setCurrentScreen('DASHBOARD')}
              className="p-1 -ml-1 text-slate-700 hover:text-slate-900 cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h2 className="text-base font-extrabold text-slate-900">Place Order</h2>
          </div>

          <button
            onClick={() => setCurrentScreen('NOTIFICATIONS')}
            className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:text-emerald-700 cursor-pointer shadow-2xs"
          >
            <Bell className="w-4 h-4" />
          </button>
        </div>

        {/* Select Hotel Dropdown or Prompt if no hotels */}
        {hotels.length === 0 ? (
          <div className="bg-white border border-dashed border-emerald-300 rounded-xl p-3.5 flex items-center justify-between shadow-2xs">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-extrabold text-xs text-slate-900">No Hotels Added Yet</h4>
                <p className="text-[10px] text-slate-500 font-medium">Add a hotel first to order vegetables</p>
              </div>
            </div>
            <button
              onClick={() => setCurrentScreen('ADD_HOTEL')}
              className="px-2.5 py-1.5 bg-[#15803d] hover:bg-[#166534] text-white text-[11px] font-bold rounded-lg shadow-2xs transition-colors cursor-pointer"
            >
              + Add Hotel
            </button>
          </div>
        ) : (
          <div className="space-y-1 relative">
            <label className="block text-[11px] font-bold text-slate-700">
              Select Hotel <span className="text-rose-500">*</span>
            </label>
            <div
              onClick={() => setIsHotelDropdownOpen(!isHotelDropdownOpen)}
              className="bg-white border border-slate-200 rounded-xl p-2.5 flex items-center justify-between cursor-pointer hover:border-emerald-500 shadow-2xs"
            >
              <div className="flex items-center gap-2 min-w-0">
                {currentHotel && (
                  <img
                    src={currentHotel.image}
                    alt={currentHotel.name}
                    className="w-8 h-8 rounded-lg object-cover"
                  />
                )}
                <div className="min-w-0">
                  <h4 className="font-extrabold text-slate-900 text-xs truncate">
                    {currentHotel?.name || 'Select Hotel'}
                  </h4>
                  <p className="text-[10px] text-slate-500 font-medium">
                    {currentHotel?.zone || ''}
                  </p>
                </div>
              </div>
              <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isHotelDropdownOpen ? 'rotate-180' : ''}`} />
            </div>

            {/* Hotel Dropdown Options */}
            {isHotelDropdownOpen && (
              <div className="absolute top-16 left-0 right-0 z-30 bg-white border border-slate-200 rounded-xl shadow-xl p-1.5 space-y-1 max-h-48 overflow-y-auto">
                {hotels.map(h => (
                  <div
                    key={h.id}
                    onClick={() => {
                      setSelectedHotel(h);
                      setIsHotelDropdownOpen(false);
                    }}
                    className={`p-2 rounded-lg flex items-center justify-between text-xs cursor-pointer transition-colors ${
                      currentHotel?.id === h.id ? 'bg-emerald-50 text-emerald-800 font-bold' : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <span>{h.name}</span>
                    <span className="text-[10px] text-slate-400">{h.zone}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Browse Products Header & Search */}
        <div className="space-y-2">
          <h3 className="font-extrabold text-xs text-slate-900">Browse Products</h3>

          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search vegetables..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-800 placeholder:text-slate-400 focus:outline-emerald-600 shadow-2xs"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto text-xs pb-0.5">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1 rounded-lg text-[11px] font-bold whitespace-nowrap transition-colors cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[#15803d] text-white'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Products List */}
        <div className="space-y-2 pt-1">
          {filteredProducts.map(product => {
            const inCart = cart.find(item => item.product.id === product.id);

            return (
              <div
                key={product.id}
                className="bg-white p-2.5 rounded-xl border border-slate-200/80 flex items-center justify-between shadow-2xs"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center p-1 flex-shrink-0 overflow-hidden shadow-2xs">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-extrabold text-slate-900 text-xs truncate">
                        {product.name}
                      </h4>
                    </div>
                    <p className="text-[11px] text-slate-700 font-bold mt-0.5">
                      ₹{product.price} <span className="text-slate-400 font-normal">/ {product.unit}</span>
                      <span className="ml-1.5 text-[9px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                        {product.category}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  {inCart && (
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                      {inCart.quantity} {product.unit}
                    </span>
                  )}
                  <button
                    onClick={() => addToCart(product)}
                    className="w-8 h-8 rounded-full bg-emerald-50 hover:bg-[#15803d] text-[#15803d] hover:text-white flex items-center justify-center transition-all cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating Bottom Cart Bar */}
      {cart.length > 0 && (
        <div className="absolute bottom-3 left-4 right-4 z-20">
          <button
            onClick={() => setCurrentScreen('CART')}
            className="w-full py-3 bg-[#15803d] hover:bg-[#166534] text-white font-bold text-xs rounded-xl shadow-lg flex items-center justify-between px-4 transition-all cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-4 h-4" />
              <span>View Cart ({totalCartCount})</span>
            </div>
            <div className="flex items-center gap-1">
              <span>₹{cartTotal}</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </button>
        </div>
      )}
    </div>
  );
};
