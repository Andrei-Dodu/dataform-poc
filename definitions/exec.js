var out = {};
function S(x,n){ try { return String(x).slice(0,n||110); } catch(e){ return "?"; } }
// only ./ and ../ prefixed (which take the fast path in resolve, no node_modules walk)
var base = "/definitions";
var reqs = ["./a.sqlx", "./a", "./a.js", "./a.json", "../definitions/a.sqlx", "././a.sqlx", "./x/../a.sqlx"];
out.res = {};
reqs.forEach(function(r){ try { out.res[r] = "->" + S(resolve(r, base), 110); } catch(e){ out.res[r] = "E:"+S(e,70); } });
throw new Error("CACHE::" + JSON.stringify(out.res));
