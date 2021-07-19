const Client = require('../src');
const { Authorization, Prefix } = require('./Authorization');

const util = require("util");

const client = Client();

client.on("messageCreate", async message => {
  console.log(message)
  
  if(message.author.bot) return;
  if(!message.content.startsWith(Prefix)) return;
  
  const args = message.content.trim().slice(Prefix.length).split(" ");
  const command = args.shift().toLowerCase();
  
  console.log(command)
  
  if(command == "eval" && message.author.id == '852922358170779658') {
    
    client.createMessage(
      message.channelID, {content:util.inspect(eval(args.join(" ")))});
  }
  
  if(command == "ping") {
    const { shardID } = client.guilds.get(message.guildID);
    
    const { ping } = client.ws.shards.get(shardID);
    
    console.log(await client.createMessage(message.channelID, {
      content: `Pong! \`${ping}ms\``
    }))
  }
  
})

client.connect(Authorization);

