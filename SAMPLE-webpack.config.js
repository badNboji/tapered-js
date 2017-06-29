const path = require('path')
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const tapered = require('tapered.js/tapered-webpack-plugin.js');

module.exports = {
  entry: ['./src/index.js', './index.js'],
  output: {
    path: path.join(__dirname, '/client'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      { test: /jsx?/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /scss$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  plugins : [
  new tapered(),
  new webpack.optimize.UglifyJsPlugin({
    extractComments: {
      condition: /ß∂dNß0j1/,
      filename: 'INSERT TEST FILE LOCATION HERE'
    },
  }),
  ],
}
