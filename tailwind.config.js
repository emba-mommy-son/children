/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
    colors: {
      white: '#FFFFFF',
      primary: '#9D4BFF',
      secondary: '#211C2C',
      pink: '#FD5FAE',
      yellow: '#FFB748',
      bluishgreen: '#1CB6CC',
      navy: '#433A8A',
      lightpurple: '#EBE1FF',
      'gray-100': '#FAFAFA',
      'gray-300': '#F4F4F4',
      'gray-500': '#EAEAEA',
      'gray-700': '#DEDEDE',
    },
    fontSize: {
      'h1-headline': '28px',
      'h2-headline': '24px',
      subheading: '20px',
      'body-text': '16px',
      subtitle: '14px',
      caption: '12px',
    },
  },
  plugins: [],
};
