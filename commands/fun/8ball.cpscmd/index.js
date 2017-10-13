
let ball = require('./8ball');

console.log('[CPSCMD][INFO][ball] Building objects...');
ball.metadata = {
  category: require('../').category,
  description: 'This answers your questions!',
  usage: 'ball [question]',
  example: 'ball Hello?',
  perm: [['global.8ball.*']],
  customperm: ['SEND_MESSAGES'],
};
console.log('[CPSCMD][INFO][ball] Build objects complete!');
module.exports = [
  [ball.name,ball],
  ['8ball', ball],
  ['8', ball],
];
