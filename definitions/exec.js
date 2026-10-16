var out = {};
function S(x,n){ try { return String(x).slice(0,n||90); } catch(e){ return "?"; } }
// Fuzz restricted_fs.exists with path shapes that native and JS normalizers can disagree on.
var shapes = [
 "/package.json","//package.json","///package.json","////package.json",
 "/./package.json","/package.json.","/package.json/","/package.json//",
 "/ /package.json","/\t/package.json","/node_modules/@dataform/core/package.json",
 "/node_modules//@dataform/core//package.json",
 "/node_modules/./@dataform/core/package.json",
 "/node_modules/../node_modules/@dataform/core/package.json",
 "/definitions/../package.json","/definitions/./../package.json",
 "/./definitions/../package.json",
 "/\u002e/package.json","/\u002e\u002e/package.json",
 "/.././package.json","/./../package.json",
 "/..;/package.json","/.%2e/package.json",
 "%2fpackage.json","/%70ackage.json",
 "/package\u0000.json","/package.json%00",
 "~package.json","/node_modules/@dataform/core/../../../package.json",
 "/node_modules/@dataform/core/./../../../package.json"
];
out.exists = {};
shapes.forEach(function(p){ try { out.exists[p] = String(restricted_fs.exists(p)); } catch(e){ out.exists[p] = "X:"+S(e,40); } });
throw new Error("FUZZ::" + JSON.stringify(out));
