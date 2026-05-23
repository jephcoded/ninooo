import { ADMIN_DISPLAY_NAME, ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_USERS_KEY } from "@/lib/admin-auth";
import {
  ADMINS_COLLECTION,
  BLOGS_COLLECTION,
  BOOKING_REPLIES_COLLECTION,
  HISTORY_COLLECTION,
  PRODUCTS_COLLECTION,
  SERVICES_COLLECTION,
  TRACKING_COLLECTION,
} from "@/lib/backend-config";
import { readBackendCollection, writeBackendCollection } from "@/lib/backend-client";

export const ADMIN_DATA_EVENT = "nino-admin-data-updated";
export const SERVICES_CONTENT_KEY = "nino-services-content";
export const BLOG_POSTS_KEY = "nino-blog-posts";
export const SHOP_PRODUCTS_KEY = "nino-shop-products";
export const TRACKING_ENTRIES_KEY = "nino-tracking-entries";
export const ADMIN_HISTORY_KEY = "nino-admin-history";
export const BOOKING_REPLIES_KEY = "nino-booking-replies";

export type ServicePart = {
  name: string;
  info: string;
  fit: string;
};

export type ServiceFaq = {
  id: string;
  question: string;
  answer: string;
};

export type ManagedService = {
  slug: string;
  code: string;
  label: string;
  title: string;
  summary: string;
  details: string;
  imageLabel: string;
  imageNote: string;
  parts: ServicePart[];
  checks: string[];
  advisory: string;
  faqs: ServiceFaq[];
};

export type ManagedBlogPost = {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  createdAt: string;
};

export type ManagedProduct = {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  colors: string[];
  sizes: string[];
  image: string;
  stock: string;
  trackingNote: string;
};

export type TrackingEntry = {
  id: string;
  service: string;
  customerName: string;
  email: string;
  status: string;
  progress: number;
  updatedAt: string;
  milestones: string[];
  chartPoints: number[];
};

export type AdminUser = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  createdAt: string;
};

export type HistoryEntry = {
  id: string;
  action: string;
  entity: string;
  detail: string;
  createdAt: string;
};

export type BookingReply = {
  bookingId: string;
  status: string;
  emailReply: string;
  updatedAt: string;
};

function canUseStorage() {
  return typeof window !== "undefined";
}

function readValue<T>(key: string, fallback: T): T {
  if (!canUseStorage()) return fallback;

  const raw = window.localStorage.getItem(key);
  if (!raw) return fallback;

  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeValue<T>(key: string, value: T) {
  if (!canUseStorage()) return;

  window.localStorage.setItem(key, JSON.stringify(value));
  window.dispatchEvent(new Event(ADMIN_DATA_EVENT));
}

const LEGACY_AUTOMOTIVE_SERVICE_SLUGS = new Set(["engine", "brakes", "suspension", "electrical", "cooling"]);

function hasLegacyAutomotiveServices(services: ManagedService[]) {
  return services.some((service) => LEGACY_AUTOMOTIVE_SERVICE_SLUGS.has(service.slug));
}

export const defaultAdminUsers: AdminUser[] = [
  {
    id: "admin-root",
    name: ADMIN_DISPLAY_NAME,
    email: ADMIN_EMAIL,
    password: ADMIN_PASSWORD,
    role: "Super Admin",
    createdAt: new Date("2026-05-12T09:00:00.000Z").toISOString(),
  },
];

export const defaultServices: ManagedService[] = [
  {
    slug: "ecu-repair",
    code: "NINO-ECU-2401",
    label: "ECU Repair",
    title: "ECU fault diagnosis, repair, and recovery support.",
    summary:
      "NINO checks damaged ECU units for communication faults, power failure, water damage, and unstable module behavior before any repair work starts.",
    details:
      "This option helps customers understand the ECU-related parts involved in the job and choose what should be repaired or replaced for reliable electronics recovery.",
    imageLabel: "ECU repair bench",
    imageNote: "Diagnostic image support for ECU repair presentation.",
    parts: [
      { name: "Power regulators", info: "Checked when the ECU fails to power up correctly or resets unpredictably during diagnostics.", fit: "Best for power-stage faults and unstable startup behavior." },
      { name: "EEPROM and flash chips", info: "Reviewed when software data is corrupt, cloning is required, or configuration recovery is needed.", fit: "Fits data recovery and module programming work." },
      { name: "Driver transistors", info: "Inspected when output stages burn out or module channels stop switching correctly.", fit: "Fits component-level ECU repair and output recovery." },
      { name: "CAN communication circuits", info: "Used when the module no longer communicates cleanly with diagnostic tools or linked units.", fit: "Fits network communication and interface faults." },
      { name: "Connectors and pins", info: "Reviewed when corrosion, bent pins, or loose seating interrupts stable ECU operation.", fit: "Fits connector restoration and signal continuity work." },
      { name: "Protection components", info: "Considered when surge events or reverse polarity damage affect module stability.", fit: "Fits deeper board protection and recovery work." },
    ],
    checks: ["Bench testing and live diagnosis", "Power and communication-path inspection", "Programming-readiness checks"],
    advisory: "Tap any ECU part option to open a quick service note with more guidance on where it fits in the repair.",
    faqs: [
      { id: "ecu-faq-1", question: "How does NINO start ECU diagnosis?", answer: "NINO begins with fault tracing, visual checks, and controlled diagnostics so the repair direction is based on the actual condition of the ECU." },
      { id: "ecu-faq-2", question: "Will NINO explain the failed components?", answer: "Yes. NINO explains the key parts connected to the fault, what each part affects, and whether the best path is repair, replacement, or a stronger long-term option." },
    ],
  },
  {
    slug: "ecu-programming",
    code: "NINO-PRG-2402",
    label: "ECU Programming",
    title: "ECU cloning, immobilizer work, and key programming support.",
    summary:
      "NINO handles ECU cloning, immobilizer matching, software writing, and key programming for supported electronic systems.",
    details:
      "The service gives a clear view of the programming path involved so customers can approve the right recovery or coding plan with confidence.",
    imageLabel: "Programming workflow",
    imageNote: "Programming, cloning, and coding visuals can be managed here.",
    parts: [
      { name: "Flash memory", info: "Used when firmware writing, recovery, or file replacement is required.", fit: "Fits software repair and ECU cloning workflows." },
      { name: "EEPROM data", info: "Checked when immobilizer, coding, or identity data must be read and written correctly.", fit: "Fits immobilizer and key programming work." },
      { name: "Programming adapter ports", info: "Inspected when the module requires bench access or stable communication during writing.", fit: "Fits controlled programming setup." },
      { name: "Immobilizer data sets", info: "Needed when module pairing and security matching are part of the repair path.", fit: "Fits supported immobilizer alignment work." },
      { name: "Key transponder data", info: "Reviewed when keys need to be added, restored, or synchronized again.", fit: "Fits key programming and customer handoff." },
      { name: "Backup files", info: "Considered when original module data must be preserved before recovery or replacement.", fit: "Fits safe recovery and rollback planning." },
    ],
    checks: ["Read and write verification", "Immobilizer and key sync checks", "Backup and recovery validation"],
    advisory: "Open a programming option to see what issue usually leads to that workflow and where it fits in the service process.",
    faqs: [
      { id: "programming-faq-1", question: "Can I book cloning or programming only?", answer: "Yes. NINO can inspect the module first and confirm whether the right path is cloning, coding, immobilizer matching, or deeper repair." },
      { id: "programming-faq-2", question: "Will NINO explain the data risk and workflow?", answer: "Yes. Programming work is explained in clear terms so the customer understands the recovery path, the supported options, and the final result." },
    ],
  },
  {
    slug: "device-repair",
    code: "NINO-DEV-2403",
    label: "Device Repair",
    title: "TV, laptop, and phone repair for damaged electronics.",
    summary:
      "For TVs, laptops, and phones with power faults, display issues, boot failure, liquid damage, or unstable behavior, NINO inspects the electronics path in detail.",
    details:
      "Customers can review the parts connected to the issue and choose the best repair or replacement path for stable daily use.",
    imageLabel: "Device repair station",
    imageNote: "Phone, TV, and laptop repair visuals can be managed here.",
    parts: [
      { name: "Power ICs", info: "Replaced when the device no longer powers up or shuts down unexpectedly during use.", fit: "Fits stable power recovery work." },
      { name: "Display connectors", info: "Reviewed when image output flickers, disappears, or becomes unstable.", fit: "Fits screen-path restoration and signal repair." },
      { name: "Charging circuits", info: "Checked when a phone or laptop stops charging or overheats at the charging stage.", fit: "Fits charging-system recovery." },
      { name: "Backlight circuits", info: "Inspected when screens remain dark while the device still operates in the background.", fit: "Fits TV and laptop display repair." },
      { name: "Audio and signal boards", info: "Considered when a TV or device powers on but output and control behavior remain faulty.", fit: "Fits deeper board-level restoration." },
      { name: "Storage and firmware components", info: "Reviewed when devices loop, freeze, or lose stable startup behavior.", fit: "Fits recovery and data-safe repair planning." },
    ],
    checks: ["Bench power inspection", "Display and signal-path checks", "Firmware and storage review"],
    advisory: "Tap a device part to get a quick explanation of when that component usually becomes the repair focus.",
    faqs: [
      { id: "device-faq-1", question: "Can NINO diagnose dead or unstable devices?", answer: "Yes. NINO inspects the board, power path, and connected components carefully so the source of the failure is clear before replacements begin." },
      { id: "device-faq-2", question: "Will screen and charging faults be included?", answer: "Yes. Display, charging, power, startup, and stability issues are all part of the device repair review when relevant." },
    ],
  },
  {
    slug: "electronics-diagnostics",
    code: "NINO-ELC-2404",
    label: "Diagnostics",
    title: "Electronics diagnostics and component replacement.",
    summary:
      "NINO traces power faults, communication faults, short circuits, bad components, and wiring issues using focused electronics testing.",
    details:
      "This service helps customers see which electronic parts are failing and choose replacements that match the repair need clearly.",
    imageLabel: "Electrical diagnosis desk",
    imageNote: "Wiring, battery, and diagnostic-tool images can be managed here.",
    parts: [
      { name: "Power rails", info: "Checked first when the board loses stable voltage or powers up inconsistently.", fit: "Fits entry-level diagnostics and power support." },
      { name: "Charging stages", info: "Reviewed when charging is weak, unstable, or keeps failing after short use.", fit: "Fits charging-path restoration work." },
      { name: "Boot circuits", info: "Inspected when the unit clicks, loops, or takes too long to start correctly.", fit: "Fits startup-system repair." },
      { name: "Fuses and relays", info: "Tested when isolated functions stop working or electrical circuits fail intermittently.", fit: "Fits focused circuit protection and switching repair." },
      { name: "Sensors and connectors", info: "Checked when fault readings appear or poor connections interrupt stable behavior.", fit: "Fits modern electronics diagnostics and wiring cleanup." },
      { name: "Output drivers", info: "Replaced when outputs flicker, fail, or stop providing reliable response.", fit: "Fits output reliability and safe restoration." },
    ],
    checks: ["Power and charging-path testing", "Wiring continuity inspection", "Sensor, fuse, and output diagnostics"],
    advisory: "Open an electrical option to see the kind of problem that usually brings that part into the job scope.",
    faqs: [
      { id: "elec-faq-1", question: "Can NINO trace power drain and charging faults?", answer: "Yes. Power support, charging faults, startup issues, and wiring interruptions are all covered by the diagnostic process." },
      { id: "elec-faq-2", question: "Will sensor and output faults be included?", answer: "Yes. NINO can inspect modern electronics faults, from sensor failures and connectors to output stages and circuit reliability." },
    ],
  },
  {
    slug: "module-repair",
    code: "NINO-MOD-2405",
    label: "Module Repair",
    title: "Module testing, board repair, and wiring restoration.",
    summary:
      "NINO works on damaged modules, burnt sections, unstable board behavior, wiring faults, and failed communication sections that affect electronics reliability.",
    details:
      "Customers can use this tab to review the module and board parts linked to the service before repair approval.",
    imageLabel: "Module repair station",
    imageNote: "Module, board, and wiring repair visuals can be managed here.",
    parts: [
      { name: "Microcontrollers", info: "Reviewed when the module loses logic control or no longer responds correctly.", fit: "Fits major module recovery." },
      { name: "Communication transceivers", info: "Checked when data lines fail or linked devices no longer communicate reliably.", fit: "Fits communication recovery work." },
      { name: "MOSFETs and drivers", info: "Changed when load control becomes unstable or output stages burn out.", fit: "Fits active switching repair." },
      { name: "Harness connectors", info: "Inspected when intermittent connections and loose wiring interrupt stable operation.", fit: "Fits wiring restoration service." },
      { name: "Protection diodes", info: "Reviewed when surge events damage entry protection and board stability drops.", fit: "Fits protection-stage repair." },
      { name: "Damaged traces", info: "Checked when burnt or lifted board traces break continuity between critical sections.", fit: "Fits deeper board reconstruction and preventive reinforcement." },
    ],
    checks: ["Continuity and resistance review", "Signal and communication inspection", "Damage checks across board sections and connectors"],
    advisory: "Tap any module option to view what symptom normally leads to that service recommendation.",
    faqs: [
      { id: "module-faq-1", question: "Can NINO handle board damage and wiring faults together?", answer: "Yes. Module safety, board damage, and wiring faults can be reviewed together when the electronics show more than one failure path." },
      { id: "module-faq-2", question: "Will failed sections be explained clearly?", answer: "Yes. NINO explains where the fault sits, what part is affected, and how that choice changes the repair direction." },
    ],
  },
];

export const defaultBlogPosts: ManagedBlogPost[] = [
  {
    id: "blog-001",
    title: "How NINO handles electronics diagnosis before repair begins",
    excerpt: "A clearer look at how faults are traced before parts are changed.",
    content: "NINO begins service work with diagnosis first so the customer understands what is wrong, why the issue matters, and which parts are truly involved before replacement begins.",
    image: "/images/mo-2.png",
    createdAt: new Date("2026-05-10T08:00:00.000Z").toISOString(),
  },
  {
    id: "blog-002",
    title: "Board repair, testing, and cleaner electronics recovery",
    excerpt: "What customers should expect from a professional board-level repair review.",
    content: "Board repair should always begin with a clear inspection of damaged sections, failed components, signal paths, and recovery risk so the customer sees the technical value behind the repair decision.",
    image: "/images/mo-4.png",
    createdAt: new Date("2026-05-11T10:30:00.000Z").toISOString(),
  },
];

export const defaultShopProducts: ManagedProduct[] = [
  {
    id: "ecu-programmer-pro",
    name: "ECU Programmer Pro Kit",
    category: "Programming",
    description: "Premium programming hardware for supported ECU, immobilizer, and key coding workflows.",
    price: 1250000,
    colors: ["Black", "Silver"],
    sizes: ["Standard", "Advanced"],
    image: "/images/mo-1.png",
    stock: "12 units available",
    trackingNote: "Track programming hardware preparation, dispatch, and delivery from the admin shop desk.",
  },
  {
    id: "scan-elite",
    name: "Elite Diagnostic Scanner",
    category: "Electronics",
    description: "Lab-grade scan support for fault tracing, live readings, and electronics diagnosis.",
    price: 320000,
    colors: ["Black", "Graphite"],
    sizes: ["Compact", "Pro"],
    image: "/images/mo-2.png",
    stock: "8 units available",
    trackingNote: "Track scanner order readiness, dispatch, and delivery updates from the shop backend.",
  },
  {
    id: "care-premium",
    name: "Premium Diagnostics Package",
    category: "Service add-on",
    description: "Priority diagnostics, premium follow-up, and cleaner service scheduling for repeat customers.",
    price: 180000,
    colors: ["Orange", "Black"],
    sizes: ["Monthly", "Quarterly"],
    image: "/images/mo-3.png",
    stock: "Open for booking",
    trackingNote: "Track care package activation and customer follow-up from the admin panel.",
  },
  {
    id: "module-repair-set",
    name: "Module Repair Support Set",
    category: "Repair",
    description: "Selected repair support parts for modules needing stronger board recovery and service replacement options.",
    price: 540000,
    colors: ["Black", "Blue"],
    sizes: ["Small", "Large"],
    image: "/images/mo-4.png",
    stock: "15 units available",
    trackingNote: "Track module repair order progress and stock movement from the shop backend.",
  },
];

export async function readManagedServices() {
  const services = await readBackendCollection<ManagedService[]>(SERVICES_COLLECTION, SERVICES_CONTENT_KEY, defaultServices);

  if (!Array.isArray(services) || !services.length || hasLegacyAutomotiveServices(services)) {
    await writeManagedServices(defaultServices);
    return defaultServices;
  }

  return services;
}

export async function writeManagedServices(value: ManagedService[]) {
  return writeBackendCollection(SERVICES_COLLECTION, SERVICES_CONTENT_KEY, value, [ADMIN_DATA_EVENT]);
}

export async function readManagedBlogs() {
  return readBackendCollection<ManagedBlogPost[]>(BLOGS_COLLECTION, BLOG_POSTS_KEY, []);
}

export async function writeManagedBlogs(value: ManagedBlogPost[]) {
  return writeBackendCollection(BLOGS_COLLECTION, BLOG_POSTS_KEY, value, [ADMIN_DATA_EVENT]);
}

export async function readManagedProducts() {
  return readBackendCollection<ManagedProduct[]>(PRODUCTS_COLLECTION, SHOP_PRODUCTS_KEY, defaultShopProducts);
}

export async function writeManagedProducts(value: ManagedProduct[]) {
  return writeBackendCollection(PRODUCTS_COLLECTION, SHOP_PRODUCTS_KEY, value, [ADMIN_DATA_EVENT]);
}

export async function readTrackingEntries() {
  return readBackendCollection<TrackingEntry[]>(TRACKING_COLLECTION, TRACKING_ENTRIES_KEY, []);
}

export async function writeTrackingEntries(value: TrackingEntry[]) {
  return writeBackendCollection(TRACKING_COLLECTION, TRACKING_ENTRIES_KEY, value, [ADMIN_DATA_EVENT]);
}

export async function readAdminUsers() {
  return readBackendCollection<AdminUser[]>(ADMINS_COLLECTION, ADMIN_USERS_KEY, defaultAdminUsers);
}

export async function writeAdminUsers(value: AdminUser[]) {
  return writeBackendCollection(ADMINS_COLLECTION, ADMIN_USERS_KEY, value, [ADMIN_DATA_EVENT]);
}

export async function readAdminHistory() {
  return readBackendCollection<HistoryEntry[]>(HISTORY_COLLECTION, ADMIN_HISTORY_KEY, []);
}

export async function writeAdminHistory(value: HistoryEntry[]) {
  return writeBackendCollection(HISTORY_COLLECTION, ADMIN_HISTORY_KEY, value, [ADMIN_DATA_EVENT]);
}

export async function appendAdminHistory(action: string, entity: string, detail: string) {
  const nextHistory: HistoryEntry = {
    id: `history-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
    action,
    entity,
    detail,
    createdAt: new Date().toISOString(),
  };

  const currentHistory = await readAdminHistory();
  return writeAdminHistory([nextHistory, ...currentHistory]);
}

export async function readBookingReplies() {
  return readBackendCollection<BookingReply[]>(BOOKING_REPLIES_COLLECTION, BOOKING_REPLIES_KEY, []);
}

export async function writeBookingReplies(value: BookingReply[]) {
  return writeBackendCollection(BOOKING_REPLIES_COLLECTION, BOOKING_REPLIES_KEY, value, [ADMIN_DATA_EVENT]);
}