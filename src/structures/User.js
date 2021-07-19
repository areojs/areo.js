const Base = require('./Base');
const GuildMember = require('./GuildMember');

class User extends Base {
  constructor(client, data = {}) {
    super(client);
    
    this.username = data.username;
    this.discriminator = data.discriminator;
    this.tag = this.username + '#' + this.discriminator;
    this.id = data.id;
    
    this.bot = Boolean(data.bot);
    this.system = Boolean(data.system);
    this.verified = Boolean(data.verified);
    this.mfaEnabled = Boolean(data.mfa_enabled);
    
    
    this.avatarHash = 'avatar' in data ? data.avatar : null;
    this.locale = 'locale' in data ? data.locale : null;
    this.email = 'email' in data ? data.email : null;
    this.premiumType = 'premium_type' in data ? data.premium_type : null;
    this.publicFlags = 'public_types' in data ? Number(data.public_flags) : null;
    
    this.member = data.member instanceof Object ? new GuildMember(client, data.member) : null;
    
    this.flags = isNaN(Number(data.flags)) ? null : Number(data.flags);
    
  }
}

module.exports = User;