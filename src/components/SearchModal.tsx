import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, Star, Tag } from 'lucide-react';
import { Product } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onFilterCategory: (categoryName: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
  onFilterCategory,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filtered = query.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.tagline.toLowerCase().includes(query.toLowerCase()) ||
          p.features.some((f) => f.toLowerCase().includes(query.toLowerCase()))
      )
    : [];

  const popularSearches = ['Earbuds', 'Titanium Watch', 'Noise Cancelling', 'Mechanical Keyboard', 'GaN Charger', 'Smart Lamp'];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 lg:p-8 flex items-start justify-center pt-20">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal box */}
      <div className="relative w-full max-w-2xl bg-[#121518] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Search Input bar */}
        <div className="p-4 sm:p-5 border-b border-white/10 flex items-center gap-3 bg-[#0B0D0F]">
          <Search className="w-5 h-5 text-[#32B83F] flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search audio, watches, gaming gear, charging..."
            className="w-full bg-transparent text-white placeholder-gray-500 text-base sm:text-lg focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-gray-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs font-semibold px-2 py-1 rounded bg-[#1A1F26] border border-white/10 text-gray-400 hover:text-white"
          >
            ESC
          </button>
        </div>

        {/* Results Area */}
        <div className="p-5 max-h-[60vh] overflow-y-auto">
          {query.trim() === '' ? (
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-[#32B83F]" />
                Trending Searches
              </div>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-3 py-1.5 rounded-lg bg-[#1A1E23] text-gray-300 hover:text-white hover:bg-[#32B83F]/20 text-xs font-medium border border-white/5 transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-white/5">
                <div className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
                  Browse by Department
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {['Audio', 'Smart Wearables', 'Gaming', 'Mobile Accessories', 'Smart Home', 'Work & Productivity'].map(
                    (cat) => (
                      <button
                        key={cat}
                        onClick={() => {
                          onClose();
                          onFilterCategory(cat);
                        }}
                        className="p-3 text-left rounded-xl bg-[#171B20] hover:bg-[#20262E] text-gray-300 hover:text-white text-xs font-semibold border border-white/5 transition-colors flex items-center justify-between"
                      >
                        <span>{cat}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-gray-500" />
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-12 text-center text-gray-400">
              <p className="text-sm">No products found matching &ldquo;{query}&rdquo;.</p>
              <p className="text-xs text-gray-500 mt-1">
                Try searching for general terms like &ldquo;audio&rdquo;, &ldquo;watch&rdquo;, or &ldquo;charging&rdquo;.
              </p>
            </div>
          ) : (
            <div className="space-y-2.5">
              <div className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                Found {filtered.length} matching products
              </div>
              {filtered.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    onClose();
                    onSelectProduct(item);
                  }}
                  className="flex items-center gap-4 p-3 rounded-xl bg-[#171B20] hover:bg-[#1E232A] border border-white/5 hover:border-[#32B83F]/40 cursor-pointer transition-all group"
                >
                  <div className="w-14 h-14 rounded-lg bg-white p-1.5 flex items-center justify-center flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain mix-blend-multiply"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-[#32B83F]">
                      {item.category}
                    </div>
                    <div className="text-sm font-bold text-white group-hover:text-[#32B83F] transition-colors truncate">
                      {item.name}
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs font-bold text-white">${item.price.toFixed(2)}</span>
                      <div className="flex items-center text-amber-400 text-[11px]">
                        <Star className="w-3 h-3 fill-amber-400 mr-0.5" />
                        <span>{item.rating}</span>
                      </div>
                    </div>
                  </div>

                  <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
