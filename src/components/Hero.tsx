import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, Zap } from 'lucide-react';
import { ASSET_IMAGES } from '../assets/imageAssets';

interface HeroProps {
  onShopNow: () => void;
  onExploreCollection: () => void;
  onSelectProduct?: (productId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onShopNow,
  onExploreCollection,
  onSelectProduct,
}) => {
  return (
    <section
      id="hero-section"
      className="relative overflow-hidden bg-gradient-to-b from-[#0B0D0F] via-[#101317] to-[#0B0D0F] border-b border-white/5 py-10 sm:py-12 lg:py-16"
    >
      {/* Background atmospheric emerald radial glow */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 sm:w-[540px] sm:h-[540px] bg-[#32B83F]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -top-20 left-10 w-72 h-72 bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Subtle grid pattern for tech atmosphere */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
          backgroundSize: '28px 28px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[480px] lg:min-h-[500px]">
          
          {/* LEFT SIDE: Copy & Conversion Actions */}
          <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left z-20">
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1A1F26] border border-[#32B83F]/30 mb-5 text-[#32B83F] shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#32B83F] animate-pulse" />
              <span className="text-xs font-bold tracking-[0.15em] uppercase">
                NEXT-GEN TECHNOLOGY
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-[56px] font-extrabold text-white tracking-tight leading-[1.12] mb-5 font-heading">
              Upgrade Your <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-100 to-gray-400">
                Everyday Tech
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-[#A7ADB2] max-w-xl leading-relaxed mb-8">
              Discover premium gadgets, smart accessories, and innovative technology designed for the way you live. Engineered for precision, built to endure.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto">
              <button
                id="hero-cta-shop-now"
                onClick={onShopNow}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-lg bg-[#32B83F] hover:bg-[#27A936] text-white font-bold text-sm sm:text-base tracking-wide shadow-lg shadow-[#32B83F]/25 hover:shadow-[#32B83F]/40 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer group"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                id="hero-cta-explore-collection"
                onClick={onExploreCollection}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg bg-[#14181D] hover:bg-[#1A1F26] text-gray-200 hover:text-white border border-white/15 hover:border-[#32B83F]/50 font-semibold text-sm sm:text-base transition-all duration-200 cursor-pointer"
              >
                Explore Collection
              </button>
            </div>

            {/* Trust micro-badges */}
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-center lg:justify-start gap-5 text-xs text-gray-400">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#32B83F]" />
                <span>2-Year Nexora Warranty</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-gray-600 hidden sm:block" />
              <div className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-[#32B83F]" />
                <span>Fast 48h Dispatch</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-gray-600 hidden sm:block" />
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#32B83F]" />
                <span>100% Tested Authentic</span>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: High-Quality Technology Composition */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            {/* Decorative back-layer glow ring */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[320px] sm:w-[460px] h-[320px] sm:h-[460px] rounded-full border border-white/5 border-dashed animate-[spin_60s_linear_infinite]" />
              <div className="w-[280px] sm:w-[380px] h-[280px] sm:h-[380px] rounded-full bg-radial from-[#32B83F]/15 via-transparent to-transparent" />
            </div>

            {/* Container for commercial composition */}
            <div className="relative w-full max-w-lg lg:max-w-none group">
              <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#121518]/60 shadow-2xl backdrop-blur-sm transition-transform duration-500 group-hover:scale-[1.01]">
                <img
                  src={ASSET_IMAGES.hero}
                  alt="Nexora Tech Flagship Gadget Collection - Headphones, Smartwatch, Speaker, Earbuds"
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-cover object-center aspect-[16/10] sm:aspect-[16/9] lg:aspect-[16/10]"
                  loading="eager"
                />

                {/* Ambient dark gradient overlay to blend seamlessly */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D0F] via-transparent to-transparent opacity-60 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0B0D0F]/40 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Floating interactive highlight card 1: Active ANC */}
              <div
                onClick={() => onSelectProduct?.('wireless-headphones')}
                className="absolute -bottom-4 left-3 sm:-left-4 p-3 rounded-xl bg-[#14181D]/90 backdrop-blur-md border border-white/15 shadow-xl flex items-center gap-3 cursor-pointer hover:border-[#32B83F]/60 transition-all hover:-translate-y-1 z-30"
              >
                <div className="w-10 h-10 rounded-lg bg-[#32B83F]/20 border border-[#32B83F]/40 flex items-center justify-center text-[#32B83F]">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Acoustic Series</div>
                  <div className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
                    Studio Hi-Fi Sound
                    <span className="text-[10px] text-[#32B83F] bg-[#32B83F]/20 px-1 rounded">55hr</span>
                  </div>
                </div>
              </div>

              {/* Floating interactive highlight card 2: Smartwatch Ultra */}
              <div
                onClick={() => onSelectProduct?.('smartwatch-ultra')}
                className="absolute -top-4 right-3 sm:-right-4 p-3 rounded-xl bg-[#14181D]/90 backdrop-blur-md border border-white/15 shadow-xl flex items-center gap-3 cursor-pointer hover:border-[#32B83F]/60 transition-all hover:-translate-y-1 z-30"
              >
                <div className="w-10 h-10 rounded-lg bg-[#1A1F26] border border-white/15 flex items-center justify-center text-[#32B83F]">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Titanium Grade 5</div>
                  <div className="text-xs sm:text-sm font-bold text-white flex items-center gap-1">
                    Smartwatch Ultra
                    <span className="text-[10px] text-emerald-400">10 ATM</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
