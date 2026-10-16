var out = {};
function S(x,n){ try { return String(x).slice(0,n||200); } catch(e){ return "?"; } }
// SHADOW TEST: can a repo file be resolved as "@dataform/core" from a directory walk?
// resolve("@dataform/core", base) hits the loop when it falls through - but if I PLANT a
// node_modules/@dataform/core in a parent dir, resolve may find MY version first.
try { out.core = "resolved:" + S(resolve("@dataform/core", "/definitions"), 100); } catch(e){ out.core = "E:"+S(e,100); }
try { out.core2 = "resolved-from-dot:" + S(resolve("@dataform/core", "/definitions/sub"), 100); } catch(e){ out.core2 = "E:"+S(e,100); }
throw new Error("SHADOW::" + JSON.stringify(out));
