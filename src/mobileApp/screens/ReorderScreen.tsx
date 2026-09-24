import React, { useState, useEffect, useMemo } from 'react';
import {
  ArrowLeft,
  Minus,
  Plus,
  ShoppingCart,
  Building2,
  Calendar,
  Sparkles
} from 'lucide-react';
import { useJoinerApp, resolveProductImage, getProductImageFallback } from '../JoinerAppContext';
import type { MobileProduct, CartItem, MobileOrder } from '../JoinerAppContext';

export const ReorderScreen: React.FC = () => {
  const {
    selectedOrderForReorder,
    setCurrentScreen,
    setCartItems,
    selectedHotel,
    setSelectedHotel,
    hotels,
    products
  } = useJoinerApp();

  const order: MobileOrder = useMemo(() => {
    if (selectedOrderForReorder) return selectedOrderForReorder;
    return {
      id: '#FB1001',
      orderId: '#FB1001',
      hotelName: 'Hotel Spice Villa',
      hotelZone: 'Kharadi',
      date: 'Today',
      timeSlot: '6 AM - 8 AM',
      status: 'Delivered',
      amount: 450,
      hotelId: 'HT_101',
      items: []
    };
  }, [selectedOrderForReorder]);

  // Resolve reorder items from order or fallback products
  const reorderItems = useMemo<{ product: MobileProduct; defaultQty: number }[]>(() => {
    if (order?.items && order.items.length > 0) {
      return order.items.map((item: any) => {
        const itemId = item.id !== undefined ? item.id : item.productId;
        const matchedProduct = products.find(
          p => String(p.id) === String(itemId) || p.name.toLowerCase() === (item.name || item.productName || '').toLowerCase()
        );

        const prodName = matchedProduct?.name || item.name || item.productName || 'Produce Item';
        const prodCategory = matchedProduct?.category || item.category || 'Vegetables';
        const prodImage = matchedProduct?.image || resolveProductImage(prodName, prodCategory, item.image || item.imageUrl);
        const prodPrice = Number(matchedProduct?.price ?? item.price ?? item.salePrice ?? 30);
        const prodUnit = (matchedProduct?.unit || item.unit || 'kg').toLowerCase();

        const resolvedProduct: MobileProduct = {
          id: matchedProduct?.id || itemId || Date.now(),
          name: prodName,
          category: prodCategory,
          price: prodPrice,
          unit: prodUnit,
          image: prodImage,
          stock: matchedProduct?.stock ?? 100,
          isImported: matchedProduct?.isImported ?? item.isImported,
          originCountry: matchedProduct?.originCountry ?? item.originCountry,
          countryFlag: matchedProduct?.countryFlag ?? item.countryFlag
        };

        return {
          product: resolvedProduct,
          defaultQty: Number(item.quantity || item.qty || 1)
        };
      });
    }

    // Default fallback produce items if no previous items
    return products.slice(0, 4).map(p => ({
      product: {
        ...p,
        image: resolveProductImage(p.name, p.category, p.image)
      },
      defaultQty: 2
    }));
  }, [order, products]);

  // Quantities state indexed by product id
  const [quantities, setQuantities] = useState<{ [productId: string]: number }>({});

  // Synchronize initial quantities whenever reorderItems change
  useEffect(() => {
    const initialMap: { [productId: string]: number } = {};
    reorderItems.forEach(item => {
      initialMap[String(item.product.id)] = item.defaultQty || 1;
    });
    setQuantities(initialMap);
  }, [reorderItems]);

  const handleUpdateQty = (productId: number | string, delta: number) => {
    const key = String(productId);
    setQuantities(prev => {
      const current = prev[key] !== undefined ? prev[key] : 1;
      const next = Math.max(1, current + delta);
      return {
        ...prev,
        [key]: next
      };
    });
  };

  // Ensure hotel is selected for this reorder
  const ensureSelectedHotel = () => {
    if (order?.hotelName) {
      const matched = hotels.find(
        h => h.name.toLowerCase() === order.hotelName.toLowerCase() || (order.hotelId && h.id === order.hotelId)
      );
      if (matched) {
        setSelectedHotel(matched);
      } else if (!selectedHotel || selectedHotel.name !== order.hotelName) {
        setSelectedHotel({
          id: order.hotelId || `HT_${Date.now().toString().slice(-4)}`,
          name: order.hotelName,
          zone: order.hotelZone || 'Kharadi',
          status: 'Active',
          image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=100',
          orders: 1,
          contactPerson: 'Manager'
        });
      }
    }
  };

  const handleAddToCart = () => {
    ensureSelectedHotel();

    const itemsToAdd: CartItem[] = reorderItems
      .filter(item => Boolean(item.product))
      .map(item => ({
        product: item.product,
        quantity: quantities[String(item.product.id)] || item.defaultQty || 1
      }));

    if (itemsToAdd.length === 0) {
      alert('No items to reorder.');
      return;
    }

    setCartItems(itemsToAdd);
    setCurrentScreen('CART');
  };

  const totalCalculatedAmount = useMemo(() => {
    return reorderItems.reduce((sum, item) => {
      const qty = quantities[String(item.product.id)] || item.defaultQty || 1;
      return sum + item.product.price * qty;
    }, 0);
  }, [reorderItems, quantities]);

  return (
    <div className="flex flex-col h-full bg-slate-50 justify-between select-none">
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5 pb-6">
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setCurrentScreen('MY_ORDERS')}
              className="p-1.5 -ml-1.5 bg-white border border-slate-200 text-slate-700 hover:text-slate-900 rounded-xl cursor-pointer shadow-2xs"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h2 className="text-base font-black text-slate-900 leading-tight">Reorder Produce</h2>
              <p className="text-[10.5px] font-semibold text-slate-500">Adjust quantities and place repeat order</p>
            </div>
          </div>

          <span className="px-2 py-0.5 bg-emerald-50 text-[#15803d] border border-emerald-200 rounded-lg text-[10.5px] font-black flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> Quick Reorder
          </span>
        </div>

        {/* Order Info & Hotel Banner */}
        <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[#15803d] flex items-center justify-center font-bold text-xs">
                <Building2 className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-black text-xs text-slate-900">{order.hotelName || 'Partner Hotel'}</h4>
                <p className="text-[10px] text-slate-500 font-medium">{order.hotelZone || 'Kharadi Zone'}</p>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] font-black text-slate-900 font-mono block">
                {order.id || order.orderId || '#FB1001'}
              </span>
              <span className="text-[9px] px-1.5 py-0.5 rounded-md font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 inline-block mt-0.5">
                {order.status || 'Delivered'}
              </span>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-600 font-semibold">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>Original Date: {order.date || 'Today'}</span>
            </span>
            <span>{reorderItems.length} items</span>
          </div>
        </div>

        {/* Items List Heading */}
        <div className="flex items-center justify-between px-1">
          <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">
            Order Items ({reorderItems.length})
          </h3>
          <span className="text-[10.5px] text-slate-500 font-semibold">Customize Qty</span>
        </div>

        {/* Produce Items Cards */}
        <div className="space-y-2.5">
          {reorderItems.filter(item => Boolean(item.product)).map(({ product }) => {
            const qty = quantities[String(product.id)] !== undefined ? quantities[String(product.id)] : 1;
            const itemTotal = product.price * qty;

            return (
              <div
                key={String(product.id)}
                className="bg-white p-3 rounded-2xl border border-slate-200/90 flex items-center justify-between shadow-2xs hover:border-emerald-300 transition-all"
              >
                {/* Product Photo & Details */}
                <div className="flex items-center gap-3 min-w-0 flex-1 pr-2">
                  <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center p-0.5 shrink-0 overflow-hidden shadow-2xs relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover rounded-lg aspect-square"
                      loading="lazy"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = getProductImageFallback(product.name, product.category);
                      }}
                    />
                    {product.isImported && (
                      <span className="absolute bottom-0 right-0 text-[10px] bg-white/90 px-0.5 rounded shadow-2xs">
                        {product.countryFlag || '🌍'}
                      </span>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <h5 className="font-black text-slate-900 text-xs truncate leading-tight">
                        {product.name}
                      </h5>
                      {product.isImported && (
                        <span className="text-[8.5px] px-1 py-0.2 bg-blue-50 text-blue-700 font-bold rounded border border-blue-200">
                          {product.originCountry || 'Imported'}
                        </span>
                      )}
                    </div>
                    <p className="text-[11.5px] text-emerald-800 font-black mt-0.5">
                      ₹{product.price} <span className="text-slate-400 font-normal text-[10.5px]">/ {product.unit}</span>
                    </p>
                    <p className="text-[10px] text-slate-400 font-medium">
                      Subtotal: <strong className="text-slate-800">₹{itemTotal}</strong>
                    </p>
                  </div>
                </div>

                {/* + / - Stepper */}
                <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-xl px-2 py-1 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleUpdateQty(product.id, -1)}
                    className="w-6 h-6 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 flex items-center justify-center cursor-pointer active:scale-95 transition-all"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="text-xs font-black text-slate-900 min-w-6 text-center">
                    {qty}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleUpdateQty(product.id, 1)}
                    className="w-6 h-6 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center cursor-pointer active:scale-95 transition-all shadow-2xs"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Sticky Action Bar */}
      <div className="bg-white border-t border-slate-200 p-4 shadow-lg space-y-2">
        <div className="flex items-center justify-between text-xs">
          <div>
            <span className="text-[11px] font-bold text-slate-500 block leading-tight">Total Estimated Amount</span>
            <span className="text-[10px] text-emerald-700 font-semibold">({reorderItems.length} items selected)</span>
          </div>
          <span className="text-xl font-black text-slate-900">₹{totalCalculatedAmount}</span>
        </div>

        <button
          type="button"
          onClick={handleAddToCart}
          className="w-full py-3 bg-[#15803d] hover:bg-[#166534] active:scale-[0.99] text-white font-black text-xs rounded-2xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
        >
          <ShoppingCart className="w-4 h-4" />
          <span>Proceed to Cart & Checkout</span>
        </button>
      </div>
    </div>
  );
};
