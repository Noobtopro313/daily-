import React from 'react';
import { Mail, Instagram, Facebook, Youtube } from 'lucide-react';
import { ActivePage, StoreSettings } from '../types';
import { Logo } from './Logo';

interface FooterProps {
  onNavigate: (page: ActivePage, extra?: { category?: string; filter?: 'new' | 'bestseller' }) => void;
  onOpenPrivacyModal?: () => void;
  settings?: StoreSettings;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, settings }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="main-footer" className="bg-[#0B0D0F] border-t border-white/10 pt-16 pb-12 text-[#A7ADB2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top 4-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          
          {/* Column 1: Brand & Philosophy (spans 2 on desktop) */}
          <div className="lg:col-span-2 pr-0 lg:pr-8">
            <Logo onClick={() => onNavigate('home')} size="lg" />
            <p className="mt-4 text-sm text-gray-300 leading-relaxed max-w-sm">
              Premium technology and smart accessories selected for modern everyday life. Built with aerospace materials, refined acoustic engineering, and zero compromises.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <a
                href="#instagram"
                aria-label="Follow Nexora Tech on Instagram"
                className="w-9 h-9 rounded-lg bg-[#171B20] border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#32B83F] hover:border-[#32B83F]/40 transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#facebook"
                aria-label="Follow Nexora Tech on Facebook"
                className="w-9 h-9 rounded-lg bg-[#171B20] border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#32B83F] hover:border-[#32B83F]/40 transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#youtube"
                aria-label="Subscribe to Nexora Tech on YouTube"
                className="w-9 h-9 rounded-lg bg-[#171B20] border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#32B83F] hover:border-[#32B83F]/40 transition-colors"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="#email"
                aria-label="Email support"
                onClick={(e) => { e.preventDefault(); onNavigate('contact'); }}
                className="w-9 h-9 rounded-lg bg-[#171B20] border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#32B83F] hover:border-[#32B83F]/40 transition-colors"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Shop */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              Shop
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('shop')}
                  className="hover:text-white transition-colors"
                >
                  All Products
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop', { filter: 'new' })}
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <span>New Arrivals</span>
                  <span className="text-[10px] bg-[#32B83F]/20 text-[#32B83F] px-1 py-0.2 rounded font-bold">
                    NEW
                  </span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop', { filter: 'bestseller' })}
                  className="hover:text-white transition-colors"
                >
                  Best Sellers
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop', { category: 'Audio' })}
                  className="hover:text-white transition-colors"
                >
                  Audio Series
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop', { category: 'Smart Wearables' })}
                  className="hover:text-white transition-colors"
                >
                  Smart Wearables
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop', { category: 'Work & Productivity' })}
                  className="hover:text-white transition-colors"
                >
                  Work &amp; Productivity
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Customer Care */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              Customer Care
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-white transition-colors"
                >
                  Contact Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-white transition-colors"
                >
                  Shipping Information
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-white transition-colors"
                >
                  Returns &amp; Refunds
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-white transition-colors"
                >
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-white transition-colors"
                >
                  Order Tracking
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Company & Connect */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-white transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-white transition-colors"
                >
                  Our Engineering Story
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-white transition-colors"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-white transition-colors"
                >
                  Terms &amp; Conditions
                </button>
              </li>
            </ul>

            <div className="mt-6 pt-4 border-t border-white/5">
              <span className="text-xs font-semibold text-gray-300 block">Direct Concierge</span>
              <a
                href={`mailto:${settings?.supportEmail || 'support@nexoratech.com'}`}
                className="text-xs text-[#32B83F] hover:underline mt-0.5 block font-mono"
              >
                {settings?.supportEmail || 'support@nexoratech.com'}
              </a>
              {settings?.whatsappNumber && (
                <div className="text-[11px] text-gray-400 mt-1">
                  WhatsApp: <span className="text-white font-mono">{settings.whatsappNumber}</span>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Bottom Footer Row */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <div>
            <p>
              Copyright &copy; {currentYear} NEXORA TECH. All rights reserved.
            </p>
          </div>

          {/* Accepted Payments Labels/Badges */}
          <div className="flex flex-wrap items-center gap-2">
            {['Apple Pay', 'Google Pay', 'Visa', 'Mastercard', 'Amex', 'PayPal'].map((p) => (
              <span
                key={p}
                className="px-2.5 py-1 rounded bg-[#171B20] text-gray-300 border border-white/10 font-medium text-[11px]"
              >
                {p}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-4 text-gray-400">
            <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors">
              Privacy
            </button>
            <span>•</span>
            <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors">
              Terms
            </button>
            <span>•</span>
            <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors">
              Support
            </button>
            <span>•</span>
            <button onClick={() => onNavigate('admin')} className="text-[#32B83F] hover:underline font-semibold transition-colors">
              Admin Login
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
