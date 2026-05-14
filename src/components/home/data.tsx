import type { ReactNode } from "react";

type ItemWithIcon = {
  title: string;
  description: string;
  icon: ReactNode;
  image?: string;
};

export const stats = [
  { value: 3200, suffix: "+", label: "Vehicles converted and calibrated" },
  { value: 18750, suffix: "+", label: "Diagnostics sessions completed" },
  { value: 140, suffix: "+", label: "Fleet clients supported" },
  { value: 38, suffix: "%", label: "Fuel savings achieved after conversion" },
];

export const services: ItemWithIcon[] = [
  {
    title: "CNG Conversion",
    description:
      "Precision installation, calibration, and safety validation for passenger vehicles, SUVs, and commercial fleets.",
    icon: (
      <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M7 20h10" />
        <path d="M12 4v8" />
        <path d="M9 7c0-1.7 1.3-3 3-3s3 1.3 3 3c0 3-3 4-3 7 0-3-3-4-3-7Z" />
      </svg>
    ),
    image: "/automotive/cng-conversion.svg",
  },
  {
    title: "ECU Repair",
    description:
      "Motherboard-level repair, programming, and recovery for damaged control modules and critical vehicle electronics.",
    icon: (
      <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.7">
        <rect x="7" y="7" width="10" height="10" rx="2" />
        <path d="M10 2v3M14 2v3M10 19v3M14 19v3M2 10h3M2 14h3M19 10h3M19 14h3" />
      </svg>
    ),
    image: "/automotive/ecu-engineering.svg",
  },
  {
    title: "Automotive Diagnostics",
    description:
      "Advanced scanner diagnostics, fault tracing, and sensor analysis for premium vehicles and performance platforms.",
    icon: (
      <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M4 19V8l8-4 8 4v11" />
        <path d="M9 19v-5h6v5" />
        <path d="M10 10h4" />
      </svg>
    ),
    image: "/automotive/diagnostics-lab.svg",
  },
  {
    title: "Vehicle Wiring",
    description:
      "Harness repair, lighting systems, module integration, and electrical restoration for modern vehicles.",
    icon: (
      <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M6 4v10a3 3 0 0 0 3 3h6" />
        <path d="M18 8v10" />
        <path d="M10 7h8" />
        <path d="M10 12h8" />
      </svg>
    ),
    image: "/automotive/workshop-interior.svg",
  },
  {
    title: "Truck Conversion",
    description:
      "Heavy-duty CNG systems and drivetrain-adjacent engineering tailored for commercial trucks and logistics operators.",
    icon: (
      <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M3 16V7h10v9" />
        <path d="M13 10h4l4 4v2h-8" />
        <circle cx="7" cy="17" r="2" />
        <circle cx="17" cy="17" r="2" />
      </svg>
    ),
    image: "/automotive/featured-truck.svg",
  },
  {
    title: "Fleet Maintenance",
    description:
      "Scheduled diagnostics, preventive maintenance, and conversion lifecycle support for high-utilization fleets.",
    icon: (
      <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M5 18V9l3-3h8l3 3v9" />
        <path d="M8 11h8" />
        <path d="M9 15h6" />
      </svg>
    ),
    image: "/automotive/control-room.svg",
  },
  {
    title: "Engine Scanning",
    description:
      "Live performance data capture, emissions analysis, and root-cause identification for drivability issues.",
    icon: (
      <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M4 14h4l2-3 3 6 2-3h5" />
        <path d="M4 6h16" />
      </svg>
    ),
    image: "/automotive/diagnostics-lab.svg",
  },
  {
    title: "Hybrid Systems",
    description:
      "Battery interface diagnostics, controller support, and complex electronic troubleshooting for hybrid vehicles.",
    icon: (
      <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.7">
        <rect x="6" y="7" width="10" height="10" rx="2" />
        <path d="M16 10h2a2 2 0 0 1 2 2v0a2 2 0 0 1-2 2h-2" />
        <path d="M10 10v4" />
        <path d="M8 12h4" />
      </svg>
    ),
    image: "/automotive/ecu-engineering.svg",
  },
];

export const reasons: ItemWithIcon[] = [
  {
    title: "Engineering-Led Inspections",
    description:
      "Every job begins with documented fault isolation, system mapping, and decision-making grounded in real engineering diagnostics.",
    icon: (
      <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.7">
        <circle cx="11" cy="11" r="6" />
        <path d="m20 20-3.5-3.5" />
      </svg>
    ),
  },
  {
    title: "OEM-Grade Calibration",
    description:
      "From ECU behavior to CNG tuning, our output is calibrated for reliability, efficiency, and premium drivability.",
    icon: (
      <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M12 2v4" />
        <path d="M12 18v4" />
        <path d="M4.93 4.93 7.76 7.76" />
        <path d="M16.24 16.24 19.07 19.07" />
        <path d="M2 12h4" />
        <path d="M18 12h4" />
        <path d="M4.93 19.07 7.76 16.24" />
        <path d="M16.24 7.76 19.07 4.93" />
      </svg>
    ),
  },
  {
    title: "Fleet-Ready Operations",
    description:
      "We handle repeatable inspection, conversion, testing, and maintenance workflows for commercial fleets at scale.",
    icon: (
      <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M12 3 5 6v6c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6z" />
        <path d="m9.5 12 1.7 1.7L15 10" />
      </svg>
    ),
  },
];

export const engineeringMetrics = [
  { label: "Conversion Accuracy", value: "99.1%" },
  { label: "Emission Optimization", value: "34%" },
  { label: "Module Recovery", value: "93%" },
];

export const visualStories = [
  {
    title: "Diagnostics Lab",
    caption: "Real-time fault mapping and premium workshop control.",
    image: "/automotive/diagnostics-lab.svg",
  },
  {
    title: "ECU Engineering",
    caption: "Close-up electronics repair with controlled lighting and precision handling.",
    image: "/automotive/ecu-engineering.svg",
  },
  {
    title: "CNG Conversion",
    caption: "Integrated conversion workflow built for efficiency, safety, and fleet repeatability.",
    image: "/automotive/cng-conversion.svg",
  },
  {
    title: "Workshop Interior",
    caption: "Dark industrial spaces designed to feel premium and technically serious.",
    image: "/automotive/workshop-interior.svg",
  },
];

export const processSteps = [
  {
    title: "Inspection",
    description: "Vehicle intake, performance review, and initial mechanical-electronic assessment.",
  },
  {
    title: "Diagnostics",
    description: "Scanner analysis, ECU checks, electrical tracing, and system-level fault isolation.",
  },
  {
    title: "Conversion",
    description: "CNG kit integration, wiring refinement, controller programming, and calibration alignment.",
  },
  {
    title: "Testing",
    description: "Road simulation, emissions validation, pressure safety checks, and performance verification.",
  },
  {
    title: "Delivery",
    description: "Customer handoff with operating guidance, support notes, and service assurance.",
  },
];

export const testimonials = [
  {
    name: "Adewale Omotoso",
    role: "Fleet Director",
    quote:
      "Our logistics trucks now run cleaner and more efficiently after conversion. The process felt engineered, not improvised.",
  },
  {
    name: "Zainab Kareem",
    role: "Luxury SUV Owner",
    quote:
      "The team traced an intermittent electrical issue and restored my SUV without the guesswork I got elsewhere. The experience felt premium from start to finish.",
  },
  {
    name: "Michael Eze",
    role: "Transport Operator",
    quote:
      "Their diagnostics and conversion workflow improved our operating cost and vehicle uptime. The reporting and delivery quality were exceptional.",
  },
  {
    name: "Chiamaka Nnadi",
    role: "Performance Enthusiast",
    quote:
      "They solved an ECU problem that other workshops misdiagnosed. The workshop aesthetic and technical discipline feel closer to a performance lab than a garage.",
  },
];

export const trustIndicators = [
  "Certified conversion hardware partners",
  "Advanced scanner and oscilloscope workflow",
  "Heavy-duty truck and fleet capability",
  "Engineering-led calibration and delivery checks",
];