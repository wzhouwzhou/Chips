const neko = [
  '265015624252653568', // arkhalis
  '240651964424126464', // loaf
  '259209114268336129', // willyz, that one owner guy
  '250815960250974209', // evildeathpro, that one other owner guy
  '242366901194457088', // wowie
  '270834390643376129', // harbinger
  '213312750703607808', // zalgo
  '220182743126900737', // garhu5
  '278734113735966720', // pie
  '223811504833691648', // nolife
  '208736038577897473', // xanthi
  '279270217417228288', // abhinav
  '220951507070222337', // gotem
  '259287315044630528', // apex
  '90647484623261696' , // hero
  '237270037528969218', // arx
  '292971521159200768', //JTJosh, not a neko but wanted immunity lol
  '279959411693322241', //TheGamingBolt, not a neko but also wanted immunity for whatever reason xd
  '324364368752148481', //Vy, that one person who is like <3 willy
  '365972456139390977', //Vy alt
  '260024920757633025', //Xena, a nEkO SLaVE
  '205608598233939970',  //lucas, a guy that wants perms
];

const ex= {
  name: "-ban",
  async func(msg, {send, /*member,*/ author, content, channel, guild, args, gMember, Discord, reply, bot}) {
    // const used = member || author;
    if(!guild) return send('You must use this command in a server.');
    if (!args[0]) return send("No user given :(");
    const target = args[0].match(Constants.patterns.MENTION)[1];
    const split = content.replace(/\s+/g, ' ').trim().split(" ");
    let reason = split.slice(2, split.length).join(" ");
    if (reason == "") reason = "None";
    const user = gMember(target).user;
    if(user.id==bot.user.id) return send(`NO!!`);
    /*if(!used.hasPermission("BAN_MEMBERS")){
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
      if(author.id!='324364368752148481'&&author.id!=Constants.users.WILLYZ&&author.id!=Constants.users.EVILDEATHPRO){
        setTimeout(() => {reply('go ban yourself!!!');}, 50);
        return;
      }
      /*else
        console.log("-ban immunity override");*/
    }
    let emb = new Discord.RichEmbed()
      .setAuthor("Ban Notice!")
      .setColor(9109504)
      .setThumbnail(Constants.images.WARNING)
      .addField("Ban reason: ", `${reason}`, true);
    try{
      await user.send(' ', {embed: emb.setTitle(`You were banned from the server: ${guild.name}!`)});
    } catch (err) {
      console.error(`Error of dming User: ${err}`);
    }

    // const stafflogs = guild.channels.find('name', 'staff-logs');
    // if(stafflogs)
    //   stafflogs.send({embed: emb.setTitle('Fake Ban').setAuthor('Action Log').setDescription(`**${user+[]} was ~~fake~~ banned by ${author+[]}!**`)});

    /*if(!stafflogs)
     return send('Creating a staff-logs channel.')
      .then (channel => channel.create('staff-logs'))
      .then (embed => embed.send(' ', {embed: emb}));*/

    let usernm = user.username;
    await reply('User banned successfully!');
    const mee6name = guild.members.get('159985870458322944')?guild.members.get('159985870458322944').displayName:null;
    if(mee6name)
      channel.createWebhook(mee6name, Constants.avatars.MEE6)
        .then (whook => whook.edit(mee6name, Constants.avatars.MEE6))
        .then(hook => hook.send(`**${usernm}** left!`)
        .then(() => hook.delete())
        .catch(console.error)
      );
  }
};

module.exports = ex;
