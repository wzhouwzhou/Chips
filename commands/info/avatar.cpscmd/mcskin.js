const snek = require('snekfetch');
const qs = require('querystring');

module.exports = {
  name: 'mcskin',
  async func(msg, { send, reply, guild, member, Discord, suffix }) {
    const result = await snek.get(`https://api.mojang.com/users/profiles/minecraft/${qs.escape(suffix)}`);
    if (result.status === 204) return reply(`No mc user with a username of ${suffix} found.`, { disableEveryone: !0 });
    const { id, name } = result.body;
    const skin = (await snek.get(`https://crafatar.com/renders/body/${qs.escape(id)}`)).body;
    const embed = new Discord.MessageEmbed()
      .setTitle(`MC Skin of ${name}`)
      .attachFiles([{ attachment: skin, name: 'skin.png' }])
      .setImage(`attachment://skin.png`)
      .setColor(guild ? member.displayColor : 407394);
    return send(embed);
  },
};
