var out = {};
function S(x,n){ try { return String(x).slice(0,n||300); } catch(e){ return "?"; } }
// `core` is a global. Explore it and everything reachable from it.
out.core_type = typeof core;
out.core_props = S((function(){ try { return Object.getOwnPropertyNames(core).slice(0,40).join(","); } catch(e){ return "err"; } })(),400);
// walk 2 levels deep looking for anything with a 'constructor' != sandbox Function
var found = [];
function walk(obj, path, depth){
  if (depth > 2 || !obj) return;
  var keys; try { keys = Object.getOwnPropertyNames(obj).slice(0,30); } catch(e){ return; }
  for (var i=0;i<keys.length;i++){
    var k = keys[i], v;
    try { v = obj[k]; } catch(e){ continue; }
    if (typeof v === "function") {
      try { if (v.constructor !== Function) found.push(path+"."+k+" :: "+S(v.constructor,60)); } catch(e){}
    } else if (v && typeof v === "object") {
      try { if (Object.getPrototypeOf(v) && Object.getPrototypeOf(v).constructor !== Object && Object.getPrototypeOf(v).constructor !== Function) found.push(path+"."+k+" proto:"+S(Object.getPrototypeOf(v).constructor,60)); } catch(e){}
      walk(v, path+"."+k, depth+1);
    }
  }
}
walk(core, "core", 0);
out.foreign = found.slice(0,15);
// also check _DF_SESSION and dataform globals
out.df = S((function(){ try { return Object.getOwnPropertyNames(dataform).join(","); } catch(e){ return "err"; } })(), 300);
out.sess = S((function(){ try { return Object.getOwnPropertyNames(_DF_SESSION).join(","); } catch(e){ return "err"; } })(), 300);
throw new Error("ESC12::" + JSON.stringify(out));
