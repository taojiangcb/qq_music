const path = require('path');
const { resolve } = path;

module.exports = {
  root: resolve(__dirname, "../../"),
  view: resolve(__dirname, "../bin/views"),
  static: resolve(__dirname, "../bin/assets"),
  binDir: resolve(__dirname, "../../bin"),
}