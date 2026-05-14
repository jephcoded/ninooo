"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { Reveal } from "@/components/animations/reveal";
import { ADMIN_DATA_EVENT, BookingReply, readBookingReplies, readTrackingEntries, TrackingEntry } from "@/lib/admin-data";
import { appendBooking, BookingRecord, BOOKING_ALERT_KEY } from "@/lib/booking-store";

export default function BookingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const service = searchParams.get("service") ?? "General booking";
  const part = searchParams.get("part") ?? "Not specified";
  const id = searchParams.get("id") ?? `NINO-BK-${Date.now().toString().slice(-6)}`;
  const [lookupId, setLookupId] = useState(searchParams.get("id") ?? "");
  const [formData, setFormData] = useState({
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
      const nextParams = new URLSearchParams({ id, service });
      router.push(`/track-repair?${nextParams.toString()}`);
    }, 1800);

    return () => {
      window.clearTimeout(timer);
    };
  }, [id, isSubmitted, router, service]);

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
      service,
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
      customerName: "",
      email: "",
      phone: "",
      location: "",
      request: "",
    });
  };

  return (
    <main className="bg-white">
      <section className="section-shell py-16 sm:py-20 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-start lg:gap-12">
          <Reveal from="left">
            <div className="max-w-[34rem]">
              <span className="inline-flex rounded-full border border-[var(--accent)]/20 bg-[var(--accent)]/8 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--accent)]">
                Booking
              </span>
              <h1 className="mt-6 font-display text-[2.3rem] font-semibold leading-[0.98] tracking-[-0.05em] text-slate-950 sm:text-[3rem]">
                Book a workshop visit and send the service details you want NINO to respond to.
              </h1>
              <p className="mt-6 max-w-[34rem] text-[1rem] leading-8 text-slate-600">
                Leave the service you need, your email for a reply, your location details, and any extra request the team should know before contacting you back.
              </p>

              <div className="mt-8 space-y-4">
                <div className="rounded-[1.6rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff,#f7f8fb)] p-5">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">
                    Selected service
                  </p>
                  <p className="mt-3 text-[1.08rem] font-medium text-slate-950">{service}</p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[1.6rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff,#f7f8fb)] p-5">
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-slate-500">
                      Service ID
                    </p>
                    <p className="mt-3 text-[0.98rem] font-medium text-slate-900">{id}</p>
                  </div>
                  <div className="rounded-[1.6rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff,#f7f8fb)] p-5">
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-slate-500">
                      Part focus
                    </p>
                    <p className="mt-3 text-[0.98rem] font-medium text-slate-900">{part}</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal from="right" delay={0.08}>
            <form
              onSubmit={handleSubmit}
              className="rounded-[2rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff,#f8f9fb)] p-6 shadow-[0_22px_70px_rgba(15,23,42,0.08)] sm:p-8"
            >
              <div className="grid gap-6 sm:grid-cols-2">
                <label className="space-y-3 sm:col-span-2">
                  <span className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-slate-500">
                    Full name
                  </span>
                  <input
                    required
                    value={formData.customerName}
                    onChange={(event) => setFormData((current) => ({ ...current, customerName: event.target.value }))}
                    className="w-full rounded-[1.2rem] border border-slate-200 bg-white px-5 py-4 text-slate-900 outline-none transition-colors duration-300 placeholder:text-slate-400 focus:border-[var(--accent)]"
                    placeholder="Your name"
                  />
                </label>

                <label className="space-y-3">
                  <span className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-slate-500">
                    Email for reply
                  </span>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(event) => setFormData((current) => ({ ...current, email: event.target.value }))}
                    className="w-full rounded-[1.2rem] border border-slate-200 bg-white px-5 py-4 text-slate-900 outline-none transition-colors duration-300 placeholder:text-slate-400 focus:border-[var(--accent)]"
                    placeholder="name@email.com"
                  />
                </label>

                <label className="space-y-3">
                  <span className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-slate-500">
                    Phone number
                  </span>
                  <input
                    required
                    value={formData.phone}
                    onChange={(event) => setFormData((current) => ({ ...current, phone: event.target.value }))}
                    className="w-full rounded-[1.2rem] border border-slate-200 bg-white px-5 py-4 text-slate-900 outline-none transition-colors duration-300 placeholder:text-slate-400 focus:border-[var(--accent)]"
                    placeholder="0800 000 0000"
                  />
                </label>

                <label className="space-y-3 sm:col-span-2">
                  <span className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-slate-500">
                    Location
                  </span>
                  <div className="flex items-center gap-3 rounded-[1.2rem] border border-slate-200 bg-white px-4 py-3 focus-within:border-[var(--accent)]">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[var(--accent)]/10 text-[var(--accent)]">
                      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 21s6-5.5 6-11a6 6 0 1 0-12 0c0 5.5 6 11 6 11Z" strokeLinecap="round" strokeLinejoin="round" />
                        <circle cx="12" cy="10" r="2.5" />
                      </svg>
                    </span>
                    <input
                      required
                      value={formData.location}
                      onChange={(event) => setFormData((current) => ({ ...current, location: event.target.value }))}
                      className="w-full bg-transparent py-1 text-slate-900 outline-none placeholder:text-slate-400"
                      placeholder="Area, street, or landmark"
                    />
                  </div>
                </label>

                <label className="space-y-3 sm:col-span-2">
                  <span className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-slate-500">
                    What do you want done?
                  </span>
                  <textarea
                    required
                    rows={5}
                    value={formData.request}
                    onChange={(event) => setFormData((current) => ({ ...current, request: event.target.value }))}
                    className="w-full rounded-[1.2rem] border border-slate-200 bg-white px-5 py-4 text-slate-900 outline-none transition-colors duration-300 placeholder:text-slate-400 focus:border-[var(--accent)]"
                    placeholder="Tell NINO the issue, the service you want, and what you want the team to inspect or fix."
                  />
                </label>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                <p className="max-w-md text-sm leading-7 text-slate-500">
                  After booking, the team will review your request and contact you back through your email or phone details.
                </p>
                <button
                  type="submit"
                  className="inline-flex items-center rounded-full bg-[var(--accent)] px-6 py-3 text-[0.76rem] font-semibold uppercase tracking-[0.22em] text-black transition-transform duration-300 hover:-translate-y-0.5"
                >
                  Submit Booking
                </button>
              </div>
            </form>
          </Reveal>
        </div>
      </section>

      <section className="section-shell pb-16 sm:pb-20">
        <Reveal from="up">
          <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr]">
            <div className="rounded-[2rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff,#f8f9fb)] p-6 shadow-[0_20px_70px_rgba(15,23,42,0.06)] sm:p-8">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">
                Booking Status Desk
              </p>
              <h2 className="mt-4 font-display text-[1.7rem] font-semibold tracking-[-0.04em] text-slate-950 sm:text-[2rem]">
                Check the admin reply and live repair progress with your booking ID.
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                If the workshop has already reviewed your request, your latest reply, progress stage, and tracking summary will show here.
              </p>

              <label className="mt-6 block space-y-3">
                <span className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-slate-500">
                  Booking ID
                </span>
                <input
                  value={lookupId}
                  onChange={(event) => setLookupId(event.target.value)}
                  placeholder="Enter your booking ID"
                  className="w-full rounded-[1.2rem] border border-slate-200 bg-white px-5 py-4 text-slate-900 outline-none transition-colors duration-300 placeholder:text-slate-400 focus:border-[var(--accent)]"
                />
              </label>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.4rem] border border-slate-200 bg-white p-5">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-slate-500">Reply status</p>
                  <p className="mt-3 text-[1.05rem] font-medium text-slate-950">{activeReply?.status ?? "Waiting for admin review"}</p>
                </div>
                <div className="rounded-[1.4rem] border border-slate-200 bg-white p-5">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-slate-500">Repair progress</p>
                  <p className="mt-3 text-[1.05rem] font-medium text-slate-950">{activeTracking ? `${activeTracking.progress}%` : "No tracking update yet"}</p>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff,#f8f9fb)] p-6 shadow-[0_20px_70px_rgba(15,23,42,0.06)] sm:p-8">
              {lookupId.trim() ? (
                activeReply || activeTracking ? (
                  <div className="space-y-5">
                    <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5">
                      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">Admin response</p>
                      <p className="mt-4 text-sm leading-8 text-slate-600">
                        {activeReply?.emailReply ?? "The booking is on file, but the admin has not posted a response yet."}
                      </p>
                      {activeReply?.updatedAt ? <p className="mt-3 text-[0.76rem] uppercase tracking-[0.18em] text-slate-400">Updated {new Date(activeReply.updatedAt).toLocaleString()}</p> : null}
                    </div>

                    <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5">
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div>
                          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">Repair progress</p>
                          <p className="mt-3 text-[1.1rem] font-medium text-slate-950">{activeTracking?.status ?? "Awaiting workshop update"}</p>
                        </div>
                        {activeTracking ? (
                          <Link href={`/track-repair?id=${encodeURIComponent(activeTracking.id)}&service=${encodeURIComponent(activeTracking.service)}`} className="inline-flex items-center rounded-full bg-[var(--accent)] px-5 py-3 text-[0.74rem] font-semibold uppercase tracking-[0.22em] text-black transition-transform duration-300 hover:-translate-y-0.5">
                            Open full tracker
                          </Link>
                        ) : null}
                      </div>

                      {activeTracking ? (
                        <>
                          <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-200">
                            <div className="h-full rounded-full bg-[linear-gradient(90deg,#ff7a18,#ffb15f)]" style={{ width: `${activeTracking.progress}%` }} />
                          </div>
                          <div className="mt-5 grid gap-3 sm:grid-cols-2">
                            {activeTracking.milestones.map((milestone) => (
                              <div key={milestone} className="rounded-[1rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff,#f8f9fb)] px-4 py-3 text-sm leading-7 text-slate-600">
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
                  <div className="rounded-[1.5rem] border border-dashed border-slate-200 bg-white p-6 text-sm leading-7 text-slate-500">
                    No admin update was found for this booking ID yet. Check the ID and try again later after the workshop reviews the request.
                  </div>
                )
              ) : (
                <div className="rounded-[1.5rem] border border-dashed border-slate-200 bg-white p-6 text-sm leading-7 text-slate-500">
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
            className="fixed inset-0 z-[96] flex items-end justify-center bg-[rgba(10,14,22,0.45)] px-4 pb-4 pt-20 backdrop-blur-sm sm:items-center sm:px-6"
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
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">
                Booking successful
              </p>
              <h2 className="mt-4 font-display text-[1.7rem] font-semibold tracking-[-0.04em] text-slate-950 sm:text-[2rem]">
                Your booking was successful and you will be contacted back.
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                Your request has been saved with booking ID {id}. You will be redirected to the repair tracker automatically so you can keep using that same ID for future status checks.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={`/track-repair?id=${encodeURIComponent(id)}&service=${encodeURIComponent(service)}`}
                  className="inline-flex items-center justify-center rounded-full bg-[var(--accent)] px-5 py-3 text-[0.74rem] font-semibold uppercase tracking-[0.22em] text-black transition-transform duration-300 hover:-translate-y-0.5"
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