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
    <section className="relative w-full overflow-hidden bg-[linear-gradient(180deg,#0e1728_0%,#0d1524_100%)] pt-0">
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] w-full px-0 py-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_42%,rgba(249,115,22,0.18),transparent_15%),linear-gradient(90deg,rgba(11,20,36,0.06),rgba(11,20,36,0.14))]" />
        <div className="relative z-10 flex flex-row items-center justify-between w-full max-w-[1600px] px-8 py-12 gap-8">
          {/* Hero Text Horizontal */}
          <div className="flex flex-col justify-center items-start w-[48%] min-w-[340px]">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#2e3c56] bg-[#142039] px-3 py-2 text-[0.56rem] font-semibold uppercase tracking-[0.22em] text-[#e2e8f0] sm:px-4 sm:text-[0.62rem]">
              <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
              Electronics repair and diagnostics
            </div>
            <h1 className="mt-4 font-display text-[2rem] font-semibold leading-tight tracking-[-0.03em] text-white max-w-full">
              ECU repair, device diagnostics, <span className="text-[var(--accent)]">board-level recovery,</span> and precision electronics service.
            </h1>
            <p className="mt-3 text-[0.98rem] leading-7 text-slate-300 max-w-full">
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
          {/* Hero Image */}
          <div className="relative flex items-end justify-center w-[52%] min-h-[22rem] lg:min-h-[31rem]">
            <AnimatePresence mode="wait">
              <motion.div
                key={slides[active].id}
                initial={{ opacity: 0, x: 28, scale: 1.01 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -24, scale: 0.99 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="relative h-[23rem] w-full max-w-[32rem] sm:h-[29rem] sm:max-w-[38rem] lg:h-[34rem] lg:max-w-[44rem]"
              >
                {/* Overlay for blending image with background */}
                <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-r from-[#0e1728] via-transparent to-[#0d1524] opacity-80" />
                <Image
                  src={slides[active].image}
                  alt="NINO technician at work"
                  fill
                  priority={active === 0}
                  sizes="(max-width: 1024px) 95vw, 52vw"
                  className="object-contain object-bottom lg:object-right-bottom"
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
