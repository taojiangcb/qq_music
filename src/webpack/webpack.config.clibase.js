const path = require('path');
const { resolve } = path;
const webpack = require('webpack')
const merge = require('webpack-merge');
const baseConf = require('./webpack.config.base');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const appPath = require('../env/Paths');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const InterpolateHtmlPlugin = require('interpolate-html-plugin');
const { env } = require('../env/Env');


const webpack_build_cilbase = merge(baseConf, {
  entry: {
    app: path.resolve(__dirname, '../client/App.tsx'),
  },

  output: {
    path: resolve(__dirname, '../../bin'),
    filename: "[name].[hash].js",
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        include: appPath.root,
        loader: 'awesome-typescript-loader'
      },
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: /node_modules/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1
            }
          },
          // "postcss-loader",
          "sass-loader",
          {
            loader: 'sass-resources-loader',
            options: {
              resources: [
                resolve(__dirname, '../assets/common.scss'),
                resolve(__dirname, '../assets/icon.scss'),
              ]
            }
          }
        ]
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: require.resolve('url-loader'),
        options: {
          limit: 5000,
          name: 'static/media/[name].[hash:8].[ext]',
        },
      },
      {
        test: /\.(woff|woff2|svg|ttf|eot)($|\?)/i,
        loader: require.resolve('url-loader'),
        exclude: /node_modules/,
        options: {
          limit: 5000,
          name: '[name].[hash:8].[ext]',
        },
      } // 限制大小小于5k      
    ]
  },
  plugins: [

    // app 模块
    new HtmlWebpackPlugin({
      template: resolve(__dirname, '../template/index.html'),
      filename: 'ssrindex.html',
      // chunks: ['common', 'app']
    }),

    // 插入环境变量   // <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
    new InterpolateHtmlPlugin(env.raw),
  ]
})

module.exports = webpack_build_cilbase;

