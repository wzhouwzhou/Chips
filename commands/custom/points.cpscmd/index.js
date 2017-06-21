
let points = require('./points');

console.log('[CPSCMD][UTILITY][points] Building objects...');

points.metadata = {
  category: require('../').category,
  description: 'This custom command shows user points in sinbad knights!',
  usage: 'points <user>',
  example: 'points @周珺 • WillyZ#6686',
  perm: [['global.custom.points.*'],'global.custom.points.self','global.custom.points.other'],
};

console.log('[CPSCMD][UTILITY][points] Build objects complete!');
module.exports = [
  [points.name,points],
];
