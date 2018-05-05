const reset = /reset/i;
const reg = /#((?:[0-9a-f]{2}){3})/i;

module.exports = {
  name: 'setrolecolor',
  async func(msg, { send, guild, args, member, suffix, Discord, prefix }) {
    if (!guild) {
      return send('You need to use this command in a guild!');
    }
    if (!args[0]) {
      const embed = new Discord.MessageEmbed()
        .setTitle('Invalid usage')
        .setDescription(`${prefix}${this.name} [color] [Role name]`);
      return send(embed);
    }

    if (!args[0].match(reg) && !args[0].match(reset)) {
      return send('Invalid hex color provided');
    }

    if (!args[1]) {
      return send('No role provided');
    }

    if (args[0].match(reg) && suffix.substring(args[1].length + 1)) {
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
    }
  },
};
