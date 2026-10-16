var out={};
// reproduce the loop logic WITHOUT calling resolve, to confirm the mechanism
function myDirname(a){ return a.includes("/") ? (a.lastIndexOf("/")===0 ? "/" : a.substring(0,a.lastIndexOf("/"))) : ""; }
var e = "/definitions"; var n = 0;
while (e !== "" && n < 12) { e = myDirname(e); n++; out["step"+n] = e; }
out.final = e; out.steps = n;
throw new Error("LOOP::" + JSON.stringify(out));
