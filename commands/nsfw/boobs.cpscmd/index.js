
let boobs = require('./boobs');

console.log('[CPSCMD][NSFW][boobs] Building objects...');

boobs.metadata = {
  category: require('../').category,
  description: 'The name of this command is self explanatory.',
  usage: 'boobs',
  example: 'boobs',
  perm: [['global.nsfw.boobs.boobs']],
};

console.log('[CPSCMD][NSFW][boobs] Build objects complete!');
module.exports = [
  [boobs.name,boobs],
];
