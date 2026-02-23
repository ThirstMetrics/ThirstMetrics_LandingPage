"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { staggerContainer, staggerItem, viewport } from "@/lib/motion";
import BetaForm from "@/components/BetaForm";

export default function FinalCTA() {
  return (
    <section id="cta" className="w-full bg-slate-50 section-y">
      <div className="section-container">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="max-w-2xl mx-auto text-center"
        >
          <motion.h2
            variants={staggerItem}
            className="text-3xl sm:text-4xl md:text-[2.75rem] font-bold tracking-tight text-slate-900"
          >
            Get Early Beta Access
          </motion.h2>
          <motion.p
            variants={staggerItem}
            className="mt-4 text-base md:text-lg text-slate-500 leading-relaxed"
          >
            Stop working from stale spreadsheets. Get enriched Texas alcohol
            account data that reps actually want to use.
          </motion.p>

          <motion.div
            variants={staggerItem}
            className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-slate-500"
          >
            {[
              "Free during beta",
              "No credit card",
              "Monthly data refresh",
              "Access to built-in CRM",
            ].map((item) => (
              <span key={item} className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-brand-500" />
                {item}
              </span>
            ))}
          </motion.div>

          <motion.div
            variants={staggerItem}
            className="mt-10 max-w-md mx-auto text-left"
          >
            <BetaForm variant="section" />
          </motion.div>

          <motion.p
            variants={staggerItem}
            className="mt-3 text-xs text-slate-400"
          >
            Takes 30 seconds. We&apos;ll respond within 1 business day.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
