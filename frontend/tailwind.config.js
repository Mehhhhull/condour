/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
  zinc: {
    850: '#1f1f22',
    900: '#18181b',
    950: '#09090b', 
  },
  // NEW: Electric Gradients
  signal: {
    400: '#4ade80', // Bright Neon Green
    500: '#22c55e',
    glow: 'rgba(74, 222, 128, 0.5)'
  },
  cyber: {
    400: '#a78bfa', // Electric Purple
    500: '#8b5cf6',
  }
},
// Add this to 'extend' to make the chart bars glow
boxShadow: {
  'neon': '0 0 20px rgba(74, 222, 128, 0.15)',
}
    },
  },
  plugins: [],
}