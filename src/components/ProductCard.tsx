import React, { useState } from 'react';
import { Star, ShoppingBag, Eye, Heart, Check } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, e: React.MouseEvent) => void;
  onQuickView: (product: Product) => void;
  onToggleWishlist: (product: Product, e: React.MouseEvent) => void;
  isWishlisted: boolean;
  onSelectProduct: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onQuickView,
  onToggleWishlist,
  isWishlisted,
  onSelectProduct,
}) => {
  const [isAdded, setIsAdded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleAddClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, e);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1400);
  };

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <div
      id={`product-card-${product.id}`}
      onClick={() => onSelectProduct(product)}
      className="group relative bg-[#F5F6F7] rounded-xl sm:rounded-2xl border border-black/5 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl light-card-shadow cursor-pointer select-none"
    >
      {/* Top Image Container */}
      <div className="relative w-full aspect-square bg-[#FFFFFF] p-4 sm:p-6 flex items-center justify-center overflow-hidden border-b border-black/[0.04]">
        
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 pointer-events-none">
          {product.badge && (
            <span
              className={`px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wider rounded-md shadow-sm ${
                product.badge === 'Sale'
                  ? 'bg-rose-500 text-white'
                  : product.badge === 'New'
                  ? 'bg-[#32B83F] text-white'
                  : product.badge === 'Bestseller'
                  ? 'bg-[#151719] text-[#32B83F] border border-[#32B83F]/30'
                  : 'bg-[#151719] text-white'
              }`}
            >
              {product.badge}
            </span>
          )}
          {discountPercent && (
            <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-[#32B83F]/15 text-[#23802c] border border-[#32B83F]/20">
              Save {discountPercent}%
            </span>
          )}
        </div>

        {/* Action icons (Wishlist & Quick View) */}
        <div className="absolute top-3 right-3 z-10 flex flex-col gap-1.5 sm:opacity-0 sm:group-hover:opacity-100 sm:translate-x-1 sm:group-hover:translate-x-0 transition-all duration-200">
          {/* Wishlist button */}
          <button
            id={`wishlist-btn-${product.id}`}
            onClick={(e) => onToggleWishlist(product, e)}
            aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            className={`p-2 rounded-full shadow-md backdrop-blur-md transition-all ${
              isWishlisted
                ? 'bg-rose-50 text-rose-500 border border-rose-200'
                : 'bg-white/90 text-gray-600 hover:text-rose-500 hover:bg-white border border-gray-200'
            }`}
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500 stroke-rose-500' : ''}`} />
          </button>

          {/* Quick view button */}
          <button
            id={`quickview-btn-${product.id}`}
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            aria-label="Quick view product"
            className="p-2 rounded-full bg-white/90 hover:bg-white text-gray-700 hover:text-[#32B83F] shadow-md border border-gray-200 backdrop-blur-md transition-all"
            title="Quick view"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Product Image */}
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-contain mix-blend-multiply transition-transform duration-500 ease-out group-hover:scale-105 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading="lazy"
        />

        {/* Loading shimmer fallback */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-100 animate-pulse flex items-center justify-center">
            <span className="w-8 h-8 rounded-full border-2 border-gray-300 border-t-[#32B83F] animate-spin" />
          </div>
        )}
      </div>

      {/* Product Information Body */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between bg-[#F5F6F7]">
        <div>
          {/* Category */}
          <div className="text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1">
            {product.category}
          </div>

          {/* Product Name */}
          <h3 className="text-[15px] sm:text-[17px] font-bold text-[#151719] line-clamp-1 group-hover:text-[#23802c] transition-colors">
            {product.name}
          </h3>

          {/* Star Rating & Reviews */}
          <div className="flex items-center gap-1.5 mt-1.5">
            <div className="flex items-center text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < Math.floor(product.rating)
                      ? 'fill-amber-400 text-amber-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs font-semibold text-gray-700">
              {product.rating}
            </span>
            <span className="text-xs text-gray-400">
              ({product.reviewCount})
            </span>
          </div>
        </div>

        {/* Price & Add to Cart row */}
        <div className="mt-4 pt-3 border-t border-black/5 flex items-center justify-between gap-2">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg sm:text-xl font-extrabold text-[#151719] tracking-tight">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-gray-400 line-through font-medium">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            <span className="text-[10px] text-emerald-700 font-semibold">
              Free Express Shipping
            </span>
          </div>

          {/* Add to Cart CTA */}
          <button
            id={`add-to-cart-${product.id}`}
            onClick={handleAddClick}
            aria-label={`Add ${product.name} to cart`}
            className={`inline-flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2 rounded-lg font-bold text-xs sm:text-sm tracking-wide transition-all shadow-sm ${
              isAdded
                ? 'bg-emerald-700 text-white'
                : 'bg-[#32B83F] hover:bg-[#27A936] text-white hover:shadow-md hover:shadow-[#32B83F]/30 active:scale-95'
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-4 h-4 stroke-[3]" />
                <span className="hidden sm:inline">Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
