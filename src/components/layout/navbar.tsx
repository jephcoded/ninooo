"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
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
      <path
        d="M3 4h2l2.1 9.3a1 1 0 0 0 1 .7h8.8a1 1 0 0 0 1-.8L20 7H7.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [cartCount, setCartCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const syncCartCount = () => setCartCount(getCartCount());
    const onScroll = () => setScrolled(window.scrollY > 40);

    syncCartCount();
    onScroll();

    window.addEventListener("storage", syncCartCount);
    window.addEventListener(SHOP_EVENT, syncCartCount);
    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("storage", syncCartCount);
      window.removeEventListener(SHOP_EVENT, syncCartCount);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header
      className={`left-0 top-0 z-50 w-full px-2 pt-2 transition-all duration-300 sm:px-3 lg:px-4 ${
        scrolled ? "fixed" : "absolute"
      }`}
    >
      {isHomePage ? <InfoTicker tone="dark" compact className="mb-3" /> : null}

      <div
        className={`section-shell flex items-center justify-between gap-3 transition-all duration-300 ${
          scrolled
            ? "rounded-[2rem] border border-[#1e293b] bg-[#0f172a]/96 px-3 py-3 shadow-[0_16px_45px_rgba(15,23,42,0.28)] backdrop-blur-xl lg:px-5"
            : "rounded-[2rem] border border-white/10 bg-[#0b1120]/70 px-3 py-3 backdrop-blur-md lg:px-5"
        }`}
      >
        <Link href="/" className="flex items-center gap-3">
          <span className="relative flex size-11 items-center justify-center overflow-hidden rounded-full border border-[var(--accent)]/30 bg-white shadow-[0_10px_24px_rgba(249,115,22,0.16)]">
            <Image
              src="/images/nino-logo.jfif"
              alt="Nino logo"
              fill
              sizes="44px"
              className="object-cover object-[35%_45%] scale-[1.2]"
            />
          </span>
          <span className="font-display text-lg font-bold tracking-[0.18em] text-white">NINO</span>
        </Link>

        <nav className="hidden items-center gap-2 lg:flex">
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold uppercase tracking-[0.18em] transition-colors duration-200 ${
                  isActive
                    ? "border-[var(--accent)] bg-[var(--accent)] text-black"
                    : "border-[#22304a] bg-[#19233a] text-white hover:text-[var(--accent)]"
                }`}
              >
                {item.icon === "cart" ? (
                  <span className="relative inline-flex items-center">
                    <CartIcon />
                    {cartCount > 0 ? (
                      <span className="absolute -right-2 -top-2 inline-flex min-w-5 items-center justify-center rounded-full bg-[var(--accent)] px-1.5 py-0.5 text-[9px] font-bold tracking-normal text-black">
                        {cartCount}
                      </span>
                    ) : null}
                  </span>
                ) : null}
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/booking"
            className="hidden items-center justify-center rounded-full bg-[var(--accent)] px-6 py-2.5 text-sm font-semibold uppercase tracking-[0.18em] text-black shadow-[0_10px_24px_rgba(249,115,22,0.16)] transition-colors duration-200 hover:bg-white hover:text-[var(--accent)] lg:inline-flex"
          >
            Book Inspection
          </Link>

          <button
            type="button"
            aria-expanded={isOpen}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsOpen((open) => !open)}
            className="inline-flex size-11 items-center justify-center rounded-full border border-[#22304a] bg-[#19233a] text-white transition-colors duration-200 hover:border-[var(--accent)] lg:hidden"
          >
            <span className="sr-only">{isOpen ? "Close menu" : "Open menu"}</span>
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
              {isOpen ? (
                <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" strokeLinejoin="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" strokeLinejoin="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-3 overflow-hidden rounded-[1.75rem] border border-[#1e293b] bg-[#0f172a] backdrop-blur-2xl lg:hidden"
          >
            <div className="section-shell flex flex-col gap-3 py-4">
              <div className="rounded-[1.4rem] border border-white/12 bg-[#162038] p-2">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`mb-2 block rounded-2xl border px-4 py-3 text-sm uppercase tracking-[0.18em] last:mb-0 ${
                        isActive
                          ? "border-[var(--accent)] bg-[var(--accent)] text-black"
                          : "border-white/10 bg-white/5 text-slate-200"
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
                    </Link>
                  );
                })}
              </div>

              <Link
                href="/booking"
                className="inline-flex items-center justify-center rounded-2xl bg-[var(--accent)] px-4 py-3 text-sm font-semibold text-black"
              >
                Book Inspection
              </Link>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
