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
        pink: { DEFAULT: '#e0399f', hi: '#fe5cc1' },
      },
      borderRadius: {
        glass: '26px',
        'glass-xl': '30px',
        control: '14px',
      },
      boxShadow: {
        soft: 'var(--shadow)',
        glow: '0 10px 24px -12px rgb(224 57 159 / 0.7)',
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
