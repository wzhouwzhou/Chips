
module.exports = function(Discord, client) {
  return async (msg, prefix) => {
    const regprefix = _.escapeRegExp(prefix);
    const noprefix = msg.content.replace(new RegExp(`^${regprefix}`), "");
    const context = {
      noprefix, prefix, msg, Discord, client,
      message: msg,
      channel: msg.channel,
      content: msg.content,
      guild: msg.guild,
      send: msg.channel.send.bind(msg.channel),
      reply: msg.reply.bind(msg),
      member: msg.member,
      author: msg.author,
      args: _.drop(msg.content.split(/\s+/)),
      bot: client,
      c: msg.channel,
      gMember: msg.guild?msg.guild.member.bind(msg.guild):_=>_,
      getUser: client.users.get.bind(client.users),
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
        if (new RegExp(`^${_.escapeRegExp(cmdn)}$`).test(noprefix.split(/\s+/)[0])){
          const meta = cmd.metadata;
          if(!meta) return msg.reply('This command has not been rewritten yet! Greatest apologies...');
          if(meta.perm&&meta.perm[0]){
            console.log(meta.perm[0]);
            permissions.checkMulti(msg, meta.perm[0]).then((info) =>{
              console.log("[Command] "+ info);
              return cmd.run(msg, context);
            }).catch((reason)=>{
              if(msg.member&&meta.customperm&&meta.customperm[0]){
                if(!msg.member.hasPermission(meta.customperm[0])){
                  console.log("[Command] Rejected " + reason);
                  issue=true;
                  return msg.reply(`${reason}\nYou could also use this if you have \`\`${cmd.customperm[0]}\`\` permissions`);
                }else{
                  console.log("[Command] Accepted due to customperm bypass.");
                  return cmd.run(msg, context);
                }
              }else{
                console.log('[Command] Rejected '+ reason);
                return msg.reply(reason);
              }
            });
          }else{
            return cmd.run(msg, context);
          }
      }
    }
  };
};
