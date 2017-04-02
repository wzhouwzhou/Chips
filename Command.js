const EventEmitter = require("events");

module.exports = class Command extends EventEmitter {
  constructor(obj) {
    super();
    Object.entries(obj).map(([k, v]) => this[k] = v);
  }

  run(message, ...args) {
    let result;
    try {
      const newArr = Array.from(args).unshift(message);
      result = this.func.apply(this, newArr);
      this.emit("run", true);
    } catch (err) {
      console.error(err);
      this.emit("run", false);
      message.reply("Sorry but there was an error doing this command!");
    }
    if (result instanceof Promise) result.catch(console.error);
    return result;
  }
};