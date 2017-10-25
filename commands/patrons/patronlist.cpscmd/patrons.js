module.exports = {
  name: "patrons",
  async func(msg, { send, member, guild, Discord, prefix }) {
    const embed = new Discord.MessageEmbed()
    .setAuthor('Here are all of the commands for Chips Patrons!')
    .setTitle('A huge thanks to the following people for supporting Chips in the best way possible!')
    .setDescription([
      `${_.escapeRegExp(prefix)}tdl`,
      `${_.escapeRegExp(prefix)}wendy`,
    ].map(e=>`**${_.escapeRegExp(prefix)}${e}**`).join('\n'))
    .setTimestamp(new Date)
    .setColor(guild?member.displayColor:1)
    .setFooter('If you\'re interested in becoming a patron, check out the last page in the help menu!');
      await send("Loading......").then(mm=>mm.delete({timeout: 3000}));
      return send('', { embed });
  }
};
