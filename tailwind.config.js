/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // typeui.sh Enterprise design tokens
        brand: {
          DEFAULT: "#072C2C", // primary — deep teal
          50: "#e7efef",
          100: "#c4d6d6",
          200: "#9bbaba",
          600: "#0a3a3a",
          700: "#072c2c",
          800: "#052222",
          900: "#041a1a",
        },
        accent: {
          DEFAULT: "#FF5F03", // secondary — orange
          50: "#fff2e9",
          100: "#ffdcc4",
          400: "#ff7f33",
          500: "#ff5f03",
          600: "#e05303",
          700: "#b84304",
        },
        surface: {
          DEFAULT: "#EDEADE", // cream
          card: "#FFFFFF",
          sunken: "#E3DFCF",
        },
        ink: {
          DEFAULT: "#111827", // text
          soft: "#3f4654",
          muted: "#6b7280",
        },
        success: "#16A34A",
        warning: "#D97706",
        danger: "#DC2626",
      },
      fontFamily: {
        sans: ["Ubuntu", "ui-sans-serif", "system-ui", "Segoe UI", "Roboto", "Arial", "sans-serif"],
        display: ["Oswald", "Ubuntu", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["'Ubuntu Mono'", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      maxWidth: {
        content: "1200px",
      },
      keyframes: {
        // Purposeful, subtle entrance only — no decorative looping motion.
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
      },
      backgroundImage: {
        "grid-brand":
          "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
      },
      boxShadow: {
        card: "0 1px 2px rgba(7,44,44,0.04), 0 8px 24px -12px rgba(7,44,44,0.18)",
        "card-hover": "0 2px 4px rgba(7,44,44,0.06), 0 16px 40px -16px rgba(7,44,44,0.28)",
      },
    },
  },
  plugins: [],
};
