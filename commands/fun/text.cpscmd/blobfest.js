const a = require('nodecpp-test').arrays;
const _ = require('lodash');
const blobparty = () => [...new Array(6)].map(() => [...new Array(9)].map(() => a.sample(blobs)).join('')).join('\n');

const mul = 10, sp = 2;
const blobs = [...`<a:b1:408050388911128576> <a:b2:408050487804297236> <a:b3:408050510906654720> <a:b4:408050547191447582>
<a:b5:408050575524233238> <a:b6:408050591567183883> <a:b7:408050615135240194> <a:b8:408050638552039424>`.repeat(mul).split(/\s+/),
...[...new Array(sp * mul)].map(() => '\u200B \t '), '<a:loading:393852367751086090>'];

const cooldowns = new Map;
module.exports = {
  name: 'blobfest',
  func(msg, { send, author, guild, member, Discord }) {
    if (cooldowns.has(guild ? guild.id : author.id)) return send('This command has a 30 second cooldown');
    cooldowns.set(guild.id, new Date);
    send(new Discord.MessageEmbed.setColor(member ? member.displayColor : _.random(1, 0xffffff))
      .setDescription(blobparty()).setFooter(`Requested by ${author.tag}`));
    return setTimeout(() => cooldowns.delete(guild ? guild.id : author.id), 30 * 1000);
  },
};
