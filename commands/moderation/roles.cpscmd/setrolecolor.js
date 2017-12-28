const reg = /#([\da-fA-F]{2})([\da-fA-F]{2})([\da-fA-F]{2})/;

module.exports = {
  name: 'setrolecolor',
  async func(msg, { send, guild, args, member, content }) {
    if (!guild) {
      return send('You need to use this command in a guild!');
    }

    // Args[0] === hex color
    // Content == Role

    if (!args[0].match(reg)) {
      return send('Hex color?');
    }

    if (args[0].match(reg) && !content.substring(content.indexOf(args[1]))) {
      return send('Role?');
    }

    if (args[0].match(reg) && content.substring(content.indexOf(args[1]))) {
      let role = guild.roles.find('name', `${content.substring(content.indexOf(args[1]))}`);
      let hexcolor = args[0];
      if (role && (member.highestRole.position > role.position)) {
        await role.setColor(`${hexcolor}`);
        return send(`Role color set to ${hexcolor}!`);
      } else if (!role) {
        return send(`${role} not found!`);
      } else {
        return send('Not enoguh permissions!');
      }
    }
  },
};

