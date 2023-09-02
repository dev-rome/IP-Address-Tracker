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
        "dark-gray": "hsl(0, 0%, 17%)",
        gray: "hsl(0, 0%, 59%)",
      },
      backgroundImage: {
        bg_mobile: "url('/images/pattern-bg-mobile.png')",
        bg_desktop: "url('/images/pattern-bg-desktop.png')",
      },
    },
  },
  plugins: [],
};
