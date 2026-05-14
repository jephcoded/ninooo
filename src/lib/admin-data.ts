import { ADMIN_DISPLAY_NAME, ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_USERS_KEY } from "@/lib/admin-auth";

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
    slug: "engine",
    code: "NINO-ENG-2401",
    label: "Engine Care",
    title: "Engine diagnosis, tune-up, and repair support.",
    summary:
      "NINO checks the engine system for rough idling, power loss, overheating, oil leaks, and warning-light faults before any repair work starts.",
    details:
      "This option helps customers understand the engine-related parts involved in the job and choose what should be repaired or replaced for reliable daily performance.",
    imageLabel: "Workshop engine bay",
    imageNote: "Diagnostic image support for engine service presentation.",
    parts: [
      { name: "Spark plugs", info: "Used when the engine is misfiring, struggling to start, or burning fuel less efficiently than normal.", fit: "Best for tune-up work and unstable ignition performance." },
      { name: "Ignition coils", info: "Checked when the vehicle jerks, idles badly, or fails to deliver smooth power on acceleration.", fit: "Fits electrical ignition faults tied to poor combustion." },
      { name: "Engine oil and filters", info: "Recommended for dirty lubrication systems, overdue maintenance, or reduced engine smoothness.", fit: "Fits routine maintenance and engine protection work." },
      { name: "Fuel injectors", info: "Inspected when fuel delivery becomes uneven or the engine loses clean response under load.", fit: "Fits engine-performance and fuel-system service." },
      { name: "Radiator hoses", info: "Reviewed when there are coolant leaks, overheating signs, or weak hose pressure resistance.", fit: "Fits cooling-related engine protection work." },
      { name: "Timing belt or chain parts", info: "Considered when the engine timing is unstable or preventive replacement is due by mileage.", fit: "Fits deeper engine timing service and major preventive repair." },
    ],
    checks: ["Fault-code scanning and live diagnosis", "Oil leak and overheating inspection", "Ignition and combustion performance checks"],
    advisory: "Tap any engine part option to open a quick service note with more guidance on where it fits in the repair.",
    faqs: [
      { id: "engine-faq-1", question: "How does NINO start a service inspection?", answer: "NINO begins with fault tracing, visual checks, and the right diagnostic review so the service direction is based on the actual condition of the vehicle." },
      { id: "engine-faq-2", question: "Will the workshop explain the parts involved?", answer: "Yes. NINO explains the key parts connected to the fault, what each part affects, and whether the best path is repair, replacement, or a stronger long-term option." },
    ],
  },
  {
    slug: "brakes",
    code: "NINO-BRK-2402",
    label: "Brake Service",
    title: "Brake inspection and replacement for safer road control.",
    summary:
      "NINO handles brake servicing for vehicles with weak stopping power, grinding sounds, pedal issues, or dashboard brake warnings.",
    details:
      "The service gives a clear view of the braking parts involved so customers can approve the right replacement plan with confidence.",
    imageLabel: "Brake inspection scene",
    imageNote: "Brake-work images and captions can be managed here.",
    parts: [
      { name: "Brake pads", info: "Changed when pad thickness is low, stopping distance increases, or grinding sounds begin.", fit: "Fits routine brake service and quick safety restoration." },
      { name: "Brake discs or rotors", info: "Reviewed for scoring, vibration, or uneven wear that affects smooth braking.", fit: "Fits full brake refresh and stronger stopping consistency." },
      { name: "Brake calipers", info: "Inspected if a wheel binds, braking feels uneven, or fluid issues affect pressure.", fit: "Fits deeper brake repair where movement and pressure are affected." },
      { name: "Brake fluid", info: "Needed when fluid is old, contaminated, or the system needs bleeding after component work.", fit: "Fits pedal response improvement and maintenance service." },
      { name: "ABS sensors", info: "Checked when warning lights stay on or the anti-lock system reports wheel-speed faults.", fit: "Fits modern braking diagnosis and electronic brake control." },
      { name: "Brake master cylinder parts", info: "Considered when fluid pressure delivery is weak or the brake pedal sinks abnormally.", fit: "Fits major hydraulic brake repair." },
    ],
    checks: ["Brake response and pedal feel test", "Pad wear and rotor condition inspection", "Fluid quality and leak checks"],
    advisory: "Open a brake option to see what issue usually leads to that replacement and where it fits in the service process.",
    faqs: [
      { id: "brakes-faq-1", question: "Can I book brake checks before replacement?", answer: "Yes. NINO can inspect the braking system first and confirm whether the right path is pad service, disc replacement, fluid correction, or a deeper hydraulic repair." },
      { id: "brakes-faq-2", question: "Will NINO explain the safety impact?", answer: "Yes. Brake service is explained in clear terms so the customer understands how the problem affects stopping power, pedal feel, and road safety." },
    ],
  },
  {
    slug: "suspension",
    code: "NINO-SUS-2403",
    label: "Suspension",
    title: "Suspension and steering repair for comfort and balance.",
    summary:
      "For vehicles with vibration, pulling, uneven tyre wear, or unstable handling, NINO inspects the steering and suspension system in detail.",
    details:
      "Customers can review the suspension parts connected to the issue and choose the best replacement path for smoother driving and better stability.",
    imageLabel: "Suspension and alignment",
    imageNote: "Handling, alignment, and underbody repair visuals can be managed here.",
    parts: [
      { name: "Shock absorbers", info: "Replaced when the vehicle feels bouncy, unstable on rough roads, or slow to settle after impact.", fit: "Fits ride-comfort restoration and suspension balance work." },
      { name: "Struts", info: "Reviewed when front-end handling feels weak or the car dips excessively under braking.", fit: "Fits combined support and damping repair." },
      { name: "Control arms", info: "Checked when alignment drifts, suspension geometry shifts, or arm bushes wear badly.", fit: "Fits structural suspension correction." },
      { name: "Ball joints", info: "Inspected for knocking sounds, steering looseness, or unstable wheel movement.", fit: "Fits steering precision and wheel control repair." },
      { name: "Tie rod ends", info: "Considered when steering accuracy drops or the vehicle pulls while driving straight.", fit: "Fits steering alignment and directional control service." },
      { name: "Steering rack parts", info: "Reviewed if steering becomes stiff, noisy, or develops fluid-related faults.", fit: "Fits advanced steering system repair." },
    ],
    checks: ["Suspension wear inspection", "Steering response and balance checks", "Joint, bush, and mount condition review"],
    advisory: "Tap a suspension part to get a quick explanation of when that component usually becomes the repair focus.",
    faqs: [
      { id: "sus-faq-1", question: "Can NINO diagnose pulling and vibration?", answer: "Yes. NINO inspects the steering and suspension path carefully so the source of pulling, knocking, and unstable handling is clear before replacements begin." },
      { id: "sus-faq-2", question: "Will tyre wear be considered too?", answer: "Yes. Uneven tyre wear, wheel control, and steering feel are all part of the suspension review when relevant." },
    ],
  },
  {
    slug: "electrical",
    code: "NINO-ELC-2404",
    label: "Electrical",
    title: "Auto-electrical diagnosis and component replacement.",
    summary:
      "NINO traces battery drain, charging faults, sensor failures, wiring issues, and lighting problems using focused electrical testing.",
    details:
      "This service helps customers see which electrical parts are failing and choose replacements that match the vehicle's immediate repair needs.",
    imageLabel: "Electrical diagnosis desk",
    imageNote: "Wiring, battery, and diagnostic-tool images can be managed here.",
    parts: [
      { name: "Battery", info: "Checked first when the vehicle struggles to start, drains overnight, or loses stable voltage.", fit: "Fits entry-level electrical diagnosis and power support." },
      { name: "Alternator", info: "Reviewed when charging is weak, warning lights stay on, or the battery keeps dying after short use.", fit: "Fits charging-system restoration work." },
      { name: "Starter motor", info: "Inspected when ignition clicks without cranking or the engine takes too long to turn over.", fit: "Fits starting-system repair." },
      { name: "Fuses and relays", info: "Tested when isolated functions stop working or electrical circuits fail intermittently.", fit: "Fits focused circuit protection and switching repair." },
      { name: "Sensors and connectors", info: "Checked when dashboards report sensor faults or poor connections interrupt vehicle behavior.", fit: "Fits modern vehicle diagnostics and wiring cleanup." },
      { name: "Headlights and bulbs", info: "Replaced when visibility drops, lights flicker, or housing connections affect stable output.", fit: "Fits lighting reliability and road-safety service." },
    ],
    checks: ["Battery and charging-system testing", "Wiring continuity inspection", "Sensor, fuse, and lighting diagnostics"],
    advisory: "Open an electrical option to see the kind of problem that usually brings that part into the job scope.",
    faqs: [
      { id: "elec-faq-1", question: "Can NINO trace battery drain and charging faults?", answer: "Yes. Battery support, alternator faults, starting issues, and wiring interruptions are all covered by the electrical diagnostic process." },
      { id: "elec-faq-2", question: "Will sensor and lighting faults be included?", answer: "Yes. NINO can inspect modern electrical faults, from sensor failures and connectors to lighting and circuit reliability." },
    ],
  },
  {
    slug: "cooling",
    code: "NINO-CLG-2405",
    label: "Cooling and AC",
    title: "Cooling-system and air-conditioning service for daily comfort.",
    summary:
      "NINO works on overheating, coolant loss, weak cabin cooling, compressor issues, and airflow problems that affect comfort and engine safety.",
    details:
      "Customers can use this tab to review the cooling and climate-control parts linked to the service before repair approval.",
    imageLabel: "Cooling and AC service",
    imageNote: "Radiator, AC, and cooling-system service visuals can be managed here.",
    parts: [
      { name: "AC compressor", info: "Reviewed when the air-conditioning system no longer builds strong cooling pressure.", fit: "Fits major AC performance repair." },
      { name: "Condenser", info: "Checked when airflow and refrigerant cooling efficiency drop after front-end exposure or damage.", fit: "Fits AC cooling recovery work." },
      { name: "Cabin filter", info: "Changed when interior airflow weakens or dust buildup affects clean ventilation.", fit: "Fits quick airflow improvement and cabin care." },
      { name: "Radiator", info: "Inspected when coolant loss, blocked cooling flow, or overheating signs appear.", fit: "Fits engine cooling protection service." },
      { name: "Cooling fan", info: "Reviewed when temperature rises in traffic or airflow support becomes unreliable at low speed.", fit: "Fits active cooling-system repair." },
      { name: "Thermostat and water pump", info: "Checked when coolant circulation and temperature control stop behaving consistently.", fit: "Fits deeper cooling-system repair and preventive replacement." },
    ],
    checks: ["Temperature and pressure review", "Refrigerant and airflow inspection", "Leak checks across hoses and fittings"],
    advisory: "Tap any cooling or AC option to view what symptom normally leads to that service recommendation.",
    faqs: [
      { id: "cool-faq-1", question: "Can NINO handle overheating and weak cabin cooling together?", answer: "Yes. Cooling-system safety and air-conditioning comfort can be reviewed together when the vehicle shows both engine temperature and cabin airflow issues." },
      { id: "cool-faq-2", question: "Will radiator and compressor faults be explained clearly?", answer: "Yes. NINO explains where the fault sits, what part is affected, and how that choice changes the repair direction." },
    ],
  },
];

export const defaultBlogPosts: ManagedBlogPost[] = [
  {
    id: "blog-001",
    title: "How NINO handles workshop diagnosis before repair begins",
    excerpt: "A clearer look at how faults are traced before parts are changed.",
    content: "NINO begins service work with diagnosis first so the customer understands what is wrong, why the issue matters, and which parts are truly involved before replacement begins.",
    image: "/images/mo-2.png",
    createdAt: new Date("2026-05-10T08:00:00.000Z").toISOString(),
  },
  {
    id: "blog-002",
    title: "Brake service, safety checks, and better road confidence",
    excerpt: "What customers should expect from a professional brake review.",
    content: "Brake work should always begin with a clear inspection of pads, discs, fluid condition, and pedal feel so the customer sees the safety value behind the repair decision.",
    image: "/images/mo-4.png",
    createdAt: new Date("2026-05-11T10:30:00.000Z").toISOString(),
  },
];

export const defaultShopProducts: ManagedProduct[] = [
  {
    id: "kit-cng-pro",
    name: "CNG Conversion Pro Kit",
    category: "Conversion",
    description: "Premium conversion hardware for selected passenger vehicles with cleaner long-term performance goals.",
    price: 1250000,
    colors: ["Black", "Silver"],
    sizes: ["Standard", "Fleet"],
    image: "/images/mo-1.png",
    stock: "12 units available",
    trackingNote: "Track conversion hardware preparation, fitting, and delivery from the admin shop desk.",
  },
  {
    id: "scan-elite",
    name: "Elite Diagnostic Scanner",
    category: "Electronics",
    description: "Workshop-grade scan support for fault tracing, live readings, and electrical diagnosis.",
    price: 320000,
    colors: ["Black", "Graphite"],
    sizes: ["Compact", "Pro"],
    image: "/images/mo-2.png",
    stock: "8 units available",
    trackingNote: "Track scanner order readiness, dispatch, and delivery updates from the shop backend.",
  },
  {
    id: "care-premium",
    name: "Premium Care Package",
    category: "Service add-on",
    description: "Priority inspections, premium care follow-up, and cleaner service scheduling for repeat customers.",
    price: 180000,
    colors: ["Orange", "Black"],
    sizes: ["Monthly", "Quarterly"],
    image: "/images/mo-3.png",
    stock: "Open for booking",
    trackingNote: "Track care package activation and customer follow-up from the admin panel.",
  },
  {
    id: "cooling-max",
    name: "Cooling Support Set",
    category: "Cooling",
    description: "Selected cooling support parts for vehicles needing stronger temperature control and service replacement options.",
    price: 540000,
    colors: ["Black", "Blue"],
    sizes: ["Small", "Large"],
    image: "/images/mo-4.png",
    stock: "15 units available",
    trackingNote: "Track cooling order progress and stock movement from the shop backend.",
  },
];

export function readManagedServices() {
  return readValue<ManagedService[]>(SERVICES_CONTENT_KEY, defaultServices);
}

export function writeManagedServices(value: ManagedService[]) {
  writeValue(SERVICES_CONTENT_KEY, value);
}

export function readManagedBlogs() {
  return readValue<ManagedBlogPost[]>(BLOG_POSTS_KEY, []);
}

export function writeManagedBlogs(value: ManagedBlogPost[]) {
  writeValue(BLOG_POSTS_KEY, value);
}

export function readManagedProducts() {
  return readValue<ManagedProduct[]>(SHOP_PRODUCTS_KEY, defaultShopProducts);
}

export function writeManagedProducts(value: ManagedProduct[]) {
  writeValue(SHOP_PRODUCTS_KEY, value);
}

export function readTrackingEntries() {
  return readValue<TrackingEntry[]>(TRACKING_ENTRIES_KEY, []);
}

export function writeTrackingEntries(value: TrackingEntry[]) {
  writeValue(TRACKING_ENTRIES_KEY, value);
}

export function readAdminUsers() {
  return readValue<AdminUser[]>(ADMIN_USERS_KEY, defaultAdminUsers);
}

export function writeAdminUsers(value: AdminUser[]) {
  writeValue(ADMIN_USERS_KEY, value);
}

export function readAdminHistory() {
  return readValue<HistoryEntry[]>(ADMIN_HISTORY_KEY, []);
}

export function appendAdminHistory(action: string, entity: string, detail: string) {
  const nextHistory: HistoryEntry = {
    id: `history-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
    action,
    entity,
    detail,
    createdAt: new Date().toISOString(),
  };

  writeValue(ADMIN_HISTORY_KEY, [nextHistory, ...readAdminHistory()]);
}

export function readBookingReplies() {
  return readValue<BookingReply[]>(BOOKING_REPLIES_KEY, []);
}

export function writeBookingReplies(value: BookingReply[]) {
  writeValue(BOOKING_REPLIES_KEY, value);
}