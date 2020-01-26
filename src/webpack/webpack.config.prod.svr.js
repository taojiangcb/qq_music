const path = require('path')
const merge = require('webpack-merge');
const svrBaseConf = require('./webpack.config.svrbase');
const CopyPlugin = require('copy-webpack-plugin');
const { resolve } = path;

const webpack_svr_prod = merge(svrBaseConf, {})

module.exports = webpack_svr_prod;