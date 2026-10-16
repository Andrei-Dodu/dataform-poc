var out = {};
try { require("./probe.sqlx"); } catch(e){ out.err = String(e).slice(0,200); }
out.ctx = globalThis.__CTX || "not set";
throw new Error("CTX::" + JSON.stringify(out));
