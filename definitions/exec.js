var out = {};
function S(x,n){ try { return String(x).slice(0,n||160); } catch(e){ return "?"; } }
// attack resolve() with hostile request strings from a base dir
var base = "/definitions";
var reqs = ["@dataform/core","./x","../x","../../x","../../../etc/passwd",".//@dataform/core",
  "..//..//..//etc/passwd","/etc/passwd","/.","/node_modules/@dataform/core",
  "./../../node_modules/@dataform/core","....//....//etc/passwd",".../.../.../etc/passwd",
  "....//@dataform/core","..%2f..%2fetc/passwd","\u0000/etc/passwd","/dev/null",
  "./node_modules/@dataform/core","/definitions/../../package.json"];
reqs.forEach(function(r){
  try { var v = resolve(r, base); out[r] = "->" + S(v, 90); }
  catch(e){ out[r] = "EXC:" + S(e, 70); }
});
// also: does resolve handle an absolute request by returning it verbatim?
try { out.abs = S(resolve("/etc/passwd", "/definitions"), 80); } catch(e){ out.abs="EXC:"+S(e,60); }
try { out.abs2 = S(resolve("//etc/passwd", "/definitions"), 80); } catch(e){ out.abs2="EXC:"+S(e,60); }
throw new Error("R5::" + JSON.stringify(out));
