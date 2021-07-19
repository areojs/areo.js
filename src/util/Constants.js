module.exports.MessageTypes = [
    "DEFAULT",
    "RECIPIENT_ADD",
    "RECIPIENT_REMOVE", 
    "CALL",
    "CHANNEL_NAME_CHANGE", 
    "CHANNEL_ICON_CHANGE",
    "CHANNEL_PINNED_MESSAGE", 
    "GUILD_MEMBER_JOIN",
    "USER_PREMIUM_GUILD_SUBSCRIPTION",
    "USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_1", 
    "USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_2", 
    "USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_3", 
    "CHANNEL_FOLLOW_ADD", 
    "GUILD_DISCOVERY_DISQUALIFIED",
    undefined,
    "GUILD_DISCOVERY_REQUALIFIED",
    "GUILD_DISCOVERY_GRACE_PERIOD_INITIAL_WARNING",
    "GUILD_DISCOVERY_GRACE_PERIOD_FINAL_WARNING", 
    "THREAD_CREATED",
    "REPLY",
    "APPLICATION_COMMAND",
    "THREAD_STARTER_MESSAGE",
    "GUILD_INVITE_REMINDER"
];

module.exports.ChannelTypes = [
  'GUILD_TEXT',
  'DM',
  'GUILD_VOICE',
  'GROUP_DM',
  'GUILD_CATEGORY',
  'GUILD_NEWS',
  'GUILD_STORE',
  undefined, undefined, undefined, undefined,
  'GUILD_NEWS_THREAD',
  'GUILD_PUBLIC_THREAD',
  'GUILD_PRIVATE_THREAD',
  'GUILD_STAGE_VOICE'
];

module.exports.ResolvedChannelTypes = {
  'GUILD_TEXT': 'text',
  'DM': 'dm',
  'GUILD_VOICE': 'voice',
  'GROUP_DM': 'group',
  'GUILD_CATEGORY': 'category',
  'GUILD_NEWS': 'news',
  'GUILD_STORE': 'store',
  'GUILD_NEWS_THREAD': 'newsThread',
  'GUILD_PUBLIC_THREAD': 'publicThread',
  'GUILD_PRIVATE_THREAD': 'privateThread',
  'GUILD_STAGE_VOICE': 'stage'
};

module.exports.gateawayURL = `wss://gateway.discord.gg/`;
module.exports.gateawayVersion = 9;
module.exports.gateawayEncoding = 'json';

module.exports.DefaultClientIntents = 4609;