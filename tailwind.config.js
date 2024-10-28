/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
    colors: {
      white: '#FFFFFF',
      black: '#000000',
      primary: '#9D4BFF',
      secondary: '#211C2C',
      pink: '#FD5FAE',
      yellow: '#FFB748',
      bluishgreen: '#1CB6CC',
      navy: '#433A8A',
      red: '#C61E1E',
      lightpurple: '#EBE1FF',
      'gray-100': '#FAFAFA',
      'gray-300': '#F4F4F4',
      'gray-500': '#EAEAEA',
      'gray-700': '#DEDEDE',
      'gray-900': '#8D8D8D',
    },
  },
  plugins: [],
};
