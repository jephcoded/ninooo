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
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
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

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header className="absolute left-0 top-0 z-50 w-full px-4 pt-4">

      {isHomePage ? (
        <InfoTicker tone="dark" compact className="mb-2" />
      ) : null}

      <div className="mx-auto max-w-[1320px]">

        {/* MAIN NAVBAR */}
        <div className="flex items-center justify-between rounded-[1.4rem] border border-white/10 bg-[#081120]/88 px-5 py-2.5 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.18)]">

          {/* LEFT */}
          <Link href="/" className="flex items-center gap-3">

            {/* LOGO */}
            <span className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-white">

              <Image
                src="/images/nino-logo.jfif"
                alt="Nino logo"
                fill
                sizes="44px"
                className="object-cover scale-[1.15]"
              />

            </span>

            {/* BRAND */}
            <span className="font-display text-[1.3rem] font-semibold tracking-[0.18em] text-white">
              NINO
            </span>

          </Link>

          {/* CENTER NAV */}
          <nav className="hidden items-center gap-2 lg:flex">

            {navItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-[0.62rem] text-[10px] font-semibold uppercase tracking-[0.2em] transition-all duration-300 ${
                    isActive
                      ? "border-[#ff7a18] bg-[#ff7a18] text-black shadow-[0_6px_18px_rgba(249,115,22,0.25)]"
                      : "border-white/10 bg-white/[0.03] text-white hover:border-[#ff7a18] hover:text-[#ff7a18]"
                  }`}
                >

                  {item.icon === "cart" ? (
                    <span className="relative inline-flex items-center">

                      <CartIcon />

                      {cartCount > 0 ? (
                        <span className="absolute -right-2 -top-2 inline-flex min-w-5 items-center justify-center rounded-full bg-[#ff7a18] px-1.5 py-0.5 text-[9px] font-bold text-black">
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

          {/* RIGHT CTA */}
          <div className="flex items-center gap-2">

            <Link
              href="/booking"
              className="hidden rounded-full bg-[#ff7a18] px-6 py-2.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-black transition-all duration-300 hover:bg-white hover:text-[#ff7a18] lg:inline-flex"
            >
              Book Inspection
            </Link>

            {/* MOBILE BUTTON */}
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setIsOpen((open) => !open)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white lg:hidden"
            >

              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                {isOpen ? (
                  <path
                    d="M6 6l12 12M18 6 6 18"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                ) : (
                  <path
                    d="M4 7h16M4 12h16M4 17h16"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                )}
              </svg>

            </button>

          </div>

        </div>

        {/* MOBILE MENU */}
        <AnimatePresence>

          {isOpen ? (
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="mt-3 overflow-hidden rounded-[1.4rem] border border-white/10 bg-[#081120]/95 p-4 backdrop-blur-2xl lg:hidden"
            >

              <nav className="flex flex-col gap-2">

                {navItems.map((item) => {
                  const isActive = pathname === item.href;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300 ${
                        isActive
                          ? "bg-[#ff7a18] text-black"
                          : "bg-white/[0.03] text-white hover:bg-white/[0.06]"
                      }`}
                    >

                      <span>{item.label}</span>

                      {item.icon === "cart" && cartCount > 0 ? (
                        <span className="rounded-full bg-[#ff7a18] px-2 py-0.5 text-[11px] font-bold text-black">
                          {cartCount}
                        </span>
                      ) : null}

                    </Link>
                  );
                })}

                <Link
                  href="/booking"
                  className="mt-2 inline-flex items-center justify-center rounded-full bg-[#ff7a18] px-5 py-3 text-sm font-semibold text-black"
                >
                  Book Inspection
                </Link>

              </nav>

            </motion.div>
          ) : null}

        </AnimatePresence>

      </div>
    </header>
  );
}

