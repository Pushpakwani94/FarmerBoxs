import React, { useMemo } from 'react';
import { ArrowLeft, Search, X, TrendingUp, Sparkles, Package } from 'lucide-react';
import { useCustomerApp } from '../CustomerAppContext';
import { resolveProductImage, getProductImageFallback } from '../../utils/productImages';

export const SearchScreen: React.FC = () => {
  const {
    products,
    searchQuery,
    setSearchQuery,
    setCurrentScreen,
    setSelectedProduct,
    addToCart
  } = useCustomerApp();

  const trendingQueries = [
    'Mango',
    'Strawberry',
    'Tomato',
    'Kiwi',
    'Dragon Fruit',
    'Onion',
    'Avocado',
    'Paneer',
    'Spinach'
  ];

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase().trim();
    return products.filter(
      p =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        (p.originCountry && p.originCountry.toLowerCase().includes(q))
    );
  }, [products, searchQuery]);

  return (
    <div className="flex flex-col h-full bg-[#F8FAF9] overflow-y-auto no-scrollbar select-none">
      {/* Search Header */}
      <div className="bg-[#15803d] text-white px-4 py-3 shrink-0 shadow-sm sticky top-0 z-10 space-y-3">
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setCurrentScreen('HOME')}
            className="p-1 text-white/90 hover:text-white cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              autoFocus
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search mango, strawberry, tomato..."
              className="w-full pl-9 pr-8 py-2 text-xs bg-white text-slate-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-300 font-medium placeholder:text-slate-400 shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 space-y-4 pb-8">
        {!searchQuery.trim() ? (
          /* Trending & Recent Searches */
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="text-xs font-black text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                <span>Trending Searches</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {trendingQueries.map(q => (
                  <button
                    key={q}
                    onClick={() => setSearchQuery(q)}
                    className="px-3 py-1.5 bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 border border-slate-200 rounded-full text-xs font-bold transition-all shadow-2xs cursor-pointer flex items-center gap-1"
                  >
                    <span>🔍</span>
                    <span>{q}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Popular Produce Preview */}
            <div className="space-y-2 pt-2">
              <h4 className="text-xs font-black text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Popular Picks Today</span>
              </h4>
              <div className="space-y-2">
                {products.slice(0, 5).map(p => (
                  <div
                    key={p.id}
                    onClick={() => {
                      setSelectedProduct(p);
                      setCurrentScreen('PRODUCT_DETAIL');
                    }}
                    className="bg-white p-2.5 rounded-xl border border-slate-200/80 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <img
                        src={resolveProductImage(p.name, p.category, p.image)}
                        alt={p.name}
                        onError={e => {
                          (e.target as HTMLElement).setAttribute('src', getProductImageFallback(p.category));
                        }}
                        className="w-10 h-10 rounded-lg object-cover bg-slate-50 border border-slate-100"
                      />
                      <div>
                        <p className="font-bold text-xs text-slate-900">{p.name}</p>
                        <p className="text-[10px] text-slate-400">{p.category} • {p.unit}</p>
                      </div>
                    </div>
                    <span className="font-black text-xs text-emerald-700">₹{p.b2cPrice || p.salePrice}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : searchResults.length === 0 ? (
          /* No Results Found */
          <div className="p-12 text-center text-slate-400 space-y-2">
            <Package className="w-12 h-12 mx-auto text-slate-300" />
            <h4 className="font-bold text-slate-700 text-sm">No Produce Found</h4>
            <p className="text-xs text-slate-400">
              We couldn't find anything matching &quot;{searchQuery}&quot;. Try checking for spelling or search by category.
            </p>
          </div>
        ) : (
          /* Live Search Results List matching Screen 11 */
          <div className="space-y-2">
            <p className="text-xs font-bold text-slate-500">
              Found {searchResults.length} results for &quot;{searchQuery}&quot;
            </p>
            <div className="space-y-2">
              {searchResults.map(p => (
                <div
                  key={p.id}
                  onClick={() => {
                    setSelectedProduct(p);
                    setCurrentScreen('PRODUCT_DETAIL');
                  }}
                  className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-2xs flex items-center justify-between cursor-pointer hover:shadow-md transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={resolveProductImage(p.name, p.category, p.image)}
                      alt={p.name}
                      onError={e => {
                        (e.target as HTMLElement).setAttribute('src', getProductImageFallback(p.category));
                      }}
                      className="w-12 h-12 rounded-xl object-cover bg-slate-50 border border-slate-100 group-hover:scale-105 transition-transform"
                    />
                    <div>
                      <h4 className="font-bold text-xs text-slate-900 leading-tight">{p.name}</h4>
                      <p className="text-[10px] text-slate-400 font-medium mt-0.5">{p.category} • {p.unit}</p>
                      <span className="text-[10px] font-extrabold text-emerald-700">Farm Fresh</span>
                    </div>
                  </div>

                  <div className="text-right space-y-1">
                    <p className="font-black text-sm text-slate-900">₹{p.b2cPrice || p.salePrice}</p>
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        addToCart(p, 1);
                      }}
                      className="px-2.5 py-1 bg-[#15803d] hover:bg-[#166534] text-white rounded-lg text-[10px] font-bold shadow-2xs active:scale-95 transition-transform"
                    >
                      + Add
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
