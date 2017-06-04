
let translate = require('./translate');
console.log('[CPSCMD][UTILITY][translate] Building objects...');
translate.metadata = {
  category: require('../').category,
  description: 'This command translates some text!'
};

console.log('[CPSCMD][UTILITY][translate] Build objects complete!');
module.exports = [
  [translate.name,translate],
];
