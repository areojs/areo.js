const EventEmitter = require('@areojs/events');
const { payload } = require('@areojs/constants');

const WebSocket = require('ws');

class Bot extends EventEmitter {
  constructor(token, options) {
    
    Object.defineProperty(this, 'token', {
      value: token,
      enumerable: false,
      configurable: true,
      writable: true
    });
    
  }
  
  async connect() {
    this.ws = new WebSocket('wss://gateway.discord.gg/?v=9&encoding=json');
    
    this.ws.on('open', () => {
      super.emit('open', this);
      
      payload.token = this.token;
      
      this.ws.send(JSON.stringify(payload))
    });
    
    return this.token;
  }
}

module.exports = Bot;