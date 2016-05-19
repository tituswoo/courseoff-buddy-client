'use strict'

const fs = require('fs-extra')
const path = require('path')
const webpack = require('webpack')

const config = {
  context: path.join(__dirname, 'app'),
  entry: './content/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: './content/index.js'
  },
  devtool: 'inline-source-map',
  resolve: {
    root: './app',
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
        loader: 'babel?presets[]=es2015',
        exclude: /(node_modules)/
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      }
    ]
  }
}

function copyFiles() {
  fs.copySync('./app/images', './dist/images')
  fs.copySync('./app/manifest.json', './dist/manifest.json')
}

fs.removeSync('./dist/')
copyFiles()

webpack(config, (err, stats) => {})
