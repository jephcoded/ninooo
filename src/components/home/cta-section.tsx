import { Reveal } from "@/components/animations/reveal";
import { CONTACT_MAILTO, CONTACT_WHATSAPP } from "@/lib/site-contact";

export function CtaSection() {
  return (
    <section id="cta" className="section-shell py-16 lg:py-20">
      <Reveal className="panel overflow-hidden rounded-[2rem] p-8 sm:p-10 lg:p-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,122,24,0.22),transparent_18%),radial-gradient(circle_at_80%_20%,rgba(18,44,94,0.28),transparent_22%),linear-gradient(115deg,rgba(255,255,255,0.06),transparent_28%,rgba(255,122,24,0.08))]" />
        <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl space-y-4">
            <p className="eyebrow">Book Your Vehicle</p>
            <h2 className="font-display text-3xl font-semibold uppercase tracking-[-0.05em] text-white sm:text-4xl lg:text-5xl">
              Move your vehicle into a premium diagnostics and conversion workflow.
            </h2>
            <p className="text-base leading-8 text-slate-300 sm:text-lg">
              Talk to the team about passenger cars, performance builds, fleet vehicles, CNG conversion, or complex electronics faults.
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <a
              href={CONTACT_MAILTO}
              className="inline-flex items-center justify-center rounded-full bg-[var(--accent)] px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.18em] text-black"
            >
              Book Inspection
            </a>
            <a
              href={CONTACT_WHATSAPP}
              className="glass-panel inline-flex items-center justify-center rounded-full px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.18em] text-white"
            >
              WhatsApp CTA
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}