"use client";

import { motion } from "framer-motion";

type VehicleVisualProps = {
  variant: "hero" | "feature";
};

export function VehicleVisual({ variant }: VehicleVisualProps) {
  const isHero = variant === "hero";

  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        animate={{ x: [0, 8, 0], y: [0, -8, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className={`absolute ${isHero ? "bottom-18 left-1/2 w-[115%] -translate-x-1/2" : "bottom-12 left-1/2 w-[108%] -translate-x-1/2"}`}
      >
        <svg viewBox="0 0 1200 540" className="w-full">
          <defs>
            <linearGradient id="bodyGradient" x1="0%" x2="100%" y1="0%" y2="0%">
              <stop offset="0%" stopColor="#101722" />
              <stop offset="45%" stopColor="#1b2433" />
              <stop offset="100%" stopColor="#0b1018" />
            </linearGradient>
            <linearGradient id="glowGradient" x1="0%" x2="100%" y1="0%" y2="0%">
              <stop offset="0%" stopColor="#ff7a18" stopOpacity="0" />
              <stop offset="55%" stopColor="#ff7a18" stopOpacity="1" />
              <stop offset="100%" stopColor="#ffb15f" stopOpacity="0.2" />
            </linearGradient>
            <filter id="softGlow">
              <feGaussianBlur stdDeviation="12" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <ellipse cx="600" cy="420" rx="330" ry="54" fill="rgba(255,122,24,0.15)" filter="url(#softGlow)" />
          <path
            d="M180 348c42-20 88-42 144-54 58-12 128-18 196-18h118c56 0 106 5 144 16 47 13 94 38 150 74l80 6v40H160v-36z"
            fill="url(#bodyGradient)"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="3"
          />
          <path
            d="M310 284c36-58 96-104 178-116l182-6c58 24 112 70 152 122"
            fill="none"
            stroke="rgba(255,255,255,0.14)"
            strokeWidth="4"
          />
          <path
            d="M348 286h392c32 0 61 14 80 40H288c15-22 34-34 60-40Z"
            fill="rgba(12,17,26,0.72)"
          />
          <path d="M405 248h132c30 0 48 16 56 42H366c10-24 22-37 39-42Z" fill="rgba(149,188,255,0.15)" />
          <path d="M585 246h115c36 5 64 18 84 44H606c-6-23-14-36-21-44Z" fill="rgba(149,188,255,0.12)" />
          <path d="M218 357h764" stroke="url(#glowGradient)" strokeWidth="6" filter="url(#softGlow)" />
          <circle cx="360" cy="405" r="56" fill="#080b11" stroke="rgba(255,255,255,0.14)" strokeWidth="6" />
          <circle cx="360" cy="405" r="28" fill="#101722" stroke="#ff7a18" strokeWidth="4" />
          <circle cx="840" cy="405" r="56" fill="#080b11" stroke="rgba(255,255,255,0.14)" strokeWidth="6" />
          <circle cx="840" cy="405" r="28" fill="#101722" stroke="#ff7a18" strokeWidth="4" />
          <path d="M878 314h92l30 22h-94Z" fill="rgba(255,255,255,0.08)" />
          <path d="M205 334h44l-14 24h-46Z" fill="#ff7a18" filter="url(#softGlow)" />
          <path d="M949 338h42l16 18h-46Z" fill="#ffb15f" filter="url(#softGlow)" />
        </svg>
      </motion.div>
    </div>
  );
}