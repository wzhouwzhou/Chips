
let spooky = require('./spooky');
let reverse = require('./reverse');

console.log('[CPSCMD][INFO][text] Building objects...');
reverse.metadata = {
  category: require('../').category,
  description: ['Reverses an input string'],
  usage: ['reverse <text>'],
  example: ['reverse some text','reverse some text --keepwordorder'],
  perm: [['global.fun.text.reverse']],
};

spooky.metadat = {
  category: require('../').category,
  description: 'Prints your text with spooky formatting!',
  usage: 'spooky <text> <optional flag>',
  example: 'spooky testing numspaces: 5',
  perm: [['global.fun.text.spooky']]
};

console.log('[CPSCMD][INFO][text] Build objects complete!');
module.exports = [
  [spooky.name,spooky],
  [reverse.name, reverse]
];
