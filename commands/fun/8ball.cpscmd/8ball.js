const answer = [
  'Ok!',
  'No.',
  'Yes!',
  'Maybe.',
];

module.exports = {
  name: '8ball',
  func(msg, { send, args, suffix, author, Discord, member }) {
    if (!args[0]) return send('Do you have a question?');

    if (suffix.split('').reverse()[0] !== '?') return send('Question mark?');

    if (author.id === '205608598233939970') return send('lucas is a narb');

    const embed = (new Discord.MessageEmbed)
      .setDescription(`🎱 | ${(answer[~~(answer.length * Math.random())])}`)
      .setColor(member ? member.displayColor : 34203);

      return send(embed);
  },
};
