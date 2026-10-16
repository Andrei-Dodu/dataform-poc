var out={};
function S(x,n){ try { return String(x).slice(0,n||200); } catch(e){ return "?"; } }
// vm.compileModule(path, source): what are the REAL params? Try calling with 1 arg, 2 args, weird args
try { out.cm_1 = S(vm.compileModule("/x.js"), 60); } catch(e){ out.cm_1="EXC:"+S(e,80); }
try { var f = vm.compileModule("/y.js", "((module,exports)=>{module.exports=123})"); var m={exports:{}}; f(m,m.exports); out.cm_2 = S(m.exports, 40); } catch(e){ out.cm_2="EXC:"+S(e,100); }
// Does the source string get wrapped by vm.compileModule itself, or is my 2nd arg used verbatim?
try { var f2 = vm.compileModule("/z.js", "module.exports = 'RAW-NO-WRAP'"); var m2={exports:{}}; f2(m2, m2.exports); out.cm_raw = S(m2.exports, 60); } catch(e){ out.cm_raw="EXC:"+S(e,100); }
// what does it do with a path that doesn't exist?
try { var f3 = vm.compileModule("/nonexistent-xyz.js", "module.exports=1"); out.cm_nopath = "OK " + S(typeof f3, 20); } catch(e){ out.cm_nopath="EXC:"+S(e,80); }
throw new Error("VM::" + JSON.stringify(out));
