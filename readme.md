# Areo.js

```javascript
const Areo = require('areo.js');

const client = new Areo();

client.on('ready', () => {
  console.log(`Connected as ${client.user.tag} !`);
})


client.connect("YOUR_BOT_TOKEN_GOES_HERE");
```