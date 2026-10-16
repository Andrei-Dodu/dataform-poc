});
module.exports = JSON.stringify({
  f: (typeof f), a: (typeof a), d: (typeof d), o: (typeof o),
  f_keys: (typeof f === "object" && f && f.keys ? JSON.stringify(Array.from(f.keys()).slice(0,12)) : "n/a")
});
(function(){
