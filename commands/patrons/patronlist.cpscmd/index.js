let tdl = require('./tdl');
let wendy = require('./wendy');
let masontcg = require('./masontcg');
let quantiom = require('./quantiom');
let patrons = require('./patrons');
console.log('[CPSCMD][PATRONS][tdl] Building objects...');

tdl.metadata = {
  category: require('../').category,
  description: 'A custom cmd for our first patron!',
  usage: 'tdl',
  example: 'tdl',
  perm: [['public.info.support.support']],
  customperm: ['SEND_MESSAGES'],
};

wendy.metadata = {
  category: require('../').category,
  description: 'A custom cmd for our second patron!',
  usage: 'wendy',
  example: 'wendy',
  perm: [['public.info.support.support']],
  customperm: ['SEND_MESSAGES'],
};

masontcg.metadata = {
  category: require('../').category,
  description: 'A custom cmd for our third patron!',
  usage: 'masontcg',
  example: 'masontcg',
  perm: [['public.info.support.support']],
  customperm: ['SEND_MESSAGES'],
};

quantiom.metadata = {
  category: require('../').category,
  description: 'A custom cmd for our fourth patron!',
  usage: 'quantiom',
  example: 'quantiom',
  perm: [['public.info.support.support']],
  customperm: ['SEND_MESSAGES'],
};

patrons.metadata = {
  category: require('../').category,
  description: 'A cmd to see all of our patrons!',
  usage: 'patrons',
  example: 'patrons',
  perm: [['public.info.support.support']],
  customperm: ['SEND_MESSAGES'],
};

console.log('[CPSCMD][UTILITY][perm] Build objects complete!');
module.exports = [
  [tdl.name, tdl],
  ['tdl', tdl],
  ['thedarklurch', tdl],
  [wendy.name, wendy],
  [masontcg.name, masontcg],
  [quantiom.name, quantiom],
  [patrons.name, patrons],
];
