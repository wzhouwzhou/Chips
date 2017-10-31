'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

exports.default = class CommandHandler {
  constructor(client, _, Discord) {
    this.client = client;
    this.bot = client;
    this.cmds = new Map();
    this._ = _;
    this.Discord = Discord;
  }

  handle(msg, prefix) {
    const precmd = msg.content.split(/\s+/)[0].toLowerCase().replace(this._.escapeRegExp(prefix), '');
    if (!this.cmds.has(precmd)) return false;
    const ctx = {
      msg: msg,
      message: msg,
      channel: msg.channel,
      guild: msg.guild,
      server: msg.guild,
      author: msg.author,
      member: msg.member,
      send: msg.channel.send.bind(msg.channel),
      reply: msg.reply.bind(msg),
      client: this.client,
      bot: this.client,
      content: msg.content,
      args: this._.drop(msg.content.split(/\s+/)),
      suffix: msg.content.split(/\s+/).length > 1 ? msg.content.substring(msg.content.indexOf(msg.content.split(/\s+/)[1]) + 1) : null,
      prefix: prefix,
      Discord: this.Discord,
    };
    return this.cmds.get(precmd).exec.call(this.cmds.get(precmd), msg, ctx);
  }
};
