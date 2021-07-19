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
}

module.exports = Collection;