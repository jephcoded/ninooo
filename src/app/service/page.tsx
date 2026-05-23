"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import boxImage from "../../../box 1.png";
import gopImage from "../../../gop.png";

import { ADMIN_DATA_EVENT, defaultServices, ManagedService, readManagedServices } from "@/lib/admin-data";

const ServiceWebGLStage = dynamic(
  () => import("@/components/service/service-webgl-stage").then((module) => module.ServiceWebGLStage),
  { ssr: false },
);

type ServicePart = ManagedService["parts"][number];

export default function ServicePage() {
  const [serviceTabs, setServiceTabs] = useState<ManagedService[]>(defaultServices);
  const [activeTab, setActiveTab] = useState(defaultServices[0].slug);
  const [selectedPart, setSelectedPart] = useState<ServicePart | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [isCompactStage, setIsCompactStage] = useState(false);
  const diagramSectionRef = useRef<HTMLElement | null>(null);
  const [sceneProgress, setSceneProgress] = useState(0);

  useEffect(() => {
    const syncViewport = () => {
      setIsCompactStage(window.innerWidth < 768);
    };

    syncViewport();
    window.addEventListener("resize", syncViewport);

    return () => {
      window.removeEventListener("resize", syncViewport);
    };
  }, []);

  useEffect(() => {
    const syncServices = async () => {
      setServiceTabs(await readManagedServices());
    };

    void syncServices();
    const handleSyncServices = () => {
      void syncServices();
    };

    window.addEventListener("storage", handleSyncServices);
    window.addEventListener(ADMIN_DATA_EVENT, handleSyncServices);

    return () => {
      window.removeEventListener("storage", handleSyncServices);
      window.removeEventListener(ADMIN_DATA_EVENT, handleSyncServices);
    };
  }, []);

  useEffect(() => {
    if (!serviceTabs.some((tab) => tab.slug === activeTab) && serviceTabs[0]) {
      setActiveTab(serviceTabs[0].slug);
    }
  }, [activeTab, serviceTabs]);

  const selectedService = serviceTabs.find((tab) => tab.slug === activeTab) ?? defaultServices[0];
  const trackingHref = `/track-repair?service=${selectedService.slug}&id=${selectedService.code}`;
  const diagramParts = selectedService.parts.slice(0, 4);
  const { scrollYProgress } = useScroll({
    target: diagramSectionRef,
    offset: ["start start", "end end"],
  });
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setSceneProgress(latest);
  });

  const handleTabChange = (slug: string) => {
    setActiveTab(slug);
    setSelectedPart(null);
  };

  return (
    <main className="bg-white">
      <section className="relative bg-white">
        <section
          ref={diagramSectionRef}
          className="relative left-1/2 h-[180vh] w-screen -translate-x-1/2 sm:h-[210vh]"
        >
          <div className="sticky top-0 h-[100svh] overflow-hidden bg-[radial-gradient(circle_at_top,rgba(255,173,88,0.18),transparent_18%),linear-gradient(180deg,#04080d_0%,#08111a_100%)] sm:h-screen">
            <div className="absolute left-3 top-3 z-10 flex max-w-[calc(100vw-1.5rem)] flex-wrap gap-2 sm:left-6 sm:top-6 sm:max-w-[calc(100vw-3rem)] sm:gap-3 lg:left-8 lg:top-8">
              {serviceTabs.map((tab) => {
                const isActive = tab.slug === selectedService.slug;

                return (
                  <button
                    key={tab.slug}
                    type="button"
                    onClick={() => handleTabChange(tab.slug)}
                    className={`rounded-full border px-3 py-2 text-[0.58rem] font-semibold uppercase tracking-[0.18em] transition-colors duration-300 sm:px-4 sm:text-[0.68rem] sm:tracking-[0.22em] ${
                      isActive
                        ? "border-[var(--accent)]/20 bg-[linear-gradient(180deg,#ffb15f,#ff8f2a)] text-black shadow-[0_14px_30px_rgba(255,122,24,0.2)]"
                        : "border-white/12 bg-white/6 text-white/84 backdrop-blur-md hover:border-[var(--accent)]/30 hover:text-white"
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(249,115,22,0.12),transparent_16%),radial-gradient(circle_at_82%_78%,rgba(15,23,42,0.08),transparent_18%)]" />
            <div className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(rgba(15,23,42,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.08)_1px,transparent_1px)] [background-size:4.5rem_4.5rem]" />
            <ServiceWebGLStage
              progress={sceneProgress}
              stageOneSrc={boxImage.src}
              stageTwoSrc={gopImage.src}
              parts={diagramParts}
              compact={isCompactStage}
              onPartSelect={(partName) => {
                const matchedPart = selectedService.parts.find((part) => part.name === partName);

                if (matchedPart) {
                  setSelectedPart(matchedPart);
                }
              }}
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-[linear-gradient(180deg,transparent,#f8fafc)] sm:h-40" />
          </div>
        </section>

        <section className="section-shell bg-white py-14 sm:py-16">
          <div className="grid gap-10 lg:grid-cols-1 lg:gap-12">
            <motion.div
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[var(--accent)]">
                Nino service standard
              </p>
              <h2 className="mt-4 max-w-[20ch] font-display text-[1.55rem] font-semibold leading-[1.02] tracking-[-0.04em] text-slate-950 sm:text-[2rem]">
                {selectedService.title}
              </h2>
              <p className="mt-5 max-w-2xl text-[0.98rem] leading-8 text-slate-600">
                {selectedService.summary}
              </p>
              <p className="mt-4 max-w-2xl text-[0.98rem] leading-8 text-slate-500">
                {selectedService.details}
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {selectedService.checks.map((item, index) => (
                  <div key={item} className="border-b border-slate-200 pb-4">
                    <p className="text-[0.64rem] font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">
                      Check {index + 1}
                    </p>
                    <p className="mt-3 text-sm leading-7 text-slate-700">{item}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href={`/booking?service=${selectedService.slug}&id=${selectedService.code}`}
                  className="inline-flex items-center rounded-full bg-[var(--accent)] px-5 py-3 text-[0.74rem] font-semibold uppercase tracking-[0.22em] text-black transition-transform duration-300 hover:-translate-y-0.5"
                >
                  Book Repair
                </Link>
                <Link
                  href={trackingHref}
                  className="inline-flex items-center rounded-full border border-slate-200 px-5 py-3 text-[0.74rem] font-semibold uppercase tracking-[0.22em] text-slate-700 transition-colors duration-300 hover:border-[var(--accent)] hover:text-[var(--accent)]"
                >
                  Track By ID
                </Link>
              </div>
            </motion.div>

            <motion.div
              className="relative max-w-3xl"
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.58, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">
                {selectedService.label}
              </p>
              <h3 className="mt-4 font-display text-[1.3rem] font-semibold leading-[1.06] tracking-[-0.03em] text-slate-950 sm:text-[1.6rem]">
                Clear repair flow, cleaner diagnostics, and a better technical direction.
              </h3>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                NINO handles inspection, diagnosis, parts guidance, and repair follow-through with a process that keeps the customer clear on what is being fixed and why it matters.
              </p>
              <div className="mt-6 border-l-2 border-[var(--accent)]/25 pl-4">
                <p className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-[#ffb15f]">
                  Service focus
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-500">
                  {selectedService.advisory}
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="section-shell bg-white pb-16 sm:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-4xl"
          >
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[var(--accent)]">
              Service FAQs
            </p>
            <h3 className="mt-4 font-display text-[1.45rem] font-semibold leading-[1.04] tracking-[-0.03em] text-slate-950 sm:text-[1.8rem]">
              Answers that help customers understand how NINO handles the service.
            </h3>
          </motion.div>

          <div className="mt-8 space-y-3">
            {selectedService.faqs.map((faq, index) => {
              const isOpen = openFaq === index;

              return (
                <motion.div
                  key={faq.question}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.22 }}
                  transition={{ duration: 0.42, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-[1.4rem] border border-slate-200 bg-white px-5 py-3 shadow-[0_14px_36px_rgba(15,23,42,0.04)]"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-6 py-2 text-left"
                  >
                    <span className={`text-[0.98rem] font-semibold transition-colors duration-300 ${isOpen ? "text-[var(--accent)]" : "text-slate-800"}`}>
                      {faq.question}
                    </span>
                    <span className="text-lg font-medium text-[var(--accent)]">{isOpen ? "−" : "+"}</span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.div
                        initial={{ opacity: 0, height: 0, y: -6 }}
                        animate={{ opacity: 1, height: "auto", y: 0 }}
                        exit={{ opacity: 0, height: 0, y: -6 }}
                        transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="pb-3 pt-1 text-[0.96rem] leading-8 text-slate-600">{faq.answer}</p>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </section>
      </section>

      <AnimatePresence>
        {selectedPart ? (
          <motion.div
            className="fixed inset-0 z-[95] flex items-end justify-center bg-[rgba(10,14,22,0.55)] px-4 pb-4 pt-20 backdrop-blur-sm sm:items-center sm:px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.98 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-2xl rounded-[2rem] bg-white p-6 shadow-[0_28px_80px_rgba(15,23,42,0.18)] sm:p-8"
            >
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">
                    Service part detail
                  </p>
                  <h3 className="mt-4 font-display text-[1.7rem] font-semibold tracking-[-0.04em] text-slate-950 sm:text-[2rem]">
                    {selectedPart.name}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedPart(null)}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 text-slate-600 transition-colors duration-300 hover:border-[var(--accent)] hover:text-[var(--accent)]"
                >
                  ×
                </button>
              </div>

              <p className="mt-6 text-base leading-8 text-slate-600">{selectedPart.info}</p>
              <div className="mt-6 rounded-[1.5rem] border border-[var(--accent)]/14 bg-[var(--accent)]/6 p-5">
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">
                  Where it fits
                </p>
                <p className="mt-3 text-sm leading-7 text-slate-700">{selectedPart.fit}</p>
              </div>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href={`/booking?service=${selectedService.slug}&part=${encodeURIComponent(selectedPart.name)}&id=${selectedService.code}`}
                  className="inline-flex w-full items-center justify-center rounded-full bg-[var(--accent)] px-5 py-3 text-[0.74rem] font-semibold uppercase tracking-[0.22em] text-black transition-transform duration-300 hover:-translate-y-0.5 sm:w-auto"
                >
                  Book This Service
                </Link>
                <Link
                  href={trackingHref}
                  className="inline-flex w-full items-center justify-center rounded-full border border-slate-200 px-5 py-3 text-[0.74rem] font-semibold uppercase tracking-[0.22em] text-slate-700 transition-colors duration-300 hover:border-[var(--accent)] hover:text-[var(--accent)] sm:w-auto"
                >
                  Track By ID
                </Link>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </main>
  );
}