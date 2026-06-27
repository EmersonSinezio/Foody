/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      animation: {
        blob: "blob 8s infinite",
        steam: "steam 3s ease-in-out infinite",
        shine: "shine 2s linear infinite",
      },
      keyframes: {
        blob: {
          "0%, 100%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(30px, -50px) scale(1.1)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
        },
        steam: {
          "0%": { transform: "translateY(0) scaleX(1)", opacity: 0 },
          "15%": { opacity: 0.6 },
          "50%": { transform: "translateY(-40px) scaleX(1.4)", opacity: 0.3 },
          "100%": { transform: "translateY(-80px) scaleX(1.8)", opacity: 0 },
        },
        shine: {
          "0%": { backgroundPosition: "200% center" },
          "100%": { backgroundPosition: "-200% center" },
        },
      },
    },
    screens: {
      xs: { max: "639px" },
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
  },
  plugins: [],
};
