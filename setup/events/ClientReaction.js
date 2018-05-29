module.exports = function() {
  client.on('messageReactionAdd', (react, user) => {
    if(user.id === '305776092822765568') return;
    if (user.id == client.user.id) return;

    // console.log('Reaction detected');
    if (react.message.channel.type == 'text') {
      // Console.log("Not in DM (->Starboard)");
      if (client.disableSelfStar[react.message.guild.id] && react.message.author.id == user.id) {
        if (react.emoji.toString() == Constants.emojis.STAR) {
          react.remove(user);
          react.message.channel.send(`<@${user.id}>, Self-starring is disabled in this server! (__**We'll remove AntiSelfStar from this server if this gets abused!**__)`).then(m => setTimeout(() => m.delete(), 5000)).catch(err => console.log(err));
        }
      }
      if (react.message.guild.id == '274260111415836675')
      // If(react.emoji.toString()==Constants.emojis.STAR)
      {
        react.message.guild.channels.get('451103831585980428').send(`${user.tag.replace(/@/g, '(at)')} just reacted with ${react.emoji.toString()} to a message in ${react.message.channel}`, { embed: new Discord.MessageEmbed().setDescription(react.message.content).setAuthor(react.message.author.tag)
          .setTimestamp(new Date())
          .setColor(react.message.member ? react.message.member.displayColor : _.random(0, 16777215)) });
      }
    }/* Else{
      if(react.message.author.id != client.user.id) return;
      console.log("DM channel emoji: " + react.emoji);
      if(react.message.author.id!=client.user.id) return;
      react.message.channel.sendMessage(`The emoji used is ${react.emoji}`);

      console.log("userid: " + user.id);
      console.log(`The emoji used is ${react.emoji}`);
      if(react.emoji.toString()=="1⃣"){react.message.channel.sendMessage("Hi: one (nothing to see here yet)");}
      else if(react.emoji.toString()=="2⃣"){react.message.channel.sendMessage("Hi: two");}
      else if(react.emoji.toString()==":three:"){react.message.channel.sendMessage("Hi: three");}
      react.message.delete();
    }*/
  });
};
