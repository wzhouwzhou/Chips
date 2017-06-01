
let stats = require('./stats');
console.log('[CPSCMD][INFO][stats] Building objects...');
stats.category = require('../').category;
stats.description = 'Gives stats for chips including guild/user count, cpu usage, and more!';
console.log('[CPSCMD][INFO][stats] Build objects complete!');
module.exports = [
  [stats.name,stats]
];
