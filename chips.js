const Discord = require("discord.js");
const client = new Discord.Client();
const readline = require('readline')

const prefix = "-";

client.login("Mjk2ODU1NDI1MjU1NDczMTU0.C74TrQ.Zg3gySQraotlmkO1jsg6APQO-tg");

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

      rl.question("Input? ", function(txt) {
        console.log("Console input:", txt);
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
    console.log("Activating Monitor Mode");
    txt=" ";
  }
  send(txt, testC);
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
  if(monitorMode){//&&message.channel==testC){
    console.log("\nSocial spy: [" + message.channel.guild.member(message.author).displayName + "] Msg content: " + message.content);
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
