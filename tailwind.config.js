/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        space: {
          dark: '#020202',
          deep: '#050508',
          glass: 'rgba(5, 5, 8, 0.65)',
        },
        accent: {
          cyan: '#7aafc8',
          orange: '#d4864a',
          gold: '#c8964a',
        },
        telemetry: {
          muted: 'rgba(237, 233, 228, 0.4)',
          dim: 'rgba(237, 233, 228, 0.15)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Space Grotesk', 'Orbitron', 'sans-serif'],
        mono: ['Space Mono', 'JetBrains Mono', 'monospace'],
        ui: ['Outfit', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scanline': 'scanline 8s linear infinite',
        'flicker': 'flicker 0.15s infinite',
      }
    },
  },
  plugins: [],
}
