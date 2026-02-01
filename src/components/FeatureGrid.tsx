"use client";

import { motion } from "framer-motion";
import {
  MapPin,
  Receipt,
  Building2,
  Tags,
  Users,
  Filter,
} from "lucide-react";
import { revealUp, staggerContainer, staggerItem, viewport, hoverLift } from "@/lib/motion";

const FEATURES = [
  {
    icon: MapPin,
    title: "Metroplex Filtering",
    description:
      "Isolate accounts by DFW, Houston, Austin, San Antonio, or any custom region. Drill straight into your territory instead of scrolling statewide lists.",
  },
  {
    icon: Receipt,
    title: "Sales Tax Context Overlay",
    description:
      "See gross receipts alongside local tax rates and jurisdiction breakdowns. Compare account performance with the context that actually explains the numbers.",
  },
  {
    icon: Building2,
    title: "DBA Name Resolution",
    description:
      "Public filings list corporate entities, not the name on the door. We map every LLC to its DBA so you search for \"The Rustic,\" not a holding company.",
  },
  {
    icon: Tags,
    title: "Industry Segment Tags",
    description:
      "Every account tagged with proprietary classifications — fine dining, sports bar, hotel F&B, package store, and more. Filter by the verticals you sell into.",
  },
  {
    icon: Users,
    title: "Ownership Group Enrichment",
    description:
      "See which accounts roll up to the same ownership group. Identify multi-unit operators and franchise clusters before your first outreach.",
  },
  {
    icon: Filter,
    title: "County Code to Name Mapping",
    description:
      "Raw TABC data uses numeric county codes. We map all 254 Texas counties so you can filter and report in plain language without a lookup table.",
  },
];

export default function FeatureGrid() {
  return (
    <section id="features" className="w-full bg-white section-y">
      <div className="section-container">
        <motion.div
          variants={revealUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="text-center mb-14 md:mb-20"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-500 mb-3">
            What we add
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-[2.75rem] font-bold tracking-tight text-slate-900">
            The data TABC publishes.{" "}
            <span className="text-gradient">The context it doesn&apos;t.</span>
          </h2>
          <p className="mt-4 text-base md:text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Six layers of enrichment that turn raw permit-and-receipts files into
            actionable account intelligence.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-6"
        >
          {FEATURES.map((f) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                variants={staggerItem}
                whileHover={hoverLift}
                className="group rounded-xl border border-slate-200 bg-white p-7 md:p-8 shadow-soft hover:shadow-card-hover hover:border-brand-200 transition-all duration-300"
              >
                <div className="w-11 h-11 rounded-lg bg-brand-50 border border-brand-100 flex items-center justify-center mb-5 group-hover:bg-brand-100 transition-colors">
                  <Icon className="w-5 h-5 text-brand-600" strokeWidth={1.5} />
                </div>
                <h3 className="text-[1.05rem] font-semibold text-slate-900 mb-2">
                  {f.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {f.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
