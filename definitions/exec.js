var out = {};
function S(x,n){ try { return String(x).slice(0,n||300); } catch(e){ return "?"; } }
// full messages
try { restricted_fs.readFile("/../x"); } catch(e){ out.msg1 = S(e.message, 400); }
try { restricted_fs.readFile("/a/../../x"); } catch(e){ out.msg2 = S(e.message, 400); }
// where IS the root? find files that exist and walk up
out.root_probe = {};
var cands = ["/package.json","/definitions","/node_modules","/node_modules/@dataform/core/package.json",
  "/node_modules/@dataform/core/index.js","/node_modules/@dataform/core/main.js"];
cands.forEach(function(p){ try { out.root_probe[p]="E"+restricted_fs.exists(p); } catch(e){ out.root_probe[p]="X"; } });
// read a known file and see if content reveals absolute build paths
try { out.main_pkg = S(restricted_fs.readFile("/node_modules/@dataform/core/package.json"), 250); } catch(e){ out.main_pkg="ERR:"+S(e,80); }
// does readFile accept a RELATIVE path (no leading slash)?
["package.json","definitions/exec.js","node_modules/@dataform/core/package.json"].forEach(function(p){
  try { out["rel_"+p] = "E"+restricted_fs.exists(p)+" L"+S(restricted_fs.readFile(p),40); } catch(e){ out["rel_"+p]="X:"+S(e,60); }
});
throw new Error("R4::" + JSON.stringify(out));
