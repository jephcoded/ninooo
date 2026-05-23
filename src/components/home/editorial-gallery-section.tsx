"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Reveal } from "@/components/animations/reveal";

const visualStories = [
  {
    title: "Repair detail",
    caption: "Tighter repair scenes with premium composition and real electronics-lab atmosphere.",
    image: "/images/mo-1.png",
  },
  {
    title: "Service station",
    caption: "A cleaner view into the bench setup, equipment zones, and the environment customers trust.",
    image: "/images/mo-2.png",
  },
  {
    title: "Repair process",
    caption: "Hands-on repair activity framed with darker lighting, cleaner contrast, and premium motion.",
    image: "/images/mo-3.png",
  },
  {
    title: "Lab operations",
    caption: "A broader visual story showing scale, confidence, and the technical character of the brand.",
    image: "/images/mo-4.png",
  },
];

export function EditorialGallerySection() {
  return (
    <section id="visual-story" className="section-shell py-16 lg:py-20">
      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <Reveal>
          <div className="max-w-3xl space-y-3">
            <p className="eyebrow">Visual Story</p>
            <h2 className="max-w-3xl font-display text-[1.45rem] font-semibold leading-[1.08] tracking-[-0.04em] text-slate-950 sm:text-[1.8rem] lg:text-[2.2rem] xl:max-w-[40rem] xl:text-[2.45rem]">
              Real repair scenes with a cleaner premium electronics presentation.
            </h2>
            <p className="max-w-2xl text-[0.92rem] leading-7 text-slate-600 sm:text-[0.98rem]">
              The visual story now uses your uploaded repair images, smaller copy, and motion that feels more polished and alive.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.08} className="grid gap-5 sm:grid-cols-2">
          {visualStories.slice(0, 2).map((story) => (
            <motion.article
              key={story.title}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="editorial-card group overflow-hidden rounded-[1.75rem]"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <motion.div
                  initial={{ scale: 1.02 }}
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <Image src={story.image} alt={story.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 40vw" />
                </motion.div>
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,6,10,0.02)_6%,rgba(4,6,10,0.16)_38%,rgba(4,6,10,0.82)_100%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_18%,rgba(255,122,24,0.16),transparent_18%)] opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="absolute inset-x-5 bottom-5">
                  <p className="text-[11px] uppercase tracking-[0.26em] text-[var(--accent-2)]">{story.title}</p>
                  <p className="mt-2 max-w-xs text-[0.92rem] leading-6 text-slate-200">{story.caption}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </Reveal>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        {visualStories.slice(2).map((story, index) => (
          <Reveal key={story.title} delay={0.1 + index * 0.05}>
            <motion.article
              whileHover={{ y: -6 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="editorial-card group overflow-hidden rounded-[1.75rem]"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <motion.div
                  initial={{ scale: 1.02 }}
                  whileHover={{ scale: 1.07 }}
                  transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <Image src={story.image} alt={story.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
                </motion.div>
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,6,10,0.03)_10%,rgba(4,6,10,0.16)_42%,rgba(4,6,10,0.86)_100%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_18%,rgba(255,122,24,0.18),transparent_18%)] opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="absolute inset-x-5 bottom-5">
                  <p className="text-[11px] uppercase tracking-[0.26em] text-[var(--accent-2)]">{story.title}</p>
                  <p className="mt-2 max-w-md text-[0.92rem] leading-6 text-slate-200">{story.caption}</p>
                </div>
              </div>
            </motion.article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}