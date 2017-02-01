const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const devBuild = process.env.NODE_ENV !== 'production';
const nodeEnv = devBuild ? 'development' : 'production';


const sassLoaderIncludePathsArr = [
                                    path.resolve(__dirname, "./client/styles"),
                                    ...require("bourbon").includePaths,
                                    ...require("bourbon-neat").includePaths,
                                    path.resolve(__dirname, "./node_modules/react-select/dist")
                                  ];

var config = {

  output: {
    filename: '[name]-bundle.js',
    path: './server/public',
    publicPath: '/'
  },

  entry: {

    // See use of 'vendor' in the CommonsChunkPlugin inclusion below.
    vendor: [
      'es5-shim/es5-shim',
      'es5-shim/es5-sham',
      'babel-polyfill',
      'i18n-iso-countries',
      'isomorphic-fetch',
      'lodash',
      'moment',
      'numeral',
      'react',
      'react-date-range',
      'react-dom',
      'react-loader',
      'react-redux',
      'redux-logger',
      'redux-thunk'
    ],

    app: ['./client/index.jsx', './client/styles/index.scss' ]

  },

  resolve: {
    extensions: ['', '.js', '.jsx', '.json'],
    alias: {
      lib: path.join(process.cwd(), 'client', 'lib'),
      client: path.join(process.cwd(), 'client'),
      react: path.resolve('./node_modules/react'),
      'react-dom': path.resolve('./node_modules/react-dom')
    },
  },

  plugins: [

    new webpack.optimize.DedupePlugin(),
    new webpack.HotModuleReplacementPlugin(),

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(nodeEnv),
      },
    }),

    // https://webpack.github.io/docs/list-of-plugins.html#2-explicit-vendor-chunk
    new webpack.optimize.CommonsChunkPlugin({

      // This name 'vendor' ties into the entry definition
      name: 'vendor',

      // We don't want the default vendor.js name
      filename: 'vendor-bundle.js',

      // Passing Infinity just creates the commons chunk, but moves no modules into it.
      // In other words, we only put what's in the vendor entry definition in vendor-bundle.js
      minChunks: Infinity,
    }),

    new ExtractTextPlugin('styles.css')
  ],

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },

      {
        include: /\.json$/,
        loaders: ["json-loader"]
      },

      {
        test: /\.svg$/,
        loader: 'babel!svg-react'
      },

      {
        test: require.resolve('react'),
        loader: 'imports?shim=es5-shim/es5-shim&sham=es5-shim/es5-sham'
      },

      {
        test: require.resolve('jquery-ujs'),
        loader: 'imports?jQuery=jquery'
      },

      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css?sourceMap!sass?sourceMap')
      }

    ]
  },

  sassLoader: {
    includePaths: sassLoaderIncludePathsArr
  }
};



module.exports = config;

if (devBuild) {
  module.exports.devtool = 'source-map';  // eval-source-map
  console.log('Webpack dev build'); // eslint-disable-line no-console
} else {

  config.plugins.push(new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false }}));
  console.log('Webpack production build'); // eslint-disable-line no-console
}

