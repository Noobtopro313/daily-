import React, { useState } from 'react';
import { Mail, CheckCircle2, ArrowRight } from 'lucide-react';

interface NewsletterProps {
  onSubscribed?: () => void;
}

export const Newsletter: React.FC<NewsletterProps> = ({ onSubscribed }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !trimmed.includes('@') || !trimmed.includes('.')) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setStatus('success');
    setErrorMessage('');
    if (onSubscribed) {
      onSubscribed();
    }
  };

  return (
    <section id="newsletter-section" className="py-16 sm:py-20 bg-[#0B0D0F] border-t border-white/5 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Newsletter Icon Badge */}
        <div className="w-12 h-12 rounded-2xl bg-[#171B20] border border-white/10 flex items-center justify-center mx-auto mb-5 text-[#32B83F] shadow-sm">
          <Mail className="w-6 h-6" />
        </div>

        {/* Headline */}
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-heading">
          Stay Ahead of the Tech Curve
        </h2>

        {/* Supporting text */}
        <p className="mt-3 text-sm sm:text-base text-[#A7ADB2] max-w-xl mx-auto leading-relaxed">
          Get new arrivals, exclusive offers, and useful product updates delivered to your inbox. No spam, ever.
        </p>

        {/* Form or Success State */}
        {status === 'success' ? (
          <div className="mt-8 p-6 rounded-2xl bg-[#14181D] border border-[#32B83F]/40 max-w-md mx-auto text-center animate-in fade-in zoom-in-95 duration-300">
            <div className="w-10 h-10 rounded-full bg-[#32B83F]/20 text-[#32B83F] flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">Welcome to Nexora Insider!</h3>
            <p className="text-xs text-gray-300 mt-1">
              Check your inbox for a 10% welcome discount voucher (<strong className="text-[#32B83F]">NEXORA10</strong>).
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 max-w-lg mx-auto">
            <div className="flex flex-col sm:flex-row items-stretch gap-2.5">
              <div className="relative flex-1">
                <input
                  id="newsletter-email-input"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === 'error') setStatus('idle');
                  }}
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3.5 rounded-xl bg-white text-[#151719] placeholder-gray-500 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-[#32B83F] shadow-inner"
                  required
                />
              </div>

              <button
                id="newsletter-subscribe-btn"
                type="submit"
                className="px-7 py-3.5 rounded-xl bg-[#32B83F] hover:bg-[#27A936] text-white font-bold text-sm tracking-wide shadow-md shadow-[#32B83F]/25 hover:shadow-[#32B83F]/40 transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Subscribe</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {status === 'error' && (
              <p className="mt-2 text-xs text-rose-400 font-medium text-left">
                {errorMessage}
              </p>
            )}

            {/* Privacy note */}
            <p className="mt-4 text-xs text-gray-400">
              By subscribing, you agree to receive occasional updates from NEXORA TECH. You can unsubscribe anytime.
            </p>
          </form>
        )}

      </div>
    </section>
  );
};
