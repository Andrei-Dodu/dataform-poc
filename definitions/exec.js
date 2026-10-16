var out = {};
function S(x,n){ try { return String(x).slice(0,n||1400); } catch(e){ return "?"; } }
// Full transpiler source - the sqlx code generator. This is where my SQL becomes JS.
out.tp = S(require.transpiler.toString(), 2600);
throw new Error("TPFULL::" + JSON.stringify(out));
