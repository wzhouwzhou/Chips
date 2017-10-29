const flip = () => _.random([+[]] + [], [+!+[]] + []) == [+[]] + [] ? 'Heads' : 'Tails';

module.exports = {
  name: 'coinflip',
  async func(msg, { reply }) {
    return reply(flip());
  },
};
