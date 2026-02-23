"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { isBlockedDomain } from "@/constants/email-blocklist";

const FRIENDLY_ERROR = "Please use your work email (no gmail, yahoo, etc).";
const REDIRECT_URL = "https://texas.thirstmetrics.com";

interface BetaFormProps {
  /** Visual variant — hero has white inputs, section has bordered inputs */
  variant?: "hero" | "section";
}

export default function BetaForm({ variant = "section" }: BetaFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const isHero = variant === "hero";

  /** Client-side pre-validation before hitting the API */
  function clientValidate(): string | null {
    if (!name.trim() || !email.trim() || !company.trim()) {
      return "All fields are required.";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address.";
    }
    if (isBlockedDomain(email)) {
      return FRIENDLY_ERROR;
    }
    return null;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    // Client-side check first for instant feedback
    const clientErr = clientValidate();
    if (clientErr) {
      setError(clientErr);
      return;
    }

    setSubmitting(true);

    try {
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

      // Success → redirect (no PII in URL)
      window.location.href = REDIRECT_URL;
    } catch {
      setError("Network error. Please check your connection and try again.");
      setSubmitting(false);
    }
  }

  // Shared input base classes
  const inputBase =
    "w-full px-4 py-3 rounded-lg text-sm transition-colors focus:outline-none focus:ring-2";
  const inputClasses = isHero
    ? `${inputBase} bg-white/10 border border-white/20 text-white placeholder:text-slate-400 focus:border-accent-400/60 focus:ring-accent-400/20`
    : `${inputBase} bg-white border border-slate-200 text-slate-800 placeholder:text-slate-400 focus:border-brand-400 focus:ring-brand-100`;

  return (
    <form onSubmit={handleSubmit} className="space-y-3" noValidate>
      <input
        type="text"
        placeholder="Full name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className={inputClasses}
      />
      <input
        type="email"
        placeholder="Work email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          if (error) setError(""); // clear error on edit
        }}
        required
        className={inputClasses}
      />
      <input
        type="text"
        placeholder="Company"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        required
        className={inputClasses}
      />

      {error && (
        <p className={`text-sm font-medium ${isHero ? "text-red-300" : "text-red-500"}`}>
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className={`w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg font-semibold text-base transition-colors disabled:opacity-60 disabled:cursor-not-allowed ${
          isHero
            ? "bg-brand-500 text-white hover:bg-brand-600 shadow-lg shadow-brand-500/20"
            : "bg-brand-500 text-white hover:bg-brand-600 shadow-soft"
        }`}
      >
        {submitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Validating…
          </>
        ) : (
          <>
            Get Early Beta Access
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>
    </form>
  );
}
