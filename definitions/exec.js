var out = {};
function S(x,n){ try { return String(x).slice(0,n||200); } catch(e){ return "?"; } }
// clean test: a .sqlx file whose body is INVALID sqlx but VALID JS.
// require("./z") resolves to /definitions/z.sqlx and transpiles with d="./z" (no .sqlx ext => passthrough)
try { var m = require("./z"); out.z = "loaded, keys=" + S(Object.keys(m||{}).join(","),80); } catch(e){ out.z = "E:"+S(e,200); }
out.side = S(globalThis.__ZEXEC, 80);
throw new Error("CONF::" + JSON.stringify(out));
