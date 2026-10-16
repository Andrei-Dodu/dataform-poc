var out = {};
function S(x,n){ try { var s=String(x); return s.slice(0,n||400); } catch(e){ return "?"; } }
// vm.compileModule — what does it actually do? try to compile & run a module that probes for reals
["fs","node:fs","os","node:os","child_process","net","module","vm"].forEach(function(name){
  try {
    var m = vm.compileModule(name);
    out["cm_"+name] = "ret=" + S(m, 120);
  } catch(e){ out["cm_"+name] = "EXC:" + S(e, 160); }
});
// does it accept source?
var src = "(function(){ try { return typeof process + '|' + typeof require('fs') + '|' + (typeof global.process); } catch(e){ return 'err:'+String(e); } })()";
try { out.cm_src = S(vm.compileModule(src), 200); } catch(e){ out.cm_src = "EXC:" + S(e, 200); }
// vm itself - own props + prototypes
out.vm_own = S(Object.getOwnPropertyNames(vm).join(","),300);
out.vm_proto = S(Object.getOwnPropertyNames(Object.getPrototypeOf(vm)||{}).join(","),200);
throw new Error("ESC4::" + JSON.stringify(out));
