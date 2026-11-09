import type { Config } from 'tailwindcss';
const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0A0A0B',
        charcoal: '#1C1C1E',
        gold: { DEFAULT: '#B8975A', light: '#D4B87E', deep: '#8C6F3E' },
        ivory: '#F3EEE3',
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gold-sheen': 'linear-gradient(135deg,#8C6F3E 0%,#D4B87E 50%,#8C6F3E 100%)',
      },
    },
  },
  plugins: [],
};
export default config;
