/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      height: {
        'screen-150': '120vh',
        'screen-200': '200vh',

      },
      width:{
        'rem':'32rem',
      },
      keyframes: {
        shrink: {
          '0%': { fontSize: '10rem' },   // Start with a large font size
          '100%': { fontSize: '5rem' }, // End with a small font size
        },
        'slide-down': {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '100%': { transform: '-translateY(100%)', opacity: '0', display: 'none' },
        },
        'slideInAndExpand': {
          '0% ': {
            transform: 'scale(0.9) translateY(50px)',
            opacity: '0'
          },
          '100%': {
            transform: 'scale(1) translateY(0)',
            opacity: '1'
          },
        },
        'zoom-in-up': {
          '0%': {
            opacity: 0,
            transform: 'scale3d(0.3, 0.3, 0.3) translate3d(0, 100%, 0)',
          },
          '80%': {
            opacity: 0.8,
            transform: 'scale3d(1.1, 1.1, 1.1)',
          },
          '100%': {
            opacity: 1,
            transform: 'translate3d(0, 0%, 0)',
          },
        },
        'zoom-in': {
          '0%': {
            opacity: 0,
            transform: 'scale3d(0.3, 0.3, 0.3)',
          },
          '80%': {
            opacity: 0.8,
            transform: 'scale3d(1.1, 1.1, 1.1)',
          },
          '100%': {
            opacity: 1,
          },
        },
        'fade-in-down': {
          '0%': {
            opacity: 0,
            transform: 'translate3d(0, -100%, 0)',
          },
          '100%': {
            opacity: 1,
            transform: 'translate3d(0, 0, 0)',
          },
        },
        'slide-in-right': {
                    '0%': {
                        visibility: 'visible',
                        transform: 'translate3d(100%, 0, 0)',
                    },
                    '100%': {
                        transform: 'translate3d(0, 0, 0)',
                    },
                },

      },
      animation: {
        shrink: 'shrink 5s linear 2s forwards',
        'slide-down': 'slide-down 5s linear 2s forwards',
        slideInAndExpand: 'slideInAndExpand 1s ease-in-out',
        'zoom-in-up': 'zoom-in-up 1s ease-out forwards',
        'zoom-in': 'zoom-in 1s ease-out forwards',
        'fade-in-down': 'fade-in-down 1s ease-out forwards',
        'slide-in-right':'slide-in-right 1s ease-out forwards'
      },
      fontFamily: {
        anton: ['Anton', 'sans-serif'],
      },
      fontSize: {
        '15xl': '15rem',
      },
    },
  },
  plugins: [],
};
