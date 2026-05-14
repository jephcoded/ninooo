import { CONTACT_PHONE_LOCAL, CONTACT_PHONE_LOCAL_ALT } from "@/lib/site-contact";

type InfoTickerProps = {
  tone?: "light" | "dark";
  compact?: boolean;
  className?: string;
};

const tickerItems = [
  "Nino Electronics Solutions",
  `Call ${CONTACT_PHONE_LOCAL} or ${CONTACT_PHONE_LOCAL_ALT}`,
  "Abuja, Airport Road",
  "Open Monday to Saturday, 8:00 AM to 6:00 PM",
  "Repair bookings, shop support, and order follow-up available",
];

export function InfoTicker({ tone = "light", compact = false, className = "" }: InfoTickerProps) {
  const items = [...tickerItems, ...tickerItems];
  const toneClassName =
    tone === "dark"
      ? "border-white/10 bg-[rgba(8,10,16,0.88)] text-white"
      : "border-slate-200 bg-[linear-gradient(180deg,#fff8ee,#ffffff)] text-slate-700";

  return (
    <div className={`marquee-pause overflow-hidden rounded-full border ${toneClassName} ${className}`.trim()}>
      <div className={`marquee-track flex items-center ${compact ? "py-2" : "py-3"}`}>
        {items.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className={`inline-flex items-center gap-3 whitespace-nowrap px-4 ${compact ? "text-[0.64rem]" : "text-[0.72rem]"} font-semibold uppercase tracking-[0.18em]`}
          >
            <span className="inline-flex size-2 rounded-full bg-[var(--accent)]" />
            <span>{item}</span>
          </span>
        ))}
      </div>
    </div>
  );
}