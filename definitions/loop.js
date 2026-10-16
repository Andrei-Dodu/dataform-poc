var out = {};
// The loader computes base = path.dirname(require-argument-path). If a module at the ROOT requires
// something relative, base = "/" -> resolve hits the non-terminating walk.
// Test: can I make the loader call resolve with base "/" via a relative require from a root file?
try { out.r = String(require("./definitions/child.js")); } catch(e){ out.r="EXC:"+String(e).slice(0,60); }
throw new Error("BASE::" + JSON.stringify(out));
