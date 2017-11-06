const _ = require('lodash');

module.exports = {
  name: 'setchannel',
  async func(msg, { send, guild, args, member, channel, suffix, prefix, Discord, author }) {
    if (!guild) return send('You must be in a server to use this');

    if (!args[0]) {
      return send(new Discord.MessageEmbed()
        .setTitle('How to use setchannel')
        .setDescription([
          '{}<name> name [new-name] - sets the channel name.',
          '{}<name> topic [new topic] - sets the channel topic.',
          '{}<name> position [new position] - sets the channel position.',
        ].map(e => e.replace(/^(\{\})\s*(<name>)\s+(\w+)\s*(\[[\w\s-_]+\])?\s*-\s*([^]*)$/gi,
          (ee, pre, nm, item, argsv, suff) =>
            `**${_.escapeRegExp(prefix || '-')}${this.name || 'setchannel'} ${item} ${argsv || ''}** ${suff}`))
          .join('\n'))
        .setColor(member.displayColor));
    }

    if (args[0] === 'name') {
      if (suffix.substring(suffix.indexOf(args[1])) > 100) {
        return send('The channel name can only be a maximum of 100 characters in length!');
      }

      if (suffix.substring(suffix.indexOf(args[1])) < 2) {
        return send('The channel name can only be a minumum of 2 characters in length');
      }
      if (!args[1]) return send('No name given to set');
      if (!suffix.substring(suffix.indexOf(args[1])).match(/^[0-9a-z\-_]+$/i)) {
        return send('Text channel name must be alphanumeric with dashes or underscores.');
      } else {
        await channel.setName(suffix.substring(suffix.indexOf(args[1])));
        return send(`Channel name set to ${_.escapeRegExp(channel.name).replace(/@/g, '(at)')} successfully`);
      }
    }

    if (args[0] === 'position') {
      if (!args[1]) {
        return send('No position given.');
      }

      if (!suffix.substring(suffix.indexOf(args[1])).match(/\d+/g)) {
        return send('No number given');
      } else {
        await channel.setPosition(`${suffix.substring(suffix.indexOf(args[1])) - 1}`);
        return send(`Channel position set to ${_.escapeRegExp(channel.position - 1)
          .replace(/@/g, '(at)')} succesfully`);
      }
    }

    if (args[0] === 'topic') {
      if (!args[1]) { return send('No topic given to set'); } else {
        await channel.setTopic(suffix.substring(suffix.indexOf(args[1])));
        return send(`Channel topic set to ${_.escapeRegExp(channel.topic).replace(/@/g, '(at)')} successfully`);
      }
    }

    if (args[0] === 'nsfw') {
      if (!args[1]) {
        return send('No nsfw on/off given to set.');
      } else {
        if (args[1].match(/true|on/)) {
          if (channel.nsfw) return send('Channel is already marked nsfw');
          await channel.setNSFW(true, `Channel marked Nsfw by ${author.tag}`);
          return send('Channel successfully marked Nsfw');
        }
        if (args[1] === 'false') {
          if (!channel.nsfw) return send('Channel is not marked nsfw');
          await channel.setNSFW(false, `Channel unmarked Nsfw by ${author.tag}`);
          return send('Channel successfully unmarked Nsfw');
        }
      }
    }

    return channel;
  },
};
