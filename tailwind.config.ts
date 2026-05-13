import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      // We keep the `ink` namespace so existing classes don't churn,
      // but values map to Tailwind's slate scale (bizporteu.com palette).
      colors: {
        ink: {
          900: "#0f172a",
          800: "#1e293b",
          700: "#334155",
          500: "#64748b",
          400: "#94a3b8",
          300: "#cbd5e1",
          200: "#e2e8f0",
          100: "#f1f5f9",
          50: "#f8fafc",
        },
        brand: {
          DEFAULT: "#50af63",
          dark: "#3e8f4e",
          50: "#f0fdf4",
        },
        sale: "#e53935",
        // Soft green band, used for the Мебели promo strip.
        tint: "#e8f5eb",
      },
      fontFamily: {
        sans: ['"Inter"', "system-ui", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "6px",
        md: "8px",
        lg: "10px",
      },
      boxShadow: {
        card: "0 1px 3px rgba(15,23,42,0.06)",
        hover: "0 4px 18px rgba(15,23,42,0.08)",
        cta: "0 8px 16px -8px rgba(80,175,99,0.45)",
      },
    },
  },
  plugins: [],
};
export default config;
