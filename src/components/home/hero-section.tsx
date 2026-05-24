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
    <section ref={sectionRef} className="relative min-h-screen overflow-hidden bg-[#0a1530] text-white">
      <motion.div style={{ y: backgroundY }} className="absolute inset-0">
        <div className="absolute inset-0">
          <AnimatePresence initial={false}>
            {slides.map((slide, index) => {
              const isActive = index === active;
              return (
                <motion.div
                  key={slide.id}
                  initial={false}
                  animate={{
                    opacity: isActive ? 1 : 0,
                    scale: isActive ? 1 : 0.975,
                    x: isActive ? 0 : 10,
                    filter: isActive ? "blur(0px)" : "blur(4px)",
                  }}
                  transition={{ duration: 1.7, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 flex items-start justify-center"
                >
                  <div className="relative h-[100vh] w-full sm:h-[100vh] lg:h-[104vh] flex items-start justify-center">
                    <Image
                      src={slide.image}
                      alt={heroCopy.title}
                      fill
                      priority={index === 0}
                      sizes="100vw"
                      className="object-contain object-top brightness-[1.22] contrast-[1.18] saturate-[1.18] opacity-[0.99] drop-shadow-[0_32px_88px_rgba(0,0,0,0.38)]"
                      style={{ marginTop: '48px', transition: 'margin 0.7s cubic-bezier(0.4,0,0.2,1)' }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </motion.div>

      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,21,48,0.92)_0%,rgba(10,21,48,0.74)_28%,rgba(10,21,48,0.36)_52%,rgba(10,21,48,0.52)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,21,48,0.22)_0%,rgba(10,21,48,0.08)_26%,rgba(10,21,48,0.38)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_24%,rgba(255,122,24,0.2),transparent_18%),radial-gradient(circle_at_78%_18%,rgba(27,61,112,0.18),transparent_22%),radial-gradient(circle_at_72%_36%,rgba(255,255,255,0.08),transparent_16%),radial-gradient(circle_at_42%_100%,rgba(255,122,24,0.08),transparent_28%)]" />
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

      <div className="relative z-10 flex min-h-screen items-start justify-center px-5 pb-6 pt-22 sm:justify-start sm:px-8 sm:pb-8 sm:pt-24 lg:px-12 lg:pb-10 lg:pt-26 xl:px-16">
        <motion.div
          style={{ y: contentY }}
          initial={{ opacity: 0, y: 56 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-[21.5rem] pt-2 sm:max-w-3xl sm:pt-3 lg:pt-4"
        >
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-[#f97316]/25 bg-[var(--navy-soft)]/10 px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.18em] text-[#ffb366] drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)] backdrop-blur-xl sm:gap-3 sm:px-4 sm:text-[10px] sm:tracking-[0.3em]"
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
            <h1 className="max-w-[15.5ch] font-display text-[1.6rem] font-semibold leading-[0.96] tracking-[-0.045em] text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)] sm:max-w-2xl sm:text-[2.15rem] sm:leading-[1.02] lg:text-[2.6rem] xl:max-w-[52rem] xl:text-[2.95rem]">
              {heroCopy.title}
            </h1>

            <p className="mt-3 hidden max-w-[14rem] text-[0.58rem] leading-5 text-slate-100 drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)] sm:block sm:max-w-2xl sm:text-[0.86rem] sm:leading-6 lg:max-w-xl">
              {heroCopy.subtitle}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16, duration: 0.7 }}
            className="mt-5 flex flex-wrap gap-2 sm:gap-3"
          >
            <MagneticLink
              href="#cta"
              className="inline-flex items-center justify-center rounded-full bg-[var(--accent)] px-4 py-2.5 text-[0.62rem] font-semibold text-white shadow-[0_18px_50px_rgba(249,115,22,0.38)] transition duration-300 hover:scale-[1.03] hover:shadow-[0_24px_65px_rgba(249,115,22,0.5)] sm:px-5 sm:text-[0.8rem]"
            >
              Book Repair
            </MagneticLink>

            <MagneticLink
              href="/track-repair"
              className="inline-flex items-center justify-center rounded-full border border-[var(--accent)]/40 bg-white/[0.08] px-4 py-2.5 text-[0.62rem] font-semibold text-[var(--foreground)] backdrop-blur-xl transition duration-300 hover:scale-[1.02] hover:border-[var(--accent)]/60 hover:bg-white/[0.12] hover:shadow-[0_10px_40px_rgba(249,115,22,0.08)] sm:px-5 sm:text-[0.8rem]"
            >
              Track Repairs
            </MagneticLink>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.24, duration: 0.75 }}
            className="mt-5 grid max-w-[18rem] grid-cols-2 gap-2 sm:max-w-3xl sm:gap-2.5 sm:grid-cols-4"
          >
            {stats.map(([value, label]) => (
              <div
                key={label}
                className="rounded-[1rem] border border-white/10 bg-white/[0.06] px-2.5 py-2 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] sm:rounded-[1.05rem] sm:px-3 sm:py-2.5"
              >
                <p className="font-display text-[0.88rem] font-semibold tracking-[-0.04em] text-white sm:text-[1.1rem]">
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
            className="mt-4 flex items-center gap-3"
          >
            {slides.map((slide, index) => (
              <button
                key={slide.id}
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
