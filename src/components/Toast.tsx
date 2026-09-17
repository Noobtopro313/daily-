import React from 'react';
import { CheckCircle2, ShoppingBag, Heart, X, Check } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'cart' | 'wishlist' | 'info' | 'done' | 'success';
  title: string;
  subtitle?: string;
  image?: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
  onOpenCart: () => void;
}

export const Toast: React.FC<ToastProps> = ({ toasts, onDismiss, onOpenCart }) => {
  if (toasts.length === 0) return null;

  return (
    <div
      id="global-toast-container"
      className="fixed top-5 left-1/2 -translate-x-1/2 z-[9999] flex flex-col items-center gap-2.5 max-w-md w-[92vw] sm:w-full pointer-events-none"
    >
      {toasts.map((toast) => {
        const isCart = toast.type === 'cart';
        const isWishlist = toast.type === 'wishlist';
        const isDoneOrSuccess = toast.type === 'done' || toast.type === 'success' || toast.type === 'info';

        return (
          <div
            key={toast.id}
            id={`toast-item-${toast.id}`}
            className="pointer-events-auto w-full flex items-center gap-3.5 p-3.5 sm:p-4 rounded-2xl bg-[#121518]/95 border border-[#32B83F]/40 text-white shadow-[0_12px_40px_rgba(0,0,0,0.7),0_0_20px_rgba(50,184,63,0.25)] backdrop-blur-xl animate-in slide-in-from-top-6 fade-in duration-300 transition-all"
          >
            {/* Left Visual Icon or Thumbnail */}
            {toast.image ? (
              <div className="w-12 h-12 rounded-xl bg-white p-1 flex items-center justify-center flex-shrink-0 shadow-inner">
                <img
                  src={toast.image}
                  alt=""
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain mix-blend-multiply"
                />
              </div>
            ) : (
              <div className="w-11 h-11 rounded-xl bg-[#32B83F]/20 border border-[#32B83F]/40 text-[#32B83F] flex items-center justify-center flex-shrink-0 shadow-sm">
                {isCart ? (
                  <ShoppingBag className="w-5 h-5" />
                ) : isWishlist ? (
                  <Heart className="w-5 h-5 text-rose-400" />
                ) : (
                  <CheckCircle2 className="w-6 h-6 text-[#32B83F]" />
                )}
              </div>
            )}

            {/* Content Details */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#32B83F]/25 text-[#32B83F] text-[10px] font-extrabold tracking-wider uppercase border border-[#32B83F]/40">
                  <Check className="w-3 h-3 stroke-[3]" />
                  DONE
                </span>
                <h4 className="text-xs sm:text-sm font-bold text-white leading-tight truncate">
                  {toast.title}
                </h4>
              </div>

              {toast.subtitle && (
                <p className="text-[11px] sm:text-xs text-gray-300 mt-0.5 line-clamp-2">
                  {toast.subtitle}
                </p>
              )}

              {isCart && (
                <button
                  onClick={onOpenCart}
                  className="text-xs font-bold text-[#32B83F] hover:underline mt-1.5 inline-flex items-center gap-1"
                >
                  View Cart &rarr;
                </button>
              )}
            </div>

            {/* Dismiss Button */}
            <button
              onClick={() => onDismiss(toast.id)}
              aria-label="Dismiss notification"
              className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors flex-shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
