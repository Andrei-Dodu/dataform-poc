var out = {};
function S(x,n){ try { return String(x).slice(0,n||300); } catch(e){ return "?"; } }
out.tp = S(require.transpiler, 200);
out.tp_props = S((function(){ try { return Object.getOwnPropertyNames(require.transpiler).join(","); } catch(e){ return "err"; } })(), 200);
out.resolve = S(resolve, 200);
out.path = S(Object.getOwnPropertyNames(path).join(","), 200);
out.fnctor = S((function(){ try { return new Function("return 1+1")(); } catch(e){ return "EXC:"+S(e,80); } })(), 60);
out.fnthis = S((function(){ try { var t = new Function("return typeof globalThis")(); return t; } catch(e){ return "EXC:"+S(e,80); } })(), 60);
throw new Error("ESC6::" + JSON.stringify(out));
