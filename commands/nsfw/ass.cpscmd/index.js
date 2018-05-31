let ass = require('./ass');

console.log('[CPSCMD][NSFW][ass] Building objects...');
ass.metadata = {
  category: require('../').category,
  description: 'The name of this command is self explanatory.',
  usage: 'ass',
  example: 'ass',
  perm: [['global.nsfw.ass.image']],
};

console.log('[CPSCMD][NSFW][ass] Build objects complete!');
module.exports = [
  [ass.name, ass],
];
