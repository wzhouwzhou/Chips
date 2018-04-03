const _ = require('lodash');

module.exports = {
  name: 'discriminator',
  func(msg, { send, author, guild, args, client, Discord }) {
    let query;
    const embed = new Discord.MessageEmbed();

    if (!args) {
      query = author.discriminator;
    } else if (args && args[0]) {
      if (args[0].match(/^\d{4}$/)) {
        query = args[0];
      } else {
        embed.setDescription(`Invalid discriminator of ${_.escapeRegExp(args[0]).replace(/@/g, '(at)')}. ` +
        'Discord discriminators are four numbers long');
        embed.setTitle('<:command_failure:391439681981513728> Invalid discrim');
        embed.setFooter(`Triggered by ${author.tag}`).setTimestamp();
        return send(embed);
      }
    }
    const valids = Array.from(client.users.filter(u => u.discriminator === query).values());
    embed.setDescription(valids.map(u => u.tag).join('\n'));
    embed.setTitle(query === author.discriminator ?
      `Users I know of with your discriminator of ${query}` :
      `Users with the discriminator ${query}`
    );
    if (guild) {
      const inServer = guild.members.filter(m => valids.map(u => u.id).includes(m.id));
      if (inServer.size !== 0) {
        const inServerList = Array.from(inServer.values()).map(e => e + []).join('\n');
        embed.addField(`${inServer.size} of those people are here!`, inServerList);
      }
    }
    return send(embed);
  },
};
