const Base = require('./Base');

const { ChannelTypes, ResolvedChannelTypes } = require('../util/Constants');

class BaseChannel extends Base {
  constructor(data = {}, client = null) {
    super(client);
    
    
    Object.defineProperties(this, {
      DefaultType: {
        value: Number(data.type)
      }
    });
    
    this.id = data.id;
    this.type = ResolvedChannelTypes[ChannelTypes[this.DefaultType]];
    
  }
}