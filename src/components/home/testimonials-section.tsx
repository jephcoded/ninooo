"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/animations/reveal";
import { SectionHeading } from "@/components/home/section-heading";
import { testimonials } from "@/components/home/data";

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="section-shell py-16 lg:py-20">
      <Reveal>
        <SectionHeading
          eyebrow="Client Testimonials"
          title="Premium client confidence from repair customers, businesses, and diagnostics-focused clients."
          description="Glass cards, restrained motion, and darker technical styling keep the section rich without becoming cluttered."
          align="center"
        />
      </Reveal>

      <div className="mt-10 grid gap-5 lg:grid-cols-2">
        {testimonials.map((item, index) => (
          <Reveal key={item.name} delay={index * 0.06} className="h-full">
            <motion.article whileHover={{ y: -4 }} className="glass-panel h-full rounded-[1.8rem] p-6 sm:p-7">
              <div className="flex items-center gap-4">
                <div className="flex size-14 items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--accent),#ffcf93)] font-display text-lg font-semibold text-black">
                  {item.name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")
                    .slice(0, 2)}
                </div>
                <div>
                  <p className="font-display text-xl text-white">{item.name}</p>
                  <p className="text-sm uppercase tracking-[0.18em] text-slate-400">{item.role}</p>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-1 text-[var(--accent-2)]">
                {Array.from({ length: 5 }).map((_, starIndex) => (
                  <span key={starIndex}>★</span>
                ))}
              </div>
              <p className="mt-5 text-sm leading-8 text-slate-200">“{item.quote}”</p>
            </motion.article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}