class Resolver {
  constructor(dataToResolve) {
    
    this.resolveClientToken = Resolver.resolveClientToken.bind(dataToResolve);
  }
  
  static resolveClientToken(token) {
    if(token instanceof Buffer) token = token.toString();
    if(typeof token !== 'string') return void 0;
    
    return token.replace(/(Bot|Bearer)/g, '').trim();
  }
}

module.exports = Resolver;
