"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { ADMIN_DATA_EVENT, readTrackingEntries, TrackingEntry } from "@/lib/admin-data";

export default function TrackRepairPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const service = searchParams.get("service");
  const id = searchParams.get("id");
  const [entries, setEntries] = useState<TrackingEntry[]>([]);
  const [lookupId, setLookupId] = useState(id ?? "");

  useEffect(() => {
    const syncEntries = async () => {
      setEntries(await readTrackingEntries());
    };

    void syncEntries();
    const handleSyncEntries = () => {
      void syncEntries();
    };

    window.addEventListener("storage", handleSyncEntries);
    window.addEventListener(ADMIN_DATA_EVENT, handleSyncEntries);

    return () => {
      window.removeEventListener("storage", handleSyncEntries);
      window.removeEventListener(ADMIN_DATA_EVENT, handleSyncEntries);
    };
  }, []);

  useEffect(() => {
    queueMicrotask(() => {
      setLookupId(id ?? "");
    });
  }, [id]);

  const trackingEntry = useMemo(() => entries.find((entry) => entry.id === id), [entries, id]);
  const chartPoints = trackingEntry?.chartPoints ?? [];

  const handleLookup = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextId = lookupId.trim();
    if (!nextId) {
      router.push("/track-repair");
      return;
    }

    const matchedEntry = entries.find((entry) => entry.id === nextId);
    const nextParams = new URLSearchParams({ id: nextId });

    if (matchedEntry?.service) {
      nextParams.set("service", matchedEntry.service);
    } else if (service) {
      nextParams.set("service", service);
    }

    router.push(`/track-repair?${nextParams.toString()}`);
  };

  return (
    <main className="bg-[linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)]">
      <section className="section-shell py-16 sm:py-20 lg:py-24">
      <div className="max-w-4xl space-y-6">
        <span className="inline-flex rounded-full border border-[var(--accent)]/20 bg-[var(--accent)]/8 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--accent)]">
          Track Repair
        </span>
        <h1 className="font-display text-[2.2rem] font-semibold tracking-[-0.04em] text-slate-950 sm:text-[3rem]">
          Follow your repair through diagnosis, repair, testing, and final delivery.
        </h1>
        <p className="max-w-2xl text-base leading-8 text-slate-600">
          Stay informed with clearer repair milestones, approval updates, and progress information from start to finish.
        </p>
        <form onSubmit={handleLookup} className="rounded-[1.8rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff,#f8fafc)] p-5 shadow-[0_20px_60px_rgba(15,23,42,0.05)] sm:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="flex-1 rounded-full border border-slate-200 bg-white px-4 py-3">
              <input
                value={lookupId}
                onChange={(event) => setLookupId(event.target.value)}
                placeholder="Enter tracking ID"
                className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
              />
            </div>
            <button
              type="submit"
            className="inline-flex items-center justify-center rounded-full bg-[var(--accent)] px-5 py-3 text-[0.74rem] font-semibold uppercase tracking-[0.22em] text-white transition-transform duration-300 hover:-translate-y-0.5"
            >
              Search tracker
            </button>
          </div>
        </form>
        {service || id ? (
          <div className="rounded-[1.8rem] border border-slate-200 bg-[linear-gradient(180deg,#ffffff,#f8fafc)] p-6 shadow-[0_20px_60px_rgba(15,23,42,0.05)]">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">
              Tracking Reference
            </p>
            <div className="mt-4 space-y-2 text-sm leading-7 text-slate-600">
              {service ? <p>Selected service: {service}</p> : null}
              {id ? <p>Tracking ID: {id}</p> : null}
              {trackingEntry ? <p>Status: {trackingEntry.status}</p> : <p>No admin update yet for this ID.</p>}
            </div>

            {trackingEntry ? (
              <>
                <div className="mt-6 grid gap-4 sm:grid-cols-[0.72fr_1.28fr]">
                  <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5">
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-slate-500">Progress</p>
                    <p className="mt-3 font-display text-[2.1rem] font-semibold tracking-[-0.04em] text-slate-950">{trackingEntry.progress}%</p>
                    <p className="mt-2 text-sm leading-7 text-slate-500">Last updated {new Date(trackingEntry.updatedAt).toLocaleString()}</p>
                  </div>
                  <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5">
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-slate-500">Progress graph</p>
                    <div className="mt-5 flex h-[10rem] items-end gap-3">
                      {chartPoints.map((point, index) => (
                        <div key={`${trackingEntry.id}-${index}`} className="flex-1">
                          <div
                            className="rounded-t-[1rem] bg-[linear-gradient(180deg,#fb923c,#f97316)]"
                            style={{ height: `${Math.max(point, 8)}%` }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {trackingEntry.milestones.map((milestone) => (
                    <div key={milestone} className="rounded-[1.3rem] border border-slate-200 bg-white px-4 py-4 text-sm leading-7 text-slate-600">
                      {milestone}
                    </div>
                  ))}
                </div>
              </>
            ) : null}
          </div>
        ) : null}
      </div>
      </section>
    </main>
  );
}
