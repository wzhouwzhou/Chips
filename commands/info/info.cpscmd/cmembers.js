const path = require('path');
const Searcher = require(path.join(__dirname, '../../../handlers/Searcher')).default;
const Paginator = require('../../../rewrite-all/src/struct/client/Paginator').Paginator;

module.exports = {
  name: 'cmembers',
  async func(msg, { send, reply, suffix, member, guild, args, Discord }) {
    if (!guild) return reply('This command can only be used in a server.');
    if (guild) {
      let options = { guild: guild };
      global.searchers[guild.id] = new Searcher(options.guild);
    }
    if (!args[0]) {
      return send('No channel given :<');
    } else {
      let channel;
      try {
        channel = args[0];
        channel = guild.channels.get(channel);
        if (!channel) throw new Error('NotchannelId');
      } catch (err) {
        channel = suffix;
        let list = global.searchers[guild.id].searchChannel(channel);
        if (list.length > 1) {
          await send('Multiple matches found, using first one..');
        } else if (list.length < 1) {
          return send(new Discord.MessageEmbed().setColor(member.displayColor).setDescription(`channel [${channel}] not found!`));
        }
        channel = list[0];
      }
      if (channel.members.size === 0) return send('No members can see this channel!');

      let descs = ['```css\n'], i = 0;
      for (const mem of channel.members.array()) {
        if (!descs[i]) descs[i] = '```';
        if (descs[i].trim().length > 1950) {
          descs[++i] = '```css\n';
        }
        descs[i] += `${mem.user.tag}\n`;
      }
      if (descs.length === 1) {
        const embed = new Discord.MessageEmbed().setTitle(`Members with access to the channel ${channel.name}`).setDescription(`${descs[0]}\x60\x60\x60`);
        return send(embed);
      }

      const p = new Paginator(msg, {
        type: 'paged',
        embedding: true,
        fielding: false,
        title: `${channel.members.size} members with access to the channel ${channel.name}`,
        pages: descs.map(e => `${e}${'\x60'.repeat(3)}`),
      }, Discord);

      return p.sendFirst();
    }
  },
};
