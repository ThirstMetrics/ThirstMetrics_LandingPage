/**
 * Blocked email domains — free / personal providers.
 * Add or remove entries here; both client-side and server-side
 * validation reference this single list.
 */
export const BLOCKED_EMAIL_DOMAINS: string[] = [
  // Google
  "gmail.com",
  "googlemail.com",

  // Yahoo
  "yahoo.com",
  "ymail.com",

  // Microsoft
  "outlook.com",
  "hotmail.com",
  "live.com",
  "msn.com",

  // Apple
  "icloud.com",
  "me.com",
  "mac.com",

  // AOL
  "aol.com",

  // Proton
  "proton.me",
  "protonmail.com",

  // GMX
  "gmx.com",
  "gmx.us",

  // Mail.com
  "mail.com",

  // Yandex
  "yandex.com",
  "yandex.ru",
];

/**
 * Check whether a given email uses a blocked (free/personal) domain.
 * Returns true if the domain is blocked.
 */
export function isBlockedDomain(email: string): boolean {
  const domain = email.split("@")[1]?.toLowerCase().trim();
  if (!domain) return true; // malformed → treat as blocked
  return BLOCKED_EMAIL_DOMAINS.includes(domain);
}
