var out = {};
function S(x,n){ try { return String(x).slice(0,n||110); } catch(e){ return "?"; } }
// CACHE KEY COLLISION: f.set(h,l) keys on resolve(request, dirname). If two different requests
// resolve to the SAME h, the cache returns the first module's exports for the second.
// And `h.endsWith(".json")` special-cases JSON.parse. Can a request resolve to a .json path
// that is ALSO required as JS? Or can we make resolve() return a path we can then read as source?
var base = "/definitions";
var reqs = ["@dataform/core/package.json", "@dataform/core", "./a.sqlx", "./a", "./a.js", "/definitions/a", "/definitions/a.sqlx", "/definitions/a.js"];
out.res = {};
reqs.forEach(function(r){ try { out.res[r] = "->" + S(resolve(r, base), 100); } catch(e){ out.res[r] = "E:"+S(e,60); } });
throw new Error("CACHE::" + JSON.stringify(out.res));
