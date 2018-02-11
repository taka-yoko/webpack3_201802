const webpack = require('webpack');

module.exports = {
  entry: './src/js/main.js',
  output: {
    path: `${__dirname}/build`,
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true
    })
  ]
};
