const path = require("path");

module.exports = {
  chainWebpack: (config) => {
    const types = ["vue-modules", "vue", "normal-modules", "normal"];
    types.forEach((type) =>
      addStyleResource(config.module.rule("scss").oneOf(type))
    );
  },
};

function addStyleResource(rule) {
  rule
    .use("style-resource")
    .loader("style-resources-loader")
    .options({
      patterns: [
        path.resolve(__dirname, "./src/assets/scss/helpers/vars.scss"),
        path.resolve(__dirname, "./src/assets/scss/helpers/smart-grid.scss"),
        // path.resolve(__dirname, "./src/assets/scss/helpers/buttons.scss"),
        // path.resolve(__dirname, "./src/assets/scss/helpers/fonts.scss"),
        // path.resolve(__dirname, "./src/assets/scss/helpers/mixins.scss"),
      ],
    });
}
