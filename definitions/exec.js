var out = {};
function S(x,n){ try { return String(x).slice(0,n||700); } catch(e){ return "?"; } }
var t = require.transpiler;
// get the FULL emission for a js{} block so I can see exactly where my content lands
var full = t('config { type: "view" }\njs { MARKER_START; var z = 1; MARKER_END }\nSELECT ${z}', "/x.sqlx");
out.full = String(full);
// where is my content relative to the function boundaries?
var s = String(full);
out.marker_pos = s.indexOf("MARKER_START");
out.tail = S(s.slice(-600), 600);
throw new Error("EMIT::" + JSON.stringify(out));
