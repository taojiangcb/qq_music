const path = require('path');
const { resolve } = path;

module.exports = {
  root: resolve(__dirname, "../../"),
  static: resolve(__dirname, "../../bin"),
  binDir: resolve(__dirname, "../../bin"),
}