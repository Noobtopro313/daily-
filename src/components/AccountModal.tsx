import React, { useState, useEffect } from 'react';
import { X, User, Package, Heart, Shield, LogOut, CheckCircle2, ArrowRight, Loader2, MapPin } from 'lucide-react';
import { Product } from '../types';
import { auth, signInWithGoogle, logOut, fetchUserOrders } from '../firebase';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';

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
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [userOrders, setUserOrders] = useState<any[]>([]);
  const [isLoadingOrders, setIsLoadingOrders] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        loadOrders(user.uid);
      } else {
        setUserOrders([]);
      }
    });
    return () => unsubscribe();
  }, []);

  const loadOrders = async (uid: string) => {
    setIsLoadingOrders(true);
    try {
      const orders = await fetchUserOrders(uid);
      setUserOrders(orders);
    } catch (err) {
      console.error('Failed to load user orders:', err);
    } finally {
      setIsLoadingOrders(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsAuthLoading(true);
    setAuthError(null);
    try {
      await signInWithGoogle();
    } catch (err: any) {
      console.error('Sign in error:', err);
      setAuthError(err?.message || 'Google Sign-in failed. Please try again.');
    } finally {
      setIsAuthLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (err) {
      console.error('Sign out error:', err);
    }
  };

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
            {currentUser?.photoURL ? (
              <img
                src={currentUser.photoURL}
                alt={currentUser.displayName || 'User'}
                className="w-10 h-10 rounded-full border border-[#32B83F]/50 object-cover"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-[#32B83F]/20 border border-[#32B83F]/40 flex items-center justify-center text-[#32B83F]">
                <User className="w-5 h-5" />
              </div>
            )}

            <div>
              <h3 className="text-base font-bold text-white font-heading">
                {currentUser?.displayName || 'Customer Account'}
              </h3>
              <p className="text-xs text-gray-400">
                {currentUser?.email || 'Signed in via Firebase Cloud Authentication'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {currentUser && (
              <button
                onClick={handleSignOut}
                className="p-2 text-gray-400 hover:text-rose-400 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Google Sign-in Banner if not signed in */}
        {!currentUser && (
          <div className="p-4 bg-gradient-to-r from-[#171B20] to-[#12161B] border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h4 className="text-xs font-bold text-white">Sign In with Google</h4>
              <p className="text-[11px] text-gray-400">
                Sync your orders, wishlist, and fast Google Maps delivery across devices
              </p>
            </div>

            <button
              onClick={handleGoogleSignIn}
              disabled={isAuthLoading}
              className="px-4 py-2 bg-white hover:bg-gray-100 text-gray-900 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer disabled:opacity-50"
            >
              {isAuthLoading ? (
                <Loader2 className="w-4 h-4 animate-spin text-gray-700" />
              ) : (
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
              )}
              <span>Continue with Google</span>
            </button>
          </div>
        )}

        {authError && (
          <div className="px-5 py-2 bg-rose-500/15 border-b border-rose-500/30 text-rose-400 text-xs flex justify-between items-center">
            <span>{authError}</span>
            <button onClick={() => setAuthError(null)}>
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Tabs */}
        <div className="flex border-b border-white/10 bg-[#171B20] text-xs font-semibold">
          <button
            onClick={() => setActiveTab('orders')}
            className={`flex-1 py-3 px-4 flex items-center justify-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'orders'
                ? 'border-[#32B83F] text-white bg-white/5'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Orders ({userOrders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('wishlist')}
            className={`flex-1 py-3 px-4 flex items-center justify-center gap-2 border-b-2 transition-all cursor-pointer ${
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
            className={`flex-1 py-3 px-4 flex items-center justify-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'settings'
                ? 'border-[#32B83F] text-white bg-white/5'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>Account Security</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-6 max-h-[55vh] overflow-y-auto">
          {activeTab === 'orders' && (
            <div className="space-y-3">
              {isLoadingOrders ? (
                <div className="py-8 flex flex-col items-center justify-center text-gray-400 gap-2">
                  <Loader2 className="w-6 h-6 text-[#32B83F] animate-spin" />
                  <span className="text-xs">Fetching orders from Firestore...</span>
                </div>
              ) : userOrders.length === 0 ? (
                <div className="text-center py-8 text-gray-400 text-xs space-y-2">
                  <Package className="w-8 h-8 mx-auto opacity-30 text-gray-500" />
                  <p>No orders recorded in Firestore yet.</p>
                  <p className="text-gray-500">
                    Place an order using the Shopping Cart or WhatsApp Catalog to see it synced here!
                  </p>
                </div>
              ) : (
                userOrders.map((order) => (
                  <div
                    key={order.orderId}
                    className="p-4 rounded-xl bg-[#171B20] border border-white/5 space-y-2"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono text-gray-300 font-bold">#{order.orderId}</span>
                      <span className="px-2 py-0.5 rounded bg-[#32B83F]/20 text-[#32B83F] font-bold capitalize">
                        {order.status || 'Confirmed'}
                      </span>
                    </div>

                    <div className="text-xs text-gray-300 font-medium">
                      {order.items?.map((item: any, i: number) => (
                        <div key={i} className="flex justify-between py-0.5">
                          <span>{item.quantity}x {item.product?.name || item.name}</span>
                          <span className="text-white">${((item.product?.price || item.price || 0) * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>

                    {order.deliveryAddress && (
                      <div className="text-[11px] text-gray-400 flex items-center gap-1.5 pt-1">
                        <MapPin className="w-3.5 h-3.5 text-[#32B83F]" />
                        <span className="truncate">{order.deliveryAddress}</span>
                      </div>
                    )}

                    <div className="text-xs text-gray-400 flex items-center justify-between pt-2 border-t border-white/5">
                      <span>{order.paymentMethod || 'Cash on Delivery'}</span>
                      <span className="font-bold text-white text-sm">${order.totalAmount?.toFixed(2) || '0.00'}</span>
                    </div>
                  </div>
                ))
              )}
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
                        className="px-3 py-1.5 text-xs font-bold bg-[#32B83F] hover:bg-[#27A936] text-white rounded-lg flex items-center gap-1 shadow-sm cursor-pointer"
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
                  Firebase Cloud Database Connected
                </div>
                <p className="text-gray-400">
                  Your profile and order logs are securely synchronized with Google Firestore (ID: {auth.currentUser?.uid ? auth.currentUser.uid.slice(0, 12) + '...' : 'Guest Session'}).
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#171B20] border border-white/5 space-y-1">
                <div className="font-bold text-white">Google Maps Delivery Geocoding</div>
                <div className="text-gray-400">
                  Addresses verified with Google Maps Platform API for express order routing.
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
              className="text-xs text-[#32B83F] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
            >
              Staff / Admin Portal &rarr;
            </button>
          ) : <div />}

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#1A1F26] text-gray-300 hover:text-white text-xs font-bold border border-white/10 transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
