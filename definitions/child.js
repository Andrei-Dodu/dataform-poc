}) ;
// We are now executing in the LOADER's scope (outside the arrow wrapper).
module.exports = JSON.stringify({
  canSee_f: (typeof f),
  canSee_a: (typeof a),
  canSee_d: (typeof d),
  canSee_o: (typeof o),
  f_is_map: (typeof f === 'object' && f && typeof f.set === 'function'),
  f_size: (typeof f === 'object' && f && f.size !== undefined ? f.size : 'n/a'),
  cache_keys: (typeof f === 'object' && f && f.keys ? JSON.stringify(Array.from(f.keys()).slice(0,10)) : 'n/a')
});
/* 
