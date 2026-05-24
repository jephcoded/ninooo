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
  title:
    "ECU repair, device diagnostics, board-level recovery, and precision electronics service.",
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

  const contentY = useTransform(scrollYProgress, [0, 1], [0, 40]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, 4200);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-[#0a1530] text-white"
    >
      {/* BACKGROUND */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#081120] via-[#0a1530] to-[#162040]" />

        <div className="absolute right-0 top-0 h-[90%] w-[65%] bg-[radial-gradient(circle_at_80%_40%,rgba(255,122,24,0.16),transparent_70%)]" />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_24%,rgba(255,122,24,0.08),transparent_18%),radial-gradient(circle_at_78%_18%,rgba(27,61,112,0.08),transparent_22%),radial-gradient(circle_at_72%_36%,rgba(255,255,255,0.04),transparent_16%)]" />

        <div className="hero-grid absolute inset-0 opacity-[0.06]" />

        <div className="noise-overlay opacity-20" />
      </div>

      {/* HERO CONTENT */}
      <div className="relative z-20 flex min-h-screen items-center">
        <div className="relative mx-auto grid w-full max-w-[1400px] items-center gap-10 px-4 pt-24 pb-10 sm:px-8 lg:min-h-[82vh] lg:grid-cols-[0.92fr_1.08fr] lg:px-12 xl:px-16">

          {/* LEFT CONTENT */}
          <motion.div
            style={{ y: contentY }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative z-30 flex max-w-[580px] flex-col justify-center"
          >
            {/* EYEBROW */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex w-fit items-center gap-2 rounded-full border border-[#f97316]/25 bg-white/[0.04] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#ff7a18] backdrop-blur-xl"
            >
              <span className="h-2 w-2 rounded-full bg-[#ff7a18] shadow-[0_0_18px_rgba(255,122,24,0.9)]" />

              {heroCopy.eyebrow}
            </motion.div>

            {/* TITLE */}
            <motion.div
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-6"
            >
              <h1 className="max-w-[15ch] font-display text-[3rem] font-semibold leading-[1.02] tracking-[-0.055em] text-white drop-shadow-[0_4px_18px_rgba(0,0,0,0.4)] sm:text-[3.6rem] lg:text-[4.7rem]">
                {heroCopy.title}
              </h1>

              <p className="mt-6 max-w-[560px] text-[1rem] leading-7 text-slate-300">
                {heroCopy.subtitle}
              </p>
            </motion.div>

            {/* BUTTONS */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.15,
                duration: 0.65,
              }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <MagneticLink
                href="#cta"
                className="inline-flex items-center justify-center rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(249,115,22,0.24)] transition duration-300 hover:scale-[1.03]"
              >
                Book Repair
              </MagneticLink>

              <MagneticLink
                href="/track-repair"
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.06] px-6 py-3 text-sm font-semibold text-white backdrop-blur-xl transition duration-300 hover:scale-[1.02]"
              >
                Track Repairs
              </MagneticLink>
            </motion.div>

            {/* STATS */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.22,
                duration: 0.7,
              }}
              className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-4"
            >
              {stats.map(([value, label]) => (
                <div
                  key={label}
                  className="rounded-[1rem] border border-white/10 bg-white/[0.05] px-4 py-4 backdrop-blur-md shadow-[0_8px_24px_rgba(0,0,0,0.14)]"
                >
                  <p className="font-display text-[1.15rem] font-semibold tracking-[-0.04em] text-white">
                    {value}
                  </p>

                  <p className="mt-1 text-[9px] uppercase tracking-[0.18em] text-slate-400">
                    {label}
                  </p>
                </div>
              ))}
            </motion.div>

            {/* SLIDER DOTS */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.3,
                duration: 0.65,
              }}
              className="mt-6 flex items-center gap-2"
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

          {/* RIGHT IMAGE */}
          <div className="relative flex h-full items-center justify-end translate-y-4 lg:translate-y-8">
            <AnimatePresence initial={false}>
              {slides.map((slide, index) => {
                const isActive = index === active;

                return (
                  <motion.div
                    key={slide.id}
                    initial={false}
                    animate={{
                      opacity: isActive ? 1 : 0,
                      scale: isActive ? 1 : 0.985,
                      x: isActive ? 0 : 40,
                    }}
                    transition={{
                      duration: 1.1,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="relative h-[68vh] w-full max-w-[860px] pointer-events-none lg:h-[78vh]"
                  >
                    {/* ORANGE GLOW */}
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "radial-gradient(circle at 75% 55%, rgba(255,120,0,0.16), transparent 70%)",
                        filter: "blur(40px)",
                      }}
                    />

                    {/* IMAGE WRAPPER */}
                    <div
                      className="relative h-full w-full"
                      style={{
                        WebkitMaskImage:
                          "linear-gradient(to left, rgba(0,0,0,1) 82%, rgba(0,0,0,0.82) 92%, transparent 100%)",
                        maskImage:
                          "linear-gradient(to left, rgba(0,0,0,1) 82%, rgba(0,0,0,0.82) 92%, transparent 100%)",
                      }}
                    >
                      <Image
                        src={slide.image}
                        alt={heroCopy.title}
                        fill
                        priority={index === 0}
                        sizes="60vw"
                        className="object-contain object-bottom select-none pointer-events-none"
                      />

                      {/* IMAGE OVERLAY */}
                      <div
                        className="absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(to right, rgba(2,6,23,0.82) 0%, rgba(2,6,23,0.16) 28%, rgba(0,0,0,0) 60%)",
                        }}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;