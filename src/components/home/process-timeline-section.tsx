import { Reveal } from "@/components/animations/reveal";
import { processSteps } from "@/components/home/data";

export function ProcessTimelineSection() {
  return (
    <section id="process" className="section-shell py-16 lg:py-20">
      <Reveal>
        <div className="max-w-3xl space-y-4">
          <p className="eyebrow">Process Timeline</p>
          <h2 className="font-display text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl lg:text-5xl">
            A futuristic workflow from intake to delivery.
          </h2>
          <p className="text-base leading-8 text-slate-600 sm:text-lg">
            The timeline is structured like an engineering dashboard rather than a generic brochure section.
          </p>
        </div>
      </Reveal>

      <div className="mt-10 grid gap-5 lg:grid-cols-5">
        {processSteps.map((step, index) => (
          <Reveal key={step.title} delay={index * 0.07} className="relative h-full">
            <div className="panel h-full rounded-[1.8rem] p-6">
              <div className="inline-flex size-12 items-center justify-center rounded-2xl bg-[var(--accent)] font-display text-lg font-semibold text-black">
                {index + 1}
              </div>
              <h3 className="mt-5 font-display text-2xl text-slate-950">{step.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{step.description}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}