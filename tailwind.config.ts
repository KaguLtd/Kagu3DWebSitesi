import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        kagu: {
          deep: "#020711",
          navy: "#071426",
          cyan: "#4ee7ff",
          blue: "#2a87ff",
          mist: "#d8f6ff",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        horizon: ["Horizon", "Inter", "ui-sans-serif", "system-ui"],
      },
      boxShadow: {
        glow: "0 0 18px rgba(78, 231, 255, 0.11)",
      },
    },
  },
  plugins: [],
} satisfies Config;
