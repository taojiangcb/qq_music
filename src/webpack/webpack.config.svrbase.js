const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge');
const baseConf = require('./webpack.config.base');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const appPath = require('../env/Paths');
const nodeExternals = require('webpack-node-externals');

const webpack_build_dev = merge(baseConf, {
  target: 'node',
  entry: {
    app: path.resolve(__dirname, '../server/ServerApp.ts'),
  },

  output: {
    path: appPath.binDir,
    filename: "svr.[contenthash:8].js",
  },
  externals: [nodeExternals()]
})

module.exports = webpack_build_dev;