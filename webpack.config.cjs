// @ts-check

const path = require('path');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const isProduction = process.env.NODE_ENV === 'production';
// const isDevelopment = !isProduction;

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  externals: {
    gon: 'gon',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  output: {
    path: `${__dirname}/dist/public`,
    publicPath: '/assets/',
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist', 'public'),
    // publicPath: '/assets/',
    contentBasePublicPath: '/assets/',
    compress: true,
    publicPath: '/assets/',
  },
  plugins: [
    // new MiniCssExtractPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              presets: [
                ['@babel/env'],
                '@babel/react',
              ],
            },
          },
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'postcss-loader' },
          { loader: 'sass-loader' },
        ],
      },
    ],
  },
};
