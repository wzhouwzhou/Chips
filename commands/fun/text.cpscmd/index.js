/* eslint no-console: 'off' */
const spooky = require('./spooky');
const reverse = require('./reverse');
const rotate = require('./rotate');
const randomCaps = require('./randomCaps');
const big = require('./big');
const threed = require('./3d');
const threed2 = require('./3d2');
const ascii = require('./ascii');
const derp = require('./derp');
const haiku = require('./haiku');
const bify = require('./bify');
const excl = require('./!');
const eh = require('./eh');
const huh = require('./huh');
const nerd = require('./nerd');

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
bify.metadata = {
  category: require('../').category,
  description: 'Prints your text with :b: replacements!',
  usage: 'bify <text>',
  example: 'bify testing one two three',
  perm: [['global.fun.text.bify']],
};
excl.metadata = {
  category: require('../').category,
  description: '!?!¡@!?!!!1¡!@!!!?@@??',
  usage: '! <no args>',
  example: '!',
  perm: [['global.fun.text.!']],
};
eh.metadata = excl.metadata;
huh.metadata = eh.metadata;
nerd.metadata = huh.metadata;

console.log('[CPSCMD][INFO][text] Build objects compconste!');
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
  [bify.name, bify],
  [excl.name, excl],
  [eh.name, eh],
  [huh.name, huh],
  [nerd.name, nerd],
];
