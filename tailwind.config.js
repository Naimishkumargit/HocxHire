/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0f1923",   // Dark theme color
        accent: "#ffc107",   // Gold accent
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"], // Default font
      },
      boxShadow: {
        soft: "0 4px 12px rgba(0,0,0,0.1)", // Soft shadow for cards/buttons
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
  ],
};
