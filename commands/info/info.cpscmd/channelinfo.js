<<<<<<< HEAD
=======
/* eslint complexity: 'off', no-console: 'off' */
const path = require('path');
const Searcher = require(path.join(__dirname, '../../../handlers/Searcher')).default;
>>>>>>> 71880e581f2c707c99b9e85836f15e4036e3e013
const moment = require('moment');
const cnsfwimg = 'https://cdn.discordapp.com/attachments/294328677095964672/458495588112269312/textchannel-v2-nsfw.png',
  cvoiceimg = 'https://cdn.discordapp.com/attachments/294328677095964672/458495589454446602/voicechannel-v2.png',
  ctextimg = 'https://cdn.discordapp.com/attachments/294328677095964672/458495586539405315/textchannel-v2.png',
  ccatimg = 'https://cdn.discordapp.com/attachments/294328677095964672/458495585524252682/category-v2.png';

module.exports = {
<<<<<<< HEAD
  name: 'rmembers',
  async func(msg, { send, member, guild, args, Discord, content, channel }) {
    try {
      let info = await permissions.checkMulti(msg, ['global.info.info.channel']);
      console.log(`[Command] ${info}`);
    } catch (err) {
      if (!member.hasPermission(this.metadata.customperm[0])) {
        console.log(`Rejected info channel to ${used.id}`);
        return msg.reply(err);
      }
    }
    let channel;
    if (!args[1]) channel = msg.channel;
    if (!channel) {
      try {
        channel = args[1].substring(2, args[1].length - 1);
        console.log(`Trying to find channel from link ${channel}`);
        channel = guild.channels.get(channel);
        if (!channel) throw new Error('NotChannelId');
      } catch (err) {
        channel = content.substring(`${prefix}info ${action} `.length);
=======
  name: 'channelinfo',
  async func(msg, { send, member, content, args, guild, author, Discord, suffix }) {
    if (!guild) return send('You must use this command in a server');
    try {
      let info = await global.permissions.checkMulti(msg, ['global.info.info.channel']);
      console.log(`[Command] ${info}`);
    } catch (err) {
      if (!member.hasPermission(this.metadata.customperm[0])) {
        console.log(`Rejected info channel to ${author.id}`);
        return msg.reply(err);
      }
    }
    if (guild) {
      global.searchers[guild.id] = new Searcher(guild);
    }
    let channel;
    if (!args[0]) channel = msg.channel;
    if (!channel) {
      try {
        channel = content.match(/(\d+)/);
        console.log(`Trying to find channel from link ${channel}`);
        if (!channel || !channel[1]) throw new Error('No Channel ID');
        channel = guild.channels.get(channel[1]);
        if (!channel) throw new Error('No Channel');
      } catch (err) {
        channel = suffix;
>>>>>>> 71880e581f2c707c99b9e85836f15e4036e3e013
        let list = global.searchers[guild.id].searchChannel(channel);
        if (list.length > 1) {
          await send('Multiple matches found, using first one..');
        } else if (list.length < 1) {
          return send(new Discord.MessageEmbed().setColor(member.displayColor).setDescription(`Channel [${channel}] not found!`));
        }
        channel = list[0];
      }
    }
<<<<<<< HEAD
=======

>>>>>>> 71880e581f2c707c99b9e85836f15e4036e3e013
    let diff = channel ? moment().diff(channel.createdAt, 'days') : '∞';

    const posn = channel.position + 1;
    const last = posn % 10;
    const pos = last === 1 ? '1st' : last === 1 ? '2nd' : last === 3 ? '3rd' : `${posn}th`;
    const embed = new Discord.MessageEmbed;
<<<<<<< HEAD
    embed.setTitle(`${channel.type[0].toUpperCase()}${channel.type.slice(1).toLowerCase()} ${channel.type === 'category' ? '' : 'Channel'} ${channel.type === 'text' ? '#' : ''}${channel.name}`);
    embed.setFooter(`Channel ID: ${channel.id} | Requested by ${author.tag}`);
    if (channel.type === 'text') {
      embed.setDescription(`**Topic:** ${channel.topic}`);
      embed.addField(`Created ${diff} days ago on ${channel.createdAt.toUTCString()}`,
        `${pos} channel under "${channel.parent.name}" category`);
      embed.addField(`${channel.members.filter(m => ['online', 'idle', 'dnd'].includes(m.presence.status)).size}/${channel.members.size} members with access available.`,
        `${channel.permissionOverwrites.size} permission overwrites.`);
=======
    embed.setTitle(`${channel.type[0].toUpperCase()}${channel.type.slice(1).toLowerCase()} ${channel.type === 'category' ? '' : 'Channel'
    } ${channel.type === 'text' ? '#' : ''}${channel.name}`);
    embed.setFooter(`Channel ID: ${channel.id} | Requested by ${author.tag}`);
    if (channel.type === 'text') {
      embed.setDescription(`**Topic:** ${channel.topic || 'None'}`);
      embed.addField(`Created ${diff} days ago on ${channel.createdAt.toUTCString()}`,
        `${pos} channel under "${channel.parent.name}" category`);
      embed.addField(`${channel.members.filter(m => ['online', 'idle', 'dnd'].includes(m.presence.status)).size}/${channel.members.size
      } members with access available.`,
      `${channel.permissionOverwrites.size} permission overwrite${channel.permissionOverwrites.size === 1 ? '' : 's'}.`);

>>>>>>> 71880e581f2c707c99b9e85836f15e4036e3e013
      if (channel.nsfw) {
        embed.setThumbnail(cnsfwimg);
      } else {
        embed.setThumbnail(ctextimg);
      }
    } else if (channel.type === 'voice') {
      embed.setThumbnail(cvoiceimg);
      embed.addField(`Created ${diff} days ago on ${channel.createdAt.toUTCString()}`,
        `${pos} channel under "${channel.parent.name}" category.`);
<<<<<<< HEAD
      embed.addField(`${channel.members.size || 'No'}${channel.userLimit ? `/${channel.userLimit}` : ''} member${channel.members.size === 1 ? '' : 's'} connected.`,
        `${channel.permissionOverwrites.size} permission overwrites.`);
    } else if (channel.type === 'category') {
      embed.setDescription(`Created ${diff} days ago on ${channel.createdAt.toUTCString()}`);
      embed.addField(`${pos} category on the sidebar.`, `${channel.permissionOverwrites.size} permission overwrites.`);
=======
      embed.addField(`${channel.members.size || 'No'}${channel.userLimit ? `/${channel.userLimit}` : ''} member${
        channel.members.size === 1 ? '' : 's'} connected.`,
      `${channel.permissionOverwrites.size} permission overwrite${channel.permissionOverwrites.size === 1 ? '' : 's'}.`);
    } else if (channel.type === 'category') {
      embed.setDescription(`Created ${diff} days ago on ${channel.createdAt.toUTCString()}`);
      embed.addField(`${pos} category on the sidebar.`,
        `${channel.permissionOverwrites.size} permission overwrite${channel.permissionOverwrites.size === 1 ? '' : 's'}.`);
>>>>>>> 71880e581f2c707c99b9e85836f15e4036e3e013
      embed.setThumbnail(ccatimg);
      embed.setFooter(`Category ID: ${channel.id} | Requested by ${author.tag}`);
    }
    embed.setColor(guild.owner.displayColor || guild.me.displayColor || 1);
    return send(embed);
  },
};
