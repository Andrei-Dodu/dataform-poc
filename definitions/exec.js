var out = {};
function S(x,n){ try { return String(x).slice(0,n||100); } catch(e){ return "?"; } }
var Z = "\u200B";
// The divergence: JS normalize filters segments with !!h (drops zero-width). Native keeps them as names.
// So: "/a/<ZWSP>/../b" -> JS: /a/b  (ZWSP dropped, ".." pops "a")  ; native: keeps ZWSP, ".." pops ZWSP -> /a/b too?
// We need a case where JS pops MORE than native (JS inside, native still has a ".." unresolved => error),
// OR native pops MORE than JS (native outside while JS inside).
// Key: JS normalize on ABSOLUTE path ignores overflow count c. Native may reject on overflow.
// Try: a path where JS-normalize = a VALID inside file, but native treats a ZWSP-named dir as real
// and then ".." climbs differently.
var cases = {};
[
  ["A", "/" + Z + "/../package.json"],
  ["B", "/" + Z + "/../../package.json"],
  ["C", "/definitions/" + Z + "/../../package.json"],
  ["D", "/" + Z + Z + Z + "/../../../package.json"],
  ["E", "/definitions/" + Z + "/../package.json"],
  ["F", "/node_modules/@dataform/core/" + Z + "/../../../package.json"]
].forEach(function(c){
  var p=c[1];
  var js; try { js = path.normalize(p); } catch(e){ js="EXC"; }
  var ex; try { ex = String(restricted_fs.exists(p)); } catch(e){ ex="X:"+S(e,40); }
  var rd; try { var r=restricted_fs.readFile(p); rd="READ:"+S(r,30); } catch(e){ rd="no:"+S(e,50); }
  cases[c[0]] = { js: S(js,60), ex: ex, rd: rd };
});
throw new Error("DIFF3::" + JSON.stringify(cases));
