<<<<<<< HEAD
const fails = [
  'You so dumb, you think Cheerios are doughnut seeds.',
  'If you really spoke your mind, you\'d be speechless.',
  'You\'re the reason the gene pool needs a lifeguard.',
  'There is no vaccine against stupidity.',
  'If being ugly were a crime, you\'d get a life sentence.',
  'I\'d ban you, but that would be animal abuse.',
  'You bring everyone a lot of joy, when you leave the server.',
  'You shouldn\'t play hide and seek, no one would look for you.',
  'If I wanted to kill myself I\'d climb your ego and jump to your IQ.',
  'We all sprang from apes, but you didn\'t spring far enough.',
  'If you were on fire and I had water, I\'d drink it.',
  'If I had a face like yours I\'d wish I was blind.',
  'Calling you an idiot would be an insult to all stupid people.',
];

const a = require('nodecpp-test').arrays;


module.exports = {
  name: 's',
  func(msg, { send, author, suffix, Constants, args, client, content }) {
=======
module.exports = {
  name: 's',
  func(msg, { send, author, suffix, Constants }) {
>>>>>>> parent of e87619dc... idk
    if (author.id === Constants.users.WILLYZ ||
      author.id === Constants.users.EVILDEATHPRO ||
      author.id === Constants.users.LUCAS ||
      author.id === Constants.users.HORIZON ||
      author.id === '166630166825664512'
    ) {
      // Antonio, 166..12
<<<<<<< HEAD
      if (args[0] === 'roast') {
        msg.delete().catch(_ => _);
        return send(`${msg.mentions.members.first()}, ${a.sample(fails)}`);
      } if (args[0] === 'channel' || 'c') {
        msg.delete().catch(_ => _);
        return client.channels.get(`${args[1]}`).send(`${content.substring(content.indexOf(args[2]))}`);
      } if (!args[0] === 'roast' || 'channel' || 'c') {
        msg.delete().catch(_ => _);
        return send(suffix, { disableEveryone: true });
      }
      return true;
=======

      msg.delete().catch(_ => _);
      return send(suffix, { disableEveryone: true });
>>>>>>> parent of e87619dc... idk
    }
    return true;
  },
};
