
let spooky = require('./spooky');
let reverse = require('./reverse');

console.log('[CPSCMD][INFO][text] Building objects...');
reverse.metadata = {
  category: require('../').category,
  description: ['Reverses an input string'],
  usage: ['reverse <text>'],
  example: ['reverse some text','reverse some text --keepwordorder'],
};
spooky.category = require('../').category;

spooky.description = 'Gives profile for a user! (WIP)';

spooky.usage = 'spooky number';

spooky.example = 'profile';

console.log('[CPSCMD][INFO][text] Build objects complete!');
module.exports = [
  [spooky.name,spooky],
  [reverse.name, reverse]
];
