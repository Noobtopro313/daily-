import React, { useState } from 'react';
import { X, Star, ShoppingBag, Check, ShieldCheck, Truck, ArrowRight } from 'lucide-react';
import { Product } from '../types';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, color?: string) => void;
  onViewProductDetail: (product: Product) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onViewProductDetail,
}) => {
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [added, setAdded] = useState(false);

  // Sync state when product opens
  React.useEffect(() => {
    if (product) {
      setSelectedImage(product.image);
      setSelectedColor(product.colors[0]?.name || '');
      setQuantity(1);
      setAdded(false);
    }
  }, [product]);

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart(product, quantity, selectedColor);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 lg:p-8 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-3xl bg-[#121518] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          id="quickview-modal-close-btn"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/50 hover:bg-black text-gray-300 hover:text-white border border-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* LEFT: Image Gallery Preview */}
          <div className="p-6 bg-[#171B20] flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/10">
            <div className="relative aspect-square bg-white rounded-xl p-6 flex items-center justify-center overflow-hidden">
              <img
                src={selectedImage || product.image}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain mix-blend-multiply transition-all duration-300"
              />
              {product.badge && (
                <span className="absolute top-3 left-3 px-2.5 py-1 text-[10px] font-extrabold uppercase rounded bg-[#32B83F] text-white">
                  {product.badge}
                </span>
              )}
            </div>

            {/* Thumbnail switcher */}
            {product.gallery && product.gallery.length > 1 && (
              <div className="flex gap-2 mt-4 overflow-x-auto pb-1">
                {product.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`w-14 h-14 rounded-lg bg-white p-1 border-2 transition-all flex-shrink-0 ${
                      (selectedImage || product.image) === img
                        ? 'border-[#32B83F] ring-2 ring-[#32B83F]/30'
                        : 'border-transparent opacity-70 hover:opacity-100'
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

          {/* RIGHT: Product Details & Purchase Form */}
          <div className="p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#32B83F] mb-1">
                {product.category}
              </div>

              <h2 className="text-xl sm:text-2xl font-extrabold text-white font-heading">
                {product.name}
              </h2>

              {/* Star Rating */}
              <div className="flex items-center gap-2 mt-2">
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
                <span className="text-xs font-bold text-white">{product.rating}</span>
                <span className="text-xs text-gray-400">({product.reviewCount} customer reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-2 mt-4">
                <span className="text-2xl font-extrabold text-white font-heading">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-400 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
                <span className="text-xs text-[#32B83F] font-semibold ml-2">
                  In Stock ({product.stockCount} units)
                </span>
              </div>

              {/* Short Description */}
              <p className="mt-3 text-xs sm:text-sm text-gray-300 leading-relaxed">
                {product.shortDescription}
              </p>

              {/* Color swatches */}
              {product.colors && product.colors.length > 0 && (
                <div className="mt-5">
                  <div className="text-xs font-semibold text-gray-300 mb-2">
                    Finish: <span className="text-white font-bold">{selectedColor}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {product.colors.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c.name)}
                        className={`w-7 h-7 rounded-full border-2 transition-all flex items-center justify-center ${
                          selectedColor === c.name
                            ? 'border-[#32B83F] ring-2 ring-[#32B83F]/30 scale-110'
                            : 'border-white/20 hover:scale-105'
                        }`}
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Key Features */}
              <div className="mt-4 space-y-1.5 text-xs text-gray-300">
                {product.features.slice(0, 3).map((feat, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#32B83F] mt-1.5 flex-shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 pt-4 border-t border-white/10 space-y-3">
              <div className="flex items-center gap-3">
                {/* Quantity */}
                <div className="flex items-center border border-white/15 rounded-xl bg-[#0B0D0F]">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-gray-400 hover:text-white"
                  >
                    -
                  </button>
                  <span className="px-3 py-2 text-sm font-bold text-white min-w-[32px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-gray-400 hover:text-white"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart CTA */}
                <button
                  onClick={handleAdd}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-bold text-sm tracking-wide transition-all ${
                    added
                      ? 'bg-emerald-700 text-white'
                      : 'bg-[#32B83F] hover:bg-[#27A936] text-white shadow-lg shadow-[#32B83F]/25 hover:shadow-[#32B83F]/40 cursor-pointer'
                  }`}
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Cart</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Cart - ${(product.price * quantity).toFixed(2)}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Full Details link */}
              <button
                onClick={() => {
                  onClose();
                  onViewProductDetail(product);
                }}
                className="w-full py-2 text-center text-xs font-semibold text-gray-400 hover:text-[#32B83F] transition-colors flex items-center justify-center gap-1 group"
              >
                <span>View Complete Specifications &amp; Reviews</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
