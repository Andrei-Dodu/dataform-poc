var out = {};
function S(x){ try { return String(x).slice(0,120); } catch(e){ return "?"; } }
// what IS require?
out.require_type = typeof require;
out.require_str = S(require);
out.require_name = S(require.name);
out.require_len = require.length;
out.require_ctor = S(require.constructor && require.constructor.name);
out.require_props = (function(){ try { return Object.getOwnPropertyNames(require).join(",").slice(0,200); } catch(e){ return "err"; } })();
// globals inventory
out.globals = (function(){ try { return Object.getOwnPropertyNames(globalThis).join(","); } catch(e){ return "err"; } })();
// module / __module / any loader objects
["module","exports","__filename","__dirname","global","process","Buffer","setTimeout","console","Function","eval","WebAssembly","importScripts"].forEach(function(k){
  try { out["g_"+k] = (typeof eval(k)); } catch(e){ out["g_"+k] = "err:"+S(e); }
});
throw new Error("SB::" + JSON.stringify(out));
