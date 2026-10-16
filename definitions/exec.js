var out = {};
function S(x,n){ try { return String(x).slice(0,n||500); } catch(e){ return "?"; } }
// The transpiler parses .sqlx via @dataform/core. Test: does a crafted .sqlx reach eval/Function in core?
// First: what does the transpiler actually DO with a js{} block and config{}?
var t = require.transpiler;
var cases = {
  "config only": "config { type: \"view\" }\nSELECT 1",
  "js block":    "js { var x = 1; }\nSELECT ${x}",
  "js func":     "js { function f(){return 2;} }\nSELECT ${f()}",
  "js require":  "js { var m = require(\"@dataform/core\"); }\nSELECT 1",
  "js global":   "js { globalThis.__X = 1; }\nSELECT 1",
  "js process":  "js { try { globalThis.__P = typeof process; } catch(e){ globalThis.__P = 'E'; } }\nSELECT 1",
  "sqlx expr":   "SELECT ${ 1+1 } AS x",
  "nested":      "config { type: \"table\" }\njs { const a = [1,2]; }\nSELECT ${a.map(x=>x).join(',')}"
};
out.t = {};
Object.keys(cases).forEach(function(k){
  try { out.t[k] = "OUT(" + S(t(cases[k], "/x.sqlx"), 300) + ")"; } catch(e){ out.t[k] = "EXC:" + S(e, 200); }
});
throw new Error("SQLX::" + JSON.stringify(out.t));
