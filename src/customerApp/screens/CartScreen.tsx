import React, { useState } from 'react';
import { ArrowLeft, ShoppingBag, Tag, Trash2, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useCustomerApp } from '../CustomerAppContext';
import { CustomerQuantityStepper } from '../components/CustomerQuantityStepper';

export const CartScreen: React.FC = () => {
  const {
    cart,
    cartItemCount,
    itemTotal,
    deliveryFee,
    discountAmount,
    grandTotal,
    updateCartQty,
    clearCart,
    setCurrentScreen,
    appliedCoupon,
    applyCoupon,
    removeCoupon
  } = useCustomerApp();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponInput('');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="flex flex-col h-full bg-[#F8FAF9] justify-between p-6 select-none">
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setCurrentScreen('HOME')}
            className="p-1 text-slate-600 hover:text-slate-900 cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className="font-bold text-sm text-slate-800">My Cart</span>
        </div>

        <div className="flex flex-col items-center justify-center text-center space-y-4 my-auto">
          <div className="w-24 h-24 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-inner">
            <ShoppingBag className="w-12 h-12 stroke-[1.5]" />
          </div>
          <div className="space-y-1 max-w-xs">
            <h3 className="font-black text-lg text-slate-900">Your Cart is Empty</h3>
            <p className="text-xs text-slate-400">
              Add fresh organic vegetables and sweet fruits directly from local farms.
            </p>
          </div>
          <button
            onClick={() => setCurrentScreen('HOME')}
            className="px-6 py-3 bg-[#15803d] hover:bg-[#166534] text-white font-black text-xs rounded-2xl shadow-md cursor-pointer transition-transform active:scale-95"
          >
            Start Shopping
          </button>
        </div>

        <div className="text-center">
          <p className="text-[10px] text-slate-400">100% Quality Freshness Guarantee</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-[#F8FAF9] justify-between overflow-y-auto no-scrollbar select-none">
      {/* Top Header */}
      <div className="bg-[#15803d] text-white px-4 py-3 shrink-0 shadow-sm sticky top-0 z-10 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setCurrentScreen('HOME')}
            className="p-1 text-white/90 hover:text-white cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-base font-black tracking-tight">My Cart</h2>
            <p className="text-[10px] text-emerald-100 font-medium">{cartItemCount} Produce Items</p>
          </div>
        </div>

        <button
          onClick={clearCart}
          className="text-xs text-emerald-200 hover:text-white font-bold cursor-pointer"
        >
          Clear
        </button>
      </div>

      {/* Cart Content */}
      <div className="p-4 space-y-4 pb-28">
        {/* Pre-Order Harvest Fulfillment Banner */}
        <div className="bg-emerald-50 border border-emerald-300/80 rounded-2xl p-3 flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-bold text-sm shrink-0">
            🌱
          </div>
          <div>
            <h4 className="font-extrabold text-xs text-emerald-950">100% Pre-Order Farm Fulfillment</h4>
            <p className="text-[10px] text-emerald-700 font-medium leading-tight mt-0.5">
              Items are harvested fresh from orchards upon order & delivered tomorrow morning!
            </p>
          </div>
        </div>

        {/* Item Cards List matching Screen 13 */}
        <div className="space-y-2.5">
          {cart.map(item => {
            const itemSubtotal = item.price * item.quantity;
            return (
              <div
                key={item.productId}
                className="bg-white rounded-2xl p-3 border border-slate-200/80 shadow-2xs flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-14 rounded-xl object-cover bg-slate-50 border border-slate-100 shrink-0"
                  />
                  <div>
                    <h4 className="font-bold text-xs text-slate-900 leading-tight">{item.name}</h4>
                    <p className="text-[10px] text-slate-400 font-medium mt-0.5">
                      ₹{item.price} / {item.unit}
                    </p>
                    <div className="mt-1.5">
                      <CustomerQuantityStepper
                        size="sm"
                        quantity={item.quantity}
                        onIncrement={() => updateCartQty(item.productId, item.quantity + 1)}
                        onDecrement={() => updateCartQty(item.productId, item.quantity - 1)}
                        showDeleteOnOne
                      />
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-black text-sm text-slate-900">₹{itemSubtotal}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Apply Coupon Box matching Screen 13 */}
        <div className="bg-white rounded-2xl p-3.5 border border-slate-200/80 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-emerald-600" />
              <span>Apply Coupon</span>
            </span>
            <button
              onClick={() => setCurrentScreen('OFFERS')}
              className="text-xs font-bold text-emerald-700 hover:text-emerald-900 cursor-pointer"
            >
              View Offers
            </button>
          </div>

          {appliedCoupon ? (
            <div className="flex items-center justify-between p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <div>
                  <p className="text-xs font-black text-emerald-900 font-mono">{appliedCoupon.code}</p>
                  <p className="text-[10px] text-emerald-700 font-medium">Applied: {appliedCoupon.title}</p>
                </div>
              </div>
              <button
                onClick={removeCoupon}
                className="text-xs font-bold text-rose-600 hover:text-rose-800 cursor-pointer"
              >
                Remove
              </button>
            </div>
          ) : (
            <form onSubmit={handleApplyCoupon} className="space-y-1">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={couponInput}
                  onChange={e => setCouponInput(e.target.value.toUpperCase())}
                  placeholder="Enter coupon code (e.g. FREEDEL)"
                  className="flex-1 px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600 font-bold uppercase placeholder:normal-case"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#15803d] hover:bg-[#166534] text-white font-bold text-xs rounded-xl shadow-2xs cursor-pointer"
                >
                  Apply
                </button>
              </div>
              {couponError && <p className="text-[10px] font-bold text-rose-600">{couponError}</p>}
            </form>
          )}
        </div>

        {/* Bill Details matching Screen 13 */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs space-y-2.5">
          <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">
            Bill Details
          </h4>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between text-slate-600">
              <span>Item Total</span>
              <span className="font-bold text-slate-900">₹{itemTotal}</span>
            </div>

            <div className="flex items-center justify-between text-slate-600">
              <span>Delivery Charges</span>
              <span>
                {deliveryFee === 0 ? (
                  <span className="text-emerald-700 font-black">FREE</span>
                ) : (
                  <span className="font-bold text-slate-900">₹{deliveryFee}</span>
                )}
              </span>
            </div>

            {discountAmount > 0 && (
              <div className="flex items-center justify-between text-emerald-700 font-bold">
                <span>Coupon Discount ({appliedCoupon?.code})</span>
                <span>- ₹{discountAmount}</span>
              </div>
            )}

            <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-sm font-black text-slate-900">
              <span>Total Amount</span>
              <span className="text-emerald-800 text-base">₹{grandTotal}</span>
            </div>
          </div>
        </div>

        {/* Safety Badge */}
        <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400 font-medium">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Contactless Safe Delivery • Triple Sanitized Pack</span>
        </div>
      </div>

      {/* Bottom Sticky Checkout Bar */}
      <div className="shrink-0 bg-white border-t border-slate-200 p-4 shadow-lg z-30 flex items-center justify-between gap-3">
        <div>
          <span className="text-[10px] text-slate-400 font-bold uppercase">To Pay</span>
          <div className="text-lg font-black text-emerald-800 leading-tight">
            ₹{grandTotal}
          </div>
        </div>

        <button
          onClick={() => setCurrentScreen('ADDRESS')}
          className="flex-1 py-3.5 bg-[#15803d] hover:bg-[#166534] text-white font-black text-sm rounded-2xl shadow-md flex items-center justify-center gap-2 cursor-pointer transition-transform active:scale-98"
        >
          <span>Proceed to Checkout</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
