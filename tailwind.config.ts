import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: '#f9f9f7',
          dim: '#ededeb',
          bright: '#ffffff',
          container: {
            lowest: '#ffffff',
            low: '#f2f4f2',
            DEFAULT: '#e8eae8',
            high: '#dfe1df',
            highest: '#d5d7d5',
          },
        },
        'on-surface': '#2d3432',
        primary: {
          DEFAULT: '#5f5e5e',
          dim: '#535252',
          container: '#e8e8e8',
          'on-container': '#1a1a1a',
        },
        secondary: {
          DEFAULT: '#9b4701',
          container: '#fde8d8',
          'on-container': '#5c2800',
        },
        dark: {
          surface: '#0f0f0f',
          'surface-container': '#1a1c1a',
        },
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        sm: '0.5rem',
        md: '1.5rem',
        lg: '2rem',
        xl: '3rem',
      },
      boxShadow: {
        ambient: '0px 20px 40px rgba(45,52,50,0.06)',
        'ambient-md': '0px 20px 40px rgba(45,52,50,0.12)',
        'ambient-lg': '0px 30px 60px rgba(45,52,50,0.15)',
      },
      backdropBlur: {
        glass: '24px',
      },
    },
  },
  plugins: [],
};

export default config;
