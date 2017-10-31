let music = require('./music');

console.log('[CPSCMD][CHIPSMUSIC][music] Building objects...');

music.metadata = {
  category: require('../').category,
  description: 'This command controls chips music!',
  usage: 'music <args>',
  example: 'music demo',
  perm: [['global.chipsmusic.music.play']],
};

console.log('[CPSCMD][CHIPSMUSIC][music] Build objects complete!');
module.exports = [
  [music.name, music],
];
