import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#090909',
        surface: {
          DEFAULT: '#111111',
          hover: '#161616',
          active: '#1A1A1A',
          elevated: '#141414',
        },
        border: {
          DEFAULT: '#222222',
          subtle: '#1A1A1A',
          bright: '#333333',
        },
        primary: {
          DEFAULT: '#FFFFFF',
          muted: '#E5E5E5',
        },
        secondary: {
          DEFAULT: '#8B8B8B',
          muted: '#525252',
        },
        accent: {
          DEFAULT: '#4F8CFF',
          hover: '#3B7BFF',
          glow: 'rgba(79, 140, 255, 0.15)',
        },
        success: {
          DEFAULT: '#22C55E',
          glow: 'rgba(34, 197, 94, 0.15)',
        },
        warning: {
          DEFAULT: '#F59E0B',
          glow: 'rgba(245, 158, 11, 0.15)',
        },
        danger: {
          DEFAULT: '#EF4444',
          glow: 'rgba(239, 68, 68, 0.15)',
        },
      },
      borderRadius: {
        DEFAULT: '18px',
        lg: '18px',
        md: '12px',
        sm: '8px',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 180ms cubic-bezier(0.16, 1, 0.3, 1)',
        'scale-in': 'scaleIn 180ms cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.98)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
