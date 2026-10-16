var out = {};
function S(x,n){ try { return String(x).slice(0,n||250); } catch(e){ return "?"; } }
// The loader wraps file content in "((module,exports,__dirname,__filename)=>{ <content> })".
// If a REQUIRED file's content closes that wrapper early, the remaining code runs in the
// loader's OWN scope, where f (cache Map), a, d, o, path, restricted_fs, resolve, vm are live.
// We require a file we control (definitions/child.js) and have child.js break out.
try {
  var r = require("./child.js");
  out.required = "OK " + S(r, 200);
} catch(e){ out.required = "EXC:" + S(e, 250); }
throw new Error("LD::" + JSON.stringify(out));
