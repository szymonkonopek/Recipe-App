const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  pwa: {
    name: 'Recipe App',
    themeColor: '#e38b29',
  },
  // devServer: {
  //   https: true,
  // },
});
