
const path = require('path')
const { resolve } = path;
const merge = require('webpack-merge');
const cliBaseConf = require('./webpack.config.clibase');
const appPath = require('../env/Paths');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const InterpolateHtmlPlugin = require('interpolate-html-plugin');
const { env } = require('../env/Env');

const webpack_build_cilprod = merge(cliBaseConf, {})

module.exports = webpack_build_cilprod;

