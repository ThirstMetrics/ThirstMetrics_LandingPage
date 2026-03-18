"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Check,
  Clock,
  Smartphone,
  Mail,
  MapPin,
  BarChart3,
  Globe,
  Shield,
  X,
  Zap,
  Gift,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { revealUp, staggerContainer, staggerItem, viewport } from "@/lib/motion";

/* ───────────────── Config / types ───────────────── */

interface CalcState {
  reps: number;
  states: number;
  migration: string;
  industry: string;
  products: number;
  accounts: number;
  locations: number;
  contractTerm: string;
  chainAccounts: number;
  historyYears: number;
  addons: Record<string, boolean>;
}

interface CalcResult {
  tier: string;
  tierExplanation: string;
  monthly: number;
  setup: number;
  timelineWeeks: number;
  included: string[];
}

const MIGRATION_OPTIONS = [
  { value: "fresh", label: "Starting Fresh (no existing system)" },
  { value: "qb_bolt", label: "Keep QuickBooks + Add ThirstOps" },
  { value: "qb_migrate", label: "Migrate from QuickBooks to All-in-One" },
  { value: "encompass", label: "Migrate from Encompass/VIP" },
  { value: "odoo", label: "Plug ThirstOps into Existing Odoo" },
];

const INDUSTRY_OPTIONS = [
  { value: "beverage", label: "Beverage Distribution" },
  { value: "food", label: "Food Service" },
  { value: "janitorial", label: "Janitorial / Chemical" },
  { value: "building", label: "Building Materials" },
  { value: "general", label: "General Warehousing" },
];

const ADDONS = [
  { id: "crm", label: "Field CRM (mobile app for reps)", icon: Smartphone },
  { id: "email", label: "Email Campaign Engine", icon: Mail },
  { id: "leads", label: "Lead Finder & Scanner", icon: MapPin },
  { id: "supplier", label: "Supplier Analytics Portal", icon: BarChart3 },
  { id: "odoo", label: "Odoo Connector", icon: Globe },
  { id: "compliance", label: "Custom Compliance Module", icon: Shield },
];

const TIER_COMPARISON = [
  { feature: "Starting at", starter: "$199/mo", professional: "$699/mo", enterprise: "$1,999/mo" },
  { feature: "Users", starter: "Up to 5", professional: "5–20", enterprise: "Unlimited" },
  { feature: "States", starter: "1", professional: "1–3", enterprise: "Unlimited" },
  { feature: "QB Integration", starter: "CSV", professional: "CSV or API", enterprise: "Full API" },
  { feature: "Support", starter: "Email", professional: "Priority + calls", enterprise: "Dedicated + Slack" },
  { feature: "Custom Reports", starter: "—", professional: "Up to 5", enterprise: "Unlimited" },
  { feature: "Odoo / ERPNext", starter: "—", professional: "Odoo available", enterprise: "All integrations" },
  { feature: "Annual Discount", starter: "15%", professional: "15%", enterprise: "15%" },
];

/* ───────────────── Calculation engine ───────────── */

function calculate(s: CalcState): CalcResult {
  const addonCount = Object.values(s.addons).filter(Boolean).length;
  let tier = "Starter";
  if (s.reps > 20 || s.states > 3 || s.migration === "encompass" || addonCount >= 5 || s.locations > 3) {
    tier = "Enterprise";
  } else if (s.reps > 5 || s.states > 1 || ["qb_bolt", "qb_migrate", "odoo"].includes(s.migration) || addonCount >= 2 || s.locations > 1) {
    tier = "Professional";
  }

  // Base monthly by tier
  const baseMap = { Starter: 199, Professional: 699, Enterprise: 1999 };
  let monthly = baseMap[tier as keyof typeof baseMap];

  // Adjustments based on exact inputs
  monthly += Math.max(0, s.states - 1) * 75;
  monthly += addonCount * 40;
  monthly += Math.max(0, s.locations - 1) * 100;
  monthly += Math.max(0, s.reps - (tier === "Starter" ? 5 : tier === "Professional" ? 10 : 25)) * 15;
  // Product volume surcharge (per 500 products over 500)
  monthly += Math.max(0, Math.floor((s.products - 500) / 500)) * 25;
  // Account volume surcharge (per 1000 accounts over 1000)
  monthly += Math.max(0, Math.floor((s.accounts - 1000) / 1000)) * 35;
  // Chain accounts needing EDI/setup forms
  monthly += s.chainAccounts * 10;
  // Annual contract discount
  if (s.contractTerm === "annual") monthly = Math.round(monthly * 0.85);

  // Setup cost — exact based on migration + data volume
  const setupBase: Record<string, number> = {
    fresh: 0,
    qb_bolt: 4500,
    qb_migrate: 10000,
    encompass: 18000,
    odoo: 4000,
  };
  let setup = setupBase[s.migration] || 0;
  setup += Math.max(0, s.states - 1) * 3000;
  setup += Math.max(0, s.locations - 1) * 2000;
  // Data migration cost scales with history
  if (s.migration !== "fresh") {
    setup += s.historyYears * 500;
    setup += Math.floor(s.products / 500) * 300;
    setup += Math.floor(s.accounts / 1000) * 400;
  }
  // Chain account setup (EDI config, setup forms)
  setup += s.chainAccounts * 250;

  // Timeline — exact weeks based on complexity
  const tlBase: Record<string, number> = {
    fresh: 1,
    qb_bolt: 3,
    qb_migrate: 5,
    encompass: 8,
    odoo: 2,
  };
  let weeks = tlBase[s.migration] || 2;
  weeks += Math.max(0, s.states - 1);
  weeks += Math.max(0, s.locations - 1);
  if (s.historyYears > 3) weeks += 1;
  if (s.products > 2000) weeks += 1;
  if (s.chainAccounts > 10) weeks += 1;

  const explanations: Record<string, string> = {
    Starter: `With ${s.reps} rep${s.reps > 1 ? "s" : ""}, ${s.products.toLocaleString()} products, and ${s.accounts.toLocaleString()} accounts in ${s.states} state${s.states > 1 ? "s" : ""} — Starter gives you everything to get rolling.`,
    Professional: `Your setup (${s.reps} reps, ${s.products.toLocaleString()} products, ${s.locations} location${s.locations > 1 ? "s" : ""}) fits Professional — includes a dedicated setup sprint and expanded features.`,
    Enterprise: `With ${s.reps} reps, ${s.products.toLocaleString()} products across ${s.states} state${s.states > 1 ? "s" : ""} and ${s.locations} location${s.locations > 1 ? "s" : ""} — Enterprise gives you unlimited everything with bespoke development.`,
  };

  const included: string[] = [];
  if (tier === "Starter") {
    included.push("Up to 5 users", "1 state", "QB CSV integration", "Standard reports", "Email support");
  } else if (tier === "Professional") {
    included.push("Up to 20 users", "1–3 states", "QB API or Odoo connector", "Custom report templates", "Priority support + weekly check-in", "Dedicated setup sprint");
  } else {
    included.push("Unlimited users & states", "All integrations", "Bespoke development", "Dedicated account manager", "Custom compliance modules", "Full API access");
  }
  if (s.addons.crm) included.push("Field CRM (mobile)");
  if (s.addons.email) included.push("Email Campaign Engine");
  if (s.addons.leads) included.push("Lead Finder & Scanner");
  if (s.addons.supplier) included.push("Supplier Analytics Portal");

  return {
    tier,
    tierExplanation: explanations[tier],
    monthly,
    setup,
    timelineWeeks: weeks,
    included,
  };
}

/* ───────────────── Price Digit Roller ───────────── */

function RollingPrice({
  value,
  prefix = "$",
  slashed = false,
  duration = 1200,
}: {
  value: number;
  prefix?: string;
  slashed?: boolean;
  duration?: number;
}) {
  const [display, setDisplay] = useState(value);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const start = display;
    const diff = value - start;
    if (diff === 0) return;
    const startTime = performance.now();

    function animate(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(start + diff * eased));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    }
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, duration]);

  return (
    <span className="relative inline-block tabular-nums">
      {slashed && (
        <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="block w-[120%] h-[3px] bg-red-500 -rotate-12 rounded-full -ml-[10%]" />
        </span>
      )}
      <span className={slashed ? "text-slate-500 line-through decoration-red-500 decoration-2" : ""}>
        {prefix}{display.toLocaleString()}
      </span>
    </span>
  );
}

/* ───────────────── Registration Modal ───────────── */

function ReservationModal({
  open,
  onClose,
  onSubmit,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (email: string, name: string, company: string) => void;
}) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    onSubmit(email, name, company);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900 p-8 shadow-2xl"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="mb-6 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#0d7377]/20">
                <Gift className="h-7 w-7 text-[#22d3e6]" />
              </div>
              <h3 className="text-2xl font-bold text-white">
                Reserve Your Place
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                Be the first to enjoy the benefits of ThirstOps when it becomes
                available in <span className="font-semibold text-[#22d3e6]">July 2026</span>.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Smith"
                  className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-[#0d7377] focus:ring-1 focus:ring-[#0d7377]"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  Work Email *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-[#0d7377] focus:ring-1 focus:ring-[#0d7377]"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  Company
                </label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Acme Distribution"
                  className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-[#0d7377] focus:ring-1 focus:ring-[#0d7377]"
                />
              </div>

              {error && (
                <p className="text-xs text-red-400">{error}</p>
              )}

              <button
                type="submit"
                className="w-full rounded-lg bg-[#0d7377] py-3 text-sm font-semibold text-white shadow-lg shadow-[#0d7377]/20 transition-colors hover:bg-[#0d7377]/90"
              >
                Reserve My Spot
              </button>
              <p className="text-center text-xs text-slate-500">
                No credit card required. No obligation.
              </p>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ───────────────── Countdown Timer ──────────────── */

function Countdown48({ startedAt }: { startedAt: number }) {
  const [remaining, setRemaining] = useState("");

  useEffect(() => {
    const end = startedAt + 48 * 60 * 60 * 1000;
    function tick() {
      const diff = Math.max(0, end - Date.now());
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setRemaining(
        `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`
      );
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [startedAt]);

  return (
    <span className="font-mono text-lg font-bold text-[#22d3e6] tabular-nums">
      {remaining}
    </span>
  );
}

/* ───────────────── Main Page ────────────────────── */

export default function PricingCalculatorPage() {
  const [calc, setCalc] = useState<CalcState>({
    reps: 5,
    states: 1,
    migration: "fresh",
    industry: "beverage",
    products: 500,
    accounts: 1000,
    locations: 1,
    contractTerm: "monthly",
    chainAccounts: 0,
    historyYears: 0,
    addons: {},
  });

  const [result, setResult] = useState<CalcResult>(() => calculate(calc));
  const [interactionCount, setInteractionCount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [promoTimestamp, setPromoTimestamp] = useState(0);
  const [showPromo, setShowPromo] = useState(false);
  const modalShownRef = useRef(false);

  const update = useCallback(
    (patch: Partial<CalcState>) => {
      const next = { ...calc, ...patch };
      setCalc(next);
      setResult(calculate(next));
      setInteractionCount((c) => c + 1);
    },
    [calc]
  );

  const toggleAddon = useCallback(
    (id: string) => {
      const next = { ...calc, addons: { ...calc.addons, [id]: !calc.addons[id] } };
      setCalc(next);
      setResult(calculate(next));
      setInteractionCount((c) => c + 1);
    },
    [calc]
  );

  // Show modal after 3 interactions (user is engaged)
  useEffect(() => {
    if (interactionCount >= 3 && !modalShownRef.current && !registered) {
      modalShownRef.current = true;
      const timer = setTimeout(() => setShowModal(true), 600);
      return () => clearTimeout(timer);
    }
  }, [interactionCount, registered]);

  const handleRegister = (_email: string, _name: string, _company: string) => {
    setRegistered(true);
    setShowModal(false);
    // Trigger the price slash animation after a brief pause
    setTimeout(() => {
      setPromoTimestamp(Date.now());
      setShowPromo(true);
    }, 400);
  };

  const halfMonthly = Math.round(result.monthly / 2);
  const halfSetup = Math.round(result.setup / 2);

  const displayMonthly = showPromo ? halfMonthly : result.monthly;
  const displaySetup = showPromo ? halfSetup : result.setup;

  const timelinePct = Math.min(100, (result.timelineWeeks / 14) * 100);

  const tierColor: Record<string, string> = {
    Starter: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    Professional: "bg-[#0d7377]/20 text-[#22d3e6] border-[#0d7377]/30",
    Enterprise: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  };

  return (
    <>
      <Header />
      <main>
        {/* ── Hero ──────────────────────────────────── */}
        <section className="relative overflow-hidden bg-slate-950 pt-32 pb-16 sm:pt-40 sm:pb-20">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(13,115,119,0.18),transparent)]" />
          <div className="relative mx-auto max-w-3xl px-6 text-center">
            <motion.h1
              variants={revealUp}
              initial="hidden"
              animate="visible"
              className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl"
            >
              Build Your{" "}
              <span className="bg-gradient-to-r from-[#0d7377] to-[#22d3e6] bg-clip-text text-transparent">
                Custom Quote
              </span>
            </motion.h1>
            <motion.p
              variants={revealUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.12 }}
              className="mx-auto mt-4 max-w-xl text-base text-slate-400 sm:text-lg"
            >
              Configure your setup and see real-time pricing. No surprises, no
              hidden fees — just honest numbers.
            </motion.p>
          </div>
        </section>

        {/* ── Intro Promo Banner (after registration) ─ */}
        <AnimatePresence>
          {showPromo && (
            <motion.section
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="overflow-hidden border-y border-[#0d7377]/40 bg-slate-950"
            >
              <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 px-6 py-6 text-center sm:flex-row sm:text-left">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#22d3e6]/10">
                  <Zap className="h-6 w-6 text-[#22d3e6]" />
                </div>
                <div className="flex-1">
                  <p className="text-base font-semibold text-white">
                    Lock in introductory pricing — <span className="text-[#22d3e6]">50% off</span> every price below.
                  </p>
                  <p className="mt-1 text-sm text-slate-400">
                    This offer expires in{" "}
                    <Countdown48 startedAt={promoTimestamp} />{" "}
                    — act now to secure these rates for your first 12 months.
                  </p>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* ── Calculator ──────────────────────────────── */}
        <section className="bg-slate-900 py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid gap-10 lg:grid-cols-5">
              {/* ── Left: Inputs ──────────────────────── */}
              <div className="lg:col-span-2 space-y-6">
                <motion.div
                  variants={revealUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewport}
                  className="rounded-2xl border border-slate-800 bg-slate-950/60 p-6 backdrop-blur space-y-6"
                >
                  <h2 className="text-lg font-semibold text-white">
                    Configure Your Setup
                  </h2>

                  {/* Reps slider */}
                  <div>
                    <label className="flex items-center justify-between text-sm text-slate-400 mb-2">
                      Sales Reps
                      <span className="font-mono font-bold text-[#22d3e6]">
                        {calc.reps}
                      </span>
                    </label>
                    <input
                      type="range"
                      min={1}
                      max={50}
                      value={calc.reps}
                      onChange={(e) =>
                        update({ reps: parseInt(e.target.value) })
                      }
                      className="w-full accent-[#0d7377]"
                      style={{
                        background: `linear-gradient(to right, #0d7377 ${((calc.reps - 1) / 49) * 100}%, #334155 ${((calc.reps - 1) / 49) * 100}%)`,
                      }}
                    />
                    <div className="flex justify-between text-xs text-slate-600 mt-1">
                      <span>1</span>
                      <span>25</span>
                      <span>50</span>
                    </div>
                  </div>

                  {/* States slider */}
                  <div>
                    <label className="flex items-center justify-between text-sm text-slate-400 mb-2">
                      States of Operation
                      <span className="font-mono font-bold text-[#22d3e6]">
                        {calc.states}
                      </span>
                    </label>
                    <input
                      type="range"
                      min={1}
                      max={10}
                      value={calc.states}
                      onChange={(e) =>
                        update({ states: parseInt(e.target.value) })
                      }
                      className="w-full accent-[#0d7377]"
                      style={{
                        background: `linear-gradient(to right, #0d7377 ${((calc.states - 1) / 9) * 100}%, #334155 ${((calc.states - 1) / 9) * 100}%)`,
                      }}
                    />
                    <div className="flex justify-between text-xs text-slate-600 mt-1">
                      <span>1</span>
                      <span>5</span>
                      <span>10</span>
                    </div>
                  </div>

                  {/* Migration type */}
                  <div>
                    <label className="block text-sm text-slate-400 mb-2">
                      Migration Type
                    </label>
                    <select
                      value={calc.migration}
                      onChange={(e) => update({ migration: e.target.value })}
                      className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2.5 text-sm text-white outline-none focus:border-[#0d7377] focus:ring-1 focus:ring-[#0d7377]"
                    >
                      {MIGRATION_OPTIONS.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Industry */}
                  <div>
                    <label className="block text-sm text-slate-400 mb-2">
                      Industry Vertical
                    </label>
                    <select
                      value={calc.industry}
                      onChange={(e) => update({ industry: e.target.value })}
                      className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2.5 text-sm text-white outline-none focus:border-[#0d7377] focus:ring-1 focus:ring-[#0d7377]"
                    >
                      {INDUSTRY_OPTIONS.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Products */}
                  <div>
                    <label className="flex items-center justify-between text-sm text-slate-400 mb-2">
                      Products / SKUs
                      <span className="font-mono font-bold text-[#22d3e6]">
                        {calc.products.toLocaleString()}
                      </span>
                    </label>
                    <input
                      type="range"
                      min={50}
                      max={10000}
                      step={50}
                      value={calc.products}
                      onChange={(e) =>
                        update({ products: parseInt(e.target.value) })
                      }
                      className="w-full accent-[#0d7377]"
                      style={{
                        background: `linear-gradient(to right, #0d7377 ${((calc.products - 50) / 9950) * 100}%, #334155 ${((calc.products - 50) / 9950) * 100}%)`,
                      }}
                    />
                    <div className="flex justify-between text-xs text-slate-600 mt-1">
                      <span>50</span>
                      <span>5,000</span>
                      <span>10,000</span>
                    </div>
                  </div>

                  {/* Accounts */}
                  <div>
                    <label className="flex items-center justify-between text-sm text-slate-400 mb-2">
                      Customer Accounts
                      <span className="font-mono font-bold text-[#22d3e6]">
                        {calc.accounts.toLocaleString()}
                      </span>
                    </label>
                    <input
                      type="range"
                      min={10}
                      max={20000}
                      step={10}
                      value={calc.accounts}
                      onChange={(e) =>
                        update({ accounts: parseInt(e.target.value) })
                      }
                      className="w-full accent-[#0d7377]"
                      style={{
                        background: `linear-gradient(to right, #0d7377 ${((calc.accounts - 10) / 19990) * 100}%, #334155 ${((calc.accounts - 10) / 19990) * 100}%)`,
                      }}
                    />
                    <div className="flex justify-between text-xs text-slate-600 mt-1">
                      <span>10</span>
                      <span>10K</span>
                      <span>20K</span>
                    </div>
                  </div>

                  {/* Warehouse Locations */}
                  <div>
                    <label className="flex items-center justify-between text-sm text-slate-400 mb-2">
                      Warehouse Locations
                      <span className="font-mono font-bold text-[#22d3e6]">
                        {calc.locations}
                      </span>
                    </label>
                    <input
                      type="range"
                      min={1}
                      max={10}
                      value={calc.locations}
                      onChange={(e) =>
                        update({ locations: parseInt(e.target.value) })
                      }
                      className="w-full accent-[#0d7377]"
                      style={{
                        background: `linear-gradient(to right, #0d7377 ${((calc.locations - 1) / 9) * 100}%, #334155 ${((calc.locations - 1) / 9) * 100}%)`,
                      }}
                    />
                    <div className="flex justify-between text-xs text-slate-600 mt-1">
                      <span>1</span>
                      <span>5</span>
                      <span>10</span>
                    </div>
                  </div>

                  {/* Chain Accounts */}
                  <div>
                    <label className="flex items-center justify-between text-sm text-slate-400 mb-2">
                      Chain Accounts (EDI/Setup Forms)
                      <span className="font-mono font-bold text-[#22d3e6]">
                        {calc.chainAccounts}
                      </span>
                    </label>
                    <input
                      type="range"
                      min={0}
                      max={50}
                      value={calc.chainAccounts}
                      onChange={(e) =>
                        update({ chainAccounts: parseInt(e.target.value) })
                      }
                      className="w-full accent-[#0d7377]"
                      style={{
                        background: `linear-gradient(to right, #0d7377 ${(calc.chainAccounts / 50) * 100}%, #334155 ${(calc.chainAccounts / 50) * 100}%)`,
                      }}
                    />
                    <div className="flex justify-between text-xs text-slate-600 mt-1">
                      <span>0</span>
                      <span>25</span>
                      <span>50</span>
                    </div>
                  </div>

                  {/* Historical Data Years */}
                  <div>
                    <label className="flex items-center justify-between text-sm text-slate-400 mb-2">
                      Years of History to Migrate
                      <span className="font-mono font-bold text-[#22d3e6]">
                        {calc.historyYears}
                      </span>
                    </label>
                    <input
                      type="range"
                      min={0}
                      max={10}
                      value={calc.historyYears}
                      onChange={(e) =>
                        update({ historyYears: parseInt(e.target.value) })
                      }
                      className="w-full accent-[#0d7377]"
                      style={{
                        background: `linear-gradient(to right, #0d7377 ${(calc.historyYears / 10) * 100}%, #334155 ${(calc.historyYears / 10) * 100}%)`,
                      }}
                    />
                    <div className="flex justify-between text-xs text-slate-600 mt-1">
                      <span>0</span>
                      <span>5</span>
                      <span>10</span>
                    </div>
                  </div>

                  {/* Contract Term */}
                  <div>
                    <label className="block text-sm text-slate-400 mb-2">
                      Contract Term
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { value: "monthly", label: "Monthly" },
                        { value: "annual", label: "Annual (15% off)" },
                      ].map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => update({ contractTerm: opt.value })}
                          className={`rounded-lg border px-3 py-2.5 text-sm font-medium transition-colors ${
                            calc.contractTerm === opt.value
                              ? "border-[#0d7377] bg-[#0d7377]/20 text-[#22d3e6]"
                              : "border-slate-700 bg-slate-800 text-slate-400 hover:border-slate-600"
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Add-ons */}
                  <div>
                    <label className="block text-sm text-slate-400 mb-3">
                      Add-ons
                    </label>
                    <div className="space-y-2.5">
                      {ADDONS.map((a) => {
                        const Icon = a.icon;
                        return (
                          <label
                            key={a.id}
                            className="flex items-center gap-3 cursor-pointer group"
                          >
                            <input
                              type="checkbox"
                              checked={!!calc.addons[a.id]}
                              onChange={() => toggleAddon(a.id)}
                              className="h-4 w-4 rounded border-slate-600 bg-slate-800 text-[#0d7377] focus:ring-[#0d7377]"
                            />
                            <Icon className="h-4 w-4 text-slate-500 group-hover:text-[#22d3e6] transition-colors" />
                            <span className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">
                              {a.label}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* ── Right: Results ────────────────────── */}
              <div className="lg:col-span-3 space-y-6">
                {/* Recommended Tier Card */}
                <motion.div
                  variants={revealUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewport}
                  className="rounded-2xl border border-slate-800 bg-slate-950/60 p-6 backdrop-blur"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-white">
                      Recommended Tier
                    </h2>
                    <span
                      className={`rounded-full border px-3 py-1 text-xs font-semibold ${tierColor[result.tier]}`}
                    >
                      {result.tier}
                    </span>
                  </div>
                  <p className="text-sm text-slate-400 mb-6">
                    {result.tierExplanation}
                  </p>

                  {/* Price cards */}
                  <div className="grid gap-4 sm:grid-cols-2 mb-6">
                    {/* Monthly */}
                    <div className="relative rounded-xl bg-slate-800/50 p-5 overflow-hidden">
                      <p className="text-xs font-medium uppercase tracking-widest text-slate-500 mb-2">
                        Monthly Cost
                      </p>
                      {showPromo && (
                        <div className="text-sm mb-1">
                          <span className="text-slate-500 line-through decoration-red-500/70 decoration-2">
                            ${result.monthly.toLocaleString()}
                          </span>
                        </div>
                      )}
                      <div className="flex items-baseline gap-1">
                        <span className="font-mono text-2xl font-bold text-white sm:text-3xl">
                          <RollingPrice
                            value={displayMonthly}
                            slashed={false}
                            duration={showPromo ? 1500 : 600}
                          />
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1">per month</p>
                      {showPromo && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
                          className="absolute top-3 right-3"
                        >
                          <span className="rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-bold text-white uppercase">
                            50% Off
                          </span>
                        </motion.div>
                      )}
                    </div>

                    {/* Setup */}
                    <div className="relative rounded-xl bg-slate-800/50 p-5 overflow-hidden">
                      <p className="text-xs font-medium uppercase tracking-widest text-slate-500 mb-2">
                        One-Time Setup
                      </p>
                      {showPromo && result.setup > 0 && (
                        <div className="text-sm mb-1">
                          <span className="text-slate-500 line-through decoration-red-500/70 decoration-2">
                            ${result.setup.toLocaleString()}
                          </span>
                        </div>
                      )}
                      <div className="flex items-baseline gap-1">
                        {result.setup === 0 ? (
                          <span className="font-mono text-2xl font-bold text-emerald-400 sm:text-3xl">
                            Free
                          </span>
                        ) : (
                          <span className="font-mono text-2xl font-bold text-white sm:text-3xl">
                            <RollingPrice
                              value={displaySetup}
                              duration={showPromo ? 1500 : 600}
                            />
                          </span>
                        )}
                      </div>
                      {showPromo && result.setup > 0 && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
                          className="absolute top-3 right-3"
                        >
                          <span className="rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-bold text-white uppercase">
                            50% Off
                          </span>
                        </motion.div>
                      )}
                    </div>
                  </div>

                  {/* Timeline bar */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium text-slate-400">
                        Estimated Setup Timeline
                      </p>
                      <span className="text-sm font-semibold text-[#22d3e6]">
                        {result.timelineWeeks} week{result.timelineWeeks !== 1 ? "s" : ""}
                      </span>
                    </div>
                    <div className="h-2.5 rounded-full bg-slate-800 overflow-hidden">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-[#0d7377] via-[#22d3e6] to-emerald-400"
                        initial={{ width: 0 }}
                        animate={{ width: `${timelinePct}%` }}
                        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                      />
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-600 mt-1">
                      <span>1 wk</span>
                      <span>4 wk</span>
                      <span>8 wk</span>
                      <span>12+ wk</span>
                    </div>
                  </div>

                  {/* Included */}
                  <div>
                    <h3 className="text-sm font-semibold text-slate-300 mb-3">
                      What&apos;s Included
                    </h3>
                    <ul className="grid gap-2 sm:grid-cols-2">
                      {result.included.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2 text-sm text-slate-400"
                        >
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#22d3e6]" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA */}
                  {!registered && (
                    <div className="mt-6 pt-6 border-t border-slate-800">
                      <button
                        onClick={() => setShowModal(true)}
                        className="w-full rounded-lg bg-[#0d7377] py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#0d7377]/20 transition-colors hover:bg-[#0d7377]/90 flex items-center justify-center gap-2"
                      >
                        Reserve Your Spot — Launching July 2026
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </motion.div>

                {/* Tier Comparison Table */}
                <motion.div
                  variants={revealUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewport}
                  className="rounded-2xl border border-slate-800 bg-slate-950/60 p-6 backdrop-blur overflow-hidden"
                >
                  <h3 className="text-lg font-semibold text-white mb-4">
                    All Tiers at a Glance
                  </h3>
                  <div className="overflow-x-auto -mx-2">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-slate-800">
                          <th className="py-2.5 pr-4 text-left font-medium text-slate-500" />
                          <th className="py-2.5 px-3 text-center font-medium text-slate-500">
                            Starter
                          </th>
                          <th className="py-2.5 px-3 text-center font-semibold text-[#22d3e6]">
                            Professional
                          </th>
                          <th className="py-2.5 px-3 text-center font-medium text-slate-500">
                            Enterprise
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/50">
                        {TIER_COMPARISON.map((row) => (
                          <tr key={row.feature} className="hover:bg-slate-800/20">
                            <td className="py-2.5 pr-4 text-slate-400">
                              {row.feature}
                            </td>
                            <td className="py-2.5 px-3 text-center text-slate-400">
                              {row.starter}
                            </td>
                            <td className="py-2.5 px-3 text-center font-medium text-white">
                              {row.professional}
                            </td>
                            <td className="py-2.5 px-3 text-center text-slate-400">
                              {row.enterprise}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Bottom CTA ──────────────────────────────── */}
        <section className="relative bg-slate-950 py-20">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_100%,rgba(13,115,119,0.1),transparent)]" />
          <div className="relative mx-auto max-w-2xl px-6 text-center">
            <motion.div
              variants={revealUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
            >
              <h2 className="text-2xl font-bold text-white sm:text-3xl">
                Questions? Let&apos;s Talk.
              </h2>
              <p className="mt-3 text-sm text-slate-400">
                Every distributor is different. We&apos;re happy to build a custom
                quote that fits exactly how you operate.
              </p>
              <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <a
                  href="mailto:hello@thirstmetrics.com?subject=ThirstOps%20Pricing%20Inquiry"
                  className="inline-flex items-center gap-2 rounded-lg bg-[#0d7377] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#0d7377]/20 transition-colors hover:bg-[#0d7377]/90"
                >
                  Email Us
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="/thirstops"
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-700 px-7 py-3.5 text-sm font-semibold text-slate-300 transition-colors hover:border-slate-600 hover:text-white"
                >
                  Back to ThirstOps
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />

      {/* ── Registration Modal ────────────────────── */}
      <ReservationModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleRegister}
      />
    </>
  );
}
