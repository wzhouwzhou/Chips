let ae = require('./addemoji');
let re = require('./removeemoji');

console.log('[CPSCMD][UTILITY][EMOJI] Building objects...');

ae.metadata = {
  category: require('../').category,
  description: 'Adds emojis',
  usage: '-addemoji <name> <link>',
  example: '-addemoji waitwhat https://cdn.discordapp.com/emojis/356568603488681985.png',
  perm: [['global.info.info']],
  customperm: ['MANAGE_EMOJIS'],
};

re.metadata = {
  category: require('../').category,
  description: 'Removes emojis',
  usage: '-removeemoji <name>',
  example: '-removeemoji waitwhat',
  perm: [['global.info.info']],
  customperm: ['MANAGE_EMOJIS'],
};


console.log('[CPSCMD][UTILITY][EMOJI] Build objects complete!');
module.exports = [
  [ae.name, ae],
  ['addemoji', ae],
  ['createemoji', ae]
  [re.name, re],
  ['removeemoji', re],
  ['deleteemoji', re],
];
