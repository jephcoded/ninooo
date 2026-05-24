"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { MagneticLink } from "@/components/ui/magnetic-link";
import heroSlideOne from "../../../dev 1.png";
import heroSlideTwo from "../../../dev2.png";
import heroSlideThree from "../../../dev 3.png";

const slides = [
  { id: "hero-slide-1", image: heroSlideOne },
  { id: "hero-slide-2", image: heroSlideTwo },
  { id: "hero-slide-3", image: heroSlideThree },
];

const stats = [
  ["12k+", "Devices serviced"],
  ["18k+", "Diagnostics completed"],
  ["3.2k+", "ECUs repaired"],
  ["140+", "Business clients"],
];

export function HeroSection() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, 4200);
    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <section className="relative w-full min-h-screen flex items-stretch overflow-hidden bg-[linear-gradient(180deg,#0e1728_0%,#0d1524_100%)] pt-0">
      {/* Fullscreen hero image background */}
      <div className="absolute inset-0 -z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={slides[active].id}
            initial={{ opacity: 0, scale: 1.01 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.99 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src={slides[active].image}
              alt="NINO technician at work"
              fill
              priority={active === 0}
              sizes="100vw"
              className="object-cover object-center w-full h-full opacity-80"
            />
            {/* Overlay for blending */}
            <div className="absolute inset-0 bg-[linear-gradient(90deg,#0e1728_0%,rgba(14,23,40,0.7)_40%,rgba(14,23,40,0.7)_60%,#0e1728_100%)]" />
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="relative z-10 flex flex-col justify-center w-full min-h-screen px-4 py-0 sm:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between w-full max-w-[1600px] mx-auto gap-8">
          {/* Hero Text Horizontal, responsive */}
          <div className="flex flex-col justify-center items-start w-full lg:w-[48%] min-w-[260px] max-w-2xl text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#2e3c56] bg-[#142039] px-3 py-2 text-[0.56rem] font-semibold uppercase tracking-[0.22em] text-[#e2e8f0] sm:px-4 sm:text-[0.62rem]">
              <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
              Electronics repair and diagnostics
            </div>
            <h1 className="mt-4 font-display text-[2.1rem] sm:text-[2.5rem] md:text-[2.8rem] lg:text-[2.6rem] xl:text-[3.1rem] font-semibold leading-tight tracking-[-0.03em] text-white max-w-full">
              ECU repair, device diagnostics, <span className="text-[var(--accent)]">board-level recovery,</span> and precision electronics service.
            </h1>
            <p className="mt-3 text-[1rem] sm:text-[1.1rem] md:text-[1.15rem] lg:text-[1.05rem] leading-7 text-slate-300 max-w-full">
              NINO Electronics Solutions handles ECU repair, ECU cloning and programming, TV repair, laptop repair, phone repair, immobilizer work, key programming, and complex board diagnostics with disciplined technical workflow.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <MagneticLink
                href="/booking"
                className="inline-flex min-w-[9.6rem] items-center justify-center rounded-full bg-[var(--accent)] px-5 py-3 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[#0f172a] shadow-[0_18px_44px_rgba(249,115,22,0.26)]"
              >
                Book Repair
              </MagneticLink>
              <MagneticLink
                href="/track-repair"
                className="inline-flex min-w-[10.2rem] items-center justify-center rounded-full border border-[#334155] bg-[#101b30] px-5 py-3 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-white transition-colors duration-300 hover:border-[var(--accent)] hover:text-[#ffd1a4]"
              >
                Track Repairs
              </MagneticLink>
            </div>
            <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {stats.map(([value, label]) => (
                <div
                  key={label}
                  className="rounded-[0.85rem] border border-[#25344e] bg-[linear-gradient(180deg,rgba(23,35,58,0.95),rgba(19,30,50,0.95))] px-4 py-3.5"
                >
                  <p className="font-display text-[1.1rem] font-semibold tracking-[-0.04em] text-white">
                    {value}
                  </p>
                  <p className="mt-1 text-[0.56rem] uppercase tracking-[0.22em] text-slate-300 sm:text-[0.6rem]">
                    {label}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-5 flex items-center gap-3">
              {slides.map((slide, index) => (
                <button
                  key={slide.id}
                  type="button"
                  aria-label={`Go to slide ${index + 1}`}
                  onClick={() => setActive(index)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    active === index ? "w-11 bg-[var(--accent)]" : "w-2.5 bg-white/30 hover:bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
