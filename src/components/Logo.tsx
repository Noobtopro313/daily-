import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md', onClick }) => {
  const iconSize = size === 'sm' ? 24 : size === 'lg' ? 38 : 30;
  const textSize = size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-2xl' : 'text-xl';
  const tagSize = size === 'sm' ? 'text-[10px] px-1.5 py-0.5' : size === 'lg' ? 'text-xs px-2.5 py-1' : 'text-[11px] px-2 py-0.5';

  return (
    <div
      id="brand-logo"
      onClick={onClick}
      className={`inline-flex items-center gap-2.5 cursor-pointer group select-none ${className}`}
    >
      {/* Original Geometric Mark */}
      <div className="relative flex items-center justify-center">
        <svg
          width={iconSize}
          height={iconSize}
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-transform duration-300 group-hover:scale-105"
        >
          {/* Subtle glow background */}
          <circle cx="18" cy="18" r="14" fill="#32B83F" fillOpacity="0.12" />
          {/* Modern geometric polygon node */}
          <polygon
            points="18 4 30 11 30 25 18 32 6 25 6 11"
            stroke="#32B83F"
            strokeWidth="2.2"
            strokeLinejoin="round"
            className="transition-all duration-300 group-hover:stroke-[#27A936]"
          />
          {/* Inner futuristic 'N' vector motif */}
          <path
            d="M13 23V13L23 23V13"
            stroke="#FFFFFF"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Accent power node */}
          <circle cx="23" cy="13" r="2" fill="#32B83F" />
        </svg>
      </div>

      {/* Brand Name Typography */}
      <div className="flex items-center gap-1.5 tracking-tight">
        <span className={`font-extrabold text-white tracking-[0.08em] font-heading uppercase ${textSize}`}>
          NEXORA
        </span>
        <span
          className={`font-bold bg-[#32B83F]/15 text-[#32B83F] border border-[#32B83F]/30 rounded tracking-wider uppercase ${tagSize}`}
        >
          TECH
        </span>
      </div>
    </div>
  );
};
