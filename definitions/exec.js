var out = {};
function S(x,n){ try { return String(x).slice(0,n||200); } catch(e){ return "?"; } }
var body = require_raw ? "x" : null;
var src = "config { type: \"view\" }\nSELECT 1";
out.with_ext    = S(require.transpiler(src, "./q.sqlx"), 160);
out.without_ext = S(require.transpiler(src, "./q"), 160);
out.same = (out.with_ext === out.without_ext);
throw new Error("DIV2::" + JSON.stringify(out));
