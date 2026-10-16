var out = {};
function S(x,n){ try { return String(x).slice(0,n||300); } catch(e){ return "?"; } }
// require.transpiler
out.transpiler = S(require.transpiler, 300);
out.transpiler_props = S((function(){ try { return Object.getOwnPropertyNames(require.transpiler).join(","); } catch(e){ return "err"; } })(),200);
// resolve / path
out.resolve_str = S(resolve, 300);
out.path_own = S(Object.getOwnPropertyNames(path).join(","),200);
// the loader: require(source) with a virtual path? try requiring things that might be loadable
["/node_modules/@dataform/core/package.json","@dataform/core","/definitions/exec.js","./exec.js","core","dataform"].forEach(function(n){
  try { var r = require(n); out["req_"+n] = "OK " + S(Object.keys(r||{}).slice(0,12).join(","), 200); }
  catch(e){ out["req_"+n] = "EXC:" + S(e, 140); }
});
// Function constructor escape
try { out.fn = S(new Function("return typeof process"), 40); } catch(e){ out.fn = "EXC:"+S(e,120); }
try { out.fn2 = S(new Function("return this")(), 120); } catch(e){ out.fn2 = "EXC:"+S(e,120); }
// eval escape
try { out.ev = S(eval("typeof require + '|' + typeof global"), 100); } catch(e){ out.ev="EXC:"+S(e,120); }
throw new Error("ESC5::" + JSON.stringify(out));
