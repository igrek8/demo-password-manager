module.exports = {
  entry: './src/index.js',
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
    filename: 'bundle.js',
  },
  plugins: [],
};
