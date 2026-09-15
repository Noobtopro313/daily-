import React from 'react';
import { ArrowRight, Sparkles, Flame } from 'lucide-react';
import { ASSET_IMAGES } from '../assets/imageAssets';

interface CollectionCardsProps {
  onShopNewArrivals: () => void;
  onShopBestSellers: () => void;
}

export const CollectionCards: React.FC<CollectionCardsProps> = ({
  onShopNewArrivals,
  onShopBestSellers,
}) => {
  return (
    <section id="featured-collections-blocks" className="py-12 sm:py-16 bg-[#0B0D0F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          
          {/* Card 1: New Arrivals */}
          <div
            id="collection-card-new-arrivals"
            onClick={onShopNewArrivals}
            className="group relative h-[360px] sm:h-[420px] rounded-3xl overflow-hidden border border-white/10 hover:border-[#32B83F]/50 shadow-2xl cursor-pointer transition-all duration-300 hover:-translate-y-1 select-none"
          >
            {/* Image */}
            <img
              src={ASSET_IMAGES.newArrivals}
              alt="Nexora Tech New Arrivals"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-106"
              loading="lazy"
            />

            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D0F] via-[#0B0D0F]/65 to-black/20" />

            {/* Content */}
            <div className="absolute inset-0 p-8 sm:p-10 flex flex-col justify-between z-10">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#32B83F]/20 border border-[#32B83F]/40 text-[#32B83F] text-xs font-extrabold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  Latest Releases
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight font-heading">
                  New Arrivals
                </h3>
                <p className="mt-2 text-sm sm:text-base text-gray-300 font-medium">
                  Fresh tech. New possibilities.
                </p>

                <div className="mt-6 inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-white/10 backdrop-blur-md hover:bg-[#32B83F] text-white border border-white/20 hover:border-[#32B83F] font-bold text-sm transition-all duration-200 group-hover:shadow-lg">
                  <span>Shop New Arrivals</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Best Sellers */}
          <div
            id="collection-card-best-sellers"
            onClick={onShopBestSellers}
            className="group relative h-[360px] sm:h-[420px] rounded-3xl overflow-hidden border border-white/10 hover:border-[#32B83F]/50 shadow-2xl cursor-pointer transition-all duration-300 hover:-translate-y-1 select-none"
          >
            {/* Image */}
            <img
              src={ASSET_IMAGES.bestSellers}
              alt="Nexora Tech Best Sellers"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-106"
              loading="lazy"
            />

            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D0F] via-[#0B0D0F]/65 to-black/20" />

            {/* Content */}
            <div className="absolute inset-0 p-8 sm:p-10 flex flex-col justify-between z-10">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 text-xs font-extrabold uppercase tracking-wider">
                  <Flame className="w-3.5 h-3.5" />
                  Top Rated Gear
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight font-heading">
                  Best Sellers
                </h3>
                <p className="mt-2 text-sm sm:text-base text-gray-300 font-medium">
                  Customer favorites worth discovering.
                </p>

                <div className="mt-6 inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-white/10 backdrop-blur-md hover:bg-[#32B83F] text-white border border-white/20 hover:border-[#32B83F] font-bold text-sm transition-all duration-200 group-hover:shadow-lg">
                  <span>Shop Best Sellers</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
