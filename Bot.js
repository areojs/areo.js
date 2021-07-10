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
    
    this._intervals = new Map();
    this._timeouts = new Map();
    
  }
  
  async connect() {
    this.ws = new WebSocket('wss://gateway.discord.gg/?v=9&encoding=json');
    
    this.ws.on('open', () => {
      super.emit('open', this);
      
      payload.d.token = this.token;
      
      this.ws.send(JSON.stringify(payload))
    });
    
    return this.token;
    
    this._intervals.set('HEARTBEAT', setInterval(()=> {
       this.heartbeat();
    }))
    
  }
  
  heartbeat() {
     this.ws.send(JSON.stringify({op:2,d:null})
  }
                  
  destroy() {
       
     this._intervals.clear();
     this._timeouts.clear();
       
  }
}

module.exports = Bot;
