module.exports = function(Discord, client) {
  return async (msg, prefix) => {
    const regprefix = _.escapeRegExp(prefix);
    const noprefix = msg.content.replace(new RegExp(`^${regprefix}`), "");
    const context = {
      noprefix, prefix, msg, Discord, client,
      message: msg, channel: msg.channel, content: msg.content, guild: msg.guild, send: msg.channel.send.bind(msg.channel),
      reply: msg.reply.bind(msg), member: msg.member, author: msg.author, args: _.drop(msg.content.split` `), bot: client,
      c: msg.channel,
      doEval: stuff => {
        const timestamp = Date.now();
        return new Promise((res, rej) => {
          console.log("doEval part: dideval" + timestamp);
          Messager.once("dideval" + timestamp, ({ err, result }) => {
            console.log("Received doEval");
            if (err) rej(result);
            else res(result);
          });
          Messager.emit("eval", { evalContent: stuff, vars: context, timestamp });
          console.log("Emitted eval");
        });
      },
    };
    for (const cmdn in client.commands) {
      const cmd = client.commands[cmdn];
      if (new RegExp(_.escapeRegExp(cmdn)).test(noprefix.split` `[0])) return cmd.run(msg, context);
    }
  };
};