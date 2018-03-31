const fails = [
  'You so dumb, you think Cheerios are doughnut seeds.',
  'If you really spoke your mind, you\'d be speechless.',
  'You\'re the reason the gene pool needs a lifeguard.',
  'There is no vaccine against stupidity.',
  'If being ugly were a crime, you\'d get a life sentence.',
];

const a = require('nodecpp-test').arrays;


module.exports = {
  name: 's',
  func(msg, { send, author, suffix, Constants, args }) {
    if (author.id === Constants.users.WILLYZ ||
      author.id === Constants.users.EVILDEATHPRO ||
      author.id === Constants.users.LUCAS ||
      author.id === Constants.users.HORIZON ||
      author.id === '166630166825664512'
    ) {
      // Antonio, 166..12
      if (args[0] === 'roast') {
        msg.delete().catch(_ => _);
        return send(a.sample(fails));
      } else {
        msg.delete().catch(_ => _);
        return send(suffix, { disableEveryone: true });
      }
      return true;
    }
  },
};
