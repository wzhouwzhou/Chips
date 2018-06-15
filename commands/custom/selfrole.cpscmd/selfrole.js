const duckioselfroles = [
  'GiveawayNotify',
  'Giveaway Notify',
  '441248018688376842',
  'EventNotify',
  '451064283518730240',
  'XP-Suspended',
  'XP Suspended',
  '344421529817186305',
];
const replace = {
  'XP Suspended': '344421529817186305',
  'Giveaway Notify': '441248018688376842',
};
module.exports = {
  name: 'selfrole',
  async func(msg, { send, member, guild, suffix, Discord }) {
    if (!guild) return send('This command must be used in a server');

    if (guild.id !== '274260111415836675') {
      return send("Selfroles haven't been enabled in your server");
    }

    let targetR = duckioselfroles.filter(r => r.toLowerCase().includes(suffix.toLowerCase()));
    if (!targetR || targetR.length === 0) {
      return send(new Discord.MessageEmbed().setColor('RANDOM').setDescription(`Selfrole [${suffix}] not found`));
    }
    if (targetR.length > 1) {
      return send(new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setTitle(`Ambiguous selfrole for search [${suffix}]`)
        .setDescription(`**Please use the selfrole command again for any these role names:** \x60\x60\x60fix\n${
          targetR.map(r => r.name.replace(/\x60/g, '\x60\u200B'))
            .join('\n')
            .substr(0, 1950)
        }\x60\x60\x60`));
    }
    let targetRole = guild.roles.find('name', `${replace[targetR[0]] || targetR[0]}`);

    if (member.roles.has(targetRole.id)) {
      await member.removeRole(targetRole.id);
      return send(`Succesfully removed ${targetR.name} from ${member + []}!`);
    } else {
      await member.addRole(targetRole.id);
      send(`Succesfully gave ${member + []} ${targetR.name}!`);
    }
    return true;
  },
};
