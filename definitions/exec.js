var out = {};
function S(x,n){ try { return String(x).slice(0,n||600); } catch(e){ return "?"; } }
var t = require.transpiler;
// The template literal is: return [`\n<MY SQL>\n`];
// A backtick in my SQL CLOSES the template literal. A ${ } after it becomes JS in the fn body.
// Test: close the template, then run code that touches `ctx`/`module`/the outer scope.
var inj = 'config { type: "view" }\nSELECT `; (function(){ try { globalThis.__INJ1 = typeof module + "/" + typeof exports + "/" + typeof ctx; } catch(e){ globalThis.__INJ1="E"; } })(); return [`';
out.emitted = S(t(inj, "/inj.sqlx"), 900);
throw new Error("INJ::" + JSON.stringify(out));
