var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: [path.join(__dirname,'src/recorder.js')], 
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'recorder.min.js'
  },
  module: {
      rules: [{
          test: /\.js/,
          exclude: /(node_modules|bower_components)/,
          use: [{
              loader: 'babel-loader'
          }]
      }]
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin()
  ],
  optimization: {
    minimize: false
  }
}