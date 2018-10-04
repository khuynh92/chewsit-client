'use strict';

require('dotenv').config();

const {DefinePlugin} = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const production = process.env.NODE_ENV === 'production';

const webpackConfig = module.exports = {};

webpackConfig.entry = ['babel-polyfill', `${__dirname}/src/main.js`];

webpackConfig.output = {
  filename: '[name].[hash].js',
  path: `${__dirname}/build`,
  publicPath: '/',
};

webpackConfig.plugins = [
  new HtmlWebpackPlugin({
    title:'React App',
    template: `${__dirname}/src/index.html`,
  }),
  new DefinePlugin({
    'process.env': {
      API_URL: JSON.stringify(process.env.API_URL),
      FETCH_URL: JSON.stringify(process.env.FETCH_URL),
      GOOGLE_API_KEY: JSON.stringify(process.env.GOOGLE_API_KEY)
    },
    PRODUCTION: production,
  }),
];

webpackConfig.module = {};

webpackConfig.module.rules = [
  {
    test: /\.(png|gif|svg|jpg)$/,
    use: [ 'file-loader' ],
    exclude: '/node_modules/**',
  },
  {
    exclude: '/node_modules/**',
    test: /\.js$/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: [  'env','stage-0','react'],
        plugins: ['transform-react-jsx-source', 'babel-plugin-lodash', ['direct-import', ['mdi-material-ui']]],
        cacheDirectory: true,
      },
    },
  },
];