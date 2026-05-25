// Trigger redeploy: dummy comment
"use client";

import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { MagneticLink } from "@/components/ui/magnetic-link";

import heroSlideOne from "../../../dev 1.png";
import heroSlideTwo from "../../../dev2.png";
import heroSlideThree from "../../../dev 3.png";

const slides = [
  {
    id: "hero-slide-1",
    image: heroSlideOne,
  },
  {
    id: "hero-slide-2",
    image: heroSlideTwo,
  },
  {
    id: "hero-slide-3",
    image: heroSlideThree,
  },
];

const heroCopy = {
  eyebrow: "Electronics repair and diagnostics",
  subtitle:
    "NINO Electronics Solutions handles ECU repair, ECU cloning and programming, TV repair, laptop repair, phone repair, immobilizer work, key programming, and complex board diagnostics with disciplined technical workflow.",
};

const stats = [
  ["12k+", "Devices serviced"],
  ["18k+", "Diagnostics completed"],
  ["3.2k+", "ECUs repaired"],
  ["140+", "Business clients"],
];

export function HeroSection() {
  const [active, setActive] = useState(0);

  const sectionRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [0, 24]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-[#07101f] text-white"
    >
      {/* BACKGROUND */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* MAIN BACKGROUND */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#06101f] via-[#081530] to-[#121f3d]" />
        {/* RIGHT ORANGE GLOW */}
        <div className="absolute right-[-8%] top-[5%] h-[90%] w-[60%] bg-[radial-gradient(circle_at_55%_45%,rgba(255,122,24,0.18),transparent_68%)] blur-[30px]" />
        {/* DARK DEPTH */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />
        {/* LEFT BLEND */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#07101f] via-[#081530]/92 to-transparent" />
        {/* GRID */}
        <div className="hero-grid absolute inset-0 opacity-[0.05]" />
        {/* NOISE */}
        <div className="noise-overlay opacity-20" />
      </div>

      {/* HERO CONTAINER */}
      <div className="relative z-20 flex min-h-screen items-center">
        <div className="relative mx-auto grid w-full max-w-[1380px] items-center gap-2 px-6 pt-28 pb-12 sm:px-8 lg:grid-cols-[0.95fr_1.25fr] lg:px-10 xl:px-14">
          {/* LEFT CONTENT */}
          <motion.div
            style={{ y: contentY }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative z-30 flex max-w-[410px] flex-col justify-center"
          >
            {/* EYEBROW */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#ff7a18] backdrop-blur-xl"
            >
              <span className="h-2 w-2 rounded-full bg-[#ff7a18] shadow-[0_0_18px_rgba(255,122,24,0.9)]" />
              {heroCopy.eyebrow}
            </motion.div>

            {/* TITLE */}
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-6"
            >
              <h1 className="font-display text-[1.45rem] font-semibold leading-[1.13] tracking-[-0.06em] text-white drop-shadow-[0_4px_18px_rgba(0,0,0,0.35)] sm:text-[1.85rem] lg:text-[2.1rem]">
                <span className="block">
                  ECU repair, device diagnostics, <span className="text-[#ff7a18]">board-level</span>
                </span>
                <span className="block">
                  recovery, and precision electronics service.
                </span>
              </h1>
              <p className="mt-5 max-w-[400px] text-[0.95rem] leading-7 text-slate-300">
                {heroCopy.subtitle}
              </p>
            </motion.div>

            {/* BUTTONS */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.14,
                duration: 0.65,
              }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <MagneticLink
                href="#cta"
                className="inline-flex items-center justify-center rounded-full bg-[#ff7a18] px-7 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(249,115,22,0.25)] transition duration-300 hover:scale-[1.03]"
              >
                Book Repair
              </MagneticLink>
              <MagneticLink
                href="/track-repair"
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.05] px-7 py-3 text-sm font-semibold text-white backdrop-blur-xl transition duration-300 hover:scale-[1.02]"
              >
                Track Repairs
              </MagneticLink>
            </motion.div>

            {/* STATS */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.22,
                duration: 0.7,
              }}
              className="mt-10 grid grid-cols-2 gap-7 sm:grid-cols-4"
            >
              {stats.map(([value, label]) => (
                <div
                  key={label}
                  className="w-full min-w-[170px] rounded-2xl bg-[#111c34]/80 px-8 py-7 backdrop-blur-md shadow-[0_8px_24px_rgba(0,0,0,0.16)] flex flex-col items-center"
                >
                  <p className="font-display text-[1.25rem] font-semibold tracking-[-0.04em] text-white mb-2">
                    {value}
                  </p>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-slate-400 text-center">
                    {label}
                  </p>
                </div>
              ))}
            </motion.div>

            {/* SLIDER DOTS */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.28,
                duration: 0.65,
              }}
              className="mt-5 flex items-center gap-2"
            >
              {slides.map((slide, index) => (
                <button
                  key={slide.id}
                  type="button"
                  aria-label={`Go to slide ${index + 1}`}
                  onClick={() => setActive(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    active === index
                      ? "w-7 bg-[#ff7a18]"
                      : "w-2.5 bg-white/30 hover:bg-white/60"
                  }`}
                />
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT IMAGE REMOVED: Now background */}
        </div>
      </div>
    </section>
  );
}

export default HeroSection;