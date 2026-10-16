var out = {};
function S(x,n){ try { return String(x).slice(0,n||180); } catch(e){ return "?"; } }
// probe path.join/normalize/dirname results directly
var j = path.join;
out.join_tests = {
  "join('/','/etc/passwd')": S(j("/","/etc/passwd"),60),
  "join('/','../../etc/passwd')": S(j("/","../../etc/passwd"),60),
  "join('/definitions','../../../etc/passwd')": S(j("/definitions","../../../etc/passwd"),80),
  "join('.','..')": S(j(".",".."),30),
  "join('/','.','.')": S(j("/",".","."),30),
  "join('','..')": S(j("",".."),30)
};
out.norm_tests = {
  "norm('/../../etc/passwd')": S(path.normalize("/../../etc/passwd"),60),
  "norm('/a/../../../../etc/passwd')": S(path.normalize("/a/../../../../etc/passwd"),60),
  "norm('//etc/passwd')": S(path.normalize("//etc/passwd"),60),
  "norm('/./../../x')": S(path.normalize("/./../../x"),60)
};
out.dir_tests = {
  "dirname('/')": S(path.dirname("/"),20),
  "dirname('/a')": S(path.dirname("/a"),20),
  "dirname('/a/')": S(path.dirname("/a/"),20),
  "dirname('//')": S(path.dirname("//"),20)
};
// THE TEST: does restricted_fs.exists see through un-normalized paths?
out.fs_tests = {};
var probes = ["/etc/passwd","//etc/passwd","/./etc/passwd","/../etc/passwd","/a/../../etc/passwd",
  "/definitions/../../../etc/passwd","..//../etc/passwd","/node_modules/../../../../etc/passwd",
  "/\u002e\u002e/\u002e\u002e/etc/passwd","/%2e%2e/%2e%2e/etc/passwd","/%2e%2e%2f%2e%2e%2fetc/passwd"];
probes.forEach(function(p){
  try { out.fs_tests[p] = "exists="+restricted_fs.exists(p); } catch(e){ out.fs_tests[p]="X:"+S(e,50); }
  try { out.fs_tests[p] += " read="+S(restricted_fs.readFile(p),30); } catch(e){ out.fs_tests[p]+=" readERR:"+S(e,50); }
});
throw new Error("R3::" + JSON.stringify(out));
