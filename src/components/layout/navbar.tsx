"use client";

import Image from "next/image";
import Link from "next/link";
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
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  useEffect(() => {
    const syncCartCount = () => setCartCount(getCartCount());
    syncCartCount();
    window.addEventListener("storage", syncCartCount);
    window.addEventListener(SHOP_EVENT, syncCartCount);
    // Scroll event for navbar style
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("storage", syncCartCount);
      window.removeEventListener(SHOP_EVENT, syncCartCount);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <header className={`top-0 left-0 w-full z-50 px-2 pt-2 sm:px-3 lg:px-4 transition-all duration-300 ${scrolled ? 'fixed bg-[#0f172a] shadow-[0_16px_45px_rgba(15,23,42,0.2)]' : 'static bg-transparent'}`}>
      {isHomePage ? <InfoTicker tone="dark" compact className="mb-3" /> : null}
      <div className={`section-shell flex h-[4.25rem] items-center justify-between gap-3 transition-all duration-300 ${scrolled ? 'rounded-[2rem] border border-[#1e293b] bg-[#0f172a] px-3 lg:h-[4.8rem] lg:px-5' : 'bg-transparent border-none rounded-none shadow-none'}`}>
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
        <nav className={`flex items-center gap-6 ${scrolled ? '' : 'bg-transparent border-none shadow-none'}`}>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`inline-flex items-center gap-2 px-2 py-2 text-sm font-semibold uppercase tracking-[0.18em] text-white hover:text-[var(--accent)] transition-colors duration-200 ${scrolled ? 'rounded-full px-4 bg-[#19233a] border border-[#22304a]' : ''}`}
            >
              {item.icon === "cart" ? <CartIcon /> : null}
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/booking"
          className={`inline-flex items-center justify-center rounded-full bg-[var(--accent)] px-6 py-2.5 text-sm font-semibold uppercase tracking-[0.18em] text-black shadow-[0_10px_24px_rgba(249,115,22,0.16)] hover:bg-white hover:text-[var(--accent)] transition-colors duration-200 ${scrolled ? '' : 'border-none shadow-none'}`}
        >
          Book Inspection
        </Link>
      </div>
    </header>
  );
}

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
                {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`mb-2 block rounded-2xl border px-4 py-3 text-sm uppercase tracking-[0.18em] last:mb-0 ${
                    pathname === item.href
                      ? "border-[var(--accent)] bg-[var(--accent)] text-white"
                      : "border-white/10 bg-white/5 text-slate-200"
                  }`}
                >
                  <span className="inline-flex items-center gap-2">
                    {item.icon === "cart" ? (
                      <span className="relative inline-flex items-center">
                        <CartIcon className="h-4 w-4" />
                        {cartCount > 0 ? (
                          <span className="absolute -right-2 -top-2 inline-flex min-w-5 items-center justify-center rounded-full bg-[var(--accent)] px-1.5 py-0.5 text-[9px] font-bold tracking-normal text-white">
                            {cartCount}
                          </span>
                        ) : null}
                      </span>
                    ) : null}
                    <span>{item.label}</span>
                  </span>
                </a>
                ))}
              </div>
              <a
                href="/booking"
                onClick={() => setIsOpen(false)}
                className="inline-flex items-center justify-center rounded-2xl bg-[var(--accent)] px-4 py-3 text-sm font-semibold text-white"
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
