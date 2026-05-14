import { Reveal } from "@/components/animations/reveal";
import { processSteps, reasons, trustIndicators } from "@/components/home/data";

export function WhyChooseSection() {
  return (
    <section id="why-nino" className="section-shell py-16 lg:py-20">
      <div className="grid gap-6 lg:grid-cols-[0.88fr_1.12fr]">
        <Reveal className="panel p-8 sm:p-10">
          <div className="max-w-3xl space-y-4">
            <p className="eyebrow">Why Choose Us</p>
            <h2 className="font-display text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl lg:text-5xl">
              Luxury workshop perception with the systems discipline of an automotive engineering lab.
            </h2>
            <p className="text-base leading-8 text-slate-600 sm:text-lg">
              From trust indicators to process visibility, every block is designed to feel technically serious and visually expensive.
            </p>
          </div>

          <div className="mt-8 space-y-3">
            {trustIndicators.map((item) => (
              <div key={item} className="glass-panel rounded-[1.4rem] px-4 py-3 text-sm text-slate-700">
                {item}
              </div>
            ))}
          </div>
        </Reveal>

        <div className="grid gap-5">
          <div className="grid gap-5 md:grid-cols-3">
          {reasons.map((reason, index) => (
            <Reveal key={reason.title} delay={index * 0.07} className="glass-panel rounded-[1.8rem] p-5">
                <div className="inline-flex rounded-2xl bg-[var(--accent)]/12 p-3 text-[var(--accent-2)]">
                  {reason.icon}
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold text-slate-950">{reason.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{reason.description}</p>
            </Reveal>
          ))}
          </div>

          <Reveal delay={0.16} className="panel rounded-[1.8rem] p-6">
            <p className="text-[11px] uppercase tracking-[0.28em] text-[var(--accent-2)]">Engineering process snapshot</p>
            <div className="mt-6 grid gap-4 md:grid-cols-5">
              {processSteps.map((step, index) => (
                <div key={step.title} className="relative rounded-[1.4rem] border border-slate-200 bg-slate-50 p-4">
                  <span className="font-display text-2xl text-slate-950">0{index + 1}</span>
                  <p className="mt-3 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">{step.title}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}