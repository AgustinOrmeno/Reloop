/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        beige: {
          DEFAULT: '#F2EDE4',
          dark: '#E8E0D3',
        },
        terracota: {
          light: '#E8826A',
          DEFAULT: '#C1533A',
          dark: '#9E3D26',
        },
        carbon: {
          DEFAULT: '#1A1614',
          mid: '#2E2825',
          light: '#3A3330',
        },
        muted: '#7A6F69',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['"DM Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}