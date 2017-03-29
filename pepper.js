const Discord = require("discord.js");
const client = new Discord.Client();
const readline = require('readline')

const prefix = "-";

client.login("Mjk2NDA4NDIwMDg3NjI3Nzc2.C7xzXQ.GAtbiTb2jmdPzm3IkUnlrBwvWtY");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

client.on('ready', () => {
  console.log('Pepper is ready!');
});

client.on("message", (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  if (message.content.startsWith(prefix+"help")) {
    message.channel.sendMessage("-help for this help message.");
  }else if (message.content.startsWith(prefix+ "ping")) {
    message.channel.sendMessage("pong! " + message.channel.guild.member(message.author).displayName);
    console.log("ping pong!" + message.author.username)
  }else if(message.content.startsWith(prefix+"listen")) {
    const channel = message.channel;
    rl.question("Input? ", function(answer) {
      console.log("Msg:", answer);
      channel.sendMessage(answer);
      //rl.close();
    });
  }
});
