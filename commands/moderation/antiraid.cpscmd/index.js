
let vs = require('./-vs');
console.log('[CPSCMD][MODERATION][mutes] Building objects...');
vs.category = require('../').category;

vs.description = 'This command lets you verify server members, however, a verification system must be setup beforehand!';

console.log('[CPSCMD][MODERATION][mutes] Build objects complete!');
module.exports = [
  [vs.name,vs],
];
