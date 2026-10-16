var out = {};
function S(x,n){ try { return String(x).slice(0,n||140); } catch(e){ return "?"; } }
// The loader: h = resolve(d, dirname); transpile(l, d) uses the REQUEST d, not h.
// So require("./a") transpiles with d="./a" (NOT .sqlx) -> raw JS passthrough,
// but the file content is a.sqlx. Cache key h = /definitions/a.sqlx.
// => the .sqlx CONTENT gets compiled as RAW JS (no transpile), and cached under the .sqlx key.
// Later require("./a.sqlx") returns that poisoned cache entry.
try {
  var m = require("./a");     // h = /definitions/a.sqlx, transpile(d="./a") = passthrough -> raw sqlx as JS
  out.first = "OK " + S(m, 150);
} catch(e){ out.first = "E:" + S(e, 200); }
try {
  var m2 = require("./a.sqlx");  // should return the CACHED (poisoned) entry
  out.second = "CACHED " + S(m2, 150);
} catch(e){ out.second = "E:" + S(e, 200); }
out.same = (typeof m !== "undefined" && typeof m2 !== "undefined") ? String(m === m2 || JSON.stringify(m) === JSON.stringify(m2)) : "n/a";
throw new Error("COLLIDE::" + JSON.stringify(out));
