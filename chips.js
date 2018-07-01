/* eslint no-unused-vars: 'off', no-console: 'off', no-inline-comments: 'off' */
Object.defineProperty(exports, '__esModule', { value: true });
// Require('long-stack-traces');

const _ = global._ = require('lodash');
const OL1 = console.log;
console.log = (...args) => OL1(...args.map(e => (e + []).replace(new RegExp(`${_.escapeRegExp(__dirname)}`, 'gi'), '$.')));
const Constants = global.Constants = require('./setup/Constants');
const changeConsole_1 = require('./setup/logging/changeConsole');
let setShards = { id: null };
// Chips constants
global.stdin = process.openStdin();
const readline = require('readline');

global.path = require('path');
global.fs = require('fs');
const request = require('request');

// Const favicon = require('serve-favicon');
const Discord = require('discord.js');
global.Discord = Discord;
const client = global.client = new Discord.Client({
  fetchAllMembers: true,
  messageCacheMaxSize: 5,
  // MessageCacheLifetime:(30*60),
  // messageSweepInterval:(60*60*1)
});
global.clientutil = new Discord.ShardClientUtil(client);
setShards.id = client.shard.id;
global.hclient = new Discord.Client();
global.h2client = new Discord.Client();
global.h3client = new Discord.Client();
global.c2 = new Discord.Client();
global.c3 = new Discord.Client();
client.commands = {};
global.prefix = '-';
if (process.env.BETA === 'true' || process.env.BETA === true) global.prefix = '!!';
global.customprefix = {};
global.memberjoin = {
  msgs: {},
  autorole: {},
  autoname: {},
  antiraidEnabled: {},
  antiraidWelcome: {
    '257889450850254848': [
      '**<@&305302877641900052>  Welcome to SBK, please answer these here and wait to be verified:**',
      '1. If you got our invite online **send link** to webpage (not invite link) or **show us a photo** where ' +
        'you got our discord invite.\nIf you got it from a friend, please tell us who like so: ' +
        '**SomebodyHere#1234**.',

      '2. Please read <#404992099478405122>; will you follow the rules and agree to the bot TOS?',

      '3. What is your favourite diep.io tank?',
    ].join('\n'),

    '350750159988064256': [
      '**<@&404611847124156417>  Welcome to SinxSquad, please answer these here and wait to be verified:**',
      '1. If you got our invite online **send link** to webpage (not invite link) or **show us a photo** where ' +
        'you got our discord invite.\nIf you got it from a friend, please tell us who like so: ' +
        '**SomebodyHere#1234**.',

      '2. Please read <#350836867006201866>; will you follow the rules and ' +
        'agree to the bot TOS?',

      '3. What is your favourite diep.io tank?',
    ].join('\n'),

    '274260111415836675': [
      "**Hi there, and welcome to Duckio's Discord <@&409728175279702029>!** We advise you to read the rules. To be able to play, talk " +
      'with other fans, or even be able to meet Duckio, **you must send your own answers to these questions here** and wait for staff.',
      "\n__**Do not copy other people's answers:**__",
      '`[1]` Where did you receive the link to this server from? If from someone, who is the person who sent it to you?',
      '`[2]` If you know who Duckio is, what does Duckio primarily play on his channel?',
      '`[3]` Do you know anyone in this server? If you do, who do you know?',
      '`[4]` Do you agree to all the rules? If you have any question about them ask a staff member after you get verified',
      '`[5]` Why did you join this server?',
      '\n\t__**NOTE**__\nIf you wanted to join the official DQ clan, join this server here: https://discord.gg/s95umtC',
    ].join('\n'),

    '302983444009451541': `Hai hoi! I'm just testing :>`,
    '250801092143611905': 'Welcome to Diep Colony! Please wait for online staff to verify you!',
    '384976959500845057': 'Welcome to Anxiety🔞! Please enjoy your stay!',
    '359801125882298378': 'Welcome! Please wait to be verified.',
    '291558782755012610': `<@&382955220478722058> Welcome to SickMania <@&385865868417957888>, make sure to read the <#366505552752148481> and <#312224217967886336>!
    **1) How did you get here?
    2) Why did you join?
    3) What is your favorite tank in Diep.io? (Say "skip" if you don't have one!)
    4) Do you promise to read rules & information?**
    __Staff can verify you using \`vs ok [mention]!__`,
  },
  captcha: {
    '302983444009451541': true,
    '257889450850254848': false,
    '250801092143611905': false,
    '329024870887456768': true,
    '359801125882298378': false,
    '295601523050676226': true,
    '384976959500845057': false, // Anxiety🔞
    '339930093042532363': true,
    '300727201119076352': false,
    '291558782755012610': false, // SickMania
    '295415817414377474': false,
  },
  panics: {
    0: false,
  },
  panicKick: {
    0: false,
  },
  panicBan: {
    o: false,
  },
  antiraidOldVL: { // Guild: verif lvl
    0: 0,
  },
  lastjoin: { // Guild: {userid: Date}
    0: { 0: {} },
  },
  verifyLogC: {
    '257889450850254848': '260864259330801674',
    '250801092143611905': '329719279132082176',
    '274260111415836675': '320220288195493890',
    '350750159988064256': '404608646174081025',
  },
};

client.memberjoin = global.memberjoin;

global.memberleave = {
  msgs: {},
};

client.disableSelfStar = {
  '257889450850254848': true,
  '302600674846310401': true,
  '323867107840229376': true,
  '274260111415836675': true,
  '350750159988064256': true,
  '359801125882298378': true, //NSFW EMPIRE
  '195278167181754369': true, //Diep Cord
};
const { BotDatabase } = require('./rewrite-all/src/struct/util/BotDatabase');
client.database = new BotDatabase(client);// Require(path.join(__dirname, './setup/db/DatabaseLoader'));
// client.database = database;
client.database.connect();
/** Other Global Constants **/
global.moment = require('moment');

const chalk = global.chalk = require('chalk');
chalk.enabled = true;
const Messager = global.Messager = new (require('events'));
global.Command = require('./handlers/Command');
const permissions = global.permissions = require('./handlers/Permissions.js');
global.CommandHandler = require('./handlers/CommandHandler')({ _, Discord, client, permissions, Constants, Messager, moment });

global.rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
global.nMsgs = 0;
global.sMsgs = 0;
global.sxMsgs = 0;
global.stMsgs = 0;
global.snMsgs = 0;
global.okSpamLogs = { 0: 0 };
global.currentOkInterval = { 0: 0 };
global.filter = require('./handlers/Filter')();

global.monitorMode = false;
global.client.searchers = global.searchers = { 0: null };
/** End Global Constants **/

// Shard setup
changeConsole_1.default(false, setShards);
console.log('Initializing...');

/** Events **/
process.on('unhandledRejection', rejection => {
  console.log(chalk.red('[ERR]'), `${rejection}|${rejection.message}\nStack:${rejection.stack}`);
});
// Messenger events
global.Messager.on('eval', ({ evalContent, vars, timestamp }) => {
  const { msg, message, channel, guild, send, reply, content, noprefix, prefix, c, author, member, delay, loadingBar } = vars;
  console.log(`Messager received some eval of ${evalContent}`);
  try {
    console.log(`Messager part: dideval${timestamp}`);
    Messager.emit(`dideval${timestamp}`, {
      result: eval(evalContent),
      err: false,
    });
  } catch (err) {
    console.log(`Error at eval Messager: ${err}`);
    Messager.emit(`dideval${timestamp}`, {
      result: err,
      err: true,
    });
  }
});

// Functions
const send = (message, c) => { c.send(message, { disableEveryone: true }); };

global.send2 = (message, c) => {
  if (c == null || message.author.id == client.user.id) return;

  let mainContent = new Discord.MessageEmbed()
    .setAuthor(`${message.author.username}#${message.author.discriminator}\nUser ID: ${message.author.id}`)
    .setColor(205)
    .addField('message id:', message.id, true)
    .setThumbnail(message.author.displayAvatarURL)
    .setTitle(moment(message.timestamp).format('ddd, Do of MMM @ HH:mm:ss.SSSS'))
    .addField('channel name: ', message.channel.name)
    .addField('channel id: ', message.channel.id);
  if (message.cleanContent == '') mainContent.addField(message.author.username, '[ERR]--No Content in Message--');
  else mainContent.addField(message.author.username, message.cleanContent);
  if (message.attachments.length > 1) mainContent.addField('Status:', 'More than one attachment received..');
  if (message.attachments.first() != null) mainContent.addField('Attachment URL: ', message.attachments.first().url);
  c.send(' ', { embed: mainContent });
};

function selfping() {
  request('https://chipsbot.herokuapp.com/', _ => _);
  require('./handlers/DiepAddons').getServers();
  let memtotals = 0.00;
  clientutil.broadcastEval(`
    let memusage = parseFloat((process.memoryUsage().heapUsed / 1024 / 1024));
    memusage;
  `).then(results => {
    results.forEach(shardStat => {
      memtotals += shardStat;
    });
    if (memtotals > 1200) clientutil.broadcastEval('process.exit(100)');
  });
}

function msgStatus() {
  let statsE = new Discord.MessageEmbed()
    .setColor(205)
    .addField('Spy update:', 'Message counts: ', true)
    .setTitle(moment().format('ddd, Do of MMM @ HH:mm:ss.SSS'))
    .addField('Num msgs in sk: ', `${sMsgs} msgs`)
    .addField('Num msgs in nebula: ', `${nMsgs} msgs`)
    .addField('Num msgs in sinx: ', `${sxMsgs} msgs`)
    .addField('Num msgs in sttoc: ', `${stMsgs} msgs`)
    .addField('Num msgs in snap: ', `${snMsgs} msgs`);
  if (statusC) statusC.send(' ', { embed: statsE });
  sMsgs = 0;
  nMsgs = 0;
  sxMsgs = 0;
  stMsgs = 0;
  snMsgs = 0;
}

require('./setup/events/Ready')(send);
require('./setup/events/ClientMessage')();

setInterval(selfping, 1000 * 60 * 10);
// SetInterval(msgStatus, 1000*60*30);
