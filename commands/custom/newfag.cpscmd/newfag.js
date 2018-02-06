-eval
const _ = require('lodash');
const split = require('../../../rewrite-all/src/deps/functions/splitChunkF').default({ _ });
const { Paginator } = require('../../../rewrite-all/src/struct/client/Paginator');
exports.name = 'newfag';
exports.func = async(msg, { prefix, guild, content, args }) => {
  if (!guild || guild.id !== '136176078199717888') return true;
  if (content.match(new RegExp(`${_.escapeRegExp(prefix)}r`, 'i')) && args[0] !== 'n') return true;
  const p = new Paginator(msg, {
    type: 'paged',
    embedding: true,
    fielding: false,
    text: 'New members with autorole',
    title: `Total: ${(guild.roles.get('304364013524090891') || guild.roles.find('name', 'newfag')).members.size}`,
    pages:
    [
      ...(split(
          (guild.roles.get('304364013524090891') || guild.roles.find('name', 'newfag'))
          .members.array().map(e=>e+[]), { clone: true, size: 10 }
        ) || ['None!']).map(e => e.join('\n')),
    ],
  }, Discord
  );
  try {
    p.sendFirst();
  } catch (err) {
    send('Something went wrong...');
    throw err;
  }
};

exports.metadata = {
  category: require('../').category,
  description: 'This custom command allows you to view new people with the newfag autorole!',
  usage: 'newfag <no args>',
  example: 'newfag',
  perms: [['global.custom.newfag.*']],
  customperm: ['MANAGE_ROLES'],
};
