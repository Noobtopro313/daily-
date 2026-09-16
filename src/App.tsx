import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { MobileMenu } from './components/MobileMenu';
import { Hero } from './components/Hero';
import { BenefitsBar } from './components/BenefitsBar';
import { FeaturedProducts } from './components/FeaturedProducts';
import { CategorySection } from './components/CategorySection';
import { PromoBanner } from './components/PromoBanner';
import { CollectionCards } from './components/CollectionCards';
import { SpecialOffer } from './components/SpecialOffer';
import { Newsletter } from './components/Newsletter';
import { Footer } from './components/Footer';

// Modals & Drawers
import { CartDrawer } from './components/CartDrawer';
import { QuickViewModal } from './components/QuickViewModal';
import { SearchModal } from './components/SearchModal';
import { AccountModal } from './components/AccountModal';
import { Toast, ToastMessage } from './components/Toast';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { FloatingAiTrigger } from './components/FloatingAiTrigger';
import { AiAssistantModal } from './components/AiAssistantModal';

// Views
import { ShopView } from './views/ShopView';
import { ProductDetailView } from './views/ProductDetailView';
import { AboutView } from './views/AboutView';
import { ContactView } from './views/ContactView';
import { AdminView } from './views/AdminView';

// Data & Types
import { PRODUCTS } from './data/products';
import { Product, CartItem, ActivePage, StoreSettings } from './types';
import { initFacebookPixel, trackPixelEvent } from './utils/pixel';

const DEFAULT_SETTINGS: StoreSettings = {
  storeName: 'NEXORA TECH',
  supportEmail: 'support@nexoratech.com',
  whatsappNumber: '+923001234567',
  phoneNumber: '+1 (800) 555-0199',
  address: '742 Evergreen Horizon Blvd, Suite 400\nSan Francisco, CA 94105, United States',
  currency: 'USD ($)',
  announcementText: 'Free Express Shipping worldwide on orders over $50 | 30-Day Money Back Guarantee',
  enableWhatsappChat: true,
  facebookPixelId: '',
};

export default function App() {
  // Navigation State
  const [currentPage, setCurrentPage] = useState<ActivePage>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [shopCategoryFilter, setShopCategoryFilter] = useState<string>('All');
  const [shopTagFilter, setShopTagFilter] = useState<'new' | 'bestseller' | undefined>(undefined);

  // Store Settings with LocalStorage persistence
  const [storeSettings, setStoreSettings] = useState<StoreSettings>(() => {
    try {
      const saved = localStorage.getItem('nexora_store_settings');
      return saved ? { ...DEFAULT_SETTINGS, ...JSON.parse(saved) } : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  // Initialize Meta Pixel when pixel ID is set or changed
  useEffect(() => {
    if (storeSettings.facebookPixelId) {
      initFacebookPixel(storeSettings.facebookPixelId);
    }
  }, [storeSettings.facebookPixelId]);

  // Track PageView on page navigation
  useEffect(() => {
    trackPixelEvent('PageView', {
      page: currentPage,
      url: window.location.href,
    });
  }, [currentPage]);

  const handleUpdateSettings = (newSettings: StoreSettings) => {
    setStoreSettings(newSettings);
    try {
      localStorage.setItem('nexora_store_settings', JSON.stringify(newSettings));
    } catch (e) {
      console.warn('Unable to persist settings:', e);
    }
    addToast({
      type: 'info',
      title: 'Store Settings Updated',
      subtitle: 'WhatsApp number and store configurations are now live',
    });
  };

  // Products State (Supports Admin additions/deletions)
  const [productsList, setProductsList] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('nexora_products');
      return saved ? JSON.parse(saved) : PRODUCTS;
    } catch {
      return PRODUCTS;
    }
  });

  // Sync products to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('nexora_products', JSON.stringify(productsList));
    } catch (e) {
      console.warn('Unable to persist products:', e);
    }
  }, [productsList]);

  // Cart State with LocalStorage Persistence
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('nexora_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist State with LocalStorage Persistence
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('nexora_wishlist');
      return saved ? JSON.parse(saved) : ['prod-1', 'prod-4'];
    } catch {
      return ['prod-1', 'prod-4'];
    }
  });

  // UI Modal States
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('nexora_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.warn('Unable to persist cart:', e);
    }
  }, [cartItems]);

  // Sync wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('nexora_wishlist', JSON.stringify(wishlistIds));
    } catch (e) {
      console.warn('Unable to persist wishlist:', e);
    }
  }, [wishlistIds]);

  // Toast Helper
  const addToast = (toast: Omit<ToastMessage, 'id'>) => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { ...toast, id }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3800);
  };

  const handleDismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Cart Management
  const handleAddToCart = (
    product: Product,
    quantity = 1,
    color?: string,
    e?: React.MouseEvent
  ) => {
    if (e) e.stopPropagation();

    const chosenColor = color || product.colors[0]?.name || 'Standard';

    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedColor === chosenColor
      );

      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx].quantity += quantity;
        return next;
      } else {
        return [...prev, { product, quantity, selectedColor: chosenColor }];
      }
    });

    addToast({
      type: 'cart',
      title: `Added to Cart (${quantity}x)`,
      subtitle: `${product.name} • ${chosenColor}`,
      image: product.image,
    });

    // Facebook Pixel AddToCart Event
    trackPixelEvent('AddToCart', {
      content_name: product.name,
      content_category: product.category,
      content_ids: [product.id],
      content_type: 'product',
      value: product.price * quantity,
      currency: 'USD',
    });
  };

  const handleUpdateCartQuantity = (
    productId: string,
    delta: number,
    selectedColor?: string
  ) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId && item.selectedColor === selectedColor) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveFromCart = (productId: string, selectedColor?: string) => {
    setCartItems((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && item.selectedColor === selectedColor)
      )
    );
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Wishlist Toggle
  const handleToggleWishlist = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    const isSaved = wishlistIds.includes(product.id);
    if (isSaved) {
      setWishlistIds((prev) => prev.filter((id) => id !== product.id));
      addToast({
        type: 'wishlist',
        title: 'Removed from Wishlist',
        subtitle: product.name,
      });
    } else {
      setWishlistIds((prev) => [...prev, product.id]);
      addToast({
        type: 'wishlist',
        title: 'Saved to Wishlist',
        subtitle: product.name,
      });
    }
  };

  // Navigation handlers
  const navigateTo = (
    page: ActivePage,
    extra?: { category?: string; filter?: 'new' | 'bestseller' }
  ) => {
    setCurrentPage(page);
    if (extra?.category) {
      setShopCategoryFilter(extra.category);
    } else if (page === 'shop' && !extra) {
      setShopCategoryFilter('All');
    }
    setShopTagFilter(extra?.filter);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentPage('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Facebook Pixel ViewContent Event
    trackPixelEvent('ViewContent', {
      content_name: product.name,
      content_category: product.category,
      content_ids: [product.id],
      content_type: 'product',
      value: product.price,
      currency: 'USD',
    });
  };

  const handleAddProduct = (newProduct: Product) => {
    setProductsList((prev) => [newProduct, ...prev]);
    addToast({
      type: 'info',
      title: 'Product Published',
      subtitle: `${newProduct.name} is now live in the store catalog`,
      image: newProduct.image,
    });
  };

  const handleDeleteProduct = (productId: string) => {
    setProductsList((prev) => prev.filter((p) => p.id !== productId));
    addToast({
      type: 'info',
      title: 'Product Removed',
      subtitle: 'Item deleted from inventory catalog',
    });
  };

  const wishlistProducts = productsList.filter((p) => wishlistIds.includes(p.id));
  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#0B0D0F] text-white flex flex-col font-sans selection:bg-[#32B83F] selection:text-black">
      
      {/* Primary Sticky Header */}
      <Header
        activePage={currentPage}
        onNavigate={navigateTo}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAccount={() => setIsAccountOpen(true)}
        onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
        onOpenAiAssistant={() => setIsAiOpen(true)}
        cartCount={totalCartCount}
        wishlistCount={wishlistIds.length}
        announcementText={storeSettings.announcementText}
      />

      {/* Mobile Drawer Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        activePage={currentPage}
        onNavigate={(page) => {
          setIsMobileMenuOpen(false);
          navigateTo(page);
        }}
        onOpenCart={() => {
          setIsMobileMenuOpen(false);
          setIsCartOpen(true);
        }}
        onOpenSearch={() => {
          setIsMobileMenuOpen(false);
          setIsSearchOpen(true);
        }}
        onOpenAccount={() => {
          setIsMobileMenuOpen(false);
          setIsAccountOpen(true);
        }}
        onOpenAiAssistant={() => {
          setIsMobileMenuOpen(false);
          setIsAiOpen(true);
        }}
        cartCount={totalCartCount}
        wishlistCount={wishlistIds.length}
      />

      {/* Main Content Router */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <>
            {/* 1. Cinematic Hero Section */}
            <Hero
              onShopNow={() => navigateTo('shop')}
              onExploreDeals={() => navigateTo('shop', { filter: 'new' })}
            />

            {/* 2. Trust Benefits Bar */}
            <BenefitsBar />

            {/* 3. Featured Products Grid */}
            <FeaturedProducts
              products={productsList}
              onAddToCart={(p, e) => handleAddToCart(p, 1, undefined, e)}
              onQuickView={(p) => setQuickViewProduct(p)}
              onToggleWishlist={handleToggleWishlist}
              wishlistIds={wishlistIds}
              onSelectProduct={handleSelectProduct}
              onViewAllProducts={() => navigateTo('shop')}
            />

            {/* 4. Shop by Category */}
            <CategorySection
              onSelectCategory={(category) => navigateTo('shop', { category })}
            />

            {/* 5. Productivity Promo Banner */}
            <PromoBanner
              onExploreAccessories={() =>
                navigateTo('shop', { category: 'Work & Productivity' })
              }
            />

            {/* 6. New Arrivals / Best Sellers Dual Feature */}
            <CollectionCards
              onShopNewArrivals={() => navigateTo('shop', { filter: 'new' })}
              onShopBestSellers={() => navigateTo('shop', { filter: 'bestseller' })}
            />

            {/* 7. Special Offer & Conversion Guarantee */}
            <SpecialOffer onShopAll={() => navigateTo('shop')} />

            {/* 8. Newsletter Subscription */}
            <Newsletter />
          </>
        )}

        {currentPage === 'shop' && (
          <ShopView
            products={productsList}
            initialCategory={shopCategoryFilter}
            initialFilter={shopTagFilter}
            onAddToCart={(p, e) => handleAddToCart(p, 1, undefined, e)}
            onQuickView={(p) => setQuickViewProduct(p)}
            onToggleWishlist={handleToggleWishlist}
            wishlistIds={wishlistIds}
            onSelectProduct={handleSelectProduct}
          />
        )}

        {currentPage === 'product-detail' && selectedProduct && (
          <ProductDetailView
            product={selectedProduct}
            allProducts={productsList}
            onBackToShop={() => navigateTo('shop')}
            onAddToCart={(prod, qty, col) => handleAddToCart(prod, qty, col)}
            onQuickView={(p) => setQuickViewProduct(p)}
            onToggleWishlist={handleToggleWishlist}
            isWishlisted={wishlistIds.includes(selectedProduct.id)}
            wishlistIds={wishlistIds}
            onSelectProduct={handleSelectProduct}
            onOpenCart={() => setIsCartOpen(true)}
            onAskAi={() => setIsAiOpen(true)}
          />
        )}

        {currentPage === 'about' && (
          <AboutView onExploreCatalog={() => navigateTo('shop')} />
        )}

        {currentPage === 'contact' && <ContactView settings={storeSettings} />}

        {currentPage === 'admin' && (
          <AdminView
            products={productsList}
            onAddProduct={handleAddProduct}
            onDeleteProduct={handleDeleteProduct}
            onNavigateHome={() => navigateTo('home')}
            settings={storeSettings}
            onUpdateSettings={handleUpdateSettings}
          />
        )}
      </main>

      {/* Global Footer */}
      <Footer onNavigate={navigateTo} settings={storeSettings} />

      {/* Floating WhatsApp Live Chat Button */}
      {storeSettings.enableWhatsappChat && (
        <FloatingWhatsApp
          whatsappNumber={storeSettings.whatsappNumber}
          storeName={storeSettings.storeName}
        />
      )}

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        onNavigateToShop={() => {
          setIsCartOpen(false);
          navigateTo('shop');
        }}
        onCheckoutSuccess={(orderTotal, items) => {
          trackPixelEvent('Purchase', {
            content_type: 'product',
            content_ids: items.map((i) => i.product.id),
            contents: items.map((i) => ({
              id: i.product.id,
              quantity: i.quantity,
              item_price: i.product.price,
            })),
            value: orderTotal,
            currency: 'USD',
            num_items: items.reduce((acc, i) => acc + i.quantity, 0),
          });
        }}
      />

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={(p, qty, col) => handleAddToCart(p, qty, col)}
        onViewProductDetail={(p) => {
          setQuickViewProduct(null);
          handleSelectProduct(p);
        }}
      />

      {/* Live Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={productsList}
        onSelectProduct={handleSelectProduct}
        onFilterCategory={(cat) => {
          setIsSearchOpen(false);
          navigateTo('shop', { category: cat });
        }}
      />

      {/* Account / Saved Items Modal */}
      <AccountModal
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
        wishlistProducts={wishlistProducts}
        onSelectProduct={handleSelectProduct}
        onAddToCart={(p, e) => handleAddToCart(p, 1, undefined, e)}
        onNavigateToAdmin={() => navigateTo('admin')}
      />

      {/* Floating AI Shopping Assistant Trigger */}
      <FloatingAiTrigger
        onClick={() => setIsAiOpen(true)}
        hasWhatsApp={storeSettings.enableWhatsappChat && Boolean(storeSettings.whatsappNumber)}
      />

      {/* AI Assistant Modal (Gemini Shopping Advisor) */}
      <AiAssistantModal
        isOpen={isAiOpen}
        onClose={() => setIsAiOpen(false)}
        products={productsList}
        currentProduct={currentPage === 'product-detail' ? selectedProduct : null}
        onSelectProduct={handleSelectProduct}
      />

      {/* Real-time Feedback Toasts */}
      <Toast
        toasts={toasts}
        onDismiss={handleDismissToast}
        onOpenCart={() => setIsCartOpen(true)}
      />

    </div>
  );
}
