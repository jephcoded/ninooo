import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { SiteEntryModal } from "@/components/ui/site-entry-modal";
import { SiteStartupLoader } from "@/components/ui/site-startup-loader";
import { CONTACT_WHATSAPP } from "@/lib/site-contact";

type PageShellProps = {
  children: React.ReactNode;
};

export function PageShell({ children }: PageShellProps) {
  return (
    <div id="top" className="relative flex min-h-screen flex-col overflow-x-clip">
      <SiteStartupLoader />
      <Navbar />
      <div className="flex-1">
        {children}
      </div>
      <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-3">
        <a
          href={CONTACT_WHATSAPP}
          target="_blank"
          rel="noreferrer"
          aria-label="Chat on WhatsApp"
          className="inline-flex size-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_18px_40px_rgba(37,211,102,0.3)] transition-transform duration-300 hover:-translate-y-0.5"
        >
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
            <path d="M19.05 4.94A9.9 9.9 0 0 0 12.04 2a9.94 9.94 0 0 0-8.6 14.92L2 22l5.23-1.37a9.95 9.95 0 0 0 4.8 1.23h.01A9.96 9.96 0 0 0 22 11.93a9.87 9.87 0 0 0-2.95-6.99ZM12.04 20.2h-.01a8.3 8.3 0 0 1-4.23-1.15l-.3-.18-3.1.81.83-3.03-.2-.31a8.28 8.28 0 1 1 7.01 3.86Zm4.56-6.22c-.25-.12-1.47-.72-1.7-.8-.23-.08-.4-.12-.57.12-.16.25-.65.8-.79.96-.14.17-.28.19-.53.06-.25-.12-1.03-.38-1.96-1.21-.72-.64-1.21-1.43-1.35-1.67-.14-.24-.01-.37.11-.49.11-.11.25-.28.37-.42.12-.14.16-.24.25-.4.08-.17.04-.31-.02-.43-.06-.12-.57-1.38-.78-1.89-.21-.49-.42-.42-.57-.43h-.48c-.17 0-.43.06-.66.31-.23.24-.87.85-.87 2.06s.89 2.39 1.01 2.55c.12.17 1.75 2.68 4.23 3.75.59.26 1.06.41 1.42.52.6.19 1.14.16 1.57.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.14-1.18-.06-.1-.23-.17-.48-.29Z" />
          </svg>
        </a>
        <a
          href="#top"
          aria-label="Scroll to top"
          className="inline-flex size-12 items-center justify-center rounded-full bg-[#0f172a] text-white shadow-[0_18px_40px_rgba(15,23,42,0.24)] transition-transform duration-300 hover:-translate-y-0.5"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="m6 14 6-6 6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
      <Footer />
      <SiteEntryModal />
    </div>
  );
}
