// Does a normal require of a BARE package name (with no node_modules hit) hit the loop?
module.exports = require("this-package-does-not-exist-xyz");
