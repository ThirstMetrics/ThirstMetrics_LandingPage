import { NextRequest, NextResponse } from "next/server";
import { BLOCKED_EMAIL_DOMAINS } from "@/constants/email-blocklist";

const FRIENDLY_ERROR = "Please use your work email (no gmail, yahoo, etc).";

// Where contact form submissions are delivered.
// Set CONTACT_EMAIL in Vercel Environment Variables to override.
const CONTACT_EMAIL = process.env.CONTACT_EMAIL || "john@thirstmetrics.com";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, company, reason, spotlightTarget, spotlightState } =
      body as {
        name?: string;
        email?: string;
        company?: string;
        reason?: string;
        spotlightTarget?: string;
        spotlightState?: string;
      };

    // --- Required field validation ---
    if (!name?.trim() || !email?.trim() || !company?.trim() || !reason) {
      return NextResponse.json(
        { ok: false, error: "All fields are required." },
        { status: 400 }
      );
    }

    // --- Basic email format check ---
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { ok: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    // --- Extract domain ---
    const domain = email.split("@")[1]?.toLowerCase().trim();
    if (!domain) {
      return NextResponse.json(
        { ok: false, error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    // --- Blocklist check ---
    if (BLOCKED_EMAIL_DOMAINS.includes(domain)) {
      return NextResponse.json(
        { ok: false, error: FRIENDLY_ERROR },
        { status: 422 }
      );
    }

    // --- Build notification body ---
    const lines = [
      `New contact form submission from thirstmetrics.com`,
      ``,
      `Name: ${name.trim()}`,
      `Email: ${email.trim()}`,
      `Company: ${company.trim()}`,
      `Reason: ${reason}`,
    ];
    if (spotlightTarget) {
      lines.push(`Spotlight Target: ${spotlightTarget.trim()}`);
    }
    if (spotlightState) {
      lines.push(`Spotlight State: ${spotlightState}`);
    }
    lines.push(``, `Submitted: ${new Date().toISOString()}`);

    const textBody = lines.join("\n");

    // --- Deliver via Resend if API key is configured ---
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "ThirstMetrics <noreply@thirstmetrics.com>",
          to: [CONTACT_EMAIL],
          reply_to: email.trim(),
          subject: `[ThirstMetrics Contact] ${reason} — ${company.trim()}`,
          text: textBody,
        }),
      });

      if (!res.ok) {
        const err = await res.text();
        console.error("[contact] Resend error:", err);
        // Fall through — still return success to the user
      } else {
        console.log("[contact] Email sent via Resend to", CONTACT_EMAIL);
      }
    } else {
      // No email provider configured — log to Vercel function logs
      console.log("[contact] No RESEND_API_KEY set. Submission logged:");
      console.log(textBody);
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
