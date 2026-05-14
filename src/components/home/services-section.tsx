import Image from "next/image";
import { Reveal } from "@/components/animations/reveal";
import { services } from "@/components/home/data";
import { SectionHeading } from "@/components/home/section-heading";

export function ServicesSection() {
  return (
    <section id="services" className="section-shell py-16 lg:py-20">
      <Reveal>
        <div className="max-w-3xl space-y-4">
          <p className="eyebrow">Automotive Services</p>
          <h2 className="font-display text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl lg:text-5xl">
            Aggressive engineering services for modern vehicles, trucks, and fleet systems.
          </h2>
          <p className="text-base leading-8 text-slate-600 sm:text-lg">
            Every card is tuned to feel like performance technology rather than a generic workshop menu.
          </p>
        </div>
      </Reveal>

      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {services.map((service, index) => (
          <Reveal key={service.title} delay={index * 0.05} className="group h-full">
            <article className="panel h-full overflow-hidden rounded-[1.8rem] p-3 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-[var(--accent)]/30 group-hover:shadow-[0_24px_80px_rgba(255,122,24,0.12)]">
              <div className="absolute inset-x-0 top-0 h-px orange-line opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="relative aspect-[5/4] overflow-hidden rounded-[1.2rem]">
                <Image src={service.image ?? "/automotive/diagnostics-lab.svg"} alt={service.title} fill className="object-cover transition-transform duration-700 group-hover:scale-[1.04]" sizes="(max-width: 768px) 100vw, 25vw" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_14%,rgba(4,6,10,0.18)_42%,rgba(4,6,10,0.92)_100%)]" />
                <div className="absolute left-4 top-4 glass-panel inline-flex rounded-2xl p-3 text-[var(--accent-2)]">
                  {service.icon}
                </div>
              </div>
              <div className="px-3 pb-3 pt-5">
              <h3 className="font-display text-xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-2xl">
                {service.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{service.description}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}