import { CONTACT_EMAILS, CONTACT_PHONE_LOCAL, CONTACT_TEL, CONTACT_WHATSAPP, PRIMARY_CONTACT_EMAIL } from "@/lib/site-contact";

export default function ContactPage() {
  return (
    <main className="section-shell py-18 sm:py-22 lg:py-24">
      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <div className="space-y-6">
          <span className="inline-flex rounded-full border border-[var(--accent)]/25 bg-[var(--accent)]/10 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--accent-2)]">
            Contact
          </span>
          <h1 className="font-display text-[2.2rem] font-semibold tracking-[-0.04em] text-white sm:text-[3rem] lg:text-[3.5rem]">
            Reach the team for bookings, inspections, repair updates, and service enquiries.
          </h1>
          <p className="max-w-2xl text-base leading-8 text-slate-300">
            Use the contact details below for bookings, support questions, repair follow-up, and electronics service coordination. The layout stays compact on mobile so customers can tap the right action quickly.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <a href={CONTACT_TEL} className="inline-flex items-center justify-center rounded-full bg-[var(--accent)] px-5 py-3 text-[0.76rem] font-semibold uppercase tracking-[0.22em] text-black">
              Call {CONTACT_PHONE_LOCAL}
            </a>
            <a href={CONTACT_WHATSAPP} target="_blank" rel="noreferrer" className="glass-panel inline-flex items-center justify-center rounded-full px-5 py-3 text-[0.76rem] font-semibold uppercase tracking-[0.22em] text-white">
              Open WhatsApp
            </a>
            <a href={`mailto:${PRIMARY_CONTACT_EMAIL}`} className="inline-flex items-center justify-center rounded-full border border-white/12 px-5 py-3 text-[0.76rem] font-semibold uppercase tracking-[0.22em] text-white">
              Email Primary Contact
            </a>
          </div>
        </div>

        <div className="panel rounded-[2rem] p-6 sm:p-8">
          <div className="grid gap-4 sm:grid-cols-2">
            {CONTACT_EMAILS.map((email, index) => (
              <a
                key={email}
                href={`mailto:${email}`}
                className="rounded-[1.45rem] border border-white/10 bg-white/[0.04] p-5 text-slate-200 transition-colors duration-300 hover:border-[var(--accent)]/35"
              >
                <p className="text-[0.64rem] font-semibold uppercase tracking-[0.22em] text-[var(--accent-2)]">
                  {index === 0 ? "Primary email" : "Support email"}
                </p>
                <p className="mt-3 break-all text-sm leading-7 sm:text-[0.95rem]">{email}</p>
              </a>
            ))}
            <a href={CONTACT_TEL} className="rounded-[1.45rem] border border-white/10 bg-white/[0.04] p-5 text-slate-200 transition-colors duration-300 hover:border-[var(--accent)]/35">
              <p className="text-[0.64rem] font-semibold uppercase tracking-[0.22em] text-[var(--accent-2)]">Phone</p>
              <p className="mt-3 text-sm leading-7 sm:text-[0.95rem]">{CONTACT_PHONE_LOCAL}</p>
            </a>
            <a href={CONTACT_WHATSAPP} target="_blank" rel="noreferrer" className="rounded-[1.45rem] border border-white/10 bg-white/[0.04] p-5 text-slate-200 transition-colors duration-300 hover:border-[var(--accent)]/35">
              <p className="text-[0.64rem] font-semibold uppercase tracking-[0.22em] text-[var(--accent-2)]">WhatsApp</p>
              <p className="mt-3 text-sm leading-7 sm:text-[0.95rem]">Fast mobile support and repair follow-up.</p>
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}