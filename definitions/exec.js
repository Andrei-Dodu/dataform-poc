var out = {};
function S(x,n){ try { return String(x).slice(0,n||2200); } catch(e){ return "?"; } }
// The tail of the transpiler - where `n` (the JS/SQL body) is injected.
var full = String(require.transpiler);
out.tail = full.slice(-900);
out.len = full.length;
throw new Error("TAIL::" + JSON.stringify(out));
