const Discord = require("discord.js");
const client = new Discord.Client();
const readline = require('readline')

const prefix = "-";

client.login("token");

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
  ["/unflip","┬─┬﻿ ノ( ゜-゜ノ)"],
  [":Thoughts:","<:Thoughts:278104583501381632>"]
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
  client.user.setStatus("online");
  client.user.setGame("Do -help");
});

const evalConsoleCommand = (txt) => {
  txt=detectPastes(txt);
  if(txt=="monitor"){
    monitorMode=true;
    console.log("\tActivating Monitor Mode");
  }else if(txt=="unmon"){
    monitorMode=false;
    console.log("\tDeactivating Monitor Mode");
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
  try{
    var me = message.guild.members.get("259209114268336129");
    //if(me.roles.get("252531631468969984")!=null)
    //me.removeRole("252531631468969984");
    if(me.roles.get("252534386300289024")!=null){
      me.removeRole("252534386300289024");
      console.log("Unmuted");
    }
    me = message.guild.members.get("296855425255473154");
    if(me.nickname!='Chips (-help)')
    me.setNickname('Chips (-help)');

    if(me.roles.get("252534386300289024")!=null){
      me.removeRole("252534386300289024");
      console.log("Removed role");
    }

    if(me.roles.get("297592116354482186")==null){
      me.addRole("297592116354482186");
      console.log("Added role");
    }
    if(me.roles.get("297634979704340481")==null)
    me.addRole("297634979704340481");

  }catch(err){}//console.log("Couldn't set nickname or unmute");}
  if (message.author.bot) return;

  //console.log(monitorMode);
  if(monitorMode&&message.channel==testC){
    console.log("\n"+Bright+BgBlue,"Social spy: ",Reset+BgBlack, "\n\t[" + message.channel.guild.member(message.author).displayName + "] Msg content: " + message.content);
  }

  if (!message.content.startsWith(prefix)) return;
  c = message.channel;

  if (message.content.startsWith(prefix+"help")) {
    send("-help for this help message.\n-ping for a pong.\n-aboooose or -aboose for aboose (any number of o's larger than two, s's, or e's).\n-setoutput to let me speak.",c);
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
    if(message.author.id==259209114268336129||message.author.id==265611625283715072){
      testC=message.channel;
      send("Channel set!",testC);
    }else{
      send("You must be approved to use this command! "+message.channel.guild.member(message.author).displayName,message.channel);
    }
  }else if(message.content.toLowerCase().startsWith(prefix+"ban")){
    send("NO bans 4 U "+message.channel.guild.member(message.author).displayName,message.channel);
  }else if(message.content.toLowerCase().startsWith(prefix+"aboose")){
    send("*abooses*",message.channel);
  }else if(message.content.toLowerCase().startsWith(prefix+"aboo")){
    send("*aboosed!*",message.channel);
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
