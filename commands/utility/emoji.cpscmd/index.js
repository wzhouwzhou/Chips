let ae = require('./addemoji');
let re = require('./removeemoji');

console.log('[CPSCMD][MODERATION][emoji] Building objects...');

ae.metadata = {
  category: require('../').category,
  description: 'Adds emojis',
  usage: '-addemoji <name> <link>',
  example: '-addemoji waitwhat https://cdn.discordapp.com/emojis/356568603488681985.png',
  perm: [['global.utility.*']],
  customperm: ['MANAGE_EMOJIS'],
};

re.metadata = {
  category: require('../').category,
  description: 'Removes emojis',
  usage: '-removeemoji <name>',
  example: '-removeemoji waitwhat',
  perm: [['global.utility.*']],
  customperm: ['MANAGE_EMOJIS'],
};


console.log('[CPSCMD][MODERATION][emoji] Build objects complete!');
module.exports = [
  [ae.name, ae],
  ['addemoji', ae],
  ['createemoji', ae],
  ['addemote', ae],
  ['createemote', ae],
  [re.name, re],
  ['removeemoji', re],
  ['deleteemoji', re],
  ['removeemote', re],
  ['deleteemote', re],
  ['delemoji', re],
  ['delemote', re],
];
