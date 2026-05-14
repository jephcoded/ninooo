"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

import { ADMIN_DATA_EVENT, ManagedBlogPost, readManagedBlogs } from "@/lib/admin-data";

function BlogActionIcon({ type }: { type: "share" | "save" | "search" | "headline" }) {
  if (type === "share") {
    return (
      <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="18" cy="5" r="2.5" />
        <circle cx="6" cy="12" r="2.5" />
        <circle cx="18" cy="19" r="2.5" />
        <path d="M8.3 11 15.7 6.6" strokeLinecap="round" />
        <path d="m8.3 13 7.4 4.4" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === "save") {
    return (
      <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M6 4.5h12a1 1 0 0 1 1 1V20l-7-3-7 3V5.5a1 1 0 0 1 1-1Z" strokeLinejoin="round" />
      </svg>
    );
  }

  if (type === "search") {
    return (
      <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" strokeLinecap="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 7h16" strokeLinecap="round" />
      <path d="M4 12h10" strokeLinecap="round" />
      <path d="M4 17h7" strokeLinecap="round" />
    </svg>
  );
}

export default function BlogPage() {
  const [posts, setPosts] = useState<ManagedBlogPost[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [savedPosts, setSavedPosts] = useState<string[]>([]);

  useEffect(() => {
    const syncPosts = () => {
      setPosts(readManagedBlogs());
    };

    syncPosts();
    window.addEventListener("storage", syncPosts);
    window.addEventListener(ADMIN_DATA_EVENT, syncPosts);

    return () => {
      window.removeEventListener("storage", syncPosts);
      window.removeEventListener(ADMIN_DATA_EVENT, syncPosts);
    };
  }, []);

  const filteredPosts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) {
      return posts;
    }

    return posts.filter((post) => {
      return (
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.content.toLowerCase().includes(query)
      );
    });
  }, [posts, searchQuery]);

  const latestPost = filteredPosts[0] ?? null;
  const visibleSlots = Array.from({ length: 12 }, (_, index) => filteredPosts[index] ?? null);

  const toggleSavedPost = (postId: string) => {
    setSavedPosts((current) => (current.includes(postId) ? current.filter((item) => item !== postId) : [...current, postId]));
  };

  return (
    <main className="bg-[#f5f0e8] text-slate-950">
      <section className="section-shell py-10 sm:py-12 lg:py-16">
        <div className="border-b border-slate-300 pb-6">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <div className="inline-flex items-center gap-2 border border-slate-300 bg-white/70 px-3 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-slate-700">
                <BlogActionIcon type="headline" />
                <span>Headline side</span>
              </div>
              <div className="mt-5 max-w-xl border-l-4 border-[var(--accent)] pl-4">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[var(--accent)]">Latest blog post</p>
                <h1 className="mt-3 font-display text-[1.9rem] font-semibold leading-[1.02] tracking-[-0.04em] text-slate-950 sm:text-[2.6rem]">
                  {latestPost ? latestPost.title : "No headline yet until the admin posts the next story."}
                </h1>
                <p className="mt-4 max-w-lg text-sm leading-7 text-slate-600">
                  {latestPost ? latestPost.excerpt : "The newspaper feed stays quiet until a fresh post is published from the admin side."}
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-center">
              <div className="flex items-center gap-3 border border-slate-300 bg-white/72 px-4 py-3">
                <span className="text-[var(--accent)]"><BlogActionIcon type="search" /></span>
                <input
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search blog posts"
                  className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
                />
              </div>

              <div className="flex items-center gap-2 sm:justify-end">
                <div className="inline-flex items-center gap-2 border border-slate-300 bg-white/72 px-4 py-3 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-slate-700">
                  <BlogActionIcon type="share" />
                  <span>Share</span>
                </div>
                <div className="inline-flex items-center gap-2 border border-slate-300 bg-white/72 px-4 py-3 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-slate-700">
                  <BlogActionIcon type="save" />
                  <span>Save</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="mt-8 grid grid-cols-1 gap-4 border-t border-slate-300 pt-6 sm:grid-cols-2 xl:grid-cols-4">
          {visibleSlots.map((post, index) => {
            const isSaved = post ? savedPosts.includes(post.id) : false;

            return (
              <article
                key={post?.id ?? `post-slot-${index}`}
                className="min-h-[22rem] border-l border-r border-slate-300 bg-white/55 px-4 py-5"
              >
                {post ? (
                  <>
                    <div className="flex items-start justify-between gap-3">
                      <p className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
                        {new Date(post.createdAt).toLocaleDateString()}
                      </p>
                      <div className="flex items-center gap-2 text-slate-500">
                        <button type="button" className="inline-flex size-8 items-center justify-center border border-slate-300 bg-white/80" aria-label="Share post">
                          <BlogActionIcon type="share" />
                        </button>
                        <button
                          type="button"
                          onClick={() => toggleSavedPost(post.id)}
                          className={`inline-flex size-8 items-center justify-center border ${isSaved ? "border-[var(--accent)] bg-[var(--accent)] text-black" : "border-slate-300 bg-white/80 text-slate-500"}`}
                          aria-label={isSaved ? "Unsave post" : "Save post"}
                        >
                          <BlogActionIcon type="save" />
                        </button>
                      </div>
                    </div>

                    <div className="mt-4 border-y border-slate-200 py-4">
                      <h2 className="font-display text-[1.35rem] font-semibold leading-[1.08] tracking-[-0.03em] text-slate-950">
                        {post.title}
                      </h2>
                    </div>

                    <div className="relative mt-4 h-40 overflow-hidden bg-[#efe7db]">
                      {post.image ? (
                        <Image src={post.image} alt={post.title} fill sizes="(max-width: 1280px) 100vw, 22vw" className="object-cover" />
                      ) : null}
                    </div>

                    <p className="mt-4 text-sm leading-7 text-slate-700">{post.excerpt}</p>
                    <p className="mt-4 text-sm leading-7 text-slate-500">{post.content}</p>
                  </>
                ) : (
                  <>
                    <p className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-slate-400">Waiting for post</p>
                    <div className="mt-4 border-y border-slate-200 py-4">
                      <h2 className="font-display text-[1.2rem] font-semibold tracking-[-0.03em] text-slate-400">Newspaper slot reserved for the next admin article.</h2>
                    </div>
                    <div className="mt-4 h-40 bg-[#efe7db]" />
                  </>
                )}
              </article>
            );
          })}
        </section>
      </section>
    </main>
  );
}