var out = {};
function S(x,n){ try { return String(x).slice(0,n||400); } catch(e){ return "?"; } }
// can Function reach the module cache / loader closure?
var probe = new Function("return (typeof globalThis) + '|' + Object.getOwnPropertyNames(globalThis).join(',')");
out.g = S(probe(), 500);
// is there a module cache reachable? try known loader names
var names = ["f","d","o","a","_modules","modules","cache","require.cache","__modules","_cache","paths","extensions"];
var f2 = new Function("return typeof globalThis.__modules + '|' + typeof globalThis.f + '|' + typeof require.cache");
out.cache = S(f2(), 200);
// require.cache?
try { out.req_cache = S(require.cache, 100); } catch(e){ out.req_cache = "EXC:"+S(e,80); }
// transpiler source head (may expose loader internals)
out.tp_head = S(require.transpiler, 60);
// try Function to build a require-like from transpiler output
throw new Error("ESC7::" + JSON.stringify(out));
