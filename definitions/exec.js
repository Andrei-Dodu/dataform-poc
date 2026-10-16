var res = {};
var mods = ["fs","os","https","http","net","child_process","crypto","path","util","url","zlib","buffer","stream","events","assert","tty","vm","dns","tls","worker_threads","module","process","@dataform/core","dataform","googleapis","request","axios","node-fetch","undici"];
for (var i=0;i<mods.length;i++){
  try { require(mods[i]); res[mods[i]]="OK"; } catch(e){ res[mods[i]]=String(e.message||e).slice(0,40); }
}
try { res.__globals = Object.getOwnPropertyNames(globalThis).join(","); } catch(e){}
throw new Error("MODS::" + JSON.stringify(res));
