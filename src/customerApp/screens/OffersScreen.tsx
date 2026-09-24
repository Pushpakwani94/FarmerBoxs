import React from 'react';
import { ArrowLeft, Tag, Copy, Check, Sparkles, Percent, Gift } from 'lucide-react';
import { useCustomerApp } from '../CustomerAppContext';

export const OffersScreen: React.FC = () => {
  const { availableCoupons, applyCoupon, setCurrentScreen } = useCustomerApp();
  const [copiedCode, setCopiedCode] = React.useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    applyCoupon(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const offerDeals = [
    {
      code: 'FARM50',
      title: 'FLAT 50% OFF',
      subtitle: 'On Chikoo & Dahanu Sapota',
      desc: 'Valid on 1kg and 500g fresh fruit portions. No minimum order limit.',
      bg: 'from-amber-600 to-orange-700',
      tag: 'HOT DEAL',
      image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=200'
    },
    {
      code: 'BOGO',
      title: 'BUY 1 GET 1 FREE',
      subtitle: 'On Fresh Coriander & Mint Bunches',
      desc: 'Buy any leafy green or culinary herb bunch and get 1 fresh mint bunch free.',
      bg: 'from-emerald-700 to-green-800',
      tag: 'HERB SPECIAL',
      image: '/products/coriander.jpg'
    },
    {
      code: 'GLOBAL20',
      title: '20% OFF',
      subtitle: 'On Premium Imported Fruits',
      desc: 'Save 20% on Zespri Green Kiwis, Washington Apples, Avocados & Dragon Fruits.',
      bg: 'from-blue-700 to-indigo-800',
      tag: 'EXOTIC FRUITS',
      image: '/products/kiwi.jpg'
    },
    {
      code: 'FREEDEL',
      title: 'FREE DELIVERY',
      subtitle: 'On Orders Above ₹299',
      desc: 'Enjoy zero delivery charge on all farm vegetables and fresh groceries.',
      bg: 'from-teal-600 to-emerald-700',
      tag: 'ALL USERS',
      image: '/products/tomato.jpg'
    }
  ];

  return (
    <div className="flex flex-col h-full bg-[#F8FAF9] overflow-y-auto no-scrollbar select-none">
      {/* Header */}
      <div className="bg-[#15803d] text-white px-4 py-3 shrink-0 shadow-sm sticky top-0 z-10 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setCurrentScreen('HOME')}
            className="p-1 text-white/90 hover:text-white cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-base font-black tracking-tight">Offers & Deals</h2>
        </div>
      </div>

      {/* Offers Cards matching Screen 20 */}
      <div className="p-4 space-y-3.5 pb-8">
        {offerDeals.map(deal => {
          const isCopied = copiedCode === deal.code;

          return (
            <div
              key={deal.code}
              className="bg-white rounded-3xl border border-slate-200/80 shadow-2xs overflow-hidden hover:shadow-md transition-all group"
            >
              {/* Card Banner */}
              <div className={`p-4 bg-gradient-to-r ${deal.bg} text-white flex items-center justify-between gap-3`}>
                <div className="space-y-1 max-w-[65%]">
                  <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-xs text-white">
                    {deal.tag}
                  </span>
                  <h3 className="font-black text-lg tracking-tight leading-none text-yellow-300">
                    {deal.title}
                  </h3>
                  <p className="text-xs font-bold text-white/95 leading-tight">{deal.subtitle}</p>
                </div>

                <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-md bg-white/20 border border-white/30 shrink-0">
                  <img src={deal.image} alt={deal.title} className="w-full h-full object-cover" />
                </div>
              </div>

              {/* Card Bottom / Code Action */}
              <div className="p-3.5 flex items-center justify-between gap-3 bg-white">
                <div className="space-y-0.5">
                  <p className="text-[11px] text-slate-500 font-medium line-clamp-1">{deal.desc}</p>
                  <div className="flex items-center gap-1 font-mono text-xs font-black text-slate-800">
                    <Tag className="w-3.5 h-3.5 text-emerald-600" />
                    <span>CODE: {deal.code}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleCopy(deal.code)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-2xs cursor-pointer flex items-center gap-1 shrink-0 ${
                    isCopied
                      ? 'bg-emerald-600 text-white'
                      : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200'
                  }`}
                >
                  {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{isCopied ? 'Applied!' : 'Apply Code'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
