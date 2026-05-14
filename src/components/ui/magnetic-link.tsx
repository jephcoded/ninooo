"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import type { ReactNode } from "react";

type MagneticLinkProps = {
  href: string;
  className?: string;
  children: ReactNode;
};

export function MagneticLink({ href, className, children }: MagneticLinkProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 20 });
  const springY = useSpring(y, { stiffness: 220, damping: 20 });

  return (
    <motion.a
      href={href}
      className={className}
      style={{ x: springX, y: springY }}
      onMouseMove={(event) => {
        const bounds = event.currentTarget.getBoundingClientRect();
        const moveX = (event.clientX - bounds.left - bounds.width / 2) * 0.12;
        const moveY = (event.clientY - bounds.top - bounds.height / 2) * 0.12;
        x.set(moveX);
        y.set(moveY);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.a>
  );
}