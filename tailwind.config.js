/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Wheaton Thunder heritage palette
        ink: {
          950: "#05070d",
          900: "#0a0e1a",
          800: "#0f1424",
          700: "#161c30",
          600: "#1f2740",
        },
        thunder: {
          // electric orange (Wheaton primary)
          50: "#fff4ec",
          100: "#ffe3d1",
          200: "#ffc09a",
          300: "#ff9c63",
          400: "#ff7d36",
          500: "#f25c0a",
          600: "#d94a00",
          700: "#b33c00",
        },
        storm: {
          // navy / electric blue (Wheaton secondary)
          50: "#eef4ff",
          100: "#d9e6ff",
          200: "#b3ccff",
          300: "#7da6ff",
          400: "#4d82f7",
          500: "#2f63e0",
          600: "#1e3a8a",
          700: "#15265c",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
        display: [
          "Sora",
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
      },
      maxWidth: {
        content: "1200px",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        flicker: {
          "0%, 100%": { opacity: "1" },
          "45%": { opacity: "0.92" },
          "47%": { opacity: "0.4" },
          "49%": { opacity: "1" },
          "51%": { opacity: "0.7" },
          "53%": { opacity: "1" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.35" },
          "50%": { opacity: "0.7" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s ease-out both",
        flicker: "flicker 6s infinite",
        "pulse-glow": "pulse-glow 5s ease-in-out infinite",
        marquee: "marquee 32s linear infinite",
      },
      backgroundImage: {
        "grid-faint":
          "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};
