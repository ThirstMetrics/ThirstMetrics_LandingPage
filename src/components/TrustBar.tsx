"use client";

import { motion } from "framer-motion";
import {
  FileText,
  MapPin,
  Building2,
  Hash,
  Receipt,
  Tags,
} from "lucide-react";
import { revealUp, staggerContainer, staggerItem, viewport } from "@/lib/motion";

const PROOF_ITEMS = [
  { icon: FileText, label: "Public TX receipts foundation" },
  { icon: MapPin, label: "Metroplex filters" },
  { icon: Building2, label: "DBA name resolution" },
  { icon: Hash, label: "County name mapping" },
  { icon: Receipt, label: "Sales tax context" },
  { icon: Tags, label: "Industry segment + ownership enrichment" },
];

export default function TrustBar() {
  return (
    <section className="w-full bg-slate-50 border-y border-slate-200/80">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="section-container py-10 md:py-14"
      >
        <motion.p
          variants={staggerItem}
          className="text-center text-xs font-semibold uppercase tracking-widest text-slate-400 mb-8"
        >
          What&apos;s in the platform
        </motion.p>
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-5 md:gap-x-12">
          {PROOF_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                variants={staggerItem}
                className="flex items-center gap-2.5 text-slate-500"
              >
                <Icon className="w-4 h-4 text-brand-500 flex-shrink-0" strokeWidth={1.8} />
                <span className="text-sm font-medium whitespace-nowrap">
                  {item.label}
                </span>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
