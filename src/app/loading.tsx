export default function Loading() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,122,24,0.12),transparent_22%),radial-gradient(circle_at_28%_20%,rgba(48,84,148,0.12),transparent_28%)]" />
      <div className="relative flex w-full max-w-md flex-col items-center text-center">
        <div className="relative flex h-56 w-56 items-center justify-center rounded-full border border-white/10">
          <div className="absolute h-40 w-40 rounded-full border border-dashed border-white/12" />
          <div className="absolute h-56 w-56 animate-[spin_3.2s_linear_infinite]">
            <div className="absolute left-1/2 top-0 -ml-6 flex h-12 w-12 items-center justify-center rounded-full bg-[linear-gradient(180deg,var(--accent),var(--accent-2))] text-black shadow-[0_12px_30px_rgba(255,122,24,0.32)]">
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 16l1.4-4.2A2 2 0 0 1 8.3 10.5h7.4a2 2 0 0 1 1.9 1.3L19 16" />
                <path d="M4 16h16" />
                <path d="M7 16v2a1 1 0 0 0 1 1h1" />
                <path d="M17 16v2a1 1 0 0 1-1 1h-1" />
                <circle cx="8.5" cy="16.5" r="1.3" fill="currentColor" stroke="none" />
                <circle cx="15.5" cy="16.5" r="1.3" fill="currentColor" stroke="none" />
              </svg>
            </div>
          </div>
          <div className="absolute h-24 w-24 rounded-full bg-[radial-gradient(circle,rgba(255,122,24,0.28),transparent_72%)] blur-2xl" />
        </div>
        <p className="mt-8 text-[0.68rem] font-semibold uppercase tracking-[0.34em] text-[var(--accent-2)]">
          NINO Automotive
        </p>
        <p className="mt-4 text-sm leading-7 text-slate-300">
          Preparing diagnostics, bookings, tracking, and premium workshop access.
        </p>
        <div className="mt-6 h-1.5 w-full max-w-xs overflow-hidden rounded-full bg-white/8">
          <div className="h-full w-full origin-left animate-[loadingBar_1.4s_ease-in-out_infinite] rounded-full bg-[linear-gradient(90deg,var(--accent),var(--accent-2))]" />
        </div>
      </div>
    </div>
  );
}