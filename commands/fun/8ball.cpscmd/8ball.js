const answer = [
  'Ok!',
  'No.',
  'Yes!',
  'Maybe.',
  '{shardusercount} people would agree.',
  'I think so.',
  'I doubt it.',
  'It is decidedly so',
  'Without a doubt',
  'Yes, definitely',
  'You may rely on it',
  'As I see it, yes',
  'Most likely',
  'Outlook good',
  'Signs point to yes',
  'Reply hazy try again',
  'Ask again later',
  'Better not tell you now',
  'Cannot predict now',
  'Concentrate and ask again',
  "Don't count on it",
  'My reply is no',
  'My sources say no',
  'Outlook not so good',
  'Indeed',
];

module.exports = {
  name: '8ball',
  func(msg, { send, args, suffix, Discord, member, client }) {
    if (!args[0]) return send('Do you have a question?');
    if (suffix.split('').reverse()[0] !== '?') return send('Question mark?');

    const embed = (new Discord.MessageEmbed)
      .setDescription(`🎱 **| ${
        answer[~~(answer.length * Math.random())]
          .replace(/\{shardusercount\}/g, client.users.size)
      }**`)
      .setColor(member ? member.displayColor : 34203);

    return send(embed);
  },
};
