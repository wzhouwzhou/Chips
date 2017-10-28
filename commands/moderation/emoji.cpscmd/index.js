let ae = require('./addemoji');
let re = require('./removeemoji');

console.log('[CPSCMD][INFO][ping] Building objects...');

ae.metadata = {
  category: require('../').category,
  description: 'no',
  usage: 'no',
  example: 'no one',
  perm: [['global.info.info']],
  customperm: ['MANAGE_CHANNELS'],
};

re.metadata = {
  category: require('../').category,
  description: 'nothing',
  usage: 'hax',
  example: 'rz',
  perm: [['global.info.info']],
  customperm: ['MANAGE_CHANNELS'],
};


console.log('[CPSCMD][INFO][ping] Build objects complete!');
module.exports = [
  [ae.name, ae],
  ['addemoji', ae],
  ['createemoji', ae]
    [re.name, re],
  ['removeemoji', re],
  ['deleteemoji', re],
];
