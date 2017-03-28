const Discord = require("discord.js");
const client = new Discord.Client();

const prefix = "-";

client.login("Mjk2NDA4NDIwMDg3NjI3Nzc2.C7xzXQ.GAtbiTb2jmdPzm3IkUnlrBwvWtY");

client.on('ready', () => {
  console.log('Pepper is ready!');
});

client.on("message", (message) => {
  if (!message.content.startsWith(prefix)) return;

  if (message.content.startsWith(prefix+ "ping")) {
    message.channel.sendMessage("pong! " + message.channel.guild.member(message.author).displayName);
    console.log("ping pong!" + message.author.username)
  }
});
