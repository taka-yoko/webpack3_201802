const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: './src/js/main.js',
  output: {
    path: path.resolve(__dirname, './build/js'),
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.resolve(__dirname, './build'),
    watchContentBase: true,
    port: 8081
  },
  devtool: 'source-map',
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                // env を指定することで、ES2017 を ES5 に変換。
                // {modules: false}にしないと import 文が Babel によって CommonJS に変換され、
                // webpack の Tree Shaking 機能が使えない
                ['env', {'modules': false}]
              ]
            }
          }
        ]
      }
    ]
  }
};
