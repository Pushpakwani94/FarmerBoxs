import React, { useState } from 'react';
import { X, Check } from 'lucide-react';
import { useCustomerApp } from '../CustomerAppContext';

export const FilterSortModal: React.FC = () => {
  const {
    isFilterModalOpen,
    setIsFilterModalOpen,
    filterCategory,
    setFilterCategory,
    sortBy,
    setSortBy,
    priceRange,
    setPriceRange,
    setSelectedCategory
  } = useCustomerApp();

  const [tempSort, setTempSort] = useState(sortBy);
  const [tempCategory, setTempCategory] = useState(filterCategory);
  const [tempMaxPrice, setTempMaxPrice] = useState(priceRange[1]);

  if (!isFilterModalOpen) return null;

  const sortOptions = [
    { id: 'relevance', label: 'Relevance' },
    { id: 'priceAsc', label: 'Price: Low to High' },
    { id: 'priceDesc', label: 'Price: High to Low' },
    { id: 'nameAsc', label: 'Name: A to Z' },
    { id: 'nameDesc', label: 'Name: Z to A' }
  ];

  const categoryOptions = [
    'All',
    'Fruits',
    'Vegetables',
    'Leafy Greens',
    'Herbs & Seasoning',
    'Exotic Veggies',
    'Dal & Pulses'
  ];

  const handleApply = () => {
    setSortBy(tempSort);
    setFilterCategory(tempCategory);
    setPriceRange([0, tempMaxPrice]);
    if (tempCategory !== 'All') {
      setSelectedCategory(tempCategory);
    }
    setIsFilterModalOpen(false);
  };

  const handleReset = () => {
    setTempSort('relevance');
    setTempCategory('All');
    setTempMaxPrice(500);
  };

  return (
    <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-xs z-50 flex justify-end animate-fadeIn">
      <div className="w-full max-w-sm bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto animate-slideLeft">
        {/* Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h3 className="text-base font-black text-slate-900">Filters & Sorting</h3>
            <p className="text-[10px] text-slate-400">Refine produce results</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="text-xs font-bold text-emerald-700 hover:text-emerald-900 cursor-pointer"
            >
              Reset
            </button>
            <button
              onClick={() => setIsFilterModalOpen(false)}
              className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filters Content */}
        <div className="p-5 space-y-6 flex-1 overflow-y-auto">
          {/* Category Filter */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">
              Category
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {categoryOptions.map(cat => {
                const isSelected = tempCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setTempCategory(cat)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#15803d] text-white shadow-2xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sort By matching Screen 12 */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">
              Sort By
            </h4>
            <div className="space-y-1.5">
              {sortOptions.map(opt => {
                const isSelected = tempSort === opt.id;
                return (
                  <label
                    key={opt.id}
                    onClick={() => setTempSort(opt.id as any)}
                    className={`flex items-center justify-between p-2.5 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950 font-bold'
                        : 'bg-white border-slate-200/80 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span className="text-xs">{opt.label}</span>
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        isSelected ? 'border-emerald-600 bg-emerald-600 text-white' : 'border-slate-300'
                      }`}
                    >
                      {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Price Range Slider */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">
                Max Price Range
              </h4>
              <span className="font-black text-xs text-emerald-800">
                Up to ₹{tempMaxPrice}
              </span>
            </div>

            <input
              type="range"
              min={50}
              max={500}
              step={25}
              value={tempMaxPrice}
              onChange={e => setTempMaxPrice(Number(e.target.value))}
              aria-label="Filter maximum price range"
              className="w-full accent-emerald-600 cursor-pointer"
            />

            <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold">
              <span>₹50</span>
              <span>₹250</span>
              <span>₹500+</span>
            </div>
          </div>
        </div>

        {/* Bottom Apply Button */}
        <div className="p-4 border-t border-slate-200 bg-slate-50">
          <button
            onClick={handleApply}
            className="w-full py-3.5 bg-[#15803d] hover:bg-[#166534] text-white font-black text-sm rounded-2xl shadow-md flex items-center justify-center gap-2 cursor-pointer transition-transform active:scale-98"
          >
            <Check className="w-4 h-4" />
            <span>Apply Filters</span>
          </button>
        </div>
      </div>
    </div>
  );
};
