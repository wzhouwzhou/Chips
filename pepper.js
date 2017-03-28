const Discord = require("discord.js");
const client = new Discord.Client();

client.login("Mjk2NDA4NDIwMDg3NjI3Nzc2.C7xzXQ.GAtbiTb2jmdPzm3IkUnlrBwvWtY");

client.on('ready', () => {
  console.log('Pepper is ready!');
});

client.on("message", (message) => {
  if (message.content.startsWith("ping")) {
    message.channel.sendMessage("pong!");
  }
});
