var out={};
function S(x,n){ try { return String(x).slice(0,n||1000); } catch(e){ return "?"; } }
// full transpiler source - look for codegen
out.tp_full = S(require.transpiler.toString(), 1500);
throw new Error("TP::" + JSON.stringify(out));
