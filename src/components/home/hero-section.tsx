"use client";

import Image from "next/image";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { MagneticLink } from "@/components/ui/magnetic-link";

const slides = [
  {
    image: "/images/hero-1.png",
  },
  {
    image: "/images/hero-2.png",
  },
  {
    image: "/images/hero-3.png",
  },
];

const heroCopy = {
  eyebrow: "Premium automotive workshop",
  title: "Professional vehicle diagnostics, repairs, and engineering solutions for modern cars and fleets.",
  subtitle:
    "Advanced fault tracing, ECU analysis, electrical repair, and disciplined inspection workflows delivered with workshop precision and premium service standards.",
};

const stats = [
  ["12k+", "Vehicles serviced"],
  ["18k+", "Diagnostics completed"],
  ["3.2k+", "CNG conversions"],
  ["140+", "Fleet clients"],
];

export function HeroSection() {
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 45]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, 2300);

    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen overflow-hidden bg-[#050816] text-white">
      <motion.div style={{ y: backgroundY }} className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={slides[active].image}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={slides[active].image}
              alt={heroCopy.title}
              fill
              priority
              sizes="100vw"
              className="object-cover brightness-[1.12] contrast-[1.05]"
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(3,5,10,0.66)_0%,rgba(3,5,10,0.42)_34%,rgba(3,5,10,0.18)_56%,rgba(3,5,10,0.36)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,5,10,0.24)_0%,rgba(3,5,10,0.04)_24%,rgba(3,5,10,0.44)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_24%,rgba(255,122,24,0.18),transparent_18%),radial-gradient(circle_at_78%_18%,rgba(27,61,112,0.22),transparent_24%),radial-gradient(circle_at_42%_100%,rgba(255,122,24,0.1),transparent_28%)]" />
      <div className="hero-grid absolute inset-0 opacity-15" />
      <div className="noise-overlay opacity-45" />

      <div className="absolute inset-0 overflow-hidden">
        <motion.span
          animate={{ y: [0, -18, 0], opacity: [0.3, 0.55, 0.3] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-[10%] top-[24%] size-32 rounded-full bg-[radial-gradient(circle,rgba(255,122,24,0.18),transparent_72%)] blur-3xl"
        />
        <motion.span
          animate={{ y: [0, 16, 0], x: [0, 8, 0], opacity: [0.18, 0.4, 0.18] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-[12%] top-[18%] size-40 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.14),transparent_72%)] blur-3xl"
        />
        <motion.span
          animate={{ y: [0, -14, 0], opacity: [0.18, 0.34, 0.18] }}
          transition={{ duration: 8.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[14%] right-[24%] size-36 rounded-full bg-[radial-gradient(circle,rgba(255,122,24,0.16),transparent_70%)] blur-3xl"
        />
      </div>

      <div className="relative z-10 flex min-h-screen items-start px-6 pb-6 pt-22 sm:px-8 sm:pb-8 sm:pt-24 lg:px-12 lg:pb-10 lg:pt-26 xl:px-16">
        <motion.div
          style={{ y: contentY }}
          initial={{ opacity: 0, y: 56 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl pt-2 sm:pt-3 lg:pt-4"
        >
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 rounded-full border border-[#ff7a18]/25 bg-black/20 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#ffb067] backdrop-blur-xl"
          >
            <span className="h-2 w-2 rounded-full bg-[#ff7a18] shadow-[0_0_18px_rgba(255,122,24,0.9)]" />
            {heroCopy.eyebrow}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5"
          >
            <h1 className="max-w-2xl font-display text-[1.75rem] font-semibold leading-[1.02] tracking-[-0.045em] text-white sm:text-[2.15rem] lg:text-[2.6rem] xl:max-w-[52rem] xl:text-[2.95rem]">
              {heroCopy.title}
            </h1>

            <p className="mt-3 max-w-2xl text-[0.8rem] leading-6 text-slate-300 sm:text-[0.86rem] sm:leading-6 lg:max-w-xl">
              {heroCopy.subtitle}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16, duration: 0.7 }}
            className="mt-5 flex flex-wrap gap-3"
          >
            <MagneticLink
              href="#cta"
              className="inline-flex items-center justify-center rounded-full bg-[#ff7a18] px-5 py-2.5 text-[0.8rem] font-semibold text-black shadow-[0_18px_50px_rgba(255,122,24,0.38)] transition duration-300 hover:scale-[1.03] hover:shadow-[0_24px_65px_rgba(255,122,24,0.5)]"
            >
              Book Inspection
            </MagneticLink>

            <MagneticLink
              href="/track-repair"
              className="inline-flex items-center justify-center rounded-full border border-white/14 bg-white/[0.05] px-5 py-2.5 text-[0.8rem] font-semibold text-white backdrop-blur-xl transition duration-300 hover:scale-[1.02] hover:border-[#ff7a18]/40 hover:bg-white/[0.09] hover:shadow-[0_10px_40px_rgba(255,255,255,0.08)]"
            >
              Track-Repairs 
            </MagneticLink>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.24, duration: 0.75 }}
            className="mt-5 grid max-w-3xl grid-cols-2 gap-2.5 sm:grid-cols-4"
          >
            {stats.map(([value, label]) => (
              <div
                key={label}
                className="rounded-[1.05rem] border border-white/10 bg-white/[0.06] px-3 py-2.5 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.2)]"
              >
                <p className="font-display text-[1rem] font-semibold tracking-[-0.04em] text-white sm:text-[1.1rem]">
                  {value}
                </p>
                <p className="mt-1 text-[7px] uppercase tracking-[0.18em] text-slate-400 sm:text-[8px]">
                  {label}
                </p>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="mt-4 flex items-center gap-3"
          >
            {slides.map((slide, index) => (
              <button
                key={slide.image}
                type="button"
                aria-label={`Go to slide ${index + 1}`}
                onClick={() => setActive(index)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  active === index ? "w-10 bg-[#ff7a18]" : "w-2.5 bg-white/45 hover:bg-white/70"
                }`}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default HeroSection;