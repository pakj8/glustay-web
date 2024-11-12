/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // background: "var(--background)",
        // foreground: "var(--foreground)",
        ht: {
          100: "#ffe700",
        },
      },
    },
    extend: {
      fontFamily: {
        poppins: ["var(--font-inter)"],
      },
    },
  },
  plugins: [],
};
