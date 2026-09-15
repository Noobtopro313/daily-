import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, Heart, User, Menu } from 'lucide-react';
import { ActivePage } from '../types';
import { Logo } from './Logo';

interface HeaderProps {
  activePage: ActivePage;
  onNavigate: (page: ActivePage, extra?: { category?: string; filter?: 'new' | 'bestseller' }) => void;
  onOpenSearch: () => void;
  onOpenCart: () => void;
  onOpenMobileMenu: () => void;
  onOpenAccount: () => void;
  cartCount: number;
  wishlistCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activePage,
  onNavigate,
  onOpenSearch,
  onOpenCart,
  onOpenMobileMenu,
  onOpenAccount,
  cartCount,
  wishlistCount,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      id="main-header"
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0B0D0F]/95 backdrop-blur-md shadow-lg shadow-black/40 border-b border-white/10'
          : 'bg-[#0B0D0F] border-b border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-[70px]">
          {/* LEFT: Brand Logo */}
          <div className="flex items-center flex-shrink-0">
            <Logo onClick={() => onNavigate('home')} />
          </div>

          {/* CENTER: Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <button
              id="nav-link-shop"
              onClick={() => onNavigate('shop')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all relative ${
                activePage === 'shop'
                  ? 'text-[#32B83F] font-semibold'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Shop
              {activePage === 'shop' && (
                <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#32B83F] rounded-full" />
              )}
            </button>

            <button
              id="nav-link-new-arrivals"
              onClick={() => onNavigate('shop', { filter: 'new' })}
              className="px-3 py-1.5 text-sm font-medium rounded-md text-gray-300 hover:text-white hover:bg-white/5 transition-all flex items-center gap-1.5"
            >
              New Arrivals
              <span className="inline-flex items-center px-1.5 py-0.2 text-[10px] font-bold uppercase rounded bg-[#32B83F]/20 text-[#32B83F] border border-[#32B83F]/30">
                New
              </span>
            </button>

            <button
              id="nav-link-best-sellers"
              onClick={() => onNavigate('shop', { filter: 'bestseller' })}
              className="px-3 py-1.5 text-sm font-medium rounded-md text-gray-300 hover:text-white hover:bg-white/5 transition-all"
            >
              Best Sellers
            </button>

            {/* Categories quick link */}
            <button
              id="nav-link-categories"
              onClick={() => {
                if (activePage === 'home') {
                  const el = document.getElementById('shop-by-category');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                  else onNavigate('shop');
                } else {
                  onNavigate('home');
                  setTimeout(() => {
                    document.getElementById('shop-by-category')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }
              }}
              className="px-3 py-1.5 text-sm font-medium rounded-md text-gray-300 hover:text-white hover:bg-white/5 transition-all"
            >
              Categories
            </button>

            <button
              id="nav-link-about"
              onClick={() => onNavigate('about')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all relative ${
                activePage === 'about'
                  ? 'text-[#32B83F] font-semibold'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              About
              {activePage === 'about' && (
                <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#32B83F] rounded-full" />
              )}
            </button>

            <button
              id="nav-link-contact"
              onClick={() => onNavigate('contact')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all relative ${
                activePage === 'contact'
                  ? 'text-[#32B83F] font-semibold'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Contact
              {activePage === 'contact' && (
                <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#32B83F] rounded-full" />
              )}
            </button>
          </nav>

          {/* RIGHT: Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Trigger */}
            <button
              id="header-search-btn"
              onClick={onOpenSearch}
              aria-label="Search products"
              className="p-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors group relative"
              title="Search products (or press /)"
            >
              <Search className="w-5 h-5 group-hover:text-[#32B83F] transition-colors" />
            </button>

            {/* Account Trigger */}
            <button
              id="header-account-btn"
              onClick={onOpenAccount}
              aria-label="Account profile"
              className="hidden sm:inline-flex p-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors group"
              title="Customer Account"
            >
              <User className="w-5 h-5 group-hover:text-[#32B83F] transition-colors" />
            </button>

            {/* Wishlist Trigger */}
            <button
              id="header-wishlist-btn"
              onClick={() => onNavigate('shop')}
              aria-label="Wishlist items"
              className="hidden sm:inline-flex p-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors relative group"
              title="Saved items"
            >
              <Heart className="w-5 h-5 group-hover:text-[#32B83F] transition-colors" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#32B83F] text-white text-[10px] font-bold flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Shopping Cart Trigger */}
            <button
              id="header-cart-btn"
              onClick={onOpenCart}
              aria-label={`Shopping cart with ${cartCount} items`}
              className="flex items-center gap-2 py-1.5 px-3 rounded-lg bg-[#171B20] hover:bg-[#20252C] border border-white/10 hover:border-[#32B83F]/50 text-white transition-all group"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 text-gray-200 group-hover:text-[#32B83F] transition-colors" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 min-w-4 h-4 px-1 rounded-full bg-[#32B83F] text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden xl:inline text-xs font-semibold text-gray-300 group-hover:text-white">
                Cart
              </span>
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              id="header-mobile-menu-btn"
              onClick={onOpenMobileMenu}
              aria-label="Open mobile navigation menu"
              className="md:hidden p-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
