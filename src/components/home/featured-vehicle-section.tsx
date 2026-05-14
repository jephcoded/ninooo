import Image from "next/image";
import { Reveal } from "@/components/animations/reveal";
import { engineeringMetrics } from "@/components/home/data";
import { SectionHeading } from "@/components/home/section-heading";

export function FeaturedVehicleSection() {
  return (
    <section id="featured-vehicle" className="section-shell py-16 lg:py-20">
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Reveal className="panel min-h-[32rem] overflow-hidden p-6 sm:p-8">
          <div className="absolute inset-0">
            <Image src="/automotive/featured-truck.svg" alt="Featured converted luxury truck" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 55vw" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_20%,rgba(255,122,24,0.18),transparent_20%),linear-gradient(180deg,rgba(6,10,16,0),rgba(6,10,16,0.72))]" />
          </div>
          <div className="absolute right-6 top-6 glass-panel rounded-[1.4rem] px-4 py-3">
            <p className="text-[10px] uppercase tracking-[0.24em] text-slate-400">Featured platform</p>
            <p className="mt-2 font-display text-lg text-white">Performance Fleet Truck</p>
          </div>
          <div className="absolute bottom-6 left-6 grid gap-3 sm:max-w-[18rem]">
            <div className="hud-card rounded-[1.25rem] px-4 py-3">
              <p className="text-[10px] uppercase tracking-[0.24em] text-slate-400">Range profile</p>
              <p className="mt-2 font-display text-xl text-white">Fleet-grade CNG architecture</p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08} className="space-y-6">
          <SectionHeading
            eyebrow="Featured Vehicle"
            title="A cinematic showcase built around conversion engineering, diagnostics depth, and fleet-grade confidence."
            description="This section frames the brand like a premium automotive technology company, using dashboard-style cards and layered vehicle presentation instead of SaaS panels."
          />

          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {engineeringMetrics.map((metric) => (
              <div key={metric.label} className="glass-panel rounded-[1.6rem] p-5">
                <p className="text-[11px] uppercase tracking-[0.24em] text-slate-400">{metric.label}</p>
                <p className="mt-3 font-display text-3xl tracking-[-0.05em] text-white">{metric.value}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}