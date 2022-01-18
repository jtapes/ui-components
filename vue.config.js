const StyleLintPlugin = require('stylelint-webpack-plugin')
const path = require('path')
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin')

module.exports = {
  configureWebpack: {
    output: {
      publicPath: '/'
    },
    plugins: [
      new SpriteLoaderPlugin(),
      new StyleLintPlugin({
        files: ['src/**/*.{vue,scss}']
      }),
    ],
    module: {
      rules: [
        {
          test: /\.svg$/,
          loader: 'svg-sprite-loader',
        }
      ]
    },
    resolve: {
      alias: {
        // Alias @ to /src folder for ES/TS imports
        '@': path.join(__dirname, '/src'),
      },
    },
  },
  chainWebpack: (config) => {
    config.module.rules.delete('svg')
  }
}
