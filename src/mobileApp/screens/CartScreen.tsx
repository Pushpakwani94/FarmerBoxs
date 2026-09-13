import React, { useState } from 'react';
import {
  ArrowLeft,
  Trash2,
  Minus,
  Plus,
  Calendar,
  Clock
} from 'lucide-react';
import { useJoinerApp } from '../JoinerAppContext';

export const CartScreen: React.FC = () => {
  const {
    cart,
    updateCartQty,
    clearCart,
    selectedHotel,
    hotels,
    cartTotal,
    setCurrentScreen,
    addOrder
  } = useJoinerApp();

  const [deliveryDate, setDeliveryDate] = useState('12 Sep 2026');
  const [timeSlot, setTimeSlot] = useState('8 AM - 10 AM');
  const [notes, setNotes] = useState('');

  const timeSlots = ['6 AM - 8 AM', '8 AM - 10 AM', '10 AM - 12 PM', '4 PM - 6 PM'];
  const currentHotel = selectedHotel || (hotels.length > 0 ? hotels[0] : null);

  const handlePlaceOrder = () => {
    if (!currentHotel) {
      alert('Please add a hotel partner first before placing an order.');
      setCurrentScreen('ADD_HOTEL');
      return;
    }

    if (cart.length === 0) {
      alert('Your cart is empty');
      return;
    }

    addOrder({
      hotelName: currentHotel.name,
      hotelZone: currentHotel.zone,
      date: deliveryDate,
      timeSlot: timeSlot,
      amount: cartTotal
    });

    setCurrentScreen('ORDER_SUCCESS');
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 justify-between select-none">
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5 pb-6">
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setCurrentScreen('PLACE_ORDER')}
              className="p-1 -ml-1 text-slate-700 hover:text-slate-900 cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h2 className="text-base font-extrabold text-slate-900">My Cart</h2>
          </div>

          <button
            onClick={clearCart}
            title="Clear Cart"
            className="p-1 text-rose-500 hover:text-rose-700 cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        {/* Selected Hotel Banner */}
        {currentHotel ? (
          <div className="bg-white p-3 rounded-xl border border-slate-200/80 flex items-center gap-2.5 shadow-2xs">
            <img
              src={currentHotel.image}
              alt={currentHotel.name}
              className="w-10 h-10 rounded-lg object-cover"
            />
            <div>
              <h4 className="font-extrabold text-slate-900 text-xs">
                {currentHotel.name}
              </h4>
              <p className="text-[10px] text-slate-500 font-medium">
                {currentHotel.zone}
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl flex items-center justify-between shadow-2xs">
            <span className="text-xs font-bold text-amber-800">No Hotel Selected</span>
            <button
              onClick={() => setCurrentScreen('ADD_HOTEL')}
              className="px-2.5 py-1 bg-[#15803d] text-white text-[10px] font-bold rounded-lg cursor-pointer"
            >
              + Add Hotel
            </button>
          </div>
        )}

        {/* Cart Item Rows */}
        <div className="space-y-2">
          {cart.map(item => (
            <div
              key={item.product.id}
              className="bg-white p-2.5 rounded-xl border border-slate-200/80 flex items-center justify-between shadow-2xs"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center p-1 flex-shrink-0 overflow-hidden shadow-2xs">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                </div>
                <div className="min-w-0">
                  <h5 className="font-extrabold text-slate-900 text-xs truncate">
                    {item.product.name}
                  </h5>
                  <p className="text-[10px] text-slate-500 font-medium">
                    ₹{item.product.price} / {item.product.unit}
                  </p>
                </div>
              </div>

              {/* Stepper + Subtotal */}
              <div className="flex items-center gap-3 flex-shrink-0">
                <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1">
                  <button
                    onClick={() => updateCartQty(item.product.id, item.quantity - 1)}
                    className="text-slate-600 hover:text-rose-600 p-0.5 cursor-pointer"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="text-xs font-bold text-slate-800 min-w-5 text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateCartQty(item.product.id, item.quantity + 1)}
                    className="text-slate-600 hover:text-emerald-700 p-0.5 cursor-pointer"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>

                <span className="font-extrabold text-xs text-slate-900 min-w-12 text-right">
                  ₹{item.product.price * item.quantity}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Delivery Preferences */}
        <div className="space-y-2.5 pt-1">
          {/* Delivery Date */}
          <div className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-emerald-700" />
              <div>
                <p className="text-[10px] text-slate-400 font-medium">Delivery Date</p>
                <p className="text-xs font-bold text-slate-800">{deliveryDate}</p>
              </div>
            </div>
          </div>

          {/* Time Slot */}
          <div className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs space-y-1.5">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-700" />
              <p className="text-[10px] text-slate-400 font-medium">Preferred Time Slot</p>
            </div>
            <div className="grid grid-cols-2 gap-1.5 pt-0.5">
              {timeSlots.map(slot => (
                <button
                  key={slot}
                  onClick={() => setTimeSlot(slot)}
                  className={`py-1.5 px-2 rounded-lg text-[10.5px] font-bold border transition-colors cursor-pointer ${
                    timeSlot === slot
                      ? 'bg-emerald-50 border-emerald-600 text-emerald-800'
                      : 'border-slate-200 bg-slate-50/60 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          {/* Note Input */}
          <div className="space-y-1">
            <label className="block text-[10.5px] font-bold text-slate-700">
              Add Note <span className="text-slate-400 font-normal">(Optional)</span>
            </label>
            <input
              type="text"
              placeholder="Any special request..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder:text-slate-400 focus:outline-emerald-600 shadow-2xs"
            />
          </div>
        </div>
      </div>

      {/* Bottom Bar: Total + Place Order */}
      <div className="bg-white border-t border-slate-100 p-4 space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-slate-600">Total Amount</span>
          <span className="text-lg font-black text-slate-900">₹{cartTotal}</span>
        </div>

        <button
          onClick={handlePlaceOrder}
          className="w-full py-3 bg-[#15803d] hover:bg-[#166534] text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};
