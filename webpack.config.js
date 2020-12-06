const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    background: './src/background.ts',
    content: './src/content.ts',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: path.resolve(path.join(__dirname, 'src/processMock'))
    })
  ],
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'extension'),
  },
  optimization: {
    minimize: false
  }
};