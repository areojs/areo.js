const Collection = require('./Collection');

class EventEmitter {
  constructor() {
    this._events = new Collection();
  }
  
  on(t, e) {
    this._events.set(t, e);
  }
  
  emit(t, ...args) {
    let event = this._events.get(t);
    
    return event ? event.call(this, ...args) : undefined;
  }
}

module.exports = EventEmitter;