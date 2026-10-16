var out = {};
function S(x,n){ try { return String(x).slice(0,n||420); } catch(e){ return "?"; } }
var t = require.transpiler;
var payloads = {
  "js/function":   'x: !!js/function "function(){ return 1 }"',
  "js/undefined":  'x: !!js/undefined',
  "js/regexp":     'x: !!js/regexp /a/',
  "js/date":       'x: !!js/date 2020-01-01',
  "python/object": 'x: !!python/object/apply:os.system ["id"]',
  "unsafe tag":    'x: !<tag:yaml.org,2002:js/function> "function(){}"',
  "set":           'x: !!set {a: null}',
  "binary":        'x: !!binary "aGVsbG8="',
  "merge key":     'a: &x {y: 1}\nb: {<<: *x, z: 2}',
  "core tag":      'x: !!str 123'
};
out.y = {};
Object.keys(payloads).forEach(function(k){
  try { out.y[k] = "OK " + S(t(payloads[k], "/p.yaml"), 260); } catch(e){ out.y[k] = "EXC:"+S(e,120); }
});
throw new Error("YV::" + JSON.stringify(out.y));
