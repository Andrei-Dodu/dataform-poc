var out={};
try { out.r = String(resolve("@dataform/core", "/definitions")); } catch(e){ out.r = "EXC:"+String(e).slice(0,60); }
throw new Error("LOOPREPRO::" + JSON.stringify(out));
