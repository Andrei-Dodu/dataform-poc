var out = {};
function S(x,n){ try { return String(x).slice(0,n||120); } catch(e){ return "?"; } }
// confirm the dirname non-shrink: dirname('/') === '/'
out.d_root = S(path.dirname("/"),20);
out.d_slash = S(path.dirname("/a"),20);
out.d_empty = S(path.dirname(""),20);
// bounded resolve probes (no infinite loops): only relative + absolute requests
var base = "/definitions";
var reqs = ["./x","../x","/etc/passwd","//etc/passwd","@dataform/core","....//@dataform/core","./node_modules/@dataform/core"];
reqs.forEach(function(r){
  try { out["r:"+r] = "->" + S(resolve(r, base), 90); } catch(e){ out["r:"+r] = "EXC:" + S(e, 60); }
});
throw new Error("R6::" + JSON.stringify(out));
