const BaseChannel = require('./BaseChannel');

class GuildChannel extends BaseChannel {
  constructor(data = {}, client = null) {
    super(data, client);
    
    Object.defineProperties(this, {
      guild: client ? client.guilds.get(data.guild_id) : null
    });
    
  }
}