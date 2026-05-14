"use client";

import { motion } from "framer-motion";

const particles = [
  { left: "8%", top: "22%", delay: 0 },
  { left: "22%", top: "68%", delay: 0.8 },
  { left: "41%", top: "16%", delay: 1.4 },
  { left: "64%", top: "28%", delay: 0.5 },
  { left: "78%", top: "72%", delay: 1.1 },
  { left: "88%", top: "18%", delay: 1.8 },
];

export function AmbientParticles() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden">
      {particles.map((particle) => (
        <motion.span
          key={`${particle.left}-${particle.top}`}
          className="absolute h-1.5 w-1.5 rounded-full bg-[rgba(255,177,95,0.55)] blur-[1px]"
          style={{ left: particle.left, top: particle.top }}
          animate={{ y: [0, -24, 0], opacity: [0.25, 0.7, 0.25] }}
          transition={{ duration: 8, repeat: Infinity, delay: particle.delay, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}