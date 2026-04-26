/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx,html}',
  ],
  presets: [require('shadcn/dist/preset')?.default || require('shadcn/dist/preset')],
  theme: {
    extend: {},
  },
  plugins: [],
}
