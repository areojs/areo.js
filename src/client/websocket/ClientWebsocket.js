const EventEmitter = require('../../util/EventEmitter');

const Collection = require('../../util/Collection');
const Shard = require('./ClientShard');

/**
 * The websocket for the client. Manages all shards and the connection.
 * @extends {EventEmitter}
 */

class ClientWebsocket extends EventEmitter {
  
  /** 
   * @param {Client} [client={}] The client to manage the connection.
   */
  
  constructor(client) {
    super();
    
    /**
     * The client
     * @type {Client}
     */
    
    Object.defineProperty(this, 'client', { value: client });
    
    /**
     * The client shards.
     * @type {Collection}
     */
    
    this.shards = new Collection();
    
  }
  
  /** 
   * Makes a connection to the Discord Gateaway
   * @param {String} the client token.
   * @returns {Promise<string>} the token used.
  */
  
  async connect(token) {
    
    this.client.token = token;
    
    this.createShards();
    
    this.shards.forEach(async shard => {
      await shard.connect();
    });
    
    return token;
    
  }
  
  /** 
   * Creates all client shards.
   * @returns {Collection} the shards created.
   */
  
  createShards() {
    for(let ID of Array.from({ length: this.client.options.shardCount }, (_, i) => i)) {
      this.shards.set(ID, new Shard(ID, this));
    }
    
    return this.shards;
  }
}

module.exports = ClientWebsocket;