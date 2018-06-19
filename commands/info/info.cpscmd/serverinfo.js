const moment = require('moment');
const regionreplaced = {
  'eu-central': [':flag_eu:', 'Central Europe'],
  'eu-west': [':flag_eu:', 'Western Europe'],
  brazil: [':flag_br:', 'Brazil'],
  hongkong: [':flag_hk:', 'Hong Kong'],
  japan: [':flag_jp:', 'Japan'],
  russia: [':flag_ru:', 'Russia'],
  singapore: [':flag_sg:', 'Singapore'],
  sydney: [':flag_au:', 'Sydney'],
  'us-central': [':flag_us:', 'Central US'],
  'us-east': [':flag_us:', 'Eastern US'],
  'us-south': [':flag_us:', 'Southern US'],
  'us-west': [':flag_us:', 'Western US'],
  'vip-amsterdam': [':flag_nl:', 'Amsterdam (VIP)'],
  'vip-us-east': [':flag_us:', 'Eastern US (VIP)'],
  'vip-us-west': [':flag_us:', 'Western US (VIP)'],
};

module.exports = {
  name: 'serverinfo',
  func(msg, { send, guild, author, Discord }) {
    const diff = moment().diff(guild.createdAt, 'days'),
      botc = guild.members.filter(mm => mm.user.bot).size;
    const available = guild.presences.filter(presence => ['online', 'idle', 'dnd'].includes(presence.status)).size;
    const embed = new Discord.MessageEmbed;
    embed.setThumbnail(guild.iconURL({ format: 'png', size: 512 }));
    embed.setTitle(guild.name);
    embed.addField(`Server owner: ${guild.owner.user.tag}`, `Created ${diff} days ago on ${guild.createdAt.toUTCString()}.`);
    embed.addField(`${available}/${guild.members.size} members available, ${botc} bots.`,
      `${guild.emojis.size} emojis | ${guild.roles.filter(rr => rr.members.size).size}/${guild.roles.size} roles used`);
    embed.addField(`${guild.channels.size} channels: ${guild.channels.filter(c => c.type === 'voice').size} voice and ${
      guild.channels.filter(c => c.type === 'category').size} categories.`,
    `Voice region: ${regionreplaced[guild.region][0]}${regionreplaced[guild.region][1]} | Verification level: ${guild.verificationLevel}`);

    embed.setColor(guild.owner.displayColor || guild.me.displayColor || 1);
    embed.setFooter(`Server ID: ${guild.id} | Requested by ${author.tag}`);
    return send(embed);
  },
};
