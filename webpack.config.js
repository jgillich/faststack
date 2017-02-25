/* eslint-env node */
let path = require('path')
let HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './app/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'bin'),
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
  plugins: [new HtmlWebpackPlugin()],
  resolve: {
      alias: {
          'react': 'preact-compat',
          'react-dom': 'preact-compat'
      }
  }
}
