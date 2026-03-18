"use client";

import { motion } from "framer-motion";
import {
  MapPin,
  Database,
  LayoutGrid,
  Printer,
  ArrowRight,
  Clock,
  CheckCircle2,
  Rocket,
  Users,
  Warehouse,
  Wrench,
  Globe,
} from "lucide-react";
import Header from "@/components/Header";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import {
  revealUp,
  staggerContainer,
  staggerItem,
  viewport,
  hoverLift,
  hoverGlow,
} from "@/lib/motion";

/* ───────────────────── Product data ───────────────────── */

const products = [
  {
    icon: Warehouse,
    name: "ThirstOps",
    tagline: "ERP + CRM + warehouse management for distributors",
    description:
      "The all-in-one platform for beverage distributors: supplier pipeline, field CRM, lead finder, route management, email campaigns, and compliance — with QuickBooks, Odoo, and ERPNext integration.",
    status: "live" as const,
    href: "/thirstops",
  },
  {
    icon: MapPin,
    name: "Streetwise",
    tagline: "Location-pinned photographic intelligence",
    description:
      "Field reps record market visits directly on Google Maps, creating a street-level visual record of every account. Works offline, runs in any browser, and adapts to any industry that needs boots-on-the-ground data.",
    status: "live" as const,
    href: null,
  },
  {
    icon: Database,
    name: "Whiskey River",
    tagline: "Texas market intelligence + CRM",
    description:
      "Turns public TABC data into actionable prospect lists with DBA resolution, segment tags, and ownership-group mapping. Built-in CRM with beverage menu scanning so you can track the accounts that matter.",
    status: "live" as const,
    href: "/whiskey-river",
  },
  {
    icon: LayoutGrid,
    name: "Spotlight",
    tagline: "Multi-outlet resort inventory management",
    description:
      "Depletion data designed for distributors and suppliers working with multi-outlet properties. Track inventory across bars, restaurants, and banquet operations under one roof.",
    status: "coming" as const,
    href: null,
  },
  {
    icon: Printer,
    name: "Cadenza",
    tagline: "Beverage menu printing & management",
    description:
      "Ordering, cost margins, and guest-facing page design in a single workflow. Update a menu, push to print, and keep your numbers accurate — no spreadsheet gymnastics required.",
    status: "coming" as const,
    href: null,
  },
];

const whyPoints = [
  {
    icon: Users,
    title: "20+ Years in the Industry",
    text: "ThirstMetrics is built by someone who has carried a bag, managed accounts, and sat through the same meetings you sit through. Every feature solves a problem that actually exists.",
  },
  {
    icon: Wrench,
    title: "Built by a Practitioner, Not a Committee",
    text: "No advisory boards, no focus groups — just two decades of watching what works on the street and turning it into software that saves time.",
  },
  {
    icon: CheckCircle2,
    title: "Real-World Problems, Not Theoretical Ones",
    text: "We don't build features because they look good in a pitch deck. If it's here, it's because someone needed it on a Monday morning with a 40-stop route ahead of them.",
  },
  {
    icon: Globe,
    title: "Flexible & Platform-Agnostic",
    text: "Browser-based tools that work on any device, online or off. No app-store gatekeepers, no forced hardware upgrades — just open a tab and go.",
  },
];

const roadmapItems = [
  "Streetwise expansion beyond Texas — adapting the platform for new markets and industries.",
  "Spotlight beta with select multi-outlet resort partners.",
  "Cadenza development underway — early access coming later this year.",
];

/* ───────────────────── Page ───────────────────── */

export default function Home() {
  return (
    <>
      <Header />
      <main>
        {/* ── Hero ──────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-slate-950 pt-32 pb-24 sm:pt-40 sm:pb-32">
          {/* subtle radial glow */}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(13,115,119,0.18),transparent)]" />

          <div className="relative mx-auto max-w-4xl px-6 text-center">
            <motion.h1
              variants={revealUp}
              initial="hidden"
              animate="visible"
              className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              Software for the{" "}
              <span className="bg-gradient-to-r from-[#0d7377] to-[#22d3e6] bg-clip-text text-transparent">
                Beverage Industry
              </span>
            </motion.h1>

            <motion.p
              variants={revealUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.15 }}
              className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-400 sm:text-xl"
            >
              From street-level market intelligence to menu management — tools
              built by a 20-year industry veteran for the people who move the
              business.
            </motion.p>

            <motion.div
              variants={revealUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.3 }}
              className="mt-10"
            >
              <a
                href="#products"
                className="inline-flex items-center gap-2 rounded-lg bg-[#0d7377] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#0d7377]/20 transition-colors hover:bg-[#0d7377]/90"
              >
                Explore the Product Suite
                <ArrowRight className="h-4 w-4" />
              </a>
            </motion.div>
          </div>
        </section>

        {/* ── Product Suite ─────────────────────────────── */}
        <section
          id="products"
          className="bg-slate-900 py-24 sm:py-32"
        >
          <div className="mx-auto max-w-6xl px-6">
            <motion.div
              variants={revealUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="text-center"
            >
              <h2 className="text-3xl font-bold text-white sm:text-4xl">
                The Product Suite
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-slate-400">
                Four tools, one mission: give beverage professionals the data
                and workflows they actually need.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="mt-16 grid gap-8 sm:grid-cols-2"
            >
              {products.map((p) => {
                const Icon = p.icon;
                const isComingSoon = p.status === "coming";

                const card = (
                  <motion.div
                    key={p.name}
                    variants={staggerItem}
                    whileHover={isComingSoon ? undefined : hoverLift}
                    className={`group relative rounded-2xl border border-slate-800 bg-slate-950/60 p-8 backdrop-blur transition-colors ${
                      isComingSoon
                        ? "opacity-80"
                        : "hover:border-[#0d7377]/40"
                    }`}
                  >
                    {isComingSoon && (
                      <span className="absolute top-4 right-4 flex items-center gap-1 rounded-full bg-[#22d3e6]/10 px-3 py-1 text-xs font-medium text-[#22d3e6]">
                        <Clock className="h-3 w-3" />
                        Coming Soon
                      </span>
                    )}

                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#0d7377]/10">
                      <Icon className="h-6 w-6 text-[#22d3e6]" />
                    </div>

                    <h3 className="text-xl font-semibold text-white">
                      {p.name}
                    </h3>
                    <p className="mt-1 text-sm font-medium text-[#22d3e6]/70">
                      {p.tagline}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-slate-400">
                      {p.description}
                    </p>

                    {p.href && (
                      <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-[#0d7377] transition-colors group-hover:text-[#22d3e6]">
                        Learn more
                        <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    )}
                  </motion.div>
                );

                return p.href ? (
                  <a key={p.name} href={p.href} className="block">
                    {card}
                  </a>
                ) : (
                  card
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* ── Why ThirstMetrics ─────────────────────────── */}
        <section className="bg-slate-950 py-24 sm:py-32">
          <div className="mx-auto max-w-6xl px-6">
            <motion.div
              variants={revealUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="text-center"
            >
              <h2 className="text-3xl font-bold text-white sm:text-4xl">
                Why ThirstMetrics
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-slate-400">
                We build software the way we wish someone had built it for us — lean, honest, and useful on day one.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="mt-16 grid gap-10 sm:grid-cols-2"
            >
              {whyPoints.map((w) => {
                const Icon = w.icon;
                return (
                  <motion.div
                    key={w.title}
                    variants={staggerItem}
                    className="flex gap-5"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#0d7377]/10">
                      <Icon className="h-5 w-5 text-[#22d3e6]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        {w.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-slate-400">
                        {w.text}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* ── Roadmap ───────────────────────────────────── */}
        <section className="bg-slate-900 py-24 sm:py-32">
          <div className="mx-auto max-w-3xl px-6">
            <motion.div
              variants={revealUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="text-center"
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#22d3e6]/10">
                <Rocket className="h-6 w-6 text-[#22d3e6]" />
              </div>
              <h2 className="text-3xl font-bold text-white sm:text-4xl">
                What&apos;s Next
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-slate-400">
                We ship steadily. Here&apos;s what&apos;s on the horizon.
              </p>
            </motion.div>

            <motion.ul
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="mt-12 space-y-5"
            >
              {roadmapItems.map((item) => (
                <motion.li
                  key={item}
                  variants={staggerItem}
                  className="flex gap-3 rounded-xl border border-slate-800 bg-slate-950/60 px-6 py-4 text-sm leading-relaxed text-slate-300"
                >
                  <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-[#22d3e6]" />
                  {item}
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </section>

        {/* ── Contact ───────────────────────────────────── */}
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
