"use client";

import { motion } from "framer-motion";
import { revealUp, viewport } from "@/lib/motion";

/*
 * IMAGE SWAP: Replace with a wide-angle bar interior, busy patio,
 * or Texas streetscape at dusk. 2400x800+ landscape recommended.
 * TODO: Drop final licensed photo into /public/images/photo-band.jpg
 */
const BAND_IMAGE = "/images/photo-band.jpg";

export default function PhotoBand() {
  return (
    <section className="relative w-full h-[44vh] md:h-[52vh] lg:h-[56vh] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${BAND_IMAGE})` }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-brand-900/70" />

      <motion.div
        variants={revealUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="relative z-10 flex items-center justify-center h-full section-container"
      >
        <div className="text-center max-w-3xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
            Stop guessing. Target accounts using the numbers.
          </h2>
        </div>
      </motion.div>
    </section>
  );
}
