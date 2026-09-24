import React from 'react';
import { ArrowLeft, Heart, ShoppingBag, Trash2, Plus } from 'lucide-react';
import { useCustomerApp } from '../CustomerAppContext';
import { resolveProductImage, getProductImageFallback } from '../../utils/productImages';

export const WishlistScreen: React.FC = () => {
  const {
    products,
    wishlist,
    toggleWishlist,
    addToCart,
    setCurrentScreen,
    setSelectedProduct
  } = useCustomerApp();

  const wishlistProducts = products.filter(p => wishlist.includes(p.id));

  return (
    <div className="flex flex-col h-full bg-[#F8FAF9] overflow-y-auto no-scrollbar select-none">
      {/* Header */}
      <div className="bg-[#15803d] text-white px-4 py-3 shrink-0 shadow-sm sticky top-0 z-10 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setCurrentScreen('HOME')}
            className="p-1 text-white/90 hover:text-white cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-base font-black tracking-tight">My Wishlist</h2>
            <p className="text-[10px] text-emerald-100 font-medium">{wishlistProducts.length} Saved Favorites</p>
          </div>
        </div>
      </div>

      {/* Wishlist Items matching Screen 18 */}
      <div className="p-4 space-y-3 pb-8">
        {wishlistProducts.length === 0 ? (
          <div className="p-12 text-center text-slate-400 space-y-3">
            <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-400 flex items-center justify-center mx-auto">
              <Heart className="w-8 h-8" />
            </div>
            <h4 className="font-bold text-slate-700 text-sm">Your Wishlist is Empty</h4>
            <p className="text-xs text-slate-400">Save your favorite seasonal fruits and vegetables to purchase anytime.</p>
            <button
              onClick={() => setCurrentScreen('HOME')}
              className="px-5 py-2.5 bg-[#15803d] text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer"
            >
              Explore Produce
            </button>
          </div>
        ) : (
          <div className="space-y-2.5">
            {wishlistProducts.map(p => {
              const b2cPrice = p.b2cPrice || p.salePrice;
              return (
                <div
                  key={p.id}
                  onClick={() => {
                    setSelectedProduct(p);
                    setCurrentScreen('PRODUCT_DETAIL');
                  }}
                  className="bg-white rounded-2xl p-3 border border-slate-200/80 shadow-2xs flex items-center justify-between gap-3 cursor-pointer hover:shadow-md transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={resolveProductImage(p.name, p.category, p.image)}
                      alt={p.name}
                      onError={e => {
                        (e.target as HTMLElement).setAttribute('src', getProductImageFallback(p.category));
                      }}
                      className="w-14 h-14 rounded-xl object-cover bg-slate-50 border border-slate-100 shrink-0 group-hover:scale-105 transition-transform"
                    />
                    <div>
                      <span className="text-[9px] font-bold uppercase text-emerald-700">{p.category}</span>
                      <h4 className="font-bold text-xs text-slate-900 leading-tight">{p.name}</h4>
                      <p className="text-[10px] text-slate-400 font-medium">{p.unit || '1 KG'}</p>
                      <p className="font-black text-xs text-slate-900 mt-1">₹{b2cPrice}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        addToCart(p, 1);
                      }}
                      className="px-3 py-1.5 bg-[#15803d] hover:bg-[#166534] text-white rounded-xl text-xs font-bold shadow-2xs flex items-center gap-1 active:scale-95 transition-transform cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5 stroke-[3]" />
                      <span>Add</span>
                    </button>

                    <button
                      onClick={e => {
                        e.stopPropagation();
                        toggleWishlist(p.id);
                      }}
                      className="p-2 text-slate-300 hover:text-rose-500 rounded-xl hover:bg-rose-50 transition-colors cursor-pointer"
                      title="Remove from wishlist"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
