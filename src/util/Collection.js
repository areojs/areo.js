class Collection extends Map {
  constructor(entries) {
    super(entries);
  }
  
  forEach(fn) {
    for(let [key, value] of this) {
      fn(value, key);
    }
    
    return null;
  }
  
  reduce(fn, accV) {
    let acc = accV ? accV : 0;
    
    for(const [k, v] of this) acc = fn.call(this, acc, v, k);
    
    return acc;
    
  }
}

module.exports = Collection;