import React, { useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { ProductCard } from './ProductCard';

interface FeaturedProductsProps {
  products: Product[];
  onAddToCart: (product: Product, e: React.MouseEvent) => void;
  onQuickView: (product: Product) => void;
  onToggleWishlist: (product: Product, e: React.MouseEvent) => void;
  wishlistIds: string[];
  onSelectProduct: (product: Product) => void;
  onViewAllProducts: () => void;
}

export const FeaturedProducts: React.FC<FeaturedProductsProps> = ({
  products,
  onAddToCart,
  onQuickView,
  onToggleWishlist,
  wishlistIds,
  onSelectProduct,
  onViewAllProducts,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Audio', 'Smart Wearables', 'Gaming', 'Mobile Accessories', 'Smart Home'];

  const filteredProducts = selectedCategory === 'All'
    ? products.slice(0, 8)
    : products.filter(p => p.category === selectedCategory).slice(0, 8);

  return (
    <section id="featured-products-section" className="py-16 sm:py-20 bg-[#0B0D0F] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading with decorative accent */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          {/* Subtle green accent indicator */}
          <div className="inline-flex items-center justify-center gap-2 mb-3">
            <span className="w-8 h-[2px] bg-[#32B83F]" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#32B83F]">
              Hand-Picked Selection
            </span>
            <span className="w-8 h-[2px] bg-[#32B83F]" />
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-heading">
            Featured Products
          </h2>

          <p className="mt-3 text-sm sm:text-base text-[#A7ADB2] leading-relaxed">
            Smart technology and everyday essentials selected for modern lifestyles.
          </p>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-7">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#32B83F] text-white shadow-md shadow-[#32B83F]/25'
                    : 'bg-[#171B20] text-gray-400 hover:text-white hover:bg-[#20262E] border border-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 4-Column Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onQuickView={onQuickView}
              onToggleWishlist={onToggleWishlist}
              isWishlisted={wishlistIds.includes(product.id)}
              onSelectProduct={onSelectProduct}
            />
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-12 text-center">
          <button
            id="view-all-featured-btn"
            onClick={onViewAllProducts}
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-xl bg-[#14181D] hover:bg-[#1C222A] text-white border border-white/15 hover:border-[#32B83F]/60 font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5 group"
          >
            <span>View All Products in Catalog</span>
            <ArrowRight className="w-4 h-4 text-[#32B83F] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
};
