/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#050505',
        foreground: '#ffffff',
        accent: '#00f0ff',
      },
      fontFamily: {
        mono: ['"Geist Mono"', '"JetBrains Mono"', 'monospace'],
        sans: ['"Inter"', '"Space Grotesk"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
