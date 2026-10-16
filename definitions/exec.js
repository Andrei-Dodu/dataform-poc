var out = {};
function S(x,n){ try { return String(x).slice(0,n||700); } catch(e){ return "?"; } }
var t = require.transpiler;
// Weaponize: get U+2028 OUTSIDE a JSON string so it breaks the JS statement.
// JSON.stringify escapes \n as \\n but does NOT escape U+2028/U+2029 inside strings.
// To break out we need the char OUTSIDE a string -- e.g. via a YAML KEY, or a structure
// where JSON.stringify emits it bare.
var U = "\u2028", Z = "\u2029";
var cases = {
  "key with U2028":      JSON.stringify({["k"+U+"globalThis.__Y1=1"]: "v"}),
  "value U2028 then }":  'a: "x' + U + '"; globalThis.__Y2=1; //"',
  "nested U2028":        'a:\n  b: "x' + U + '"',
  "array U2028":         'a:\n  - "x' + Z + '"',
};
out.em = {};
Object.keys(cases).forEach(function(k){
  try { out.em[k] = S(t(cases[k], "/w.yaml"), 500); } catch(e){ out.em[k] = "EXC:"+S(e,150); }
});
throw new Error("U2028::" + JSON.stringify(out.em));
