"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "nino-site-entry-modal-dismissed";
const COOKIE_KEY = "nino-cookie-banner-dismissed";

export function SiteEntryModal() {
  const [isBlogOpen, setIsBlogOpen] = useState(false);
  const [isCookieOpen, setIsCookieOpen] = useState(false);

  useEffect(() => {
    const dismissed = window.localStorage.getItem(STORAGE_KEY);
    const cookieDismissed = window.localStorage.getItem(COOKIE_KEY);

    if (!dismissed) setIsBlogOpen(true);
    if (dismissed && !cookieDismissed) setIsCookieOpen(true);
  }, []);

  const closeBlogModal = () => {
    window.localStorage.setItem(STORAGE_KEY, "true");
    setIsBlogOpen(false);
    if (!window.localStorage.getItem(COOKIE_KEY)) {
      setIsCookieOpen(true);
    }
  };

  const closeCookieBanner = () => {
    window.localStorage.setItem(COOKIE_KEY, "true");
    setIsCookieOpen(false);
  };

  return (
    <>
      {isBlogOpen ? (
        <div className="fixed inset-0 z-[90] flex items-end justify-center bg-[rgba(255,255,255,0.82)] px-4 pb-5 pt-24 backdrop-blur-sm sm:items-center sm:px-6">
          <div className="w-full max-w-xl overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-6 text-slate-900 shadow-[0_30px_90px_rgba(249,115,22,0.08)] sm:p-7">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.3em] text-[var(--accent-2)]">
              Blog Update
            </p>
            <h2 className="mt-4 max-w-[18ch] font-display text-[1.6rem] font-semibold leading-[1.02] tracking-[-0.04em] text-slate-900 sm:text-[2rem]">
              View blog posts on electronics repairs, diagnostics updates, and service tips.
            </h2>
            <p className="mt-4 max-w-lg text-sm leading-7 text-slate-600 sm:text-[0.96rem]">
              Explore customer guides, service updates, and repair insights designed for people who want better long-term electronics care.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="/blog"
                onClick={closeBlogModal}
                className="inline-flex items-center justify-center rounded-full bg-[var(--accent)] px-5 py-3 text-[0.76rem] font-semibold uppercase tracking-[0.22em] text-black transition-transform duration-300 hover:-translate-y-0.5"
              >
                View Blog Posts
              </a>
              <button
                type="button"
                onClick={closeBlogModal}
                className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-5 py-3 text-[0.76rem] font-semibold uppercase tracking-[0.22em] text-slate-900 transition-colors duration-300 hover:border-[var(--accent)]/45 hover:text-[var(--accent-2)]"
              >
                Maybe Later
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {isCookieOpen ? (
        <div className="fixed inset-x-4 bottom-4 z-[91] sm:inset-x-auto sm:bottom-6 sm:right-6">
          <div className="w-full max-w-md overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white p-5 text-slate-900 shadow-[0_26px_70px_rgba(249,115,22,0.08)] backdrop-blur-2xl sm:p-6">
            <p className="text-[0.64rem] font-semibold uppercase tracking-[0.3em] text-[var(--accent-2)]">
              Cookies
            </p>
            <p className="mt-3 max-w-sm text-sm leading-7 text-slate-600">
              Accept cookies so we can monitor visitor activity, improve service flows, and understand how customers use the platform.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={closeCookieBanner}
                className="inline-flex items-center justify-center rounded-full bg-[var(--accent)] px-5 py-3 text-[0.74rem] font-semibold uppercase tracking-[0.22em] text-black transition-transform duration-300 hover:-translate-y-0.5"
              >
                Accept Cookies
              </button>
              <button
                type="button"
                onClick={closeCookieBanner}
                className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-5 py-3 text-[0.74rem] font-semibold uppercase tracking-[0.22em] text-slate-900 transition-colors duration-300 hover:border-[var(--accent)]/45 hover:text-[var(--accent-2)]"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
