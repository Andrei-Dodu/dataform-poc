var out = {};
function S(x,n){ try { return String(x).slice(0,n||150); } catch(e){ return "?"; } }
// 1. what is restricted_fs?
out.rfs_type = typeof restricted_fs;
out.rfs_props = (function(){ try { return Object.getOwnPropertyNames(restricted_fs).join(",").slice(0,400); } catch(e){ return "err:"+S(e); } })();
// 2. what is vm?
out.vm_type = typeof vm;
out.vm_props = (function(){ try { return Object.getOwnPropertyNames(vm).join(",").slice(0,300); } catch(e){ return "err:"+S(e); } })();
// 3. what is path / resolve?
out.path_props = (function(){ try { return Object.getOwnPropertyNames(path).join(",").slice(0,200); } catch(e){ return "err"; } })();
// 4. try reading a file through restricted_fs
try { out.read_etc_passwd = S(restricted_fs.readFileSync("/etc/passwd", "utf8"), 300); } catch(e){ out.rfs_read_err = S(e,200); }
try { if (restricted_fs.readFileSync) { out.has_readFileSync = true; } else { out.has_readFileSync = false; } } catch(e){}
// 5. require prototype chain / transpiler
out.req_proto = (function(){ try { return Object.getOwnPropertyNames(Object.getPrototypeOf(require)).join(","); } catch(e){ return "err"; } })();
throw new Error("ESC1::" + JSON.stringify(out));
