const User = require('./User');

class ClientUser extends User {
  constructor(client, data) {
    super(client, data);
  }
}

module.exports = ClientUser;