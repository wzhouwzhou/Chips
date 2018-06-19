const moment = require('moment');

module.exports = {
  name: 'serverinfo',
  async func(msg, { send, guild, author, Discord }) {
    const diff = moment().diff(guild.createdAt, 'days'),
      botc = guild.members.filter(mm => mm.user.bot).size;
    const available = guild.presences.filter(presence => ['online', 'idle', 'dnd'].includes(presence.status)).size;
    const embed = new Discord.MessageEmbed;
    embed.setThumbnail(guild.iconURL({ format: 'png', size: 512 }));
    embed.setTitle(guild.name);
    embed.addField(`Server owner: ${guild.owner.user.tag}`, `Created ${diff} days ago on ${guild.createdAt.toUTCString()}`);
    embed.addField(`${available}/${guild.members.size} members online, ${botc} bots`,
      `${guild.emojis.size} emojis | ${guild.roles.filter(rr => rr.members.size).size}/${guild.roles.size} roles used`);
    embed.addField(`${guild.channels.size} channels: ${guild.channels.filter(c => c.type === 'voice').size} voice and ${guild.channels.filter(c => c.type === 'category').size} categories`,
      `Voice region: ${guild.region} | Verification level: ${guild.verificationLevel}`);
    embed.setColor(guild.owner.displayColor || guild.me.displayColor || 1);
    embed.setFooter(`Server id: ${guild.id} | Requested by ${author.tag}`);
    return send(embed);
  },
};
