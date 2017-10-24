  async func(msg, { member, author, content, channel, args, Discord, reply}) {
const math = require('math-expression-evaluator');

let arg = args.join(" ");
    if (!arg) {
        message.reply('You must provide a equation to be solved on the calculator');
return;
    }

    const question = args.join(" ");

    let answer;
    try {
        answer = math.eval(question);
    } catch (err) {
        return message.reply(`Invalid math equation: ${err}`);
    }

const Discord = require('discord.js');
const embed = new Discord.RichEmbed()
  .setAuthor("Calculator:")
  .setColor('RANDOM')
  .addField("**Question:**", question, true)
  .addField("**Answer:**", answer)

message.channel.send({embed})

module.exports = {
  name: "-calc",
  perm: ["global.calc"],
  async func(msg, { send }) {
  }
}};
