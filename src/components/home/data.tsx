import type { ReactNode } from "react";

type ItemWithIcon = {
  title: string;
  description: string;
  icon: ReactNode;
  image?: string;
};

export const stats = [
  { value: 3200, suffix: "+", label: "ECUs repaired and programmed" },
  { value: 18750, suffix: "+", label: "Diagnostics sessions completed" },
  { value: 140, suffix: "+", label: "Business clients supported" },
  { value: 38, suffix: "%", label: "Repeat repair workload reduced" },
];

export const services: ItemWithIcon[] = [
  {
    title: "ECU Repair",
    description:
      "Precision board-level repair, fault isolation, and recovery for damaged ECU units and control modules.",
    icon: (
      <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M7 20h10" />
        <path d="M12 4v8" />
        <path d="M9 7c0-1.7 1.3-3 3-3s3 1.3 3 3c0 3-3 4-3 7 0-3-3-4-3-7Z" />
      </svg>
    ),
    image: "/automotive/ecu-engineering.svg",
  },
  {
    title: "ECU Cloning and Programming",
    description:
      "Programming, cloning, and recovery for immobilizers, keys, and supported electronic control systems.",
    icon: (
      <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.7">
        <rect x="7" y="7" width="10" height="10" rx="2" />
        <path d="M10 2v3M14 2v3M10 19v3M14 19v3M2 10h3M2 14h3M19 10h3M19 14h3" />
      </svg>
    ),
    image: "/automotive/ecu-engineering.svg",
  },
  {
    title: "Electronics Diagnostics",
    description:
      "Advanced diagnostics, fault tracing, and signal analysis for ECUs, modules, boards, and consumer electronics.",
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
    title: "Board and Wiring Repair",
    description:
      "Connector repair, board tracing, jumper work, and wiring restoration for damaged electronic systems.",
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
    title: "TV Repair",
    description:
      "Panel faults, power issues, backlight failure, and signal-board problems repaired with a structured workflow.",
    icon: (
      <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M3 16V7h10v9" />
        <path d="M13 10h4l4 4v2h-8" />
        <circle cx="7" cy="17" r="2" />
        <circle cx="17" cy="17" r="2" />
      </svg>
    ),
    image: "/automotive/diagnostics-lab.svg",
  },
  {
    title: "Laptop Repair",
    description:
      "Motherboard diagnosis, charging faults, screen issues, keyboard faults, and component-level laptop repair.",
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
    title: "Phone Repair",
    description:
      "Phone board repair, charging faults, display issues, and data-safe diagnostics for supported devices.",
    icon: (
      <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M4 14h4l2-3 3 6 2-3h5" />
        <path d="M4 6h16" />
      </svg>
    ),
    image: "/automotive/diagnostics-lab.svg",
  },
  {
    title: "Module Repair",
    description:
      "Module testing, replacement-path guidance, and recovery workflow for damaged electronic units.",
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
      "Every job begins with documented fault isolation, signal tracing, and decisions grounded in real electronics diagnostics.",
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
      "From ECU behavior to module programming, our output is calibrated for reliability, clean recovery, and repeatable results.",
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
    title: "Component-Level Precision",
    description:
      "We handle fine repair work on boards, connectors, modules, and programming workflows without guesswork.",
    icon: (
      <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.7">
        <path d="M12 3 5 6v6c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6z" />
        <path d="m9.5 12 1.7 1.7L15 10" />
      </svg>
    ),
  },
];

export const engineeringMetrics = [
  { label: "Programming Accuracy", value: "99.1%" },
  { label: "Board Recovery Rate", value: "34%" },
  { label: "Module Recovery", value: "93%" },
];

export const visualStories = [
  {
    title: "Diagnostics Lab",
    caption: "Real-time fault mapping and precision electronics diagnostics.",
    image: "/automotive/diagnostics-lab.svg",
  },
  {
    title: "ECU Engineering",
    caption: "Close-up electronics repair with controlled lighting and precision handling.",
    image: "/automotive/ecu-engineering.svg",
  },
  {
    title: "Programming Workflow",
    caption: "Integrated programming workflow built for clean recovery, stability, and repeatable results.",
    image: "/automotive/ecu-engineering.svg",
  },
  {
    title: "Repair Bench",
    caption: "Technical repair spaces designed to feel premium and electronically precise.",
    image: "/automotive/workshop-interior.svg",
  },
];

export const processSteps = [
  {
    title: "Inspection",
    description: "Device intake, fault history review, and initial electronics assessment.",
  },
  {
    title: "Diagnostics",
    description: "Scanner analysis, ECU checks, electrical tracing, and system-level fault isolation.",
  },
  {
    title: "Programming",
    description: "Software recovery, cloning, coding, configuration, and alignment for supported electronics.",
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
    role: "Operations Director",
    quote:
      "Their team recovered multiple damaged control units for us with a process that felt engineered, not improvised.",
  },
  {
    name: "Zainab Kareem",
    role: "Business Owner",
    quote:
      "The team traced an intermittent board fault and restored my device without the guesswork I got elsewhere. The experience felt premium from start to finish.",
  },
  {
    name: "Michael Eze",
    role: "Store Manager",
    quote:
      "Their diagnostics and repair workflow reduced repeat faults in our equipment. The reporting and delivery quality were exceptional.",
  },
  {
    name: "Chiamaka Nnadi",
    role: "Electronics Client",
    quote:
      "They solved an ECU problem that others misdiagnosed. The technical discipline feels closer to a precision electronics lab than a random repair shop.",
  },
];

export const trustIndicators = [
  "Specialist ECU and module workflows",
  "Advanced scanner and oscilloscope workflow",
  "Board-level repair and connector tracing",
  "Engineering-led programming and delivery checks",
];