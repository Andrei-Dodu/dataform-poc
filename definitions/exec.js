var out = {};
function S(x,n){ try { return String(x).slice(0,n||400); } catch(e){ return "?"; } }
var full = String(require.transpiler);
// Print the WHOLE transpiler so I can audit every branch for a splice
out.part1 = full.slice(0, 1100);
out.part2 = full.slice(1100, 2200);
out.part3 = full.slice(2200);
throw new Error("FULL::" + JSON.stringify(out));
