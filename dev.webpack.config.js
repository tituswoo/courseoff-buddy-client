const fs = require('fs-extra')
const path = require('path')

module.exports = {
  context: path.join(__dirname, 'app'),
  entry: {
    'content': './content/index.js',
    'background': './background/index.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name]/index.js'
  },
  devtool: 'inline-source-map',
  resolve: {
    root: './app',
    alias: {
      shared: path.resolve('./shared'),
      content: path.resolve('./app/content')
    },
    extensions: ['', '.webpack.js', '.web.js', '.js', '.css']
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
        exclude: /(node_modules)/
      },
      {
        test: /\.js$/,
        loader: 'babel',
        query: {
          presets: ['es2015'],
          plugins: [
            'transform-object-rest-spread',
            'transform-react-jsx'
          ]
        },
        exclude: /(node_modules)/
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      }
    ]
  }
}
