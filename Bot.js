
const EventEmitter = require('@areojs/events');
const { payload } = require('@areojs/constants');
const { Message } = require('@areojs/structures');

const WebSocket = require('ws');
const axios = require('axios');

class Bot extends EventEmitter {
  constructor(token, options) {
    super();
    
    Object.defineProperty(this, 'token', {
      value: token,
      enumerable: false,
      configurable: true,
      writable: true
    });
    
    if(!this.token.startsWith('Bot') && options.tokenType == 'bot') {
      this.token = 'Bot ' + this.token;
    }
    
    this._intervals = new Map();
    this._timeouts = new Map();

    this.readyAt = 0;
    this.mobile = false;
    
    if(options.mobile) {
      
      payload.properties.$browser = "Discord iOS";
      this.mobile = true;
      
    }
  }

  get uptime() {
    return Date.now() - this.readyAt;
  }
  
  async connect() {
    this.ws = new WebSocket('wss://gateway.discord.gg/?v=9&encoding=json');
    
    super.emit('debug', 'connecting to the gateaway.');
    
    this.ws.on('open', () => {
      super.emit('open', this);

      super.emit('debug', 'sending the payload.');
      
      payload.d.token = this.token;
      
      this.ws.send(JSON.stringify(payload));
      
    });
    

    this.ws.on('message', Data => {
       const data = JSON.parse(Data);
       const { op, t, d } = data;
       
       switch(op) {
         case 10:
           this._intervals.set('HEARTBEAT', setInterval(()=> {
           this.heartbeat();
           }, d.heartbeat_interval));
           break;
       }
       
       switch(t) {
          case 'MESSAGE_CREATE':
          
          super.emit('message', new Message(d));
          break;
          
          case 'READY':
          
          super.emit('ready', this);
          
          this.readyAt = Date.now();
          
          break;
       }
    });
    
    return this.token;
   
  }
  
  heartbeat() {
     this.ws.send(JSON.stringify({op:2,d:null}));

     super.emit('heartbeat', this);
  }
                  
  destroy() {
       
     let intervals = Array.from(this._intervals);
     let timeouts = Array.from(this._timeouts);
       
     for(let interval of intervals) {
        clearInterval(interval[1]);
        this._intervals.delete(interval[0]);
     }
       
     for(let timeout of timeouts) {
        clearTimeout(timeout[1]);
        this._timeouts.delete(interval[0]);
     }

     super.emit('debug', 'client destroyed.');
       
     return null;
  }
  
  async createMessage(channelID, data) {
    return this.DiscordRequest('POST', `channels/${channelID}/messages`, data);
  }
  
  DiscordRequest(method, path, data, config = {}) {
    let APIurl = 'https://discord.com/api/v9/';
    
    return axios[method.toLowerCase()](APIurl+path, data, {
      headers: {
        Authorization: this.token
      }
    });
    
  }
}
