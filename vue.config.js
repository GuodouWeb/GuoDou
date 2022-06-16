const { defineConfig } = require("@vue/cli-service");
const AutoImport = require("unplugin-auto-import/webpack");
const Components = require("unplugin-vue-components/webpack");
const { ElementPlusResolver } = require("unplugin-vue-components/resolvers");
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      // 饿了么插件
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      // 饿了么插件
      Components({
        resolvers: [ElementPlusResolver()],
      }),
      // 网页代码编辑器插件
      new MonacoWebpackPlugin(),
    ]
  },
  // 文件资源可视化，用于分析占比大小
  chainWebpack: (config) => {
    if (process.env.use_analyzer) {
      config.plugin("webpack-bundle-analyzer").use(require("webpack-bundle-analyzer").BundleAnalyzerPlugin);
    }
  }
});
