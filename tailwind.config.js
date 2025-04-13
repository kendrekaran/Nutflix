/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0F172A', // Slate 900
        primary: '#6366F1',    // Indigo 500
        accent: '#22D3EE',     // Cyan 400
        'text-primary': '#F9FAFB', // Off-white
        'text-secondary': '#94A3B8', // Gray 400
        surface: '#1E293B',    // Slate 800
        danger: '#F87171',     // Red 400
        // Add Tailwind extended palette
        slate: {
          800: '#1E293B',
          900: '#0F172A',
        },
        indigo: {
          500: '#6366F1',
        },
        cyan: {
          400: '#22D3EE',
        },
        gray: {
          400: '#94A3B8',
        },
        red: {
          400: '#F87171',
        },
      },
    },
  },
  plugins: [],
}; 