"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  from?: "up" | "left" | "right";
};

export function Reveal({ children, className, delay = 0, from = "up" }: RevealProps) {
  const initial =
    from === "left"
      ? { opacity: 0, x: -48, y: 0 }
      : from === "right"
        ? { opacity: 0, x: 48, y: 0 }
        : { opacity: 0, x: 0, y: 32 };

  const visible = { opacity: 1, x: 0, y: 0 };

  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={visible}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}