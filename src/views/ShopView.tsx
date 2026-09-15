import React, { useState, useMemo } from 'react';
import { Search, Filter, SlidersHorizontal, ArrowUpDown, X, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { ProductCard } from '../components/ProductCard';

interface ShopViewProps {
  products: Product[];
  initialCategory?: string;
  initialFilter?: 'new' | 'bestseller';
  onAddToCart: (product: Product, e: React.MouseEvent) => void;
  onQuickView: (product: Product) => void;
  onToggleWishlist: (product: Product, e: React.MouseEvent) => void;
  wishlistIds: string[];
  onSelectProduct: (product: Product) => void;
}

export const ShopView: React.FC<ShopViewProps> = ({
  products,
  initialCategory,
  initialFilter,
  onAddToCart,
  onQuickView,
  onToggleWishlist,
  wishlistIds,
  onSelectProduct,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory || 'All');
  const [maxPrice, setMaxPrice] = useState<number>(450);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest'>('featured');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'all' | 'new' | 'bestseller'>(initialFilter || 'all');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Sync initial params if changed
  React.useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);

  React.useEffect(() => {
    if (initialFilter) {
      setActiveFilter(initialFilter);
    }
  }, [initialFilter]);

  const categories = [
    'All',
    'Audio',
    'Smart Wearables',
    'Gaming',
    'Mobile Accessories',
    'Smart Home',
    'Work & Productivity',
  ];

  // Filtering & Sorting logic
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category
      if (selectedCategory !== 'All' && p.category !== selectedCategory) {
        return false;
      }
      // Price
      if (p.price > maxPrice) {
        return false;
      }
      // Search
      if (
        searchQuery.trim() &&
        !p.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !p.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !p.features.some((f) => f.toLowerCase().includes(searchQuery.toLowerCase()))
      ) {
        return false;
      }
      // In Stock
      if (inStockOnly && !p.inStock) {
        return false;
      }
      // Tag filter
      if (activeFilter === 'new' && !p.isNewArrival && p.badge !== 'New') {
        return false;
      }
      if (activeFilter === 'bestseller' && !p.isBestSeller && p.badge !== 'Bestseller') {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [products, selectedCategory, maxPrice, searchQuery, inStockOnly, activeFilter, sortBy]);

  const resetFilters = () => {
    setSelectedCategory('All');
    setMaxPrice(450);
    setSearchQuery('');
    setInStockOnly(false);
    setActiveFilter('all');
    setSortBy('featured');
  };

  const hasActiveFilters =
    selectedCategory !== 'All' ||
    maxPrice < 450 ||
    searchQuery.trim() !== '' ||
    inStockOnly ||
    activeFilter !== 'all';

  return (
    <div id="shop-catalog-page" className="py-10 sm:py-14 bg-[#0B0D0F] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb / Title Bar */}
        <div className="mb-8">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#32B83F] mb-1">
            Store Catalog
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-heading">
                All Products
              </h1>
              <p className="mt-1 text-sm text-[#A7ADB2]">
                Explore our full lineup of precision-engineered gadgets and accessories.
              </p>
            </div>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
              className="lg:hidden inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#171B20] text-white border border-white/10 text-sm font-semibold self-start"
            >
              <Filter className="w-4 h-4 text-[#32B83F]" />
              <span>Filters &amp; Sort</span>
              {hasActiveFilters && (
                <span className="w-2 h-2 rounded-full bg-[#32B83F]" />
              )}
            </button>
          </div>
        </div>

        {/* Quick Collections Filter Badges */}
        <div className="flex flex-wrap items-center gap-2 mb-8 pb-4 border-b border-white/10">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeFilter === 'all'
                ? 'bg-[#32B83F] text-white shadow-md shadow-[#32B83F]/25'
                : 'bg-[#171B20] text-gray-400 hover:text-white border border-white/5'
            }`}
          >
            All Collections
          </button>
          <button
            onClick={() => setActiveFilter('new')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
              activeFilter === 'new'
                ? 'bg-[#32B83F] text-white shadow-md shadow-[#32B83F]/25'
                : 'bg-[#171B20] text-gray-400 hover:text-white border border-white/5'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            New Arrivals
          </button>
          <button
            onClick={() => setActiveFilter('bestseller')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeFilter === 'bestseller'
                ? 'bg-[#32B83F] text-white shadow-md shadow-[#32B83F]/25'
                : 'bg-[#171B20] text-gray-400 hover:text-white border border-white/5'
            }`}
          >
            Best Sellers
          </button>
        </div>

        {/* Main Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* SIDEBAR FILTERS (Desktop) */}
          <div
            className={`lg:block ${
              isMobileFilterOpen
                ? 'block fixed inset-0 z-50 p-6 bg-[#0B0D0F] overflow-y-auto'
                : 'hidden'
            } lg:relative lg:p-0`}
          >
            {/* Mobile modal header */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10 lg:hidden">
              <h3 className="text-lg font-bold text-white font-heading">
                Filter Products
              </h3>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-2 text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 rounded-2xl bg-[#121518] border border-white/10 space-y-6">
              
              {/* Search Filter */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-gray-300 block mb-2">
                  Search Catalog
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search keywords..."
                    className="w-full px-3.5 py-2.5 pl-9 text-xs bg-[#1A1F26] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#32B83F]"
                  />
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                </div>
              </div>

              {/* Category Filter List */}
              <div className="pt-4 border-t border-white/5">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-300 block mb-3">
                  Categories
                </label>
                <div className="space-y-1.5">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors ${
                        selectedCategory === cat
                          ? 'bg-[#32B83F]/20 text-[#32B83F] border border-[#32B83F]/30 font-bold'
                          : 'text-gray-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <span>{cat}</span>
                      <span className="text-[10px] text-gray-500">
                        {cat === 'All'
                          ? products.length
                          : products.filter((p) => p.category === cat).length}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range Slider */}
              <div className="pt-4 border-t border-white/5">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-300">
                    Max Price
                  </label>
                  <span className="text-xs font-bold text-[#32B83F]">
                    ${maxPrice}
                  </span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="450"
                  step="10"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#32B83F] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-gray-500 mt-1 font-mono">
                  <span>$50</span>
                  <span>$250</span>
                  <span>$450+</span>
                </div>
              </div>

              {/* In Stock Filter */}
              <div className="pt-4 border-t border-white/5">
                <label className="flex items-center gap-2.5 text-xs text-gray-300 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="w-4 h-4 rounded border-white/20 bg-[#1A1F26] text-[#32B83F] focus:ring-0 accent-[#32B83F]"
                  />
                  <span>Show In-Stock Items Only</span>
                </label>
              </div>

              {/* Reset Action */}
              {hasActiveFilters && (
                <div className="pt-4 border-t border-white/5">
                  <button
                    onClick={resetFilters}
                    className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white text-xs font-semibold border border-white/10 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Clear All Filters</span>
                  </button>
                </div>
              )}

              {/* Mobile apply button */}
              {isMobileFilterOpen && (
                <div className="pt-4 lg:hidden">
                  <button
                    onClick={() => setIsMobileFilterOpen(false)}
                    className="w-full py-3 rounded-xl bg-[#32B83F] text-white font-bold text-sm"
                  >
                    Show {filteredProducts.length} Results
                  </button>
                </div>
              )}

            </div>
          </div>

          {/* MAIN PRODUCT GRID */}
          <div className="lg:col-span-3">
            
            {/* Top Toolbar: Result count + Sort dropdown */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 p-4 rounded-xl bg-[#121518] border border-white/5">
              <div className="text-xs text-gray-400">
                Showing <strong className="text-white">{filteredProducts.length}</strong> of{' '}
                <strong className="text-white">{products.length}</strong> products
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400 font-medium">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-3 py-1.5 bg-[#1A1F26] text-white text-xs font-semibold rounded-lg border border-white/10 focus:outline-none focus:border-[#32B83F] cursor-pointer"
                >
                  <option value="featured">Featured Picks</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest Releases</option>
                </select>
              </div>
            </div>

            {/* Empty State */}
            {filteredProducts.length === 0 ? (
              <div className="py-16 text-center rounded-2xl bg-[#121518] border border-white/5 p-8">
                <div className="w-14 h-14 rounded-2xl bg-[#1A1F26] border border-white/10 flex items-center justify-center mx-auto mb-4 text-gray-400">
                  <Filter className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white font-heading">
                  No products matched your criteria
                </h3>
                <p className="text-xs text-gray-400 mt-1 max-w-sm mx-auto">
                  Try widening your price range, clearing search keywords, or selecting a different category.
                </p>
                <button
                  onClick={resetFilters}
                  className="mt-5 px-5 py-2.5 rounded-xl bg-[#32B83F] hover:bg-[#27A936] text-white font-bold text-xs transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
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
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
