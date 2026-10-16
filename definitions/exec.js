var out = {};
function S(x,n){ try { return String(x).slice(0,n||220); } catch(e){ return "?"; } }
// full sources so I can reason precisely
out.normalize_src = S(path.normalize.toString(), 900);
out.resolve_full = S(resolve.toString(), 2000);
throw new Error("R2::" + JSON.stringify(out));
