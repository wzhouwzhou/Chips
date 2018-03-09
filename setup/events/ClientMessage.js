/* eslint complexity: 'off', no-console: 'off', no-undef: 'off' */
// Client Message Events
const _ = require('lodash');
const snek = require('snekfetch');
let slSwitcher = false, helper3 = false;
global.testC, global.nLogs, global.sLogs, global.sxLogs, global.stLogs, global.snLogs;
global.sLogs2;

// User submission step stored by id
let submStep = { id0: -1 };

// Steps {stepnum: ["Step1 text", numoptions]}
const steps = {
  0: ["Step 0 text: You've requested -helppt. React with 1 to continue.", 2],
  1: ['Step 1 text: Submission type', 3],
  2: ['Step 2 text: Gamemode', 4],
};

client.antilink = {
  '340162857155035148': true,
  '257889450850254848': true,
  '339930093042532363': true,
  '307623291479130132': true,
};

client.antiDiepLink = {
  '257889450850254848': true,
};

client.antilinkExemptedC = [
  '0',
];

client.antiDiepLinkExemptedC = [
  '286249976340676608', '260853975216029697',
];

client.ThumbsReact = {
  '257889450850254848': true,
};

client.ThumbsReactExemptedC = [
  '260852960379142144','286249976340676608','355894890577657859','261901774426865664','285466689158774784',
  '334376289999912961','314407824568614913','285466651351187456','404000684455886869','290182168771035147',
  '420019143962525696','399238483870351372','257889450850254849','407400478352343040','289874144039010307',
  '355895083511316480','355894161804886016','409725479524892673','309642001215913994','267199782882246666',
  '260864259330801674','287925913193152512','261113769755672576','381646176723927041','333239363372843009',
  '285428773992792074','305391264830980096','285466842225442817','396366431064817668','320752455178780672',
  '390636310421045258','407400329672654862','304515733251948545','290919267560587264','405532157306470400',
  '399218825209315338','257895860757725186','298810624430047232','285466668698959873','399552492054118401',
  '355895778276802561','355896699950071808','348846866445893639','404990828197707777','355896922084474891',
  '288352869084692480','260853975216029697','299463831694999553','410524691070189578','355896452100259840',
  '285443288625053696','404992099478405122','257889450850254848','295643936188268544','368962010932838411',
  '406556051773849638','333368957493051393','286208220974940161','291057304512757760','399242470619217944',
  '360376932019208202','284670422866329600','313950671885959168','297672324964941834', 
];

let r = null;
const rr = setInterval(() => {
  if (!client || !client.database) return;
  r = client.database.rethink;
  if (r) clearInterval(rr);
});
client.mps = [0, 0, 0];
client.thismcounter = 0;
const uu = eval(eval(`"${process.env.u}"`));
global.muteTrigger = false;
const chart = require('../../printcanvas');
client.mcounterI = setInterval(() => {
  client.mps.push(~~~~((100 * client.thismcounter) / 200 + 2e-1));
  client.thismcounter = 0;
  client.mps.reverse().length = Math.min(client.mps.length, 30);
  chart.graph(client.mps.reverse(), {
    filename: 'public/mps',
    grid: true,
    lineWidth: 10,
    fillColor: 'rgba(240,205,0,0.9)',
    height: 360,
    width: 600,
  });
}, 2000);
client.ignoreid = [
  // Waterfox
  '287379388004302848',
  // One One O One#1101 claims to be "hacked"
  '419949972293812244',
  '304338588588441601', '305776092822765568', '300633021701423106', '233243685276352512', '409353746355847168'];
const guild_mps = {};
setInterval(() => {
  for (const gid in guild_mps) {
    const mps = guild_mps[gid];
    if (!mps.some(e => e !== 0)) {
      delete guild_mps_ct[gid];
      return delete guild_mps[gid];
    }
    const mps2 = _.clone(mps).reverse();
    if (mps2.length > 10) mps2.length = 10;
    r.table('guild_mps').insert({
      id: gid,
      mps: mps2,
    }, {
      conflict: 'replace',
    }).run(e => e)
      .then(thing => {
        if (!(thing.inserted || thing.replaced || thing.unchanged)) {
          console.log(`MPS Not saved for guild ${gid}`);
        }
      });
  }
  // Console.log('Saved MPS Bucket');
}, 6000);
const guild_mps_ct = {};
setInterval(() => {
  for (const gid in guild_mps_ct) {
    let g_count = guild_mps_ct[gid];
    guild_mps_ct[gid] = 0;
    guild_mps[gid].push((g_count / 3).toFixed(4));
  }
}, 3000);

const msghandle = async message => {
  if (~client.ignoreid.indexOf(message.author.id)) return true;
  client.shard.broadcastEval(`client.thismcounter++`);
  if (message.guild) {
    if (!guild_mps[message.guild.id]) {
      guild_mps[message.guild.id] = [];
      guild_mps_ct[message.guild.id] = 0;
    }
    guild_mps_ct[message.guild.id]++;
  }
  /* Try{
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
  /* if(client.swearlist&&!client.swearReg)
    client.swearReg = new RegExp(`${client.swearlist.map(e=>e.split('').map(ee=>ee+'+').join('')).join('|')}`,'i');

  if(message.guild&&message.guild.id==='257889450850254848')
    if(message.content.replace(/(\.|,|\/|\s)+/g,'').match(client.swearReg)){
      message.reply('**LANGUAGE!!**').then(mm=>mm.delete({timeout: 2000}));
      message.delete();
    }*/

  const handleSupportFormat = m => {
    if (m.channel.id !== '286208220974940161' || !m.member) return true;
    if ((m.member.permissions.bitfield & 8192) === 8192) return true;
    if (/^[AQSCR]:[^]*$/i.test(m.content)) return true;
    m.delete().catch(__ => __);
    m.channel.send([
      `C: <:pins:398946003434340362> **${_.escapeRegExp(m.author.tag).replace(/@/g, '(at)')}**`,
      ', you **must** follow the format in pins to chat in here to not get muted!',
    ].join``).then(__ => __.delete({ timeout: 9000 }));
    return false;
  };
  handleSupportFormat(message);

  if (!global.client.CBLOCKOFF && message.author.id === '398601531525562369' && message.guild.id === '307623291479130132') {
    return message.delete();
  }
  // Prefix!
  if (message.content.match(/<@!?296855425255473154>\s*prefix/i)) {
    if (message.guild) {
      return message.reply(`My prefix in this server is ${client.customprefix[message.guild.id] ?
        _.escapeRegExp(client.customprefix[message.guild.id]) : _.escapeRegExp(prefix)
      }${!client.customprefix[message.guild.id] || client.customprefix[message.guild.id] === prefix ?
        `\nType __${_.escapeRegExp(prefix)}help__ or set a custom prefix for me with \`${_.escapeRegExp(prefix)}chipsprefix on\`` :
        `Type __${_.escapeRegExp(client.customprefix[message.guild.id])}help__`}`);
    } else {
      return message.reply(`My default prefix is \`${_.escapeRegExp(prefix)}\`, type ${_.escapeRegExp(prefix)}help to show the help menu!`);
    }
  }

  if (!message.author.bot && message.content.match(/^<@!?(296855425255473154)>[^]+$/)) {
    message.channel.startTyping();
    try {
      const result = await snek.get(`${Constants.APIURL}cleverbot`)
        .set('Authorization', process.env.RETHINKPSWD)
        .set('X-Data-Src',
          new Buffer(message.content
            .replace(/^<@!?(296855425255473154)>\s+/, '')
            .replace(/\s+<@!?(296855425255473154)>$/, '')
            .trim()
          ).toString('base64'))
        .set('X-Data-ID', message.author.id);
      message.channel.stopTyping(true);
      return message.reply(result.body.message);
    } catch (err) {
      message.channel.stopTyping(true);
      return message.reply(_.sample(['What?', 'Can you repeat that?', 'Please elaborate']));
    }
  }
  // Rekt
  if (muteTrigger && (message.author.id === '244533925408538624' && (message.content.toLowerCase().indexOf('user muted successfully') > -1 || message.content.toLowerCase().indexOf('user banned successfully') > -1))) return message.channel.send('Omg rekt! https://giphy.com/gifs/TEcDhtKS2QPqE');
  if (message.guild && (message.guild.id === '257889450850254848') && (message.author.id === '304322292769488906') && (/^[^]*(commandnotfound)[^]*$/).test(message.content.toLowerCase().replace(/\s+/g, ''))) return await message.delete();
  if (message.author.bot) return;
  if (!!~message.content.replace(/\s+/g, '').indexOf(uu) || !!~message.content.replace(/\s+/g, '').indexOf(uu.slice(-5))) message.delete().catch(_ => _);
  if (await handleAntiLink(message)) return true;
  if (await handleAntiDiepLink(message)) return true;
  if (await handleThumbsReact(message)) return true;
  // Wowbleach trigger
  if (message.content.toLowerCase().indexOf('wowbleach') > -1) message.channel.send('  _  _  <:Bleach:274628490844962826>\n <:WOW:290865903384657920>');

  // If (!message.guild)
  // dmHandle(message);

  // console.log(monitorMode);
  if (monitorMode && message.channel == testC) console.log('\n', chalk.bold.bgBlue('Social spy: '), chalk.bgBlack(`\n\t[${message.author.username}] message content: ${message.content}`));

  if (message.content.toLowerCase().startsWith(message.guild && client.customprefix[message.guild.id] ? client.customprefix[message.guild.id].toLowerCase() : prefix.toLowerCase())) {
    // Console.log("[CLIENTMESSAGE] Command attempt detected");
    if (message.guild && ~message.member.displayName.replace(/\s+/, '').toLowerCase().indexOf('dwagon')) if (message.guild.id === Constants.servers.SURSKIT) return message.reply('You are a dwagon, therefore you may not use my commands!');
    CommandHandler(message, message.guild && client.customprefix[message.guild.id] ? client.customprefix[message.guild.id] : prefix);
  }

  // ======================================KEYWORD TRIGGER=========================================
  const keywords = {
    '306244855493951489': 'ban',
    '259209114268336129': '259209114268336129|willy|william',
    '250815960250974209': '250815960250974209|edp|evildeathpro|ethan',
    '205608598233939970': '205608598233939970|lucas|lsg|lucaslsg|l|u|c|a|s|g',
  };
  const notify = {
    '306244855493951489': false,
    '259209114268336129': true,
    '250815960250974209': true,
    '205608598233939970': true,
  };
  if (message.guild && message.guild.id == Constants.servers.SURSKIT) {
    if (message.content.replace(/[\s.,|/]+/g, '').match(new RegExp(`${'despac'.split('').join('+')}i+?t+?o+?`, 'i'))) return message.delete();
    for (const id in keywords) {
      if (keywords[id].toLowerCase().split('|').some(e => message.content.toLowerCase().includes(e)) && notify[id]) {
        if (message.author.id !== id) {
          client.users.fetch(id).then(user =>
            user.send(`\`${keywords[id]}\` in server \`Sinbad Knights\`!\n${message.channel + []} (${message.channel.name})\n**${message.author.tag}:** ${message.content}`)
          ).catch(err =>
            console.error(`[KEYWORD NOTIFY][err] ${err}`)
          );
        }
      }
    }
  }
  // ====================================END KEYWORD TRIGGER=======================================
  /* try{
    if(message.guild&&message.guild.id==Constants.servers.DWAGON){
      send2(message, DwagonLogs);
      snMsgs++;
    }
  }catch(err){console.log(`Log errored! ${err}`);}*/
  // if(message.guild)
  // filter(message);
  // detectPartyLink(message);
};

module.exports = function() {
  console.log('Client message event..');
  client.on('message', msghandle);
  client.on('messageUpdate', (oM, nM) => oM.content !== nM.content && msghandle(nM));
  /* C2.on('message', m => {
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
Async function dmHandle (message) {
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
  await message.channel.send(`You are on step ${stepNum}`);
  const msg = await message.channel.send(text);
  if (isNaN(numChoices)) throw new TypeError('Number of choices must be a number.');
  if (numChoices > 9) numChoices = 9;
  await msg.react('⬅');
  let index = 1;
  try {
    do await msg.react(Constants.CHOICES[index]);
    while (++index < numChoices + 1);
    await msg.react('❌');
  } catch (err) {
    console.log('Dm message was probably deleted');
  }
}

async function isntMe(react) {
  return react.me;
}

async function detectPartyLink(message) {
  try {
    let bad = new Discord.MessageEmbed().setColor('13551').setTitle('Party Link Info:');
    let lInfo = require(path.join(__dirname, '../../handlers/DiepAddons')).getInfo(message.cleanContent);
    if (lInfo.code == null) return;
    bad.addField('Gamemode:', `**${lInfo.gamemode}**`, true);
    bad.addField('Location: ', `**${lInfo.location}**`, true);
    bad.addField('Code:', lInfo.code);
    bad.addField('Host:', lInfo.host, true);
    bad.addField('Ip:', `${lInfo.ip}`, true);
    bad.addField('Port:', `${lInfo.port}`, true);
    bad.addField('Link:', `**[${lInfo.link}](${lInfo.link})**`, true);
    message.channel.send('Invite link detected!', { embed: bad });
  } catch (err) {
    // Not a party link or something went wrong.
  }
}

const handleAntiLink = message => new Promise(res => {
  if (!message.member) return res(false);
  if (message.member.hasPermission('ADMINISTRATOR')) return res(false);
  if (~client.antilinkExemptedC.indexOf(message.channel.id)) return res(false);
  const gid = message.guild.id;
  if (!client.antilink[gid]) return res(false);

  const content = message.content;

  let potentialInvite = content.match(/(d\s*i\s*s\s*c\s*o\s*r\s*d\s*\.\s*g\s*g|d\s*i\s*s\s*c\s*o\s*r\s*d\s*a\s*p\s*p\s*\.\s*c\s*o\s*m\s*\/\s*i\s*n\s*v\s*i\s*t\s*e|d\s*i\s*s\s*c\s*o\s*r\s*d\s*\.\s*i\s*o|d\s*i\s*s\s*c\s*o\s*r\s*d\s*\.\s*m\s*e)\s*\/\s*[\w\s.-]+/gi);
  if (!potentialInvite || !potentialInvite[0]) return res(false);

  potentialInvite = potentialInvite.join('¡™£¢∞§¶•ªº').replace(/\s+/g, '').split('¡™£¢∞§¶•ªº');
  potentialInvite.forEach(async ainvite => {
    if (ainvite.match(/(discord\.\io|discord\.me)\/\w+/gi)) {
      message.reply('Invites are disabled in this server! You have been warned...');
      message.delete().catch(() => console.log(`g${message.guild.id}: Could not delete msg (antilink)`));
      return res(true);
    } else {
      const matched = ainvite.match(/(discord\.gg|discordapp\.com\/invite)\/\w+/gi);
      if (!matched) return res(false);
      let invite;
      try {
        invite = await client.fetchInvite(matched);
      } catch (err) {
        return res(false);
      }
      if (invite.guild.id !== message.guild.id) {
        message.reply('Invites are disabled in this server! You have been warned...');
        message.delete().catch(() => console.log(`g${message.guild.id}: Could not delete msg (antilink)`));
        return res(true);
      }
    }
  });
  return res(false);
});

const handleThumbsReact = message => new Promise(res => {
  if (!message.guild) return res(false);
  if (message.member.hasPermission('ADMINISTRATOR')) return res(false);
  if (~client.ThumbsReactExemptedC.indexOf(message.channel.id)) return res(false);
  const gid = message.guild.id;
  if (!client.ThumbsReact[gid]) return res(false);

  if (message.content.replace(/\s+/g, '').match('evildeathshit')) {
    res(message.react(':thumbsup:'));
    res(message.react(':thumbsdown:'));
  }
  res(false);
});

const handleAntiDiepLink = message => new Promise(res => {
  if (!message.guild) return res(false);
  if (message.member.hasPermission('ADMINISTRATOR')) return res(false);
  if (~client.antiDiepLinkExemptedC.indexOf(message.channel.id)) return res(false);
  const gid = message.guild.id;
  if (!client.antiDiepLink[gid]) return res(false);

  if (message.content.replace(/\s+/g, '').match(/(?:(?:http(?:s)?\:\/\/)?diep(?:\.)?io)?\/#((?:(?:[0-9a-f]){2,2}){7,})(?:\/)?/i)) {
    message.reply('You are not allowed to post your diep links here!').then(mm => mm.delete({ timeout: 5000 }));
    res(message.delete());
  }
  res(false);
});
