import React, { useState } from 'react';
import { X, User, Package, Heart, Shield, LogOut, CheckCircle2, ArrowRight } from 'lucide-react';
import { Product } from '../types';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProducts: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, e: React.MouseEvent) => void;
  onNavigateToAdmin?: () => void;
}

export const AccountModal: React.FC<AccountModalProps> = ({
  isOpen,
  onClose,
  wishlistProducts,
  onSelectProduct,
  onAddToCart,
  onNavigateToAdmin,
}) => {
  const [activeTab, setActiveTab] = useState<'orders' | 'wishlist' | 'settings'>('orders');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 lg:p-8 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Box */}
      <div className="relative w-full max-w-xl bg-[#121518] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-[#0B0D0F]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#32B83F]/20 border border-[#32B83F]/40 flex items-center justify-center text-[#32B83F]">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-heading">
                Alex Thorne
              </h3>
              <p className="text-xs text-gray-400">
                alex.thorne@example.com • Nexora Platinum Member
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-white/10 bg-[#171B20] text-xs font-semibold">
          <button
            onClick={() => setActiveTab('orders')}
            className={`flex-1 py-3 px-4 flex items-center justify-center gap-2 border-b-2 transition-all ${
              activeTab === 'orders'
                ? 'border-[#32B83F] text-white bg-white/5'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Order History</span>
          </button>

          <button
            onClick={() => setActiveTab('wishlist')}
            className={`flex-1 py-3 px-4 flex items-center justify-center gap-2 border-b-2 transition-all ${
              activeTab === 'wishlist'
                ? 'border-[#32B83F] text-white bg-white/5'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            <Heart className="w-4 h-4" />
            <span>Wishlist ({wishlistProducts.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`flex-1 py-3 px-4 flex items-center justify-center gap-2 border-b-2 transition-all ${
              activeTab === 'settings'
                ? 'border-[#32B83F] text-white bg-white/5'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>Security &amp; Addresses</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-6 max-h-[55vh] overflow-y-auto">
          {activeTab === 'orders' && (
            <div className="space-y-3">
              <div className="p-4 rounded-xl bg-[#171B20] border border-white/5 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-gray-400 font-bold">#NX-849201</span>
                  <span className="px-2 py-0.5 rounded bg-[#32B83F]/20 text-[#32B83F] font-bold">
                    Delivered
                  </span>
                </div>
                <div className="text-sm font-bold text-white">
                  Wireless Earbuds Pro (Matte Obsidian)
                </div>
                <div className="text-xs text-gray-400 flex items-center justify-between pt-2 border-t border-white/5">
                  <span>Tracking: FEDEX-94820199</span>
                  <span className="font-bold text-white">$149.99</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#171B20] border border-white/5 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-gray-400 font-bold">#NX-729013</span>
                  <span className="px-2 py-0.5 rounded bg-[#32B83F]/20 text-[#32B83F] font-bold">
                    Delivered
                  </span>
                </div>
                <div className="text-sm font-bold text-white">
                  Fast Charging Hub 140W GaN III
                </div>
                <div className="text-xs text-gray-400 flex items-center justify-between pt-2 border-t border-white/5">
                  <span>Tracking: UPS-72901300</span>
                  <span className="font-bold text-white">$69.99</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'wishlist' && (
            <div>
              {wishlistProducts.length === 0 ? (
                <div className="text-center py-8 text-gray-400 text-xs">
                  <Heart className="w-8 h-8 mx-auto mb-2 opacity-40 text-gray-500" />
                  No saved items yet. Click the heart icon on any product to save it here!
                </div>
              ) : (
                <div className="space-y-3">
                  {wishlistProducts.map((prod) => (
                    <div
                      key={prod.id}
                      className="flex items-center justify-between gap-3 p-3 rounded-xl bg-[#171B20] border border-white/5"
                    >
                      <div
                        onClick={() => {
                          onClose();
                          onSelectProduct(prod);
                        }}
                        className="flex items-center gap-3 cursor-pointer flex-1 min-w-0"
                      >
                        <div className="w-12 h-12 rounded-lg bg-white p-1 flex items-center justify-center flex-shrink-0">
                          <img
                            src={prod.image}
                            alt={prod.name}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-contain mix-blend-multiply"
                          />
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-white truncate hover:text-[#32B83F]">
                            {prod.name}
                          </div>
                          <div className="text-xs font-semibold text-[#32B83F]">
                            ${prod.price.toFixed(2)}
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={(e) => {
                          onAddToCart(prod, e);
                        }}
                        className="px-3 py-1.5 text-xs font-bold bg-[#32B83F] hover:bg-[#27A936] text-white rounded-lg flex items-center gap-1 shadow-sm"
                      >
                        Add to Cart
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-xl bg-[#171B20] border border-white/5 space-y-2">
                <div className="font-bold text-white flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#32B83F]" />
                  Two-Factor Authentication Active
                </div>
                <p className="text-gray-400">
                  Hardware token and SMS verified. Your payment details are protected with biometric passkeys.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#171B20] border border-white/5 space-y-1">
                <div className="font-bold text-white">Default Shipping Address</div>
                <div className="text-gray-300">
                  Alex Thorne <br />
                  742 Evergreen Horizon Suite 400 <br />
                  San Francisco, CA 94105, United States
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#0B0D0F] border-t border-white/10 flex items-center justify-between">
          {onNavigateToAdmin ? (
            <button
              onClick={() => {
                onClose();
                onNavigateToAdmin();
              }}
              className="text-xs text-[#32B83F] hover:underline font-semibold flex items-center gap-1"
            >
              Staff / Admin Portal &rarr;
            </button>
          ) : <div />}

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#1A1F26] text-gray-300 hover:text-white text-xs font-bold border border-white/10 transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
