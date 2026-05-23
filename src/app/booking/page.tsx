"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { Reveal } from "@/components/animations/reveal";
import { ADMIN_DATA_EVENT, BookingReply, readBookingReplies, readTrackingEntries, TrackingEntry } from "@/lib/admin-data";
import { appendBooking, BookingRecord, BOOKING_ALERT_KEY } from "@/lib/booking-store";
import { CONTACT_EMAILS, CONTACT_PHONE_LOCAL, CONTACT_PHONE_LOCAL_ALT } from "@/lib/site-contact";

const bookingServiceOptions = [
  "General booking",
  "ECU Repair",
  "ECU Cloning and Programming",
  "Electronics Diagnostics",
  "Board and Wiring Repair",
  "TV Repair",
  "Laptop Repair",
  "Phone Repair",
  "Module Repair",
];

const bookingHighlights = [
  "Clear repair request summary for faster technician review",
  "Direct follow-up through phone or email after submission",
  "Booking ID generated instantly for tracking and updates",
  "Suitable for personal devices, vehicle modules, and business jobs",
];

const bookingSteps = [
  {
    title: "Tell us the service you need",
    description: "Choose the repair category and describe the fault so the team understands the job before reaching out.",
  },
  {
    title: "Share your correct contact details",
    description: "Your phone number, email, and location help the team give the right response and arrange next steps quickly.",
  },
  {
    title: "Receive review and tracking updates",
    description: "Once submitted, you get a booking ID that can be used to check admin feedback and repair progress later.",
  },
];

export default function BookingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const service = searchParams.get("service") ?? "General booking";
  const part = searchParams.get("part") ?? "Not specified";
  const [id] = useState(() => searchParams.get("id") ?? `NINO-BK-${Date.now().toString().slice(-6)}`);
  const [lookupId, setLookupId] = useState(searchParams.get("id") ?? "");
  const [formData, setFormData] = useState({
    service,
    customerName: "",
    email: "",
    phone: "",
    location: "",
    request: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingReplies, setBookingReplies] = useState<BookingReply[]>([]);
  const [trackingEntries, setTrackingEntries] = useState<TrackingEntry[]>([]);

  useEffect(() => {
    const syncCustomerStatus = async () => {
      const [nextReplies, nextTrackingEntries] = await Promise.all([readBookingReplies(), readTrackingEntries()]);
      setBookingReplies(nextReplies);
      setTrackingEntries(nextTrackingEntries);
    };

    void syncCustomerStatus();
    const handleSyncCustomerStatus = () => {
      void syncCustomerStatus();
    };

    window.addEventListener("storage", handleSyncCustomerStatus);
    window.addEventListener(ADMIN_DATA_EVENT, handleSyncCustomerStatus);

    return () => {
      window.removeEventListener("storage", handleSyncCustomerStatus);
      window.removeEventListener(ADMIN_DATA_EVENT, handleSyncCustomerStatus);
    };
  }, []);

  useEffect(() => {
    if (!isSubmitted) {
      return;
    }

    const timer = window.setTimeout(() => {
      const nextParams = new URLSearchParams({ id, service: formData.service });
      router.push(`/track-repair?${nextParams.toString()}`);
    }, 1800);

    return () => {
      window.clearTimeout(timer);
    };
  }, [formData.service, id, isSubmitted, router]);

  const activeReply = useMemo(
    () => bookingReplies.find((reply) => reply.bookingId === lookupId.trim()),
    [bookingReplies, lookupId],
  );

  const activeTracking = useMemo(
    () => trackingEntries.find((entry) => entry.id === lookupId.trim()),
    [trackingEntries, lookupId],
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const bookingRecord: BookingRecord = {
      id,
      service: formData.service,
      part,
      customerName: formData.customerName,
      email: formData.email,
      phone: formData.phone,
      location: formData.location,
      request: formData.request,
      createdAt: new Date().toISOString(),
    };

    await appendBooking(bookingRecord);
    window.localStorage.setItem(BOOKING_ALERT_KEY, "true");

    setIsSubmitted(true);
    setLookupId(id);
    setFormData({
      service: formData.service,
      customerName: "",
      email: "",
      phone: "",
      location: "",
      request: "",
    });
  };

  return (
    <main className="bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_55%,#ffffff_100%)] text-slate-900">
      <section className="section-shell py-16 sm:py-20 lg:py-24">
        <div className="grid gap-8 lg:grid-cols-[0.86fr_1.14fr] lg:items-start">
          <Reveal from="left">
            <div className="space-y-6">
              <span className="inline-flex rounded-full border border-[var(--accent)]/20 bg-[var(--accent)]/10 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--accent)]">
                Professional Booking
              </span>

              <div>
                <h1 className="max-w-[12ch] font-display text-[2.4rem] font-semibold leading-[0.96] tracking-[-0.05em] text-[#0f172a] sm:text-[3.2rem]">
                  Book your repair with clear job details and faster client follow-up.
                </h1>
                <p className="mt-5 max-w-[36rem] text-[1rem] leading-8 text-slate-600">
                  This form is designed to help your client explain the fault properly, share the right contact details, and understand what happens after submitting a booking.
                </p>
              </div>

              <div className="grid gap-4">
                {bookingSteps.map((step, index) => (
                  <div key={step.title} className="rounded-[1.6rem] border border-slate-200 bg-white p-5 shadow-[0_18px_40px_rgba(15,23,42,0.05)]">
                    <div className="flex items-start gap-4">
                      <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-[#0f172a] text-sm font-semibold text-white">
                        0{index + 1}
                      </span>
                      <div>
                        <h2 className="text-[1rem] font-semibold text-[#0f172a]">{step.title}</h2>
                        <p className="mt-2 text-sm leading-7 text-slate-600">{step.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-[1.8rem] border border-slate-200 bg-[#0f172a] p-6 text-white shadow-[0_24px_60px_rgba(15,23,42,0.16)]">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-[var(--accent-2)]">
                  Client support
                </p>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[1.2rem] border border-white/10 bg-white/5 p-4">
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-slate-300">Emails</p>
                    <div className="mt-3 space-y-2 text-sm text-white">
                      {CONTACT_EMAILS.map((email) => (
                        <a key={email} href={`mailto:${email}`} className="block transition-colors duration-300 hover:text-[var(--accent-2)]">
                          {email}
                        </a>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-[1.2rem] border border-white/10 bg-white/5 p-4">
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-slate-300">Phone lines</p>
                    <p className="mt-3 text-sm text-white">{CONTACT_PHONE_LOCAL}</p>
                    <p className="mt-1 text-sm text-white">{CONTACT_PHONE_LOCAL_ALT}</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal from="right" delay={0.08}>
            <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_28px_80px_rgba(15,23,42,0.08)]">
              <div className="border-b border-slate-200 bg-[#0f172a] px-6 py-6 text-white sm:px-8">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[var(--accent-2)]">Booking request form</p>
                <h2 className="mt-3 font-display text-[1.8rem] font-semibold tracking-[-0.04em]">Submit the repair details properly</h2>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
                  Fill in the client information carefully so the team can understand the issue, contact the client correctly, and prepare the next repair step.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="p-6 sm:p-8">
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="space-y-3 sm:col-span-2">
                    <span className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-slate-500">Service type</span>
                    <select
                      value={formData.service}
                      onChange={(event) => setFormData((current) => ({ ...current, service: event.target.value }))}
                      className="w-full rounded-[1rem] border border-slate-200 bg-[#f8fafc] px-4 py-3.5 text-[0.98rem] text-slate-900 outline-none transition-colors duration-300 focus:border-[var(--accent)]"
                    >
                      {bookingServiceOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="space-y-3 sm:col-span-2">
                    <span className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-slate-500">Client full name</span>
                    <input
                      required
                      value={formData.customerName}
                      onChange={(event) => setFormData((current) => ({ ...current, customerName: event.target.value }))}
                      className="w-full rounded-[1rem] border border-slate-200 bg-[#f8fafc] px-4 py-3.5 text-slate-900 outline-none transition-colors duration-300 placeholder:text-slate-400 focus:border-[var(--accent)]"
                      placeholder="Enter the client full name"
                    />
                  </label>

                  <label className="space-y-3">
                    <span className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-slate-500">Email address</span>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(event) => setFormData((current) => ({ ...current, email: event.target.value }))}
                      className="w-full rounded-[1rem] border border-slate-200 bg-[#f8fafc] px-4 py-3.5 text-slate-900 outline-none transition-colors duration-300 placeholder:text-slate-400 focus:border-[var(--accent)]"
                      placeholder="client@email.com"
                    />
                  </label>

                  <label className="space-y-3">
                    <span className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-slate-500">Phone number</span>
                    <input
                      required
                      value={formData.phone}
                      onChange={(event) => setFormData((current) => ({ ...current, phone: event.target.value }))}
                      className="w-full rounded-[1rem] border border-slate-200 bg-[#f8fafc] px-4 py-3.5 text-slate-900 outline-none transition-colors duration-300 placeholder:text-slate-400 focus:border-[var(--accent)]"
                      placeholder="Enter the active phone number"
                    />
                  </label>

                  <label className="space-y-3 sm:col-span-2">
                    <span className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-slate-500">Location or pickup details</span>
                    <input
                      required
                      value={formData.location}
                      onChange={(event) => setFormData((current) => ({ ...current, location: event.target.value }))}
                      className="w-full rounded-[1rem] border border-slate-200 bg-[#f8fafc] px-4 py-3.5 text-slate-900 outline-none transition-colors duration-300 placeholder:text-slate-400 focus:border-[var(--accent)]"
                      placeholder="State, area, street, landmark, or delivery note"
                    />
                  </label>

                  <label className="space-y-3 sm:col-span-2">
                    <span className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-slate-500">Fault description and requested work</span>
                    <textarea
                      required
                      rows={6}
                      value={formData.request}
                      onChange={(event) => setFormData((current) => ({ ...current, request: event.target.value }))}
                      className="w-full rounded-[1rem] border border-slate-200 bg-[#f8fafc] px-4 py-3.5 text-slate-900 outline-none transition-colors duration-300 placeholder:text-slate-400 focus:border-[var(--accent)]"
                      placeholder="Explain the issue clearly. Example: device type, symptoms, when the fault started, previous repair attempt, and what you want checked or fixed."
                    />
                  </label>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[1.2rem] border border-slate-200 bg-[#f8fafc] p-4">
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-slate-500">Booking ID</p>
                    <p className="mt-2 text-sm font-semibold text-[#0f172a]">{id}</p>
                  </div>
                  <div className="rounded-[1.2rem] border border-slate-200 bg-[#f8fafc] p-4">
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-slate-500">Part or focus area</p>
                    <p className="mt-2 text-sm font-semibold text-[#0f172a]">{part}</p>
                  </div>
                </div>

                <div className="mt-6 rounded-[1.4rem] border border-[var(--accent)]/20 bg-[var(--accent)]/8 p-5">
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">Why this form is better for clients</p>
                  <ul className="mt-3 grid gap-2 text-sm leading-7 text-slate-700">
                    {bookingHighlights.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="mt-2 inline-flex size-2 rounded-full bg-[var(--accent)]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                  <p className="max-w-lg text-sm leading-7 text-slate-500">
                    After submission, the team can review the request, reply with the next instruction, and the client can reuse the booking ID on the tracking page.
                  </p>
                  <button
                    type="submit"
                    className="inline-flex items-center rounded-full bg-[var(--accent)] px-6 py-3 text-[0.76rem] font-semibold uppercase tracking-[0.22em] text-white transition-transform duration-300 hover:-translate-y-0.5"
                  >
                    Submit booking
                  </button>
                </div>
              </form>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-shell pb-16 sm:pb-20">
        <Reveal from="up">
          <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr]">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_20px_70px_rgba(15,23,42,0.06)] sm:p-8">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">Booking status desk</p>
              <h2 className="mt-4 font-display text-[1.7rem] font-semibold tracking-[-0.04em] text-[#0f172a] sm:text-[2rem]">
                Check admin feedback and repair progress with your booking ID.
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                If your request has already been reviewed, the latest update, current progress, and tracking summary will appear here.
              </p>

              <label className="mt-6 block space-y-3">
                <span className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-slate-500">Booking ID</span>
                <input
                  value={lookupId}
                  onChange={(event) => setLookupId(event.target.value)}
                  placeholder="Enter your booking ID"
                  className="w-full rounded-[1rem] border border-slate-200 bg-[#f8fafc] px-4 py-3.5 text-slate-900 outline-none transition-colors duration-300 placeholder:text-slate-400 focus:border-[var(--accent)]"
                />
              </label>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.3rem] border border-slate-200 bg-[#f8fafc] p-5">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-slate-500">Reply status</p>
                  <p className="mt-3 text-[1.05rem] font-medium text-[#0f172a]">{activeReply?.status ?? "Waiting for admin review"}</p>
                </div>
                <div className="rounded-[1.3rem] border border-slate-200 bg-[#f8fafc] p-5">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-slate-500">Repair progress</p>
                  <p className="mt-3 text-[1.05rem] font-medium text-[#0f172a]">{activeTracking ? `${activeTracking.progress}%` : "No tracking update yet"}</p>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_20px_70px_rgba(15,23,42,0.06)] sm:p-8">
              {lookupId.trim() ? (
                activeReply || activeTracking ? (
                  <div className="space-y-5">
                    <div className="rounded-[1.4rem] border border-slate-200 bg-[#f8fafc] p-5">
                      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">Admin response</p>
                      <p className="mt-4 text-sm leading-8 text-slate-600">
                        {activeReply?.emailReply ?? "The booking is on file, but the admin has not posted a response yet."}
                      </p>
                      {activeReply?.updatedAt ? <p className="mt-3 text-[0.76rem] uppercase tracking-[0.18em] text-slate-400">Updated {new Date(activeReply.updatedAt).toLocaleString()}</p> : null}
                    </div>

                    <div className="rounded-[1.4rem] border border-slate-200 bg-[#f8fafc] p-5">
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div>
                          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">Repair progress</p>
                          <p className="mt-3 text-[1.1rem] font-medium text-[#0f172a]">{activeTracking?.status ?? "Awaiting technician update"}</p>
                        </div>
                        {activeTracking ? (
                          <Link
                            href={`/track-repair?id=${encodeURIComponent(activeTracking.id)}&service=${encodeURIComponent(activeTracking.service)}`}
                            className="inline-flex items-center rounded-full bg-[var(--accent)] px-5 py-3 text-[0.74rem] font-semibold uppercase tracking-[0.22em] text-white transition-transform duration-300 hover:-translate-y-0.5"
                          >
                            Open full tracker
                          </Link>
                        ) : null}
                      </div>

                      {activeTracking ? (
                        <>
                          <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-200">
                            <div className="h-full rounded-full bg-[linear-gradient(90deg,#f97316,#fb923c)]" style={{ width: `${activeTracking.progress}%` }} />
                          </div>
                          <div className="mt-5 grid gap-3 sm:grid-cols-2">
                            {activeTracking.milestones.map((milestone) => (
                              <div key={milestone} className="rounded-[1rem] border border-slate-200 bg-white px-4 py-3 text-sm leading-7 text-slate-600">
                                {milestone}
                              </div>
                            ))}
                          </div>
                        </>
                      ) : (
                        <p className="mt-4 text-sm leading-7 text-slate-500">Once the admin assigns a status and progress timeline, it will appear here automatically.</p>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="rounded-[1.5rem] border border-dashed border-slate-200 bg-[#f8fafc] p-6 text-sm leading-7 text-slate-500">
                    No admin update was found for this booking ID yet. Check the ID and try again later after the team reviews the request.
                  </div>
                )
              ) : (
                <div className="rounded-[1.5rem] border border-dashed border-slate-200 bg-[#f8fafc] p-6 text-sm leading-7 text-slate-500">
                  Enter a booking ID to see the admin reply, current status, and repair progress without leaving the booking page.
                </div>
              )}
            </div>
          </div>
        </Reveal>
      </section>

      <AnimatePresence>
        {isSubmitted ? (
          <motion.div
            className="fixed inset-0 z-[96] flex items-end justify-center bg-[rgba(15,23,42,0.45)] px-4 pb-4 pt-20 backdrop-blur-sm sm:items-center sm:px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 26, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.98 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-lg rounded-[2rem] bg-white p-6 shadow-[0_28px_80px_rgba(15,23,42,0.18)] sm:p-8"
            >
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">Booking successful</p>
              <h2 className="mt-4 font-display text-[1.7rem] font-semibold tracking-[-0.04em] text-[#0f172a] sm:text-[2rem]">
                Your booking was received successfully.
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                Your request has been saved with booking ID {id}. You will be redirected to the repair tracker automatically so you can keep using the same ID for future status checks.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={`/track-repair?id=${encodeURIComponent(id)}&service=${encodeURIComponent(formData.service)}`}
                  className="inline-flex items-center justify-center rounded-full bg-[var(--accent)] px-5 py-3 text-[0.74rem] font-semibold uppercase tracking-[0.22em] text-white transition-transform duration-300 hover:-translate-y-0.5"
                >
                  Open tracker now
                </Link>
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="inline-flex items-center justify-center rounded-full border border-slate-200 px-5 py-3 text-[0.74rem] font-semibold uppercase tracking-[0.22em] text-slate-700"
                >
                  Stay here
                </button>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </main>
  );
}
