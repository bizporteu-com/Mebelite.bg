import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          900: "#101010",
          700: "#2a2a2a",
          500: "#555555",
          300: "#9a9a9a",
          100: "#e6e6e6",
        },
        canvas: {
          DEFAULT: "#ffffff",
          soft: "#f7f5f1",
          mute: "#efece6",
        },
        brand: {
          DEFAULT: "#1f2a24",
          accent: "#c79a5b",
        },
      },
      fontFamily: {
        sans: ['"Inter"', "system-ui", "sans-serif"],
        display: ['"Fraunces"', "Georgia", "serif"],
      },
      borderRadius: { xl2: "1.25rem" },
      boxShadow: {
        card: "0 1px 2px rgba(16,16,16,0.04), 0 8px 24px -12px rgba(16,16,16,0.10)",
      },
    },
  },
  plugins: [],
};
export default config;
