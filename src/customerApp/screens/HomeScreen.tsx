import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  ArrowRight,
  Flame,
  ShoppingBag,
  ShieldCheck,
  Clock,
  Zap,
  TrendingUp,
  Percent,
  ChevronRight
} from 'lucide-react';
import { useCustomerApp } from '../CustomerAppContext';
import { CustomerHeader } from '../components/CustomerHeader';
import { CustomerProductCard } from '../components/CustomerProductCard';

export const HomeScreen: React.FC = () => {
  const {
    products,
    setCurrentScreen,
    setSelectedCategory,
    setSelectedSubCategory,
    cart,
    itemTotal
  } = useCustomerApp();

  const [activeBanner, setActiveBanner] = useState(0);
  const [liveTickerIndex, setLiveTickerIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 34, seconds: 12 });

  // Blinkit Live Social Proof Ticker Messages
  const liveTickers = [
    { text: '38 families in Kharadi ordered fresh veggies in last 10 mins', icon: '🔥' },
    { text: 'Ratnagiri Alphonso Mangoes restocked directly from orchards', icon: '🥭' },
    { text: '100% Chemical-free spinach harvested at 4 AM today', icon: '🥬' },
    { text: 'Free Delivery on orders above ₹199 | Arrives in 10-12 Mins', icon: '⚡' }
  ];

  // Auto-cycle live ticker every 3.2s
  useEffect(() => {
    const tickerTimer = setInterval(() => {
      setLiveTickerIndex(prev => (prev + 1) % liveTickers.length);
    }, 3200);
    return () => clearInterval(tickerTimer);
  }, [liveTickers.length]);

  // Auto-cycle banners every 3.6s
  useEffect(() => {
    const bannerTimer = setInterval(() => {
      setActiveBanner(prev => (prev + 1) % 4);
    }, 3600);
    return () => clearInterval(bannerTimer);
  }, []);

  // Ticking countdown clock
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 2, minutes: 45, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Circular Category Stories matching Blinkit UI
  const categoryStories = [
    { id: 'All', name: 'All Store', emoji: '🌟', badge: 'ALL', color: 'from-amber-400 to-orange-500' },
    { id: 'Fruits', name: 'Fruits', emoji: '🍎', badge: 'FRESH', color: 'from-rose-400 to-red-500' },
    { id: 'Vegetables', name: 'Veggies', emoji: '🥦', badge: 'HOT', color: 'from-emerald-400 to-green-600' },
    { id: 'Leafy Greens', name: 'Leafies', emoji: '🥬', badge: 'FARM', color: 'from-green-400 to-teal-600' },
    { id: 'Exotic Veggies', name: 'Exotic', emoji: '✈️', badge: 'NEW', color: 'from-blue-400 to-indigo-600' },
    { id: 'Herbs & Seasoning', name: 'Herbs', emoji: '🌿', badge: 'PURE', color: 'from-lime-400 to-emerald-600' },
    { id: 'Dal & Pulses', name: 'Dal/Staple', emoji: '🌾', badge: 'BEST', color: 'from-amber-400 to-yellow-600' },
    { id: 'Dairy & Supplies', name: 'Dairy', emoji: '🧀', badge: 'DAILY', color: 'from-orange-400 to-amber-600' }
  ];

  // Filter fresh fruits and seasonal vegetables
  const freshFruits = products.filter(p => p.category === 'Fruits' || p.category === 'Citrus & Melons');
  const importedFruits = products.filter(p => p.isImported && (p.category === 'Fruits' || p.category === 'Exotic Veggies'));
  const freshVeggies = products.filter(p => p.category === 'Vegetables' || p.category === 'Root Veggies' || p.category === 'Leafy Greens');

  // Flash deals selection
  const flashDeals = products.slice(0, 6);

  const banners = [
    {
      title: 'BIG SAVINGS ALERT! FLAT 50% OFF',
      discount: 'PRE-ORDER HARVEST SPECIAL',
      subtitle: 'Flat 50% off on all premium farm-fresh fruits!',
      bg: 'from-[#dcfce7] via-[#ecfdf5] to-[#ffffff]',
      tag: 'PRE-ORDER DEAL',
      image: '/slider/slider_fruit_basket.jpg',
      badgeColor: 'bg-[#15803d] text-white'
    },
    {
      title: 'CRISP SHIMLA ROYAL APPLES',
      discount: 'FRESH HILL PRE-ORDER',
      subtitle: 'Sweet ruby red mountain apples with rich crunch',
      bg: 'from-[#ffe4e6] via-[#fff1f2] to-[#ffffff]',
      tag: 'FRESH HARVEST',
      image: '/slider/slider_apple.jpg',
      badgeColor: 'bg-rose-600 text-white'
    },
    {
      title: 'SWEET ORGANIC FARM CHIKOO',
      discount: 'ORCHARD PRE-ORDER',
      subtitle: 'Caramel-sweet naturally tree-ripened sapodilla',
      bg: 'from-[#fef3c7] via-[#fef9c3] to-[#ffffff]',
      tag: 'PRE-ORDER ONLY',
      image: '/slider/slider_chikoo.jpg',
      badgeColor: 'bg-amber-700 text-white'
    },
    {
      title: 'GOLDEN RIPE YELAKKI BANANAS',
      discount: 'DAILY PRE-ORDER SPECIAL',
      subtitle: 'Naturally sweet farm-harvested energy bunch',
      bg: 'from-[#ecfccb] via-[#f7fee7] to-[#ffffff]',
      tag: 'SEASON SPECIAL',
      image: '/slider/slider_banana.jpg',
      badgeColor: 'bg-emerald-700 text-white'
    },
    {
      title: 'CREAMY ORGANIC SITAPHAL',
      discount: 'LIMITED PRE-ORDER HARVEST',
      subtitle: 'Direct from organic orchards • Rich pulp',
      bg: 'from-[#e0e7ff] via-[#eef2ff] to-[#ffffff]',
      tag: 'SPECIAL HARVEST',
      image: '/products/sitaphal.jpg',
      badgeColor: 'bg-indigo-700 text-white'
    }
  ];

  const handleCategoryClick = (catId: string) => {
    setSelectedCategory(catId);
    setSelectedSubCategory('All');
    setCurrentScreen('PRODUCT_LISTING');
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const freeDeliveryThreshold = 199;
  const freeDeliveryRemaining = Math.max(0, freeDeliveryThreshold - itemTotal);

  return (
    <div className="flex flex-col h-full bg-[#f8faf8] overflow-y-auto no-scrollbar relative">
      {/* Top Header with Search, Notification & Wishlist (Syncs dynamically with active slider slide) */}
      <CustomerHeader showSearch bgGradient={banners[activeBanner].bg} />

      {/* 1. Full-Width Hero Promo Banner Slider (Flush with Header, No Top Gap, Light Sunlit Theme) */}
      <div className="w-full relative overflow-hidden shrink-0 group border-b border-emerald-100/60">
        <div className={`p-4 bg-gradient-to-r ${banners[activeBanner].bg} text-slate-900 flex items-center justify-between min-h-[148px] relative transition-all duration-500`}>
          <div className="space-y-1.5 z-10 max-w-[60%] pl-1">
            <div className="flex items-center gap-1.5">
              <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-white/90 text-emerald-900 border border-emerald-200/80 shadow-2xs">
                {banners[activeBanner].tag}
              </span>
              <span className="text-[9px] font-black uppercase px-1.5 py-0.5 rounded bg-emerald-600 text-white flex items-center gap-0.5 shadow-2xs">
                <Zap className="w-2.5 h-2.5 fill-current" /> PRE-ORDER
              </span>
            </div>

            <h3 className="font-black text-sm text-slate-900 tracking-tight leading-snug">
              {banners[activeBanner].title}
            </h3>

            <div className={`inline-block ${banners[activeBanner].badgeColor} font-black text-xs px-2 py-0.5 rounded-md shadow-xs`}>
              {banners[activeBanner].discount}
            </div>

            <p className="text-[10px] text-slate-600 font-bold leading-tight">
              {banners[activeBanner].subtitle}
            </p>
          </div>

          {/* Banner Image with subtle hover zoom */}
          <div className="w-28 h-28 rounded-2xl overflow-hidden shadow-lg border-2 border-white shrink-0 transform group-hover:scale-105 transition-transform duration-300 bg-white mr-1">
            <img
              src={banners[activeBanner].image}
              alt="Banner produce"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Carousel Progress Dots */}
        <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20">
          {banners.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveBanner(i)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                activeBanner === i ? 'w-5 bg-emerald-700 shadow-xs' : 'w-1.5 bg-slate-300'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="p-3.5 space-y-4 pb-20">
        {/* 2. High-Impact Pre-Order Notice Highlight Card (Light Clean Garden Theme) */}
        <div className="bg-white rounded-2xl p-3.5 text-slate-900 shadow-xs flex items-center justify-between border border-emerald-200/90">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center font-black text-xl shrink-0 shadow-2xs">
              🌱
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-xs uppercase tracking-wide text-emerald-900">
                  ALL ORDERS ARE PRE-ORDER
                </span>
                <span className="text-[8.5px] bg-emerald-100 text-emerald-800 font-black px-1.5 py-0.2 rounded-full uppercase border border-emerald-300/80">
                  100% Farm Fresh
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-medium leading-tight mt-0.5">
                Harvested on-demand after you order & delivered fresh tomorrow morning!
              </p>
            </div>
          </div>
        </div>

        {/* 3. Blinkit Circular Category "Stories" Bar */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between px-1">
            <h3 className="font-extrabold text-xs text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <span>Explore Categories</span>
            </h3>
            <button
              onClick={() => setCurrentScreen('CATEGORIES')}
              className="text-[11px] font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-0.5 cursor-pointer"
            >
              <span>View All</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-1 px-1">
            {categoryStories.map(cat => (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                className="flex flex-col items-center gap-1 text-center shrink-0 cursor-pointer group active:scale-95 transition-transform"
              >
                {/* Outer animated gradient ring */}
                <div className="relative p-0.5 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 animate-glow-border group-hover:scale-105 transition-transform shadow-xs">
                  <div className="w-13 h-13 rounded-full bg-white flex items-center justify-center text-xl shadow-inner relative">
                    <span className="group-hover:scale-110 transition-transform">{cat.emoji}</span>
                    <span className="absolute -top-1 -right-1 text-[8px] font-black bg-rose-500 text-white px-1 py-0.2 rounded-full border border-white uppercase shadow-xs">
                      {cat.badge}
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-slate-700 max-w-[56px] truncate group-hover:text-emerald-800">
                  {cat.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* 3. Blinkit Flash Deals & Countdown Strip */}
        <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 rounded-2xl p-3 text-white shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center font-bold text-sm">
              ⚡
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-xs tracking-tight uppercase text-white">Harvest Flash Deals</span>
                <span className="text-[9px] bg-white text-rose-700 font-extrabold px-1.5 py-0.2 rounded-full">
                  SAVE 40%
                </span>
              </div>
              <p className="text-[10px] text-white/90 font-medium">Deals refresh daily at 4 AM</p>
            </div>
          </div>

          {/* Live Countdown Timer */}
          <div className="flex items-center gap-1 text-[11px] font-mono font-bold bg-black/30 backdrop-blur-xs px-2.5 py-1 rounded-lg">
            <Clock className="w-3 h-3 text-yellow-300 animate-spin" style={{ animationDuration: '6s' }} />
            <span>
              {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* 4. Flash Deals Horizontal Scroll List */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="text-base">🔥</span>
              <h3 className="font-black text-sm text-slate-900 tracking-tight">Steal Deals of the Day</h3>
            </div>
            <button
              onClick={() => handleCategoryClick('Vegetables')}
              className="text-xs font-bold text-emerald-700 hover:text-emerald-900 cursor-pointer"
            >
              See All
            </button>
          </div>

          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-2 pt-1">
            {flashDeals.map(p => (
              <div key={p.id} className="w-38 shrink-0 transform hover:-translate-y-1 transition-transform">
                <CustomerProductCard product={p} layout="vertical" />
              </div>
            ))}
          </div>
        </div>

        {/* 5. Imported & Exotic Fruits Section */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-black text-sm text-slate-900 tracking-tight flex items-center gap-1.5">
                <span>✈️ Imported & Exotic Fruits</span>
              </h3>
              <p className="text-[10px] text-slate-400 font-medium">Direct orchard imports with Grade-A certification</p>
            </div>
            <button
              onClick={() => handleCategoryClick('Fruits')}
              className="text-xs font-bold text-emerald-700 hover:text-emerald-900 cursor-pointer"
            >
              See All
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {importedFruits.slice(0, 4).map(p => (
              <CustomerProductCard key={p.id} product={p} layout="vertical" />
            ))}
          </div>
        </div>

        {/* 6. Farm Fresh Fruits */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-black text-sm text-slate-900 tracking-tight flex items-center gap-1.5">
                <span>🍎 Farm Fresh Fruits</span>
              </h3>
              <p className="text-[10px] text-slate-400 font-medium">Sweet, juicy & naturally carbide-free</p>
            </div>
            <button
              onClick={() => handleCategoryClick('Fruits')}
              className="text-xs font-bold text-emerald-700 hover:text-emerald-900 cursor-pointer"
            >
              See All ({freshFruits.length})
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {freshFruits.slice(0, 6).map(p => (
              <CustomerProductCard key={p.id} product={p} layout="vertical" />
            ))}
          </div>
        </div>

        {/* 7. Daily Fresh Vegetables */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-black text-sm text-slate-900 tracking-tight flex items-center gap-1.5">
                <span>🥦 Daily Fresh Vegetables</span>
              </h3>
              <p className="text-[10px] text-slate-400 font-medium">Morning harvested table staples</p>
            </div>
            <button
              onClick={() => handleCategoryClick('Vegetables')}
              className="text-xs font-bold text-emerald-700 hover:text-emerald-900 cursor-pointer"
            >
              See All ({freshVeggies.length})
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {freshVeggies.slice(0, 6).map(p => (
              <CustomerProductCard key={p.id} product={p} layout="vertical" />
            ))}
          </div>
        </div>

        {/* 8. Blinkit Trust Guarantee Banner */}
        <div className="bg-gradient-to-br from-emerald-900 via-teal-900 to-emerald-950 text-white rounded-2xl p-4 shadow-sm space-y-2 border border-emerald-700/50">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-300" />
            <h4 className="font-black text-xs text-white">FarmerBoxs 100% Quality & Freshness Guarantee</h4>
          </div>
          <p className="text-[11px] text-emerald-100/90 leading-relaxed">
            Every apple, tomato, and leafy bunch is hand-graded for quality. Instant replacement or refund if you aren't delighted!
          </p>
          <div className="pt-2 flex items-center justify-between border-t border-emerald-800/80 text-[10px] font-bold text-emerald-300">
            <span>⚡ 10 Min Delivery</span>
            <span>🌱 Farm-Sourced</span>
            <span>🔒 Secure Checkout</span>
          </div>
        </div>
      </div>

      {/* 9. Signature Sticky Floating Cart Bar (Strictly inside mobile container) */}
      {totalCartCount > 0 && (
        <div className="sticky bottom-2 mx-3.5 mb-2 z-40 animate-slide-up-cart">
          <div
            onClick={() => setCurrentScreen('CART')}
            className="bg-emerald-700 hover:bg-emerald-800 text-white p-3 rounded-2xl shadow-xl flex items-center justify-between cursor-pointer border border-emerald-500/80 transition-all active:scale-98"
          >
            {/* Cart items count & price info */}
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-white text-emerald-800 flex items-center justify-center font-extrabold relative shadow-xs">
                <ShoppingBag className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-black flex items-center justify-center">
                  {totalCartCount}
                </span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-black text-xs text-white">₹{itemTotal}</span>
                  <span className="text-[10px] text-emerald-200">({totalCartCount} {totalCartCount === 1 ? 'item' : 'items'})</span>
                </div>
                <p className="text-[9px] text-emerald-100 font-medium">
                  {freeDeliveryRemaining > 0
                    ? `Add ₹${freeDeliveryRemaining} more for FREE Delivery 🚚`
                    : '🎉 FREE Instant Delivery Applied!'}
                </p>
              </div>
            </div>

            {/* View Cart Button */}
            <div className="flex items-center gap-1 px-3 py-1.5 bg-yellow-400 hover:bg-yellow-300 text-slate-950 rounded-xl font-black text-xs shadow-xs transition-transform group">
              <span>View Cart</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
