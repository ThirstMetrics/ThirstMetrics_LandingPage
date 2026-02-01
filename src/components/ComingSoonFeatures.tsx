"use client";

import { motion } from "framer-motion";
import { MonitorSmartphone, BarChart3, ArrowRight, Database, Target } from "lucide-react";
import { staggerContainer, staggerItem, viewport } from "@/lib/motion";

const FEATURES = [
  {
    icon: MonitorSmartphone,
    badge: "Unified Platform",
    title: "Visit Capture + CRM",
    description:
      "Visit data is captured inside ThirstMetrics — not exported to yet another CRM. Your targeting software and CRM are one system, giving you a single source of truth with fewer tools and zero data gaps.",
    highlights: [
      "Visit data stays inside ThirstMetrics",
      "No exporting leads to external CRMs",
      "Targeting + CRM = one system",
      "Fewer tools, single source of truth",
    ],
    accentIcon: Target,
  },
  {
    icon: BarChart3,
    badge: "Strategic Insight",
    title: "Sales Upload & Market Share Estimation",
    description:
      "Upload your sales data and see an estimated percentage of business captured per location. Understand where you're winning, where you're underrepresented, and where the whitespace lives.",
    highlights: [
      "Upload your sales data securely",
      "Estimated market share per location",
      "Identify whitespace opportunities",
      "Strategic insight, not compliance busywork",
    ],
    accentIcon: Database,
  },
];

export default function ComingSoonFeatures() {
  return (
    <section id="coming-soon" className="w-full bg-white section-y">
      <div className="section-container">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="text-center mb-14 md:mb-20"
        >
          <motion.div variants={staggerItem}>
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent-50 text-accent-600 text-sm font-medium border border-accent-200 mb-6">
              Coming Soon
            </span>
          </motion.div>
          <motion.h2
            variants={staggerItem}
            className="text-3xl sm:text-4xl md:text-[2.75rem] font-bold tracking-tight text-slate-900"
          >
            What&apos;s next for{" "}
            <span className="text-gradient">ThirstMetrics</span>
          </motion.h2>
          <motion.p
            variants={staggerItem}
            className="mt-4 text-base md:text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed"
          >
            Two features designed to close the gap between targeting accounts
            and actually managing them.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {FEATURES.map((f) => {
            const Icon = f.icon;
            const AccentIcon = f.accentIcon;
            return (
              <motion.div
                key={f.title}
                variants={staggerItem}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                className="group relative rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50/80 p-8 md:p-10 shadow-soft hover:shadow-card-hover hover:border-brand-200 transition-all duration-300 overflow-hidden"
              >
                {/* Subtle corner accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-50/50 rounded-bl-[4rem] -mr-4 -mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative">
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-brand-50 border border-brand-100 flex items-center justify-center group-hover:bg-brand-100 transition-colors">
                      <Icon className="w-6 h-6 text-brand-600" strokeWidth={1.5} />
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-widest text-brand-500 bg-brand-50 px-3 py-1 rounded-full">
                      {f.badge}
                    </span>
                  </div>

                  <h3 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight mb-3">
                    {f.title}
                  </h3>
                  <p className="text-base text-slate-500 leading-relaxed mb-6">
                    {f.description}
                  </p>

                  <ul className="space-y-3">
                    {f.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-3">
                        <AccentIcon className="w-4 h-4 text-brand-500 mt-0.5 flex-shrink-0" strokeWidth={2} />
                        <span className="text-sm text-slate-600 font-medium">{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          variants={staggerItem}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="text-center mt-10"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600 hover:text-brand-700 transition-colors"
          >
            Interested? Let us know
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
