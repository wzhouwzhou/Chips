/* eslint no-console: 'off', consistent-return: 'off' */
const neko = [
  '265015624252653568',
  // Arkhalis
  '240651964424126464',
  // Loaf
  '259209114268336129',
  // Willyz, that one owner guy
  '250815960250974209',
  // Evildeathpro, that one other owner guy
  '242366901194457088',
  // Wowie
  '270834390643376129',
  // Harbinger
  '213312750703607808',
  // Zalgo
  '220182743126900737',
  // Garhu5
  '278734113735966720',
  // Pie
  '223811504833691648',
  // Nolife
  '208736038577897473',
  // Xanthi
  '279270217417228288',
  // Abhinav
  '220951507070222337',
  // Gotem
  '259287315044630528',
  // Apex
  '90647484623261696',
  // Hero
  '237270037528969218',
  // Arx
  '292971521159200768',
  // JTJosh, not a neko but wanted immunity lol
  '279959411693322241',
  // TheGamingBolt, not a neko but also wanted immunity for whatever reason xd
  '365972456139390977',
  // Vee
  '260024920757633025',
  // Xena, a nEkO SLaVE
  '205608598233939970',
  // Lucas
  '262127229385965570',
  // Devon, for making chips logos
  '374022684519956480',
  // Cursed
  '278867114792845312',
  // Tidepod
  '336962062544666624',
  // Phoenix
];

const l2 = [
  '205608598233939970',
  '259209114268336129',
  '250815960250974209',
  '365972456139390977',
  '278867114792845312',
  '336962062544666624',
];

const bangifs = [
  'https://media.giphy.com/media/cNSMn6Nz95dTO/giphy.gif',
];
const a = require('nodecpp-test').arrays;
const ex = {
  name: '-ban',
  async func(msg, { send, author, content, channel, guild, args, gMember, Discord, reply, bot }) {
    // Send, Member, author
    // Const used = member || author;
    if (!guild) return send('You must use this command in a server.');
    if (!args[0]) return send('No user given :(');
    const target = (args[0].match(/^[^]*<@!?(\d+)>[^]*$/) || [])[1];
    if (!target) return send('Invalid user mentioned');
    const split = content.replace(/\s+/g, ' ').trim().split(' ');
    let reason = split.slice(2, split.length).join(' ');
    if (reason === '') reason = 'None';
    const user = gMember(target).user;
    if (user.id === bot.user.id) return send(`You can't ban the almighty Chips!`);
    /* If(!used.hasPermission("BAN_MEMBERS")){
      switch (used.id) {
        case Constants.users.WILLYZ:
        case Constants.users.EVILDEATHPRO:
        case Constants.users.PGSUPER:
        case Constants.users.ZALGO:
        case Constants.users.XZLQ:
        case Constants.users.KONEKO:
        case Constants.users.NELYN:
        case Constants.users.LOAF:
        case Constants.users.ARX:
        case Constants.users.ASUNA:
          break;
        default:
          return send(`No bans for you, <@${used.id}>!`);
      }
    }*/
    // console.log("Target: "+target);
    if (neko.indexOf(user.id) >= 0) {
      if (!l2.includes(author.id)) return setTimeout(() => { reply('go ban yourself!!!'); }, 50);
      /* Else
        console.log("-ban immunity override");*/
    }
    let emb = new Discord.MessageEmbed()
      .setAuthor('Ban Notice!')
      .setColor(9109504)
      .setThumbnail('https://i.imgur.com/S789uIe.png')
      .addField('Ban reason: ', `${reason}`, true);
    try {
      await user.send(emb.setTitle(`You were banned from the server: ${guild.name}!`).setAuthor('Note: This is a fake ban!'));
    } catch (err) {
      console.error(`Error of dming User: ${err}`);
    }
    // Const stafflogs = guild.channels.find('name', 'staff-logs');
    // if(stafflogs)
    /* stafflogs.send({embed: emb.setTitle('Fake Ban').setAuthor('Action Log')
    .setDescription(`**${user+[]} was ~~fake~~ banned by ${author+[]}!**`)});*/
    /* if(!stafflogs)
     return send('Creating a staff-logs channel.')
      .then (channel => channel.create('staff-logs'))
      .then (embed => embed.send(' ', {embed: emb}));*/
    let usernm = user.username;
    await reply('User banned successfully!');
    await send(new Discord.MessageAttachment(a.sample(bangifs), 'hi.gif'));
    const mee6name = guild.members.get('159985870458322944') ? guild.members.get('159985870458322944')
      .displayName : null;
    if (mee6name) {
      channel.createWebhook(mee6name, { avatar: 'https://i.imgur.com/WX2hGHk.jpg',
        reason: `Fake ban executed by ${author.tag}` })
        .then(whook => whook.edit(mee6name, { avatar: 'https://i.imgur.com/WX2hGHk.jpg' }))
        .then(hook => hook.send(`**${usernm}** left!`)
          .then(() => hook.delete())
          .catch(console.error)
        );
    }
  },
};
module.exports = ex;
