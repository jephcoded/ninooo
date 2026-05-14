"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { MagneticLink } from "@/components/ui/magnetic-link";
import { InfoTicker } from "@/components/ui/info-ticker";
import { getCartCount, SHOP_EVENT } from "@/lib/shop-storage";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Service", href: "/service" },
  { label: "Track Repair", href: "/track-repair" },
  { label: "Shop", href: "/shop", icon: "cart" },
  { label: "Blog", href: "/blog" },
];

function CartIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="9" cy="20" r="1.5" />
      <circle cx="18" cy="20" r="1.5" />
      <path d="M3 4h2l2.1 9.3a1 1 0 0 0 1 .7h8.8a1 1 0 0 0 1-.8L20 7H7.1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  useEffect(() => {
    const syncCartCount = () => setCartCount(getCartCount());

    syncCartCount();
    window.addEventListener("storage", syncCartCount);
    window.addEventListener(SHOP_EVENT, syncCartCount);

    return () => {
      window.removeEventListener("storage", syncCartCount);
      window.removeEventListener(SHOP_EVENT, syncCartCount);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 px-3 pt-3 sm:px-4 lg:px-6">
      {isHomePage ? <InfoTicker tone="dark" compact className="mb-3" /> : null}
      <div className="section-shell flex h-[4.15rem] items-center justify-between gap-4 rounded-full border border-white/10 bg-[rgba(6,8,12,0.56)] px-4 shadow-[0_16px_45px_rgba(0,0,0,0.22)] backdrop-blur-2xl lg:h-[4.5rem] lg:px-6">
        <a href="/" className="flex items-center gap-3">
          <span className="relative flex size-11 items-center justify-center overflow-hidden rounded-full border border-[var(--accent)]/20 bg-[rgba(255,255,255,0.02)] shadow-[0_10px_24px_rgba(255,122,24,0.12)]">
            <Image
              src="/images/nino-logo.jfif"
              alt="Nino logo"
              fill
              sizes="44px"
              className="object-cover"
            />
          </span>
          <p className="font-display text-base font-semibold uppercase tracking-[0.22em] text-white lg:text-[1rem]">
            NINO
          </p>
        </a>

        <nav className="hidden items-center gap-2 rounded-full border border-white/8 bg-white/[0.03] px-2 py-2 text-[11px] uppercase tracking-[0.22em] text-slate-300 lg:flex">
          {navItems.map((item) => (
            <MagneticLink
              key={item.label}
              href={item.href}
              className={`rounded-full px-4 py-2 transition-colors duration-300 ${
                pathname === item.href
                  ? "bg-white/[0.09] text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]"
                  : "hover:bg-white/[0.06] hover:text-white"
              }`}
            >
              <span className="inline-flex items-center gap-2">
                {item.icon === "cart" ? (
                  <span className="relative inline-flex items-center">
                    <CartIcon className="h-3.5 w-3.5" />
                    {cartCount > 0 ? (
                      <span className="absolute -right-2 -top-2 inline-flex min-w-5 items-center justify-center rounded-full bg-[var(--accent)] px-1.5 py-0.5 text-[9px] font-bold tracking-normal text-black">
                        {cartCount}
                      </span>
                    ) : null}
                  </span>
                ) : null}
                <span>{item.label}</span>
              </span>
            </MagneticLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <MagneticLink
            href="/booking"
            className="hidden items-center justify-center rounded-full border border-[var(--accent)]/20 bg-[var(--accent)] px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-black transition-transform duration-300 hover:-translate-y-0.5 lg:inline-flex"
          >
            Book Inspection
          </MagneticLink>

          <button
            type="button"
            aria-label="Toggle navigation"
            onClick={() => setIsOpen((value) => !value)}
            className="inline-flex size-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white lg:hidden"
          >
            <span className="flex flex-col gap-1.5">
              <span className="block h-0.5 w-5 bg-current" />
              <span className="block h-0.5 w-5 bg-current" />
              <span className="block h-0.5 w-5 bg-current" />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-3 overflow-hidden rounded-[1.75rem] border border-white/8 bg-slate-950/92 backdrop-blur-2xl lg:hidden"
          >
            <div className="section-shell flex flex-col gap-3 py-4">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`rounded-2xl border px-4 py-3 text-sm uppercase tracking-[0.18em] ${
                    pathname === item.href
                      ? "border-[var(--accent)]/35 bg-[var(--accent)]/10 text-white"
                      : "border-white/8 bg-white/5 text-slate-200"
                  }`}
                >
                  <span className="inline-flex items-center gap-2">
                    {item.icon === "cart" ? (
                      <span className="relative inline-flex items-center">
                        <CartIcon className="h-4 w-4" />
                        {cartCount > 0 ? (
                          <span className="absolute -right-2 -top-2 inline-flex min-w-5 items-center justify-center rounded-full bg-[var(--accent)] px-1.5 py-0.5 text-[9px] font-bold tracking-normal text-black">
                            {cartCount}
                          </span>
                        ) : null}
                      </span>
                    ) : null}
                    <span>{item.label}</span>
                  </span>
                </a>
              ))}
              <a
                href="/booking"
                onClick={() => setIsOpen(false)}
                className="inline-flex items-center justify-center rounded-2xl bg-[var(--accent)] px-4 py-3 text-sm font-semibold text-black"
              >
                Book Inspection
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
