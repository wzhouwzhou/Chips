let spooky = require('./spooky');
let reverse = require('./reverse');
let rotate = require('./rotate');
let randomCaps = require('./randomCaps');
let big = require('./big');
let threed = require('./3d');
let threed2 = require('./3d2');
let ascii = require('./ascii');
let derp = require('./derp');
let haiku = require('./haiku');

console.log('[CPSCMD][INFO][text] Building objects...');

reverse.metadata = {
  category: require('../').category,
  description: ['Reverses an input string'],
  usage: ['reverse <text>'],
  example: ['reverse some text', 'reverse some text --keepwordorder'],
  perm: [['global.fun.text.reverse']],
};
spooky.metadata = {
  category: require('../').category,
  description: 'Prints your text with spooky formatting!',
  usage: 'spooky <text> <optional flag>',
  example: 'spooky testing numspaces: 5',
  perm: [['global.fun.text.spooky']],
};
rotate.metadata = {
  category: require('../').category,
  description: 'Rotates your text',
  usage: 'rotate <\\ or /> <text>',
  example: 'rotate \\ hello!',
  perm: [['global.fun.text.rotate']],
};
randomCaps.metadata = {
  category: require('../').category,
  description: 'Randomly caps your text',
  usage: 'randomcaps <text>',
  example: 'randomcaps hello!',
  perm: [['global.fun.text.randomcaps']],
};
big.metadata = {
  category: require('../').category,
  description: 'Enlarges a given emoji!',
  usage: 'big <emoji>',
  example: 'big :heart:',
  perm: [['global.fun.text.big']],
};
threed.metadata = {
  category: require('../').category,
  description: 'Gives you cool text!',
  usage: '3d <text>',
  example: 'big Smith',
  perm: [['global.fun.text.3d']],
};
threed2.metadata = {
  category: require('../').category,
  description: 'Gives you cool text!',
  usage: '3d2 <text>',
  example: '3d2 Smith',
  perm: [['global.fun.text.3d2']],
};
ascii.metadata = {
  category: require('../').category,
  description: 'Gives you some fresh ASCII!',
  usage: 'ascii <text>',
  example: 'ascii Smith',
  perm: [['global.fun.text.ascii']],
};
derp.metadata = {
  category: require('../').category,
  description: 'Enlarges a given emoji!',
  usage: 'big <emoji>',
  example: 'big :heart:',
  perm: [['global.fun.text.derp']],
};
haiku.metadata = {
  category: require('../').category,
  description: 'Enlarges a given emoji!',
  usage: 'big <emoji>',
  example: 'big :heart:',
  perm: [['global.fun.text.haiku']],
};

console.log('[CPSCMD][INFO][text] Build objects complete!');
module.exports = [
  [spooky.name, spooky],
  [reverse.name, reverse],
  [rotate.name, rotate],
  [randomCaps.name, randomCaps],
  [big.name, big],
  [threed.name, threed],
  [threed2.name, threed2],
  [ascii.name, ascii],
  [derp.name, derp],
  [haiku.name, haiku],
];
