var out = {};
function S(x,n){ try { return String(x).slice(0,n||500); } catch(e){ return "?"; } }
var t = require.transpiler;
// The yaml branch: "exports.asJson = " + JSON.stringify(parsedYaml)   -- NO escaping.
// Feed YAML that yields a JS-breaking JSON payload.
var cases = {
  "yaml U+2028":  'a: "x\\u2028"',
  "yaml U+2029":  'a: "x\\u2029"',
  "yaml newline": 'a: "x',   // invalid
};
out.y = {};
Object.keys(cases).forEach(function(k){
  try { out.y[k] = S(t(cases[k], "/y.yaml"), 400); } catch(e){ out.y[k] = "EXC:"+S(e,120); }
});
// ipynb branch: same shape
try { out.ipynb = S(t('{"a":"x"}', "/n.ipynb"), 300); } catch(e){ out.ipynb = "EXC:"+S(e,120); }
throw new Error("YAML::" + JSON.stringify(out));
