import React, { useState } from 'react';
import { ArrowLeft, Heart, Share2, Sparkles, CheckCircle2, ShieldCheck, ShoppingBag, Truck } from 'lucide-react';
import { useCustomerApp } from '../CustomerAppContext';
import { resolveProductImage, getProductImageFallback } from '../../utils/productImages';
import { getCountryFlag } from '../../data/countriesData';

export const ProductDetailScreen: React.FC = () => {
  const {
    selectedProduct,
    setCurrentScreen,
    cart,
    addToCart,
    isInWishlist,
    toggleWishlist
  } = useCustomerApp();

  const [quantity, setQuantity] = useState(1);
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  if (!selectedProduct) {
    return (
      <div className="p-8 text-center space-y-3">
        <p>No product selected.</p>
        <button
          onClick={() => setCurrentScreen('HOME')}
          className="px-4 py-2 bg-emerald-700 text-white rounded-xl text-xs font-bold"
        >
          Return Home
        </button>
      </div>
    );
  }

  const p = selectedProduct;
  const inWishlist = isInWishlist(p.id);
  const b2cPrice = p.b2cPrice || p.salePrice;
  const originalPrice = Math.round(b2cPrice * 1.25);
  const discountPercent = Math.round(((originalPrice - b2cPrice) / originalPrice) * 100);
  const flag = p.isImported ? getCountryFlag(p.originCountry) : '🇮🇳';

  const productImages = p.images && p.images.length > 0
    ? p.images.map(img => resolveProductImage(p.name, p.category, img))
    : [resolveProductImage(p.name, p.category, p.image)];

  const handleAddToCart = () => {
    addToCart(p, quantity);
    setCurrentScreen('CART');
  };

  return (
    <div className="flex flex-col h-full bg-[#F8FAF9] justify-between overflow-y-auto no-scrollbar select-none">
      {/* Scrollable Content */}
      <div className="space-y-4 pb-24">
        {/* Top Header Floating Buttons */}
        <div className="relative">
          {/* Main Image Banner */}
          <div className="h-72 bg-white relative overflow-hidden flex items-center justify-center p-4">
            <img
              src={productImages[activeImageIdx] || resolveProductImage(p.name, p.category, p.image)}
              alt={p.name}
              onError={e => {
                (e.target as HTMLElement).setAttribute('src', getProductImageFallback(p.category));
              }}
              className="w-full h-full object-contain"
            />

            {/* Top Navigation */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
              <button
                onClick={() => setCurrentScreen('HOME')}
                className="w-9 h-9 rounded-full bg-white/90 hover:bg-white text-slate-700 shadow-md backdrop-blur-xs flex items-center justify-center cursor-pointer transition-transform active:scale-90"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => alert(`Share ${p.name}`)}
                  className="w-9 h-9 rounded-full bg-white/90 hover:bg-white text-slate-700 shadow-md backdrop-blur-xs flex items-center justify-center cursor-pointer transition-transform active:scale-90"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => toggleWishlist(p.id)}
                  className="w-9 h-9 rounded-full bg-white/90 hover:bg-white text-slate-700 shadow-md backdrop-blur-xs flex items-center justify-center cursor-pointer transition-transform active:scale-90"
                >
                  <Heart className={`w-4 h-4 ${inWishlist ? 'fill-rose-500 text-rose-500' : ''}`} />
                </button>
              </div>
            </div>

            {/* Badges */}
            <div className="absolute bottom-4 left-4 flex flex-wrap gap-1.5 z-10">
              <span className="bg-emerald-800 text-white text-[10px] font-black px-2 py-0.5 rounded-md shadow-sm uppercase tracking-wide">
                🌱 100% Pre-Order
              </span>
              {discountPercent > 0 && (
                <span className="bg-rose-500 text-white text-[10px] font-black px-2 py-0.5 rounded-md shadow-sm">
                  {discountPercent}% OFF
                </span>
              )}
              <span className="bg-emerald-700 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-sm flex items-center gap-1">
                <span>{flag}</span>
                <span>{p.originCountry || 'Pune Farm'}</span>
              </span>
            </div>

            {/* Carousel Dots */}
            {productImages.length > 1 && (
              <div className="absolute bottom-4 right-4 flex gap-1">
                {productImages.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImageIdx(i)}
                    className={`h-1.5 rounded-full transition-all ${
                      activeImageIdx === i ? 'w-4 bg-emerald-600' : 'w-1.5 bg-slate-300'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Product Details Section */}
        <div className="px-4 space-y-4">
          {/* Pre-Order Notice */}
          <div className="bg-emerald-50 border border-emerald-300 rounded-2xl p-3 flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-black text-sm shrink-0">
              🌱
            </div>
            <div>
              <span className="font-black text-xs text-emerald-950 uppercase">100% Pre-Order Farm Harvest</span>
              <p className="text-[10px] text-emerald-700 font-medium leading-tight mt-0.5">
                Harvested fresh from orchards upon order & delivered next morning at 6 AM!
              </p>
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                {p.category}
              </span>
              <span className="text-xs font-mono text-slate-400">SKU #{p.id}</span>
            </div>
            <h2 className="text-xl font-black text-slate-900 leading-tight">{p.name}</h2>
            <p className="text-xs text-slate-500 font-medium">{p.unit || '1 KG Pack'}</p>
          </div>

          {/* Pricing Row */}
          <div className="flex items-baseline gap-3 p-3 bg-white rounded-2xl border border-slate-200/80 shadow-2xs">
            <div className="text-2xl font-black text-slate-900">
              ₹{b2cPrice}
            </div>
            {originalPrice > b2cPrice && (
              <div className="text-sm font-semibold text-slate-400 line-through">
                ₹{originalPrice}
              </div>
            )}
            {discountPercent > 0 && (
              <div className="text-xs font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                Save ₹{originalPrice - b2cPrice}
              </div>
            )}
          </div>

          {/* 3 Quality Bullets matching Screen 10 */}
          <div className="space-y-2 bg-emerald-50/70 p-3.5 rounded-2xl border border-emerald-100">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="text-xs font-bold text-slate-800">100% Organic & Chemical Free</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="text-xs font-bold text-slate-800">Direct From Partner Farms</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="text-xs font-bold text-slate-800">No Artificial Ripening Chemicals</span>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">About This Produce</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              {p.description || `Fresh farm-sourced ${p.name} harvested in the morning and sorted with triple quality checks. Rich in essential vitamins and dietary nutrients.`}
            </p>
          </div>

          {/* Delivery & Returns Info */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 bg-white border border-slate-200/80 rounded-xl flex items-center gap-2">
              <Truck className="w-4 h-4 text-emerald-600 shrink-0" />
              <div>
                <p className="font-bold text-slate-900 text-[11px]">Under 60 Mins</p>
                <p className="text-[9px] text-slate-400">Express Delivery</p>
              </div>
            </div>
            <div className="p-2.5 bg-white border border-slate-200/80 rounded-xl flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <div>
                <p className="font-bold text-slate-900 text-[11px]">Fresh Guarantee</p>
                <p className="text-[9px] text-slate-400">100% Replacement</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Sticky Action Bar */}
      <div className="shrink-0 bg-white border-t border-slate-200 p-4 shadow-lg z-30 flex items-center gap-3">
        {/* Quantity Stepper */}
        <div className="flex items-center bg-slate-100 rounded-2xl p-1 border border-slate-200">
          <button
            onClick={() => setQuantity(q => Math.max(1, q - 1))}
            className="w-9 h-9 rounded-xl bg-white text-slate-700 hover:bg-slate-50 flex items-center justify-center font-black text-base shadow-2xs cursor-pointer active:scale-90"
          >
            -
          </button>
          <span className="w-9 text-center font-black text-sm text-slate-900 select-none">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity(q => q + 1)}
            className="w-9 h-9 rounded-xl bg-white text-slate-700 hover:bg-slate-50 flex items-center justify-center font-black text-base shadow-2xs cursor-pointer active:scale-90"
          >
            +
          </button>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="flex-1 py-3.5 bg-[#15803d] hover:bg-[#166534] text-white font-black text-sm rounded-2xl shadow-md flex items-center justify-center gap-2 transition-transform active:scale-98 cursor-pointer"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Add to Cart • ₹{b2cPrice * quantity}</span>
        </button>
      </div>
    </div>
  );
};
