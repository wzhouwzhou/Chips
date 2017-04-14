//Chips.js
/** Constants **/
global.Constants = require("./Constants");
//route loading
global.index = require("./routes/index");
global.login = require("./routes/login");
global.useroverview = require("./routes/useroverview");

const readline = require('readline');
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const Strategy = require('./lib').Strategy;
const fs = require('fs');
const request = require('request');
const app = require("./AppSetup")(bodyParser, cookieParser, passport, express, express(), Strategy, session);
const favicon = require('serve-favicon');
const moment = require('moment');
const Discord = require("discord.js");
const client = new Discord.Client();
const prefix = "-";
/** End Constants **/

/** Other Global Constants **/
global._ = require("lodash");
global.chalk = require("chalk");
global.Messager = new (require("events"));
global.Command = require("./Command");
global.CommandHandler = require("./CommandHandler")(Discord, client);
global.database = require("./DatabaseLoader");
global.DMLogger;
global.rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
global.logDB=database.sheets[`botlog`];
/** End Global Constants **/

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

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

client.commands = {};
fs.readdirSync("./commands").map(f => {
  if (/\.js/.test(f)) {
    const precmd = require(`./commands/${f}`);
    client.commands[precmd.name] = new Command(precmd);
  }
});

let testC, dmC;

client.on("ready", _ => {
  if (client.channels.get(Constants.channels.TEST) == null || client.channels.get(Constants.channels.DMS) == null) console.error("ERRR");
  else {
    testC = client.channels.get(Constants.channels.TEST);
    dmC = client.channels.get(Constants.channels.DMS);
  }
  console.log('Chips is ready!');
  client.user.setStatus("online");
  client.user.setGame("Do -help");
  DMLogger = require("./DMLogger")(Discord, client, dmC, moment);
  logDB.addRow({userid: `${moment().format('ddd, Do of MMM @ HH:mm:ss')}`, action: "restart"},(err) => {console.log(err);});
});

const stdin = process.openStdin();
client.on("debug", console.log);
let d = "";

let monitorMode = false;

let consoleTyping = false;
stdin.addListener('data', d => {
    if (testC == null) {
      return console.log("YOU HAVEN'T DEFINED AN OUTPUT CHANNEL");
    }
    if (consoleTyping == false) {
      consoleTyping = true;
      rl.question("\x1b[1mInput? \x1b[0m", txt => {
        console.log("\x1b[0m", "\tConsole input:", txt);
        if (txt == "") {
          consoleTyping = false;
        } else {
          evalConsoleCommand(txt);
          consoleTyping = false;
        }
      });
    }
});

const send = (message, c) => { c.sendMessage(message); };

const evalConsoleCommand = txt => {
  txt = detectPastes(txt);
  if (txt == "monitor") {
    monitorMode = true;
    console.log("\tActivating Monitor Mode");
  } else if (txt == "unmon") {
    monitorMode = false;
    console.log("\tDeactivating Monitor Mode");
  } else {
    send(txt, testC);
  }
};

const detectPastes = txt => {
  const pairPastes = _.toPairs(Constants.PASTES);
  for (const i in pairPastes) {
    if (txt == pairPastes[i][0]) {
      console.log("paste " + i + " found!");
      return pairPastes[i][1];
    }
  }
  return txt;
};

let submStep = {'id0': -1};

//steps {stepnum: ["Step1 text", numoptions]}
const steps = {
  0: ["Step 0 text: You've requested -helppt. React with 1 to continue.", 1],
  1: ["Step 1 text: Submission type", 3],
  2: ["Step 2 text: Gamemode", 4]
};

async function dmHandle (message) {
  DMLogger(message);
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
  do
    await msg.react(Constants.CHOICES[index]);
  while(++index<numChoices+1);
  await msg.react("❌");
}

client.on("message", message => {
  if (!message.guild){
    return dmHandle(message);
  }

  if (message.author.bot) return;

  //console.log(monitorMode);
  if (monitorMode && message.channel == testC) {
    console.log("\n", chalk.bold.bgBlue("Social spy: "), chalk.bgBlack("\n\t[" + message.author.username + "] message content: " + message.content));
  }

  if (!message.content.toLowerCase().startsWith(prefix.toLowerCase())) return;

  CommandHandler(message, prefix);
});

async function isntMe(react){
  return react.me;
}

client.on("messageReactionAdd", (react, user) => {
  if(user.id == client.user.id || react.message.author.id != client.user.id) return;

  console.log("Reaction detected");
  if (react.message.channel.type != 'dm') {
    console.console.log("Not in DM");
    return;
  }

  console.log("DM channel emoji: " + react.emoji);
  react.message.channel.sendMessage(`The emoji used is ${react.emoji}`);

  console.log("userid: " + user.id);
  console.log(`The emoji used is ${react.emoji}`);
  if(react.emoji.toString()=="1⃣"){react.message.channel.sendMessage("Hi: one");}
  else if(react.emoji.toString()==":two:"){react.message.channel.sendMessage("Hi: two");}
  else if(react.emoji.toString()==":three:"){react.message.channel.sendMessage("Hi: three");}
  react.message.delete();
});

function selfping() {
  request("https://chipsbot.herokuapp.com/", _=>_);
}
setInterval(selfping, 1000*60*10);

client.login(process.env.TOKEN);
