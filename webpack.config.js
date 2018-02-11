const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = [
  {
    /* ----------------------
      JS用モジュール
    ----------------------- */
    entry: './src/js/main.js',
    output: {
      path: path.resolve(__dirname, './dist/js'),
      publicPath: '/js/',
      filename: 'bundle.js'
    },
    devServer: {
      contentBase: path.resolve(__dirname, './dist'),
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
  },
  {
  /* ----------------------
    CSS用モジュール
    ----------------------- */
    entry: './src/scss/main.scss',
    output: {
      path: path.resolve(__dirname, "dist/css"),
      publicPath:　'/css/',
      filename: 'bundle.css'
    },
    module: {
      rules: [
        {
          test: /\.scss$/,
          exclude: /node_modules/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                options: { sourceMap: true }
              },
              {
                loader: 'postcss-loader',
                options: { sourceMap: true }
              },
              {
                loader: 'sass-loader',
                options: { sourceMap: true }
              },
            ]
          }),
        }
      ]
    },
    plugins: [
      new ExtractTextPlugin('bundle.css'),
    ]
  }
];
