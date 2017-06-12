/* eslint no-unused-vars: "off" */
Object.defineProperty(exports, "__esModule", { value: true });
global.Constants = require("./setup/Constants");
const changeConsole_1 = require("./setup/logging/changeConsole");
let setShards = { id: null };
//Chips constants
global.stdin = process.openStdin();
const readline = require('readline');

global.path = require("path");
global.fs = require('fs');
const request = require('request');

//const favicon = require('serve-favicon');
global.Discord = require("discord.js");
global.client = new Discord.Client({
  fetchAllMembers:true,
});
global.clientutil = new Discord.ShardClientUtil(client);
setShards.id=client.shard.id;
global.hclient = new Discord.Client();
global.h2client = new Discord.Client();
global.h3client = new Discord.Client();
global.c2 = new Discord.Client();
global.c3 = new Discord.Client();
client.commands = {};
global.prefix = "-";
if(process.env.BETA=="true")prefix="!!";
global.customprefix = {};
global.memberjoin = {
  msgs: {},
  autorole: {},
  autoname: {},
  antiraidWelcome: {
    "257889450850254848": `<@&305302877641900052> Welcome to Sinbadx Knights! **If you would like to get verified and be able to speak in the other channels, please answer the following questions!** \n
  1. How did you hear about this server?
  2. Why did you join this server?
  3. Do you promise to read <#297263352252727296>?
  4. What is your favorite diep.io tank?
Make sure you send your answers in this channel (don't DM them)!`,

    "302983444009451541": `Hai hoi! I'm just testing :>`,
  },
  panics: {
    0: false,
  },
  antiraidOldVL:{ //guild: verif lvl
    0: 0,
  },
  lastjoin: { //guild: {userid: Date}
    0: {0: {}},
  },
};
global.memberleave = {
  msgs: {},
};

global.disableSelfStar = {
  "257889450850254848": true,
  "302600674846310401": true,
};

global.database = require(path.join(__dirname, './setup/db/DatabaseLoader'));
/** Other Global Constants **/
global.moment = require('moment');
global._ = require("lodash");
global.chalk = require("chalk");
global.Messager = new (require("events"));
global.Command = require("./handlers/Command");
global.CommandHandler = require("./handlers/CommandHandler")(Discord, client);
global.DMLogger;
global.rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
global.nMsgs=0;
global.sMsgs=0;
global.sxMsgs=0;
global.stMsgs=0;
global.snMsgs=0;
global.okSpamLogs = {"0":0};
global.currentOkInterval = {"0":0};
global.filter=require('./handlers/Filter')();

global.dmC;
global.monitorMode = false;
global.searchers = {0: null};
/** End Global Constants **/

//Shard setup
changeConsole_1.default(false, setShards);
console.log("Initializing...");

/** Events **/
process.on("unhandledRejection", (rejection) => {
    console.log(chalk.red("[ERR]"), rejection);
});
//Messenger events
Messager.on("eval", ({ evalContent, vars, timestamp }) => {
  const { msg, message, channel, guild, send, reply, content, noprefix, prefix, c, author, member } = vars;
  console.log("Messager received some eval of " + evalContent);
  try {
    console.log("Messager part: dideval" + timestamp);
    Messager.emit("dideval" + timestamp, {
      result: eval(evalContent),
      err: false
    });
  } catch(err) {
    console.log("Error at eval Messager: " + err);
    Messager.emit("dideval" + timestamp, {
      result: err,
      err: true
    });
  }
});

//Functions
const send = (message, c) => { c.send(message, {disableEveryone:true}); };

global.send2 = (message, c) => {
  if(c==null||message.author.id==client.user.id)return;

  let mainContent = new Discord.RichEmbed()
    .setAuthor(`${message.author.username}#${message.author.discriminator}\nUser ID: ${message.author.id}`)
    .setColor(205)
    .addField("message id:", message.id,true)
    .setThumbnail(message.author.displayAvatarURL)
    .setTitle(moment(message.timestamp).format('ddd, Do of MMM @ HH:mm:ss.SSSS'))
    .addField("channel name: ", message.channel.name)
    .addField("channel id: ", message.channel.id);
  if(message.cleanContent == "")
    mainContent.addField(message.author.username, "[ERR]--No Content in Message--");
  else
    mainContent.addField(message.author.username, message.cleanContent);
  if(message.attachments.length>1)
    mainContent.addField("Status:", "More than one attachment received..");
  if(message.attachments.first()!=null) mainContent.addField("Attachment URL: ", message.attachments.first().url);
  c.send(' ', {embed: mainContent});
};

function selfping() {
  request("https://chipsbot.herokuapp.com/", _=>_);
  require('./handlers/DiepAddons').getServers();
  let memtotals = 0.00;
  clientutil.broadcastEval(`
    let memusage = parseFloat((process.memoryUsage().heapUsed / 1024 / 1024));
    memusage;
  `).then(results=>{
    results.forEach(shardStat=>{
      memtotals+=shardStat;
    });
    if(memtotals>700)
      clientutil.broadcastEval('process.exit(100)');
  });
}

function msgStatus() {
  let statsE = new Discord.RichEmbed()
    .setColor(205)
    .addField("Spy update:", "Message counts: ",true)
    .setTitle(moment().format('ddd, Do of MMM @ HH:mm:ss.SSS'))
    .addField("Num msgs in sk: ", `${sMsgs} msgs`)
    .addField("Num msgs in nebula: ", `${nMsgs} msgs`)
    .addField("Num msgs in sinx: ", `${sxMsgs} msgs`)
    .addField("Num msgs in sttoc: ", `${stMsgs} msgs`)
    .addField("Num msgs in snap: ", `${snMsgs} msgs`);
  if(statusC)
    statusC.send(' ', {embed: statsE});
  sMsgs=0;
  nMsgs=0;
  sxMsgs=0;
  stMsgs=0;
  snMsgs=0;
}

require('./setup/events/Ready')(send);
require('./setup/events/ClientMessage')();
global.permissions = require('./handlers/Permissions.js');
setInterval(selfping, 1000*60*10);
setInterval(msgStatus, 1000*60*30);
