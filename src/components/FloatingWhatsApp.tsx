import React from 'react';
import { MessageCircle } from 'lucide-react';

interface FloatingWhatsAppProps {
  whatsappNumber: string;
  storeName: string;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({
  whatsappNumber,
  storeName,
}) => {
  if (!whatsappNumber) return null;

  // Clean phone number (remove spaces, plus, hyphens for wa.me link)
  const cleanNumber = whatsappNumber.replace(/[^0-9]/g, '');
  const message = encodeURIComponent(`Hi ${storeName}! I am interested in your products and need more information.`);
  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white px-4 py-3 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 group font-medium text-xs sm:text-sm border-2 border-white/20"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-5 h-5 fill-white text-[#25D366]" />
      <span className="font-bold tracking-wide">Chat on WhatsApp</span>
    </a>
  );
};
