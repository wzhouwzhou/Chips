var express = require('express');

var request = require('request');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
  response.send('bot is alive!');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

const Discord = require("discord.js");

const client = new Discord.Client();
global._ = require("lodash");
global.chalk = require("chalk");
global.Messager = new (require("events"));
global.Command = require("./Command");
global.CommandHandler = require("./CommandHandler")(Discord, client);
const readline = require('readline');

Messager.on("eval", ({ evalContent, vars, timestamp }) => {
  const { msg, message, channel, guild, send, reply, content, noprefix, prefix, c, author, member } = vars;
  try {
    Messager.emit("dideval" + timestamp, {
      result: eval(evalContent),
      err: false
    });
  } catch(err) {
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

const prefix = "-";

client.on("ready", _ => {
  if (client.channels.get("296414980679532544") == null) console.error("ERRR");
  console.log('Chips is ready!');
  client.user.setStatus("online");
  client.user.setGame("Do -help");
});

const stdin = process.openStdin();
client.on("debug", console.log);
let d = "";

let monitorMode = false;

let testC;
let consoleTyping = false;
stdin.addListener('data', d => {
    if (testC == null) {
      console.log("YOU HAVEN'T DEFINED AN OUTPUT CHANNEL");
      return;
    }
    if (consoleTyping == false) {
      //d + = d.toString();
      consoleTyping = true;

      rl.question("\x1b[1mInput? \x1b[0m", txt => {
        console.log("\x1b[0m", "\tConsole input:", txt);
        if (txt == "") {
          consoleTyping = false;
        } else {
          evalConsoleCommand(txt);
          //rl.close();
          consoleTyping = false;
        }
      });
    }

  /*if (d.toString() == "botoff") {
    //console.log(content);
    //client.channels.get("296420294678020107").sendMessage(content);
    send(content.substring(1), testC);
    content = "";
    console.log("\n");
  }
  content + = d.toString();*/
});

const pastes = [
  ["/shrug", "¯\\_(ツ)_/¯"],
  ["/tableflip", "(╯°□°）╯︵ ┻━┻"],
  ["/unflip", "┬─┬﻿ ノ( ゜-゜ノ)"],
  [":Thoughts:", "<:Thoughts:278104583501381632>"]
];

global.rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const send = (message, c) => {
  c.sendMessage(message);
};

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
  for (const i in pastes) {
    if (txt == pastes[i][0]) {
      console.log("paste " + i + " found!");
      return pastes[i][1];
    }
  }
  return txt;
};

client.on("message", message => {
  if (!message.guild) return;
  try {
    let me = message.guild.members.get("259209114268336129");
    //if (me.roles.get("252531631468969984") != null)
    //me.removeRole("252531631468969984");
    if (me.roles.has("252534386300289024")) {
      me.removeRole("252534386300289024");
      console.log("Unmuted");
    }
    if (me.nickname != 'Chips is bae') me.setNickname('Chips is bae');
    me = message.guild.members.get("296855425255473154");
    if (me.nickname != 'Chips (-help)') me.setNickname('Chips (-help)');

    if (me.roles.has("252534386300289024")) {
      me.removeRole("252534386300289024");
      console.log("Removed role");
    }

    if (!me.roles.has("297592116354482186")) {
      me.addRole("297592116354482186");
      console.log("Added role");
    }
    if (!me.roles.has("297634979704340481"))
    me.addRole("297634979704340481");

  } catch(err) { _.noop(); } //console.log("Couldn't set nickname or unmute");}
  if (message.author.bot) return;

  //console.log(monitorMode);
  if (monitorMode && message.channel == testC) {
    console.log("\n", chalk.bold.bgBlue("Social spy: "), chalk.bgBlack("\n\t[" + message.member.displayName + "] Msg content: " + message.content));
  }

  if (!message.content.toLowerCase().startsWith(prefix.toLowerCase())) return;
  const c = message.channel;
  CommandHandler(message, prefix);
});
client.login(process.env.TOKEN);
