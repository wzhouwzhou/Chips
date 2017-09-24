const EventEmitter = require("events");

module.exports = class Command extends EventEmitter {
  constructor(obj) {
    super();
    Object.entries(obj).map(([k, v]) => this[k] = v);
  }

  async run() {
    const args = Array.from(arguments);
    const message = args[0];
    if (!message) throw new TypeError(`Message not provided to command ${this.name || "< with no name >"}.`);

    let result;
    try {
      result = await this.func.apply(this, args);
      if (result instanceof Error) throw error;
      if (result instanceof Promise) result.catch(e => { throw e; });
      this.emit("run", true);
    } catch (err) {
      console.error(err);
      this.emit("run", false);
      throw err;
      //message.reply("Sorry but there was an error doing this command!");
    }
    if (result instanceof Promise) return await result;
    return result;

  }
};
