const path = require('path');
const { resolve } = path;
const webpack = require('webpack')
const merge = require('webpack-merge');
const clibase = require('./webpack.config.clibase');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const appPath = require('../env/Paths');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const InterpolateHtmlPlugin = require('interpolate-html-plugin');

const WorkboxPlugin = require('workbox-webpack-plugin');


const { env } = require('../env/Env');
const OS = require('os');


const webpack_build_cilserverwork = merge(clibase, {

  plugins: [
    // app 模块
    new HtmlWebpackPlugin({
      template: resolve(__dirname, '../template/indexserverwork.html'),
    }),

    new WorkboxPlugin.GenerateSW({
      exclude: [
        /\.(?:png|jpg|jpeg|svg)$/,
        /\.(?:js|json)$/,
        /\.(?:html)$/,
        new RegExp('http[s]?://.+\/api\/.+'),

      ],
      runtimeCaching: [{
        urlPattern: /\.(?:png|jpg|jpeg|svg)$/,
        handler: 'CacheFirst',
        options: {
          cacheName: 'images',
          expiration: {
            maxAgeSeconds: 60 * 60 * 24 * 30
          }
        }
      },
      {
        urlPattern: /\.(?:js|json)$/,
        handler: "StaleWhileRevalidate",
        options: {
          cacheName: 'js_json',
        }
      },
      {
        urlPattern: new RegExp('http[s]?://.+\/api\/.+'),
        handler: "StaleWhileRevalidate",
        options: {
          cacheName: 'api',
        }
      },
      {
        urlPattern: /\.(?:html)$/,
        handler: "StaleWhileRevalidate",
        options: {
          cacheName: 'html',
        }
      }
      ]
    })
  ]
})

module.exports = webpack_build_cilserverwork;

