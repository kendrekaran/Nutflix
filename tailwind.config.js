/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0f0f0f',    // Deep black — true dark mode base
        surface: '#1a1a1a',       // Soft dark grey — for contrast and separation
        primary: '#E63946',       // Saucy red — bold, energetic, and attention-grabbing
        secondary: '#F1FA8C',     // Soft neon yellow — playful and vibrant contrast
        'text-primary': '#ffffff', // Clean white for max readability
        'text-secondary': '#9ca3af', // Gray-400 — for secondary or placeholder text
        success: '#00FFAB',       // Bright green — celebrate healthy consistency
        danger: '#FF006E',        // Hot pink-red — use sparingly for oops moments
        border: '#2a2a2a',        // Subtle line definition without being loud
        // Additional color variations
        gray: {
          400: '#9ca3af',
        },
        red: {
          500: '#E63946',
        },
        pink: {
          500: '#FF006E',
        },
        yellow: {
          300: '#F1FA8C',
        },
        green: {
          400: '#00FFAB',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'var(--font-poppins)', 'var(--font-sora)', 'system-ui', 'sans-serif'],
        inter: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        poppins: ['var(--font-poppins)', 'system-ui', 'sans-serif'],
        sora: ['var(--font-sora)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}; 