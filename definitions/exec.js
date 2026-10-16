var out = {};
function S(x,n){ try { return String(x).slice(0,n||400); } catch(e){ return "?"; } }
var t = require.transpiler;
// My SQL goes into a JS template literal: return [` ... ${z} `]. So ${} in SQL = JS code in the fn.
// Test what JS can run from inside the sqlContextable arrow: can it see anything interesting?
var probes = {
  "typeof process": "SELECT ${typeof process} AS x",
  "typeof require": "SELECT ${typeof require} AS x",
  "typeof globalThis": "SELECT ${typeof globalThis} AS x",
  "globalThis keys": "SELECT ${Object.getOwnPropertyNames(globalThis).length} AS x",
  "typeof module":  "SELECT ${typeof module} AS x",
  "typeof exports": "SELECT ${typeof exports} AS x"
};
out.emitted = {};
Object.keys(probes).forEach(function(k){
  try { out.emitted[k] = S(t("config { type: \"view\" }\n" + probes[k], "/y.sqlx"), 400); }
  catch(e){ out.emitted[k] = "EXC:" + S(e, 150); }
});
throw new Error("TMPL::" + JSON.stringify(out.emitted));
