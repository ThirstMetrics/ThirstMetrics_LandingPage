"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { staggerContainer, staggerItem } from "@/lib/motion";
import { cn } from "@/lib/utils";
import BetaForm from "@/components/BetaForm";

const HERO_IMAGES = [
  "/images/hero/dallas-skyline.jpg",
  "/images/hero/bottled-blonde.jpg",
  "/images/hero/matts-el-rancho.jpg",
  "/images/hero/stubbs-austin.jpg",
  "/images/hero/steak-48-houston-outside-building.jpeg",
  "/images/hero/pappas-bros.jpg",
  "/images/hero/Mastros-Houston.jpg",
];

const CYCLE_MS = 6000;

export default function HeroRotator() {
  const [index, setIndex] = useState(0);
  const prefersReduced = useReducedMotion();

  const advance = useCallback(() => {
    setIndex((prev) => (prev + 1) % HERO_IMAGES.length);
  }, []);

  useEffect(() => {
    if (prefersReduced) return;
    const id = setInterval(advance, CYCLE_MS);
    return () => clearInterval(id);
  }, [advance, prefersReduced]);

  return (
    <section className="relative w-full min-h-[100svh] flex items-center overflow-hidden">
      {/* Background slideshow */}
      <AnimatePresence mode="sync">
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0 z-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-[1.03]"
            style={{ backgroundImage: `url(${HERO_IMAGES[index]})` }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Gradient overlay */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-slate-900/85 via-slate-900/60 to-slate-900/30" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-slate-900/70 via-transparent to-slate-900/30" />

      {/* Content — two-column on desktop: copy left, form right */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full section-container pt-28 pb-20 md:pt-40 md:pb-32"
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12 lg:gap-16">
          {/* Left: copy */}
          <div className="max-w-2xl lg:max-w-xl">
            <motion.p
              variants={staggerItem}
              className="text-accent-300 text-sm font-semibold uppercase tracking-widest mb-5"
            >
              Texas alcohol account intelligence
            </motion.p>

            <motion.h1
              variants={staggerItem}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-[3.75rem] font-bold tracking-tight text-white leading-[1.08]"
            >
              Texas alcohol sales intelligence&mdash;built for reps.
            </motion.h1>

            <motion.p
              variants={staggerItem}
              className="mt-6 text-lg md:text-xl text-slate-300 leading-relaxed"
            >
              Target the right accounts faster using beer, wine, and spirits
              receipts&mdash;enhanced with metroplex filters and proprietary
              enrichment.
            </motion.p>

            {/* Secondary CTA — scroll anchor */}
            <motion.div variants={staggerItem} className="mt-6">
              <a
                href="#walkthrough"
                className="inline-flex items-center gap-2 text-sm font-medium text-accent-300 hover:text-accent-200 transition-colors"
              >
                View Sample Coverage &darr;
              </a>
            </motion.div>
          </div>

          {/* Right: beta access form */}
          <motion.div
            variants={staggerItem}
            className="w-full max-w-sm lg:max-w-[22rem]"
          >
            <div className="bg-white/[0.06] backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-7">
              <h2 className="text-lg font-semibold text-white mb-1">
                Get Early Beta Access
              </h2>
              <p className="text-sm text-slate-400 mb-5">
                Takes 30 seconds. We&apos;ll respond within 1 business day.
              </p>
              <BetaForm variant="hero" />
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {HERO_IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Show image ${i + 1}`}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-300",
              i === index ? "bg-white w-6" : "bg-white/40 hover:bg-white/60"
            )}
          />
        ))}
      </div>
    </section>
  );
}
