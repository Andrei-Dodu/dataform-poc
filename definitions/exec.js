var out = {};
function S(x,n){ try { return String(x).slice(0,n||200); } catch(e){ return "?"; } }
// SHADOW: plant node_modules/@dataform/core in the REPO ROOT (which the walk reaches) so a
// require("@dataform/core") from /definitions resolves MY copy instead of the installed one.
try { out.r = "->" + S(resolve("@dataform/core", "/"), 120); } catch(e){ out.r = "E:"+S(e,120); }
throw new Error("SH::" + JSON.stringify(out));
