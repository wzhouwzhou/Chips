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
    let desc = '', fields = [''], i = 0;
    for (let j = 0; j < valids.length; j++) {
      let user = valids[j].tag;
      if (`${desc}${user}\n`.length < 2000) {
        desc += `${user}\n`;
      } else {
        if (!fields[i]) fields[i] = '';
        if (`${fields[i]}${user}\n`.length < 1000) {
          fields[i] += `${user}\n`;
        } else {
          j--;
          i++;
        }
      }
    }
    embed.setDescription(desc.trim());
    for (const f of fields) embed.addField('\u200B', f.trim());
    embed.setTitle(query === author.discriminator ?
      `Users I know of with your discriminator of ${query}` :
      `Users with the discriminator ${query}`
    );
    if (guild) {
      const inServer = guild.members.filter(m => valids.map(u => u.id).includes(m.id));
      if (inServer.size !== 0) {
        let first = '', mentions = Array.from(inServer.values()).map(e => e + []);
        fields = [];
        i = 0;
        for (let j = 0; j < mentions.length; j++) {
          let mention = mentions[j];
          if (`${first}${mention}\n`.length < 1000) {
            first += `${mention}\n`;
          } else {
            if (!fields[i]) fields[i] = '';
            if (`${fields[i]}${mention}\n`.length < 1000) {
              fields[i] += `${mention}\n`;
            } else {
              j--;
              i++;
            }
          }
        }
        embed.addField(`${inServer.size} of those people are here!`, first.trim());
        for (const f of fields) embed.addField('\u200B', f.trim());
      }
    }
    return send(embed);
  },
};
