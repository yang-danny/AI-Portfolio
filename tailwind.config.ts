import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          cyan: '#00d9ff',
          purple: '#a855f7',
          blue: '#3b82f6',
        },
        dark: {
          900: '#0a0a1a',
          800: '#0f0f23',
          700: '#1a1a2e',
          600: '#25253f',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Orbitron', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'gradient': 'gradient 8s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'flash': 'flash 1.5s ease-in-out infinite',
        'shake': 'shake 0.5s ease-in-out',
      },
      keyframes: {
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        flash: {
          '0%, 100%': {
            opacity: '1',
            boxShadow: '0 0 15px rgba(0, 243, 255, 0.5)',
          },
          '50%': {
            opacity: '0.6',
            boxShadow: '0 0 25px rgba(0, 243, 255, 0.8)',
          },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0) rotate(0deg)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-2px) rotate(-1deg)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(2px) rotate(1deg)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
