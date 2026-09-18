import React from 'react';
import { Video } from 'lucide-react';
import { Product } from '../types';

export const ProductMedia: React.FC<{ product: Product; className?: string }> = ({ product, className = '' }) => (
  <div className={`relative ${className}`}>
    <img
      src={product.image}
      alt={product.name}
      referrerPolicy="no-referrer"
      className="w-full h-full object-contain mix-blend-multiply"
    />
    {product.video && (
      <details className="absolute bottom-3 right-3">
        <summary className="cursor-pointer list-none rounded-full bg-black/75 p-2 text-white shadow-lg" title="Watch product video">
          <Video className="h-4 w-4" />
        </summary>
        <div className="absolute bottom-12 right-0 w-64 overflow-hidden rounded-xl border border-white/20 bg-black shadow-2xl">
          <video src={product.video} controls playsInline preload="metadata" className="w-full" />
        </div>
      </details>
    )}
  </div>
);
