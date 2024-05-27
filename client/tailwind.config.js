/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontSize: {
      xs: ['12px', '16px'],
      sm: ['14px', '20px'],
      base: ['16px', '19.5px'],
      lg: ['18px', '21.94px'],
      xl: ['20px', '24.38px'],
      '2xl': ['24px', '29.26px'],
      '3xl': ['28px', '50px'],
      '4xl': ['48px', '58px'],
      '8xl': ['96px', '106px']
    },
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
      },
      colors: {
        'primary': "#f03e22",
        "text-blue": "#1b3252",
        "bg-gray-black": "#2e2e2e",
        "text-gray": '#8a8a8a'
      },
      boxShadow: {
        '3xl': '0 4px 10px rgba(0, 0, 0, 0.1)'
      },
      backgroundImage: {
        'hero': "url('./src/assets/header_img.png')",
        'card': "url('assets/images/thumbnail-background.svg')",
      },
      screens: {
        "wide": "1440px",
        "msm": "480px",
        "xsm": "375px"
      },
      keyframes: {
        'slide-in': {
          '0%': { transform: 'translatey(-50%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 }
        },
      },
      animation: {
        'slide-in': 'slide-in 1s ease-out forwards',
        'fade-in': 'fade-in .4s ease-in-out',
      },
      gridTemplateColumns: {
        'card4': 'repeat(1, minmax(0, 300px))',
        'lgGrid': '1fr 1.5fr 1fr 1fr 1fr .5fr',
      },
    },
  },
  plugins: [],
}