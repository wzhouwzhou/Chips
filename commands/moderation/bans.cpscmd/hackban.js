//const Searcher = require(path.join(__dirname, '../handlers/Searcher'));
const EXPIRE = 10000;

module.exports = {
  name:'hackban',
  async func(msg, { send, reply, author, args, channel, guild, client }) {
    let memberToUse;
    try{
      if(!args[0]) return reply("Please specify a user to ban!");
      let memberToUse = (args[0].match(/^[^]*<@!?(\d+)>[^]*$/)||[null, null])[1];
      if(!memberToUse||isNaN(memberToUse)) return reply("Please specify a valid user to ban!");

      let temp = guild.members.get(memberToUse);
      if(temp) return reply("Target user is in this server! Use -ban instead.");

      if(memberToUse[0]==='') return reply("Invalid user!");

      if(memberToUse === author.id)
        return reply("I can't let you ban yourself >.>");
    }catch(err){ //Something extremely weird has happened:
      console.log(err);
      return reply("I like chips.");
    }
    let dm = false;
    let reason;
    if(args[1])
      if(args[1].toLowerCase() === 'dm'){
        reason = _.drop(_.drop(args)).join(' ');
        dm = true;
      }else
        reason = _.drop(args).join(' ');

    if(reason == null)
      reason = "No reason provided.";
    let user=null, found=false;
    try{
      user = await client.fetchUser(memberToUse);

      if(user){
        console.log("Hackban target user found: "+ user.id);
        found = true;
      }
    }catch(err){
      console.error(err);
    }

    const embed = new Discord.RichEmbed();
    embed
      .setAuthor(`Ban confirmation - Banning: ${found?user.tag:memberToUse}`, found?user.displayAvatarURL:client.user.displayAvatarURL)
      .setColor("RED")
      .setDescription(reason || "No reason")
      .setTimestamp(new Date())
      .setThumbnail(Constants.images.WARNING);
    let question = `"Do you want to hackban <@${memberToUse}>?\nThis expires in 10 seconds. Type __y__es or __n__o.`;
    await send(question, {embed: embed});
    let confirmed = false, agreed=false;

    let collector = channel.createMessageCollector(m => {
        if(/^(?:y(?:es)?)|(?:no?)$/i.test(m.content)){
          if(m.author.id===author.id){
            m.channel.send("Choice accepted. Now processing...").then(m => m.delete(3000));
            confirmed = true;
            agreed = /^(?:y(?:es)?)$/i.test(m.content);
            setTimeout(()=>collector.stop(), 1000);
            return true;
          }
        }
      },
      { time: EXPIRE }
    );
    collector.on('collect', _ => _);
    collector.on('end', collected => {
      if(!confirmed) return reply('Ban timed out');
      else{
        let m = collected.first();
        console.log(`[Ban]: Collected ${m.content}`);
        if(m.author.id!=author.id) return;
        if(agreed){
          console.log("[Ban] Banning...");
          let emb = new Discord.RichEmbed()
            .setAuthor("Ban Notice!")
            .setTitle(`You were banned from the server: ${guild.name}!`)
            .setColor(9109504)
            .setThumbnail(Constants.images.WARNING)
            .addField("Ban reason: ", `${reason?reason:"None provided"}`, true);
          client.fetchUser(memberToUse).then(async u=>{
            try{
              if(dm)
                await u.send('Uh oh!', {embed: emb});
              await m.reply("Banning!");
              guild.ban(memberToUse.toString(), {reason: `[BAN]: [Author]: ${m.author.tag} [Reason]: ${reason}`});
            }catch(err){
              console.log(err);
              if(dm)
                m.reply("Could not dm the user, but banning anyway!");
              guild.ban(memberToUse.toString(), {reason: `[BAN]: [Author]: ${m.author.tag} [Reason]: ${reason}`});
            }
          });
        }else{
          console.log("[Ban] cancelled");
          m.reply("Ok, ban cancelled!");
        }
      }
    });
  }
};
