import React, { useState, useMemo } from 'react';
import { 
  ArrowLeft, 
  Search, 
  ChevronRight, 
  LayoutGrid, 
  Columns2, 
  Sparkles, 
  SlidersHorizontal,
  Layers,
  Flame,
  Zap,
  ShoppingBag,
  Plus,
  Minus,
  Check
} from 'lucide-react';
import { useCustomerApp } from '../CustomerAppContext';
import { CustomerProductCard } from '../components/CustomerProductCard';
import type { Product } from '../../types';

export type CategoryViewStyle = 'split' | 'bento' | 'banner' | 'list';

interface CategoryMeta {
  id: string;
  name: string;
  shortName: string;
  subtitle: string;
  emoji: string;
  image: string;
  badge?: string;
  discountBadge?: string;
  popularItems: string[];
  bg: string;
  accentBg: string;
  border: string;
  textColor: string;
}

export const CategoriesScreen: React.FC = () => {
  const {
    products,
    setSelectedCategory,
    setSelectedSubCategory,
    setCurrentScreen,
    cart,
    addToCart,
    updateCartQty
  } = useCustomerApp();

  const [viewStyle, setViewStyle] = useState<CategoryViewStyle>(() => {
    return (localStorage.getItem('farmerbox_category_view_style') as CategoryViewStyle) || 'split';
  });
  const [selectedSideCat, setSelectedSideCat] = useState<string>('Fruits');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSubFilter, setActiveSubFilter] = useState<string>('All');

  const handleStyleChange = (style: CategoryViewStyle) => {
    setViewStyle(style);
    localStorage.setItem('farmerbox_category_view_style', style);
  };

  const categories: CategoryMeta[] = useMemo(() => [
    {
      id: 'Fruits',
      name: 'Fresh Farm Fruits',
      shortName: 'Fruits',
      subtitle: 'Sweet, juicy, carbide-free orchard harvest',
      emoji: '🍎',
      image: '/images/categories/fresh_fruits.jpg',
      badge: 'POPULAR',
      discountBadge: 'UP TO 35% OFF',
      popularItems: ['Shimla Apple', 'Yelakki Banana', 'Alphonso Mango', 'Kiwi'],
      bg: 'from-orange-500/10 to-rose-500/10',
      accentBg: 'bg-rose-500',
      border: 'border-orange-200/80',
      textColor: 'text-rose-900'
    },
    {
      id: 'Vegetables',
      name: 'Daily Fresh Veggies',
      shortName: 'Vegetables',
      subtitle: 'Daily essentials harvested at 4 AM',
      emoji: '🥦',
      image: '/images/categories/vegetables.jpg',
      badge: 'FARM FRESH',
      discountBadge: 'FLAT 25% OFF',
      popularItems: ['Red Onion', 'Farm Tomato', 'Baby Potato', 'Crisp Capsicum'],
      bg: 'from-emerald-500/10 to-green-500/10',
      accentBg: 'bg-emerald-600',
      border: 'border-emerald-200/80',
      textColor: 'text-emerald-950'
    },
    {
      id: 'Leafy Greens',
      name: 'Hydro & Leafy Greens',
      shortName: 'Leafy Greens',
      subtitle: 'Crisp spinach, methi, palak, coriander',
      emoji: '🥬',
      image: '/products/spinach.jpg',
      badge: 'ORGANIC',
      discountBadge: 'FRESH HARVEST',
      popularItems: ['Baby Palak', 'Kasturi Methi', 'Fresh Coriander', 'Mint Leaves'],
      bg: 'from-teal-500/10 to-emerald-500/10',
      accentBg: 'bg-teal-600',
      border: 'border-teal-200/80',
      textColor: 'text-teal-950'
    },
    {
      id: 'Herbs & Seasoning',
      name: 'Herbs & Seasoning',
      shortName: 'Herbs',
      subtitle: 'Aromatic ginger, garlic, chillies & fresh herbs',
      emoji: '🌿',
      image: '/images/categories/herbs_spices.jpg',
      badge: 'ESSENTIAL',
      discountBadge: 'HOT DEALS',
      popularItems: ['Ooty Ginger', 'Garlic Bulbs', 'Guntur Chillies', 'Curry Leaves'],
      bg: 'from-lime-500/10 to-green-500/10',
      accentBg: 'bg-lime-600',
      border: 'border-lime-200/80',
      textColor: 'text-lime-950'
    },
    {
      id: 'Dal & Pulses',
      name: 'Dal, Pulses & Grains',
      shortName: 'Pulses',
      subtitle: 'Unpolished protein-rich pulses & grains',
      emoji: '🌾',
      image: '/images/categories/dal_pulses.jpg',
      badge: 'STAPLE',
      discountBadge: 'BEST VALUE',
      popularItems: ['Toor Dal', 'Moong Dal', 'Kabuli Chana', 'Urad Dal'],
      bg: 'from-amber-500/10 to-yellow-500/10',
      accentBg: 'bg-amber-600',
      border: 'border-amber-200/80',
      textColor: 'text-amber-950'
    },
    {
      id: 'Exotic Veggies',
      name: 'Exotic & Global Produce',
      shortName: 'Exotic',
      subtitle: 'Avocados, broccoli, asparagus & imported fruits',
      emoji: '✈️',
      image: '/images/categories/exotic_global.jpg',
      badge: 'PREMIUM',
      discountBadge: 'SAVE 30%',
      popularItems: ['Hass Avocado', 'Green Broccoli', 'Dragon Fruit', 'Baby Corn'],
      bg: 'from-indigo-500/10 to-purple-500/10',
      accentBg: 'bg-indigo-600',
      border: 'border-indigo-200/80',
      textColor: 'text-indigo-950'
    },
    {
      id: 'Dairy & Supplies',
      name: 'Dairy, Eggs & Breakfast',
      shortName: 'Dairy',
      subtitle: 'Artisanal paneer, A2 farm milk & country eggs',
      emoji: '🧀',
      image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400',
      badge: 'DAILY',
      discountBadge: 'MORNING FRESH',
      popularItems: ['Malai Paneer', 'Free-range Eggs', 'Desi Cow Milk', 'Fresh Curd'],
      bg: 'from-amber-500/10 to-orange-500/10',
      accentBg: 'bg-amber-600',
      border: 'border-amber-200/80',
      textColor: 'text-amber-950'
    },
    {
      id: 'Organic & Natural',
      name: 'Organic Certified Harvest',
      shortName: 'Organic',
      subtitle: 'Zero-chemical certified organic crops',
      emoji: '🌱',
      image: '/products/ladyfinger.jpg',
      badge: '100% PURE',
      discountBadge: 'CERTIFIED',
      popularItems: ['Organic Ladyfinger', 'Organic Tomatoes', 'Organic Lemons', 'Moringa'],
      bg: 'from-emerald-500/10 to-teal-500/10',
      accentBg: 'bg-emerald-700',
      border: 'border-emerald-200/80',
      textColor: 'text-emerald-950'
    }
  ], []);

  // Helper to count products per category
  const getCategoryCount = (catId: string) => {
    if (catId === 'Fruits') return products.filter(p => p.category === 'Fruits' || p.category === 'Citrus & Melons').length || 14;
    if (catId === 'Vegetables') return products.filter(p => p.category === 'Vegetables' || p.category === 'Root Veggies' || p.category === 'Gourds & Squashes').length || 22;
    if (catId === 'Leafy Greens') return products.filter(p => p.category === 'Leafy Greens').length || 8;
    if (catId === 'Herbs & Seasoning') return products.filter(p => p.category === 'Herbs & Seasoning' || p.category === 'Chillies & Peppers').length || 7;
    if (catId === 'Dal & Pulses') return products.filter(p => p.category === 'Dal & Pulses').length || 9;
    if (catId === 'Exotic Veggies') return products.filter(p => p.category === 'Exotic Veggies' || p.isImported).length || 6;
    if (catId === 'Dairy & Supplies') return products.filter(p => p.category === 'Dairy & Supplies').length || 5;
    return products.filter(p => p.category.toLowerCase().includes(catId.toLowerCase())).length || 10;
  };

  // Products belonging to the currently active split side category
  const activeSideProducts = useMemo(() => {
    let list = products.filter(p => {
      if (selectedSideCat === 'Fruits') return p.category === 'Fruits' || p.category === 'Citrus & Melons';
      if (selectedSideCat === 'Vegetables') return p.category === 'Vegetables' || p.category === 'Root Veggies' || p.category === 'Gourds & Squashes';
      if (selectedSideCat === 'Leafy Greens') return p.category === 'Leafy Greens';
      if (selectedSideCat === 'Herbs & Seasoning') return p.category === 'Herbs & Seasoning' || p.category === 'Chillies & Peppers';
      if (selectedSideCat === 'Dal & Pulses') return p.category === 'Dal & Pulses';
      if (selectedSideCat === 'Exotic Veggies') return p.category === 'Exotic Veggies' || p.isImported;
      if (selectedSideCat === 'Dairy & Supplies') return p.category === 'Dairy & Supplies';
      return p.category.toLowerCase().includes(selectedSideCat.toLowerCase());
    });

    if (activeSubFilter !== 'All') {
      list = list.filter(p => p.name.toLowerCase().includes(activeSubFilter.toLowerCase()));
    }

    if (searchQuery.trim()) {
      list = list.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    return list;
  }, [products, selectedSideCat, activeSubFilter, searchQuery]);

  // Sub-categories for active side category
  const activeSubCategories = useMemo(() => {
    const currentMeta = categories.find(c => c.id === selectedSideCat);
    return ['All', ...(currentMeta?.popularItems || [])];
  }, [categories, selectedSideCat]);

  // Filtered categories for full-view modes (Bento, Banner, List)
  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return categories;
    const query = searchQuery.toLowerCase();
    return categories.filter(c => 
      c.name.toLowerCase().includes(query) || 
      c.subtitle.toLowerCase().includes(query) ||
      c.popularItems.some(item => item.toLowerCase().includes(query))
    );
  }, [categories, searchQuery]);

  const handleSelectCategory = (catId: string, subCategory: string = 'All') => {
    setSelectedCategory(catId);
    setSelectedSubCategory(subCategory);
    setCurrentScreen('PRODUCT_LISTING');
  };

  const activeCategoryMeta = categories.find(c => c.id === selectedSideCat) || categories[0];

  return (
    <div className="flex flex-col h-full bg-[#f8faf8] overflow-hidden select-none">
      {/* 1. Top Header */}
      <div className="bg-[#15803d] text-white px-3.5 py-2.5 flex items-center justify-between shrink-0 shadow-sm z-20">
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setCurrentScreen('HOME')}
            className="p-1.5 rounded-xl hover:bg-emerald-800 text-white transition-colors cursor-pointer"
            title="Back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-base font-black tracking-tight leading-tight">Explore Categories</h2>
            <p className="text-[10px] text-emerald-100 font-medium">8 Fresh Collections • Farm Sourced</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setCurrentScreen('SEARCH')}
            className="p-2 rounded-xl bg-emerald-800/80 hover:bg-emerald-800 text-white transition-colors cursor-pointer"
            title="Search Products"
          >
            <Search className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. Interactive Style Switcher Segmented Control */}
      <div className="bg-white px-3 py-2 border-b border-slate-200/80 flex items-center justify-between gap-2 shrink-0 z-10">
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider pl-1 mr-1 hidden sm:inline">
            Style:
          </span>

          {[
            { id: 'split', label: '⚡ Split Rail', icon: Columns2, desc: 'Blinkit 2-Pane' },
            { id: 'bento', label: '✨ Bento Grid', icon: LayoutGrid, desc: '3D Modern Tiles' },
            { id: 'banner', label: '🖼️ Hero Banners', icon: Layers, desc: 'Wide Photo Cards' },
            { id: 'list', label: '📋 Clean List', icon: SlidersHorizontal, desc: 'Compact Quick View' }
          ].map(style => {
            const Icon = style.icon;
            const isActive = viewStyle === style.id;
            return (
              <button
                key={style.id}
                onClick={() => handleStyleChange(style.id as CategoryViewStyle)}
                className={`px-2.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-[#15803d] text-white shadow-xs scale-[1.02]'
                    : 'bg-slate-100/80 text-slate-600 hover:bg-slate-200/70 hover:text-slate-900'
                }`}
                title={style.desc}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{style.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Search Bar for Fast Lookup */}
      <div className="px-3 pt-2 pb-1 bg-white shrink-0">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder={viewStyle === 'split' ? `Search in ${activeCategoryMeta.shortName}...` : "Search all categories or items..."}
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-8 py-2 bg-slate-100 text-xs rounded-xl border border-slate-200/80 focus:bg-white focus:border-emerald-500 focus:outline-hidden transition-all text-slate-800 placeholder:text-slate-400 font-medium"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-slate-300 text-slate-700 flex items-center justify-center text-[10px] font-bold cursor-pointer"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* =========================================================
          VIEW STYLE 1: SPLIT 2-PANE SIDE-RAIL EXPLORER (Zepto/Blinkit)
         ========================================================= */}
      {viewStyle === 'split' && (
        <div className="flex-1 flex overflow-hidden">
          {/* Left Vertical Category Rail */}
          <div className="w-[84px] sm:w-[94px] bg-[#f1f5f2] border-r border-slate-200/80 overflow-y-auto no-scrollbar flex flex-col py-1.5 shrink-0">
            {categories.map(cat => {
              const isSelected = selectedSideCat === cat.id;
              const count = getCategoryCount(cat.id);
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedSideCat(cat.id);
                    setActiveSubFilter('All');
                  }}
                  className={`relative py-3 px-1.5 flex flex-col items-center text-center transition-all cursor-pointer border-b border-slate-200/40 ${
                    isSelected
                      ? 'bg-white shadow-2xs font-black text-slate-900'
                      : 'text-slate-500 hover:bg-slate-200/50 hover:text-slate-800'
                  }`}
                >
                  {/* Active Left Indicator Bar */}
                  {isSelected && (
                    <div className="absolute left-0 top-1.5 bottom-1.5 w-1.5 bg-[#15803d] rounded-r-full shadow-xs" />
                  )}

                  {/* Icon / Image thumbnail */}
                  <div className={`w-11 h-11 rounded-2xl overflow-hidden p-0.5 relative mb-1.5 transition-transform ${
                    isSelected ? 'scale-105 ring-2 ring-emerald-600/30' : 'opacity-85'
                  }`}>
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover rounded-xl"
                    />
                    <span className="absolute -bottom-1 -right-1 text-xs">{cat.emoji}</span>
                  </div>

                  <span className={`text-[10.5px] leading-tight max-w-[72px] line-clamp-2 ${
                    isSelected ? 'font-black text-emerald-950' : 'font-bold'
                  }`}>
                    {cat.shortName}
                  </span>

                  <span className="text-[9px] font-semibold text-slate-400 mt-0.5">
                    {count} items
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Content Area: Active Category Header + Subcategories Chips + Products */}
          <div className="flex-1 flex flex-col overflow-y-auto no-scrollbar bg-[#f8faf8]">
            {/* Active Category Hero Header */}
            <div className={`p-3 bg-gradient-to-r ${activeCategoryMeta.bg} border-b ${activeCategoryMeta.border} shrink-0 flex items-center justify-between`}>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-base">{activeCategoryMeta.emoji}</span>
                  <h3 className="font-black text-xs text-slate-900 tracking-tight">
                    {activeCategoryMeta.name}
                  </h3>
                </div>
                <p className="text-[10px] text-slate-500 font-medium line-clamp-1 mt-0.5">
                  {activeCategoryMeta.subtitle}
                </p>
              </div>

              <button
                onClick={() => handleSelectCategory(activeCategoryMeta.id)}
                className="px-2.5 py-1 bg-white/90 hover:bg-white text-emerald-800 font-black text-[10px] rounded-lg border border-emerald-300/60 shadow-2xs flex items-center gap-0.5 cursor-pointer whitespace-nowrap"
              >
                <span>Full Store</span>
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>

            {/* Sub-category Pill Chips */}
            <div className="bg-white px-2.5 py-2 border-b border-slate-200/70 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0 shadow-2xs">
              {activeSubCategories.map(sub => {
                const isSelected = activeSubFilter === sub;
                return (
                  <button
                    key={sub}
                    onClick={() => setActiveSubFilter(sub)}
                    className={`px-2.5 py-1 rounded-full text-[11px] font-bold whitespace-nowrap transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#15803d] text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {sub}
                  </button>
                );
              })}
            </div>

            {/* Products Listing inside Split View */}
            <div className="p-3 flex-1 overflow-y-auto no-scrollbar space-y-2.5 pb-20">
              {activeSideProducts.length === 0 ? (
                <div className="py-12 text-center text-slate-400 space-y-2">
                  <div className="text-3xl">🥦</div>
                  <h4 className="font-bold text-xs text-slate-600">No items found</h4>
                  <p className="text-[11px] text-slate-400">Try selecting another subcategory or clear search.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeSideProducts.map(p => (
                    <CustomerProductCard key={p.id} product={p} layout="horizontal" />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          VIEW STYLE 2: 3D MODERN BENTO GRID
         ========================================================= */}
      {viewStyle === 'bento' && (
        <div className="flex-1 overflow-y-auto no-scrollbar p-3.5 space-y-3 pb-24">
          <div className="grid grid-cols-2 gap-3">
            {filteredCategories.map((cat, idx) => {
              const count = getCategoryCount(cat.id);
              const isFeatured = idx === 0 || idx === 1;

              return (
                <div
                  key={cat.id}
                  onClick={() => handleSelectCategory(cat.id)}
                  className={`group relative overflow-hidden rounded-3xl bg-gradient-to-br ${cat.bg} border ${cat.border} p-3.5 shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between cursor-pointer active:scale-[0.98] ${
                    isFeatured ? 'col-span-1' : 'col-span-1'
                  }`}
                >
                  {/* Top Badges */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-white/90 text-slate-800 border border-slate-200/80 shadow-2xs flex items-center gap-1">
                      <span>{cat.emoji}</span>
                      <span>{cat.badge}</span>
                    </span>

                    <span className="text-[9px] font-black text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded-md border border-rose-200/60">
                      {cat.discountBadge}
                    </span>
                  </div>

                  {/* Category Image with modern float animation */}
                  <div className="w-full h-26 rounded-2xl overflow-hidden bg-white/80 my-1 shadow-xs border border-white relative group-hover:shadow-md transition-shadow">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                  </div>

                  {/* Title & Details */}
                  <div className="pt-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-extrabold text-xs text-slate-900 leading-tight">
                        {cat.name}
                      </h3>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-700 group-hover:translate-x-0.5 transition-all" />
                    </div>

                    <p className="text-[10px] text-slate-500 line-clamp-1 mt-0.5 font-medium">
                      {cat.subtitle}
                    </p>

                    {/* Popular Mini Item Tags */}
                    <div className="mt-2.5 flex items-center gap-1 overflow-hidden">
                      {cat.popularItems.slice(0, 2).map((item, i) => (
                        <span
                          key={i}
                          className="text-[8.5px] font-bold bg-white/90 text-slate-700 px-1.5 py-0.5 rounded-md border border-slate-200/70 truncate max-w-[80px]"
                        >
                          {item}
                        </span>
                      ))}
                      <span className="text-[8.5px] font-bold text-emerald-800 bg-emerald-100/90 px-1.5 py-0.5 rounded-md ml-auto whitespace-nowrap">
                        {count}+ Items
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* =========================================================
          VIEW STYLE 3: WIDE HERO PANORAMIC BANNERS
         ========================================================= */}
      {viewStyle === 'banner' && (
        <div className="flex-1 overflow-y-auto no-scrollbar p-3.5 space-y-3 pb-24">
          {filteredCategories.map(cat => {
            const count = getCategoryCount(cat.id);

            return (
              <div
                key={cat.id}
                onClick={() => handleSelectCategory(cat.id)}
                className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xs hover:shadow-lg transition-all duration-300 cursor-pointer active:scale-[0.99]"
              >
                {/* Banner Image with rich dark overlay */}
                <div className="w-full h-36 relative overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/50 to-transparent" />

                  {/* Floating Content over banner */}
                  <div className="absolute inset-0 p-4 flex flex-col justify-between text-white">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-black uppercase px-2.5 py-0.5 rounded-full bg-emerald-500 text-white shadow-xs">
                        {cat.badge} • {cat.discountBadge}
                      </span>
                      <span className="text-[10px] font-black bg-white/20 backdrop-blur-md px-2 py-0.5 rounded-full text-white border border-white/30">
                        {count} Produce Items
                      </span>
                    </div>

                    <div>
                      <h3 className="font-black text-base text-white tracking-tight flex items-center gap-1.5">
                        <span>{cat.emoji}</span>
                        <span>{cat.name}</span>
                      </h3>
                      <p className="text-[11px] text-slate-200 font-medium line-clamp-1 mt-0.5">
                        {cat.subtitle}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bottom Action Footer with Sub-items */}
                <div className="p-3 bg-white flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                    {cat.popularItems.map((item, i) => (
                      <span
                        key={i}
                        className="text-[9px] font-bold bg-slate-100 text-slate-700 px-2 py-1 rounded-lg border border-slate-200 whitespace-nowrap"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-1 font-black text-xs text-emerald-700 shrink-0 group-hover:translate-x-1 transition-transform">
                    <span>Explore</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* =========================================================
          VIEW STYLE 4: COMPACT INTERACTIVE LIST
         ========================================================= */}
      {viewStyle === 'list' && (
        <div className="flex-1 overflow-y-auto no-scrollbar p-3.5 space-y-2 pb-24">
          {filteredCategories.map(cat => {
            const count = getCategoryCount(cat.id);

            return (
              <div
                key={cat.id}
                onClick={() => handleSelectCategory(cat.id)}
                className={`group p-3 rounded-2xl bg-white border ${cat.border} shadow-2xs hover:shadow-md transition-all flex items-center justify-between gap-3 cursor-pointer active:scale-[0.99]`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-13 h-13 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200 relative group-hover:scale-105 transition-transform">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-0 right-0 text-xs bg-white/90 rounded-tl-md px-1 shadow-2xs">
                      {cat.emoji}
                    </span>
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-black text-xs text-slate-900 truncate">
                        {cat.name}
                      </h3>
                      <span className="text-[8px] font-black uppercase px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800">
                        {cat.badge}
                      </span>
                    </div>

                    <p className="text-[10px] text-slate-500 truncate mt-0.5">
                      {cat.popularItems.join(', ')}
                    </p>

                    <div className="flex items-center gap-2 mt-1 text-[9px] font-bold text-slate-400">
                      <span className="text-emerald-700 font-extrabold">{count} Items</span>
                      <span>•</span>
                      <span className="text-rose-600">{cat.discountBadge}</span>
                    </div>
                  </div>
                </div>

                <div className="w-8 h-8 rounded-xl bg-slate-100 group-hover:bg-[#15803d] group-hover:text-white text-slate-500 flex items-center justify-center shrink-0 transition-colors">
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
