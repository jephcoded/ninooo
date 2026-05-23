"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import Link from "next/link";

import {
  ADMIN_DISPLAY_NAME,
  ADMIN_EMAIL,
  ADMIN_PASSWORD,
  ADMIN_SESSION_KEY,
  isValidAdminLogin,
} from "@/lib/admin-auth";
import {
  ADMIN_DATA_EVENT,
  AdminUser,
  appendAdminHistory,
  BookingReply,
  HistoryEntry,
  ManagedBlogPost,
  ManagedProduct,
  ManagedService,
  readAdminHistory,
  readAdminUsers,
  readBookingReplies,
  readManagedBlogs,
  readManagedProducts,
  readManagedServices,
  readTrackingEntries,
  TrackingEntry,
  writeAdminUsers,
  writeBookingReplies,
  writeManagedBlogs,
  writeManagedProducts,
  writeManagedServices,
  writeTrackingEntries,
} from "@/lib/admin-data";
import {
  SHOP_ADMIN_ALERT_KEY,
  SHOP_EVENT,
  StoredOrder,
  readStoredOrders,
} from "@/lib/shop-storage";
import { readBookings as readBookingRecords } from "@/lib/booking-store";

const BOOKING_ALERT_KEY = "nino-bookings-has-new";
const NEW_ITEM_TOKEN = "__new__";

type BookingRecord = {
  id: string;
  service: string;
  part: string;
  customerName: string;
  email: string;
  phone: string;
  location: string;
  request: string;
  createdAt: string;
};

type AdminTab = "overview" | "services" | "blogs" | "bookings" | "shop" | "admins" | "history";

type ServiceDraft = {
  slug: string;
  code: string;
  label: string;
  title: string;
  summary: string;
  details: string;
  imageLabel: string;
  imageNote: string;
  advisory: string;
  checks: string;
  parts: string;
};

type BlogDraft = {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
};

type ProductDraft = {
  id: string;
  name: string;
  category: string;
  description: string;
  price: string;
  colors: string;
  sizes: string;
  image: string;
  stock: string;
  trackingNote: string;
};

type AdminDraft = {
  name: string;
  email: string;
  password: string;
  role: string;
};

function slugify(value: string) {
  return (
    value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || `item-${Date.now().toString().slice(-6)}`
  );
}

function splitList(value: string) {
  return value
    .split(/\r?\n|,/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function serviceToDraft(service?: ManagedService): ServiceDraft {
  return {
    slug: service?.slug ?? "",
    code: service?.code ?? `NINO-SVC-${Date.now().toString().slice(-4)}`,
    label: service?.label ?? "",
    title: service?.title ?? "",
    summary: service?.summary ?? "",
    details: service?.details ?? "",
    imageLabel: service?.imageLabel ?? "",
    imageNote: service?.imageNote ?? "",
    advisory: service?.advisory ?? "",
    checks: service?.checks.join("\n") ?? "",
    parts: service?.parts.map((part) => `${part.name} | ${part.info} | ${part.fit}`).join("\n") ?? "",
  };
}

function blogToDraft(post?: ManagedBlogPost): BlogDraft {
  return {
    id: post?.id ?? "",
    title: post?.title ?? "",
    excerpt: post?.excerpt ?? "",
    content: post?.content ?? "",
    image: post?.image ?? "",
  };
}

function productToDraft(product?: ManagedProduct): ProductDraft {
  return {
    id: product?.id ?? "",
    name: product?.name ?? "",
    category: product?.category ?? "",
    description: product?.description ?? "",
    price: product ? String(product.price) : "",
    colors: product?.colors.join(", ") ?? "",
    sizes: product?.sizes.join(", ") ?? "",
    image: product?.image ?? "",
    stock: product?.stock ?? "",
    trackingNote: product?.trackingNote ?? "",
  };
}

function emptyAdminDraft(): AdminDraft {
  return {
    name: "",
    email: "",
    password: "",
    role: "Admin",
  };
}

function formatDate(value: string) {
  return new Date(value).toLocaleString();
}

function mailtoLink(email: string, subject: string, body: string) {
  return `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
function readImageFile(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(typeof reader.result === "string" ? reader.result : "");
    reader.onerror = () => reject(new Error("Unable to read image file."));
    reader.readAsDataURL(file);
  });
}

function isSameDay(left: Date, right: Date) {
  return (
    left.getFullYear() === right.getFullYear() &&
    left.getMonth() === right.getMonth() &&
    left.getDate() === right.getDate()
  );
}

function countBookingsSince(bookings: BookingRecord[], days: number) {
  const now = new Date();
  const threshold = new Date(now);
  threshold.setHours(0, 0, 0, 0);
  threshold.setDate(threshold.getDate() - (days - 1));

  return bookings.filter((booking) => new Date(booking.createdAt) >= threshold).length;
}

function buildBookingSeries(bookings: BookingRecord[], days: number) {
  const now = new Date();

  return Array.from({ length: days }, (_, index) => {
    const date = new Date(now);
    date.setHours(0, 0, 0, 0);
    date.setDate(now.getDate() - (days - 1 - index));

    const total = bookings.filter((booking) => isSameDay(new Date(booking.createdAt), date)).length;

    return {
      label: date.toLocaleDateString("en-US", { weekday: "short" }),
      total,
    };
  });
}

function SidebarIcon({ type, active }: { type: AdminTab; active: boolean }) {
  const stroke = active ? "currentColor" : "#cbd5e1";

  const shared = { fill: "none", stroke, strokeWidth: "1.8", strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

  switch (type) {
    case "overview":
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
          <path {...shared} d="M4 13h6V5H4z" />
          <path {...shared} d="M14 19h6v-8h-6z" />
          <path {...shared} d="M14 10h6V5h-6z" />
          <path {...shared} d="M4 19h6v-3H4z" />
        </svg>
      );
    case "services":
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
          <path {...shared} d="M14.5 5.5 18.5 9.5" />
          <path {...shared} d="m7 17 10.5-10.5a1.4 1.4 0 0 0 0-2l-1-1a1.4 1.4 0 0 0-2 0L4 14l-1 4 4-1Z" />
        </svg>
      );
    case "blogs":
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
          <path {...shared} d="M5 6.5h14" />
          <path {...shared} d="M5 11.5h14" />
          <path {...shared} d="M5 16.5h8" />
          <path {...shared} d="M4 4.5h16v15H4z" />
        </svg>
      );
    case "bookings":
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
          <path {...shared} d="M7 3.5v3" />
          <path {...shared} d="M17 3.5v3" />
          <path {...shared} d="M4 8.5h16" />
          <path {...shared} d="M5 5.5h14v14H5z" />
          <path {...shared} d="M9 13h6" />
        </svg>
      );
    case "shop":
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
          <path {...shared} d="M6 7h15l-1.5 7.5H8L6 4.5H3" />
          <circle cx="9.5" cy="18" r="1.25" fill={stroke} />
          <circle cx="18" cy="18" r="1.25" fill={stroke} />
        </svg>
      );
    case "admins":
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
          <path {...shared} d="M16.5 18.5a4.5 4.5 0 0 0-9 0" />
          <circle cx="12" cy="8" r="3" {...shared} />
          <path {...shared} d="M20 9.5v5" />
          <path {...shared} d="M17.5 12h5" />
        </svg>
      );
    case "history":
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
          <path {...shared} d="M4.5 12A7.5 7.5 0 1 0 7 6.5" />
          <path {...shared} d="M4.5 4.5v4h4" />
          <path {...shared} d="M12 8.5v4l2.5 1.5" />
        </svg>
      );
  }
}

function DashboardCard({ label, value, note }: { label: string; value: string | number; note: string }) {
  return (
    <div className="rounded-[1.4rem] border border-slate-200 bg-white px-5 py-4 shadow-[0_16px_40px_rgba(15,23,42,0.05)]">
      <p className="text-[0.62rem] font-semibold uppercase tracking-[0.26em] text-slate-400">{label}</p>
      <p className="mt-3 font-display text-[1.75rem] font-semibold tracking-[-0.04em] text-[var(--foreground)]">{value}</p>
      <p className="mt-2 max-w-[17rem] text-[0.9rem] leading-6 text-slate-300">{note}</p>
    </div>
  );
}

export default function AdminPage() {
  const [email, setEmail] = useState(ADMIN_EMAIL);
  const [password, setPassword] = useState(ADMIN_PASSWORD);
  const [error, setError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.sessionStorage.getItem(ADMIN_SESSION_KEY) === "active";
  });
  const [activeTab, setActiveTab] = useState<AdminTab>("overview");

  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [orders, setOrders] = useState<StoredOrder[]>([]);
  const [services, setServices] = useState<ManagedService[]>([]);
  const [blogs, setBlogs] = useState<ManagedBlogPost[]>([]);
  const [products, setProducts] = useState<ManagedProduct[]>([]);
  const [trackingEntries, setTrackingEntries] = useState<TrackingEntry[]>([]);
  const [bookingReplies, setBookingReplies] = useState<BookingReply[]>([]);
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  const [selectedServiceSlug, setSelectedServiceSlug] = useState("");
  const [serviceDraft, setServiceDraft] = useState<ServiceDraft>(serviceToDraft());
  const [faqQuestion, setFaqQuestion] = useState("");
  const [faqAnswer, setFaqAnswer] = useState("");

  const [selectedBlogId, setSelectedBlogId] = useState("");
  const [blogDraft, setBlogDraft] = useState<BlogDraft>(blogToDraft());

  const [selectedProductId, setSelectedProductId] = useState("");
  const [productDraft, setProductDraft] = useState<ProductDraft>(productToDraft());

  const [selectedBookingId, setSelectedBookingId] = useState("");
  const [replyDraft, setReplyDraft] = useState("");
  const [replyStatus, setReplyStatus] = useState("Pending review");
  const [trackingStatus, setTrackingStatus] = useState("Device received");
  const [trackingProgress, setTrackingProgress] = useState("15");
  const [trackingMilestones, setTrackingMilestones] = useState("Device received\nDiagnostics started");
  const [trackingChart, setTrackingChart] = useState("15, 32, 48, 74");

  const [adminDraft, setAdminDraft] = useState<AdminDraft>(emptyAdminDraft());

  const selectedService = services.find((service) => service.slug === selectedServiceSlug);
  const selectedBlog = blogs.find((post) => post.id === selectedBlogId);
  const selectedProduct = products.find((product) => product.id === selectedProductId);
  const selectedBooking = bookings.find((booking) => booking.id === selectedBookingId);
  const currentReply = bookingReplies.find((reply) => reply.bookingId === selectedBookingId);
  const currentTracking = trackingEntries.find((entry) => entry.id === selectedBookingId);

  const recentHistory = useMemo(() => history.slice(0, 8), [history]);
  const dailyBookings = useMemo(() => countBookingsSince(bookings, 1), [bookings]);
  const weeklyBookings = useMemo(() => countBookingsSince(bookings, 7), [bookings]);
  const monthlyBookings = useMemo(() => countBookingsSince(bookings, 30), [bookings]);
  const bookingSeries = useMemo(() => buildBookingSeries(bookings, 7), [bookings]);
  const peakBookings = useMemo(() => Math.max(1, ...bookingSeries.map((item) => item.total)), [bookingSeries]);

  useEffect(() => {
    if (!isAuthenticated || typeof window === "undefined") return;

    const syncDashboard = async () => {
      const [
        nextBookings,
        nextOrders,
        nextServices,
        nextBlogs,
        nextProducts,
        nextTrackingEntries,
        nextBookingReplies,
        nextAdminUsers,
        nextHistory,
      ] = await Promise.all([
        readBookingRecords(),
        readStoredOrders(),
        readManagedServices(),
        readManagedBlogs(),
        readManagedProducts(),
        readTrackingEntries(),
        readBookingReplies(),
        readAdminUsers(),
        readAdminHistory(),
      ]);

      setBookings(nextBookings as BookingRecord[]);
      setOrders(nextOrders as StoredOrder[]);
      setServices(nextServices);
      setBlogs(nextBlogs);
      setProducts(nextProducts);
      setTrackingEntries(nextTrackingEntries);
      setBookingReplies(nextBookingReplies);
      setAdminUsers(nextAdminUsers);
      setHistory(nextHistory);
    };

    void syncDashboard();
    window.localStorage.setItem(BOOKING_ALERT_KEY, "false");
    window.localStorage.setItem(SHOP_ADMIN_ALERT_KEY, "false");

    window.addEventListener("storage", syncDashboard);
    window.addEventListener(SHOP_EVENT, syncDashboard);
    window.addEventListener(ADMIN_DATA_EVENT, syncDashboard);

    return () => {
      window.removeEventListener("storage", syncDashboard);
      window.removeEventListener(SHOP_EVENT, syncDashboard);
      window.removeEventListener(ADMIN_DATA_EVENT, syncDashboard);
    };
  }, [isAuthenticated]);

  useEffect(() => {
    if (selectedServiceSlug === NEW_ITEM_TOKEN) return;
    if (!services.length) return;
    const target = services.find((service) => service.slug === selectedServiceSlug) ?? services[0];
    queueMicrotask(() => {
      setSelectedServiceSlug(target.slug);
      setServiceDraft(serviceToDraft(target));
    });
  }, [services, selectedServiceSlug]);

  useEffect(() => {
    if (selectedBlogId === NEW_ITEM_TOKEN) return;
    if (!blogs.length) return;
    const target = blogs.find((post) => post.id === selectedBlogId) ?? blogs[0];
    queueMicrotask(() => {
      setSelectedBlogId(target.id);
      setBlogDraft(blogToDraft(target));
    });
  }, [blogs, selectedBlogId]);

  useEffect(() => {
    if (selectedProductId === NEW_ITEM_TOKEN) return;
    if (!products.length) return;
    const target = products.find((product) => product.id === selectedProductId) ?? products[0];
    queueMicrotask(() => {
      setSelectedProductId(target.id);
      setProductDraft(productToDraft(target));
    });
  }, [products, selectedProductId]);

  useEffect(() => {
    if (!bookings.length) return;
    const target = bookings.find((booking) => booking.id === selectedBookingId) ?? bookings[0];
    queueMicrotask(() => {
      setSelectedBookingId(target.id);
    });
  }, [bookings, selectedBookingId]);

  useEffect(() => {
    if (!selectedBookingId) return;

    queueMicrotask(() => {
      setReplyDraft(currentReply?.emailReply ?? "");
      setReplyStatus(currentReply?.status ?? "Pending review");
      setTrackingStatus(currentTracking?.status ?? "Device received");
      setTrackingProgress(String(currentTracking?.progress ?? 15));
      setTrackingMilestones((currentTracking?.milestones ?? ["Device received", "Diagnostics started"]).join("\n"));
      setTrackingChart((currentTracking?.chartPoints ?? [15, 32, 48, 74]).join(", "));
    });
  }, [selectedBookingId, currentReply, currentTracking]);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!(await isValidAdminLogin(email, password))) {
      setError("Invalid admin email or password.");
      return;
    }

    window.sessionStorage.setItem(ADMIN_SESSION_KEY, "active");
    setIsAuthenticated(true);
    setError("");
  };

  const handleLogout = () => {
    window.sessionStorage.removeItem(ADMIN_SESSION_KEY);
    setIsAuthenticated(false);
  };

  const handleBlogImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const image = await readImageFile(file);
      setBlogDraft((current) => ({ ...current, image }));
    } finally {
      event.target.value = "";
    }
  };

  const handleProductImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const image = await readImageFile(file);
      setProductDraft((current) => ({ ...current, image }));
    } finally {
      event.target.value = "";
    }
  };

  const resetServiceDraft = () => {
    setSelectedServiceSlug(NEW_ITEM_TOKEN);
    setServiceDraft(serviceToDraft());
    setFaqQuestion("");
    setFaqAnswer("");
  };

  const saveService = async () => {
    const nextSlug = slugify(serviceDraft.slug || serviceDraft.label);
    const existingFaqs = selectedServiceSlug && selectedServiceSlug !== NEW_ITEM_TOKEN ? services.find((item) => item.slug === selectedServiceSlug)?.faqs ?? [] : [];
    const nextService: ManagedService = {
      slug: nextSlug,
      code: serviceDraft.code || `NINO-SVC-${Date.now().toString().slice(-4)}`,
      label: serviceDraft.label,
      title: serviceDraft.title,
      summary: serviceDraft.summary,
      details: serviceDraft.details,
      imageLabel: serviceDraft.imageLabel,
      imageNote: serviceDraft.imageNote,
      advisory: serviceDraft.advisory,
      checks: splitList(serviceDraft.checks),
      parts: splitList(serviceDraft.parts)
        .map((line) => line.split("|").map((part) => part.trim()))
        .filter((parts) => parts.length >= 3)
        .map(([name, info, fit]) => ({ name, info, fit })),
      faqs: existingFaqs,
    };

    const nextServices = selectedServiceSlug && selectedServiceSlug !== NEW_ITEM_TOKEN
      ? services.map((item) => (item.slug === selectedServiceSlug ? nextService : item))
      : [nextService, ...services];

    await writeManagedServices(nextServices);
    await appendAdminHistory(selectedServiceSlug && selectedServiceSlug !== NEW_ITEM_TOKEN ? "Updated" : "Created", "Service", nextService.label);
    setSelectedServiceSlug(nextService.slug);
  };

  const deleteService = async (slug: string) => {
    const target = services.find((service) => service.slug === slug);
    if (!target) return;
    await writeManagedServices(services.filter((service) => service.slug !== slug));
    await appendAdminHistory("Deleted", "Service", target.label);
    resetServiceDraft();
  };

  const addFaqToService = async () => {
    if (!selectedService || !faqQuestion.trim() || !faqAnswer.trim()) return;

    const nextServices = services.map((service) =>
      service.slug === selectedService.slug
        ? {
            ...service,
            faqs: [
              ...service.faqs,
              {
                id: `${service.slug}-faq-${Date.now().toString().slice(-4)}`,
                question: faqQuestion.trim(),
                answer: faqAnswer.trim(),
              },
            ],
          }
        : service,
    );

    await writeManagedServices(nextServices);
    await appendAdminHistory("Updated", "Service FAQ", `${selectedService.label} FAQ added`);
    setFaqQuestion("");
    setFaqAnswer("");
  };

  const deleteFaq = async (serviceSlug: string, faqId: string) => {
    const target = services.find((service) => service.slug === serviceSlug);
    if (!target) return;

    await writeManagedServices(
      services.map((service) =>
        service.slug === serviceSlug
          ? { ...service, faqs: service.faqs.filter((faq) => faq.id !== faqId) }
          : service,
      ),
    );
    await appendAdminHistory("Deleted", "Service FAQ", `${target.label} FAQ removed`);
  };

  const resetBlogDraft = () => {
    setSelectedBlogId(NEW_ITEM_TOKEN);
    setBlogDraft(blogToDraft());
  };

  const saveBlog = async () => {
    const nextBlog: ManagedBlogPost = {
      id: blogDraft.id || `blog-${Date.now().toString().slice(-6)}`,
      title: blogDraft.title,
      excerpt: blogDraft.excerpt,
      content: blogDraft.content,
      image: blogDraft.image,
      createdAt: selectedBlog?.createdAt ?? new Date().toISOString(),
    };

    const nextBlogs = selectedBlogId && selectedBlogId !== NEW_ITEM_TOKEN
      ? blogs.map((post) => (post.id === selectedBlogId ? nextBlog : post))
      : [nextBlog, ...blogs];

    await writeManagedBlogs(nextBlogs);
    await appendAdminHistory(selectedBlogId && selectedBlogId !== NEW_ITEM_TOKEN ? "Updated" : "Created", "Blog", nextBlog.title);
    setSelectedBlogId(nextBlog.id);
  };

  const deleteBlog = async (id: string) => {
    const target = blogs.find((post) => post.id === id);
    if (!target) return;
    await writeManagedBlogs(blogs.filter((post) => post.id !== id));
    await appendAdminHistory("Deleted", "Blog", target.title);
    resetBlogDraft();
  };

  const resetProductDraft = () => {
    setSelectedProductId(NEW_ITEM_TOKEN);
    setProductDraft(productToDraft());
  };

  const saveProduct = async () => {
    const nextProduct: ManagedProduct = {
      id: productDraft.id || slugify(productDraft.name),
      name: productDraft.name,
      category: productDraft.category,
      description: productDraft.description,
      price: Number(productDraft.price || 0),
      colors: splitList(productDraft.colors),
      sizes: splitList(productDraft.sizes),
      image: productDraft.image,
      stock: productDraft.stock,
      trackingNote: productDraft.trackingNote,
    };

    const nextProducts = selectedProductId && selectedProductId !== NEW_ITEM_TOKEN
      ? products.map((product) => (product.id === selectedProductId ? nextProduct : product))
      : [nextProduct, ...products];

    await writeManagedProducts(nextProducts);
    await appendAdminHistory(selectedProductId && selectedProductId !== NEW_ITEM_TOKEN ? "Updated" : "Created", "Product", nextProduct.name);
    setSelectedProductId(nextProduct.id);
  };

  const deleteProduct = async (id: string) => {
    const target = products.find((product) => product.id === id);
    if (!target) return;
    await writeManagedProducts(products.filter((product) => product.id !== id));
    await appendAdminHistory("Deleted", "Product", target.name);
    resetProductDraft();
  };

  const saveBookingResponse = async () => {
    if (!selectedBooking) return;

    const nextReply: BookingReply = {
      bookingId: selectedBooking.id,
      status: replyStatus,
      emailReply: replyDraft,
      updatedAt: new Date().toISOString(),
    };

    const nextReplies = currentReply
      ? bookingReplies.map((reply) => (reply.bookingId === selectedBooking.id ? nextReply : reply))
      : [nextReply, ...bookingReplies];

    const nextTracking: TrackingEntry = {
      id: selectedBooking.id,
      service: selectedBooking.service,
      customerName: selectedBooking.customerName,
      email: selectedBooking.email,
      status: trackingStatus,
      progress: Math.max(0, Math.min(100, Number(trackingProgress || 0))),
      updatedAt: new Date().toISOString(),
      milestones: splitList(trackingMilestones),
      chartPoints: splitList(trackingChart).map((item) => Math.max(0, Math.min(100, Number(item || 0)))),
    };

    const nextTrackingEntries = currentTracking
      ? trackingEntries.map((entry) => (entry.id === selectedBooking.id ? nextTracking : entry))
      : [nextTracking, ...trackingEntries];

    await Promise.all([
      writeBookingReplies(nextReplies),
      writeTrackingEntries(nextTrackingEntries),
    ]);
    await appendAdminHistory("Updated", "Booking", `${selectedBooking.id} reply and tracking saved`);
  };

  const saveAdminUser = async () => {
    if (!adminDraft.name || !adminDraft.email || !adminDraft.password) return;

    const nextUser: AdminUser = {
      id: `admin-${Date.now().toString().slice(-6)}`,
      name: adminDraft.name,
      email: adminDraft.email,
      password: adminDraft.password,
      role: adminDraft.role,
      createdAt: new Date().toISOString(),
    };

    await writeAdminUsers([nextUser, ...adminUsers]);
    await appendAdminHistory("Created", "Admin", nextUser.email);
    setAdminDraft(emptyAdminDraft());
  };

  const deleteAdminUser = async (id: string) => {
    const target = adminUsers.find((user) => user.id === id);
    if (!target || target.email === ADMIN_EMAIL) return;

    await writeAdminUsers(adminUsers.filter((user) => user.id !== id));
    await appendAdminHistory("Deleted", "Admin", target.email);
  };

  if (!isAuthenticated) {
    return (
      <main className="bg-white">
        <section className="section-shell flex min-h-[calc(100vh-10rem)] items-center py-20">
          <div className="grid w-full gap-10 lg:grid-cols-[0.96fr_1.04fr] lg:items-center lg:gap-12">
            <div className="max-w-xl space-y-6">
              <span className="inline-flex rounded-full border border-[var(--accent)]/20 bg-[var(--accent)]/8 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--accent)]">
                Admin Login
              </span>
              <h1 className="font-display text-[2rem] font-semibold leading-[1.02] tracking-[-0.04em] text-slate-950 sm:text-[2.5rem]">
                Sign in to manage services, blogs, bookings, shop stock, tracking progress, and admin access.
              </h1>
              <p className="max-w-2xl text-base leading-8 text-slate-600">
                The admin side now controls the live service, blog, shop, and repair-tracking pages through a shared client-side data layer.
              </p>
              <div className="rounded-[1.6rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff,#f8fafc)] p-5 text-sm leading-7 text-slate-600 shadow-[0_18px_50px_rgba(15,23,42,0.05)]">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">Demo Credentials</p>
                <p className="mt-3">Email: {ADMIN_EMAIL}</p>
                <p>Password: {ADMIN_PASSWORD}</p>
              </div>
            </div>

            <form
              onSubmit={handleLogin}
              className="rounded-[2rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff,#f8fafc)] p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] sm:p-8"
            >
              <div className="space-y-6">
                <div>
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">Admin access</p>
                  <h2 className="mt-4 font-display text-[1.7rem] font-semibold tracking-[-0.04em] text-slate-950 sm:text-[2rem]">Welcome back.</h2>
                </div>

                <label className="block space-y-3">
                  <span className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-slate-500">Email</span>
                  <input
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="w-full rounded-[1.2rem] border border-slate-200 bg-white px-4 py-4 text-slate-950 outline-none transition-colors duration-300 placeholder:text-slate-400 focus:border-[var(--accent)]"
                    placeholder="admin@ninoelectronics.com"
                  />
                </label>

                <label className="block space-y-3">
                  <span className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-slate-500">Password</span>
                  <input
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="w-full rounded-[1.2rem] border border-slate-200 bg-white px-4 py-4 text-slate-950 outline-none transition-colors duration-300 placeholder:text-slate-400 focus:border-[var(--accent)]"
                    placeholder="Enter admin password"
                  />
                </label>

                {error ? <p className="text-sm text-[#ff8f2a]">{error}</p> : null}

                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-full bg-[var(--accent)] px-5 py-4 text-[0.76rem] font-semibold uppercase tracking-[0.24em] text-white transition-transform duration-300 hover:-translate-y-0.5"
                >
                  Sign In
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="bg-[var(--background)] text-[var(--foreground)]">
      <section className="w-full py-8 pr-2 pl-0 sm:py-10 sm:pr-3 sm:pl-0 lg:py-12 lg:pr-4 lg:pl-0">
        <div className="grid gap-6 xl:grid-cols-[5.9rem_minmax(0,1fr)]">
          <aside className="rounded-r-[2rem] rounded-l-none border border-l-0 border-slate-200 bg-[linear-gradient(180deg,#0f172a,#1e293b)] px-2 py-4 shadow-[0_28px_90px_rgba(15,23,42,0.06)]">
            <div className="flex min-h-[8.25rem] flex-col items-center justify-center rounded-[1.35rem] border border-slate-200 bg-white px-3 py-4 text-center">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-[var(--accent-2)]">NINO Control</p>
              <h1 className="mt-2 font-display text-[0.86rem] font-semibold tracking-[-0.03em] text-[var(--foreground)]">Admin</h1>
              <p className="mt-1 text-[0.62rem] leading-5 text-slate-400">Control desk</p>
            </div>

            <div className="mt-5 space-y-2 pr-0">
              {[
                ["overview", "Overview"],
                ["services", "Services"],
                ["blogs", "Blogs"],
                ["bookings", "Bookings"],
                ["shop", "Shop"],
                ["admins", "Admins"],
                ["history", "History"],
              ].map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setActiveTab(value as AdminTab)}
                  title={label}
                  aria-label={label}
                  className={`flex w-full items-center justify-center rounded-[1.2rem] px-3 py-3 text-left text-sm font-medium transition-colors duration-300 ${
                    activeTab === value ? "bg-[var(--accent)] text-white" : "bg-white/[0.7] text-[var(--foreground)] hover:bg-[var(--accent)]/10"
                  }`}
                >
                  <SidebarIcon type={value as AdminTab} active={activeTab === value} />
                </button>
              ))}
            </div>

            <div className="mt-6 rounded-[1.45rem] border border-slate-200 bg-white px-3 py-4 text-center text-[0.68rem] leading-5 text-[var(--foreground)]">
              <p>Live links</p>
              <p className="mt-2 text-slate-400">4 pages</p>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              title="Log out"
              aria-label="Log out"
              className="mt-6 inline-flex w-full items-center justify-center rounded-full border border-slate-200 bg-white px-3 py-3 text-[var(--foreground)]"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                <path d="M14 7.5V5.75A1.75 1.75 0 0 0 12.25 4h-5.5A1.75 1.75 0 0 0 5 5.75v12.5C5 19.216 5.784 20 6.75 20h5.5A1.75 1.75 0 0 0 14 18.25V16.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M10.5 12h8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                <path d="m15.5 8 3.5 4-3.5 4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </aside>

          <div className="space-y-5 pr-1 sm:pr-2 lg:pr-3">
            <div className="grid max-w-[69rem] gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <DashboardCard label="Bookings" value={bookings.length} note="Requests from the booking form." />
              <DashboardCard label="Products" value={products.length} note="Live items on the customer shop." />
              <DashboardCard label="Services" value={services.length} note="Active service tabs and FAQs." />
              <DashboardCard label="Admins" value={adminUsers.length} note="Authorized local admin accounts." />
            </div>

            {activeTab === "overview" ? (
              <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
                <section className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-[0_18px_50px_rgba(15,23,42,0.05)] lg:p-6">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-[var(--accent-2)]">Control overview</p>
                      <h2 className="mt-3 font-display text-[1.65rem] font-semibold tracking-[-0.04em] text-[var(--foreground)]">The admin desk now controls the live customer pages.</h2>
                    </div>
                    <Link href="/service" className="rounded-full border border-slate-200 px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-slate-700">
                      Open live site
                    </Link>
                  </div>

                  <div className="mt-5 grid max-w-[69rem] gap-3 sm:grid-cols-2 xl:grid-cols-4">
                    <div className="rounded-[1.3rem] border border-slate-200 bg-white px-4 py-4 text-[0.9rem] leading-6 text-slate-900">
                      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-[var(--accent-2)]">Bookings waiting</p>
                      <p className="mt-2 font-display text-[1.55rem] font-semibold tracking-[-0.04em] text-[var(--foreground)]">{bookings.length}</p>
                      <p className="mt-2">Open requests waiting for a reply or tracking update.</p>
                    </div>
                    <div className="rounded-[1.3rem] border border-slate-200 bg-white px-4 py-4 text-[0.9rem] leading-6 text-slate-900">
                      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-[var(--accent-2)]">Shop orders</p>
                      <p className="mt-2 font-display text-[1.55rem] font-semibold tracking-[-0.04em] text-[var(--foreground)]">{orders.length}</p>
                      <p className="mt-2">Orders stored from the customer shop flow.</p>
                    </div>
                    <div className="rounded-[1.3rem] border border-slate-200 bg-white px-4 py-4 text-[0.9rem] leading-6 text-slate-900">
                      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-[var(--accent-2)]">Today</p>
                      <p className="mt-2 font-display text-[1.55rem] font-semibold tracking-[-0.04em] text-[var(--foreground)]">{dailyBookings}</p>
                      <p className="mt-2">Bookings created since midnight.</p>
                    </div>
                    <div className="rounded-[1.3rem] border border-slate-200 bg-white px-4 py-4 text-[0.9rem] leading-6 text-slate-900">
                      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-[var(--accent-2)]">Month</p>
                      <p className="mt-2 font-display text-[1.55rem] font-semibold tracking-[-0.04em] text-[var(--foreground)]">{monthlyBookings}</p>
                      <p className="mt-2">Rolling 30-day booking total.</p>
                    </div>
                  </div>

                  <div className="mt-5 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
                    <div className="rounded-[1.35rem] border border-slate-200 bg-white px-4 py-4 text-[0.9rem] leading-6 text-slate-900">
                      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-[var(--accent-2)]">Booking monitor</p>
                      <div className="mt-4 grid gap-3 sm:grid-cols-3">
                        <div className="rounded-[1rem] border border-slate-200 bg-[#f8fafc] px-4 py-3">
                          <p className="text-[0.64rem] uppercase tracking-[0.2em] text-slate-500">Daily</p>
                          <p className="mt-1.5 font-display text-[1.3rem] font-semibold text-[var(--foreground)]">{dailyBookings}</p>
                        </div>
                        <div className="rounded-[1rem] border border-slate-200 bg-[#f8fafc] px-4 py-3">
                          <p className="text-[0.64rem] uppercase tracking-[0.2em] text-slate-500">Weekly</p>
                          <p className="mt-1.5 font-display text-[1.3rem] font-semibold text-[var(--foreground)]">{weeklyBookings}</p>
                        </div>
                        <div className="rounded-[1rem] border border-slate-200 bg-[#f8fafc] px-4 py-3">
                          <p className="text-[0.64rem] uppercase tracking-[0.2em] text-slate-500">Monthly</p>
                          <p className="mt-1.5 font-display text-[1.3rem] font-semibold text-[var(--foreground)]">{monthlyBookings}</p>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-[1.35rem] border border-slate-200 bg-white px-4 py-4 text-[0.9rem] leading-6 text-slate-900">
                      <div className="flex items-center justify-between gap-4">
                        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-[var(--accent-2)]">7-day graph</p>
                        <p className="text-[0.68rem] uppercase tracking-[0.2em] text-slate-500">Peak {peakBookings}</p>
                      </div>
                      <div className="mt-4 flex h-[11.5rem] items-end gap-2.5">
                        {bookingSeries.map((item) => (
                          <div key={item.label} className="flex flex-1 flex-col items-center justify-end gap-2.5">
                            <span className="text-[0.68rem] text-slate-400">{item.total}</span>
                            <div className="flex h-full w-full items-end rounded-full bg-[#eef2f7] px-1.5 py-1.5">
                              <div
                                className="w-full rounded-full bg-[linear-gradient(180deg,#ffb15f,#ff7a18)]"
                                style={{ height: `${Math.max((item.total / peakBookings) * 100, item.total ? 16 : 4)}%` }}
                              />
                            </div>
                            <span className="text-[0.64rem] uppercase tracking-[0.18em] text-slate-500">{item.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>

                <section className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-[0_18px_50px_rgba(15,23,42,0.05)] lg:p-6">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-[var(--accent-2)]">Recent history</p>
                  <div className="mt-5 space-y-3">
                    {recentHistory.length ? (
                      recentHistory.map((entry) => (
                        <div key={entry.id} className="rounded-[1.3rem] border border-slate-200 bg-[#f8fafc] p-4 text-sm leading-7 text-[var(--foreground)]">
                          <p className="font-medium text-[var(--foreground)]">{entry.action} {entry.entity}</p>
                          <p className="mt-1">{entry.detail}</p>
                          <p className="mt-2 text-[0.72rem] uppercase tracking-[0.18em] text-slate-500">{formatDate(entry.createdAt)}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm leading-7 text-slate-400">No admin history yet.</p>
                    )}
                  </div>
                </section>
              </div>
            ) : null}

            {activeTab === "services" ? (
              <div className="grid gap-6 xl:grid-cols-[0.84fr_1.16fr]">
                <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.05)]">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-[var(--accent-2)]">Services</p>
                      <h2 className="mt-3 font-display text-[1.7rem] font-semibold tracking-[-0.04em] text-[var(--foreground)]">Service menu and FAQs</h2>
                    </div>
                    <button type="button" onClick={resetServiceDraft} className="rounded-full border border-slate-200 px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-slate-700">New service</button>
                  </div>

                  <div className="mt-6 space-y-3">
                    {services.map((service) => (
                      <button
                        key={service.slug}
                        type="button"
                        onClick={() => {
                          setSelectedServiceSlug(service.slug);
                          setServiceDraft(serviceToDraft(service));
                        }}
                        className={`w-full rounded-[1.3rem] border px-4 py-4 text-left ${selectedServiceSlug === service.slug ? "border-[var(--accent)] bg-[var(--accent)]/12" : "border-slate-200 bg-[#f8fafc]"}`}
                      >
                        <p className="font-medium text-[var(--foreground)]">{service.label}</p>
                        <p className="mt-2 text-sm leading-7 text-slate-400">{service.title}</p>
                      </button>
                    ))}
                  </div>
                </section>

                <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.05)]">
                  <div className="grid gap-4 md:grid-cols-2">
                    {[
                      ["slug", "Slug"],
                      ["code", "Code"],
                      ["label", "Label"],
                      ["imageLabel", "Image label"],
                    ].map(([key, label]) => (
                      <label key={key} className="space-y-2">
                        <span className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-slate-400">{label}</span>
                        <input
                          value={serviceDraft[key as keyof ServiceDraft]}
                          onChange={(event) => setServiceDraft((current) => ({ ...current, [key]: event.target.value }))}
                          className="w-full rounded-[1rem] border border-slate-200 bg-white px-4 py-3 text-[var(--foreground)] outline-none"
                        />
                      </label>
                    ))}
                  </div>

                  <div className="mt-4 grid gap-4">
                    {[
                      ["title", "Title"],
                      ["summary", "Summary"],
                      ["details", "Details"],
                      ["imageNote", "Image note"],
                      ["advisory", "Advisory"],
                    ].map(([key, label]) => (
                      <label key={key} className="space-y-2">
                        <span className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-slate-400">{label}</span>
                        <textarea
                          rows={key === "summary" || key === "title" ? 2 : 4}
                          value={serviceDraft[key as keyof ServiceDraft]}
                          onChange={(event) => setServiceDraft((current) => ({ ...current, [key]: event.target.value }))}
                          className="w-full rounded-[1rem] border border-slate-200 bg-white px-4 py-3 text-[var(--foreground)] outline-none"
                        />
                      </label>
                    ))}
                  </div>

                  <div className="mt-4 grid gap-4 lg:grid-cols-2">
                    <label className="space-y-2">
                      <span className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-slate-400">Checks</span>
                      <textarea
                        rows={6}
                        value={serviceDraft.checks}
                        onChange={(event) => setServiceDraft((current) => ({ ...current, checks: event.target.value }))}
                        className="w-full rounded-[1rem] border border-slate-200 bg-white px-4 py-3 text-[var(--foreground)] outline-none"
                        placeholder="One per line"
                      />
                    </label>
                    <label className="space-y-2">
                      <span className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-slate-400">Parts</span>
                      <textarea
                        rows={6}
                        value={serviceDraft.parts}
                        onChange={(event) => setServiceDraft((current) => ({ ...current, parts: event.target.value }))}
                        className="w-full rounded-[1rem] border border-slate-200 bg-white px-4 py-3 text-[var(--foreground)] outline-none"
                        placeholder="Name | Info | Fit"
                      />
                    </label>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-3">
                    <button type="button" onClick={saveService} className="rounded-full bg-[var(--accent)] px-5 py-3 text-[0.74rem] font-semibold uppercase tracking-[0.22em] text-white">Save service</button>
                    {selectedServiceSlug && selectedServiceSlug !== NEW_ITEM_TOKEN ? <button type="button" onClick={() => deleteService(selectedServiceSlug)} className="rounded-full border border-slate-200 px-5 py-3 text-[0.74rem] font-semibold uppercase tracking-[0.22em] text-slate-700">Delete service</button> : null}
                  </div>

                  {selectedService ? (
                    <div className="mt-8 rounded-[1.6rem] border border-slate-200 bg-[#f8fafc] p-5">
                      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-[var(--accent-2)]">FAQs</p>
                      <div className="mt-4 space-y-3">
                        {selectedService.faqs.map((faq) => (
                          <div key={faq.id} className="rounded-[1.2rem] border border-slate-200 bg-[#f8fafc] p-4">
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <p className="font-medium text-[var(--foreground)]">{faq.question}</p>
                                <p className="mt-2 text-sm leading-7 text-slate-300">{faq.answer}</p>
                              </div>
                              <button type="button" onClick={() => deleteFaq(selectedService.slug, faq.id)} className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-[var(--accent-2)]">Delete</button>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-5 grid gap-4">
                        <input value={faqQuestion} onChange={(event) => setFaqQuestion(event.target.value)} placeholder="FAQ question" className="w-full rounded-[1rem] border border-slate-200 bg-[#f8fafc] px-4 py-3 text-[var(--foreground)] outline-none" />
                        <textarea value={faqAnswer} onChange={(event) => setFaqAnswer(event.target.value)} rows={4} placeholder="FAQ answer" className="w-full rounded-[1rem] border border-slate-200 bg-[#f8fafc] px-4 py-3 text-[var(--foreground)] outline-none" />
                        <button type="button" onClick={addFaqToService} className="w-fit rounded-full bg-[var(--accent)] px-5 py-3 text-[0.74rem] font-semibold uppercase tracking-[0.22em] text-white">Add FAQ</button>
                      </div>
                    </div>
                  ) : null}
                </section>
              </div>
            ) : null}

            {activeTab === "blogs" ? (
              <div className="grid gap-6 xl:grid-cols-[0.84fr_1.16fr]">
                <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.05)]">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-[var(--accent-2)]">Blogs</p>
                      <h2 className="mt-3 font-display text-[1.7rem] font-semibold tracking-[-0.04em] text-[var(--foreground)]">Publish and delete posts</h2>
                    </div>
                    <button type="button" onClick={resetBlogDraft} className="rounded-full border border-slate-200 px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-slate-700">New post</button>
                  </div>

                  <div className="mt-6 space-y-3">
                    {blogs.length ? (
                      blogs.map((post) => (
                        <button
                          key={post.id}
                          type="button"
                          onClick={() => {
                            setSelectedBlogId(post.id);
                            setBlogDraft(blogToDraft(post));
                          }}
                        className={`w-full rounded-[1.3rem] border px-4 py-4 text-left ${selectedBlogId === post.id ? "border-[var(--accent)] bg-[var(--accent)]/12" : "border-slate-200 bg-[#f8fafc]"}`}
                        >
                          <p className="font-medium text-[var(--foreground)]">{post.title}</p>
                          <p className="mt-2 text-sm leading-7 text-slate-400">{post.excerpt}</p>
                        </button>
                      ))
                    ) : (
                      <div className="relative overflow-hidden rounded-[1.45rem] border border-slate-200 bg-[radial-gradient(circle_at_top_left,rgba(255,176,95,0.16),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(88,163,255,0.10),transparent_28%),linear-gradient(180deg,#ffffff,#f8fafc)] p-5 shadow-[0_18px_48px_rgba(15,23,42,0.08)]">
                        <div className="absolute -right-10 top-0 h-28 w-28 rounded-full bg-[radial-gradient(circle,rgba(255,156,64,0.24),transparent_70%)] blur-2xl animate-pulse" />
                        <div className="absolute -left-8 bottom-0 h-32 w-32 rounded-full bg-[radial-gradient(circle,rgba(88,163,255,0.18),transparent_70%)] blur-2xl animate-pulse" />
                        <div className="relative">
                          <span className="inline-flex rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-[var(--accent-2)]">
                            No posts yet
                          </span>
                          <h3 className="mt-4 max-w-[12ch] font-display text-[1.3rem] font-semibold tracking-[-0.03em] text-[var(--foreground)]">
                            The blog desk is ready for the first upload.
                          </h3>
                          <p className="mt-3 text-sm leading-7 text-slate-300">
                            Use the editor on the right to add a title, upload an image, write the content, and publish the first article.
                          </p>
                          <div className="mt-4 rounded-[1rem] border border-slate-200 bg-[#f8fafc] px-4 py-3 text-[0.72rem] uppercase tracking-[0.2em] text-slate-400">
                            New posts will appear here instantly
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </section>

                <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.05)]">
                  <div className="grid gap-5">
                    {[
                      ["id", "Post ID"],
                      ["title", "Title"],
                    ].map(([key, label]) => (
                      <label key={key} className="space-y-2.5">
                        <span className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-slate-400">{label}</span>
                        <input
                          value={blogDraft[key as keyof BlogDraft]}
                          onChange={(event) => setBlogDraft((current) => ({ ...current, [key]: event.target.value }))}
                          className="w-full rounded-[1rem] border border-slate-200 bg-white px-4 py-3.5 text-sm leading-6 text-[var(--foreground)] outline-none"
                        />
                      </label>
                    ))}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-slate-400">Upload image</span>
                        {blogDraft.image ? (
                          <button
                            type="button"
                            onClick={() => setBlogDraft((current) => ({ ...current, image: "" }))}
                            className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[var(--accent-2)]"
                          >
                            Clear image
                          </button>
                        ) : null}
                      </div>
                      <label className="flex cursor-pointer flex-col items-center justify-center rounded-[1.2rem] border border-dashed border-slate-300 bg-[#f8fafc] px-4 py-6 text-center transition-colors duration-300 hover:border-[var(--accent)]/50 hover:bg-[#fff7ed]">
                        <input type="file" accept="image/*" onChange={handleBlogImageUpload} className="hidden" />
                        <span className="text-sm font-medium text-[var(--foreground)]">Choose blog image</span>
                        <span className="mt-2 text-[0.82rem] leading-6 text-slate-400">Upload from your device. The image will be saved locally in the admin data.</span>
                      </label>
                      {blogDraft.image ? (
                        <div className="overflow-hidden rounded-[1.2rem] border border-slate-200 bg-white p-3">
                          <img src={blogDraft.image} alt="Blog preview" className="h-44 w-full rounded-[0.9rem] object-cover" />
                        </div>
                      ) : null}
                    </div>
                    <label className="space-y-2.5">
                      <span className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-slate-400">Excerpt</span>
                      <textarea rows={3} value={blogDraft.excerpt} onChange={(event) => setBlogDraft((current) => ({ ...current, excerpt: event.target.value }))} className="w-full rounded-[1rem] border border-slate-200 bg-white px-4 py-3.5 text-sm leading-6 text-[var(--foreground)] outline-none" />
                    </label>
                    <label className="space-y-2.5">
                      <span className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-slate-400">Content</span>
                      <textarea rows={8} value={blogDraft.content} onChange={(event) => setBlogDraft((current) => ({ ...current, content: event.target.value }))} className="w-full rounded-[1rem] border border-slate-200 bg-white px-4 py-3.5 text-sm leading-6 text-[var(--foreground)] outline-none" />
                    </label>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-3">
                    <button type="button" onClick={saveBlog} className="rounded-full bg-[var(--accent)] px-5 py-3 text-[0.74rem] font-semibold uppercase tracking-[0.22em] text-white">Save blog</button>
                    {selectedBlogId && selectedBlogId !== NEW_ITEM_TOKEN ? <button type="button" onClick={() => deleteBlog(selectedBlogId)} className="rounded-full border border-slate-200 px-5 py-3 text-[0.74rem] font-semibold uppercase tracking-[0.22em] text-slate-700">Delete blog</button> : null}
                  </div>
                </section>
              </div>
            ) : null}

            {activeTab === "bookings" ? (
              <div className="grid gap-6 xl:grid-cols-[0.86fr_1.14fr]">
                <section className="rounded-[2rem] border border-slate-200 bg-white p-5 shadow-[0_18px_50px_rgba(15,23,42,0.05)] lg:p-6">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-[var(--accent-2)]">Bookings</p>
                  <h2 className="mt-3 font-display text-[1.7rem] font-semibold tracking-[-0.04em] text-[var(--foreground)]">Customer requests and responses</h2>
                  <div className="mt-6 space-y-3">
                    {bookings.map((booking) => (
                      <button
                        key={booking.id}
                        type="button"
                        onClick={() => setSelectedBookingId(booking.id)}
                        className={`w-full rounded-[1.3rem] border px-4 py-4 text-left ${selectedBookingId === booking.id ? "border-[var(--accent)] bg-[var(--accent)]/12" : "border-slate-200 bg-[#f8fafc]"}`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="font-medium text-[var(--foreground)]">{booking.customerName}</p>
                            <p className="mt-2 text-sm leading-7 text-slate-400">{booking.service} / {booking.part}</p>
                          </div>
                          <p className="text-[0.72rem] uppercase tracking-[0.18em] text-slate-500">{booking.id}</p>
                        </div>
                      </button>
                    ))}
                    {!bookings.length ? <p className="text-sm leading-7 text-slate-400">No bookings have been submitted yet.</p> : null}
                  </div>
                </section>

                <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.05)]">
                  {selectedBooking ? (
                    <>
                      <div className="rounded-[1.5rem] border border-slate-200 bg-[#f8fafc] p-5">
                        <div className="flex flex-wrap items-start justify-between gap-4">
                          <div>
                            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-[var(--accent-2)]">Selected booking</p>
                            <h3 className="mt-3 font-display text-[1.5rem] font-semibold tracking-[-0.04em] text-[var(--foreground)]">{selectedBooking.customerName}</h3>
                          </div>
                          <a href={mailtoLink(selectedBooking.email, `Update for ${selectedBooking.id}`, replyDraft || "Your booking update from NINO.")} className="rounded-full border border-slate-200 px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-slate-700">
                            Open email reply
                          </a>
                        </div>
                        <div className="mt-5 grid gap-3 text-sm leading-7 text-slate-300 sm:grid-cols-2">
                          <p>Email: {selectedBooking.email}</p>
                          <p>Phone: {selectedBooking.phone}</p>
                          <p>Location: {selectedBooking.location}</p>
                          <p>Created: {formatDate(selectedBooking.createdAt)}</p>
                        </div>
                      </div>

                      <div className="mt-5 grid gap-4 lg:grid-cols-2">
                        <label className="space-y-2 lg:col-span-2">
                          <span className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-slate-400">Reply email draft</span>
                          <textarea rows={6} value={replyDraft} onChange={(event) => setReplyDraft(event.target.value)} className="w-full rounded-[1rem] border border-slate-200 bg-white px-4 py-3 text-[var(--foreground)] outline-none" />
                        </label>
                        <label className="space-y-2">
                          <span className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-slate-400">Response status</span>
                          <input value={replyStatus} onChange={(event) => setReplyStatus(event.target.value)} className="w-full rounded-[1rem] border border-slate-200 bg-white px-4 py-3 text-[var(--foreground)] outline-none" />
                        </label>
                        <label className="space-y-2">
                          <span className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-slate-400">Tracking status</span>
                          <input value={trackingStatus} onChange={(event) => setTrackingStatus(event.target.value)} className="w-full rounded-[1rem] border border-slate-200 bg-white px-4 py-3 text-[var(--foreground)] outline-none" />
                        </label>
                        <label className="space-y-2">
                          <span className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-slate-400">Progress %</span>
                          <input value={trackingProgress} onChange={(event) => setTrackingProgress(event.target.value)} className="w-full rounded-[1rem] border border-slate-200 bg-white px-4 py-3 text-[var(--foreground)] outline-none" />
                        </label>
                        <label className="space-y-2">
                          <span className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-slate-400">Chart points</span>
                          <input value={trackingChart} onChange={(event) => setTrackingChart(event.target.value)} className="w-full rounded-[1rem] border border-slate-200 bg-white px-4 py-3 text-[var(--foreground)] outline-none" placeholder="15, 35, 60, 90" />
                        </label>
                        <label className="space-y-2 lg:col-span-2">
                          <span className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-slate-400">Milestones</span>
                          <textarea rows={5} value={trackingMilestones} onChange={(event) => setTrackingMilestones(event.target.value)} className="w-full rounded-[1rem] border border-slate-200 bg-white px-4 py-3 text-[var(--foreground)] outline-none" placeholder="One milestone per line" />
                        </label>
                      </div>

                      <button type="button" onClick={saveBookingResponse} className="mt-5 rounded-full bg-[var(--accent)] px-5 py-3 text-[0.74rem] font-semibold uppercase tracking-[0.22em] text-white">Save response and tracking</button>
                    </>
                  ) : (
                    <p className="text-sm leading-7 text-slate-400">Select a booking to write a reply, store its status, and update the track-repair page.</p>
                  )}
                </section>
              </div>
            ) : null}

            {activeTab === "shop" ? (
              <div className="grid gap-6 xl:grid-cols-[0.84fr_1.16fr]">
                <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.05)]">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-[var(--accent-2)]">Shop products</p>
                      <h2 className="mt-3 font-display text-[1.7rem] font-semibold tracking-[-0.04em] text-[var(--foreground)]">Catalog and price control</h2>
                    </div>
                    <button type="button" onClick={resetProductDraft} className="rounded-full border border-slate-200 px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-slate-700">New product</button>
                  </div>

                  <div className="mt-6 space-y-3">
                    {products.map((product) => (
                      <button
                        key={product.id}
                        type="button"
                        onClick={() => {
                          setSelectedProductId(product.id);
                          setProductDraft(productToDraft(product));
                        }}
                        className={`w-full rounded-[1.3rem] border px-4 py-4 text-left ${selectedProductId === product.id ? "border-[var(--accent)] bg-[var(--accent)]/12" : "border-slate-200 bg-[#f8fafc]"}`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="font-medium text-[var(--foreground)]">{product.name}</p>
                            <p className="mt-2 text-sm leading-7 text-slate-400">{product.category}</p>
                          </div>
                          <p className="text-sm text-slate-300">NGN {product.price.toLocaleString()}</p>
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="mt-6 rounded-[1.5rem] border border-slate-200 bg-[#f8fafc] p-5 text-sm leading-7 text-slate-300">
                    <p className="font-medium text-[var(--foreground)]">Recent orders</p>
                    <div className="mt-3 space-y-3">
                      {orders.slice(0, 4).map((order) => (
                        <div key={order.id} className="rounded-[1rem] border border-slate-200 bg-[#f8fafc] p-4">
                          <p>{order.id}</p>
                          <p className="mt-1 text-slate-400">{order.items.length} item(s) • {formatDate(order.createdAt)}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.05)]">
                  <div className="grid gap-5 md:grid-cols-2">
                    {[
                      ["id", "Product ID"],
                      ["name", "Product name"],
                      ["category", "Category"],
                      ["price", "Price"],
                      ["stock", "Stock note"],
                    ].map(([key, label]) => (
                      <label key={key} className="space-y-2.5">
                        <span className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-slate-400">{label}</span>
                        <input
                          value={productDraft[key as keyof ProductDraft]}
                          onChange={(event) => setProductDraft((current) => ({ ...current, [key]: event.target.value }))}
                          className="w-full rounded-[1rem] border border-slate-200 bg-white px-4 py-3.5 text-sm leading-6 text-[var(--foreground)] outline-none"
                        />
                      </label>
                    ))}
                  </div>
                  <div className="mt-5 grid gap-5">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-slate-400">Upload image</span>
                        {productDraft.image ? (
                          <button
                            type="button"
                            onClick={() => setProductDraft((current) => ({ ...current, image: "" }))}
                            className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[var(--accent-2)]"
                          >
                            Clear image
                          </button>
                        ) : null}
                      </div>
                      <label className="flex cursor-pointer flex-col items-center justify-center rounded-[1.2rem] border border-dashed border-slate-300 bg-[#f8fafc] px-4 py-6 text-center transition-colors duration-300 hover:border-[var(--accent)]/50 hover:bg-[#fff7ed]">
                        <input type="file" accept="image/*" onChange={handleProductImageUpload} className="hidden" />
                        <span className="text-sm font-medium text-[var(--foreground)]">Choose product image</span>
                        <span className="mt-2 text-[0.82rem] leading-6 text-slate-400">Upload from your device. The image will be stored locally and used by the shop page.</span>
                      </label>
                      {productDraft.image ? (
                        <div className="overflow-hidden rounded-[1.2rem] border border-slate-200 bg-white p-3">
                          <img src={productDraft.image} alt="Product preview" className="h-44 w-full rounded-[0.9rem] object-cover" />
                        </div>
                      ) : null}
                    </div>
                    <label className="space-y-2.5">
                      <span className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-slate-400">Description</span>
                      <textarea rows={4} value={productDraft.description} onChange={(event) => setProductDraft((current) => ({ ...current, description: event.target.value }))} className="w-full rounded-[1rem] border border-slate-200 bg-white px-4 py-3.5 text-sm leading-6 text-[var(--foreground)] outline-none" />
                    </label>
                    <label className="space-y-2.5">
                      <span className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-slate-400">Colors</span>
                      <input value={productDraft.colors} onChange={(event) => setProductDraft((current) => ({ ...current, colors: event.target.value }))} className="w-full rounded-[1rem] border border-slate-200 bg-white px-4 py-3.5 text-sm leading-6 text-[var(--foreground)] outline-none" placeholder="Black, Silver" />
                    </label>
                    <label className="space-y-2.5">
                      <span className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-slate-400">Sizes</span>
                      <input value={productDraft.sizes} onChange={(event) => setProductDraft((current) => ({ ...current, sizes: event.target.value }))} className="w-full rounded-[1rem] border border-slate-200 bg-white px-4 py-3.5 text-sm leading-6 text-[var(--foreground)] outline-none" placeholder="Standard, Advanced" />
                    </label>
                    <label className="space-y-2.5">
                      <span className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-slate-400">Tracking note</span>
                      <textarea rows={4} value={productDraft.trackingNote} onChange={(event) => setProductDraft((current) => ({ ...current, trackingNote: event.target.value }))} className="w-full rounded-[1rem] border border-slate-200 bg-white px-4 py-3.5 text-sm leading-6 text-[var(--foreground)] outline-none" />
                    </label>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-3">
                    <button type="button" onClick={saveProduct} className="rounded-full bg-[var(--accent)] px-5 py-3 text-[0.74rem] font-semibold uppercase tracking-[0.22em] text-white">Save product</button>
                    {selectedProductId && selectedProductId !== NEW_ITEM_TOKEN ? <button type="button" onClick={() => deleteProduct(selectedProductId)} className="rounded-full border border-slate-200 px-5 py-3 text-[0.74rem] font-semibold uppercase tracking-[0.22em] text-slate-700">Delete product</button> : null}
                  </div>
                </section>
              </div>
            ) : null}

            {activeTab === "admins" ? (
              <div className="grid gap-6 xl:grid-cols-[0.86fr_1.14fr]">
                <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.05)]">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-[var(--accent-2)]">Admin users</p>
                  <h2 className="mt-3 font-display text-[1.7rem] font-semibold tracking-[-0.04em] text-[var(--foreground)]">Add and remove admins</h2>
                  <div className="mt-6 space-y-3">
                    {adminUsers.map((user) => (
                      <div key={user.id} className="rounded-[1.3rem] border border-slate-200 bg-[#f8fafc] p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="font-medium text-[var(--foreground)]">{user.name}</p>
                            <p className="mt-1 text-sm leading-7 text-slate-400">{user.email} • {user.role}</p>
                          </div>
                          {user.email !== ADMIN_EMAIL ? <button type="button" onClick={() => deleteAdminUser(user.id)} className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-[var(--accent-2)]">Remove</button> : <span className="text-[0.72rem] uppercase tracking-[0.2em] text-slate-500">Root</span>}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.05)]">
                  <div className="grid gap-4 md:grid-cols-2">
                    {[
                      ["name", "Name"],
                      ["email", "Email"],
                      ["password", "Password"],
                      ["role", "Role"],
                    ].map(([key, label]) => (
                      <label key={key} className="space-y-2">
                        <span className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-slate-400">{label}</span>
                        <input
                          type={key === "password" ? "password" : "text"}
                          value={adminDraft[key as keyof AdminDraft]}
                          onChange={(event) => setAdminDraft((current) => ({ ...current, [key]: event.target.value }))}
                          className="w-full rounded-[1rem] border border-slate-200 bg-white px-4 py-3 text-[var(--foreground)] outline-none"
                        />
                      </label>
                    ))}
                  </div>
                  <button type="button" onClick={saveAdminUser} className="mt-5 rounded-full bg-[var(--accent)] px-5 py-3 text-[0.74rem] font-semibold uppercase tracking-[0.22em] text-white">Add admin</button>
                </section>
              </div>
            ) : null}

            {activeTab === "history" ? (
              <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_18px_50px_rgba(15,23,42,0.05)]">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-[var(--accent-2)]">History</p>
                <h2 className="mt-3 font-display text-[1.7rem] font-semibold tracking-[-0.04em] text-[var(--foreground)]">Admin activity log</h2>
                <div className="mt-6 space-y-3">
                  {history.length ? (
                    history.map((entry) => (
                      <div key={entry.id} className="rounded-[1.3rem] border border-slate-200 bg-[#f8fafc] p-4">
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div>
                            <p className="font-medium text-[var(--foreground)]">{entry.action} {entry.entity}</p>
                            <p className="mt-1 text-sm leading-7 text-slate-300">{entry.detail}</p>
                          </div>
                          <p className="text-[0.72rem] uppercase tracking-[0.18em] text-slate-500">{formatDate(entry.createdAt)}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm leading-7 text-slate-400">No history has been recorded yet.</p>
                  )}
                </div>
              </section>
            ) : null}
          </div>
        </div>
      </section>
    </main>
  );
}
