
let translate = require('./translate');
console.log('[CPSCMD][UTILITY][translate] Building objects...');
translate.metadata = {
  category: require('../').category,
  description: 'This command translates some text!',
  usage: 'translate <text> <targ(et)(:)(lang)(uage)(:) some language>',
  example: 'translate ¡Hola! target:en',
  perm: [['global.utility.translate.translate']],
  customperm: ['SEND_MESSAGES'],
};

console.log('[CPSCMD][UTILITY][translate] Build objects complete!');
module.exports = [
  [translate.name,translate],
];
