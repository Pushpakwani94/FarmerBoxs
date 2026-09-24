import React, { useState } from 'react';
import { ArrowLeft, Check, QrCode, CreditCard, Landmark, Banknote, ShieldCheck, Lock, Loader2 } from 'lucide-react';
import { useCustomerApp } from '../CustomerAppContext';

export const PaymentScreen: React.FC = () => {
  const {
    selectedPaymentMethod,
    setSelectedPaymentMethod,
    itemTotal,
    deliveryFee,
    discountAmount,
    grandTotal,
    appliedCoupon,
    placeOrder,
    setCurrentScreen
  } = useCustomerApp();

  const [isProcessing, setIsProcessing] = useState(false);

  const paymentOptions = [
    {
      id: 'UPI' as const,
      label: 'UPI (GPay, PhonePe, Paytm)',
      subtitle: 'Instant secure UPI payment',
      icon: QrCode,
      tag: 'Fastest'
    },
    {
      id: 'Card' as const,
      label: 'Credit / Debit Card',
      subtitle: 'Visa, MasterCard, RuPay',
      icon: CreditCard
    },
    {
      id: 'NetBanking' as const,
      label: 'Net Banking',
      subtitle: 'All major Indian banks supported',
      icon: Landmark
    },
    {
      id: 'COD' as const,
      label: 'Cash on Delivery',
      subtitle: 'Pay at your doorstep upon arrival',
      icon: Banknote
    }
  ];

  const handlePay = async () => {
    setIsProcessing(true);
    await placeOrder();
    setIsProcessing(false);
    setCurrentScreen('ORDER_SUCCESS');
  };

  return (
    <div className="flex flex-col h-full bg-[#F8FAF9] justify-between overflow-y-auto no-scrollbar select-none">
      {/* Top Header */}
      <div className="bg-[#15803d] text-white px-4 py-3 shrink-0 shadow-sm sticky top-0 z-10 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setCurrentScreen('ADDRESS')}
            className="p-1 text-white/90 hover:text-white cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-base font-black tracking-tight">Payment Method</h2>
        </div>
        <div className="flex items-center gap-1 text-[10px] text-emerald-100 bg-emerald-800 px-2 py-0.5 rounded-full font-bold">
          <Lock className="w-3 h-3" />
          <span>100% Secure</span>
        </div>
      </div>

      {/* Main Payment Options matching Screen 15 */}
      <div className="p-4 space-y-4 pb-28">
        <div className="space-y-2.5">
          <h4 className="text-xs font-black text-slate-700 uppercase tracking-wider">
            Choose Payment Method
          </h4>

          {paymentOptions.map(opt => {
            const isSelected = selectedPaymentMethod === opt.id;
            const Icon = opt.icon;

            return (
              <div
                key={opt.id}
                onClick={() => setSelectedPaymentMethod(opt.id)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  isSelected
                    ? 'bg-emerald-50/80 border-emerald-400 shadow-xs'
                    : 'bg-white border-slate-200/80 hover:bg-slate-50 shadow-2xs'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                      isSelected ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-slate-900">{opt.label}</span>
                      {opt.tag && (
                        <span className="text-[9px] font-black uppercase px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 border border-amber-200">
                          {opt.tag}
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] text-slate-400 mt-0.5">{opt.subtitle}</p>
                  </div>
                </div>

                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                    isSelected ? 'border-emerald-600 bg-emerald-600 text-white' : 'border-slate-300'
                  }`}
                >
                  {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                </div>
              </div>
            );
          })}
        </div>

        {/* Order Summary matching Screen 15 */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs space-y-2.5">
          <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">
            Order Summary
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
                <span>Discount ({appliedCoupon?.code})</span>
                <span>- ₹{discountAmount}</span>
              </div>
            )}

            <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-sm font-black text-slate-900">
              <span>Total Payable</span>
              <span className="text-emerald-800 text-base">₹{grandTotal}</span>
            </div>
          </div>
        </div>

        {/* Security badge */}
        <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400 font-medium">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>256-bit bank grade encryption • Instant order confirmation</span>
        </div>
      </div>

      {/* Bottom Sticky Pay Button */}
      <div className="shrink-0 bg-white border-t border-slate-200 p-4 shadow-lg z-30">
        <button
          onClick={handlePay}
          disabled={isProcessing}
          className="w-full py-3.5 bg-[#15803d] hover:bg-[#166534] text-white font-black text-sm rounded-2xl shadow-md flex items-center justify-center gap-2 cursor-pointer transition-transform active:scale-98 disabled:opacity-50"
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Processing Order...</span>
            </>
          ) : (
            <span>Pay ₹{grandTotal}</span>
          )}
        </button>
      </div>
    </div>
  );
};
