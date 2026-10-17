import React from 'react';

interface AuvighaLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showTagline?: boolean;
}

export const AuvighaLogo: React.FC<AuvighaLogoProps> = ({
  size = 'md',
  className = '',
  showTagline = false,
}) => {
  const sizeMap = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24 sm:w-28 sm:h-28',
    lg: 'w-32 h-32 sm:w-36 sm:h-36',
    xl: 'w-44 h-44 sm:w-48 sm:h-48',
  };

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className={`relative ${sizeMap[size]} transition-transform duration-300 hover:scale-105 select-none`}>
        {/* Crisp High-Fidelity SVG of Official AUVIGHA Tech Circular Emblem */}
        <svg
          viewBox="0 0 400 400"
          className="w-full h-full drop-shadow-xl"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Outer metallic ring gradient */}
            <radialGradient id="ringShine" cx="30%" cy="20%" r="70%" fx="30%" fy="20%">
              <stop offset="0%" stopColor="#FF4D4D" />
              <stop offset="35%" stopColor="#DC2626" />
              <stop offset="70%" stopColor="#991B1B" />
              <stop offset="100%" stopColor="#7F1D1D" />
            </radialGradient>

            {/* Subtle inner bevel */}
            <linearGradient id="ringHighlight" x1="0" y1="0" x2="400" y2="400" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
              <stop offset="30%" stopColor="#DC2626" stopOpacity="0.1" />
              <stop offset="70%" stopColor="#450A0A" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.6" />
            </linearGradient>

            {/* Red text gradient */}
            <linearGradient id="textGrad" x1="0" y1="180" x2="0" y2="230" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#EF4444" />
              <stop offset="60%" stopColor="#DC2626" />
              <stop offset="100%" stopColor="#991B1B" />
            </linearGradient>

            {/* Gold Wi-Fi waves gradient */}
            <linearGradient id="goldGrad" x1="180" y1="100" x2="220" y2="170" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FBBF24" />
              <stop offset="60%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>

            {/* Tech pill gradient */}
            <linearGradient id="techPillGrad" x1="230" y1="220" x2="360" y2="260" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>

            {/* Soft drop shadow filter */}
            <filter id="shadowGlow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#DC2626" floodOpacity="0.25" />
            </filter>
          </defs>

          {/* Outer Metallic Red Circular Ring */}
          <circle cx="200" cy="200" r="190" stroke="url(#ringShine)" strokeWidth="18" fill="#FFFFFF" />
          <circle cx="200" cy="200" r="190" stroke="url(#ringHighlight)" strokeWidth="18" />
          <circle cx="200" cy="200" r="180" stroke="#EF4444" strokeWidth="1.5" strokeOpacity="0.4" />
          <circle cx="200" cy="200" r="199" stroke="#991B1B" strokeWidth="1" strokeOpacity="0.6" />

          {/* Wi-Fi / Antenna Signal Waves over the 'I' (Around X=196) */}
          <g transform="translate(0, -6)">
            {/* Outer wave */}
            <path
              d="M 166 138 C 176 122, 218 122, 228 138"
              fill="none"
              stroke="url(#goldGrad)"
              strokeWidth="11"
              strokeLinecap="round"
            />
            {/* Middle wave */}
            <path
              d="M 178 152 C 185 142, 209 142, 216 152"
              fill="none"
              stroke="url(#goldGrad)"
              strokeWidth="10"
              strokeLinecap="round"
            />
            {/* Signal beacon center dot */}
            <circle cx="197" cy="167" r="8" fill="url(#goldGrad)" />
          </g>

          {/* Brand Name: AUVIGHA */}
          <g filter="url(#shadowGlow)">
            {/* Main Typographic Emblem */}
            <text
              x="200"
              y="222"
              textAnchor="middle"
              fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
              fontWeight="900"
              fontSize="68"
              letterSpacing="-2px"
              fill="url(#textGrad)"
            >
              AUVIGHA
            </text>

            {/* Left dynamic swoosh cut on first 'A' */}
            <path
              d="M 52 216 Q 78 194 92 190 Q 72 208 52 216 Z"
              fill="#EF4444"
            />
            {/* Right dynamic swoosh cut on last 'A' */}
            <path
              d="M 314 190 Q 330 196 352 216 Q 328 206 314 190 Z"
              fill="#EF4444"
            />
          </g>

          {/* Tech Golden Swoosh Line and Badge */}
          <g>
            {/* Connecting golden speed line */}
            <path
              d="M 58 238 L 230 238 L 244 224 L 254 224"
              stroke="url(#goldGrad)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* "Tech" Rounded Badge */}
            <rect
              x="234"
              y="220"
              width="122"
              height="38"
              rx="18"
              fill="url(#techPillGrad)"
              stroke="#FBBF24"
              strokeWidth="1.5"
            />

            {/* "Tech" text */}
            <text
              x="295"
              y="247"
              textAnchor="middle"
              fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
              fontWeight="800"
              fontSize="24"
              fontStyle="italic"
              fill="#FFFFFF"
              letterSpacing="0.5px"
            >
              Tech
            </text>
          </g>
        </svg>
      </div>

      {showTagline && (
        <div className="mt-3 text-center">
          <p className="text-sm font-semibold tracking-wide text-slate-800">
            Votre partenaire en high-tech
          </p>
          <p className="text-xs text-slate-500 mt-0.5">
            شريككم الموثوق في عالم التكنولوجيا والإعلام الآلي
          </p>
        </div>
      )}
    </div>
  );
};
