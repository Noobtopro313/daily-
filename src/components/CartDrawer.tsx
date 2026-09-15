import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, CheckCircle, Sparkles } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, delta: number, selectedColor?: string) => void;
  onRemoveItem: (productId: string, selectedColor?: string) => void;
  onClearCart: () => void;
  onNavigateToShop: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onNavigateToShop,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [promoError, setPromoError] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(false);

  if (!isOpen) return null;

  const rawSubtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const discountAmount = discountApplied ? rawSubtotal * 0.1 : 0;
  const freeShippingThreshold = 50;
  const isFreeShipping = rawSubtotal >= freeShippingThreshold || rawSubtotal === 0;
  const shippingCost = isFreeShipping ? 0 : 9.99;
  const finalTotal = Math.max(0, rawSubtotal - discountAmount + shippingCost);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'NEXORA10') {
      setDiscountApplied(true);
      setPromoError('');
    } else {
      setPromoError('Invalid code. Try "NEXORA10" for 10% off.');
    }
  };

  const handleSimulateCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderCompleted(true);
      onClearCart();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#121518] border-l border-white/10 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-5 border-b border-white/10 flex items-center justify-between bg-[#0B0D0F]">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-[#32B83F]" />
              <h2 className="text-lg font-bold text-white font-heading">
                Your Shopping Cart
              </h2>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#1A1F26] border border-white/10 text-gray-300">
                {cartItems.reduce((sum, item) => sum + item.quantity, 0)} items
              </span>
            </div>

            <button
              id="cart-close-btn"
              onClick={onClose}
              aria-label="Close cart"
              className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress bar */}
          {cartItems.length > 0 && (
            <div className="px-5 py-3 bg-[#171B20] border-b border-white/5">
              <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
                {isFreeShipping ? (
                  <span className="text-[#32B83F] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    Unlocked: Free Express Shipping!
                  </span>
                ) : (
                  <span className="text-gray-300">
                    Add <strong className="text-white">${(freeShippingThreshold - rawSubtotal).toFixed(2)}</strong> more for Free Shipping
                  </span>
                )}
                <span className="text-gray-400">
                  ${rawSubtotal.toFixed(0)} / ${freeShippingThreshold}
                </span>
              </div>
              <div className="w-full h-1.5 bg-[#0B0D0F] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#32B83F] rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, (rawSubtotal / freeShippingThreshold) * 100)}%` }}
                />
              </div>
            </div>
          )}

          {/* Cart Contents */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {orderCompleted ? (
              <div className="py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-[#32B83F]/20 text-[#32B83F] flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white font-heading">
                  Order Confirmed!
                </h3>
                <p className="text-sm text-gray-300 mt-2 max-w-xs mx-auto">
                  Thank you for your order! Your confirmation receipt and tracking code have been dispatched.
                </p>
                <div className="mt-4 p-3 rounded-xl bg-[#1A1F26] border border-white/10 text-xs font-mono text-[#32B83F] inline-block">
                  Order #NX-{Math.floor(100000 + Math.random() * 900000)}
                </div>
                <div className="mt-8">
                  <button
                    onClick={() => {
                      setOrderCompleted(false);
                      onClose();
                      onNavigateToShop();
                    }}
                    className="px-6 py-3 rounded-xl bg-[#32B83F] hover:bg-[#27A936] text-white font-bold text-sm"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            ) : cartItems.length === 0 ? (
              <div className="py-16 text-center">
                <div className="w-16 h-16 rounded-2xl bg-[#171B20] border border-white/10 flex items-center justify-center mx-auto mb-4 text-gray-500">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-white font-heading">
                  Your cart is empty
                </h3>
                <p className="text-sm text-gray-400 mt-1 max-w-xs mx-auto">
                  Looks like you haven&apos;t added any premium gadgets to your bag yet.
                </p>
                <button
                  onClick={() => {
                    onClose();
                    onNavigateToShop();
                  }}
                  className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#32B83F] hover:bg-[#27A936] text-white font-bold text-sm tracking-wide transition-all shadow-md shadow-[#32B83F]/20"
                >
                  <span>Explore Catalog</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedColor || 'default'}`}
                  className="flex gap-4 p-3.5 rounded-xl bg-[#171B20] border border-white/5 group relative"
                >
                  {/* Thumbnail */}
                  <div className="w-20 h-20 rounded-lg bg-white p-2 flex items-center justify-center flex-shrink-0 overflow-hidden">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain mix-blend-multiply"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-sm font-bold text-white truncate">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.product.id, item.selectedColor)}
                          className="text-gray-500 hover:text-rose-400 p-1 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {item.selectedColor && (
                        <p className="text-xs text-gray-400 mt-0.5">
                          Color: <span className="text-gray-300 font-medium">{item.selectedColor}</span>
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/5">
                      {/* Quantity selector */}
                      <div className="flex items-center border border-white/10 rounded-lg bg-[#0B0D0F]">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, -1, item.selectedColor)}
                          className="p-1.5 text-gray-400 hover:text-white transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2.5 text-xs font-bold text-white min-w-[24px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, 1, item.selectedColor)}
                          className="p-1.5 text-gray-400 hover:text-white transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Line price */}
                      <div className="text-sm font-extrabold text-white">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Summary */}
          {cartItems.length > 0 && !orderCompleted && (
            <div className="p-5 border-t border-white/10 bg-[#0B0D0F] space-y-3.5">
              
              {/* Promo Code Input */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Promo code (try NEXORA10)"
                  className="flex-1 px-3 py-2 text-xs bg-[#171B20] border border-white/10 rounded-lg text-white uppercase placeholder-gray-500 focus:outline-none focus:border-[#32B83F]"
                />
                <button
                  type="submit"
                  className="px-3.5 py-2 text-xs font-bold bg-[#1A1F26] hover:bg-[#222831] text-gray-200 hover:text-white border border-white/10 rounded-lg transition-colors"
                >
                  Apply
                </button>
              </form>
              {promoError && (
                <p className="text-[11px] text-rose-400">{promoError}</p>
              )}
              {discountApplied && (
                <p className="text-[11px] text-[#32B83F] font-semibold flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" /> 10% Discount Applied!
                </p>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-gray-400 pt-2 border-t border-white/5">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-gray-200">${rawSubtotal.toFixed(2)}</span>
                </div>
                {discountApplied && (
                  <div className="flex justify-between text-[#32B83F]">
                    <span>Discount (10%)</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span className="font-semibold text-gray-200">
                    {shippingCost === 0 ? (
                      <span className="text-[#32B83F]">FREE</span>
                    ) : (
                      `$${shippingCost.toFixed(2)}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-base font-extrabold text-white pt-2 border-t border-white/10">
                  <span>Total</span>
                  <span className="text-[#32B83F]">${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                id="cart-checkout-btn"
                onClick={handleSimulateCheckout}
                disabled={isCheckingOut}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-[#32B83F] hover:bg-[#27A936] text-white font-bold text-sm tracking-wide shadow-lg shadow-[#32B83F]/30 hover:shadow-[#32B83F]/45 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer disabled:opacity-50"
              >
                {isCheckingOut ? (
                  <>
                    <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                    <span>Processing Order...</span>
                  </>
                ) : (
                  <>
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-gray-500 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#32B83F]" />
                <span>Encrypted 256-Bit SSL Checkout Protection</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
