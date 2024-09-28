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
      bluishGreen: '#1CB6CC',
      navy: '#433A8A',
      lightPurple: '#EBE1FF',
      'gray-100': '#FAFAFA',
      'gray-300': '#F4F4F4',
      'gray-500': '#EAEAEA',
      'gray-700': '#DEDEDE',
    },
    fontSize: {
      'H1-Headline': '28px',
      'H2-Headline': '24px',
      SubHeading: '20px',
      'Body-Text': '16px',
      Subtitle: '14px',
      Caption: '12px',
    },
  },
  plugins: [],
};
