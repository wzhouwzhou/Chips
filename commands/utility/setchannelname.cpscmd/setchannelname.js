const _ = require('lodash');

module.exports = {
  name: 'setchannelname',
  async func(msg, { send, guild, member, args, channel, suffix, Discord }) {
    if (!guild) {
      return send('This must be used in a server');
    }
    if (!suffix) {
      return send('Nothing provided to set as channel name');
    }
    if (!suffix.substring(suffix.indexOf(args[0])).match(/^[0-9a-z\-_]+$/i)) {
      return send('Text channel name must be alphanumeric with dashes or underscores.');
    }

    if (suffix.length > 100) {
      return send('The channel name can only be a maximum of 100 characters in length!');
    }
    if (suffix.length < 2) { 
      return send('The channel name can only be a minumum of 2 characters in length!'); 
    }

    const cc = await channel.setName(suffix.substring(suffix.indexOf(args[0])));

    let embed = (new Discord.MessageEmbed)
      .setTitle('Channel Name')
      .setDescription(`Channel name set to ${_.escapeRegExp(cc.name).replace(/@/g, '(at)')} succesfully!`)
      .setColor(member.displayColor);

    return send(embed);
  },
};
