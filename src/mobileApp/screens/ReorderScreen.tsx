import React, { useState } from 'react';
import { ArrowLeft, Minus, Plus } from 'lucide-react';
import { useJoinerApp } from '../JoinerAppContext';

export const ReorderScreen: React.FC = () => {
  const {
    selectedOrderForReorder,
    setCurrentScreen,
    updateCartQty,
    products
  } = useJoinerApp();

  const [quantities, setQuantities] = useState<{ [productId: number]: number }>({
    1: 10, // Tomato
    2: 5,  // Onion
    3: 10, // Potato
    4: 2   // Green Chilli
  });

  const order = selectedOrderForReorder || {
    id: '#FB1001',
    hotelName: 'Hotel Spice Villa',
    date: '12 Sep 2026',
    status: 'Delivered'
  };

  const reorderItems = [
    { product: products[0], defaultQty: 10 },
    { product: products[1], defaultQty: 5 },
    { product: products[2], defaultQty: 10 },
    { product: products[3], defaultQty: 2 }
  ];

  const handleUpdateQty = (productId: number, delta: number) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: Math.max(1, (prev[productId] || 1) + delta)
    }));
  };

  const handleAddToCart = () => {
    reorderItems.forEach(item => {
      updateCartQty(item.product.id, quantities[item.product.id] || item.defaultQty);
    });
    setCurrentScreen('CART');
  };

  return (
    <div className="flex flex-col h-full bg-slate-50 justify-between select-none">
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5 pb-6">
        {/* Top Header */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setCurrentScreen('MY_ORDERS')}
            className="p-1 -ml-1 text-slate-700 hover:text-slate-900 cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-base font-extrabold text-slate-900">Reorder</h2>
        </div>

        {/* Order Banner */}
        <div className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs space-y-1">
          <div className="flex items-center justify-between">
            <h4 className="font-extrabold text-xs text-slate-900 font-mono">
              Order {order.id}
            </h4>
            <span className="text-[9.5px] px-2 py-0.5 rounded-md font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200">
              {order.status}
            </span>
          </div>
          <p className="text-[10px] text-slate-500 font-medium">
            {order.date} • {order.status}
          </p>
        </div>

        {/* Items List */}
        <div className="space-y-2">
          {reorderItems.map(({ product }) => {
            const qty = quantities[product.id] || 1;

            return (
              <div
                key={product.id}
                className="bg-white p-2.5 rounded-xl border border-slate-200/80 flex items-center justify-between shadow-2xs"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center p-1 flex-shrink-0 overflow-hidden shadow-2xs">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                  </div>
                  <div className="min-w-0">
                    <h5 className="font-extrabold text-slate-900 text-xs">
                      {product.name}
                    </h5>
                    <p className="text-[10px] text-slate-500 font-medium">
                      ₹{product.price} / {product.unit}
                    </p>
                  </div>
                </div>

                {/* Stepper */}
                <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-2 py-1">
                  <button
                    onClick={() => handleUpdateQty(product.id, -1)}
                    className="text-slate-600 hover:text-rose-600 p-0.5 cursor-pointer"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="text-xs font-bold text-slate-800 min-w-5 text-center">
                    {qty}
                  </span>
                  <button
                    onClick={() => handleUpdateQty(product.id, 1)}
                    className="text-slate-600 hover:text-emerald-700 p-0.5 cursor-pointer"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Button */}
      <div className="bg-white border-t border-slate-100 p-4">
        <button
          onClick={handleAddToCart}
          className="w-full py-3 bg-[#15803d] hover:bg-[#166534] text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};
