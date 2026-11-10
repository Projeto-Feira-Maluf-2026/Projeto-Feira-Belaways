import forms from '@tailwindcss/forms';
import type { Config } from 'tailwindcss';

/* Tokens vêm de src/index.css (:root e .dark). Mesma linguagem do GreensManage,
   do Ponto Facial e do portfólio: vidro líquido, blobs de luz e tipografia grotesca. */
const token = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: token('bg'),
        ink: token('ink'),
        muted: token('muted'),
        faint: token('faint'),
        line: 'var(--line)',
        chip: 'var(--chip)',
        pos: token('pos'),
        neg: token('neg'),
        warn: token('warn'),
        info: token('info'),
        accent: token('accent'),
        brand: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7e22ce',
          800: '#6b21a8',
          900: '#581c87',
          950: '#3b0764',
        },
        orchid: '#f472d0',
      },
      borderRadius: {
        glass: '26px',
        'glass-xl': '30px',
        control: '14px',
      },
      boxShadow: {
        soft: 'var(--shadow)',
        glow: '0 12px 30px -8px rgb(168 85 247 / 0.65)',
      },
      fontFamily: {
        sans: ['"Hanken Grotesk"', '-apple-system', 'system-ui', 'sans-serif'],
        display: ['"Bricolage Grotesque"', '"Hanken Grotesk"', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      transitionTimingFunction: {
        spring: 'cubic-bezier(0.3, 1.4, 0.5, 1)',
        soft: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
      },
      keyframes: {
        float: { '50%': { transform: 'translate(50px, -36px) scale(1.1)' } },
        rise: { from: { opacity: '0', transform: 'translateY(14px) scale(0.985)' } },
      },
      animation: {
        float: 'float 20s ease-in-out infinite',
        rise: 'rise 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) both',
      },
    },
  },
  plugins: [forms],
} satisfies Config;
