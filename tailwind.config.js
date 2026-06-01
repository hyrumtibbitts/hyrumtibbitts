/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // typeui.sh Elegant — minimal, near-monochrome with one quiet accent.
        ink: {
          DEFAULT: "#111827", // primary text
          2: "#374151", // secondary text
          3: "#6B7280", // muted text
          4: "#9CA3AF", // faint / placeholder
        },
        line: {
          DEFAULT: "#E5E7EB", // hairline borders
          strong: "#D1D5DB",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          subtle: "#F7F8FA", // alternating sections
        },
        accent: {
          DEFAULT: "#3B82F6",
          600: "#2563EB",
          50: "#EFF6FF",
        },
        success: "#16A34A",
        warning: "#D97706",
        danger: "#DC2626",
      },
      fontFamily: {
        sans: [
          "Inter",
          '"Google Sans"',
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Arial",
          "sans-serif",
        ],
        mono: ['"Anonymous Pro"', "ui-monospace", "SFMono-Regular", "monospace"],
      },
      fontSize: {
        // Elegant type scale: 14 / 16 / 18 / 24 / 32 / 40
        xs: ["0.8125rem", { lineHeight: "1.25rem" }], // 13
        sm: ["0.875rem", { lineHeight: "1.375rem" }], // 14
        base: ["1rem", { lineHeight: "1.6rem" }], // 16
        lg: ["1.125rem", { lineHeight: "1.75rem" }], // 18
        xl: ["1.25rem", { lineHeight: "1.8rem" }], // 20
        "2xl": ["1.5rem", { lineHeight: "1.9rem" }], // 24
        "3xl": ["2rem", { lineHeight: "2.3rem" }], // 32
        "4xl": ["2.5rem", { lineHeight: "2.7rem" }], // 40
        "5xl": ["3.25rem", { lineHeight: "1.05" }], // 52 (hero)
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
        "fade-up": "fade-up 0.6s cubic-bezier(0.22,1,0.36,1) both",
      },
    },
  },
  plugins: [],
};
