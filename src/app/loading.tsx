import { CircuitLoader } from "@/components/ui/circuit-loader";

export default function Loading() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.12),transparent_22%),radial-gradient(circle_at_28%_20%,rgba(15,23,42,0.10),transparent_28%)]" />
      <div className="relative flex w-full max-w-md flex-col items-center text-center">
        <CircuitLoader />
        <p className="mt-8 text-sm font-semibold uppercase tracking-[0.28em] text-[var(--accent-2)]">Loading.....</p>
      </div>
    </div>
  );
}
