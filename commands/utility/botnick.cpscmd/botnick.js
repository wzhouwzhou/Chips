const _ = require('lodash');

module.exports = {
  name: 'botnick',
  async func(msg, { send, guild, suffix, member, args }) {
    if (!guild) return send('You need to be in a server to use this!');
    if (!suffix) return send('Nothing provided to set as my nick');
    if (!guild.me.hasPermission('CHANGE_NICKNAME')) return send('I do not have permission to change my own nickname!');
    if (suffix.length > 32) return send('My nickname can only be a maximum of 32 characters in length!');
    if (args[0].match(/reset|r/) && !args[1].match(/c|confirm|y|yes/)) 
    let help = [
      '{}botnick reset confirm/yes - To reset Chips\'s nickname!'
    ].join(' ').replace(/{}/g, _.escapeRegExp(prefix).replace(/`/g, '\\`'));
    return send(new Discord.MessageEmbed().setDescription(`${help}`).setColor(member.displayColor));
    if (args[0].match(/reset|r/) && args[1].match(/c|confirm|y|yes/)) {
      let chips = 'Chips';
      await guild.me.setNickname(chips);
      return send(`Nickname set succesfully: ${chips}`);
    }
    await guild.me.setNickname(suffix);
    return send(`Nickname set successfully: ${suffix}`);
  },
};
