var out = {};
function S(x,n){ try { return String(x).slice(0,n||110); } catch(e){ return "?"; } }
var Z = "\u200B";
// The LOADER builds: h = resolve(d, dirname(current)); then restricted_fs.readFile(h).
// And path.join(e,b) for ./ requests. If path.join produces a string that native reads as something
// else (because native normalizes a segment JS keeps), the read diverges from the check.
// Test: does path.join/JS-normalize ever produce a path whose FILE DIFFERS from the raw string?
// Compare: readFile(raw) vs readFile(jsnorm(raw)) for the SAME raw -> if both succeed but on different files => escape.
var raw = "/node_modules/@dataform/core/" + Z + "/../package.json";   // native: reads /node_modules/@dataform/core/package.json? or /package.json?
var jsn = path.normalize(raw);
out.raw_read = (function(){ try { var r=restricted_fs.readFile(raw); return "len"+r.length+" head:"+S(r,60); } catch(e){ return "no:"+S(e,60); } })();
out.jsn_read = (function(){ try { var r=restricted_fs.readFile(jsn); return "len"+r.length+" head:"+S(r,60); } catch(e){ return "no:"+S(e,60); } })();
out.raw_vs_jsn = { raw:S(raw,70), jsn:S(jsn,70), same:(raw===jsn) };
// The real test: what file does the ZWSP segment resolve to? Compare with the two candidate files.
out.root_pkg = (function(){ try { return S(restricted_fs.readFile("/package.json"),50); } catch(e){ return "no"; } })();
out.core_pkg = (function(){ try { return S(restricted_fs.readFile("/node_modules/@dataform/core/package.json"),50); } catch(e){ return "no"; } })();
throw new Error("DIFF4::" + JSON.stringify(out));
