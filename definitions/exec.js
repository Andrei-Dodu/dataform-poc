var out = {};
function S(x,n){ try { return String(x).slice(0,n||200); } catch(e){ return "?"; } }
// CONFIRM the primitive: does require("./a") execute a.sqlx CONTENT as JS (no transpile)?
// If yes, an attacker file with .sqlx extension gets run as raw JS when required without extension.
// and vice versa: a .js file required as "./a.sqlx"? -> resolve falls back, cache keyed by resolved.
delete require; // n/a
try { var m = require("./a"); out.a = "keys:" + S(Object.keys(m||{}).join(","), 60) + " raw:" + S(m && m.default, 60) + " exported:" + S(m && m["__esModule"], 30); } catch(e){ out.a="E:"+S(e,120); }
// what exactly is the exported object? dump it
try { var m2 = require("./a.sqlx"); out.a2 = S(JSON.stringify(m2), 250); } catch(e){ out.a2="E:"+S(e,120); }
// the real test: does the .sqlx body run as JS? put a global side effect in it
try { var m3 = require("./sideeffect"); out.side = S(globalThis.__SIDEEFFECT, 60); } catch(e){ out.side="E:"+S(e,150); }
throw new Error("CONFUSE::" + JSON.stringify(out));
