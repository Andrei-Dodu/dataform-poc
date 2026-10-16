var out = {};
function S(x,n){ try { return String(x).slice(0,n||200); } catch(e){ return "?"; } }
// base that shrinks to "" (relative, not absolute): "/definitions" -> "/" -> "/" (loop)
// Use a RELATIVE base "./definitions" -> dirname chain "./definitions" -> "." -> "" (terminates!)
try { out.r1 = "->" + S(resolve("@dataform/core", "./definitions"), 120); } catch(e){ out.r1 = "E:"+S(e,130); }
try { out.r2 = "->" + S(resolve("package.json", "./definitions"), 120); } catch(e){ out.r2 = "E:"+S(e,130); }
throw new Error("SH2::" + JSON.stringify(out));
