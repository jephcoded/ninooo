"use client";

import Image, { type StaticImageData } from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Reveal } from "@/components/animations/reveal";
import bookingImage from "../../../booking.png";
import servicesImage from "../../../box 1.png";
import trackingImage from "../../../tracking.png";

type PreviewCard = {
  label: string;
  title: string;
  description: string;
  meta: string;
  price?: string;
  image: string | StaticImageData;
};

type FocusSection = {
  slug: string;
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  cta: string;
  cards: PreviewCard[];
};

type FocusCarouselProps = {
  cards: PreviewCard[];
  href: string;
  sectionIndex: number;
  sectionSlug: string;
};

const focusSections: FocusSection[] = [
  {
    slug: "service",
    eyebrow: "Services",
    title: "Professional electronics diagnostics, repair, programming, and board-level recovery.",
    description: "From ECU faults to damaged laptops, phones, TVs, and modules, NINO handles electronic repair with speed, precision, and clear customer communication.",
    href: "/service",
    cta: "View Services",
    cards: [
      {
        label: "Diagnostics",
        title: "Advanced fault tracing",
        description: "Signal checks, ECU analysis, and board-level diagnostics for damaged electronics with accurate reporting.",
        meta: "Core service",
        image: "/images/service-panel.svg",
      },
      {
        label: "Repair",
        title: "Module and board repair",
        description: "Precision troubleshooting for damaged modules, wiring faults, connectors, and electronic boards.",
        meta: "Technical repair",
        image: "/images/service-panel.svg",
      },
      {
        label: "Programming",
        title: "ECU cloning and programming",
        description: "Programming, immobilizer setup, key coding, and software recovery for supported electronic modules.",
        meta: "Specialist workflow",
        image: "/images/service-panel.svg",
      },
    ],
  },
  {
    slug: "booking",
    eyebrow: "Booking",
    title: "Simple booking for diagnostics, repairs, programming, and electronics support.",
    description: "Choose the right repair path quickly and submit your request with confidence, whether you are booking a single device or several electronics jobs.",
    href: "/booking",
    cta: "Book Now",
    cards: [
      {
        label: "Diagnostics",
        title: "Device fault booking",
        description: "Reserve a diagnostic slot for fault finding, scanning, testing, and repair reporting.",
        meta: "Quick start",
        image: "/images/booking-panel.svg",
      },
      {
        label: "Repair",
        title: "Repair scheduling",
        description: "Choose a service window for board repair, programming, diagnostics, or device recovery.",
        meta: "Customer booking",
        image: "/images/booking-panel.svg",
      },
      {
        label: "Business",
        title: "Commercial requests",
        description: "Submit coordinated repair requests for office devices, modules, and repeated electronics service jobs.",
        meta: "Business support",
        image: "/images/booking-panel.svg",
      },
    ],
  },
  {
    slug: "tracking",
    eyebrow: "Tracking",
    title: "Follow your repair from diagnosis through recovery, testing, and delivery.",
    description: "Customers can stay informed with clearer repair milestones, approval points, and completion updates throughout the service journey.",
    href: "/track-repair",
    cta: "Track Repair",
    cards: [
      {
        label: "Status",
        title: "Inspection in progress",
        description: "Job cards, diagnostics notes, and repair stage updates presented in a customer-friendly flow.",
        meta: "Live progress",
        image: "/images/tracking-panel.svg",
      },
      {
        label: "Progress",
        title: "Parts awaiting approval",
        description: "Customers can see decision points, pending approvals, and next service actions clearly.",
        meta: "Repair milestone",
        image: "/images/tracking-panel.svg",
      },
      {
        label: "Completion",
        title: "Ready for collection",
        description: "Final checks, testing updates, and completion confirmations sit inside the tracking experience.",
        meta: "Delivery notice",
        image: "/images/tracking-panel.svg",
      },
    ],
  },
  {
    slug: "shop",
    eyebrow: "Shop",
    title: "",
    description: "",
    href: "/shop",
    cta: "View Shop",
    cards: [
      {
        label: "Hardware",
        title: "Programming tools",
        description: "Featured tools, adapters, and support hardware for diagnostics and electronics service work.",
        meta: "Featured stock",
        price: "₦1,250,000",
        image: "/images/shop-panel.svg",
      },
      {
        label: "Electronics",
        title: "Diagnostic accessories",
        description: "Scanners, connectors, adapters, and repair support items curated for quality.",
        meta: "Best seller",
        price: "₦320,000",
        image: "/images/shop-panel.svg",
      },
      {
        label: "Support",
        title: "Service add-ons",
        description: "Priority diagnostics, programming support, and premium care bundles.",
        meta: "Premium option",
        price: "₦180,000",
        image: "/images/shop-panel.svg",
      },
      {
        label: "Care",
        title: "Premium repair plan",
        description: "Longer-term electronics support, inspections, and premium service attention.",
        meta: "New arrival",
        price: "₦540,000",
        image: "/images/shop-panel.svg",
      },
    ],
  },
];

function FocusCarousel({ cards, href, sectionIndex, sectionSlug }: FocusCarouselProps) {
  const [activeCard, setActiveCard] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveCard((current) => (current + 1) % cards.length);
    }, 3600 + sectionIndex * 180);

    return () => window.clearInterval(intervalId);
  }, [cards.length, sectionIndex]);

  const goToPrevious = () => {
    setActiveCard((current) => (current - 1 + cards.length) % cards.length);
  };

  const goToNext = () => {
    setActiveCard((current) => (current + 1) % cards.length);
  };

  const card = cards[activeCard];
  const isServiceSection = sectionSlug === "service";
  const isBookingSection = sectionSlug === "booking";
  const isTrackingSection = sectionSlug === "tracking";
  const isShopSection = sectionSlug === "shop";

  const visibleShopCards = cards.map((_, index) => cards[(activeCard + index) % cards.length]).slice(0, 3);

  if (isServiceSection) {
    return (
      <div className="relative overflow-hidden rounded-[2rem] bg-transparent shadow-none">
        <div className="relative min-h-[28rem] overflow-hidden bg-transparent sm:min-h-[35rem]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(255,122,24,0.08),transparent_16%),linear-gradient(180deg,rgba(255,255,255,0.42),rgba(248,250,252,0.28))]" />
          <div className="absolute inset-0 px-2 py-2 sm:px-4 sm:py-4">
            <Image
              src={servicesImage}
              alt="Electronics services overview"
              fill
              sizes="(max-width: 1024px) 100vw, 46vw"
              className="object-contain object-center opacity-100"
              priority={false}
            />
          </div>
        </div>
      </div>
    );
  }

  if (isBookingSection) {
    return (
      <div className="relative overflow-hidden rounded-[2rem] bg-transparent shadow-none">
        <div className="relative min-h-[28rem] overflow-hidden bg-transparent sm:min-h-[35rem]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_18%,rgba(249,115,22,0.08),transparent_16%),linear-gradient(180deg,rgba(255,255,255,0.24),rgba(248,250,252,0.2))]" />
          <div className="absolute inset-0 px-2 py-2 sm:px-4 sm:py-4">
            <Image
              src={bookingImage}
              alt="Booking experience on mobile"
              fill
              sizes="(max-width: 1024px) 100vw, 46vw"
              className="object-contain object-center opacity-100"
              priority={false}
            />
          </div>
        </div>
      </div>
    );
  }

  if (isTrackingSection) {
    return (
      <div className="relative overflow-hidden rounded-[2rem] bg-transparent shadow-none">
        <div className="relative min-h-[28rem] overflow-hidden bg-transparent sm:min-h-[35rem]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(249,115,22,0.08),transparent_16%),linear-gradient(180deg,rgba(255,255,255,0.24),rgba(248,250,252,0.2))]" />
          <div className="absolute inset-0 px-2 py-2 sm:px-4 sm:py-4">
            <Image
              src={trackingImage}
              alt="Tracking experience on mobile"
              fill
              sizes="(max-width: 1024px) 100vw, 46vw"
              className="object-contain object-center opacity-100 rounded-3xl sm:rounded-[2.5rem]"
              priority={false}
            />
          </div>
        </div>
      </div>
    );
  }

  if (isShopSection) {
    return (
      <div className="rounded-[2rem] bg-transparent p-0">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Previous shop item"
              onClick={goToPrevious}
              className="inline-flex size-11 items-center justify-center rounded-full border border-slate-200/80 bg-white/70 text-slate-900 transition-colors duration-300 hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              <span className="text-lg">&#8592;</span>
            </button>
            <button
              type="button"
              aria-label="Next shop item"
              onClick={goToNext}
              className="inline-flex size-11 items-center justify-center rounded-full border border-slate-200/80 bg-white/70 text-slate-900 transition-colors duration-300 hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              <span className="text-lg">&#8594;</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            {cards.map((item, index) => (
              <button
                key={item.title}
                type="button"
                aria-label={`Go to shop item ${index + 1}`}
                onClick={() => setActiveCard(index)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  activeCard === index ? "w-9 bg-[var(--accent)]" : "w-2.5 bg-slate-300 hover:bg-slate-400"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="mt-6 overflow-hidden rounded-[2rem] bg-[linear-gradient(180deg,#ffffff,#f7f8fb)] px-2 py-8 sm:px-4 lg:px-6">
          <div className="grid gap-8 sm:grid-cols-3">
            {visibleShopCards.map((item, index) => (
              <div
                key={`${item.title}-${index}`}
                className="flex min-h-[27rem] flex-col justify-between border-l border-slate-200/80 px-5 first:border-l-0 sm:min-h-[32rem] sm:px-6"
              >
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">
                      {item.label}
                    </p>
                    <p className="text-[0.66rem] uppercase tracking-[0.2em] text-slate-400">
                      {item.meta}
                    </p>
                  </div>
                  <h3 className="mt-4 max-w-[12ch] font-display text-[1.15rem] font-semibold leading-[1.08] tracking-[-0.04em] text-slate-950 sm:max-w-[13ch] sm:text-[1.35rem]">
                    {item.title}
                  </h3>
                </div>

                <div className="flex flex-1 items-center justify-center py-6">
                  <div className="flex h-full min-h-[15rem] w-full max-w-[10.5rem] items-center justify-center border-y border-dashed border-slate-300/80">
                    <span className="text-center text-[0.7rem] font-medium uppercase tracking-[0.22em] text-slate-400">
                      Image
                      <br />
                      To Be Added
                    </span>
                  </div>
                </div>

                <div className="border-t border-slate-200 pt-4">
                  <p className="text-[0.7rem] uppercase tracking-[0.22em] text-slate-400">Price</p>
                  <p className="mt-2 font-display text-[1.4rem] font-semibold tracking-[-0.04em] text-slate-950">
                    {item.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-[2rem] bg-transparent p-0 shadow-none">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Previous preview"
            onClick={goToPrevious}
            className="inline-flex size-11 items-center justify-center rounded-full border border-slate-200/80 bg-white/70 text-slate-900 transition-colors duration-300 hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            <span className="text-lg">&#8592;</span>
          </button>
          <button
            type="button"
            aria-label="Next preview"
            onClick={goToNext}
            className="inline-flex size-11 items-center justify-center rounded-full border border-slate-200/80 bg-white/70 text-slate-900 transition-colors duration-300 hover:border-[var(--accent)] hover:text-[var(--accent)]"
          >
            <span className="text-lg">&#8594;</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          {cards.map((item, index) => (
            <button
              key={item.title}
              type="button"
              aria-label={`Go to preview ${index + 1}`}
              onClick={() => setActiveCard(index)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                activeCard === index ? "w-9 bg-[var(--accent)]" : "w-2.5 bg-slate-300 hover:bg-slate-400"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="mt-5 overflow-hidden rounded-[1.6rem] bg-transparent shadow-none">
        <AnimatePresence mode="wait">
          <motion.article
            key={card.title}
            initial={{ opacity: 0, x: 38, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -38, scale: 0.98 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="min-h-[20rem] p-0 sm:min-h-[21rem]"
          >
            <div className="relative min-h-[25rem] overflow-hidden rounded-[1.6rem] bg-transparent sm:min-h-[29rem]">
              <div className="absolute inset-0">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 44vw"
                  className="object-cover opacity-[0.84]"
                />
              </div>
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.24)_26%,rgba(15,23,42,0.2)_100%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_16%,rgba(249,115,22,0.18),transparent_20%),radial-gradient(circle_at_16%_82%,rgba(15,23,42,0.05),transparent_26%),linear-gradient(90deg,rgba(255,255,255,0.18),transparent_26%,transparent_74%,rgba(15,23,42,0.06))]" />

              <div className="absolute inset-x-5 top-5 flex flex-wrap items-center justify-between gap-3 sm:inset-x-6 sm:top-6">
                <div className="flex flex-wrap items-center gap-2.5">
                  <p className="rounded-full border border-white/40 bg-white/70 px-3 py-2 text-[0.64rem] font-semibold uppercase tracking-[0.24em] text-[var(--accent)] backdrop-blur-xl">
                    {card.label}
                  </p>
                  <span className="rounded-full border border-white/30 bg-white/70 px-3 py-2 text-[0.6rem] uppercase tracking-[0.18em] text-[#0f172a] backdrop-blur-xl">
                    {card.meta}
                  </span>
                </div>
                {sectionSlug === "shop" ? (
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/70 px-3 py-2 text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-[#0f172a] backdrop-blur-xl">
                    <span className="inline-flex size-7 items-center justify-center rounded-full bg-[var(--accent)] text-white">
                      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="9" cy="20" r="1.5" />
                        <circle cx="18" cy="20" r="1.5" />
                        <path d="M3 4h2l2.1 9.3a1 1 0 0 0 1 .7h8.8a1 1 0 0 0 1-.8L20 7H7.1" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    Add to Cart
                  </div>
                ) : null}
              </div>

              <div className="absolute inset-x-5 bottom-5 sm:inset-x-6 sm:bottom-6">
                <div className="max-w-2xl rounded-[1.4rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.84),rgba(248,250,252,0.92))] p-5 backdrop-blur-xl sm:p-6">
                  <p className="text-[0.66rem] font-semibold uppercase tracking-[0.24em] text-slate-500">
                    Featured Highlight
                  </p>
                  <h3 className="mt-3 font-display text-[1.5rem] font-semibold tracking-[-0.04em] text-[#0f172a] sm:text-[1.8rem]">
                    {card.title}
                  </h3>
                  <p className="mt-3 max-w-xl text-sm leading-7 text-slate-600 sm:text-[0.95rem]">
                    {card.description}
                  </p>
                  <div className="mt-5 grid gap-3 sm:grid-cols-3">
                    {cards.map((item, index) => (
                      <button
                        key={item.title}
                        type="button"
                        onClick={() => setActiveCard(index)}
                        className={`rounded-2xl border px-4 py-3 text-left transition-colors duration-300 ${
                          index === activeCard
                            ? "border-[var(--accent)]/35 bg-[var(--accent)]/10 text-[#0f172a]"
                            : "border-slate-200 bg-white text-slate-500 hover:bg-[#fff7ed]"
                        }`}
                      >
                        <p className="text-[0.68rem] uppercase tracking-[0.2em]">{item.label}</p>
                        <p className="mt-2 font-display text-sm tracking-[-0.02em]">{item.title}</p>
                      </button>
                    ))}
                  </div>
                  <div className="mt-5 h-2 rounded-full bg-slate-200">
                    <div
                      className="h-2 rounded-full bg-[var(--accent)] transition-all duration-500"
                      style={{ width: `${((activeCard + 1) / cards.length) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <a
              href={href}
              className="mt-6 inline-flex items-center rounded-full border border-slate-200 bg-white px-5 py-3 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-slate-900 transition-colors duration-300 hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              View More
            </a>
          </motion.article>
        </AnimatePresence>
      </div>
    </div>
  );
}

export function HomeFocusSections() {
  return (
    <div className="py-6 lg:py-0 lg:snap-y lg:snap-mandatory">
      {focusSections.map((section, sectionIndex) => (
        <section key={section.eyebrow} className="section-shell py-10 lg:flex lg:min-h-[calc(100vh-5.5rem)] lg:snap-start lg:items-center lg:py-14">
          <div className={`grid gap-10 lg:w-full lg:items-center ${section.slug === "shop" ? "lg:grid-cols-1" : "lg:grid-cols-[0.82fr_1.18fr] xl:grid-cols-[0.78fr_1.22fr]"}`}>
            {section.slug !== "shop" ? (
              <Reveal from="left">
                <div className="max-w-4xl space-y-4 lg:pr-2">
                  <p className="eyebrow">{section.eyebrow}</p>
                  <h2 className="font-display text-[1.36rem] font-semibold leading-[1.08] tracking-[-0.04em] text-slate-950 sm:text-[1.78rem] lg:max-w-[24ch] lg:text-[2rem] xl:text-[2.2rem]">
                    {section.title}
                  </h2>
                  <p className="max-w-2xl text-[0.95rem] leading-7 text-slate-600 sm:text-base">
                    {section.description}
                  </p>
                  <a
                    href={section.href}
                    className="inline-flex items-center rounded-full border border-[var(--accent)]/15 bg-[var(--accent)] px-5 py-3 text-[0.78rem] font-semibold uppercase tracking-[0.22em] text-white shadow-[0_14px_34px_rgba(255,122,24,0.18)] transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(255,122,24,0.24)]"
                  >
                    {section.cta}
                  </a>
                </div>
              </Reveal>
            ) : null}

            <Reveal from="right" delay={0.08 + sectionIndex * 0.03}>
              <FocusCarousel
                cards={section.cards}
                href={section.href}
                sectionIndex={sectionIndex}
                sectionSlug={section.slug}
              />
            </Reveal>
          </div>
        </section>
      ))}
    </div>
  );
}
