let selfrole = require('./selfrole');

console.log('[CPSCMD][UTILITY][selfrole] Building objects...');

selfrole.metadata = {
  category: require('../').category,
  description: 'This custom gives an user a selfrole in Duckio Discord!',
  usage: 'selfrole <role>',
  example: 'selfrole Straight',
  perm: [['global.custom.*']],
};

console.log('[CPSCMD][UTILITY][selfrole] Build objects complete!');
module.exports = [
  [selfrole.name, selfrole],
];
