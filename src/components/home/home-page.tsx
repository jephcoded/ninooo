import { HeroSection } from "@/components/home/hero-section";
import { HomeFocusSections } from "@/components/home/home-focus-sections";

export function HomePage() {
  return (
    <main className="flex-1">
      <HeroSection />
      <div className="bg-white text-slate-950">
        <HomeFocusSections />
      </div>
    </main>
  );
}
