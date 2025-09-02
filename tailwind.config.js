/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand': {
          'navy': '#1e3a8a',      // Dark navy blue from logo
          'gold': '#f59e0b',      // Golden brown from owl
          'cream': '#fef3c7',     // Light cream background
          'orange': '#ea580c',    // Orange from owl details
          'brown': '#92400e',     // Brown from owl
        }
      }
    },
  },
  plugins: [],
}
