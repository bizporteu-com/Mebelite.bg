import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          900: "#111111",
          700: "#333333",
          500: "#666666",
          400: "#8a8a8a",
          300: "#b0b0b0",
          200: "#d9d9d9",
          100: "#ececec",
          50: "#f5f5f5",
        },
        brand: {
          DEFAULT: "#1a73e8",
          dark: "#1557b0",
          50: "#e8f0fe",
        },
        sale: "#e53935",
        footer: "#2c2c2c",
      },
      fontFamily: {
        sans: ['"Inter"', '"Roboto"', "system-ui", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "4px",
        md: "6px",
        lg: "8px",
      },
      boxShadow: {
        card: "0 1px 3px rgba(0,0,0,0.06)",
        hover: "0 2px 12px rgba(0,0,0,0.08)",
      },
    },
  },
  plugins: [],
};
export default config;
