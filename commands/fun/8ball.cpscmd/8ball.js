const answer = [
  'Ok!',
  'No.',
  'Yes!',
  'Maybe.',
  '{shardusercount} people would agree.',
  'Eat chips!',
];

module.exports = {
  name: '8ball',
  func(msg, { send, args, suffix, Discord, member, client }) {
    if (!args[0]) return send('Do you have a question?');

    if (suffix.split('').reverse()[0] !== '?') return send('Question mark?');

    const embed = (new Discord.MessageEmbed)
      .setDescription(`🎱 | **${
        answer[~~(answer.length * Math.random())]
          .replace(/\{shardusercount\}/g, client.users.size)
      }**`)
      .setColor(member ? member.displayColor : 34203);

    return send(embed);
  },
};
