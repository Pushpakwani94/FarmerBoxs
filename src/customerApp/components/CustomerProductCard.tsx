import React from 'react';
import { Plus, Heart, Sparkles } from 'lucide-react';
import type { Product } from '../../types';
import { useCustomerApp } from '../CustomerAppContext';
import { resolveProductImage, getProductImageFallback } from '../../utils/productImages';
import { getCountryFlag } from '../../data/countriesData';
import { CustomerQuantityStepper } from './CustomerQuantityStepper';

interface CustomerProductCardProps {
  product: Product;
  layout?: 'vertical' | 'horizontal';
}

export const CustomerProductCard: React.FC<CustomerProductCardProps> = ({
  product,
  layout = 'vertical'
}) => {
  const {
    setSelectedProduct,
    setCurrentScreen,
    cart,
    addToCart,
    updateCartQty,
    removeFromCart,
    isInWishlist,
    toggleWishlist
  } = useCustomerApp();

  const cartItem = cart.find(item => item.productId === product.id);
  const inWishlist = isInWishlist(product.id);
  const b2cPrice = product.b2cPrice || product.salePrice;
  const originalPrice = Math.round(b2cPrice * 1.25);
  const discountPercent = Math.round(((originalPrice - b2cPrice) / originalPrice) * 100);
  const flag = product.isImported ? getCountryFlag(product.originCountry) : '🇮🇳';

  const handleCardClick = () => {
    setSelectedProduct(product);
    setCurrentScreen('PRODUCT_DETAIL');
  };

  if (layout === 'horizontal') {
    return (
      <div
        onClick={handleCardClick}
        className="bg-white rounded-2xl p-3 border border-slate-200/80 shadow-2xs hover:shadow-md transition-all flex items-center gap-3 cursor-pointer group"
      >
        <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-slate-50 border border-slate-100 shrink-0">
          <img
            src={resolveProductImage(product.name, product.category, product.image)}
            alt={product.name}
            onError={e => {
              (e.target as HTMLElement).setAttribute('src', getProductImageFallback(product.category));
            }}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
          />
          {discountPercent > 0 && (
            <span className="absolute top-1 left-1 bg-rose-500 text-white text-[9px] font-black px-1.5 py-0.2 rounded shadow-2xs">
              {discountPercent}% OFF
            </span>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-emerald-700 font-bold uppercase tracking-wider flex items-center gap-0.5">
              <Sparkles className="w-2.5 h-2.5" /> Farm Fresh
            </span>
            <button
              onClick={e => {
                e.stopPropagation();
                toggleWishlist(product.id);
              }}
              className="p-1 text-slate-300 hover:text-rose-500 transition-colors"
            >
              <Heart className={`w-3.5 h-3.5 ${inWishlist ? 'fill-rose-500 text-rose-500' : ''}`} />
            </button>
          </div>
          <h4 className="font-bold text-xs text-slate-900 truncate mt-0.5">{product.name}</h4>
          <p className="text-[10px] text-slate-400 font-medium">{product.unit || '1 KG'}</p>

          <div className="flex items-center justify-between mt-2">
            <div className="flex items-baseline gap-1">
              <span className="font-black text-sm text-slate-900">₹{b2cPrice}</span>
              {originalPrice > b2cPrice && (
                <span className="text-[10px] text-slate-400 line-through">₹{originalPrice}</span>
              )}
            </div>

            {cartItem ? (
              <CustomerQuantityStepper
                size="sm"
                quantity={cartItem.quantity}
                onIncrement={() => updateCartQty(product.id, cartItem.quantity + 1)}
                onDecrement={() => updateCartQty(product.id, cartItem.quantity - 1)}
                showDeleteOnOne
              />
            ) : (
              <button
                onClick={e => {
                  e.stopPropagation();
                  addToCart(product, 1);
                }}
                className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-600 font-black text-[11px] rounded-lg flex items-center gap-0.5 shadow-2xs cursor-pointer transition-all active:scale-90 hover:scale-105"
              >
                <Plus className="w-3 h-3 stroke-[3]" />
                <span>ADD</span>
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={handleCardClick}
      className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between cursor-pointer group relative"
    >
      {/* Top Media */}
      <div className="relative h-32 bg-slate-50 overflow-hidden">
        <img
          src={resolveProductImage(product.name, product.category, product.image)}
          alt={product.name}
          onError={e => {
            (e.target as HTMLElement).setAttribute('src', getProductImageFallback(product.category));
          }}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Pre-Order Tag & Discount Badge */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
          <span className="bg-emerald-700 text-white text-[8px] font-black px-1.5 py-0.5 rounded shadow-xs uppercase tracking-wide">
            🌱 Pre-Order
          </span>
          {discountPercent > 0 && (
            <span className="bg-rose-500 text-white text-[8px] font-black px-1.5 py-0.2 rounded shadow-xs w-max">
              {discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={e => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className="absolute top-2 right-2 p-1.5 rounded-full bg-white/90 hover:bg-white text-slate-400 hover:text-rose-500 shadow-2xs backdrop-blur-xs transition-colors cursor-pointer"
        >
          <Heart className={`w-3.5 h-3.5 ${inWishlist ? 'fill-rose-500 text-rose-500' : ''}`} />
        </button>

        {/* Origin Flag */}
        {product.isImported && (
          <span className="absolute bottom-1.5 left-2 bg-black/60 text-white text-[9px] font-bold px-1.5 py-0.2 rounded backdrop-blur-xs flex items-center gap-0.5">
            <span>{flag}</span>
            <span>{product.originCountry}</span>
          </span>
        )}
      </div>

      {/* Details */}
      <div className="p-3 flex-1 flex flex-col justify-between space-y-2">
        <div>
          <span className="text-[9px] font-extrabold uppercase text-emerald-700 tracking-wider">
            {product.category}
          </span>
          <h4 className="font-bold text-xs text-slate-900 line-clamp-1 leading-snug mt-0.5">
            {product.name}
          </h4>
          <p className="text-[10px] text-slate-400 font-medium">{product.unit || '1 KG'}</p>
        </div>

        {/* Price & Action */}
        <div className="flex items-center justify-between pt-1">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="font-black text-sm text-slate-900">₹{b2cPrice}</span>
              {originalPrice > b2cPrice && (
                <span className="text-[10px] text-slate-400 line-through">₹{originalPrice}</span>
              )}
            </div>
            <span className="text-[9px] text-slate-400 font-normal">/{product.unit || 'KG'}</span>
          </div>

          {cartItem ? (
            <CustomerQuantityStepper
              size="sm"
              quantity={cartItem.quantity}
              onIncrement={() => updateCartQty(product.id, cartItem.quantity + 1)}
              onDecrement={() => updateCartQty(product.id, cartItem.quantity - 1)}
              showDeleteOnOne
            />
          ) : (
            <button
              onClick={e => {
                e.stopPropagation();
                addToCart(product, 1);
              }}
              className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-600 font-black text-xs rounded-xl flex items-center gap-1 shadow-2xs transition-all active:scale-90 hover:scale-105 cursor-pointer uppercase tracking-wider group-hover:bg-emerald-600 group-hover:text-white"
            >
              <Plus className="w-3.5 h-3.5 stroke-[3]" />
              <span>ADD</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
