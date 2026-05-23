import { CONTACT_EMAILS, CONTACT_PHONE_LOCAL, CONTACT_TEL, CONTACT_WHATSAPP } from "@/lib/site-contact";

const quickLinks = [
  { label: "Home", href: "/", icon: "spark" },
  { label: "Services", href: "/service", icon: "wrench" },
  { label: "Booking", href: "/booking", icon: "calendar" },
  { label: "Track Repair", href: "/track-repair", icon: "pulse" },
  { label: "Shop", href: "/shop", icon: "cart" },
  { label: "Blog", href: "/blog", icon: "note" },
  { label: "Admin", href: "/admin", icon: "shield" },
];

const socials = [
  { label: "Instagram", href: "https://instagram.com", icon: "instagram" },
  { label: "LinkedIn", href: "https://linkedin.com", icon: "linkedin" },
  { label: "Facebook", href: "https://facebook.com", icon: "facebook" },
];

function FooterIcon({ icon, className = "h-4 w-4" }: { icon: string; className?: string }) {
  if (icon === "wrench") {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 7.5a4.5 4.5 0 0 0 5.2 5.2l-8.7 8.7a2 2 0 0 1-2.8 0l-.4-.4a2 2 0 0 1 0-2.8l8.7-8.7A4.5 4.5 0 0 1 14 7.5Z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16 5l3 3" strokeLinecap="round" />
      </svg>
    );
  }

  if (icon === "calendar") {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="5" width="18" height="16" rx="3" />
        <path d="M8 3v4M16 3v4M3 10h18" strokeLinecap="round" />
      </svg>
    );
  }

  if (icon === "pulse") {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 12h4l2.2-4 3.6 8 2.4-4H21" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (icon === "cart") {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="9" cy="20" r="1.5" />
        <circle cx="18" cy="20" r="1.5" />
        <path d="M3 4h2l2.1 9.3a1 1 0 0 0 1 .7h8.8a1 1 0 0 0 1-.8L20 7H7.1" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (icon === "note") {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M7 3h7l5 5v13H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" strokeLinejoin="round" />
        <path d="M14 3v5h5M9 13h6M9 17h6" strokeLinecap="round" />
      </svg>
    );
  }

  if (icon === "shield") {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 3 5 6v5c0 5 3.4 8.8 7 10 3.6-1.2 7-5 7-10V6l-7-3Z" strokeLinejoin="round" />
      </svg>
    );
  }

  if (icon === "instagram") {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  if (icon === "linkedin") {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M7 10v8M7 6h.01M12 18v-4.5a2.5 2.5 0 0 1 5 0V18M12 10v8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (icon === "facebook") {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 8h2V4h-2a4 4 0 0 0-4 4v2H7v4h3v6h4v-6h3l1-4h-4V8a1 1 0 0 1 1-1Z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 4v16M4 12h16" strokeLinecap="round" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer id="footer" className="relative overflow-hidden bg-[#0f172a] py-12 text-white lg:py-14">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 top-auto h-full bg-[radial-gradient(circle_at_top_right,_rgba(249,115,22,0.16),transparent_26%),linear-gradient(180deg,#0f172a_0%,#0b1220_100%)]" />
      <div className="section-shell relative px-0">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1.8fr]">
          <div>
            <p className="text-[0.62rem] font-semibold uppercase tracking-[0.34em] text-[var(--accent-2)]">NINO Electronics Solutions</p>
            <h2 className="mt-4 max-w-lg font-display text-[1.7rem] font-semibold tracking-[-0.04em] text-white sm:text-[1.95rem]">
              Service, booking, repair tracking, electronics supply, and customer support in one platform.
            </h2>
            <p className="mt-4 max-w-lg text-[0.92rem] leading-7 text-slate-300">
              Built for customers and businesses who want fast access to electronics repairs, cleaner updates, and a more reliable path from diagnosis to delivery.
            </p>
            <p className="mt-8 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[var(--accent-2)]">
              Precision electronics support, clearer progress, and technical confidence from anywhere.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-400">Explore</p>
              <div className="mt-4 space-y-3">
                {quickLinks.slice(0, 4).map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="flex items-center gap-3 text-[0.9rem] text-slate-200 transition-colors duration-300 hover:text-[var(--accent-2)]"
                  >
                    <span className="inline-flex size-9 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-[var(--accent-2)]">
                      <FooterIcon icon={link.icon} />
                    </span>
                    <span>{link.label}</span>
                  </a>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-400">More</p>
              <div className="mt-4 space-y-3">
                {quickLinks.slice(4).map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="flex items-center gap-3 text-[0.9rem] text-slate-200 transition-colors duration-300 hover:text-[var(--accent-2)]"
                  >
                    <span className="inline-flex size-9 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-[var(--accent-2)]">
                      <FooterIcon icon={link.icon} />
                    </span>
                    <span>{link.label}</span>
                  </a>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-400">Contact</p>
              <div className="mt-4 space-y-3 text-[0.9rem] leading-6 text-slate-200 break-words">
                <p>Repair support by email, call, and WhatsApp.</p>
                {CONTACT_EMAILS.map((email) => (
                  <a key={email} href={`mailto:${email}`} className="block transition-colors duration-300 hover:text-[var(--accent-2)]">
                    {email}
                  </a>
                ))}
                <a href={CONTACT_TEL} className="block transition-colors duration-300 hover:text-[var(--accent-2)]">
                  {CONTACT_PHONE_LOCAL}
                </a>
                <p>Mon - Sat / 7:30 AM - 8:30 PM</p>
              </div>
            </div>

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-400">Follow NINO</p>
              <div className="mt-4 space-y-3">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 text-[0.9rem] text-slate-200 transition-colors duration-300 hover:text-[var(--accent-2)]"
                  >
                    <span className="inline-flex size-9 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-[var(--accent-2)]">
                      <FooterIcon icon={social.icon} />
                    </span>
                    <span>{social.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="relative mt-10 flex flex-col gap-4 border-t border-white/8 pt-6 text-[0.88rem] text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>(c) 2026 NINO. All rights reserved.</p>
          <div className="flex flex-wrap gap-5">
            <a href="/about-us" className="transition-colors duration-300 hover:text-white">About</a>
            <a href={CONTACT_WHATSAPP} className="transition-colors duration-300 hover:text-white">WhatsApp Us</a>
            <a href="/booking" className="transition-colors duration-300 hover:text-white">Book a Call</a>
            <a href="/admin" className="transition-colors duration-300 hover:text-[var(--accent-2)]">Admin Portal</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
