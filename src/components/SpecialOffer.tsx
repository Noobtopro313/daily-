import React from 'react';
import { ArrowRight, ShieldCheck, Truck, RotateCcw, Award } from 'lucide-react';

interface SpecialOfferProps {
  onShopAll: () => void;
}

export const SpecialOffer: React.FC<SpecialOfferProps> = ({ onShopAll }) => {
  return (
    <section id="conversion-special-offer" className="py-16 sm:py-20 bg-[#121518] relative overflow-hidden border-t border-white/5">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-64 bg-[#32B83F]/8 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Quality guarantee pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1A1F26] border border-white/10 text-gray-300 text-xs font-semibold mb-6 shadow-sm">
          <Award className="w-4 h-4 text-[#32B83F]" />
          <span>Engineered for Maximum Reliability &amp; Longevity</span>
        </div>

        {/* Headline */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-heading leading-tight">
          Technology That Fits Your Lifestyle
        </h2>

        {/* Supporting message */}
        <p className="mt-4 text-base sm:text-lg text-[#A7ADB2] max-w-2xl mx-auto leading-relaxed">
          From everyday essentials to smart upgrades, find products designed to make life easier, faster, and more connected. Tested extensively in real-world environments.
        </p>

        {/* CTA Button */}
        <div className="mt-8 flex justify-center">
          <button
            id="special-offer-shop-all-btn"
            onClick={onShopAll}
            className="inline-flex items-center gap-3 px-9 py-4 rounded-xl bg-[#32B83F] hover:bg-[#27A936] text-white font-bold text-base tracking-wide shadow-xl shadow-[#32B83F]/25 hover:shadow-[#32B83F]/40 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer group"
          >
            <span>Shop All Products</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
          </button>
        </div>

        {/* Small trust message */}
        <div className="mt-10 pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs sm:text-sm text-gray-400 font-medium">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#32B83F]" />
            <span>Secure checkout</span>
          </div>
          <span className="text-gray-600 hidden sm:inline">•</span>
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-[#32B83F]" />
            <span>Fast delivery</span>
          </div>
          <span className="text-gray-600 hidden sm:inline">•</span>
          <div className="flex items-center gap-2">
            <RotateCcw className="w-4 h-4 text-[#32B83F]" />
            <span>Easy returns</span>
          </div>
        </div>

      </div>
    </section>
  );
};
