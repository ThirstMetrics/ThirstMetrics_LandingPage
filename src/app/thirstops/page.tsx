"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Building2,
  ClipboardList,
  Globe,
  Layers,
  Mail,
  MapPin,
  Package,
  Route,
  Shield,
  Smartphone,
  Truck,
  Users,
  Warehouse,
  Zap,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  revealUp,
  staggerContainer,
  staggerItem,
  viewport,
  hoverLift,
  fadeIn,
} from "@/lib/motion";

/* ───────────────────── Data ───────────────────── */

const modules = [
  {
    icon: Package,
    name: "Product & Pricing Engine",
    description:
      "SKU generation, multi-tier pricing, pallet building, and excise tax calculation. Configure for any state, any product type.",
  },
  {
    icon: Layers,
    name: "Supplier Pipeline",
    description:
      "Parse supplier offers, build pricing worksheets, generate sales sheets, and manage preorders — from new product to first delivery.",
  },
  {
    icon: Smartphone,
    name: "Field CRM",
    description:
      "Mobile PWA for sales reps. GPS check-ins, photo documentation, sample tracking, and account intelligence — works offline.",
  },
  {
    icon: MapPin,
    name: "Lead Finder",
    description:
      "Scan public license databases, auto-geocode, classify by neighborhood and market segment, and assign to reps. Never miss a new account.",
  },
  {
    icon: BarChart3,
    name: "Supplier Analytics",
    description:
      "Depletion reports, velocity tracking, territory performance, and supplier-facing dashboards with your branding.",
  },
  {
    icon: Mail,
    name: "Email Engine",
    description:
      "Campaign builder with templates, A/B testing, open and click tracking. Reach every account in your book with targeted communications.",
  },
  {
    icon: ClipboardList,
    name: "Setup Forms",
    description:
      "Generate account setup packets for chain accounts — MGM, Wynn, Stations, or your local chains. One click, fully populated.",
  },
  {
    icon: Shield,
    name: "Auth & Teams",
    description:
      "Token-based invitations, role-based access, salesperson linking. Admins, managers, reps, suppliers — everyone sees exactly what they need.",
  },
];

const integrations = [
  {
    name: "QuickBooks",
    description: "CSV import/export today, OAuth2 API real-time sync on the roadmap. Journal generation, transaction reconciliation, Fintech.com integration.",
    status: "Live",
  },
  {
    name: "Odoo",
    description: "Connector module for Odoo Enterprise and Community. Bidirectional sync of products, accounts, invoices, and payments.",
    status: "Coming Q3 2026",
  },
  {
    name: "ERPNext",
    description: "Headless accounting engine. Full GL, AP/AR, bank reconciliation — all behind the ThirstOps UI. Eliminate QuickBooks entirely.",
    status: "Coming 2027",
  },
];

const metrics = [
  { value: "2,000+", label: "Products Managed" },
  { value: "5,500+", label: "Accounts Tracked" },
  { value: "6,900+", label: "Contacts in CRM" },
  { value: "9", label: "Integrated Modules" },
];

const whyPoints = [
  {
    icon: Building2,
    title: "Built by a Distributor, for Distributors",
    text: "Not by a software company guessing what you need. Every feature exists because it solved a real problem at a real distributor.",
  },
  {
    icon: Zap,
    title: "Modern Stack, Not Legacy Software",
    text: "Browser-based, mobile-ready, and built with the same technology powering today's best web applications. No installs, no IT department required.",
  },
  {
    icon: Globe,
    title: "State-Aware Configuration",
    text: "Excise tax rules, compliance reports, and license scanning configured per state. Add a new market without starting over.",
  },
  {
    icon: Users,
    title: "Your Workflow, Not Ours",
    text: "We customize ThirstOps to match how you actually operate — not the other way around. Every distributor is different and that's the point.",
  },
];

const pricingTiers = [
  {
    name: "Starter",
    price: "$149–299",
    period: "/month",
    setup: "No setup fee",
    features: [
      "Up to 5 users",
      "1 state",
      "QB CSV integration",
      "Field CRM + Lead Finder",
      "Email campaigns",
      "Email support",
    ],
    cta: "Start Free Trial",
    highlighted: false,
  },
  {
    name: "Professional",
    price: "$499–999",
    period: "/month",
    setup: "$3K–8K setup sprint",
    features: [
      "Up to 20 users",
      "1–3 states",
      "QB API or Odoo connector",
      "All modules included",
      "Custom report templates",
      "Priority support + weekly check-in",
      "Dedicated setup sprint",
    ],
    cta: "Talk to Sales",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "$1,499–2,999",
    period: "/month",
    setup: "$10K–25K setup sprint",
    features: [
      "Unlimited users & states",
      "All integrations (QB, Odoo, ERPNext)",
      "Bespoke development",
      "Dedicated account manager",
      "Custom compliance modules",
      "On-site training available",
      "Full API access (read/write)",
    ],
    cta: "Talk to Sales",
    highlighted: false,
  },
];

/* ───────────────────── Page ───────────────────── */

export default function ThirstOpsPage() {
  return (
    <>
      <Header />
      <main>
        {/* ── Hero ──────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-slate-950 pt-32 pb-24 sm:pt-40 sm:pb-32">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(13,115,119,0.18),transparent)]" />

          <div className="relative mx-auto max-w-4xl px-6 text-center">
            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#0d7377]/30 bg-[#0d7377]/10 px-4 py-1.5 text-sm font-medium text-[#22d3e6]"
            >
              <Warehouse className="h-4 w-4" />A ThirstMetrics Product
            </motion.div>

            <motion.h1
              variants={revealUp}
              initial="hidden"
              animate="visible"
              className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              The ERP Built for{" "}
              <span className="bg-gradient-to-r from-[#0d7377] to-[#22d3e6] bg-clip-text text-transparent">
                Beverage Distribution
              </span>
            </motion.h1>

            <motion.p
              variants={revealUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.15 }}
              className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-400 sm:text-xl"
            >
              CRM, warehouse management, supplier pipeline, route operations,
              and compliance — in one platform that augments QuickBooks today
              and replaces it tomorrow.
            </motion.p>

            <motion.div
              variants={revealUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.3 }}
              className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
            >
              <a
                href="#pricing"
                className="inline-flex items-center gap-2 rounded-lg bg-[#0d7377] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#0d7377]/20 transition-colors hover:bg-[#0d7377]/90"
              >
                See Pricing
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#modules"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-700 px-7 py-3.5 text-sm font-semibold text-slate-300 transition-colors hover:border-slate-600 hover:text-white"
              >
                Explore Modules
              </a>
            </motion.div>
          </div>
        </section>

        {/* ── Metrics Bar ─────────────────────────────── */}
        <section className="border-y border-slate-800 bg-slate-900">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="mx-auto grid max-w-5xl grid-cols-2 divide-x divide-slate-800 sm:grid-cols-4"
          >
            {metrics.map((m) => (
              <motion.div
                key={m.label}
                variants={staggerItem}
                className="px-6 py-8 text-center"
              >
                <div className="font-mono text-3xl font-bold text-[#22d3e6] sm:text-4xl">
                  {m.value}
                </div>
                <div className="mt-1 text-sm text-slate-400">{m.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ── Modules ─────────────────────────────────── */}
        <section id="modules" className="bg-slate-950 py-24 sm:py-32">
          <div className="mx-auto max-w-6xl px-6">
            <motion.div
              variants={revealUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="text-center"
            >
              <h2 className="text-3xl font-bold text-white sm:text-4xl">
                Everything You Need, Nothing You Don&apos;t
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-slate-400">
                Eight integrated modules covering every aspect of distribution
                operations — from first contact to final delivery.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
            >
              {modules.map((m) => {
                const Icon = m.icon;
                return (
                  <motion.div
                    key={m.name}
                    variants={staggerItem}
                    whileHover={hoverLift}
                    className="group rounded-2xl border border-slate-800 bg-slate-950/60 p-6 backdrop-blur transition-colors hover:border-[#0d7377]/40"
                  >
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#0d7377]/10">
                      <Icon className="h-5 w-5 text-[#22d3e6]" />
                    </div>
                    <h3 className="text-base font-semibold text-white">
                      {m.name}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-400">
                      {m.description}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* ── Why ThirstOps ───────────────────────────── */}
        <section className="bg-slate-900 py-24 sm:py-32">
          <div className="mx-auto max-w-6xl px-6">
            <motion.div
              variants={revealUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="text-center"
            >
              <h2 className="text-3xl font-bold text-white sm:text-4xl">
                Why ThirstOps
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-slate-400">
                Software for distributors who are tired of paying too much for
                tools that don&apos;t fit.
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

        {/* ── How It Works ────────────────────────────── */}
        <section className="bg-slate-950 py-24 sm:py-32">
          <div className="mx-auto max-w-5xl px-6">
            <motion.div
              variants={revealUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="text-center"
            >
              <h2 className="text-3xl font-bold text-white sm:text-4xl">
                Three Ways to Connect
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-slate-400">
                Keep your current accounting system or let us replace it.
                ThirstOps adapts to where you are today.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="mt-16 grid gap-6 sm:grid-cols-3"
            >
              {integrations.map((i) => (
                <motion.div
                  key={i.name}
                  variants={staggerItem}
                  whileHover={hoverLift}
                  className="relative rounded-2xl border border-slate-800 bg-slate-950/60 p-8 backdrop-blur transition-colors hover:border-[#0d7377]/40"
                >
                  <span
                    className={`absolute top-4 right-4 rounded-full px-3 py-1 text-xs font-medium ${
                      i.status === "Live"
                        ? "bg-emerald-500/10 text-emerald-400"
                        : "bg-[#22d3e6]/10 text-[#22d3e6]"
                    }`}
                  >
                    {i.status}
                  </span>
                  <h3 className="text-xl font-semibold text-white">
                    {i.name}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-400">
                    {i.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── Comparison Band ─────────────────────────── */}
        <section className="relative bg-slate-900 py-24 sm:py-32">
          <div className="mx-auto max-w-4xl px-6">
            <motion.div
              variants={revealUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="text-center"
            >
              <h2 className="text-3xl font-bold text-white sm:text-4xl">
                How We Compare
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-slate-400">
                ThirstOps delivers more at a fraction of the cost of legacy
                beverage distribution software.
              </p>
            </motion.div>

            <motion.div
              variants={revealUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="mt-12 overflow-hidden rounded-2xl border border-slate-800"
            >
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-950/80">
                    <th className="px-6 py-4 font-medium text-slate-400">
                      Feature
                    </th>
                    <th className="px-6 py-4 font-semibold text-[#22d3e6]">
                      ThirstOps
                    </th>
                    <th className="px-6 py-4 font-medium text-slate-400">
                      Encompass
                    </th>
                    <th className="hidden px-6 py-4 font-medium text-slate-400 sm:table-cell">
                      Fishbowl + QB
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/50">
                  {[
                    ["Monthly Cost", "$149–2,999", "$1,500–5,000+", "$0* + $99+ QB"],
                    ["Setup Time", "1–4 weeks", "6–12 months", "Self-serve"],
                    ["Field CRM (Mobile)", "Included", "Add-on", "Not available"],
                    ["Lead Finder", "Included", "Not available", "Not available"],
                    ["Email Campaigns", "Included", "Not available", "Not available"],
                    ["Supplier Dashboards", "Included", "Add-on", "Not available"],
                    ["Custom Reports", "Included (Pro+)", "Extra cost", "Limited"],
                    ["Bespoke Development", "Available", "Rigid", "Not available"],
                  ].map(([feature, us, encompass, fishbowl]) => (
                    <tr key={feature} className="hover:bg-slate-800/20">
                      <td className="px-6 py-3 text-slate-300">{feature}</td>
                      <td className="px-6 py-3 font-medium text-white">
                        {us}
                      </td>
                      <td className="px-6 py-3 text-slate-500">{encompass}</td>
                      <td className="hidden px-6 py-3 text-slate-500 sm:table-cell">
                        {fishbowl}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="border-t border-slate-800 bg-slate-950/40 px-6 py-3">
                <p className="text-xs text-slate-500">
                  * Fishbowl is a one-time purchase ($4K–$10K+). QuickBooks Online Plus starts at $99/mo.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Pricing ─────────────────────────────────── */}
        <section id="pricing" className="bg-slate-950 py-24 sm:py-32">
          <div className="mx-auto max-w-6xl px-6">
            <motion.div
              variants={revealUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="text-center"
            >
              <h2 className="text-3xl font-bold text-white sm:text-4xl">
                Simple, Transparent Pricing
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-slate-400">
                No hidden fees, no per-transaction charges. Pick the tier that
                fits today — upgrade when you grow.
              </p>
              <a
                href="/thirstops/pricing"
                className="mt-6 inline-flex items-center gap-2 rounded-lg border border-[#0d7377] px-6 py-2.5 text-sm font-semibold text-[#22d3e6] transition-colors hover:bg-[#0d7377]/10"
              >
                Build Your Custom Quote
                <ArrowRight className="h-4 w-4" />
              </a>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="mt-16 grid gap-8 sm:grid-cols-3"
            >
              {pricingTiers.map((tier) => (
                <motion.div
                  key={tier.name}
                  variants={staggerItem}
                  whileHover={hoverLift}
                  className={`relative flex flex-col rounded-2xl border p-8 backdrop-blur ${
                    tier.highlighted
                      ? "border-[#0d7377] bg-[#0d7377]/5 shadow-lg shadow-[#0d7377]/10"
                      : "border-slate-800 bg-slate-950/60"
                  }`}
                >
                  {tier.highlighted && (
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-[#0d7377] px-4 py-1 text-xs font-semibold text-white">
                      Most Popular
                    </span>
                  )}

                  <h3 className="text-lg font-semibold text-white">
                    {tier.name}
                  </h3>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="font-mono text-4xl font-bold text-white">
                      {tier.price}
                    </span>
                    <span className="text-sm text-slate-400">
                      {tier.period}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-slate-500">{tier.setup}</p>

                  <ul className="mt-8 flex-1 space-y-3">
                    {tier.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-2 text-sm text-slate-300"
                      >
                        <svg
                          className="mt-0.5 h-4 w-4 shrink-0 text-[#22d3e6]"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.5 12.75l6 6 9-13.5"
                          />
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <a
                    href="#contact"
                    className={`mt-8 block rounded-lg py-3 text-center text-sm font-semibold transition-colors ${
                      tier.highlighted
                        ? "bg-[#0d7377] text-white shadow-lg shadow-[#0d7377]/20 hover:bg-[#0d7377]/90"
                        : "border border-slate-700 text-slate-300 hover:border-slate-600 hover:text-white"
                    }`}
                  >
                    {tier.cta}
                  </a>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── Verticals ───────────────────────────────── */}
        <section className="bg-slate-900 py-24 sm:py-32">
          <div className="mx-auto max-w-5xl px-6">
            <motion.div
              variants={revealUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="text-center"
            >
              <h2 className="text-3xl font-bold text-white sm:text-4xl">
                Built for Beverage. Ready for Any Warehouse.
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-slate-400">
                ThirstOps was born in beverage distribution, but the platform is
                architected for any distribution vertical.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            >
              {[
                { icon: Package, label: "Beer, Wine & Spirits" },
                { icon: Truck, label: "Food Service Distribution" },
                { icon: Warehouse, label: "General Warehousing" },
                { icon: Route, label: "Route-Based Delivery" },
                { icon: ClipboardList, label: "Janitorial & Chemical Supply" },
                { icon: Building2, label: "Building Materials" },
              ].map((v) => {
                const Icon = v.icon;
                return (
                  <motion.div
                    key={v.label}
                    variants={staggerItem}
                    className="flex items-center gap-4 rounded-xl border border-slate-800 bg-slate-950/40 px-5 py-4"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#0d7377]/10">
                      <Icon className="h-4.5 w-4.5 text-[#22d3e6]" />
                    </div>
                    <span className="text-sm font-medium text-slate-300">
                      {v.label}
                    </span>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* ── CTA ─────────────────────────────────────── */}
        <section
          id="contact"
          className="relative bg-slate-950 py-24 sm:py-32"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_100%,rgba(13,115,119,0.12),transparent)]" />

          <div className="relative mx-auto max-w-2xl px-6 text-center">
            <motion.div
              variants={revealUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
            >
              <h2 className="text-3xl font-bold text-white sm:text-4xl">
                Ready to Modernize Your Operation?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-slate-400">
                Schedule a walkthrough and see ThirstOps running with your data.
                No commitment, no credit card — just a conversation.
              </p>

              <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <a
                  href="mailto:hello@thirstmetrics.com?subject=ThirstOps%20Demo%20Request"
                  className="inline-flex items-center gap-2 rounded-lg bg-[#0d7377] px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-[#0d7377]/20 transition-colors hover:bg-[#0d7377]/90"
                >
                  Request a Demo
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="/#contact"
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-700 px-8 py-4 text-sm font-semibold text-slate-300 transition-colors hover:border-slate-600 hover:text-white"
                >
                  Contact ThirstMetrics
                </a>
              </div>

              <p className="mt-8 text-xs text-slate-500">
                Or email us directly at{" "}
                <a
                  href="mailto:hello@thirstmetrics.com"
                  className="text-[#22d3e6] hover:underline"
                >
                  hello@thirstmetrics.com
                </a>
              </p>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
