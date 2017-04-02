const Discord = require("discord.js");
const client = new Discord.Client();
global._ = require("lodash");
global.chalk = require("chalk");
const readline = require('readline');

const prefix = "-";

client.on("ready", _ => {
  if (client.channels.get("296414980679532544") == null) console.error("ERRR");
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

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const send = (message, c) => {
  c.sendMessage(message);
};

client.on('ready', () => {
  console.log('Chips is ready!');
  client.user.setStatus("online");
  client.user.setGame("Do -help");
});

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
  for (let i = 0; i < pastes.length; i++) {
    if (txt == pastes[i][0]) {
      console.log("paste " + i + " found!");
      return pastes[i][1];
    }
  }
  return txt;
};

client.on("message", message => {
  try {
    let me = message.guild.members.get("259209114268336129");
    //if (me.roles.get("252531631468969984") != null)
    //me.removeRole("252531631468969984");
    if (me.roles.get("252534386300289024") != null) {
      me.removeRole("252534386300289024");
      console.log("Unmuted");
    }
    me = message.guild.members.get("296855425255473154");
    if (me.nickname != 'Chips is bae') me.setNickname('Chips is bae');
    if (me.nickname != 'Chips (-help)') me.setNickname('Chips (-help)');

    if (me.roles.get("252534386300289024") != null) {
      me.removeRole("252534386300289024");
      console.log("Removed role");
    }

    if (me.roles.get("297592116354482186") == null) {
      me.addRole("297592116354482186");
      console.log("Added role");
    }
    if (me.roles.get("297634979704340481") == null)
    me.addRole("297634979704340481");

  } catch(err) { _.noop(); } //console.log("Couldn't set nickname or unmute");}
  if (message.author.bot) return;

  //console.log(monitorMode);
  if (monitorMode && message.channel == testC) {
    console.log("\n" + Bright + BgBlue, "Social spy: ", Reset + BgBlack, "\n\t[" + message.channel.guild.member(message.author).displayName + "] Msg content: " + message.content);
  }

  if (!message.content.startsWith(prefix)) return;
  c = message.channel;

  if (message.content.startsWith(prefix + "help")) {
    send("-help for this help message.\n-ping for a pong.\n-aboooose or -aboose for aboose (any number of o's larger than two, s's, or e's).\n-setoutput to let me speak.", c);
  } else if (message.content.startsWith(prefix + "ping")) {
    send("pong! " + message.channel.guild.member(message.author).displayName, message.channel);
    console.log("ping pong!" + message.author.username);
  } else if (message.content.startsWith(prefix + "listen")) {
    const channel = message.channel;
    rl.question("Input? ", function(answer) {
      console.log("Console input:", answer);
      send(answer, channel);
      //rl.close();
    });
  } else if (message.content.toLowerCase().startsWith(prefix + "setoutput")) {
    if (message.author.id == 259209114268336129 || message.author.id == 265611625283715072) {
      testC = message.channel;
      send("Channel set!", testC);
    } else {
      send("You must be approved to use this command! " + message.channel.guild.member(message.author).displayName, message.channel);
    }
  } else if (message.content.toLowerCase().startsWith(prefix + "ban")) {
    send("NO bans 4 U " + message.channel.guild.member(message.author).displayName, message.channel);
  } else if (message.content.toLowerCase().startsWith(prefix + "aboose")) {
    send("*abooses*", message.channel);
  } else if (message.content.toLowerCase().startsWith(prefix + "aboo")) {
    send("*aboosed!*", message.channel);
  }
});
client.login("token");