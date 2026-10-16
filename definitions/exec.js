var out={};
function S(x,n){ try { return String(x).slice(0,n||140); } catch(e){ return "?"; } }
// does require of a KNOWN module still work (proves the loop is fallback-only)?
try { out.core = "OK " + S(Object.keys(require("@dataform/core")).slice(0,5).join(","), 80); } catch(e){ out.core = "EXC:"+S(e,70); }
// a subpath that resolves via node_modules walk but doesn't exist -> should hit the loop
try { out.sub = "OK " + S(require("@dataform/core/package.json") && "loaded", 40); } catch(e){ out.sub = "EXC:"+S(e,90); }
throw new Error("R9::" + JSON.stringify(out));
