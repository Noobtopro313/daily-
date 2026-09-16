import React, { useState } from 'react';
import { Mail, Clock, MessageSquare, ChevronDown, CheckCircle2, Send, HelpCircle, ShieldAlert, MessageCircle, Phone } from 'lucide-react';
import { StoreSettings } from '../types';

interface ContactViewProps {
  settings?: StoreSettings;
}

export const ContactView: React.FC<ContactViewProps> = ({ settings }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) return;
    setIsSubmitted(true);
  };

  const faqs = [
    {
      q: 'What is your return and warranty policy?',
      a: 'We offer a 30-day risk-free trial on all products. If you are not completely satisfied, return your item in its original box with our complimentary pre-paid shipping label. All hardware comes with a 2-year full replacement warranty against defects.',
    },
    {
      q: 'How fast does order dispatch and delivery take?',
      a: 'All orders placed before 2:00 PM EST ship the same day. Standard shipping takes 2–4 business days within North America and 4–7 business days internationally. You will receive an automated tracking number via email as soon as your parcel is scanned.',
    },
    {
      q: 'Are Nexora devices compatible with both iOS and Android?',
      a: 'Yes. All our Bluetooth audio, smartwatches, and multi-device accessories feature cross-platform compatibility across iOS, Android, macOS, and Windows. Dedicated companion apps are available free on the App Store and Google Play.',
    },
    {
      q: 'How do I track my active shipment?',
      a: 'Once your order is processed, a tracking link from FedEx or UPS will be sent to your email. You can also track your order directly from your Nexora Account dashboard under Order History.',
    },
  ];

  return (
    <div id="contact-us-page" className="py-12 sm:py-16 bg-[#0B0D0F] min-h-screen text-[#A7ADB2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#32B83F]/15 border border-[#32B83F]/30 text-[#32B83F] text-xs font-bold uppercase tracking-widest mb-3">
            <MessageSquare className="w-3.5 h-3.5" />
            Direct Concierge Support
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-heading">
            We&apos;re Here to Help
          </h1>
          <p className="mt-3 text-sm sm:text-base text-gray-400">
            Have a question about technical specifications, orders, or pairing? Our team of hardware specialists responds within 4 hours.
          </p>
        </div>

        {/* 2-Column Contact Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-20">
          
          {/* LEFT: Contact Form (cols 1-7) */}
          <div className="lg:col-span-7 bg-[#121518] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-xl">
            <h2 className="text-xl font-bold text-white mb-2 font-heading">
              Send Our Team a Message
            </h2>
            <p className="text-xs text-gray-400 mb-6">
              Fill in your inquiry details below and an engineer will reply directly to your email.
            </p>

            {isSubmitted ? (
              <div className="p-8 text-center rounded-xl bg-[#14181D] border border-[#32B83F]/40 space-y-3">
                <div className="w-12 h-12 rounded-full bg-[#32B83F]/20 text-[#32B83F] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white font-heading">
                  Message Dispatched Successfully!
                </h3>
                <p className="text-xs text-gray-300 max-w-sm mx-auto">
                  Thank you, <strong className="text-white">{formData.name}</strong>. Ticket #NX-{(Math.random() * 90000 + 10000).toFixed(0)} has been logged. Expect a detailed answer at <strong className="text-white">{formData.email}</strong> shortly.
                </p>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });
                  }}
                  className="mt-4 px-5 py-2 rounded-lg bg-[#1A1F26] text-xs font-semibold text-gray-300 hover:text-white border border-white/10"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-gray-300 block mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Alex Thorne"
                      className="w-full px-4 py-3 text-xs bg-[#1A1F26] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#32B83F]"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-300 block mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex.thorne@example.com"
                      className="w-full px-4 py-3 text-xs bg-[#1A1F26] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#32B83F]"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-300 block mb-1.5">
                    Topic / Subject
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 text-xs bg-[#1A1F26] border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#32B83F] cursor-pointer"
                  >
                    <option value="General Inquiry">General Product Inquiry</option>
                    <option value="Order & Tracking">Order &amp; Tracking Assistance</option>
                    <option value="Technical Support">Technical Support &amp; Firmware</option>
                    <option value="Returns & Warranty">Returns &amp; Warranty Claim</option>
                    <option value="Wholesale / B2B">Corporate Bulk Inquiries</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-300 block mb-1.5">
                    Your Message *
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                    placeholder="How can our technical support team assist you today?"
                    className="w-full px-4 py-3 text-xs bg-[#1A1F26] border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-[#32B83F]"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl bg-[#32B83F] hover:bg-[#27A936] text-white font-bold text-sm tracking-wide shadow-md shadow-[#32B83F]/25 hover:shadow-[#32B83F]/40 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>

          {/* RIGHT: Direct Info & Concierge Details (cols 8-12) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Support Card */}
            <div className="p-6 rounded-2xl bg-[#121518] border border-white/10 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#1A1F26] text-[#32B83F] flex items-center justify-center">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Direct Email Concierge</h3>
                  <a
                    href={`mailto:${settings?.supportEmail || 'support@nexoratech.com'}`}
                    className="text-xs text-[#32B83F] hover:underline font-mono"
                  >
                    {settings?.supportEmail || 'support@nexoratech.com'}
                  </a>
                </div>
              </div>

              {/* WhatsApp Support Row */}
              {settings?.whatsappNumber && (
                <div className="flex items-center gap-3 pt-3 border-t border-white/5">
                  <div className="w-10 h-10 rounded-xl bg-[#25D366]/20 text-[#25D366] flex items-center justify-center">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">WhatsApp Support</h3>
                    <a
                      href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-[#25D366] hover:underline font-mono font-bold"
                    >
                      {settings.whatsappNumber} → Chat Now
                    </a>
                  </div>
                </div>
              )}

              {/* Phone Row */}
              {settings?.phoneNumber && (
                <div className="flex items-center gap-3 pt-3 border-t border-white/5">
                  <div className="w-10 h-10 rounded-xl bg-[#1A1F26] text-[#32B83F] flex items-center justify-center">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">Direct Phone Line</h3>
                    <a
                      href={`tel:${settings.phoneNumber}`}
                      className="text-xs text-gray-300 hover:text-white font-mono"
                    >
                      {settings.phoneNumber}
                    </a>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3 pt-3 border-t border-white/5">
                <div className="w-10 h-10 rounded-xl bg-[#1A1F26] text-[#32B83F] flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Operating Hours</h3>
                  <p className="text-xs text-gray-400">
                    Monday – Friday: 9:00 AM – 8:00 PM EST <br />
                    Weekend Live Support: 10:00 AM – 5:00 PM EST
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#171B20] text-xs text-gray-300 border border-white/5 flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-[#32B83F] animate-pulse" />
                <span>Current queue response time: <strong className="text-white">&lt; 15 minutes</strong></span>
              </div>
            </div>

            {/* Corporate Location Card */}
            <div className="p-6 rounded-2xl bg-[#121518] border border-white/10 space-y-2 text-xs">
              <h3 className="text-sm font-bold text-white font-heading">
                {settings?.storeName || 'NEXORA TECH'} Headquarters
              </h3>
              <p className="text-gray-400 leading-relaxed whitespace-pre-line">
                {settings?.address || '742 Evergreen Horizon Blvd, Suite 400\nSan Francisco, CA 94105, United States'}
              </p>
            </div>

          </div>

        </div>

        {/* Frequently Asked Questions Accordion */}
        <div className="max-w-3xl mx-auto pt-12 border-t border-white/10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#32B83F] mb-2">
              <HelpCircle className="w-4 h-4" />
              Help Center
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-xl bg-[#121518] border border-white/10 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 text-sm font-bold text-white hover:text-[#32B83F] transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 ${
                      openFaq === idx ? 'rotate-180 text-[#32B83F]' : 'text-gray-400'
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-gray-300 leading-relaxed border-t border-white/5 pt-3 animate-in fade-in duration-200">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
