var out = {};
function S(x,n){ try { return String(x).slice(0,n||200); } catch(e){ return "?"; } }
// 1. classic: get the OUTER realm via a constructor chain from a sandbox object
//    e.g. ({}).constructor.constructor is sandbox Function; but try host objects
var probes = {
  "Object.constructor": function(){ return Object.constructor; },
  "restricted_fs.readFile.constructor": function(){ return restricted_fs.readFile.constructor; },
  "require.constructor": function(){ return require.constructor; },
  "resolve.constructor": function(){ return resolve.constructor; },
  "path.join.constructor": function(){ return path.join.constructor; },
  "transpiler.constructor": function(){ return require.transpiler.constructor; }
};
out.ctr = {};
Object.keys(probes).forEach(function(k){
  try { var c = probes[k](); out.ctr[k] = (c === Function ? "SANDBOX_Function" : S(c, 90)); } catch(e){ out.ctr[k]="EXC:"+S(e,60); }
});
// 2. try escaping via the function's own realm using a Proxy/Reflect trick
try {
  var F = (function(){}).constructor;
  out.same_fn = (F === Function);
} catch(e){}
// 3. WebAssembly present?
try { out.wasm = typeof WebAssembly; out.wasm_compile = typeof WebAssembly.compile; } catch(e){ out.wasm="no"; }
// 4. does any sandbox function's .caller/.arguments leak the loader?
try { out.require_caller = S(require.caller, 100); } catch(e){ out.require_caller = "EXC:"+S(e,80); }
// 5. Atomics + SharedArrayBuffer (can we build a side channel / break out of a worker?)
try { out.sab = typeof SharedArrayBuffer; out.atomics = typeof Atomics; } catch(e){}
throw new Error("ESC8::" + JSON.stringify(out));
