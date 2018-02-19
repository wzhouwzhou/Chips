exports.name = 'idontwantupdates';
exports.func = async(msg, ctx) => {
  const { prefix, send, reply, guild, member, author, channel, Discord, Constants } = ctx;
  if (!guild || guild.id !== '307623291479130132') return true;
  const role = guild.roles.get('413803807248613380') || guild.roles.find('name', 'Update-Notify');
  if (member.roles.has(role.id)) {
    await member.removeRole(role);
      return send('You no longer have access to the Updates Channel!');
  } else {
    return send(`You dont have the role yet!`);
  }
};

exports.metadata = {
  category: require('../').category,
  description: 'This custom command allows you to lose access to Chips\' Support Server Updates Channel!',
  usage: 'idontwantupdates <no args>',
  example: 'idontwantupdates',
  perms: [['global.custom.chipsSupport.*']],
};
