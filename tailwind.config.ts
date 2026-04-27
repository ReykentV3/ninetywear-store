import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        carbon: "#0A0A0A",
        void: "#000000",
        bone: "#FFFFFF",
        digital: "#0066FF",
        digitalDark: "#0044BB",
        charcoal: "#121212",
        ash: "#1E1E1E",
        mist: "#A0A0A0",
      },
      fontFamily: {
        mono: ["var(--font-space-mono)", "Courier New", "monospace"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "10xl": ["10rem", { lineHeight: "1" }],
        "12xl": ["12rem", { lineHeight: "1" }],
        "15xl": ["15rem", { lineHeight: "0.9" }],
      },
      spacing: {
        "128": "32rem",
        "144": "36rem",
      },
      borderWidth: {
        "3": "3px",
      },
      animation: {
        "glitch-1": "glitch-1 0.6s infinite linear alternate-reverse",
        "glitch-2": "glitch-2 0.5s infinite linear alternate-reverse",
        "ticker": "ticker 20s linear infinite",
        "fade-in": "fade-in 0.6s ease forwards",
        "pulse-ring": "pulse-ring 1.5s ease-out infinite",
      },
      keyframes: {
        "glitch-1": {
          "0%": { clip: "rect(36px, 9999px, 9px, 0)", transform: "skew(0.85deg)" },
          "5%": { clip: "rect(15px, 9999px, 75px, 0)", transform: "skew(0.4deg)" },
          "10%": { clip: "rect(62px, 9999px, 30px, 0)", transform: "skew(0.7deg)" },
          "15%": { clip: "rect(5px, 9999px, 95px, 0)", transform: "skew(0.2deg)" },
          "20%": { clip: "rect(80px, 9999px, 22px, 0)", transform: "skew(0.5deg)" },
          "25%": { clip: "rect(0px, 9999px, 0px, 0)", transform: "skew(0deg)" },
          "50%": { clip: "rect(0px, 9999px, 0px, 0)", transform: "skew(0deg)" },
          "100%": { clip: "rect(0px, 9999px, 0px, 0)", transform: "skew(0deg)" },
        },
        "glitch-2": {
          "0%": { clip: "rect(65px, 9999px, 100px, 0)", transform: "skew(0.45deg)" },
          "5%": { clip: "rect(30px, 9999px, 42px, 0)", transform: "skew(0.2deg)" },
          "10%": { clip: "rect(9px, 9999px, 17px, 0)", transform: "skew(0.65deg)" },
          "20%": { clip: "rect(40px, 9999px, 60px, 0)", transform: "skew(0.3deg)" },
          "25%": { clip: "rect(0px, 9999px, 0px, 0)", transform: "skew(0deg)" },
          "50%": { clip: "rect(0px, 9999px, 0px, 0)", transform: "skew(0deg)" },
          "100%": { clip: "rect(0px, 9999px, 0px, 0)", transform: "skew(0deg)" },
        },
        "ticker": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.8)", opacity: "1" },
          "100%": { transform: "scale(2.2)", opacity: "0" },
        },
      },
      transitionTimingFunction: {
        "expo-out": "cubic-bezier(0.16, 1, 0.3, 1)",
        "expo-in-out": "cubic-bezier(0.87, 0, 0.13, 1)",
      },
    },
  },
  plugins: [],
};
export default config;
