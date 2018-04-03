exports.name = 'idontwantupdates';
exports.func = async(msg, ctx) => {
  const { send, guild, member } = ctx;
  if (!guild || guild.id !== '307623291479130132') return true;
  const role = guild.roles.get('413803807248613380') || guild.roles.find('name', 'Update-Notify');
  if (member.roles.has(role.id)) {
    await member.removeRole(role);
    return send('You are no longer pinged in the Update Channel!');
  } else {
    return send(`You dont have the role yet!`);
  }
};

exports.metadata = {
  category: require('../').category,
  description: 'This custom command allows you to not be pinged for Chips Updates!',
  usage: 'idontwantupdates <no args>',
  example: 'idontwantupdates',
  perms: [['global.custom.chipsSupport.*']],
};
