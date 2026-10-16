var out = {};
function S(x,n){ try { return String(x).slice(0,n||80); } catch(e){ return "EXC"; } }
function T(fn){ try { return fn(); } catch(e){ return "E:"+S(e,60); } }
var Z="\u200B";
// byte-level / stress shapes against the native binding
var tests = {
  "very long path (10k)":        "/" + "a/".repeat(5000) + "package.json",
  "very long single segment":    "/" + "a".repeat(9000),
  "deep nesting 2000":           "/"+"d/".repeat(2000)+"package.json",
  "NUL in middle":               "/package\u0000.json",
  "NUL as segment":              "/package/"+String.fromCharCode(0)+"/json",
  "lone surrogate":              "/package\uD800.json",
  "reversed BOM":                "\uFEFFpackage.json",
  "BOM prefix":                  "\uFEFF/package.json",
  "overlong utf8 via js string": "/package\u00C0\u0080.json",
  "combining over dot":          "/package\u0301.json",
  "huge unicode segment":        "/" + "\u2028".repeat(3000) + "/package.json",
  "newline in path":             "/package\u000A.json",
  "carriage return":             "/package\u000D.json",
  "tab in path":                 "/\tpackage.json",
  "backslash-escape":            "/package\\.json"
};
out.t = {};
Object.keys(tests).forEach(function(k){
  var p = tests[k];
  out.t[k] = { exists: T(function(){ return String(restricted_fs.exists(p)); }),
               isDir: T(function(){ return String(restricted_fs.isDirectory(p)); }),
               read: T(function(){ var r=restricted_fs.readFile(p); return "LEN"+r.length; }) };
});
throw new Error("BYTE::" + JSON.stringify(out.t));
