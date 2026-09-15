import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { ASSET_IMAGES } from '../assets/imageAssets';

interface PromoBannerProps {
  onExploreAccessories: () => void;
}

export const PromoBanner: React.FC<PromoBannerProps> = ({ onExploreAccessories }) => {
  return (
    <section id="productivity-promo-banner" className="py-12 sm:py-16 bg-[#0B0D0F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner container */}
        <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-[#121518] shadow-2xl min-h-[360px] sm:min-h-[420px] flex items-center">
          
          {/* Background image */}
          <img
            src={ASSET_IMAGES.workspace}
            alt="Minimalist dark productivity workspace setup"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover object-center"
            loading="lazy"
          />

          {/* Gradients: dark gradient on left side for text contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B0D0F] via-[#0B0D0F]/90 to-transparent sm:to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D0F]/70 via-transparent to-transparent" />

          {/* Content */}
          <div className="relative z-10 max-w-xl p-8 sm:p-12 lg:p-16">
            {/* Small green accent line */}
            <div className="flex items-center gap-2 mb-4">
              <span className="w-10 h-1 bg-[#32B83F] rounded-full" />
              <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#32B83F]">
                Workstation Excellence
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight font-heading">
              Work Smarter. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-emerald-400">
                Play Better.
              </span>
            </h2>

            <p className="mt-4 text-sm sm:text-base text-gray-300 leading-relaxed max-w-md">
              Upgrade your setup with carefully selected accessories built for productivity and performance. From low-profile mechanical tactile switches to high-speed GaN charging hubs.
            </p>

            {/* Quick value bullets */}
            <div className="grid grid-cols-2 gap-2.5 my-6 text-xs text-gray-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#32B83F] flex-shrink-0" />
                <span>Multi-device wireless flow</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#32B83F] flex-shrink-0" />
                <span>Precision CNC anodized aluminum</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#32B83F] flex-shrink-0" />
                <span>Zero latency transmission</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#32B83F] flex-shrink-0" />
                <span>Ergonomic posture certification</span>
              </div>
            </div>

            {/* CTA Button */}
            <button
              id="banner-cta-explore-accessories"
              onClick={onExploreAccessories}
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl bg-[#32B83F] hover:bg-[#27A936] text-white font-bold text-sm sm:text-base tracking-wide shadow-lg shadow-[#32B83F]/30 hover:shadow-[#32B83F]/50 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer group"
            >
              <span>Explore Accessories</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
