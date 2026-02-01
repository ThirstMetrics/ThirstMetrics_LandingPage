"use client";

/**
 * ThirstMetrics Logo
 * Wine, whiskey, tequila, and beer bottles forming a bar chart / analytics graph.
 * Clean, modern, SaaS-appropriate style. Retina-ready SVG.
 */
export default function Logo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="ThirstMetrics logo"
    >
      {/* Background rounded square */}
      <rect width="40" height="40" rx="9" fill="#0d7377" />

      {/* Four bottles as ascending bar chart columns */}
      {/* Beer bottle (shortest) */}
      <rect x="6" y="22" width="5.5" height="12" rx="1.5" fill="white" opacity="0.55" />
      <rect x="7.25" y="19.5" width="3" height="3" rx="0.8" fill="white" opacity="0.55" />

      {/* Wine bottle */}
      <rect x="13.5" y="16" width="5.5" height="18" rx="1.5" fill="white" opacity="0.7" />
      <rect x="14.75" y="13" width="3" height="3.5" rx="0.8" fill="white" opacity="0.7" />

      {/* Tequila bottle */}
      <rect x="21" y="11" width="5.5" height="23" rx="1.5" fill="white" opacity="0.85" />
      <rect x="22.25" y="7.5" width="3" height="4" rx="0.8" fill="white" opacity="0.85" />

      {/* Whiskey bottle (tallest) */}
      <rect x="28.5" y="6" width="5.5" height="28" rx="1.5" fill="white" />
      <rect x="29.75" y="3" width="3" height="3.5" rx="0.8" fill="white" />

      {/* Trend line overlay */}
      <path
        d="M8.5 26 L16.25 20 L23.75 14.5 L31.25 9"
        stroke="#22d3e6"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.9"
      />

      {/* Trend line dots */}
      <circle cx="8.5" cy="26" r="1.5" fill="#22d3e6" />
      <circle cx="16.25" cy="20" r="1.5" fill="#22d3e6" />
      <circle cx="23.75" cy="14.5" r="1.5" fill="#22d3e6" />
      <circle cx="31.25" cy="9" r="1.5" fill="#22d3e6" />
    </svg>
  );
}
