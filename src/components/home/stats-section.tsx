import { Reveal } from "@/components/animations/reveal";
import { CountUp } from "@/components/home/count-up";
import { stats } from "@/components/home/data";

export function StatsSection() {
  return (
    <section id="stats" className="section-shell py-10 lg:py-14">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item, index) => (
          <Reveal key={item.label} delay={index * 0.07} className="panel orange-glow rounded-[1.8rem] p-6">
            <p className="text-[11px] uppercase tracking-[0.28em] text-slate-400">Performance stat</p>
            <div className="mt-5 flex items-end gap-1">
              <CountUp value={item.value} suffix={item.suffix} />
            </div>
            <p className="mt-3 text-sm leading-7 text-slate-300">{item.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}