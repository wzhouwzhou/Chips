let silence = require('./silence');
let unsilence = require('./unsilence');
let deafen = require('./deafen');
let undeafen = require('./undeafen');

console.log('[CPSCMD][VOICEMODERATION][VoiceModeration] Building objects...');

silence.metadata = {
  category: require('../').category,
  description: 'This command lets you Voice Mute server members!',
  usage: 'silence <User>',
  example: 'silence @周珺 • WillyZ#6686',
  perm: [['global.moderation.voicemoderation.silence']],
  customperm: ['MUTE_MEMBERS'],
};
unsilence.metadata = {
  category: require('../').category,
  description: 'This command lets you unmute people!',
  usage: 'unsilence <User>',
  example: 'unsilence @JohnSmith#0000',
  perm: [['global.moderation.voicemoderation.unsilence']],
  customperm: ['MUTE_MEMBERS'],
};
deafen.metadata = {
  category: require('../').category,
  description: 'This command lets you deafen people!',
  usage: 'deafen <User>',
  example: 'deafen @JohnSmith#0000',
  perm: [['global.moderation.voicemoderation.deafen']],
  customperm: ['DEAFEN_MEMBERS'],
};
undeafen.metadata = {
  category: require('../').category,
  description: 'This command lets you undeafen people!',
  usage: 'undeafen <User>',
  example: 'undeafen @JohnSmith#0000',
  perm: [['global.moderation.voicemoderation.undeafen']],
  customperm: ['DEAFEN_MEMBERS'],
};

console.log('[CPSCMD][MODERATION][voicemoderation] Build objects complete!');
module.exports = [
  [silence.name,silence],
  [unsilence.name,unsilence],
  [deafen.name,deafen],
  [undeafen.name,undeafen]
];
