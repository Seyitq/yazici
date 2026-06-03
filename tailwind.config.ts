import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        neon: {
          DEFAULT: '#1a4fa0',
          dim: '#153f82',
          dark: '#0e2d5e',
          glow: 'rgba(26, 79, 160, 0.15)',
        },
        gold: {
          DEFAULT: '#d4a31c',
          bright: '#e0b520',
          dim: '#b88b16',
        },
        dark: {
          DEFAULT: '#ffffff',
          50: '#f9f9f9',
          100: '#f3f3f3',
          200: '#e8e8e8',
          300: '#d4d4d4',
          400: '#a0a0a0',
          500: '#666666',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Playfair Display', 'serif'],
      },
      boxShadow: {
        neon: '0 0 20px rgba(26, 79, 160, 0.3)',
        'neon-lg': '0 0 40px rgba(26, 79, 160, 0.4)',
        gold: '0 0 20px rgba(212, 163, 28, 0.3)',
      },
    },
  },
  plugins: [],
}

export default config
