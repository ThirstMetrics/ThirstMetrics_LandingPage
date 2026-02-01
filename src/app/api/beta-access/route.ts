import { NextRequest, NextResponse } from "next/server";
import { resolveMx } from "node:dns/promises";
import { BLOCKED_EMAIL_DOMAINS } from "@/constants/email-blocklist";

const FRIENDLY_ERROR = "Please use your work email (no gmail, yahoo, etc).";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, company } = body as {
      name?: string;
      email?: string;
      company?: string;
    };

    // --- Required field validation ---
    if (!name?.trim() || !email?.trim() || !company?.trim()) {
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

    // --- MX record verification ---
    try {
      const records = await resolveMx(domain);
      if (!records || records.length === 0) {
        return NextResponse.json(
          { ok: false, error: FRIENDLY_ERROR },
          { status: 422 }
        );
      }
    } catch {
      // DNS resolution failed — domain doesn't accept email
      return NextResponse.json(
        { ok: false, error: FRIENDLY_ERROR },
        { status: 422 }
      );
    }

    // --- Success ---
    // TODO: In production, store { name, email, company } to your CRM / database here.
    // For now we just validate and return success so the client can redirect.
    console.log("[beta-access] Validated:", { name, email: domain, company });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
