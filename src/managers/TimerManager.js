const Collection = require('../util/Collection');

class TimerManager {
  constructor() {
    this._intervals = new Collection();
  }
  setInterval(name, fn, time) {
    this._intervals.set(name, setInterval(()=>{
      fn();
    }, time));
  }
}

module.exports = TimerManager;