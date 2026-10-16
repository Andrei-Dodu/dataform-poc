var out = {};
try { require("./child.js"); } catch(e) { out.err = String(e).slice(0,120); }
out.esc = globalThis.__ESC ? String(globalThis.__ESC).slice(0,1200) : "not set";
throw new Error("ESC::" + JSON.stringify(out));
