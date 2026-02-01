"use client";

import { motion } from "framer-motion";
import { Radar, ArrowRight } from "lucide-react";
import { revealUp, staggerContainer, staggerItem, viewport } from "@/lib/motion";

export default function SpotlightSection() {
  return (
    <section
      id="spotlight"
      className="w-full bg-gradient-to-br from-brand-900 via-brand-800 to-brand-950 section-y"
    >
      <div className="section-container">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="max-w-3xl mx-auto text-center"
        >
          {/* Badge */}
          <motion.div variants={staggerItem}>
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-accent-300 text-sm font-medium border border-white/10 mb-6">
              <Radar className="w-3.5 h-3.5" />
              Coming soon
            </span>
          </motion.div>

          <motion.h2
            variants={staggerItem}
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight"
          >
            Spotlight (Coming Soon): See Where Your Product Actually Moves
          </motion.h2>

          <motion.p
            variants={staggerItem}
            className="mt-6 text-base md:text-lg text-brand-200 leading-relaxed max-w-2xl mx-auto"
          >
            Do you have hotels, stadiums, or retail that buy centrally&mdash;but
            give you no visibility into where your products are actually being
            used? Spotlight is here to help. Map downstream distribution across
            multi-unit accounts and see which locations drive real volume.
          </motion.p>

          <motion.div
            variants={staggerItem}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg bg-white text-brand-700 font-semibold hover:bg-brand-50 transition-colors text-base shadow-lg"
            >
              Get Early Access to Spotlight
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>

          <motion.p
            variants={staggerItem}
            className="mt-4 text-sm text-brand-300/70"
          >
            We&apos;ll notify you when Spotlight enters beta.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
