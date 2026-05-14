"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

export function CustomCursorGlow() {
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const springX = useSpring(x, { damping: 26, stiffness: 180 });
  const springY = useSpring(y, { damping: 26, stiffness: 180 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      x.set(event.clientX - 90);
      y.set(event.clientY - 90);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [x, y]);

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[2] hidden h-44 w-44 rounded-full bg-[radial-gradient(circle,_rgba(255,122,24,0.16),transparent_68%)] blur-3xl md:block"
      style={{ x: springX, y: springY }}
    />
  );
}