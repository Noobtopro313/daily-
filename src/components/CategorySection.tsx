import React from 'react';
import { ArrowRight } from 'lucide-react';
import { CATEGORIES } from '../data/products';

interface CategorySectionProps {
  onSelectCategory: (categoryName: string) => void;
}

export const CategorySection: React.FC<CategorySectionProps> = ({ onSelectCategory }) => {
  return (
    <section id="shop-by-category" className="py-16 sm:py-20 bg-[#101316] border-y border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-12">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-[#32B83F]" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#32B83F]">
                Curated Ecosystems
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-heading">
              Shop by Category
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#A7ADB2] max-w-lg">
              Explore specialized product collections engineered for high performance, comfort, and seamless connectivity.
            </p>
          </div>

          <button
            onClick={() => onSelectCategory('All')}
            className="mt-4 sm:mt-0 inline-flex items-center gap-2 text-sm font-semibold text-[#32B83F] hover:text-[#27A936] transition-colors group self-start sm:self-auto"
          >
            <span>Browse All Collections</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 6 Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((category) => (
            <div
              key={category.id}
              id={`category-card-${category.id}`}
              onClick={() => onSelectCategory(category.name)}
              className="group relative h-64 sm:h-72 rounded-2xl overflow-hidden border border-white/10 hover:border-[#32B83F]/60 shadow-lg cursor-pointer transition-all duration-300 hover:-translate-y-1 select-none"
            >
              {/* Category Background Image */}
              <img
                src={category.image}
                alt={category.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
                loading="lazy"
              />

              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D0F] via-[#0B0D0F]/65 to-transparent transition-opacity duration-300 group-hover:opacity-90" />
              
              {/* Subtle top sheen */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent pointer-events-none" />

              {/* Category Content Overlay */}
              <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
                <div className="flex justify-between items-start">
                  <span className="text-[11px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md text-gray-300 border border-white/10">
                    {category.itemCount} Products
                  </span>

                  {/* Corner indicator */}
                  <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center text-white group-hover:bg-[#32B83F] group-hover:text-white group-hover:border-[#32B83F] transition-all duration-300">
                    <ArrowRight className="w-4 h-4 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-extrabold text-white group-hover:text-[#32B83F] transition-colors font-heading">
                    {category.name}
                  </h3>
                  <p className="mt-1.5 text-xs sm:text-sm text-gray-300 line-clamp-2 leading-relaxed">
                    {category.description}
                  </p>

                  <div className="mt-4 flex items-center gap-2 text-xs font-bold text-white group-hover:text-[#32B83F] transition-colors">
                    <span>Explore Collection</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
