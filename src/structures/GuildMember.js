const Base = require('./Base')

;const User = require('./User')

;class GuildMember extends Base {
  constructor(client, data = {}) {
    super(client);
    /* COISAS PARA FAZER NESTA CLASSE !
    
       • PERMISSIONS
       • TRANFORMAR A STRING DAS DATAS EM UMA INSTÂNCIA DE Date()
    */
    
    this.user = data.user instanceof Object ? new User(client, data.user) : null;
    this.nickname = 'nickname' in data ? data.nickname : null;
    this.roles = data.roles instanceof Array ? new Array(...data.roles) : null;
    
    
    
    this.defeaned = Boolean(this.deaf);
    this.muted = Boolean(this.mute);
    this.pending = Boolean(this.pending);
    
    this.joinedAt = data.joined_at;
    this.joinedTimestamp = Date.parse(this.joinedAt);
    
    let premiumParsed = Date.parse(data.premium_since);
    
    this.boostedAt = data.premium_since;
    this.boostedTimestamp = isNaN(premiumParsed) ? null : premiumParsed;
  }
}

module.exports = GuildMember
;