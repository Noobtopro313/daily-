import React from 'react';
import { X, Search, ShoppingBag, Heart, ArrowRight, ShieldCheck, Truck, Headphones } from 'lucide-react';
import { ActivePage } from '../types';
import { Logo } from './Logo';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  activePage: ActivePage;
  onNavigate: (page: ActivePage, extra?: { category?: string; filter?: 'new' | 'bestseller' }) => void;
  onOpenSearch: () => void;
  onOpenCart: () => void;
  cartCount: number;
  wishlistCount: number;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  activePage,
  onNavigate,
  onOpenSearch,
  onOpenCart,
  cartCount,
  wishlistCount,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Slide-in Panel */}
      <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-[#121518] border-l border-white/10 shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10">
          <Logo size="sm" onClick={() => { onNavigate('home'); onClose(); }} />
          <button
            id="mobile-menu-close-btn"
            onClick={onClose}
            aria-label="Close menu"
            className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Quick Search Bar */}
        <div className="p-4 border-b border-white/5">
          <button
            onClick={() => { onClose(); onOpenSearch(); }}
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg bg-[#1A1E23] text-gray-400 hover:text-white border border-white/5 text-sm transition-all"
          >
            <span className="flex items-center gap-2">
              <Search className="w-4 h-4 text-[#32B83F]" />
              Search premium gadgets...
            </span>
            <kbd className="text-[10px] bg-black/40 px-1.5 py-0.5 rounded border border-white/10 text-gray-500">
              /
            </kbd>
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
          <button
            id="mobile-nav-home"
            onClick={() => { onNavigate('home'); onClose(); }}
            className={`w-full flex items-center justify-between px-3.5 py-3 rounded-lg text-base font-medium transition-colors ${
              activePage === 'home'
                ? 'text-[#32B83F] bg-[#32B83F]/10 font-semibold'
                : 'text-gray-200 hover:text-white hover:bg-white/5'
            }`}
          >
            Home
            <ArrowRight className="w-4 h-4 text-gray-500" />
          </button>

          <button
            id="mobile-nav-shop"
            onClick={() => { onNavigate('shop'); onClose(); }}
            className={`w-full flex items-center justify-between px-3.5 py-3 rounded-lg text-base font-medium transition-colors ${
              activePage === 'shop'
                ? 'text-[#32B83F] bg-[#32B83F]/10 font-semibold'
                : 'text-gray-200 hover:text-white hover:bg-white/5'
            }`}
          >
            Shop All
            <ArrowRight className="w-4 h-4 text-gray-500" />
          </button>

          <button
            id="mobile-nav-new-arrivals"
            onClick={() => { onNavigate('shop', { filter: 'new' }); onClose(); }}
            className="w-full flex items-center justify-between px-3.5 py-3 rounded-lg text-base font-medium text-gray-200 hover:text-white hover:bg-white/5 transition-colors"
          >
            <span className="flex items-center gap-2">
              New Arrivals
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#32B83F]/20 text-[#32B83F] font-bold">
                NEW
              </span>
            </span>
            <ArrowRight className="w-4 h-4 text-gray-500" />
          </button>

          <button
            id="mobile-nav-best-sellers"
            onClick={() => { onNavigate('shop', { filter: 'bestseller' }); onClose(); }}
            className="w-full flex items-center justify-between px-3.5 py-3 rounded-lg text-base font-medium text-gray-200 hover:text-white hover:bg-white/5 transition-colors"
          >
            Best Sellers
            <ArrowRight className="w-4 h-4 text-gray-500" />
          </button>

          {/* Quick Categories list */}
          <div className="pt-2 pb-1">
            <div className="px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-gray-400">
              Popular Categories
            </div>
            <div className="grid grid-cols-2 gap-1.5 mt-1 px-1">
              {[
                { name: 'Audio', slug: 'Audio' },
                { name: 'Wearables', slug: 'Smart Wearables' },
                { name: 'Gaming', slug: 'Gaming' },
                { name: 'Productivity', slug: 'Work & Productivity' }
              ].map((c) => (
                <button
                  key={c.slug}
                  onClick={() => { onNavigate('shop', { category: c.slug }); onClose(); }}
                  className="text-left px-2.5 py-2 text-xs rounded bg-[#1A1E23] text-gray-300 hover:text-white hover:bg-[#32B83F]/20 transition-colors"
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>

          <button
            id="mobile-nav-about"
            onClick={() => { onNavigate('about'); onClose(); }}
            className={`w-full flex items-center justify-between px-3.5 py-3 rounded-lg text-base font-medium transition-colors ${
              activePage === 'about'
                ? 'text-[#32B83F] bg-[#32B83F]/10 font-semibold'
                : 'text-gray-200 hover:text-white hover:bg-white/5'
            }`}
          >
            About Us
            <ArrowRight className="w-4 h-4 text-gray-500" />
          </button>

          <button
            id="mobile-nav-contact"
            onClick={() => { onNavigate('contact'); onClose(); }}
            className={`w-full flex items-center justify-between px-3.5 py-3 rounded-lg text-base font-medium transition-colors ${
              activePage === 'contact'
                ? 'text-[#32B83F] bg-[#32B83F]/10 font-semibold'
                : 'text-gray-200 hover:text-white hover:bg-white/5'
            }`}
          >
            Contact Support
            <ArrowRight className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        {/* Footer info in drawer */}
        <div className="p-4 border-t border-white/10 bg-[#0B0D0F]/80 space-y-3">
          <div className="flex items-center justify-between gap-2">
            <button
              id="mobile-menu-cart-btn"
              onClick={() => { onClose(); onOpenCart(); }}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-[#32B83F] hover:bg-[#27A936] text-white font-semibold text-sm transition-all shadow-md"
            >
              <ShoppingBag className="w-4 h-4" />
              View Cart ({cartCount})
            </button>
            <button
              onClick={() => { onNavigate('shop'); onClose(); }}
              className="p-2.5 rounded-lg border border-white/10 bg-[#1A1E23] text-gray-300 hover:text-white hover:border-[#32B83F]/40"
              title="Wishlist items"
            >
              <Heart className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px] text-gray-400 pt-1">
            <div className="flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-[#32B83F]" />
              Free shipping $50+
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#32B83F]" />
              2-Year Warranty
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
