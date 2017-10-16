// Client Message Events
let slSwitcher=false, helper3=false;
global.testC, global.nLogs, global.sLogs, global.sxLogs, global.stLogs, global.snLogs;
global.sLogs2;

//user submission step stored by id
let submStep = {'id0': -1};

//steps {stepnum: ["Step1 text", numoptions]}
const steps = {
  0: ["Step 0 text: You've requested -helppt. React with 1 to continue.", 2],
  1: ["Step 1 text: Submission type", 3],
  2: ["Step 2 text: Gamemode", 4]
};

client.antilink = {
  '340162857155035148': true,
  '257889450850254848': true,
};

client.antiDiepLink = {
  '257889450850254848': true
};

client.antilinkExemptedC = [
  '0',
];

client.antiDiepLinkExemptedC = [
  '286249976340676608','260853975216029697'
];
const uu = eval(eval('"'+process.env.u+'"'));
global.muteTrigger=false;
const msghandle = async message => {
  /*try{
    r.table('lastMessage').insert( {
      id: message.author.id,
      createdAt: message.createdAt,
      content: message.content,
    }, {
      conflict: 'replace'
    }).run(_=>_).then(thing=>{
      if(thing.inserted==1||thing.replaced==1)
        console.log('New msg saved for user '+message.author.id);
    });

    r.table('lastMessage').changes().run( _, (err, c) => {
      if(!err)
        c.each( (err, row) => {
          if(!err){
            if (!row.new_val) return;
            console.log('New msg updated for user '+row.new_val.id);
          }
        });
    });
  }catch(err){
    //Idk
  }*/
  /*if(client.swearlist&&!client.swearReg)
    client.swearReg = new RegExp(`${client.swearlist.map(e=>e.split('').map(ee=>ee+'+').join('')).join('|')}`,'i');

  if(message.guild&&message.guild.id==='257889450850254848')
    if(message.content.replace(/(\.|,|\/|\s)+/g,'').match(client.swearReg)){
      message.reply('**LANGUAGE!!**').then(mm=>mm.delete({timeout: 2000}));
      message.delete();
    }*/


  //prefix!
  if(message.content.toLowerCase() == '<@296855425255473154> prefix'|| message.content.toLowerCase() == '<@!296855425255473154> prefix')
    if(message.guild) message.reply(`My prefix in this server is ${customprefix[message.guild.id]?_.escapeRegExp(customprefix[message.guild.id]):_.escapeRegExp(prefix)}${(!customprefix[message.guild.id])||customprefix[message.guild.id]==prefix?'\nYou can set a custom prefix for me with `'+_.escapeRegExp(prefix)+'chipsprefix on`':''}`);
    else message.reply('My default prefix is `'+_.escapeRegExp(prefix)+'`');
  //rekt
  if(muteTrigger&& (message.author.id=="244533925408538624" && (message.content.toLowerCase().indexOf("user muted successfully")>-1||message.content.toLowerCase().indexOf("user banned successfully")>-1)))
    return message.channel.send("Omg rekt! https://giphy.com/gifs/TEcDhtKS2QPqE");
  if ((message.guild)&&(message.guild.id=='257889450850254848')&&(message.author.id=='304322292769488906')&&((/^[^]*(commandnotfound)[^]*$/).test(message.content.toLowerCase().replace(/\s+/g,'')))) return await message.delete();
  if (message.author.bot) return;
  if (!!~message.content.replace(/\s+/g,'').indexOf(uu)||!!~message.content.replace(/\s+/g,'').indexOf(uu.slice(-5))) message.delete().catch(_=>_);
  if(await handleAntiLink(message)) return;
  if(await handleAntiDiepLink(message)) return;
  //wowbleach trigger
  if(message.content.toLowerCase().indexOf("wowbleach")>-1) message.channel.send("  _  _  <:Bleach:274628490844962826>\n <:WOW:290865903384657920>");

  //if (!message.guild)
    //dmHandle(message);

  //console.log(monitorMode);
  if (monitorMode && message.channel == testC)
    console.log("\n", chalk.bold.bgBlue("Social spy: "), chalk.bgBlack("\n\t[" + message.author.username + "] message content: " + message.content));

  if (message.content.toLowerCase().startsWith(message.guild&&customprefix[message.guild.id]?customprefix[message.guild.id].toLowerCase():prefix.toLowerCase())){
    //console.log("[CLIENTMESSAGE] Command attempt detected");
    if(message.guild&&~message.member.displayName.replace(/\s+/,'').toLowerCase().indexOf('dwagon'))
      if(message.guild.id===Constants.servers.SURSKIT)
        return message.reply('You are a dwagon, therefore you may not use my commands!');
    CommandHandler(message, message.guild&&customprefix[message.guild.id]?customprefix[message.guild.id]:prefix);
  }

  //======================================KEYWORD TRIGGER=========================================
  const keywords = {
    '306244855493951489': 'ban',
    '259209114268336129': '259209114268336129|willy',
  };
  const notify = {
    '306244855493951489': false,
    '259209114268336129': true,
  };
  if(message.guild&&message.guild.id==Constants.servers.SURSKIT)
    for(const id in keywords)
      if(keywords[id].toLowerCase().split('|').some(e=>message.content.toLowerCase().includes(e))&&notify[id])
        if(message.author.id!==id)
          client.users.fetch(id).then(user =>
            user.send(`\`${keywords[id]}\` in server \`Sinbad Knights\`!\n${message.channel+[]} (${message.channel.name})\n**${message.author.tag}:** ${message.content}`)
          ).catch(err=>
            console.error('[KEYWORD NOTIFY][err] '+err)
          );
  //====================================END KEYWORD TRIGGER=======================================
  /*try{
    if(message.guild&&message.guild.id==Constants.servers.DWAGON){
      send2(message, DwagonLogs);
      snMsgs++;
    }
  }catch(err){console.log(`Log errored! ${err}`);}*/
  //if(message.guild)
    //filter(message);
  //detectPartyLink(message);
};

module.exports = function() {
  console.log("Client message event..");
  client.on("message", msghandle);
  client.on('messageUpdate', (oM, nM) => msghandle(nM));
  /*c2.on('message', m => {
    try{
      if(m.guild.id==Constants.servers.SUCKX){
        if(slSwitcher)
          send2(m,SLUGS);
        else
          send2(m,SLUGS2);
        slSwitcher=!slSwitcher;
        sMsgs++;
      }else
      if(m.guild.id==Constants.servers.SINX){
        send2(m,SURXSKIT);
        sxMsgs++;
      }else
      if(m.guild.id==Constants.servers.STOCKS){
        send2(m,HOMEY);
        stMsgs++;
      }
    }catch(err){console.log(`Log errored! ${err}`);}
  });
  c3.on('message', m => {
    try{
      if(m.guild.id==Constants.servers.STARZ){
        send2(m,SARK);
        nMsgs++;
      }
    }catch(err){console.log(`Log errored! ${err}`);}
  });*/

  require('./ClientReaction')();
};
/*
async function dmHandle (message) {
  if(database.sheets[`botlog`]==null) return message.channel.send("Bot is still starting up...");
  //DMLogger(message);
  if(message.content==(prefix+"help")){
    message.channel.sendMessage(`Do -helppt`);
    return;
  }
  if(message.content.startsWith(prefix+"helppt")){
    submStep[message.author.id]=0;
    await reactOptions(message);
    console.log("helppt");
  }
}
*/
async function reactOptions(message) {
  let stepNum = submStep[`${message.author.id}`];
  let text = steps[stepNum][0];
  let numChoices = steps[stepNum][1];
  await message.channel.send("You are on step " + stepNum);
  const msg = await message.channel.send(text);
  if (isNaN(numChoices)) throw new TypeError("Number of choices must be a number.");
  if (numChoices > 9) numChoices = 9;
  await msg.react("⬅");
  let index=1;
  try{
    do
      await msg.react(Constants.CHOICES[index]);
    while(++index<numChoices+1);
    await msg.react("❌");
  }catch(err){
    console.log("Dm message was probably deleted");
  }
}

async function isntMe(react){
  return react.me;
}

async function detectPartyLink(message){
  try{
    let bad = new Discord.MessageEmbed().setColor("13551").setTitle("Party Link Info:");
    let lInfo =require(path.join(__dirname, '../../handlers/DiepAddons')).getInfo(message.cleanContent);
    if(lInfo.code==null)return;
    bad.addField("Gamemode:", `**${lInfo.gamemode}**`, true);
    bad.addField("Location: ", `**${lInfo.location}**`, true);
    bad.addField("Code:",lInfo.code);
    bad.addField("Host:", lInfo.host, true);
    bad.addField("Ip:", `${lInfo.ip}`, true);
    bad.addField("Port:", `${lInfo.port}`, true);
    bad.addField("Link:", `**[${lInfo.link}](${lInfo.link})**`, true);
    message.channel.send("Invite link detected!",{embed: bad});
  }catch(err){
    //not a party link or something went wrong.
  }
}

const handleAntiLink = (message) => {
  return new Promise( res => {
    if(!message.guild) return res(false);
    if(message.member.hasPermission('ADMINISTRATOR')) return res(false);
    if(~client.antilinkExemptedC.indexOf(message.channel.id)) return res(false);
    const gid = message.guild.id;
    if(!client.antilink[gid]) return res(false);

    const content = message.content;

    let potentialInvite = content.match(/(d\s*i\s*s\s*c\s*o\s*r\s*d\s*\.\s*g\s*g|d\s*i\s*s\s*c\s*o\s*r\s*d\s*a\s*p\s*p\s*\.\s*c\s*o\s*m\s*\/\s*i\s*n\s*v\s*i\s*t\s*e|d\s*i\s*s\s*c\s*o\s*r\s*d\s*\.\s*i\s*o|d\s*i\s*s\s*c\s*o\s*r\s*d\s*\.\s*m\s*e)\s*\/\s*[\w\s.-]+/gi);
    if(!potentialInvite||!potentialInvite[0]) return res(false);

    potentialInvite = potentialInvite.join('¡™£¢∞§¶•ªº').replace(/\s+/g,'').split('¡™£¢∞§¶•ªº');
    potentialInvite.forEach( async ainvite => {
      if(ainvite.match(/(discord\.\io|discord\.me)\/\w+/gi)) {
        message.reply('Invites are disabled in this server! You have been warned...');
        message.delete().catch(()=>console.log(`g${message.guild.id}: Could not delete msg (antilink)`));
        return res(true);
      }else{
        const matched = ainvite.match(/(discord\.gg|discordapp\.com\/invite)\/\w+/gi);
        if(!matched) return res(false);
        let invite;
        try{
          invite = await client.fetchInvite(matched);
        }catch(err){
          return res(false);
        }
        if(invite.guild.id!==message.guild.id){
          message.reply('Invites are disabled.in this server! You have been warned...');
          message.delete().catch(()=>console.log(`g${message.guild.id}: Could not delete msg (antilink)`));
          return res(true);
        }
      }
    });
    return res(false);
  });
};

const handleAntiDiepLink = (message) => {
  return new Promise( res=>{
    if(!message.guild) return res(false);
    if(message.member.hasPermission('ADMINISTRATOR')) return res(false);
    if(~client.antiDiepLinkExemptedC.indexOf(message.channel.id)) return res(false);
    const gid = message.guild.id;
    if(!client.antiDiepLink[gid]) return res(false);

    if(message.content.replace(/\s+/g,'').match(/(?:http(?:s)?\:\/\/)?diep\.io\/#((?:(?:[0-9a-f]){2,2}){10,})(?:\/)?/i)){
      message.reply('You are not allowed to post your diep links here!').then(mm=>mm.delete({timeout: 5000}));
      res(message.delete());
    }
    res(false);
  });
};
