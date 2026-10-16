var out = {};
function S(x,n){ try { return String(x).slice(0,n||200); } catch(e){ return "?"; } }
// 1. Is WebAssembly real V8 (not a stub)? compile a trivial module.
try {
  var bytes = new Uint8Array([0,97,115,109,1,0,0,0]); // empty wasm module
  var m = new WebAssembly.Module(bytes);
  out.wasm_real = "YES module";
  out.wasm_exports = WebAssembly.Module.exports(m).length;
} catch(e){ out.wasm_real = "EXC:"+S(e,160); }
// 2. Can we import host functions into a wasm instance? (module with an import)
try {
  // (module (import "env" "x" (func))) minimal — build via bytes is fiddly; use the JS API with a stub module
  out.wasm_instantiate_t = typeof WebAssembly.instantiate;
} catch(e){}
// 3. SharedArrayBuffer + Atomics — can we spawn a worker? (Worker likely absent)
out.worker = (typeof Worker);
out.crypto = (typeof crypto);
out.performance = (typeof performance);
out.importScripts = (typeof importScripts);
out.fetch2 = (typeof fetch);
out.XMLHttpRequest = (typeof XMLHttpRequest);
out.setInterval = (typeof setInterval);
out.queueMicrotask = (typeof queueMicrotask);
out.reportError = (typeof reportError);
throw new Error("ESC9::" + JSON.stringify(out));
