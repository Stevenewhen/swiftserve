module.exports = {
  content: [
    'node_modules/flowbite-react/lib/esm/**/*.js',
    "./src/pages/**/**.jsx",
    "./src/components/**/**.jsx",
    "./src/pages/ItemPage/ItemPage.jsx",
    "./src/components/",
    "./src/pages/App/App.jsx"
  ],
  theme: {
    extend: {
      colors: {
        'text-light': '#001736'
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
};
