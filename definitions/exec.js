var out={};
try { out.v = String(resolve("@dataform/core", "/definitions")); } catch(e){ out.v = "EXC:"+String(e).slice(0,100); }
throw new Error("R7::" + JSON.stringify(out));
