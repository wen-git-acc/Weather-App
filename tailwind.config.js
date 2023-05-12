/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      width: {
        '500': '31rem',
      },
    },
    screens: {
      xl: { min: '1279px' },
      // => @media (min-width: 1279px) { ... }

      lg: { min: '1023px' },
      // => @media (min-width: 1023px) { ... }

      md: { min: '767px' },
      // => @media (min-width: 767px) { ... }

      sm: { min: '641px' },
      // => @media (min-width: 639px) { ... }
    },
  },
  plugins: [],
};
