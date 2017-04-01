const Discord = require("discord.js");
const client = new Discord.Client();
const readline = require('readline')

const prefix = "-";

client.login("Mjk2ODU1NDI1MjU1NDczMTU0.C74TrQ.Zg3gySQraotlmkO1jsg6APQO-tg");

if(client.channels.get("296414980679532544")==null){console.log("ERRR");}

const stdin = process.openStdin();
var d="";

var monitorMode=false;

var testC;
var consoleTyping = false;
stdin.addListener('data', d =>
{
    if(testC==null){
      console.log("YOU HAVEN'T DEFINED AN OUTPUT CHANNEL");
      return;
    }
    if(consoleTyping==false){
      //d+=d.toString();
      consoleTyping=true;

      rl.question("\x1b[1mInput? \x1b[0m", function(txt) {
        console.log("\x1b[0m","\tConsole input:", txt);
        if(txt==""){
          consoleTyping=false;
        }else{
          evalConsoleCommand(txt);
          //rl.close();
          consoleTyping=false;
        }
      });
    }

  /*if(d.toString()=="botoff"){
    //console.log(content);
    //client.channels.get("296420294678020107").sendMessage(content);
    send(content.substring(1),testC);
    content="";
    console.log("\n");
  }
  content += d.toString();*/
});

const pastes = [
  ["/shrug","¯\\_(ツ)_/¯"],
  ["/tableflip","(╯°□°）╯︵ ┻━┻"],
  ["/unflip","┬─┬﻿ ノ( ゜-゜ノ)"]
];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const send = (message, c) => {
  c.sendMessage(message);
}

client.on('ready', () => {
  console.log('Chips is ready!');
});

const evalConsoleCommand = (txt) => {
  txt=detectPastes(txt);
  if(txt=="monitor"){
    monitorMode=true;
    console.log("\tActivating Monitor Mode");
  }else{
    send(txt, testC);
  }
}

const detectPastes = (txt) => {
  for(var i = 0; i<pastes.length;i++){
    if(txt==pastes[i][0])
    {
      console.log("paste "+i + " found!");
      return pastes[i][1];
    }
  }
  return txt;
}

client.on("message", (message) => {
  if (message.author.bot) return;

  //console.log(monitorMode);
  if(monitorMode&&message.channel==testC){
    console.log("\n"+Bright+BgBlue,"Social spy: ",Reset+BgBlack, "\n\t[" + message.channel.guild.member(message.author).displayName + "] Msg content: " + message.content);
  }

  if (!message.content.startsWith(prefix)) return;
  c = message.channel;

  if (message.content.startsWith(prefix+"help")) {
    send("-help for this help message.",c);
  }else if (message.content.startsWith(prefix+ "ping")) {
    send("pong! " + message.channel.guild.member(message.author).displayName, message.channel);
    console.log("ping pong!" + message.author.username)
  }else if(message.content.startsWith(prefix+"listen")) {
    const channel = message.channel;
    rl.question("Input? ", function(answer) {
      console.log("Console input:", answer);
      send(answer, channel);
      //rl.close();
    });
  }else if(message.content.toLowerCase().startsWith(prefix+"setoutput")){
    testC=message.channel;
    send("Channel set!",testC);
  }
});



const Reset = "\x1b[0m";
const Bright = "\x1b[1m"
const Dim = "\x1b[2m";
const Underscore = "\x1b[4m";
const Blink = "\x1b[5m";
const Reverse = "\x1b[7m";
const Hidden = "\x1b[8m";

const FgBlack = "\x1b[30m";
const FgRed = "\x1b[31m";
const FgGreen = "\x1b[32m";
const FgYellow = "\x1b[33m";
const FgBlue = "\x1b[34m";
const FgMagenta = "\x1b[35m";
const FgCyan = "\x1b[36m";
const FgWhite = "\x1b[37m";

const BgBlack = "\x1b[40m";
const BgRed = "\x1b[41m";
const BgGreen = "\x1b[42m";
const BgYellow = "\x1b[43m";
const BgBlue = "\x1b[44m";
const BgMagenta = "\x1b[45m";
const BgCyan = "\x1b[46m";
const BgWhite = "\x1b[47m";
