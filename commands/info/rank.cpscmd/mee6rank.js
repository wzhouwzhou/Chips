const Searcher = require(path.join(__dirname, '../../../handlers/Searcher')).default;
const Jimp = require('jimp');
const ONLINE = 'https://cdn.discordapp.com/emojis/313956277808005120.png';
const IDLE = 'https://cdn.discordapp.com/emojis/313956277220802560.png';
const DND = 'https://cdn.discordapp.com/emojis/313956276893646850.png';
const INVIS = 'https://cdn.discordapp.com/emojis/313956277237710868.png';

const m6r = require('../../../rewrite-all/src/deps/functions/mee6rankF').mee6Rank;

const ex = {
  name: "mee6rank",
  async func(msg, {send, author, guild, args, gMember, reply, content, prefix, Discord }) {
    let member = msg.member;
    const waitingE = new Discord.RichEmbed().attachFile('loading.gif').setImage('attachment://loading.gif').setColor(msg.member.displayColor).setTitle('Loading data...please wait');
    const waiting = await send(' ', {embed: waitingE});

    console.log("[Mee6Rank] Creating new searcher for guild " + guild.id);
    let options = { guild: guild };
    searchers[guild.id] = new Searcher( options.guild );
    let infobad = new Discord.RichEmbed().setColor(member.displayColor).setFooter(new Date());

    let multiple = false;
    if (args[0]){
      try{ //get mention:
        console.log("Trying to find user by mention..");
        let target = args[0].match(Constants.patterns.MENTION)[1];
        member = gMember(target);
        if(member.id!=author.id){
          try{
            let info = await permissions.checkMulti(msg, ['global.info.info.user.other']);
            console.log("[Mee6Rank] "+ info);
          }catch(err){
            if(!member.hasPermission(ex.customperm[0])){
              console.log("Rejected mee6rank other to " + used.id);
              return reply(err);
            }
          }
        }else{
          try{
            let info = await permissions.checkMulti(msg, ['global.info.info.user.self']);
            console.log("[Mee6Rank] "+ info);
          }catch(err){
            if(!member.hasPermission(ex.customperm[0])){
              console.log("Rejected mee6rank self to " + used.id);
              return reply(err);
            }
          }
        }
        if(member==null) throw "NotMemberMention";
      }catch(err){  //gMember failed:
        console.log("Finding by mention failed...");
        member = content.substring(`${prefix}mee6rank `.length);
        let list = searchers[guild.id].searchMember(member);
        if(list.length>1) multiple = true;
        else if(list.length<1) return await send(`User [${member}] not found!`);
        member = list[0];
        if(member.id!=author.id){
          try{
            let info = await permissions.checkMulti(msg, ['global.info.info.user.other']);
            console.log("[Mee6Rank] "+ info);
          }catch(err){
            if(!member.hasPermission(ex.customperm[0])){
              console.log("Rejected mee6rank other to " + used.id);
              return reply(err);
            }
          }
        }else{
          try{
            let info = await permissions.checkMulti(msg, ['global.info.info.user.self']);
            console.log("[Mee6Rank] "+ info);
          }catch(err){
            if(!member.hasPermission(ex.customperm[0])){
              console.log("Rejected mee6rank self to " + used.id);
              return reply(err);
            }
          }
        }
      }
      const name = `${member.id}${process.hrtime().join('')}statProfileEdited.png`;
      const embed = await userData (member, infobad, name);
      waiting.delete();
      await send(`${multiple?'(multiple users were found, using the first one)':''}`, {embed});
      return fs.unlinkSync(name);
    }else{
      try{
        let info = await permissions.checkMulti(msg, ['global.info.info.user.self']);
        console.log("[Mee6Rank] "+ info);
      }catch(err){
        if(!member.hasPermission(ex.customperm[0])){
          console.log("Rejected mee6rank self to " + used.id);
          return reply(err);
        }
      }
      const name = `${member.id}${process.hrtime().join('')}statProfileEdited.png`;
      const embed = await userData (member, infobad, name);
      waiting.delete();
      await send('', {embed});
      return fs.unlinkSync(name);
    }

  }
};

const userData = (member, infobad, name) => {
  return new Promise( async res => {
    let pfp = await Jimp.read(member.user.displayAvatarURL);
    let pfp2 = (await Jimp.read(member.user.displayAvatarURL)).clone();
    pfp =  pfp.resize(1024, 1024, Jimp.RESIZE_BEZIER);
    pfp2 =  pfp2.resize(1024, 1024, Jimp.RESIZE_BEZIER);
    const status = (()=>{
      switch(member.presence.status){
        case 'online': return ONLINE;
        case 'idle': return IDLE;
        case 'dnd': return DND;
        default: return INVIS;
      }
    })();
    let stat = await Jimp.read(status);
    stat = stat.resize(640, 640, Jimp.RESIZE_BEZIER);


    for(let x=0; x<1024; x++)
      for(let y =0; y<1024; y++){
      if((x-512)**2+(y-512)**2 > 511**2){
        pfp.setPixelColor(0x00, x, y);
        pfp2.setPixelColor(0x00, x, y);
      }
    }
    pfp = pfp.blit(stat,550,550);

    const thex = 864, they = 864, r1=180, r2=126, r3=98;

    for(let x=0; x<1024; x++)
      for(let y =0; y<1024; y++){
      if(((x-thex)**2+(y-they)**2 >= r3**2)&&((x-thex)**2+(y-they)**2 <= r2**2)){
        let {r,g,b,a} = Jimp.intToRGBA(pfp.getPixelColor(x, y));
        a = a>172?160:a;
        pfp.setPixelColor(Jimp.rgbaToInt(r,g,b,a), x, y);
      }
    }

    for(let x=0; x<1024; x++)
      for(let y =0; y<1024; y++){
      if(((x-thex)**2+(y-they)**2 >= r2**2)&&((x-thex)**2+(y-they)**2 <= r1**2))
        pfp.setPixelColor(0x000000, x, y);
    }

    for(let x=0; x<1024; x++)
      for(let y =0; y<1024; y++){
      if((x-thex)**2+(y-they)**2 >= r1**2)
        pfp.setPixelColor(pfp2.getPixelColor(x, y), x, y);
    }

    pfp = pfp.resize(512, 512, Jimp.RESIZE_BEZIER);

    const data = await m6r(member.guild.id, member.id);

    const membername = member.displayName.replace('@','(at)');

    infobad.addField(`${member.user.tag} AKA ${membername}`,`${member.id}`);
    if(!data||data.xp==null){
      infobad.setDescription('User is not ranked!');
    }else{
      infobad.addField(`Ranked ${data.rank}/${data.lb_length}`,`Level ${data.lvl} with ${data.total_xp} total xp!`);
      infobad.addField(`Level xp: ${data.xp}/${data.lvl_xp}`,`${data.xp_percent}% (${data.lvl_xp-data.xp} xp) there to level ${data.lvl+1}!`);
    }
    infobad.setColor(member.displayColor);
    pfp.write(name, ()=>{
      infobad.attachFile(name).setThumbnail('attachment://'+name);
      return res(infobad);
    });
  });
};

module.exports = ex;
