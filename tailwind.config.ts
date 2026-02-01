import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#e6f5f5",
          100: "#b3e0e0",
          200: "#80cccc",
          300: "#4db8b8",
          400: "#26a8a8",
          500: "#0d7377",
          600: "#0a5f63",
          700: "#084c4f",
          800: "#063a3c",
          900: "#042829",
          950: "#021a1b",
        },
        accent: {
          50: "#e6fcfc",
          100: "#b3f5f6",
          200: "#80eff0",
          300: "#4de8ea",
          400: "#22d3e6",
          500: "#17b8cc",
          600: "#0e9aab",
          700: "#097c8a",
          800: "#065e69",
          900: "#034048",
        },
      },
      fontFamily: {
        sans: ['"Inter"', "system-ui", "-apple-system", "sans-serif"],
        mono: ['"JetBrains Mono"', '"Fira Code"', "ui-monospace", "monospace"],
      },
      boxShadow: {
        soft: "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
        card: "0 4px 24px rgba(0,0,0,0.06)",
        "card-hover": "0 8px 32px rgba(0,0,0,0.1)",
        glow: "0 0 24px rgba(13,115,119,0.12)",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        shimmer: "shimmer 3s linear infinite",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
