let st = require('./stoptyping');

console.log('[CPSCMD][UTILITY][stoptyping] Building objects...');

st.metadata = {
  category: require('../').category,
  description: 'This command stops the bot from typing if it is stuck!',
  usage: 'stoptyping',
  example: 'stoptyping',
  perm: [['global.utility.stoptyping.stoptyping']],
  customperm: ['ADMINISTRATOR'],
};

console.log('[CPSCMD][UTILITY][stoptyping] Build objects complete!');
module.exports = [
  [st.name, st],
  [st.name, 'stoptying'],
];
