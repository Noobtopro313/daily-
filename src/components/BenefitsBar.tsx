import React from 'react';
import { Truck, ShieldCheck, RotateCcw, Headphones } from 'lucide-react';

export const BenefitsBar: React.FC = () => {
  const benefits = [
    {
      icon: Truck,
      title: 'Free Express Shipping',
      description: 'On all orders over $50 worldwide',
    },
    {
      icon: ShieldCheck,
      title: 'Secure Checkout',
      description: '256-Bit SSL encrypted protection',
    },
    {
      icon: RotateCcw,
      title: 'Easy 30-Day Returns',
      description: 'Hassle-free guarantee & refunds',
    },
    {
      icon: Headphones,
      title: 'Dedicated 24/7 Support',
      description: 'Expert technical assistance anytime',
    },
  ];

  return (
    <section
      id="trust-benefits-bar"
      className="bg-[#121518] border-b border-white/10 py-6 sm:py-7 relative z-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {benefits.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-4 group p-2 rounded-xl transition-colors hover:bg-white/[0.02]"
              >
                <div className="w-12 h-12 rounded-xl bg-[#1A1F26] border border-white/10 group-hover:border-[#32B83F]/50 flex items-center justify-center flex-shrink-0 text-[#32B83F] shadow-sm transition-all duration-200 group-hover:scale-105">
                  <Icon className="w-6 h-6 stroke-[2]" />
                </div>
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-white tracking-tight leading-tight">
                    {b.title}
                  </h4>
                  <p className="text-xs text-[#A7ADB2] mt-0.5 leading-snug">
                    {b.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
