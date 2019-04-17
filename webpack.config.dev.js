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
    path: `${__dirname}/static`,
    publicPath: '/',
    filename: 'bundle.js',
  },
  plugins: [
    new SourceMapDevToolPlugin({}),
    new HotModuleReplacementPlugin({}),
    new HtmlWebpackPlugin({ template: './index.html' }),
  ],
  devServer: {
    historyApiFallback: true,
    contentBase: './',
    hot: true,
  },
};
