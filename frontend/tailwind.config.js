/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        primary: '#1565C0',
        'primary-dark': '#0D47A1',
        success: '#2E7D32',
        warning: '#E65100',
        accent: '#6A1B9A',
        slate: '#455A64',
        'user-bubble': '#E3F2FD',
        'citation-bg': '#FFF8E1',
        'citation-border': '#FFB300',
        'citation-text': '#E65100',
        surface: '#f5f5f5',
        'surface-alt': '#fafafa',
      },
      fontFamily: {
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
        serif: ['"Source Serif 4"', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};
