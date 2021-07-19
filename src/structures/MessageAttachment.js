const Base = require('./Base');

class MessageAttachment extends Base {
  constructor(client, data = {}) {
    super(client);
    
    this.id = data.id;
    this.name = data.filename;
    this.type = data.content_type;
    this.size = data.size;
    this.url = data.url;
    this.proxyUrl = data.proxy_url;
    this.height = data.height;
    this.width = data.width;
    
    this.client.emit("DEV_DEBUG", "Class attachment instantied.", { Attachment: this, Data: data, Client: this.client });
    
  }
  
  toJSON() {
    const { id , name: filename, type: content_type, size, url, proxyUrl: proxy_url, height, width } = this;
    
    return {
      id, filename, content_type, size, url, proxy_url, height, width
    };
  }
}

module.exports = MessageAttachment;