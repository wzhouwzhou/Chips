module.exports = (Discord, client) => {
  return async(msg, prefix) => {
    const regprefix = _.escapeRegExp(prefix);
    const noprefix = msg.content.replace(new RegExp(`^${regprefix}`), '');
    let context = {
      Constants,
      noprefix, prefix, msg, Discord, client,
      message: msg,
      channel: msg.channel,
      content: msg.content,
      suffix: noprefix.split(/\s+/).length > 1 ? msg.content.substring(msg.content.indexOf(' ') + 1).trim() : '',
      guild: msg.guild,
      send: msg.channel.send.bind(msg.channel),
      reply: msg.reply.bind(msg),
      member: msg.member,
      author: msg.author,
      args: _.drop(noprefix.split(/\s+/)),
      bot: client,
      c: msg.channel,
      gMember: msg.guild ? msg.guild.member.bind(msg.guild) : _ => _,
      getUser: client.users.get.bind(client.users),
      doEval: stuff => {
        const timestamp = Date.now();
        return new Promise((res, rej) => {
          console.log(`doEval part: dideval${timestamp}`);
          Messager.once(`dideval${timestamp}`, ({ err, result }) => {
            console.log(`Received doEval, err = ${err}, result:${result}`);
            if (err) return rej(result);
            else return res(result);
          });
          Messager.emit('eval', { evalContent: stuff, vars: context, timestamp });
          console.log('Emitted eval');
        });
      },
      delay: ms => new Promise(res => setTimeout(() => res(ms), ms)),
      times: ['years', 'months', 'weeks', 'days', 'hours', 'minutes', 'seconds'],
    };
    context.convertTime = async(obj, i) => {
      if (obj instanceof Date) {
        if (isNaN(i)) throw 'Invalid number given for index';
        if (i >= context.times.length) throw 'Invalid index given';
        let diff = moment().diff(obj, context.times[i], true).toFixed(2);
        for (;i < context.times.length - 1;) {
          if (diff > 1) return [diff, i];
          diff = moment().diff(obj, context.times[++i], true).toFixed(2);
        }
        return [diff, i];
      } else {
        throw 'Invalid date!';
      }
    };
    context.loadingBar = (msg, options) => {
      const stuff = Object.assign({}, { seconds: 6, l: 30, emb: false, mu: 5 }, options);
      let { seconds, l, emb, mu } = stuff;
      return new Promise(async res => {
        let cb = '`', c = '▓', u = '░', m, embed;
        const switchTitle = e => {
          switch (e.title) {
            case 'Loading.': { return e.setTitle('Loading..'); }
            case 'Loading..': { return e.setTitle('Loading...'); }
            case 'Loading...': { return e.setTitle('Loading....'); }
            case 'Loading....': { return e.setTitle('Loading.'); }
          }
        };
        if (emb) {
          embed = new context.Discord.MessageEmbed().setDescription(`${cb + u.repeat(l)}0%${cb}`).setColor(msg.member.displayColor || 10342)
            .setTitle('Loading.');
          m = await msg.channel.send('', { embed });
        } else { m = await msg.channel.send(`${cb + u.repeat(l)}0%${cb}`); }
        for (let i = 1; i < Math.floor(l / mu) + 1; i++) {
          await context.delay(~~(1000 * seconds / (l / mu)));
          let percent = `${(100 * (mu * i) / l).toFixed(2)}%`;
          if (emb) {
            embed = switchTitle(embed.setDescription(cb + c.repeat(mu * i) + u.repeat(l - mu * i) + percent + cb));
            await m.edit('', { embed });
          } else { await m.edit(cb + c.repeat(mu * i) + u.repeat(l - mu * i) + percent + cb); }
        }
        if (emb) m.edit('', { embed: embed.setTitle('Done Loading!').setTimestamp(new Date()) });
        else m.edit('**(100%) Done Loading!**');
        res(m);
      });
    };
    try {
      for (const cmdn in client.commands) {
        const cmd = client.commands[cmdn];
        if (new RegExp(`^${_.escapeRegExp(cmdn)}$`,'i').test(noprefix.split(/\s+/)[0])) {
          const meta = cmd.metadata;
          if (meta == null) return msg.reply('This command has an error with its metadata! Please report this to my developers!');
          if (meta.perm != null && meta.perm[0] != null) {
            console.log(meta.perm[0]);
            permissions.checkMulti(msg, meta.perm[0]).then((/* Info*/) => {
              // Console.log(`[Command] ${info}`);
              console.log(chalk.bold.bgBlue(`[${msg.author.tag}]`), chalk.bgBlack(`:${msg.content}`));
              try {
                return Promise.resolve(cmd.run(msg, context).then(() => true).catch(err => {
                  msg.channel.send(`An error occurred, please report this in the support server: https://support.chipsbot.me/ \n${err}`);
                  console.error(err);
                  return false;
                }));
              } catch (err) {
                msg.channel.send(`An error occurred, please report this in the support server: https://support.chipsbot.me/ \n${err}`);
                console.error(err);
                return false;
              }
            }).catch(reason => {
              if (msg.member && (meta.customperm && meta.customperm[0])) {
                if (!msg.member.hasPermission(meta.customperm[0])) {
                  console.log(`[Command] Rejected ${reason}`);
                  issue = true;
                  if (~reason.indexOf('permission')) { return msg.reply(`${reason}\nYou could also use this if you have \`\`${meta.customperm[0]}\`\` permissions`); } else { return msg.reply(reason); }
                } else {
                  // Console.log('[Command] Accepted due to customperm bypass:');
                  console.log(chalk.bold.bgBlue(`[${msg.author.tag}]`), chalk.bgBlack(`:${msg.content}`));
                  try {
                    return Promise.resolve(cmd.run(msg, context).then(() => true).catch(err => {
                      msg.channel.send(`An error occurred, please report this in the support server: https://support.chipsbot.me/ \n${err}`);
                      console.error(err);
                      return false;
                    }));
                  } catch (err) {
                    msg.channel.send(`An error occurred, please report this in the support server: https://support.chipsbot.me/ \n${err}`);
                    console.error(err);
                    return false;
                  }
                }
              } else {
                // Console.log('[Command] Rejected '+ reason);
                return msg.reply(reason);
              }
            });
          } else {
            // Console.log(`meta perm not found! ${meta?JSON.stringify(meta):''}`);
            try {
              return Promise.resolve(cmd.run(msg, context).then(() => true).catch(err => {
                msg.channel.send(`An error occurred, please report this in the support server: https://support.chipsbot.me/ \n${err}`);
                console.error(err);
                return false;
              }));
            } catch (err) {
              console.error(err);
              msg.channel.send(`An error occurred, please report this in the support server: https://support.chipsbot.me/ \n${err}`);
              return false;
            }
          }
        }
      }
    } catch (errp) {
      console.error(errp);
      msg.channel.send(`An error occurred, please report this in the support server: https://support.chipsbot.me/ \n${errp}`);
      return false;
    }
  };
};
