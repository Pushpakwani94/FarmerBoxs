import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Search, 
  MessageCircle, 
  PhoneCall, 
  Mail, 
  ChevronDown, 
  ChevronUp, 
  HelpCircle, 
  Truck, 
  RotateCcw, 
  CreditCard, 
  ShieldCheck,
  ExternalLink
} from 'lucide-react';
import { useCustomerApp } from '../CustomerAppContext';

export const HelpSupportScreen: React.FC = () => {
  const { navigateTo } = useCustomerApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How fast does FarmerBox deliver fresh produce?',
      a: 'We harvest daily from partner farms at 4 AM and deliver to your doorstep within 2 to 4 hours in temperature-controlled boxes to retain peak farm freshness.',
      cat: 'delivery'
    },
    {
      q: 'What if I receive damaged or poor quality produce?',
      a: 'We offer an instant 100% No-Questions-Asked replacement or instant refund to your FarmerBox Wallet. Simply tap "Report Issue" in My Orders.',
      cat: 'returns'
    },
    {
      q: 'Are all fruits and vegetables certified chemical-free?',
      a: 'Yes! 100% of our produce is directly sourced from certified organic and Good Agricultural Practices (GAP) verified local farms in Maharashtra.',
      cat: 'quality'
    },
    {
      q: 'How can I pay for my order?',
      a: 'We support UPI (GPay, PhonePe, Paytm), FarmerBox Wallet, Credit/Debit Cards, Net Banking, and Cash on Delivery (COD).',
      cat: 'payment'
    },
    {
      q: 'Can I cancel or reschedule my delivery slot?',
      a: 'You can modify or cancel your order anytime before it enters the "Harvested & Packed" stage directly from the My Orders screen.',
      cat: 'orders'
    }
  ];

  const filteredFaqs = faqs.filter(f => 
    f.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
    f.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-full bg-slate-50 flex flex-col pb-24">
      {/* Top Bar */}
      <div className="bg-emerald-600 text-white px-4 pt-12 pb-6 rounded-b-3xl shadow-md">
        <div className="flex items-center gap-3 mb-4">
          <button 
            onClick={() => navigateTo('profile')}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 flex items-center justify-center transition-all"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <h1 className="text-lg font-bold">Help & Support</h1>
        </div>

        <p className="text-emerald-100 text-xs mb-3">How can our farm care team help you today?</p>

        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search FAQs, issues, delivery info..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white text-slate-800 text-xs pl-10 pr-4 py-2.5 rounded-xl placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400 shadow-sm"
          />
        </div>
      </div>

      <div className="p-4 space-y-5">
        {/* Quick Contact Cards */}
        <div>
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
            Quick Assistance
          </h3>
          <div className="grid grid-cols-2 gap-2.5">
            <button 
              onClick={() => alert('Starting live customer chat with FarmerBox Support agent...')}
              className="p-3 bg-white rounded-2xl border border-slate-100 shadow-xs flex flex-col items-start hover:border-emerald-300 transition-all text-left group"
            >
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                <MessageCircle className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-slate-900">24/7 Live Chat</span>
              <span className="text-[10px] text-emerald-600 font-semibold">Typical reply: 1 min</span>
            </button>

            <button 
              onClick={() => alert('Calling FarmerBox Toll-Free Support: 1800-200-FARM')}
              className="p-3 bg-white rounded-2xl border border-slate-100 shadow-xs flex flex-col items-start hover:border-emerald-300 transition-all text-left group"
            >
              <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                <PhoneCall className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-slate-900">Call Support</span>
              <span className="text-[10px] text-slate-500">1800-200-FARM</span>
            </button>
          </div>
        </div>

        {/* Category Shortcuts */}
        <div>
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
            Browse by Topic
          </h3>
          <div className="grid grid-cols-4 gap-2">
            {[
              { icon: Truck, label: 'Delivery', color: 'text-purple-600 bg-purple-50' },
              { icon: RotateCcw, label: 'Refunds', color: 'text-amber-600 bg-amber-50' },
              { icon: CreditCard, label: 'Payments', color: 'text-blue-600 bg-blue-50' },
              { icon: ShieldCheck, label: 'Freshness', color: 'text-emerald-600 bg-emerald-50' },
            ].map((topic, i) => {
              const Icon = topic.icon;
              return (
                <button
                  key={i}
                  className="bg-white p-2.5 rounded-xl border border-slate-100 flex flex-col items-center gap-1.5 shadow-xs hover:border-slate-300 transition-all"
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${topic.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-semibold text-slate-700">{topic.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* FAQs Accordion */}
        <div>
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
            Frequently Asked Questions
          </h3>
          <div className="space-y-2">
            {filteredFaqs.map((faq, idx) => {
              const isExpanded = expandedFaq === idx;
              return (
                <div 
                  key={idx}
                  className="bg-white rounded-xl border border-slate-100 overflow-hidden shadow-xs"
                >
                  <button
                    onClick={() => setExpandedFaq(isExpanded ? null : idx)}
                    className="w-full p-3.5 flex items-center justify-between text-left gap-2 font-bold text-xs text-slate-800 hover:bg-slate-50/60 transition-colors"
                  >
                    <span>{faq.q}</span>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                  </button>
                  {isExpanded && (
                    <div className="px-3.5 pb-3.5 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-50 bg-slate-50/40">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Email support banner */}
        <div className="bg-emerald-50 border border-emerald-200/80 rounded-2xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
            <Mail className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <h4 className="text-xs font-bold text-emerald-950">Email Farm Support</h4>
            <p className="text-[11px] text-emerald-800">care@farmerbox.in</p>
          </div>
          <button 
            onClick={() => alert('Opening email client for care@farmerbox.in')}
            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg shadow-xs"
          >
            Email Us
          </button>
        </div>
      </div>
    </div>
  );
};
