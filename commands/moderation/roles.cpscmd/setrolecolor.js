const reg = /#([\da-fA-F]{2})([\da-fA-F]{2})([\da-fA-F]{2})/;

module.exports = {
  name: 'setrolecolor',
  async func(msg, { send, guild, args, author }) {
    if (!guild) {
      return send('You need to use this command in a guild!');
    }

    if (!args[0]) {
      return send('Role? Hex color?');
    }

    if (args[0] && !args[1].match(reg)) {
      return send('Hex color?');
    }

    if (args[0] && args[1].match(reg)) {
      let role = guild.roles.find('name', `${args[0]}`);
      let hexcolor = args[1];
      if (role && (author.highestRole.position > role.position)) {
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

