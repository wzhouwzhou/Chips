const Discord = require("discord.js");
const client = new Discord.Client();
const readline = require('readline')

const prefix = "-";

client.login("Mjk2NDA4NDIwMDg3NjI3Nzc2.C7xzXQ.GAtbiTb2jmdPzm3IkUnlrBwvWtY");

const stdin = process.openStdin();
let content = '';

var testC;

stdin.addListener('data', d => {
  if(d.toString()=="="){
    console.log(content);
    //client.channels.get("296420294678020107").sendMessage(content);
    send(content.substring(1),testC);
    content="";
  }
  content += d.toString();
});


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const send = (message, c) => {
  c.sendMessage(message);
}

client.on('ready', () => {
  console.log('Pepper is ready!');
});

client.on("message", (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  if (message.content.startsWith(prefix+"help")) {
    message.channel.sendMessage("-help for this help message.");
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
  }else if(message.content.startsWith(prefix+"setOutput")){
    testC=message.channel;
    send("Channel set!",testC);
  }
});
