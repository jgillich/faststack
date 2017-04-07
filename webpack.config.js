/* eslint-env node */
let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let Dotenv = require('dotenv-webpack')

module.exports = {
  devtool: 'source-map',
  entry: './app/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        include: [
          path.resolve(__dirname, 'app'),
        ],
      },
      {
        test: /\.md$/,
        use: [
          {
            loader: 'html-loader',
          },
          {
            loader: 'markdown-loader',
          },
        ],
      },
      {
        test: /\.(scss|sass)$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
        ],
      },
      {
        test: /\.(svg|woff2?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/i,
        use: 'file-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'FastStack',
      template: 'app/index.ejs'
    }),
    new Dotenv()
  ],
}
