exports.name = 'iwantupdates';
exports.func = async(msg, ctx) => {
  const { prefix, send, guild, member } = ctx;
  if (!guild || guild.id !== '307623291479130132') return true;
  const role = guild.roles.get('413803807248613380') || guild.roles.find('name', 'Update-Notify');
  if (member.roles.has(role.id)) {
    return send(`You already get pinged when there are updates! Remove the Updates role with ${prefix}idontwantupdates`);
  } else {
    await member.addRole(role);
    return send('You will now be pinged whenever there is an update!');
  }
};

exports.metadata = {
  category: require('../').category,
  description: 'This custom command lets you be pinged whenever theres a Chips update in the Chips Support Server Update Channel!',
  usage: 'iwantupdates <no args>',
  example: 'iwantupdates',
  perms: [['global.custom.chipsSupport.*']],
};
