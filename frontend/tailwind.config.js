// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}', // update based on your project structure
  ],
  theme: {
    extend: {
      animation: {
        'gradient-x': 'gradient-x 10s ease-in-out infinite',
        'fade-in-down': 'fade-in-down 0.8s ease-out forwards',
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
        'fade-in-down': {
          '0%': {
            opacity: '0',
            transform: 'translateY(-20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
    },
  },
  plugins: [],
};
