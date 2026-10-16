var out = {};
function S(x,n){ try { return String(x).slice(0,n||80); } catch(e){ return "EXC"; } }
function T(fn){ try { return fn(); } catch(e){ return "E:"+S(e,50); } }
var tests = {
  "NUL in middle":      "/package\u0000.json",
  "NUL as segment":     "/package/"+String.fromCharCode(0)+"/json",
  "lone surrogate":     "/package\uD800.json",
  "reversed BOM":       "\uFEFFpackage.json",
  "BOM prefix":         "\uFEFF/package.json",
  "newline":            "/package\u000A.json",
  "carriage return":    "/package\u000D.json",
  "tab":                "/\tpackage.json",
  "backslash-escape":   "/package\\.json",
  "double dot quoted":  "/package\".json",
  "lone high surrogate":"/\uDFFF/package.json"
};
out.t = {};
Object.keys(tests).forEach(function(k){
  var p = tests[k];
  out.t[k] = T(function(){ return "ex:"+restricted_fs.exists(p)+" rd:"+T(function(){return "L"+restricted_fs.readFile(p).length;}); });
});
throw new Error("BYTE2::" + JSON.stringify(out.t));
