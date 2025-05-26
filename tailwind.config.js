/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'cyber-black': '#121212',
        'cyber-dark': '#1a1a1a',
        'cyber-gray': '#2a2a2a',
        'cyber-green': {
          100: '#ccffcc',
          200: '#99ff99',
          300: '#66ff66',
          400: '#33ff33',
          500: '#00ff00', // Primary neon green
          600: '#00cc00',
          700: '#009900',
          800: '#006600',
          900: '#003300',
        },
        'cyber-blue': {
          500: '#00ffff',
          600: '#00cccc',
        },
        'cyber-purple': {
          500: '#ff00ff',
          600: '#cc00cc',
        },
        'cyber-red': {
          500: '#ff0033',
          600: '#cc0033',
        },
        'cyber-yellow': {
          500: '#ffff00',
          600: '#cccc00',
        },
      },
      fontFamily: {
        'rajdhani': ['Rajdhani', 'sans-serif'],
        'tech': ['"Share Tech Mono"', 'monospace'],
      },
      animation: {
        'pulse-fast': 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 1.5s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          'from': {
            'text-shadow': '0 0 10px #00ff00, 0 0 20px #00ff00, 0 0 30px #00ff00',
          },
          'to': {
            'text-shadow': '0 0 15px #00ff00, 0 0 25px #00ff00, 0 0 35px #00ff00',
          },
        },
      },
      boxShadow: {
        'neon-green': '0 0 5px #00ff00, 0 0 10px #00ff00',
        'neon-red': '0 0 5px #ff0033, 0 0 10px #ff0033',
      },
    },
  },
  plugins: [],
};