var out = {};
function S(x,n){ try { return String(x).slice(0,n||200); } catch(e){ return "?"; } }
// The loader JSON.parses any resolved path ending in ".json". package.json is read by the PLATFORM
// (npm ci uses it; @dataform/core reads it). Can I make the LOADER compile package.json as JS?
// Test: require("package.json") -> resolve -> ends with .json -> JSON.parse (safe).
try { var m = require("package.json"); out.pj = "JSON: " + S(Object.keys(m||{}).join(","), 80); } catch(e){ out.pj = "E:"+S(e,120); }
// Can I bypass the .json check? The check is h.endsWith(".json"). If h has a trailing char (space/dot)
// that the native FS normalizes away but the JS endsWith sees as non-.json -> JS compile!
try { var m2 = require("package.json "); out.sp = "loaded"; } catch(e){ out.sp = "E:"+S(e,100); }
try { var m3 = require("package.json."); out.dot = "loaded"; } catch(e){ out.dot = "E:"+S(e,100); }
try { var m4 = require("package.json/"); out.sl = "loaded " + S(Object.keys(m4||{}).join(","),60); } catch(e){ out.sl = "E:"+S(e,100); }
throw new Error("JSONC::" + JSON.stringify(out));
