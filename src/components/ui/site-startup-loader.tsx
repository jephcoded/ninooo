"use client";

import { useEffect, useState } from "react";
import { CircuitLoader } from "@/components/ui/circuit-loader";

export function SiteStartupLoader() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsVisible(false);
    }, 1400);

    return () => window.clearTimeout(timer);
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[100] flex min-h-screen items-center justify-center overflow-hidden bg-black px-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.14),transparent_18%),radial-gradient(circle_at_28%_20%,rgba(249,115,22,0.08),transparent_24%)]" />
      <div className="relative flex w-full max-w-md flex-col items-center text-center">
        <CircuitLoader compact />
        <p className="mt-8 text-sm font-semibold uppercase tracking-[0.28em] text-[var(--accent-2)]">Loading.....</p>
      </div>
    </div>
  );
}
