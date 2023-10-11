/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/*.tsx"],
  theme: {
    colors: {
      'MidGray': '#555B6E',
      'pink': '#D3C0CD',
      'hover_pink': '#936f84',
      'white': '#ffffff',
      'black': '#000000',
      'WhitishYellow': '#FFD6BA',
      'blue': '#636A81',
      'bluehover': '#7A83A0',
      'WhitishYellowhover': '#FFEADB',
    },
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
      },
    }
  },
  plugins: [],
}
