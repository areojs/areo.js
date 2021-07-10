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
    
    super.emit('debug', 'connecting to the gateaway.')

    this.ws.on('open', () => {
      super.emit('open', this);

      suoer.emit('debug', 'sending the payload.')
      
      payload.d.token = this.token;
      
      this.ws.send(JSON.stringify(payload))
    });
    
    this._intervals.set('HEARTBEAT', setInterval(()=> {
       this.heartbeat();
    }))

    this.ws.on('message', Data => {
       const data = JSON.parse(Data);
       const { op, t, d } = data;
       
       switch(t) {
          case 'MESSAGE_CREATE'
          console.log(d)
       }
    })
    
    return this.token;
   
  }
  
  heartbeat() {
     this.ws.send(JSON.stringify({op:2,d:null})

     super.emit('heartbeat', this);
  }
                  
  destroy() {
       
     let intervals = Array.from(this._intervals);
     let timeouts = Array.from(this._timeouts);
       
     for(let interval of intervals) {
        clearInterval(interval[1])
        this._intervals.delete(interval[0])
     }
       
     for(let timeout of timeouts) {
        clearTimeout(timeout[1]);
        this._timeouts.delete(interval[0]);
     }

     super.emit('debug', 'client destroyed.')
       
     return null;
  }
}

module.exports = Bot;
