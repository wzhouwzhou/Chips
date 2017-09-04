
let password = require('./password');

console.log('[CPSCMD][UTILITY][password] Building objects...');

password.metadata = {
  category: require('../').category,
  description: 'This command generates a cryptographically strong password!',
  usage: 'password',
  example: 'password',
  perm: [['global.utility.password.password']],
  customperm: ['SEND_MESSAGES'],
};

console.log('[CPSCMD][UTILITY][password] Build objects complete!');
module.exports = [
  [password.name,password],
];
