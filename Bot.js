const EventEmitter = require('@areojs/events');

class Bot extends EventEmitter {
  constructor(token, options) {
    
    Object.defineProperty(this, 'token', {
      value: token,
      enumerable: false,
      configurable: true,
      writable: true
    });
    
  }
}

module.exports = Bot;