const EventEmitter = require('../util/EventEmitter');
const Collection = require('../util/Collection');
const Resolver = require('../util/Resolver');

const ClientWebsocket = require('./websocket/ClientWebsocket');

const Message = require('../structures/Message');

/** 
 * The client class. Used to interact to the Discord API, receive events data, and start structuring your bot.
 * @extends {EventEmitter}
*/

class Client extends EventEmitter {
  /**
   * @param {ClientOptions} [options={}] All the options for the client.
   */
  
  constructor(options = {}) {
    super();
    
    /**
     * The client options.
     * @type {ClientOptions}
     */
    
    this.options = Object.assign({
      shardCount: 1,
      token: null,
      mobile: false,
      ws: {}
    }, options);
    
    /** 
     * How many client shards are ready.
     * @type {Number}
     */
  
    this.shardsReadyCount = 0;
    
    /**
     * True if all client shards are not ready, false if not.
     * @type {Boolean}
     */
    
    this.ready = false;
    
    /**
     * When all the client shards were ready.
     * @type {Date}
     */
    
    this.readyAt = null;
    
    /** 
     * The timestamp when the client shards were ready.
     * @type {Number}
     */
    
    this.readyTimestamp = 0;
    
    /**
     * The client guilds/servers.
     * @type {Collection}
     */
    
    this.guilds = new Collection();
  
  }
  
  /**
   * How many time the client was active.
   * @type {Number}
   * @readonly
  */
  
  get uptime() {
    return this.readyTimestamp - Date.now();
  }
  
  /**
   * Creates a message in the provided channel.
   * @param {ChannelResolvable} [channelID=''] The channel to creage the message.
   * @param {MessageResolvable} [content={}]  The message content.
   * @returns {Promise<Message|Message[]>}
   * @exmaple
   * // Send a message to a channel;
   * 
   * client.createMessage('866404195401596938', { content: 'Hello, world! '})
  */
  
  createMessage(channelID, content) {
    
    return new Promise(resolve => {
      Client.request(this, 'post', `channels/${channelID}/messages`, content).then(m => resolve(m));
    });
    
  }
  
  /** 
  * Connects the client to the Discord Gateaway and initializes the client.
  * @param {TokenResolvable} The client token.
  * @returns {Promise<string>} The token used.
  * @example
  * client.login(process.env.DISCORD_TOKEN || 'Your_bot_token');
  */
  
  async connect(token = this.options.token) {
   this.ws = new ClientWebsocket(this);
   
   token = Resolver.resolveClientToken(token);
    
    await this.ws.connect(token);
    
    return token;
  }
  
}

Client.request = require('../API/request');

module.exports = Client;