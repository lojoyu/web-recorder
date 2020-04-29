// webpack.config.dev.js
var path = require('path')
var webpack = require('webpack')
//var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/dev-server',
    './src/recorder.js'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // new HtmlWebpackPlugin({
    //   template: './src/index.html'
    // })
  ],
  module: {
    loaders: [{
      test: /\.css$/,
      loaders: ['style', 'css']
    }]
  },
  devServer: {
    contentBase: './dist',
    hot: true
  }
}