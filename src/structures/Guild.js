const Base = require("./Base");

class Guild extends Base {
  constructor(data = {}, shard = 0, client = null) {
    super(client);
    
    this.id = data.id;
    this.shardID = shard;
    
  }
}

module.exports = Guild;