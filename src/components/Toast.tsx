import React from 'react';
import { CheckCircle2, ShoppingBag, Heart, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'cart' | 'wishlist' | 'info';
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
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-center gap-3.5 p-3.5 rounded-xl bg-[#121518] border border-white/15 text-white shadow-2xl backdrop-blur-md animate-in slide-in-from-bottom-5 duration-300"
        >
          {toast.image ? (
            <div className="w-12 h-12 rounded-lg bg-white p-1 flex items-center justify-center flex-shrink-0">
              <img
                src={toast.image}
                alt=""
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain mix-blend-multiply"
              />
            </div>
          ) : (
            <div className="w-10 h-10 rounded-lg bg-[#32B83F]/20 text-[#32B83F] flex items-center justify-center flex-shrink-0">
              {toast.type === 'cart' ? (
                <ShoppingBag className="w-5 h-5" />
              ) : toast.type === 'wishlist' ? (
                <Heart className="w-5 h-5" />
              ) : (
                <CheckCircle2 className="w-5 h-5" />
              )}
            </div>
          )}

          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-bold text-white leading-tight">
              {toast.title}
            </h4>
            {toast.subtitle && (
              <p className="text-[11px] text-gray-400 mt-0.5 truncate">
                {toast.subtitle}
              </p>
            )}
            {toast.type === 'cart' && (
              <button
                onClick={onOpenCart}
                className="text-[11px] font-bold text-[#32B83F] hover:underline mt-1 inline-block"
              >
                View Cart &rarr;
              </button>
            )}
          </div>

          <button
            onClick={() => onDismiss(toast.id)}
            className="p-1 text-gray-500 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
