// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}', // update based on your project structure
  ],
  theme: {
    extend: {
      animation: {
        'gradient-x': 'gradient-x 10s ease-in-out infinite',
      },
      keyframes: {
        'gradient-x': {
          '0%': {
            'background-position': '0% 50%',
          },
          '100%': {
            'background-position': '100% 50%',
          },
        },
      },
    },
  },
  plugins: [],
};
