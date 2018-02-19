exports.name = 'iwantupdates';
exports.func = async(msg, ctx) => {
  const { prefix, send, reply, guild, member, author, channel, Discord, Constants } = ctx;
  if (!guild || guild.id !== '307623291479130132') return true;
  const role = guild.roles.get('413803807248613380') || guild.roles.find('name', 'Update-Notify');
  if (member.roles.has(role.id)) {
    return send(`You already have access to the Update channel here! Remove the Updates role with ${prefix}unupdateme`);
  } else {
    await member.addRole(role);
      return send('You now have access to the Updates Channel!');
  }
};

exports.metadata = {
  category: require('../').category,
  description: 'This custom command allows you to gain access to Chips' Support Server Updates Channel!',
  usage: 'iwantupdates <no args>',
  example: 'iwantupdates',
  perms: [['global.custom.chipsSupport.*']],
};
