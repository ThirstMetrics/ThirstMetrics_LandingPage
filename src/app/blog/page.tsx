"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Edit3, Instagram, Linkedin, Send, X, Calendar, ArrowRight } from "lucide-react";
import { staggerContainer, staggerItem, viewport } from "@/lib/motion";

interface BlogPost {
  id: string;
  title: string;
  body: string;
  source: "linkedin" | "instagram" | "original";
  date: string;
}

const SOURCE_LABELS: Record<BlogPost["source"], { label: string; icon: typeof Linkedin }> = {
  linkedin: { label: "LinkedIn", icon: Linkedin },
  instagram: { label: "Instagram", icon: Instagram },
  original: { label: "Original", icon: Edit3 },
};

/* ------------------------------------------------------------------ */
/* Seed posts — replace with CMS / API data when ready                */
/* ------------------------------------------------------------------ */
const SEED_POSTS: BlogPost[] = [
  {
    id: "1",
    title: "Why Public Receipts Data Changes the Game for Texas Reps",
    body: "Most alcohol reps are still working from stale spreadsheets and gut feel. But Texas publishes receipts data that — when enriched correctly — tells you which accounts are growing, which are flat, and where the whitespace is.\n\nThirstMetrics layers DBA resolution, ownership groups, and industry segment tags on top of that public data so you can build a target list in seconds, not spreadsheet sessions.\n\nThe reps who win in 2026 won't be the ones with the biggest territories. They'll be the ones with the sharpest data.",
    source: "linkedin",
    date: "2026-01-28",
  },
  {
    id: "2",
    title: "Stop Guessing. Start Filtering.",
    body: "How much of your week is spent driving to accounts that don't move the needle?\n\nThirstMetrics lets you filter the entire Texas alcohol permit universe by metroplex, county, segment, ownership group, or volume tier. Build your route around data — not hope.\n\n#ThirstMetrics #BeverageSales #Texas",
    source: "instagram",
    date: "2026-01-25",
  },
];

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>(SEED_POSTS);
  const [showEditor, setShowEditor] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");
  const [editSource, setEditSource] = useState<BlogPost["source"]>("linkedin");

  function handleCreate() {
    if (!editTitle.trim() || !editBody.trim()) return;
    const newPost: BlogPost = {
      id: Date.now().toString(),
      title: editTitle.trim(),
      body: editBody.trim(),
      source: editSource,
      date: new Date().toISOString().split("T")[0],
    };
    setPosts([newPost, ...posts]);
    setEditTitle("");
    setEditBody("");
    setEditSource("linkedin");
    setShowEditor(false);
  }

  return (
    <>
      <Header />
      <main className="pt-24 pb-20 min-h-screen bg-slate-50">
        <div className="section-container">
          {/* Header */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12"
          >
            <motion.div variants={staggerItem}>
              <p className="text-xs font-semibold uppercase tracking-widest text-brand-500 mb-2">
                Blog
              </p>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
                Insights & Updates
              </h1>
              <p className="mt-2 text-base text-slate-500">
                Quick reads from our LinkedIn and Instagram — plus original
                ThirstMetrics content.
              </p>
            </motion.div>
            <motion.button
              variants={staggerItem}
              onClick={() => setShowEditor(!showEditor)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-brand-500 text-white font-semibold text-sm hover:bg-brand-600 transition-colors shadow-soft"
            >
              {showEditor ? (
                <>
                  <X className="w-4 h-4" /> Cancel
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" /> New Post
                </>
              )}
            </motion.button>
          </motion.div>

          {/* Editor panel */}
          <AnimatePresence>
            {showEditor && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden mb-10"
              >
                <div className="rounded-xl border border-slate-200 bg-white p-6 md:p-8 shadow-card">
                  <h2 className="text-lg font-semibold text-slate-900 mb-1">
                    Create a post
                  </h2>
                  <p className="text-sm text-slate-500 mb-6">
                    Paste content from LinkedIn or Instagram, or write something
                    original.
                  </p>

                  {/* Source selector */}
                  <div className="flex gap-3 mb-5">
                    {(Object.entries(SOURCE_LABELS) as [BlogPost["source"], typeof SOURCE_LABELS["linkedin"]][]).map(
                      ([key, { label, icon: Icon }]) => (
                        <button
                          key={key}
                          onClick={() => setEditSource(key)}
                          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
                            editSource === key
                              ? "bg-brand-50 border-brand-200 text-brand-700"
                              : "bg-white border-slate-200 text-slate-500 hover:border-slate-300"
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          {label}
                        </button>
                      )
                    )}
                  </div>

                  <input
                    type="text"
                    placeholder="Post title"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-white border border-slate-200 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-colors text-sm mb-4"
                  />
                  <textarea
                    placeholder={`Paste your ${SOURCE_LABELS[editSource].label} content here...`}
                    value={editBody}
                    onChange={(e) => setEditBody(e.target.value)}
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg bg-white border border-slate-200 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-colors text-sm resize-none mb-4"
                  />
                  <button
                    onClick={handleCreate}
                    disabled={!editTitle.trim() || !editBody.trim()}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-brand-500 text-white font-semibold text-sm hover:bg-brand-600 transition-colors shadow-soft disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-4 h-4" />
                    Publish Post
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Posts grid */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {posts.map((post) => {
              const sourceInfo = SOURCE_LABELS[post.source];
              const SourceIcon = sourceInfo.icon;
              return (
                <motion.article
                  key={post.id}
                  variants={staggerItem}
                  className="group rounded-xl border border-slate-200 bg-white p-7 md:p-8 shadow-soft hover:shadow-card-hover hover:border-brand-200 transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-xs font-medium text-slate-500">
                      <SourceIcon className="w-3 h-3" />
                      {sourceInfo.label}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-slate-400">
                      <Calendar className="w-3 h-3" />
                      {new Date(post.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-3 group-hover:text-brand-700 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed whitespace-pre-line line-clamp-4">
                    {post.body}
                  </p>
                  <div className="mt-4 pt-4 border-t border-slate-100">
                    <span className="inline-flex items-center gap-1 text-sm font-medium text-brand-600 group-hover:text-brand-700 transition-colors">
                      Read more <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>

          {posts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-slate-400 text-sm">
                No posts yet. Click &quot;New Post&quot; to create one.
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
