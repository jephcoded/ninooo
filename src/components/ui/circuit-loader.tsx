"use client";

type CircuitLoaderProps = {
  compact?: boolean;
};

const chipPaths = [
  "M52 150 H138",
  "M342 150 H428",
  "M240 48 V100",
  "M240 200 V252",
  "M104 92 H160 V116",
  "M320 116 V92 H376",
  "M104 208 H160 V184",
  "M320 184 V208 H376",
];

export function CircuitLoader({ compact = false }: CircuitLoaderProps) {
  return (
    <div className={`relative ${compact ? "h-56 w-56" : "h-72 w-72"} overflow-hidden rounded-[2rem]`}>
      <div className="absolute inset-0 rounded-[2rem] border border-white/8 bg-[radial-gradient(circle_at_30%_20%,rgba(15,23,42,0.18),transparent_28%),linear-gradient(180deg,#f8fafc_0%,#0f172a_100%)]" />
      <div className="absolute inset-4 rounded-[1.5rem] border border-white/6" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,122,24,0.18),transparent_24%)] blur-2xl" />

      <svg viewBox="0 0 480 300" className="absolute inset-0 h-full w-full" fill="none" aria-hidden="true">
        <rect x="170" y="105" width="140" height="90" rx="14" className="fill-[rgba(15,23,42,0.92)] stroke-white/10" strokeWidth="1.2" />
        <rect x="188" y="122" width="104" height="56" rx="10" className="fill-[rgba(255,122,24,0.08)] stroke-[rgba(255,177,95,0.18)]" strokeWidth="1" />

        {chipPaths.map((path, index) => (
          <path
            key={path}
            d={path}
            className="circuit-trace"
            strokeWidth="2.2"
            strokeLinecap="round"
            style={{ animationDelay: `${index * 0.18}s` }}
          />
        ))}

        {Array.from({ length: 6 }).map((_, index) => (
          <rect
            key={`left-leg-${index}`}
            x="154"
            y={114 + index * 13}
            width="16"
            height="3"
            rx="1.5"
            className="fill-white/14"
          />
        ))}

        {Array.from({ length: 6 }).map((_, index) => (
          <rect
            key={`right-leg-${index}`}
            x="310"
            y={114 + index * 13}
            width="16"
            height="3"
            rx="1.5"
            className="fill-white/14"
          />
        ))}

        {Array.from({ length: 4 }).map((_, index) => (
          <rect
            key={`top-leg-${index}`}
            x={194 + index * 24}
            y="89"
            width="3"
            height="16"
            rx="1.5"
            className="fill-white/14"
          />
        ))}

        {Array.from({ length: 4 }).map((_, index) => (
          <rect
            key={`bottom-leg-${index}`}
            x={194 + index * 24}
            y="195"
            width="3"
            height="16"
            rx="1.5"
            className="fill-white/14"
          />
        ))}

        <circle cx="240" cy="150" r="11" className="circuit-node circuit-node-core" />
        <circle cx="240" cy="150" r="38" className="circuit-node-halo" />

        <g className="circuit-pulse">
          <circle cx="240" cy="150" r="24" className="stroke-[rgba(255,122,24,0.38)]" strokeWidth="1.2" />
          <circle cx="240" cy="150" r="58" className="stroke-[rgba(255,122,24,0.12)]" strokeWidth="1" />
        </g>
      </svg>
    </div>
  );
}
