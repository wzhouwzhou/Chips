const _ = require('lodash');
module.exports = {
  name: 'setguildname',
  async func(msg, { send, guild, member, suffix, Discord }) {
    if (!guild) {
      return send('This must be used in a server');
    }
    if (!suffix) {
      return send('Nothing provided to set as server name');
    }
    if (suffix.length > 32) {
      return send('The server name can only be a maximum of 1024 characters in length!');
    }

    const gg = await guild.setName(suffix.trim());

    let embed = (new Discord.MessageEmbed)
      .setTitle('Server name')
      .setDescription(`Server name set to "${_.escapeRegExp(gg.name).replace(/@/g, '(at)')}" succesfully!`)
      .setColor(member.displayColor || 1);

    return send(embed);
  },
};
