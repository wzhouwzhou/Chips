
let ping = require('./ping');
console.log('[CPSCMD][INFO][ping] Building objects...');
ping.category = require('../').category;
ping.description = 'Gives ping for various actions with chips, and also rates a weighted average!';
console.log('[CPSCMD][INFO][ping] Build objects complete!');
module.exports = [
  [ping.name,ping]
];
