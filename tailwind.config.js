/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: '#31ABA9',          // teal
        primaryDark: '#509B9C',      // light teal
        background: '#E1ECEF',       // light gray
        textPrimary: '#4D5D73',      // dark blue
        textSecondary: '#FFFFFF',    // white
        hoverPrimary: '#CFF2F1',     // light cyan
      },
    }
  },
  plugins: []
}
