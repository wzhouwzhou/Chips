const normalans = [
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

const posans = [
  'Yes',
  '{shardusercount} people would agree',
  'I think so',
  'It is decidedly so',
  'Without a doubt',
  'Yes, definently',
  'As I see it, yes',
  'Most likely',
  'Outlook good',
  'Signs point to yes',
  'Indeed',
];

const negans = [
  'No',
  'Maybe',
  'I doubt it',
  'You may rely on it',
  'Reply hazy try again',
  'Ask again later',
  'Better not tell you now',
  'Cannot predict now',
  'Concentrate and ask again',
  "Don't count on it",
  'My reply is no',
  'My sources say no',
  'Outlook not so good',

];

module.exports = {
  name: '8ball',
  func(msg, { send, args, suffix, Discord, member, client }) {
    if (!args[0]) return send('Do you have a question?');
    if (suffix.split('').reverse()[0] !== '?') return send('Question mark?');

    if (~suffix.indexOf('love', 'life', 'friend', 'like')) {
    const embed = (new Discord.MessageEmbed)
      .setDescription(`🎱 **| ${
        posans[~~(posans.length * Math.random())]
          .replace(/\{shardusercount\}/g, client.users.size)
      }**`)
      .setColor(member ? member.displayColor : 34203);

    return send(embed);
    } 
    
    if (~suffix.indexOf('hate', 'run', 'roast', 'dislike', 'like')) {
      const embed = (new Discord.MessageEmbed)
        .setDescription(`🎱 **| ${
          negans[~~(negans.length * Math.random())]
            .replace(/\{shardusercount\}/g, client.users.size)
        }**`)
        .setColor(member ? member.displayColor : 34203);
  
      return send(embed);
    } 
    
    else {
      const embed = (new Discord.MessageEmbed)
        .setDescription(`🎱 **| ${
          normalans[~~(normalans.length * Math.random())]
            .replace(/\{shardusercount\}/g, client.users.size)
        }**`)
        .setColor(member ? member.displayColor : 34203);

      return send(embed);
    }
  },
};
