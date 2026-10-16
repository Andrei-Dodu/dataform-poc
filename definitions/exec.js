var out = {};
function S(x,n){ try { return String(x).slice(0,n||220); } catch(e){ return "?"; } }
var src = "config { type: \"view\" }\nSELECT 1";
out.with_ext    = S(require.transpiler(src, "./q.sqlx"), 200);
out.without_ext = S(require.transpiler(src, "./q"), 200);
out.identical   = (out.with_ext === out.without_ext);
throw new Error("DIV2::" + JSON.stringify(out));
