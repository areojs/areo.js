"use strict";

var browser = typeof window !== 'undefined';

const EventEmitter = require('../../util/EventEmitter');
const { gateawayURL, gateawayVersion, gateawayEncoding, DefaultClientIntents } = require('../../util/Constants');

const TimerManager = require('../../managers/TimerManager');

const ClientUser = require('../../structures/ClientUser');
const Message = require('../../structures/Message');
const Guild = require('../../structures/Guild');

let WebSocket = browser ? (()=>{
  throw new Error('Areo.js is not compatible with browsers. try using nodeJS runtime.');
})() : require('ws');

/** 
 * The class for creating a client shard.
 * @extends {EventEmitter}
 */

class ClientShard extends EventEmitter {
  constructor(id, clientWebsocket) {
    super();
    
    /**
     * The shard id.
     * @type {Number}
     */
    
    this.id = id;
    
    /** 
     * The gateaway url .
     * @type {String}
     */
    
    this.gateawayURL = `${gateawayURL}?v=${gateawayVersion}&encoding=${gateawayEncoding}`;
    
    /**
     * The client websocket manager.
     * @type {ClientWebsocket}
     */
    
    this.clientWebsocket = clientWebsocket;
    
    /**
     * The client.
     * @type {Client}
     */
    
    this.client = this.clientWebsocket.client;
    
    /** 
     * The "websocket client". Null if the shard was not called with Shard.connect()
     * @type {ws|WebSocket}
    */
    
    this.ws = null;
    
    /** 
     * The shard timer manager.
     * @type {TimerManager}
    */
    
    this.timers = new TimerManager();
    
    /** 
     * The client ping. -1 if the shard dont received a heartbeat ack.
     * @type {Number}
    */
    
    this.ping = -1;
    
    /** 
     * When the client send a heartbeat.
     * @type {Number|Date}
    */
    
    this.lastHeartBeatSent = 0;
    
  }
  
  /**
   * Connects the shard to the discord gateaway.
   * @returns {Promise<string>} the client token.
   */
  
  async connect() {
    
    this.ws = new WebSocket(this.gateawayURL);
    
    this.ws.on('open', () => this.onOpen.call(this));
    
    return this.client.token;
    
  }
  
  /**
   * Triggers on websocket open.
   * @returns {ws|WebSocket}
   */
  
  onOpen() {
  
    this.identify();
    
    this.ws.on("message", data => this.onMessage.call(this, data));
    
    return this.ws;
    
  }
  
  /**
   * Debugs a message to the client.
   * @param {String} the message to debug.
   * @returns {String} the message used.
   */
  
  debug(str) {
    this.client.emit('debug', str);
    
    return str;
  }
  
  /**
   * Triggers on websocket message.
   * @param {String|JsonObject} the message received from the websocket.
   * @returns {Client} the client.
   */
  
  onMessage(data = "{}") {
    data = JSON.parse(data);
    
    const {op,d,s,t} = data;
    
    this.clientWebsocket.emit('message', op, d, s, t);
    
    switch(t) {
      case 'READY':
        
        if(!this.client.user) this.client.user = new ClientUser(this.client, d.user);
        
        if(!this.client.id) this.client.id = this.client.user.id;
        
        this.client.shardsReadyCount++;
        
        
        if(this.client.shardsReadyCount >= this.client.options.shardCount) {
             this.client.ready = true;
             
             this.client.readyAt = new Date();
             this.client.readyTimestamp = Date.now();
             
             this.client.emit('ready');
        }
       
        this.client.emit('shardReady', this.ID);
        break;
        
      case 'MESSAGE_CREATE':
         const message = new Message(this.client, d);
         
         this.client.emit('messageCreate', message);
         
         break;
         
      case 'MESSAGE_UPDATE':
         const messageUpdated = new Message(this.client, d);
         
         this.client.emit('messageUpdate', messageUpdated);
        break;
        
      case 'GUILD_CREATE':
        const guildCreated = new Guild(d, this.id, this.client);
        
        this.client.guilds.set(guildCreated.id, guildCreated);
        
        break;
        
    }
    
    switch(op) {
      case 10:
       this.timers.setInterval("heartbeat", this.heartbeat.bind(this), d.heartbeat_interval);
       
       break;
       
       case 11:
         this.ping = Date.now() - (this.lastHeartBeatSent === 0 ? (Date.now() + 1) : this.lastHeartBeatSent);
    }
    
    return this.client;
  }
  
  /**
   * Sends the payload to the websocket.
   * @returns {Object}
   */
  
  identify() {
    
   const payload = {
      op: 2,
      d: Object.assign(this.client.options.ws, {
        token: this.client.token,
        intents: DefaultClientIntents,
        shard: [this.id, this.client.options.shardCount],
        properties: {
          $os: 'areo.js',
          $browser: this.client.options.mobile ? 'Discord iOS' : 'areo.js',
          $device: 'areo.js'
        }
      })
    };
    
    this.ws.send(JSON.stringify(payload));
    
    return payload;

  }
  
  /**
   * Sends a heartbeat to the websocket.
   * @returns {Object}
   */
  
  heartbeat() {
    this.debug("Heartbeat sent.");
    
    const heartBeatPayload = {
      op: 1,
      d: null
    };
    
    this.lastHeartBeatSent = Date.now();
    
    this.ws.send(JSON.stringify(heartBeatPayload));
    
    return heartBeatPayload;
  }
}

module.exports = ClientShard;