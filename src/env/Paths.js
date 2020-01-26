const path = require('path');
const { resolve } = path;

module.exports = {
  root: resolve(__dirname, "../../"),
  static: resolve(__dirname, "../../bin"),
  binDir: resolve(__dirname, "../../bin"),
  ssrTemp: resolve(__dirname, "../../bin/ssrindex.html"),    //ssr服务读取的模板html文件
  distDir: resolve(__dirname, "../../dist"),
}