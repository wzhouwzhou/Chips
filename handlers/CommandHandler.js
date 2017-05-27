
module.exports = function(Discord, client) {
  return async (msg, prefix) => {
    const regprefix = _.escapeRegExp(prefix);
    const noprefix = msg.content.replace(new RegExp(`^${regprefix}`), "");
    const context = {
      noprefix, prefix, msg, Discord, client,
      message: msg, channel: msg.channel, content: msg.content, guild: msg.guild, send: msg.channel.send.bind(msg.channel),
      reply: msg.reply.bind(msg), member: msg.member, author: msg.author, args: _.drop(msg.content.split(/\s+/)), bot: client,
      c: msg.channel,
      gMember: msg.guild.member.bind(msg.guild), getUser: client.users.get.bind(client.users),
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
      if (new RegExp(`^${_.escapeRegExp(cmdn)}$`).test(noprefix.split` `[0]))
      if(cmd.perm&&cmd.perm[0]){
        console.log(cmd.perm[0]);
        permissions.checkPermission(msg, cmd.perm[0]).then((info) =>{
          console.log("[Command] "+ info);
          return cmd.run(msg, context);
        }).catch((reason)=>{
          if(cmd.customperm&&cmd.customperm[0]){
            if(msg.member&&(!msg.member.hasPermission(cmd.customperm[0]))){
              console.log("[Command] Rejected");
              issue=true;
              return msg.reply(`${reason}\nYou could also use this if you have \`\`${cmd.customperm[0]}\`\` permissions`);
            }else{
              console.log("[Command] Accepted due to customperm bypass");
              return cmd.run(msg, context);
            }
          }else{
            return msg.reply(reason);
          }
        });
      }else{
        return cmd.run(msg, context);
      }
    }
  };
};
