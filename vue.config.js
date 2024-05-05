const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  pwa: {
    name: 'Recipe App',
    themeColor: '#e38b29',
    iconPaths: {
      favicon32: 'mitten.ico', // Path to your 32x32 favicon
      favicon16: 'mitten.ico', // Path to your 16x16 favicon
      appleTouchIcon: 'mitten.png', // Path to your Apple touch icon (152x152)
      maskIcon: 'cookingIcon1.svg', // Path to your maskable icon (SVG format)
      msTileImage: 'cookingIcon144.png', // Path to your Microsoft Tile icon (144x144)
    },
  },
  devServer: {
    https: true,
  },
});
