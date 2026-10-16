var out = {};
function S(x,n){ try { return String(x).slice(0,n||600); } catch(e){ return "?"; } }
var t = require.transpiler;
// The config{} block body `r` is injected as: ...${r||"{}"}  into an OBJECT LITERAL.
// Can I break out of the object literal with } and inject code?
var cases = {
  "normal":      'config { type: "view" }',
  "close obj":   'config { type: "view" }, injected: 1',
  "break obj":   'config { type: "view" } } ); globalThis.__CFG=1; ({ x:1',
  "array inj":   'config { type: "view", a: `${1+1}` }',
  "comma code":  'config { get type(){ globalThis.__GETTER=1; return "view"; } }'
};
out.c = {};
Object.keys(cases).forEach(function(k){
  try { out.c[k] = S(t(cases[k] + "\nSELECT 1", "/c.sqlx"), 500); } catch(e){ out.c[k] = "EXC:"+S(e,150); }
});
throw new Error("CFGINJ::" + JSON.stringify(out.c));
