export default function AboutUsPage() {
  return (
    <main className="section-shell flex min-h-[calc(100vh-10rem)] items-center py-24">
      <div className="max-w-3xl space-y-6">
        <span className="inline-flex rounded-full border border-[var(--accent)]/25 bg-[var(--accent)]/10 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--accent-2)]">
          About Us
        </span>
        <h1 className="font-display text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
          Built around precision service, trusted workmanship, and modern electronics care.
        </h1>
        <p className="max-w-2xl text-base leading-8 text-slate-300">
          NINO brings together diagnostics discipline, electronics repair experience, and engineering-led thinking to help customers and businesses keep their devices, modules, and control units performing at the level they expect.
        </p>
        <p className="max-w-2xl text-base leading-8 text-slate-400">
          The focus is simple: honest assessment, careful execution, and service standards that respect your time, your investment, and the demands of everyday use.
        </p>
      </div>
    </main>
  );
}