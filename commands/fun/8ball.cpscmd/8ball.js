const answer = [
  'Ok!',
  'No.',
  'Yes!',
  'Maybe.',
];

const embed = (new Discord.MessageEmbed)
      .setDescription(`🎱 | ${(answer[~~(answer.length * Math.random())])}`)
      .setColor(member.displayColor);

module.exports = {
  name: '8ball',
  async func(msg, { send, args, suffix, member }) {
    if (!args[0]) return send('Do you have a question?');

    if (suffix.split('').reverse()[0]!=='?') return send('Question mark?');

    if (author.id = '205608598233939970')
      return send('lucas is a narb')

    if (args[0]) return send(embed)

  },
};
