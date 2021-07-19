const Client = require('../src');
const { Authorization, Prefix } = require('./Authorization');

const util = require("util");

const client = new Client({ws:{intents: 4609}});

client.on("messageCreate", async message => {
  console.log(message)
  
  if(message.author.bot) return;
  if(!message.content.startsWith(Prefix)) return;
  
  const args = message.content.trim().slice(Prefix.length).split(" ");
  const command = args.shift().toLowerCase();
  
  console.log(command)
  console.log(message.channelID)
  
  if(command == "eval" && message.author.id == '852922358170779658') {
    
    let e = util.inspect(eval(args.join(" ")));
    console.log(args)
    console.log(e);
    
    console.log(message.channelID)
    
    client.createMessage(
      message.channelID, {content:e});
  }
  
  if(command == "ping") {
    let ping;
    
    try {
      const { shardID } = client.guilds.get(message.guildID);
      
      ping = client.ws.shards.get(shardID).ping;
    } catch (e) {
      ping = client.ws.shards.reduce((acc, shard) => acc+ shard.ping, 0);
    }
    
    console.log(ping)
    
    console.log(await client.createMessage(message.channelID, {
      content: `Pong! \`${ping}ms\``
    }));
  }
  
});

client.connect(Authorization).then(token => {
  client.ws.on('message', console.log);
});