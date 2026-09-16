import React from 'react';
import { Sparkles } from 'lucide-react';

interface FloatingAiTriggerProps {
  onClick: () => void;
  hasWhatsApp?: boolean;
}

export const FloatingAiTrigger: React.FC<FloatingAiTriggerProps> = ({
  onClick,
  hasWhatsApp = true,
}) => {
  return (
    <button
      id="floating-ai-assistant-btn"
      onClick={onClick}
      aria-label="Open AI Shopping Guide"
      className={`fixed ${
        hasWhatsApp ? 'bottom-20 sm:bottom-22' : 'bottom-6'
      } right-6 z-40 flex items-center gap-2 bg-gradient-to-r from-[#171B20] to-[#1E242C] hover:from-[#222832] hover:to-[#2B333E] text-white border border-[#32B83F]/50 px-3.5 py-2.5 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 group cursor-pointer`}
      title="Ask Nexora AI Assistant"
    >
      <div className="w-6 h-6 rounded-full bg-[#32B83F]/20 flex items-center justify-center text-[#32B83F] group-hover:bg-[#32B83F] group-hover:text-black transition-colors">
        <Sparkles className="w-3.5 h-3.5 animate-pulse" />
      </div>
      <span className="text-xs font-bold tracking-wide flex items-center gap-1.5">
        <span>AI Shopping Guide</span>
        <span className="text-[9px] bg-[#32B83F]/20 text-[#32B83F] px-1.5 py-0.2 rounded font-mono">
          AI
        </span>
      </span>
    </button>
  );
};
