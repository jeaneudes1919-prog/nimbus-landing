/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        bg: "#07070D",
        fg: "#F5F5FA",
        muted: "#A1A1B5",
        primary: "#7C5CFF",
        accent: "#22D3EE",
        card: "#111118",
        border: "#2A2A3A",
      },
      fontFamily: {
        sans: [
          "Plus Jakarta Sans Variable",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
      },
      boxShadow: {
        glow: "0 0 40px -8px rgba(124, 92, 255, 0.55), 0 8px 40px -12px rgba(34, 211, 238, 0.25)",
        card: "0 1px 0 rgba(255,255,255,0.04) inset, 0 24px 48px -24px rgba(0,0,0,0.8)",
        soft: "0 20px 60px -30px rgba(124, 92, 255, 0.45)",
      },
      backgroundImage: {
        signature: "linear-gradient(120deg, #7C5CFF 0%, #22D3EE 100%)",
      },
      keyframes: {
        aurora: {
          "0%, 100%": { transform: "translate3d(-6%, -2%, 0) scale(1)" },
          "50%": { transform: "translate3d(6%, 4%, 0) scale(1.15)" },
        },
        "gradient-x": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-dot": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.4", transform: "scale(0.8)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
      },
      animation: {
        aurora: "aurora 18s ease-in-out infinite",
        "aurora-slow": "aurora 26s ease-in-out infinite reverse",
        "gradient-x": "gradient-x 6s ease infinite",
        marquee: "marquee 32s linear infinite",
        "fade-up": "fade-up 0.6s ease-out both",
        "pulse-dot": "pulse-dot 2s ease-in-out infinite",
        float: "float 7s ease-in-out infinite",
      },
    },
  },
  plugins: [],
}
