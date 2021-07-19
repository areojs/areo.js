class Base {
  constructor(client = null) {
    
   Object.defineProperty(this, 'client', { value: client });
   
  }
}

module.exports = Base;