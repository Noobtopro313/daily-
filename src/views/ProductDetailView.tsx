import React, { useState } from 'react';
import {
  Star,
  ShoppingBag,
  Heart,
  Truck,
  ShieldCheck,
  RotateCcw,
  Zap,
  CheckCircle2,
  ChevronRight,
  ArrowLeft,
  Share2,
  Sparkles,
} from 'lucide-react';
import { Product } from '../types';
import { ProductCard } from '../components/ProductCard';
import { SAMPLE_REVIEWS } from '../data/products';

interface ProductDetailViewProps {
  product: Product;
  allProducts: Product[];
  onBackToShop: () => void;
  onAddToCart: (product: Product, quantity: number, color?: string) => void;
  onQuickView: (product: Product) => void;
  onToggleWishlist: (product: Product, e: React.MouseEvent) => void;
  isWishlisted: boolean;
  wishlistIds: string[];
  onSelectProduct: (product: Product) => void;
  onOpenCart: () => void;
  onAskAi?: (product: Product) => void;
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({
  product,
  allProducts,
  onBackToShop,
  onAddToCart,
  onQuickView,
  onToggleWishlist,
  isWishlisted,
  wishlistIds,
  onSelectProduct,
  onOpenCart,
  onAskAi,
}) => {
  const [selectedImage, setSelectedImage] = useState<string>(product.image);
  const [selectedColor, setSelectedColor] = useState<string>(
    product.colors[0]?.name || 'Standard'
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'overview' | 'specs' | 'reviews'>('overview');
  const [reviews, setReviews] = useState(SAMPLE_REVIEWS);
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewTitle, setNewReviewTitle] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  // Sync state if product changes
  React.useEffect(() => {
    setSelectedImage(product.image);
    setSelectedColor(product.colors[0]?.name || 'Standard');
    setQuantity(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [product]);

  const relatedProducts = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    onAddToCart(product, quantity, selectedColor);
  };

  const handleBuyNow = () => {
    onAddToCart(product, quantity, selectedColor);
    onOpenCart();
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewComment.trim()) return;

    const newRev = {
      id: `rev-${Date.now()}`,
      author: newReviewAuthor.trim(),
      rating: newReviewRating,
      date: 'Just now',
      title: newReviewTitle.trim() || 'Verified Customer Review',
      comment: newReviewComment.trim(),
      verified: true,
    };

    setReviews([newRev, ...reviews]);
    setReviewSubmitted(true);
    setNewReviewAuthor('');
    setNewReviewTitle('');
    setNewReviewComment('');
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <div id="product-detail-view" className="py-8 sm:py-12 bg-[#0B0D0F] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between gap-4 mb-8 text-xs text-gray-400">
          <button
            onClick={onBackToShop}
            className="inline-flex items-center gap-1.5 text-gray-300 hover:text-[#32B83F] font-semibold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Products</span>
          </button>

          <div className="hidden sm:flex items-center gap-2">
            <span>Shop</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-[#32B83F]">{product.category}</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-white truncate max-w-xs">{product.name}</span>
          </div>

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#171B20] text-gray-300 hover:text-white border border-white/10 transition-colors"
          >
            <Share2 className="w-3.5 h-3.5 text-[#32B83F]" />
            <span>{isCopied ? 'Link Copied!' : 'Share'}</span>
          </button>
        </div>

        {/* TOP PRODUCT SECTION: Gallery + Purchase Config */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-16">
          
          {/* LEFT: Image Gallery (cols 1-7) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {/* Big Main Showcase View */}
            <div className="relative aspect-square sm:aspect-[4/3] rounded-2xl bg-[#FFFFFF] p-8 sm:p-12 flex items-center justify-center border border-black/5 shadow-2xl overflow-hidden group">
              {product.badge && (
                <span className="absolute top-4 left-4 px-3 py-1 text-xs font-extrabold uppercase tracking-wider rounded-md bg-[#32B83F] text-white shadow-md z-10">
                  {product.badge}
                </span>
              )}

              <img
                src={selectedImage}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
              />

              <button
                onClick={(e) => onToggleWishlist(product, e)}
                className={`absolute top-4 right-4 p-3 rounded-full shadow-lg backdrop-blur-md transition-all z-10 ${
                  isWishlisted
                    ? 'bg-rose-50 text-rose-500 border border-rose-200'
                    : 'bg-white/90 text-gray-600 hover:text-rose-500 border border-gray-200'
                }`}
                title={isWishlisted ? 'Saved in Wishlist' : 'Save to Wishlist'}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-rose-500 stroke-rose-500' : ''}`} />
              </button>
            </div>

            {/* Thumbnail Row */}
            {product.gallery && product.gallery.length > 0 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-white p-2 border-2 transition-all flex-shrink-0 cursor-pointer overflow-hidden ${
                      selectedImage === img
                        ? 'border-[#32B83F] ring-2 ring-[#32B83F]/30 shadow-md'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain mix-blend-multiply"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: Product Buy Form & Specs (cols 8-12) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              {/* Category */}
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#32B83F]/15 border border-[#32B83F]/30 text-[#32B83F] text-xs font-bold uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                {product.category}
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight font-heading leading-tight">
                {product.name}
              </h1>

              {/* Tagline */}
              <p className="mt-1 text-sm text-gray-300 font-medium leading-normal">
                {product.tagline}
              </p>

              {/* Rating & Reviews */}
              <div className="flex items-center gap-3 mt-3 pb-4 border-b border-white/10">
                <div className="flex items-center text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-gray-600'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-bold text-white">{product.rating}</span>
                <span className="text-xs text-gray-400">({product.reviewCount} customer reviews)</span>
                <span className="text-xs text-gray-600">•</span>
                <span className="text-xs font-semibold text-[#32B83F] flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> In Stock ({product.stockCount} left)
                </span>
              </div>

              {/* Pricing Box */}
              <div className="my-5 p-4 rounded-xl bg-[#14181D] border border-white/10 flex items-center justify-between">
                <div>
                  <div className="flex items-baseline gap-2.5">
                    <span className="text-3xl font-extrabold text-white font-heading">
                      ${product.price.toFixed(2)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-base text-gray-400 line-through font-medium">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-[#32B83F] font-semibold mt-0.5 block">
                    Tax included • Free Worldwide Express Shipping
                  </span>
                </div>

                {discount && (
                  <div className="px-3 py-1.5 rounded-lg bg-[#32B83F]/20 text-[#32B83F] border border-[#32B83F]/30 text-xs font-bold uppercase tracking-wider text-center">
                    Save {discount}%
                  </div>
                )}
              </div>

              {/* Color Finish Selection */}
              {product.colors && product.colors.length > 0 && (
                <div className="mb-6">
                  <div className="text-xs font-bold uppercase tracking-wider text-gray-300 mb-2.5">
                    Selected Finish:{' '}
                    <span className="text-white font-extrabold">{selectedColor}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    {product.colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color.name)}
                        className={`group relative p-1 rounded-full transition-all ${
                          selectedColor === color.name
                            ? 'ring-2 ring-[#32B83F] ring-offset-2 ring-offset-[#0B0D0F]'
                            : 'hover:opacity-80'
                        }`}
                      >
                        <span
                          className="block w-8 h-8 rounded-full border border-white/20 shadow-sm"
                          style={{ backgroundColor: color.hex }}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selector + Add to Cart + Buy Now */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3">
                  {/* Quantity */}
                  <div className="flex items-center border border-white/15 rounded-xl bg-[#14181D] px-2 py-1">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 text-gray-400 hover:text-white transition-colors"
                      aria-label="Decrease"
                    >
                      -
                    </button>
                    <span className="px-3 text-sm font-bold text-white min-w-[32px] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2 text-gray-400 hover:text-white transition-colors"
                      aria-label="Increase"
                    >
                      +
                    </button>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    id="pdp-add-to-cart-btn"
                    onClick={handleAddToCart}
                    className="flex-1 flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-xl bg-[#32B83F] hover:bg-[#27A936] text-white font-bold text-sm tracking-wide shadow-lg shadow-[#32B83F]/30 hover:shadow-[#32B83F]/45 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart — ${(product.price * quantity).toFixed(2)}</span>
                  </button>
                </div>

                {/* Buy Now Button */}
                <button
                  id="pdp-buy-now-btn"
                  onClick={handleBuyNow}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-[#1A1F26] hover:bg-[#222832] text-white border border-white/15 hover:border-[#32B83F]/50 font-bold text-sm tracking-wide transition-all duration-200 cursor-pointer"
                >
                  <Zap className="w-4 h-4 text-[#32B83F]" />
                  <span>Instant Checkout</span>
                </button>

                {/* Ask AI Advisor Button */}
                {onAskAi && (
                  <button
                    type="button"
                    onClick={() => onAskAi(product)}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#32B83F]/15 to-blue-500/15 hover:from-[#32B83F]/25 hover:to-blue-500/25 text-[#32B83F] border border-[#32B83F]/30 hover:border-[#32B83F]/60 text-xs font-bold tracking-wide transition-all cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#32B83F] animate-pulse" />
                    <span>Ask AI Assistant About This Product</span>
                  </button>
                )}
              </div>

              {/* Guarantees Box */}
              <div className="p-4 rounded-xl bg-[#121518] border border-white/5 space-y-2.5 text-xs text-gray-300">
                <div className="flex items-center gap-2.5">
                  <Truck className="w-4 h-4 text-[#32B83F] flex-shrink-0" />
                  <span>Free tracked shipping on this item (delivery in 2-4 business days)</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#32B83F] flex-shrink-0" />
                  <span>2-Year Comprehensive Nexora Hardware Protection</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <RotateCcw className="w-4 h-4 text-[#32B83F] flex-shrink-0" />
                  <span>30-Day risk-free trial with pre-paid return label</span>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* BOTTOM TABS SECTION: Overview, Technical Specs, Customer Reviews */}
        <div className="border-t border-white/10 pt-10 mb-16">
          <div className="flex border-b border-white/10 gap-6 text-sm font-bold">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-3 border-b-2 transition-colors ${
                activeTab === 'overview'
                  ? 'border-[#32B83F] text-white'
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              Overview &amp; Features
            </button>
            <button
              onClick={() => setActiveTab('specs')}
              className={`pb-3 border-b-2 transition-colors ${
                activeTab === 'specs'
                  ? 'border-[#32B83F] text-white'
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              Technical Specifications
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-3 border-b-2 transition-colors ${
                activeTab === 'reviews'
                  ? 'border-[#32B83F] text-white'
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              Verified Customer Reviews ({reviews.length})
            </button>
          </div>

          <div className="py-8">
            {activeTab === 'overview' && (
              <div className="space-y-6 max-w-4xl">
                <p className="text-base text-gray-300 leading-relaxed">
                  {product.fullDescription}
                </p>

                <div>
                  <h3 className="text-lg font-bold text-white mb-4 font-heading">
                    Key Highlights &amp; Innovations
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {product.features.map((feat, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl bg-[#14181D] border border-white/5 flex items-start gap-3"
                      >
                        <CheckCircle2 className="w-5 h-5 text-[#32B83F] flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-200">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="max-w-3xl">
                <h3 className="text-lg font-bold text-white mb-4 font-heading">
                  Engineered Specifications
                </h3>
                <div className="rounded-xl overflow-hidden border border-white/10">
                  <table className="w-full text-left text-sm">
                    <tbody>
                      {product.specs.map((spec, i) => (
                        <tr
                          key={i}
                          className={i % 2 === 0 ? 'bg-[#14181D]' : 'bg-[#0E1114]'}
                        >
                          <td className="py-3 px-4 font-semibold text-gray-400 w-1/3 border-b border-white/5">
                            {spec.name}
                          </td>
                          <td className="py-3 px-4 text-white font-medium border-b border-white/5">
                            {spec.value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-8 max-w-4xl">
                
                {/* Write a Review Form */}
                <div className="p-6 rounded-2xl bg-[#14181D] border border-white/10">
                  <h3 className="text-base font-bold text-white mb-2 font-heading">
                    Share Your Experience
                  </h3>
                  <p className="text-xs text-gray-400 mb-4">
                    Have you used {product.name}? Your feedback helps our community of technology enthusiasts.
                  </p>

                  {reviewSubmitted ? (
                    <div className="p-4 rounded-xl bg-[#32B83F]/10 border border-[#32B83F]/30 text-xs text-[#32B83F] font-semibold flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Thank you! Your verified review has been published.</span>
                    </div>
                  ) : (
                    <form onSubmit={handleAddReview} className="space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          type="text"
                          value={newReviewAuthor}
                          onChange={(e) => setNewReviewAuthor(e.target.value)}
                          placeholder="Your Name *"
                          className="px-3.5 py-2.5 text-xs bg-[#1A1F26] border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#32B83F]"
                          required
                        />
                        <input
                          type="text"
                          value={newReviewTitle}
                          onChange={(e) => setNewReviewTitle(e.target.value)}
                          placeholder="Headline / Summary (e.g. Exceptional sound clarity)"
                          className="px-3.5 py-2.5 text-xs bg-[#1A1F26] border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#32B83F]"
                        />
                      </div>

                      <div className="flex items-center gap-2 text-xs text-gray-300">
                        <span>Rating:</span>
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <button
                              key={s}
                              type="button"
                              onClick={() => setNewReviewRating(s)}
                              className="p-1 text-amber-400"
                            >
                              <Star
                                className={`w-4 h-4 ${
                                  s <= newReviewRating ? 'fill-amber-400' : 'text-gray-600'
                                }`}
                              />
                            </button>
                          ))}
                        </div>
                      </div>

                      <textarea
                        value={newReviewComment}
                        onChange={(e) => setNewReviewComment(e.target.value)}
                        placeholder="Write your detailed review here..."
                        rows={3}
                        className="w-full px-3.5 py-2.5 text-xs bg-[#1A1F26] border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-[#32B83F]"
                        required
                      />

                      <button
                        type="submit"
                        className="px-5 py-2.5 rounded-lg bg-[#32B83F] hover:bg-[#27A936] text-white font-bold text-xs transition-colors"
                      >
                        Submit Verified Review
                      </button>
                    </form>
                  )}
                </div>

                {/* Reviews List */}
                <div className="space-y-4">
                  {reviews.map((rev) => (
                    <div
                      key={rev.id}
                      className="p-5 rounded-xl bg-[#121518] border border-white/5 space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-white">{rev.author}</span>
                          {rev.verified && (
                            <span className="text-[10px] px-2 py-0.5 rounded bg-[#32B83F]/20 text-[#32B83F] font-semibold flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" /> Verified Owner
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-gray-500">{rev.date}</span>
                      </div>

                      <div className="flex items-center text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < rev.rating ? 'fill-amber-400' : 'text-gray-600'
                            }`}
                          />
                        ))}
                      </div>

                      <h4 className="text-sm font-bold text-gray-200">{rev.title}</h4>
                      <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                        {rev.comment}
                      </p>
                    </div>
                  ))}
                </div>

              </div>
            )}
          </div>
        </div>

        {/* RELATED PRODUCTS */}
        {relatedProducts.length > 0 && (
          <div className="pt-12 border-t border-white/10">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white font-heading">
                  Frequently Paired Gear
                </h3>
                <p className="text-xs sm:text-sm text-gray-400 mt-1">
                  Customers who viewed this item also selected these accessories.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onAddToCart={(prod, e) => onAddToCart(prod, 1)}
                  onQuickView={onQuickView}
                  onToggleWishlist={onToggleWishlist}
                  isWishlisted={wishlistIds.includes(p.id)}
                  onSelectProduct={onSelectProduct}
                />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
