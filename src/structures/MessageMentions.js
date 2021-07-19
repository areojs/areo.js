const Collection = require('../util/Collection');

const Base = require('./Base');

const User = require('./User');

const { CHANNELS_PATTERN, ROLES_PATTERN, USERS_PATTERN, EVERYONE_PATTERN } = require('../util/Regex');

class MessageMentions extends Base {
  constructor(client, message={}) {
    super(client);
    
    this.users = MessageMentions.getUsers(message.content);
    this.roles = MessageMentions.getRoles(message.content);
    this.channels = MessageMentions.getChannels(message.content);
    
    this.everyone =  MessageMentions.getEveryone(message.content);
    
    
  }
  
  static getEveryone(content) {
    return EVERYONE_PATTERN.test(content);
  }
  
  static getUsers(content) {
    let _users = [];
    
    let a;
    
    while((a = USERS_PATTERN.exec(content)) !== null) {
      _users.push(a[1]);
    }
    
    return _users;
  }
  
  static getRoles(content) {
    let _roles = [];
    
    let a;
    while((a = ROLES_PATTERN.exec(content)) !== null) {
      _roles.push(a[1]);
    }
    
    return _roles;
  }
  
  static getChannels(content) {
    let _channels = [];
    
    let a;
    while((a = CHANNELS_PATTERN.exec(content)) !== null) {
      _channels.push(a[1]);
    }
    
    return _channels;
  }
}

module.exports = MessageMentions;