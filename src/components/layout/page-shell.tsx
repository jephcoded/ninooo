import { AmbientParticles } from "@/components/ui/ambient-particles";
import { CustomCursorGlow } from "@/components/ui/custom-cursor-glow";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { SiteEntryModal } from "@/components/ui/site-entry-modal";
import { CONTACT_TEL, CONTACT_WHATSAPP } from "@/lib/site-contact";

type PageShellProps = {
  children: React.ReactNode;
};

export function PageShell({ children }: PageShellProps) {
  return (
    <div id="top" className="relative flex min-h-screen flex-col overflow-x-clip">
      <AmbientParticles />
      <CustomCursorGlow />
      <SiteEntryModal />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(255,122,24,0.14),transparent_24%),radial-gradient(circle_at_22%_18%,_rgba(43,74,132,0.18),transparent_26%),linear-gradient(180deg,#05070c_0%,#05070c_28%,#04060a_100%)]" />
      <Navbar />
      {children}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3 sm:bottom-6 sm:right-6">
        <a
          href={CONTACT_TEL}
          aria-label="Call Nino Electronics"
          className="group flex size-13 items-center justify-center rounded-full border border-white/10 bg-[rgba(10,12,18,0.78)] text-white shadow-[0_18px_40px_rgba(0,0,0,0.32)] backdrop-blur-2xl transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--accent)]/60 hover:text-[var(--accent-2)]"
        >
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.77.63 2.61a2 2 0 0 1-.45 2.11L8 9.91a16 16 0 0 0 6.09 6.09l1.47-1.29a2 2 0 0 1 2.11-.45c.84.3 1.71.51 2.61.63A2 2 0 0 1 22 16.92z" />
          </svg>
        </a>
        <a
          href={CONTACT_WHATSAPP}
          target="_blank"
          rel="noreferrer"
          aria-label="WhatsApp Nino Electronics"
          className="group flex size-13 items-center justify-center rounded-full border border-[#25D366]/25 bg-[rgba(10,12,18,0.78)] text-[#25D366] shadow-[0_18px_40px_rgba(0,0,0,0.32)] backdrop-blur-2xl transition-all duration-300 hover:-translate-y-0.5 hover:border-[#25D366]/70 hover:bg-[#25D366]/10"
        >
          <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" aria-hidden="true">
            <path d="M19.05 4.94A9.94 9.94 0 0 0 12.02 2C6.5 2 2 6.48 2 11.99c0 1.76.46 3.48 1.33 5L2 22l5.13-1.34a10 10 0 0 0 4.88 1.25h.01c5.52 0 10-4.49 10-10a9.9 9.9 0 0 0-2.97-6.97ZM12.02 20.2h-.01a8.3 8.3 0 0 1-4.23-1.16l-.3-.18-3.05.8.81-2.97-.2-.31a8.22 8.22 0 0 1-1.27-4.39c0-4.58 3.73-8.31 8.32-8.31 2.22 0 4.31.86 5.87 2.43a8.24 8.24 0 0 1 2.43 5.87c0 4.59-3.73 8.32-8.31 8.32Zm4.56-6.23c-.25-.13-1.5-.74-1.73-.82-.23-.08-.4-.13-.57.12-.17.25-.66.82-.81.99-.15.17-.29.19-.54.06-.25-.13-1.05-.39-2-1.24-.74-.66-1.24-1.47-1.39-1.72-.15-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.15.17-.25.25-.42.08-.17.04-.31-.02-.43-.06-.13-.57-1.38-.78-1.9-.21-.5-.42-.43-.57-.44h-.49c-.17 0-.43.06-.66.31s-.86.84-.86 2.04.88 2.36 1 2.52c.12.17 1.73 2.64 4.18 3.7.58.25 1.03.4 1.38.51.58.18 1.1.15 1.51.09.46-.07 1.5-.61 1.71-1.2.21-.59.21-1.09.15-1.2-.06-.11-.23-.17-.48-.3Z" />
          </svg>
        </a>
      </div>
      <Footer />
    </div>
  );
}