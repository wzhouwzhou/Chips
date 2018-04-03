exports.name = 'unlewdme';
exports.func = async(msg, ctx) => {
  const { send, reply, guild, member, prefix } = ctx;
  if (!guild || guild.id !== '373481656134270986') return true;

  const role = guild.roles.get('386024134695583744') || guild.roles.find('name', 'NSFW');
  if (member.roles.has(role.id)) {
    await member.removeRole(role);
    return send('You now do not have access to the NSFW chats here!');
  } else {
    return reply(`You don't have the NSFW role, add it with ${prefix}lewdme`);
  }
};

exports.metadata = {
  category: require('../').category,
  description: 'This custom command allows you to remove access to NSFW channels!',
  usage: 'unlewdme <no args>',
  example: 'unlewdme',
  perms: [['global.custom.lewdme.*']],
};
