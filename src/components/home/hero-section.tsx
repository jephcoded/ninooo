"use client";

import Image from "next/image";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
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
  title: "ECU repair, device diagnostics, board-level recovery, and precision electronics service.",
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
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 45]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, 4200);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen overflow-hidden bg-[#0a1530] text-white"
    >
      {/* Background overlays - z-0 */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a1530] via-[#0a1530] to-[#162040] opacity-100" />
        <div className="absolute right-0 top-0 h-[80%] w-[60%] bg-[radial-gradient(circle_at_80%_40%,rgba(255,122,24,0.13),transparent_70%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_24%,rgba(255,122,24,0.09),transparent_18%),radial-gradient(circle_at_78%_18%,rgba(27,61,112,0.07),transparent_22%),radial-gradient(circle_at_72%_36%,rgba(255,255,255,0.04),transparent_16%),radial-gradient(circle_at_42%_100%,rgba(255,122,24,0.04),transparent_28%)]" />
        <div className="hero-grid absolute inset-0 opacity-7" />
        <div className="noise-overlay opacity-20" />
        <motion.span
          animate={{ y: [0, -18, 0], opacity: [0.2, 0.38, 0.2] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-[10%] top-[24%] size-32 rounded-full bg-[radial-gradient(circle,rgba(255,122,24,0.13),transparent_72%)] blur-3xl"
        />
        <motion.span
          animate={{ y: [0, 16, 0], x: [0, 8, 0], opacity: [0.12, 0.22, 0.12] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-[12%] top-[18%] size-40 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.09),transparent_72%)] blur-3xl"
        />
        <motion.span
          animate={{ y: [0, -14, 0], opacity: [0.12, 0.18, 0.12] }}
          transition={{ duration: 8.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[14%] right-[24%] size-36 rounded-full bg-[radial-gradient(circle,rgba(255,122,24,0.10),transparent_70%)] blur-3xl"
        />
      </div>

      {/* Hero content row - z-20 */}
      <div className="relative z-20 mx-auto flex w-full max-w-[1400px] min-h-screen items-center px-4 sm:px-8 lg:px-12 xl:px-16">
        {/* Left: Text content */}
        <motion.div
          style={{ y: contentY }}
          initial={{ opacity: 0, y: 56 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-[540px] pt-2 sm:pt-3 lg:pt-4"
        >
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-[#f97316]/25 bg-[var(--navy-soft)]/10 px-2.5 py-1.5 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#f97316] backdrop-blur-xl sm:gap-2 sm:px-3 sm:text-[10px] sm:tracking-[0.3em]"
          >
            <span className="h-2 w-2 rounded-full bg-[#ff7a18] shadow-[0_0_18px_rgba(255,122,24,0.9)]" />
            {heroCopy.eyebrow}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
            className="mt-3"
          >
            <h1 className="max-w-[15.5ch] font-display text-[2.3rem] font-semibold leading-[1.08] tracking-[-0.045em] text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.32)] sm:max-w-2xl sm:text-[2.7rem] sm:leading-[1.12] lg:text-[3.1rem] xl:max-w-[36rem] xl:text-[3.3rem]">
              {heroCopy.title}
            </h1>

            <p className="mt-2 hidden max-w-[20rem] text-[0.74rem] leading-5 text-slate-300 sm:block sm:max-w-xl sm:text-[0.98rem] sm:leading-6 lg:max-w-lg">
              {heroCopy.subtitle}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16, duration: 0.7 }}
            className="mt-4 flex flex-wrap gap-2 sm:gap-2"
          >
            <MagneticLink
              href="#cta"
              className="inline-flex items-center justify-center rounded-full bg-[var(--accent)] px-3 py-2 text-[0.62rem] font-semibold text-white shadow-[0_8px_24px_rgba(249,115,22,0.18)] transition duration-200 hover:scale-[1.03] hover:shadow-[0_12px_32px_rgba(249,115,22,0.22)] sm:px-4 sm:text-[0.8rem]"
            >
              Book Repair
            </MagneticLink>

            <MagneticLink
              href="/track-repair"
              className="inline-flex items-center justify-center rounded-full border border-[var(--accent)]/40 bg-white/[0.08] px-3 py-2 text-[0.62rem] font-semibold text-[var(--foreground)] backdrop-blur-xl transition duration-200 hover:scale-[1.02] hover:border-[var(--accent)]/60 hover:bg-white/[0.12] hover:shadow-[0_6px_18px_rgba(249,115,22,0.08)] sm:px-4 sm:text-[0.8rem]"
            >
              Track Repairs
            </MagneticLink>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.24, duration: 0.75 }}
            className="mt-4 grid max-w-[18rem] grid-cols-2 gap-2 sm:max-w-3xl sm:gap-2 sm:grid-cols-4"
          >
            {stats.map(([value, label]) => (
              <div
                key={label}
                className="rounded-[0.9rem] border border-white/18 bg-white/5 px-2 py-2 backdrop-blur-md shadow-[0_6px_18px_rgba(0,0,0,0.13)] sm:rounded-[1rem] sm:px-2.5 sm:py-2"
              >
                <p className="font-display text-[0.86rem] font-semibold tracking-[-0.04em] text-white sm:text-[1.05rem]">
                  {value}
                </p>
                <p className="mt-1 text-[6px] uppercase tracking-[0.15em] text-slate-400 sm:text-[8px] sm:tracking-[0.18em]">
                  {label}
                </p>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="mt-3 flex items-center gap-2"
          >
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                aria-label={`Go to slide ${index + 1}`}
                onClick={() => setActive(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  active === index ? "w-7 bg-[#ff7a18]" : "w-2.5 bg-white/30 hover:bg-white/60"
                }`}
              />
            ))}
          </motion.div>
        </motion.div>

        {/* Right: Hero image - z-10, cinematic composition, advanced blending */}
        <div className="relative z-10 flex flex-1 items-center justify-center h-full min-h-[420px] max-h-[92vh] overflow-visible">
          <AnimatePresence initial={false}>
            {slides.map((slide, index) => {
              const isActive = index === active;
              return (
                <motion.div
                  key={slide.id}
                  initial={false}
                  animate={{
                    opacity: isActive ? 1 : 0,
                    scale: isActive ? 1 : 0.98,
                    x: isActive ? 0 : 24,
                    filter: isActive ? "blur(0px)" : "blur(4px)",
                  }}
                  transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute bottom-0 right-0 flex items-end justify-end w-[105vw] max-w-[1100px] h-[80vh] sm:h-[88vh] md:h-[92vh] lg:h-[98vh] xl:h-[104vh] pointer-events-none"
                  style={{ zIndex: 10, overflow: 'visible' }}
                >
                  {/* Orange radial glow behind mechanic */}
                  <div className="absolute right-0 bottom-0 w-[90%] h-[90%]" style={{zIndex:1}}>
                    <div className="absolute right-0 bottom-0 w-full h-full" style={{
                      background: 'radial-gradient(circle at 80% 80%, rgba(255,120,0,0.18), transparent 70%)',
                      filter: 'blur(32px)'}} />
                  </div>
                  {/* Mechanic image with mask-image gradient for soft fade */}
                  <div className="relative w-full h-full" style={{
                    WebkitMaskImage: 'linear-gradient(to left, rgba(0,0,0,1) 65%, rgba(0,0,0,0.85) 78%, rgba(0,0,0,0.4) 90%, transparent 100%)',
                    maskImage: 'linear-gradient(to left, rgba(0,0,0,1) 65%, rgba(0,0,0,0.85) 78%, rgba(0,0,0,0.4) 90%, transparent 100%)',
                    overflow: 'visible',
                    zIndex: 2
                  }}>
                    <Image
                      src={slide.image}
                      alt={heroCopy.title}
                      fill
                      priority={index === 0}
                      sizes="80vw"
                      className="object-contain object-bottom brightness-[1.13] contrast-[1.08] saturate-[1.1] opacity-[0.99] select-none pointer-events-none"
                      style={{ transition: 'all 0.7s cubic-bezier(0.4,0,0.2,1)', overflow: 'visible' }}
                    />
                    {/* Overlay gradient above image for left-to-right blending */}
                    <div className="absolute inset-0" style={{
                      background: 'linear-gradient(to right, rgba(2,6,23,0.96) 0%, rgba(2,6,23,0.4) 45%, rgba(0,0,0,0) 100%)',
                      zIndex: 3,
                      pointerEvents: 'none'
                    }} />
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
