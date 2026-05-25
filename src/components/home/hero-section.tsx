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

        <div className="relative mx-auto grid w-full max-w-[1380px] items-center gap-2 px-6 pt-28 pb-12 sm:px-8 lg:grid-cols-[0.86fr_1.14fr] lg:px-10 xl:px-14">

          {/* LEFT CONTENT */}
          <motion.div
            style={{ y: contentY }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative z-30 flex max-w-[520px] flex-col justify-center"
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

              <h1 className="max-w-[12ch] font-display text-[2.7rem] font-semibold leading-[1.02] tracking-[-0.06em] text-white drop-shadow-[0_4px_18px_rgba(0,0,0,0.35)] sm:text-[3.4rem] lg:text-[3.8rem]">

                ECU repair, device diagnostics,
                <span className="text-[#ff7a18]">
                  {" "}board-level recovery,
                </span>{" "}
                and precision electronics service.

              </h1>

              <p className="mt-5 max-w-[500px] text-[0.96rem] leading-7 text-slate-300">
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
              className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4"
            >

              {stats.map(([value, label]) => (
                <div
                  key={label}
                  className="rounded-[1rem] border border-white/10 bg-[#111c34]/70 px-4 py-4 backdrop-blur-md shadow-[0_8px_24px_rgba(0,0,0,0.16)]"
                >

                  <p className="font-display text-[1.08rem] font-semibold tracking-[-0.04em] text-white">
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

          {/* RIGHT IMAGE */}
          <div className="relative flex h-full items-center justify-end">

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
                    className="relative flex h-[62vh] w-full items-center justify-end pointer-events-none lg:h-[72vh]"
                  >

                    {/* GLOW */}
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "radial-gradient(circle at 62% 45%, rgba(255,120,0,0.24), transparent 70%)",
                        filter: "blur(50px)",
                      }}
                    />

                    {/* IMAGE */}
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
                        alt="Mechanic"
                        fill
                        priority={index === 0}
                        sizes="58vw"
                        className="object-contain object-right select-none pointer-events-none scale-[1.22]"
                      />

                      {/* LEFT DARK BLEND */}
                      <div
                        className="absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(to right, rgba(2,6,23,0.94) 0%, rgba(2,6,23,0.12) 35%, rgba(0,0,0,0) 68%)",
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