var out = {};
function S(x,n){ try { return String(x).slice(0,n||200); } catch(e){ return "?"; } }
// Is my planted node_modules/@dataform/core visible in the jail, and can I require it?
try { out.shadow_exists = String(restricted_fs.exists("/node_modules/@dataform/core/package.json")); } catch(e){ out.shadow_exists="E"; }
try { var m = require("@dataform/core/package.json"); out.pj = S(JSON.stringify(m), 200); } catch(e){ out.pj = "E:"+S(e,120); }
// and the main entry
try { var m2 = require("@dataform/core"); out.main_keys = S(Object.keys(m2||{}).join(","), 120); } catch(e){ out.main_keys = "E:"+S(e,120); }
throw new Error("SH3::" + JSON.stringify(out));
