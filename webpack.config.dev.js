const webpack = require('webpack');

const { HotModuleReplacementPlugin } = webpack;
const { SourceMapDevToolPlugin } = webpack;
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  devtool: false,
  module: {
    rules: [
      {
        test: /\.(jsx?)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  output: {
    path: `${__dirname}/build`,
    filename: 'main.js',
  },
  plugins: [
    new SourceMapDevToolPlugin({}),
    new HotModuleReplacementPlugin({}),
    new HtmlWebpackPlugin({ inject: true, template: './src/index.html' }),
  ],
  devServer: {
    historyApiFallback: true,
    contentBase: './build',
    hot: true,
  },
};
