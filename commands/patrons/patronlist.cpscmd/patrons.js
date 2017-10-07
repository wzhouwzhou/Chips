module.exports = {
  name: "patrons",
  async func(msg, { send, member, guild, Discord, prefix }) {
    const embed = new Discord.RichEmbed()
    .setAuthor('Here are all of the commands for Chips Patrons!')
    .setTitle('A huge thanks to the following people for supporting Chips in the best way possible!')
    .setDescription([
      'tdl',
      'wendy',
    ].map(e=>`**${_.escapeRegExp(prefix)}${e}**`).join('\n'))
    .setTimestamp(new Date)
    .setColor(guild?member.displayColor:1)
    .setFooter(`If you're interested in supporting the bot, check out the last page in the ${_escapeRegExp(prefix)}help menu!`);
      await send("Loading......").then(m => m.delete(200));
      return send('', { embed });
  }
};
