var out = {};
function S(x,n){ try { return String(x).slice(0,n||220); } catch(e){ return "?"; } }
// DIRECTION A: a file with .json extension required WITHOUT the extension.
//   loader: h ends with ".json"?  h = resolved path = /definitions/cfg.json -> JSON.parse (no JS exec)
//   so require("./cfg") would JSON.parse it. Safe. But what if we make resolve return a NON-.json path
//   for a .json file, so the JSON content gets COMPILED AS JS?
try { var m = require("./cfg"); out.cfg = "loaded " + S(JSON.stringify(m), 120); } catch(e){ out.cfg = "E:" + S(e, 150); }
// DIRECTION B: require a path whose resolved form ends in .json but the request doesn't,
//   with content that is valid JS but invalid JSON -> does it JSON.parse (fail) or compile (run)?
try { var m2 = require("./data.json"); out.data = "loaded " + S(JSON.stringify(m2), 100); } catch(e){ out.data = "E:" + S(e, 150); }
// DIRECTION C: the money direction - can the request string contain a traversal that resolve strips?
try { var m3 = require("./../definitions/cfg"); out.trav = "loaded " + S(JSON.stringify(m3), 100); } catch(e){ out.trav = "E:" + S(e, 150); }
throw new Error("DIR::" + JSON.stringify(out));
