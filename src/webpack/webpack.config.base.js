const path = require('path');
const { resolve } = path;
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');

const { CheckerPlugin, TsConfigPathsPlugin } = require('awesome-typescript-loader');
const { env } = require('../env/Env');

module.exports = {
  mode: 'development',
  resolve: {
    //优化
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.mjs', '.scss'],
    alias: {
      '@ant-design/icons/lib/dist$': path.resolve(__dirname, '../src/antd_fix/icon.ts')
    }
  },
  // entry: {
  //   app: path.resolve(__dirname, '../src/index.tsx'),
  // },
  //提取公共模块
  optimization: {
    splitChunks: {
      minChunks: 2,
      maxInitialRequests: 5,
      cacheGroups: {
        common: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          name: 'common',
          minChunks: 2,
          maxInitialRequests: 5,
          minSize: 0,
        }
      }
    }
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'eslint-loader',
        options: {
          emitWarning: true,  // 这个配置需要打开，才能在控制台输出warning信息
          emitError: true,    // 这个配置需要打开，才能在控制台输出error信息
          fix: true           // 是否自动修复，如果是，每次保存时会自动修复可以修复的部分
        }
      },
    ]
  },

  plugins: [
    // new CheckerPlugin(),
    new TsConfigPathsPlugin(),
    new WebpackBuildNotifierPlugin({
      title: "My mt Project Webpack Build",
      // logo: path.resolve("./img/favicon.png"),
      suppressSuccess: true
    }),

    require('autoprefixer'), //调用autoprefixer插件，例如 display: flex

    new FriendlyErrorsPlugin(),

    // 在js代码中能够使用环境变量(demo: process.env.REACT_APP_ENV === 'dev')
    new webpack.DefinePlugin(env.stringified),

    new CopyPlugin([
      {
        from: resolve(__dirname, "../assets"),
        to: resolve(__dirname, "../../bin/assets"),
      },
      {
        from: resolve(__dirname, "../views"),
        to: resolve(__dirname, "../../bin/views"),
      },
    ]),
  ]
}