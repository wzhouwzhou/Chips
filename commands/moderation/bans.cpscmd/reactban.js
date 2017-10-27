const timers = [];

module.exports = {
  name: 'reactban',
  async func(msg, { reply, member, args, channel, guild, gMember, prefix }) {
    if (!guild) return reply('I can\'t ban you from reacting in this channel!');
    let intervalID;
    if (!args[0]) {
      intervalID = setInterval(() => {
        channel.messages.fetch({ limit: 10 }).then(msgs => {
          msgs.array().forEach(async msg => {
            await msg.clearReactions();
          });
        });
      }, 7000);
      timers.push([intervalID, channel.id]);
      let bad = new Discord.MessageEmbed();
      bad.setTitle('Reaction ban');
      bad.setDescription(`Reacting has been disabled in this channel!
To stop this type \`\`${prefix}\`\`reactban ${timers.length - 1}`);
      bad.setColor(member.displayColor);
      bad.setFooter(new Date().toUTCString());
      return reply('', { embed: bad });
    } else {
      let memberToUse;
      try { // Get mention:
        console.log('Trying to find user by mention..');
        if (!args[0]) return reply('Please specify a user to prevent from reacting!');
        let target = args[0].match(Constants.patterns.MENTION)[1];
        memberToUse = gMember(target);
        if (member.id == memberToUse.id) return reply('Why would you want to react ban yourself <.<');
      } catch (err) { // GMember failed: the user gave a timer id
        if (isNaN(args[0])) return reply('Invalid reaction-ban id specified!');
        let queryChannel = timers[args[0]] ? timers[args[0]][1] : null;
        if (!queryChannel) return reply(`The channel for this reaction-ban is missing! Perhaps it was deleted`);
        if (queryChannel != channel.id) {
          if (client.channels.get(queryChannel).guild.id == guild.id) return reply(`The specified reaction-ban id is for channel <#${queryChannel}>`);
          else return reply(`The specified reaction-ban id is for a channel unavailable to you!`);
        } else if (args[1] && args[0] == 'stop') {
          clearInterval(timers[args[1]][0]);
          return reply(`The reaction-ban has been lifted for this channel!`);
        }
      }
    }
  },
};
