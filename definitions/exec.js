var out={};
function S(x,n){ try { return String(x).slice(0,n||200); } catch(e){ return "?"; } }
// The loader wraps: "((module, exports, __dirname, __filename) => {\n " + <my file> + "\n })"
// Can my file CLOSE the arrow function early and inject code that runs in the OUTER scope?
// Try via calling the loader manually with a crafted "file" — simulate by reading exec.js itself
// Actually: test whether vm.compileModule wraps or not by giving it the SAME wrapper the loader uses,
// with a payload that closes early.
var evil = "})(); globalThis.__PWND = 'yes'; (() => {";
try {
  var fn = vm.compileModule("/evil.js", "\n ((module, exports, __dirname, __filename) => {\n " + evil + "\n })");
  var m = {exports:{}};
  fn(m, m.exports, "/", "/evil.js");
  out.early_close = "executed; __PWND=" + S(globalThis.__PWND, 20);
} catch(e){ out.early_close = "EXC:" + S(e, 160); }
// Also: is there a semicolon/comment injection that comments out the trailer?
var evil2 = "module.exports=1; /* ";
try {
  var fn2 = vm.compileModule("/evil2.js", "\n ((module, exports, __dirname, __filename) => {\n " + evil2 + "\n })");
  var m2 = {exports:{}}; fn2(m2, m2.exports, "/", "/evil2.js"); out.inject2 = "OK " + S(m2.exports,20);
} catch(e){ out.inject2 = "EXC:" + S(e, 120); }
throw new Error("BRK::" + JSON.stringify(out));
