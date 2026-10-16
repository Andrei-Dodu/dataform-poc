});
globalThis.__ESC = JSON.stringify({
  f: (typeof f), a: (typeof a), d: (typeof d), o: (typeof o), path: (typeof path),
  rfs: (typeof restricted_fs), vm: (typeof vm), resolve: (typeof resolve),
  f_keys: (typeof f === "object" && f && f.keys ? Array.from(f.keys()).slice(0,15) : "n/a"),
  a_src: (typeof a === "function" ? String(a).slice(0,300) : "n/a"),
  d_src: (typeof d === "function" ? String(d).slice(0,200) : "n/a"),
  c_src: (typeof c === "function" ? String(c).slice(0,200) : "n/a"),
  o_src: (typeof o === "object" && o ? Object.keys(o).slice(0,20) : "n/a")
});
(function(){
