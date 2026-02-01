"use client";

import { motion } from "framer-motion";
import { Filter, CheckCircle, MapPinned } from "lucide-react";
import {
  revealUp,
  staggerContainer,
  staggerItem,
  slideLeft,
  slideRight,
  viewport,
} from "@/lib/motion";

const STEPS = [
  {
    step: "01",
    icon: Filter,
    title: "Filter",
    description:
      "Narrow the entire Texas alcohol permit universe by metroplex, county, city, industry segment, ownership group, or volume tier. Build your target list in seconds, not spreadsheet sessions.",
    image: "/images/walkthrough/filter.png",
  },
  {
    step: "02",
    icon: CheckCircle,
    title: "Validate",
    description:
      "Open any account to see receipts history for beer, wine, and spirits, DBA names, sales tax context, and ownership group — all on one screen. Confirm it fits your book before you make the call.",
    image: "/images/walkthrough/validate.png",
  },
  {
    step: "03",
    icon: MapPinned,
    title: "Plan routes",
    description:
      "Export filtered lists for your CRM or route planner. Data leaves ThirstMetrics formatted, tagged, and ready to drive your next day on the road.",
    image: "/images/walkthrough/routes.png",
  },
];

export default function ProductWalkthrough() {
  return (
    <section id="walkthrough" className="w-full bg-slate-50 section-y">
      <div className="section-container">
        <motion.div
          variants={revealUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="text-center mb-16 md:mb-24"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-brand-500 mb-3">
            How it works
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-[2.75rem] font-bold tracking-tight text-slate-900">
            Filter. Validate. Plan routes.
          </h2>
        </motion.div>

        <div className="space-y-20 md:space-y-28">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            const isEven = i % 2 === 1;
            return (
              <motion.div
                key={step.step}
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                className={`flex flex-col ${
                  isEven ? "md:flex-row-reverse" : "md:flex-row"
                } gap-10 md:gap-16 items-center`}
              >
                {/* Text */}
                <motion.div
                  variants={isEven ? slideRight : slideLeft}
                  className="flex-1"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-mono text-sm font-bold text-brand-500">
                      {step.step}
                    </span>
                    <div className="h-px flex-1 max-w-[48px] bg-brand-200" />
                  </div>
                  <div className="w-11 h-11 rounded-lg bg-brand-50 border border-brand-100 flex items-center justify-center mb-5">
                    <Icon className="w-5 h-5 text-brand-600" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight mb-3">
                    {step.title}
                  </h3>
                  <p className="text-base text-slate-500 leading-relaxed max-w-lg">
                    {step.description}
                  </p>
                </motion.div>

                {/* Screenshot */}
                <motion.div
                  variants={isEven ? slideLeft : slideRight}
                  className="flex-1 w-full"
                >
                  <div className="relative rounded-xl overflow-hidden border border-slate-200 shadow-card bg-slate-100 aspect-[3/2]">
                    <img
                      src={step.image}
                      alt={`${step.title} screenshot`}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
