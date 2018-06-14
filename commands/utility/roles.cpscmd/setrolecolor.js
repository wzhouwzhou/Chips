const reset = /reset/i
const reg = /#((?:[0-9a-f]{2}){3})/i;

module.exports = {
  name: 'setrolecolor',
  async func(msg, { send, guild, args, member, suffix, Discord, prefix }) {
    if (!guild) {
      return send('You need to use this command in a guild!');
    }
    if (!args[0] || !(reset.test(args[0]) || reg.test(args[0]))) {
      const embed = new Discord.MessageEmbed()
        .setTitle('Invalid usage')
        .setDescription(`${prefix}${this.name} [#hexcolor] [Role name]`);
      return send(embed);
    }

    if (!args[1]) {
      return send('No role provided');
    }

    if (reg.test(args[0]) && suffix.substring(args[1].length + 1)) {
      let role = guild.roles.find('name', `${suffix.substring(args[0].length + 1).trim()}`);
      let hexcolor = args[0];
      if (role && (member.highestRole.position > role.position)) {
        await role.setColor(`${hexcolor}`);
        return send(`Role color set to ${hexcolor}!`);
      } else if (!role) {
        return send(`Role not found!`);
      } else {
        return send('Not enough permissions!');
      }
    } else if (reset.test(args[0]) && suffix.substring(args[1].length + 1)) {
      let role = guild.roles.find('name', `${suffix.substring(args[0].length + 1).trim()}`);
      if (role && (member.highestRole.position > role.position)) {
        await role.setColor('#000000');
        return send(`Role color reset!`);
      } else if (!role) {
        return send(`Role not found!`);
      } else {
        return send('Not enough permissions!');
      }
    }
    const embed = new Discord.MessageEmbed()
      .setTitle('Invalid usage')
      .setDescription(`${prefix}${this.name} [color] [Role name]`);
    return send(embed);
  },
};
