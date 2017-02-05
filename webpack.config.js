var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'dist/js/bundle.js'
  },
  module: {
    loaders: [
    {
      test: /\.(scss|css)$/,
      loader: ExtractTextPlugin.extract('css!sass')
    },
    {
      test: /\.json$/,
      loader: 'json-loader'
    },
    {
      test: /\.png$/,
      loader: 'file-loader'
    },
    { test: /\.svg$/, loader: 'url?limit=65000&mimetype=image/svg+xml&name=dist/fonts/[name].[ext]' },
    { test: /\.woff$/, loader: 'url?limit=65000&mimetype=application/font-woff&name=dist/fonts/[name].[ext]' },
    { test: /\.woff2$/, loader: 'url?limit=65000&mimetype=application/font-woff2&name=dist/fonts/[name].[ext]' },
    { test: /\.[ot]tf$/, loader: 'url?limit=65000&mimetype=application/octet-stream&name=dist/fonts/[name].[ext]' },
    { test: /\.eot$/, loader: 'url?limit=65000&mimetype=application/vnd.ms-fontobject&name=dist/fonts/[name].[ext]' }
    ]
  },
  plugins: [
  new ExtractTextPlugin("./dist/css/bundle.css"),
  new webpack.ProvidePlugin({
    $: "jquery",
    jQuery: "jquery"
  })
  ]
}