const ex = {};

ex.users = {
  WILLY: '259209114268336129',
  WILLYZ: '259209114268336129',
  WILLY_Z: '259209114268336129',
  XZLQ: '208736038577897473',
  XANTHI: '208736038577897473',
  PG: '180813971853410305',
  PGSUPER: '180813971853410305',
  PG_SUPER: '180813971853410305',
  ZALGO: '213312750703607808',
  KONEKO: '270834390643376129',
  HARBINGER: '270834390643376129',
  NELYN: '221107079790723072',
  LOAF: '240651964424126464',
  ARX: '237270037528969218',
  GOTEM: '220951507070222337',
  EVILDEATHPRO: '250815960250974209',
  EDP: '250815960250974209',
  ASUNA: '277670245034885120',
  DU: '306244855493951489',
  LUCAS: '205608598233939970',
  CHIPS: '296855425255473154',
};

ex.avatars = {
  MEE6: 'https://i.imgur.com/WX2hGHk.jpg',
};

ex.images = {
  WARNING: 'https://i.imgur.com/S789uIe.png',
};

ex.channels = {
  TEST: '302984084198785024',
  DMS: '302983656157478932',
  SLUGS: '302990568068481036',
  SARK: '302990744090837012',
  SURXSKIT: '302995920490987522',
  HOMEY: '317060790769418240', // "303282773265743872",
  DWAGONLOGS: '306213668281122817',
  STATUS: '302983692467437568',
  COMBINED: '302995818397564937',
  SUPPORT_STAFFAPPLICATION: '318569668451237888',
  SUPPORT_STAFFAPPLICATIONLOGS: '319248463940550656',
  SBKCHIPSLOGS: '320752455178780672',
};

ex.servers = {
  SUCKX: '252525368865456130',
  SURSKIT: '257889450850254848',
  STOCKS: '315842339388129280',
  STARZ: '284433301945581589',
  DWAGON: '305753503245008898',
  SUPPORT: '307623291479130132',
};

ex.roles = {
  SUPPORT_STAFFAPPLICATIONROLE: '318569495486791680',
};

ex.patterns = {
  MENTION: /^[^]*<@!?(\d+)>[^]*$/,
  CHANNEL: /^[^]*<#(\d+)>[^]*$/,
};

ex.express = {
  ENGINE: 'html',
};

ex.CHOICES = ['0⃣', '1⃣', '2⃣', '3⃣', '4⃣', '5⃣', '6⃣', '7⃣', '8⃣', '9⃣'];

ex.emojis = {
  EXCLAMATION: '❗️',
  CHECK: '✅',
  X: '❌',
  STAR: '⭐',
};

ex.profileSettings = {
  pfpW: 640,
  pfpY: 203,
  pfpX: 0,
};

ex.BOTINVITE = 'https://discordapp.com/oauth2/authorize?client_id=296855425255473154&scope=bot&permissions=2146958591';

ex.SUPPORTINVITE = 'https://discord.gg/jj5FzF7';

ex.WEBSITE = 'https://chipsbot.me';
ex.APIURL = 'https://api.localhost:2087/';

ex.DJS = `Useful links for learning JavaScript and Node:
codecademy online course:| https://www.codecademy.com/learn/javascript
Eloquent Javascript, free book:| http://eloquentjavascript.net/
Some Node:|
http://nodeschool.io/
https://www.codeschool.com/courses/real-time-web-with-node-js
discord.js getting started guides:|
https://yorkaargh.gitbooks.io/discord-js-bot-guide/content/
https://www.youtube.com/channel/UCvQubaJPD0D-PSokbd5DAiw/videos
https://www.youtube.com/channel/UCLun-hgcYUgNvCCj4sIa-jA/videos
Javascript reference/docs:| https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference
discord.js documentation:| https://discord.js.org/#!/docs/`;

ex.playlists = [
  [
    'https://www.youtube.com/watch?v=6O82MXNccsk',
    'https://www.youtube.com/watch?v=JhIEsQ15sSI',
    'https://www.youtube.com/watch?v=VzB_5U-TZUI',
    'https://www.youtube.com/watch?v=YTJdKUAnhd0',
    'https://www.youtube.com/watch?v=2-UCv2N0QX0',
    'https://www.youtube.com/watch?v=am4Ywpxpgmg',
    'https://www.youtube.com/watch?v=uCj4f7ECa4E',
    'https://www.youtube.com/watch?v=nnbkbTiRA4g',
    'https://www.youtube.com/watch?v=NsgCUfg-ZP4',
    'https://www.youtube.com/watch?v=TuI8EWxI-XM',
    'https://www.youtube.com/watch?v=YJVIV8Nvbt4',
    'https://www.youtube.com/watch?v=rc_WvczuVu4',
    'https://www.youtube.com/watch?v=SUSPQc-jk7s',
    'https://www.youtube.com/watch?v=JVo3FLB2BAA',
    'https://www.youtube.com/watch?v=I9YN8Yc_kCI',
    'https://www.youtube.com/watch?v=wRmkrxgIZvo',

  ],
];

ex.permissions_details = new Map()
  .set('CREATE_INSTANT_INVITE', 'create their own invite link')
  .set('KICK_MEMBERS', 'kick members from here')
  .set('BAN_MEMBERS', 'ban members here')
  .set('ADMINISTRATOR', 'perform administrative actions here')
  .set('MANAGE_CHANNELS', 'edit channel settings')
  .set('MANAGE_GUILD', 'edit server settings')
  .set('ADD_REACTIONS', 'react to messages')
  .set('VIEW_CHANNEL', 'See this channel in the sidebar')
  .set('VIEW_AUDIT_LOG', 'see the audit logs')
  .set('READ_MESSAGES', 'read messages in this server')
  .set('SEND_MESSAGES', 'send messages here')
  .set('SEND_TTS_MESSAGES', 'send text-to-speech messages')
  .set('MANAGE_MESSAGES', 'delete messages and reactions')
  .set('EMBED_LINKS', 'send embedded content')
  .set('ATTACH_FILES', 'upload files and photos')
  .set('READ_MESSAGE_HISTORY', 'read message history')
  .set('MENTION_EVERYONE', 'mention everyone')
  .set('USE_EXTERNAL_EMOJIS', 'use emojis from other servers')
  .set('CONNECT', 'connect to a voice channel')
  .set('SPEAK', 'talk in voice channels')
  .set('MUTE_MEMBERS', 'mute members in voice channels')
  .set('DEAFEN_MEMBERS', 'deafen members in voice channels')
  .set('MOVE_MEMBERS', 'move members to other voice channels')
  .set('USE_VAD', 'use voice activity detection')
  .set('CHANGE_NICKNAME', 'change their nickname')
  .set('MANAGE_NICKNAMES', "change someone else's nickname")
  .set('MANAGE_ROLES', 'modify role settings')
  .set('MANAGE_WEBHOOKS', 'manage webhooks')
  .set('MANAGE_EMOJIS', 'manage server-wide emotes');

module.exports = ex;
