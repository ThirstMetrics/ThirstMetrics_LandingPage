"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, Loader2 } from "lucide-react";
import { isBlockedDomain } from "@/constants/email-blocklist";
import { US_STATES } from "@/constants/us-states";
import { revealUp, staggerContainer, staggerItem, viewport } from "@/lib/motion";

const REDIRECT_URL = "https://texas.thirstmetrics.com";

const REASONS = [
  { value: "thirstmetrics-texas", label: "ThirstMetrics Texas" },
  { value: "spotlight", label: "Spotlight" },
  { value: "custom-data", label: "Custom Data Solution" },
] as const;

type Reason = (typeof REASONS)[number]["value"];

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [reason, setReason] = useState<Reason | "">("");
  const [spotlightTarget, setSpotlightTarget] = useState("");
  const [spotlightState, setSpotlightState] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const isSpotlight = reason === "spotlight";
  const isTexas = reason === "thirstmetrics-texas";

  function validate(): string | null {
    if (!name.trim() || !email.trim() || !company.trim() || !reason) {
      return "Please fill out all required fields.";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address.";
    }
    if (isBlockedDomain(email)) {
      return "Please use your work email (no gmail, yahoo, etc).";
    }
    return null;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    const err = validate();
    if (err) {
      setError(err);
      return;
    }

    setSubmitting(true);

    try {
      if (isTexas) {
        // Server-side validation via API route (MX check, blocklist)
        const res = await fetch("/api/beta-access", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: name.trim(),
            email: email.trim(),
            company: company.trim(),
          }),
        });

        const data = await res.json();

        if (!res.ok || !data.ok) {
          setError(data.error || "Something went wrong. Please try again.");
          setSubmitting(false);
          return;
        }

        window.location.href = REDIRECT_URL;
      } else {
        // Non-Texas reasons: log and show confirmation
        const payload = {
          name: name.trim(),
          email: email.trim(),
          company: company.trim(),
          reason,
          ...(isSpotlight && {
            spotlightTarget: spotlightTarget.trim(),
            spotlightState,
          }),
        };
        console.log("[contact-form] Submitted:", payload);

        setSubmitted(true);
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <section id="contact" className="w-full bg-white section-y">
        <div className="section-container">
          <motion.div
            variants={revealUp}
            initial="hidden"
            animate="visible"
            className="max-w-xl mx-auto text-center py-12"
          >
            <CheckCircle2 className="w-12 h-12 text-brand-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-slate-900 mb-2">
              Message received.
            </h3>
            <p className="text-slate-500">
              We&apos;ll get back to you within 1 business day.
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  const inputClasses =
    "w-full px-4 py-3 rounded-lg bg-white border border-slate-200 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-colors text-sm";
  const selectClasses =
    "w-full px-4 py-3 rounded-lg bg-white border border-slate-200 text-slate-800 focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition-colors text-sm appearance-none";

  return (
    <section id="contact" className="w-full bg-slate-50 section-y border-t border-slate-200">
      <div className="section-container">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="max-w-2xl mx-auto"
        >
          <motion.div variants={staggerItem} className="text-center mb-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-500 mb-3">
              Contact us
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
              Questions? Let&apos;s talk.
            </h2>
            <p className="mt-3 text-base text-slate-500">
              Whether you&apos;re interested in ThirstMetrics Texas, Spotlight,
              or a custom data solution — we&apos;d love to hear from you.
            </p>
          </motion.div>

          <motion.form
            variants={staggerItem}
            onSubmit={handleSubmit}
            className="space-y-4 max-w-md mx-auto"
            noValidate
          >
            <input
              type="text"
              placeholder="Full name *"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className={inputClasses}
            />
            <input
              type="email"
              placeholder="Work email *"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError("");
              }}
              required
              className={inputClasses}
            />
            <input
              type="text"
              placeholder="Company *"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              required
              className={inputClasses}
            />

            {/* Reason dropdown */}
            <div className="relative">
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value as Reason | "")}
                required
                className={selectClasses}
              >
                <option value="" disabled>
                  Reason for contact *
                </option>
                {REASONS.map((r) => (
                  <option key={r.value} value={r.value}>
                    {r.label}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Conditional Spotlight fields */}
            {isSpotlight && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.25 }}
                className="space-y-4 overflow-hidden"
              >
                <textarea
                  placeholder="What hotel, retailer, stadium, or airport are you trying to get insight into?"
                  value={spotlightTarget}
                  onChange={(e) => setSpotlightTarget(e.target.value)}
                  rows={3}
                  className={`${inputClasses} resize-none`}
                />
                <div className="relative">
                  <select
                    value={spotlightState}
                    onChange={(e) => setSpotlightState(e.target.value)}
                    className={selectClasses}
                  >
                    <option value="" disabled>
                      Select a state
                    </option>
                    {US_STATES.map((s) => (
                      <option key={s.value} value={s.value}>
                        {s.label}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                    <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </motion.div>
            )}

            {error && (
              <p className="text-sm font-medium text-red-500">{error}</p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-brand-500 text-white font-semibold hover:bg-brand-600 transition-colors text-base shadow-soft disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  {isTexas ? "Validating…" : "Sending…"}
                </>
              ) : (
                <>
                  Send Message
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </motion.form>
        </motion.div>
      </div>
    </section>
  );
}
