/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Wheaton Thunder identity — navy + orange, warm cream ground.
        navy: {
          DEFAULT: "#192C4E", // Wheaton navy (PMS 2767)
          600: "#26406A",
          700: "#142544",
          800: "#0F1D36",
          900: "#0A1426",
          100: "#C7D2E0", // light text on navy
          200: "#9FB0C6",
          300: "#7286A4",
        },
        orange: {
          DEFAULT: "#D1501F", // Wheaton orange (PMS 173)
          300: "#EC9468",
          400: "#E0703E",
          500: "#D1501F",
          600: "#B8461A", // accessible fill for white text / small text on cream
          700: "#963613",
          50: "#FBEDE5",
        },
        surface: {
          DEFAULT: "#FBF8F3", // warm cream
          subtle: "#F3EDE2",
          card: "#FFFFFF",
        },
        ink: {
          DEFAULT: "#1B2A41", // deep navy-charcoal text
          2: "#46566B",
          3: "#6B7989",
          4: "#9AA6B2",
        },
        line: {
          DEFAULT: "#E8E0D3", // warm hairline
          strong: "#D8CDBB",
        },
        success: "#16A34A",
        warning: "#D97706",
        danger: "#DC2626",
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Arial",
          "sans-serif",
        ],
        display: ["Fraunces", "Georgia", "Cambria", "Times New Roman", "serif"],
      },
      fontSize: {
        xs: ["0.8125rem", { lineHeight: "1.25rem" }],
        sm: ["0.875rem", { lineHeight: "1.375rem" }],
        base: ["1rem", { lineHeight: "1.6rem" }],
        lg: ["1.125rem", { lineHeight: "1.75rem" }],
        xl: ["1.25rem", { lineHeight: "1.8rem" }],
        "2xl": ["1.5rem", { lineHeight: "1.95rem" }],
        "3xl": ["2rem", { lineHeight: "2.3rem" }],
        "4xl": ["2.5rem", { lineHeight: "2.65rem" }],
        "5xl": ["3.25rem", { lineHeight: "1.04" }],
      },
      maxWidth: {
        content: "1120px",
        prose: "640px",
      },
      letterSpacing: {
        label: "0.14em",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.22,1,0.36,1) both",
      },
      boxShadow: {
        card: "0 1px 2px rgba(25,44,78,0.05), 0 14px 34px -20px rgba(25,44,78,0.22)",
        "card-hover": "0 2px 6px rgba(25,44,78,0.07), 0 22px 48px -22px rgba(25,44,78,0.30)",
      },
    },
  },
  plugins: [],
};
