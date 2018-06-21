const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

// This is our JavaScript rule that specifies what to do with .js files
const javascript = {
  test: /\.(js)$/, // see how we match anything that ends in `.js`? Cool
  use: [
    {
      loader: 'babel-loader',
      options: { presets: ['env'] } // this is one way of passing options
    }
  ]
};

const postcss = {
  loader: 'postcss-loader',
  options: {
    plugins() {
      return [autoprefixer({ browsers: 'last 3 versions' })];
    }
  }
};

const styles = {
  test: /\.(scss)$/,
  use: ExtractTextPlugin.extract([
    'css-loader?sourceMap',
    postcss,
    'sass-loader?sourceMap'
  ])
};

// const uglify = webpack.optimize.minimize({
//   // eslint-disable-line
//   compress: { warnings: false }
// });

const config = {
  entry: {
    App: './public/javascripts/berkeleypse-api.js'
  },

  devtool: 'source-map',

  output: {
    path: path.resolve(__dirname, 'public', 'dist'),
    filename: '[name].bundle.js'
  },

  module: {
    rules: [javascript, styles]
  },
  // plugins: [uglify]
  plugins: [new ExtractTextPlugin('style.css')]
};

process.noDeprecation = true;

module.exports = config;
