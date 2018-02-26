/* eslint: indent: 'off' */
const Discord = require('discord.js');
const img_bwroles = 'https://cdn.discordapp.com/attachments/385987386804404224/409862835338739715/2-2.png',
  img_bwsupport = 'https://cdn.discordapp.com/attachments/385987386804404224/409865961026617346/online-support.png',
  img_bwstaff = 'https://cdn.discordapp.com/attachments/385987386804404224/409859433146089486/4-1.png',
  img_bwinfo = 'https://cdn.discordapp.com/attachments/385987386804404224/409859366963904513/3_1.png',
  img_bwtwitter = 'https://cdn.discordapp.com/attachments/385987386804404224/409865614820114432/Sin_titulo-3_al_100_RGB_8___14_01_2018_07_40_03_p._m._2.png',
  img_bwsteam = 'https://cdn.discordapp.com/attachments/385987386804404224/409865813839839233/Sin_titulo-1_al_100_Capa_2_RGB_8___14_01_2018_07_43_48_p._m._2.png',

  title_bwinfo = 'What is this server about?',
  title_bwstaff = 'Who are Staff?',
  title_bwroles = 'How do I get some fancy roles and shiny colours?',
  title_bwsupport = 'Online Support',
  title_bwtwitter = "This Server's Twitter!",
  title_bwsteam = "This Server's Steam!",
  title_bwinvite = 'Invite your friends!',

  desc_bwinfo = `¤This is an anime themed community mixed with something more!
¤ Has a lot of channels, active voice chats, and selfroles for you to choose!
¤ Friendly and active community and staff!
¤ Great help from everyone who helps the server grow!`,
  desc_bwstaff = `Anyone with the |BW| Staff role!
These people are here to make your experience here better! Look on the right member sidebar for anyone with Moderator and up and mention them or send a direct message if you need anything!`,
  desc_bwroles = `We have hundreds of roles available! Staff roles are Moderator +. Level roles are gained simply by chatting. Do !levels to learn more.
For information regarding self assigned roles, read <#417400871899365396>. Several color roles exist`,
  desc_bwsupport = 'You can approach anyone with the `ONLINE SUPPORT` role and know your feelings will be respected if you need any emotional support or just want to talk about something!',
  desc_bwinvite = '** https://discord.gg/8ZtDDhK\nhttps://guilds.chipsbot.me/baka_world **',

  embed_bwinvite = new Discord.MessageEmbed()
    .setTitle(title_bwinvite)
    .setDescription(desc_bwinvite)
    .setColor('010000'),

  embed_info = new Discord.MessageEmbed()
    .attachFiles([new Discord.MessageAttachment(img_bwinfo, 'bw_info.png')])
    // .setImage('attachment://img_bwinfo.png')
    .setTitle(title_bwinfo)
    .setDescription(desc_bwinfo),

  embed_online_support = new Discord.MessageEmbed()
    .setColor('FF3344')
    .attachFiles([new Discord.MessageAttachment(img_bwsupport, 'bw_online_support.png')])
    // .setImage('attachment://bw_online_support.png')
    .setTitle(title_bwsupport)
    .setDescription(desc_bwsupport),

  embed_staff = new Discord.MessageEmbed()
    .setColor('2469FF')
    .attachFiles([new Discord.MessageAttachment(img_bwstaff, 'bw_staff.png')])
    // .setImage('attachment://bw_staff.png')
    .setTitle(title_bwstaff)
    .setDescription(desc_bwstaff),

  embed_roles = new Discord.MessageEmbed()
    .setColor('24FF33')
    .attachFiles([new Discord.MessageAttachment(img_bwroles, 'bw_roles.png')])
    // .setImage('attachment://bw_roles.png')
    .setTitle(title_bwroles)
    .setDescription(desc_bwroles);

exports.name = '_sendinv';
exports.func = async(msg, { send }) => {
  await send(embed_info);
  await send(embed_roles);
  await send(embed_staff);
  await send(embed_online_support);
  await send(embed_bwinvite);
};
exports.metadata = {
  category: require('../').category,
  description: "Don't use this",
  perms: [['global.custom.chipsSupport.*']],
};
