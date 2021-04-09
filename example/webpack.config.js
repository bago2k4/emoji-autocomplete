const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  mode: 'production',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [{ test: /\.txt$/, use: 'raw-loader' }],
  },
  optimization: {
    minimizer: [new TerserPlugin({
      extractComments: false
    })]
  }
};