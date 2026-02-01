"use client";

import { motion } from "framer-motion";
import { TrendingDown, Target, Focus, BarChart3 } from "lucide-react";
import { staggerContainer, staggerItem, viewport } from "@/lib/motion";

const POINTS = [
  {
    icon: TrendingDown,
    title: "Fewer reps, same territory",
    description:
      "Headcount cuts aren't slowing down. The teams that survive are the ones that cover more ground with fewer people.",
  },
  {
    icon: Target,
    title: "Prioritize what actually matters",
    description:
      "Stop wasting windshield time on accounts that don't move the needle. Focus on the locations with real volume and real potential.",
  },
  {
    icon: Focus,
    title: "A focus engine, not another dashboard",
    description:
      "ThirstMetrics doesn't just show you data — it shows you where to go next. Every feature is built to sharpen your route, not pad a report.",
  },
  {
    icon: BarChart3,
    title: "Data-driven, not gut-driven",
    description:
      "The reps who win right now aren't the ones with the most experience. They're the ones with the best data. ThirstMetrics levels the field.",
  },
];

export default function MarketConditions() {
  return (
    <section className="w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 section-y overflow-hidden">
      <div className="section-container">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <div className="max-w-3xl mx-auto text-center mb-14 md:mb-20">
            <motion.p
              variants={staggerItem}
              className="text-xs font-semibold uppercase tracking-widest text-accent-400 mb-4"
            >
              The reality
            </motion.p>
            <motion.h2
              variants={staggerItem}
              className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight"
            >
              The industry is doing more with{" "}
              <span className="text-accent-300">fewer reps.</span>
            </motion.h2>
            <motion.p
              variants={staggerItem}
              className="mt-6 text-base md:text-lg text-slate-400 leading-relaxed"
            >
              Layoffs are reshaping beverage sales teams across the country.
              The reps and managers still standing need tools that sharpen focus —
              not add complexity.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
            {POINTS.map((p) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={p.title}
                  variants={staggerItem}
                  className="group rounded-xl bg-white/[0.04] border border-white/[0.08] p-7 md:p-8 hover:bg-white/[0.07] hover:border-white/[0.14] transition-all duration-300"
                >
                  <div className="w-11 h-11 rounded-lg bg-accent-400/10 border border-accent-400/20 flex items-center justify-center mb-5 group-hover:bg-accent-400/15 transition-colors">
                    <Icon className="w-5 h-5 text-accent-400" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {p.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {p.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
