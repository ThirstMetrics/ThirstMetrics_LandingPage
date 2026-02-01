"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { revealUp, staggerContainer, staggerItem, viewport } from "@/lib/motion";

const FAQS = [
  {
    q: "Where does the data come from?",
    a: "ThirstMetrics is built on publicly available Texas alcohol receipts data published by the state. We don't scrape private systems or access anything behind a login. Our value is in what we layer on top: DBA resolution, ownership group mapping, industry segment tags, county-name mapping, metroplex filters, and sales tax context.",
  },
  {
    q: "How often is the data refreshed?",
    a: "We refresh the underlying receipts data on a weekly cycle, aligned with the state's publication schedule. Enrichment layers — DBA names, ownership groups, and segment tags — are updated continuously as we identify new accounts and resolve changes.",
  },
  {
    q: "What do you mean by \"DBA name resolution\"?",
    a: "Texas alcohol permits are filed under corporate entity names — LLCs, holding companies, and parent orgs. But reps know accounts by the name on the door. We map corporate entities to their DBA (\"doing business as\") names so you can search for \"The Rustic\" instead of scrolling through unfamiliar LLCs.",
  },
  {
    q: "What are the industry segment tags?",
    a: "We classify every account into proprietary segments like fine dining, sports bar, hotel F&B, neighborhood bar, package store, convenience, and more. These tags come from a combination of permit type, location data, receipts patterns, and manual validation — not just SIC codes.",
  },
  {
    q: "Can I filter by my specific territory?",
    a: "Yes. Beyond county-level filtering, we support metroplex-level filters for DFW, Houston, Austin, San Antonio, and other major Texas metros. You can also define custom geographies if your territory doesn't align to standard boundaries.",
  },
  {
    q: "What does the sales tax overlay show?",
    a: "Raw receipts numbers can be misleading without tax context. We overlay local sales tax rates and jurisdiction breakdowns alongside gross receipts so you can compare accounts across different tax environments and understand what the numbers mean for a given location.",
  },
  {
    q: "Is ThirstMetrics only for Texas?",
    a: "Today, yes. We're focused on being the best source of enriched alcohol account intelligence in Texas. The architecture is designed to expand to other states with public receipts data, and we'll announce new markets as they come online.",
  },
  {
    q: "What is Spotlight?",
    a: "Spotlight is a coming-soon feature that maps downstream distribution for accounts that buy centrally — hotels, stadiums, retail groups. It shows where product is actually being poured or stocked at the property or store level, so you can track real volume across multi-unit operators.",
  },
];

function AccordionItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-slate-200">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left group"
      >
        <span className="text-base md:text-[1.05rem] font-medium text-slate-700 group-hover:text-slate-900 transition-colors pr-8">
          {q}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform duration-200 ${
            open ? "rotate-180 text-brand-500" : ""
          }`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm md:text-base text-slate-500 leading-relaxed max-w-3xl">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="w-full bg-white section-y">
      <div className="section-container">
        <motion.div
          variants={revealUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="text-center mb-12 md:mb-16"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-500 mb-3">
            FAQ
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-[2.75rem] font-bold tracking-tight text-slate-900">
            Common questions
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="max-w-3xl mx-auto"
        >
          {FAQS.map((faq) => (
            <motion.div key={faq.q} variants={staggerItem}>
              <AccordionItem q={faq.q} a={faq.a} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
