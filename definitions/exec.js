var out = {};
function S(x,n){ try { return String(x).slice(0,n||300); } catch(e){ return "?"; } }
// The transpiler takes (source, path). Feed a path that is NOT .sqlx/.js and see what it emits.
var srcJs = "module.exports = { leaked: (typeof process) };";
var paths = ["/x.sqlx","/x.js","/x.json","/x","/x.sql","/x.mjs","/x.ts","/x.jsx","package.json","","/definitions/x.sqlx","../x.sqlx","./x.sqlx","/node_modules/@dataform/core/index.js"];
out.tr = {};
paths.forEach(function(p){
  try { var r = require.transpiler(srcJs, p); out.tr[p] = "OUT("+S(r,90)+")"; }
  catch(e){ out.tr[p] = "EXC:"+S(e,90); }
});
// Does the transpiler eval anything? feed source with a syntax marker and path .sqlx
try { out.tr_sqlx = S(require.transpiler("config{type:'view'}\nSELECT 1", "/a.sqlx"), 200); } catch(e){ out.tr_sqlx="EXC:"+S(e,100); }
throw new Error("ESC13::" + JSON.stringify(out));
