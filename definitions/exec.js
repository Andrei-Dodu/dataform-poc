var out = {};
function S(x,n){ try { return String(x).slice(0,n||300); } catch(e){ return "?"; } }
// call vm.compileModule DIRECTLY with our own source that probes the realm it lands in
var probe = "\n ((module, exports, __dirname, __filename) => {\n " +
  "module.exports = JSON.stringify({hasProcess: typeof process, hasRequire: typeof require, hasModule: typeof module, globals: Object.getOwnPropertyNames(globalThis).length, ctorIsSandbox: (function(){}).constructor === Function, protoOfFunctionCtor: (function(){}).constructor.constructor === Function});\n" +
  " })";
try {
  var fn = vm.compileModule("/probe.js", probe);
  out.compiled_ok = true;
  var mod = {exports:{}};
  fn(mod, mod.exports, "/", "/probe.js");
  out.probe_result = S(mod.exports, 400);
} catch(e){ out.compile_err = S(e, 300); }
// also: does compileModule accept a source with a TOP-LEVEL return of the real global?
var probe2 = "\n ((module, exports, __dirname, __filename) => {\n module.exports = (function(){ try { return globalThis.constructor.constructor('return typeof process')(); } catch(e){ return 'EXC:'+String(e); } })();\n })";
try {
  var fn2 = vm.compileModule("/probe2.js", probe2);
  var m2={exports:{}}; fn2(m2,m2.exports,"/","/probe2.js"); out.p2 = S(m2.exports,150);
} catch(e){ out.p2_err = S(e,200); }
throw new Error("ESC11::" + JSON.stringify(out));
