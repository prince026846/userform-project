// This is the configuration file for Tailwind CSS.
// It specifies the content files to scan for class names.
// Allows extending the default theme and adding plugins.

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}