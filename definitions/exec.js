var out = {};
function S(x,n){ try { return String(x).slice(0,n||700); } catch(e){ return "?"; } }
// Dump the FULL source of resolve and transpiler - they are hand-written, bug is likely here
out.resolve_src = S(resolve.toString(), 900);
out.path_dirname = S(path.dirname.toString(), 300);
out.path_join = S(path.join.toString(), 400);
out.path_normalize = S(path.normalize.toString(), 300);
throw new Error("R1::" + JSON.stringify(out));
