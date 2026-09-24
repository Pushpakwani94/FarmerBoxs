import React, { useMemo } from 'react';
import { ArrowLeft, Search, SlidersHorizontal, Package } from 'lucide-react';
import { useCustomerApp } from '../CustomerAppContext';
import { CustomerProductCard } from '../components/CustomerProductCard';
import { FilterSortModal } from './FilterSortModal';

export const ProductListingScreen: React.FC = () => {
  const {
    products,
    selectedCategory,
    setSelectedCategory,
    selectedSubCategory,
    setSelectedSubCategory,
    setCurrentScreen,
    isFilterModalOpen,
    setIsFilterModalOpen,
    sortBy,
    priceRange
  } = useCustomerApp();

  // Subcategories mapping
  const subCategories = useMemo(() => {
    if (selectedCategory === 'Fruits') {
      return ['All', 'Apple', 'Banana', 'Orange', 'Mango', 'Grapes', 'Pomegranate', 'Kiwi', 'Dragon', 'Papaya', 'Watermelon', 'Strawberry', 'Pear', 'Cherry'];
    }
    if (selectedCategory === 'Vegetables') {
      return ['All', 'Tomato', 'Onion', 'Potato', 'Capsicum', 'Cabbage', 'Cauliflower', 'Bhindi', 'Brinjal', 'Cucumber', 'Peas'];
    }
    if (selectedCategory === 'Leafy Greens') {
      return ['All', 'Spinach', 'Methi', 'Palak', 'Coriander'];
    }
    if (selectedCategory === 'Herbs & Seasoning') {
      return ['All', 'Ginger', 'Garlic', 'Mint', 'Chillies'];
    }
    return ['All'];
  }, [selectedCategory]);

  const filteredList = useMemo(() => {
    return products
      .filter(p => {
        // Category check
        let matchCat = true;
        if (selectedCategory !== 'All') {
          if (selectedCategory === 'Fruits') {
            matchCat = p.category === 'Fruits' || p.category === 'Citrus & Melons';
          } else if (selectedCategory === 'Vegetables') {
            matchCat = p.category === 'Vegetables' || p.category === 'Root Veggies' || p.category === 'Gourds & Squashes';
          } else {
            matchCat = p.category.toLowerCase().includes(selectedCategory.toLowerCase().replace('fresh ', ''));
          }
        }

        // Subcategory check
        let matchSub = true;
        if (selectedSubCategory !== 'All') {
          matchSub = p.name.toLowerCase().includes(selectedSubCategory.toLowerCase());
        }

        // Price check
        const price = p.b2cPrice || p.salePrice;
        const matchPrice = price >= priceRange[0] && price <= priceRange[1];

        return matchCat && matchSub && matchPrice;
      })
      .sort((a, b) => {
        const priceA = a.b2cPrice || a.salePrice;
        const priceB = b.b2cPrice || b.salePrice;
        if (sortBy === 'priceAsc') return priceA - priceB;
        if (sortBy === 'priceDesc') return priceB - priceA;
        if (sortBy === 'nameAsc') return a.name.localeCompare(b.name);
        if (sortBy === 'nameDesc') return b.name.localeCompare(a.name);
        return 0;
      });
  }, [products, selectedCategory, selectedSubCategory, priceRange, sortBy]);

  return (
    <div className="flex flex-col h-full bg-[#F8FAF9] overflow-y-auto no-scrollbar">
      {/* Header */}
      <div className="bg-[#15803d] text-white px-4 py-3 flex items-center justify-between shrink-0 shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setCurrentScreen('CATEGORIES')}
            className="p-1 text-white/90 hover:text-white cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-base font-black tracking-tight">{selectedCategory}</h2>
            <p className="text-[10px] text-emerald-100 font-medium">{filteredList.length} Items Available</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setCurrentScreen('SEARCH')}
            className="p-2 rounded-xl bg-emerald-800 text-white cursor-pointer"
            title="Search"
          >
            <Search className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsFilterModalOpen(true)}
            className="p-2 rounded-xl bg-emerald-800 text-white cursor-pointer"
            title="Filters & Sort"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Subcategory Pills Bar (matching Screen 9) */}
      {subCategories.length > 1 && (
        <div className="bg-white border-b border-slate-200/80 px-3 py-2 flex items-center gap-2 overflow-x-auto no-scrollbar sticky top-[57px] z-10 shadow-2xs">
          {subCategories.map(sub => {
            const isSelected = selectedSubCategory === sub;
            return (
              <button
                key={sub}
                onClick={() => setSelectedSubCategory(sub)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
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
      )}

      {/* Products Grid */}
      <div className="p-4 space-y-3 pb-8">
        {filteredList.length === 0 ? (
          <div className="p-12 text-center text-slate-400 space-y-2">
            <Package className="w-12 h-12 mx-auto text-slate-300" />
            <h4 className="font-bold text-slate-700 text-sm">No Produce Found</h4>
            <p className="text-xs text-slate-400">Try selecting a different subcategory or adjust price filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {filteredList.map(p => (
              <CustomerProductCard key={p.id} product={p} layout="vertical" />
            ))}
          </div>
        )}
      </div>

      {/* Filter & Sort Drawer Modal */}
      {isFilterModalOpen && <FilterSortModal />}
    </div>
  );
};
