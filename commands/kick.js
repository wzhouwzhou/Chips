const Searcher = require(path.join(__dirname, '../handlers/Searcher'));
const EXPIRE = 10000;

module.exports = {
	name:'kick',
  perm:['global.server.kick'],
	async func(msg, { send, reply, member, author, content, args, channel, guild, gMember }) {
    let memberToUse;
    try{ //get mention:
      console.log("Trying to find user by mention..");
      if(!args[0]) return reply("Please specify a user to kick!");
      let target = args[0].match(Constants.patterns.MENTION)[1];
      if(!target) return reply("Please specify a valid user to kick!");
      memberToUse = gMember(target);
      if(memberToUse==null)
        return reply("Invalid member!");
      if(member.id == memberToUse.id)
        return reply("I can't let you kick yourself >.>");
    }catch(err){  //gMember failed:
      console.log(err);
      return reply("I like chips.");
    }

    let reason;
    if(args[1])
      reason = content.substring(content.indexOf(args[1]));
		if(reason == null)
			reason = "No reason provided.";

    const embed = new Discord.RichEmbed();
    embed
      .setAuthor(`Kick confirmation - Kicking ${memberToUse.user.tag}`, memberToUse.user.displayAvatarURL)
      .setColor("RED")
      .setDescription(reason || "No reason")
      .setTimestamp(new Date())
      .setThumbnail(Constants.images.WARNING);
    let question = `"Do you want to kick ${memberToUse.nickname}?\nThis expires in 10 seconds. Type __y__es or __n__o.`;
    await send(question, {embed: embed});
    let confirmed = false, agreed=false;

    let collector = channel.createMessageCollector(m => {
        if(/^(?:y(?:es)?)|(?:no?)$/i.test(m.content)){
          if(m.author.id==author.id){
            m.reply("Choice accepted. Now processing...");
            confirmed = true;
            agreed = /^(?:y(?:es)?)$/i.test(m.content);
            setTimeout(_=>collector.stop(), 1000);
            return true;
          }
          //else return m.reply ("Denied");
        }
      },
      { time: EXPIRE }
    );
    collector.on('collect', m => {
      //if(confirmed) return collector.stop();
    });
    collector.on('end', collected => {
      if(!confirmed) return reply('Kick timed out');
      else{
        let m = collected.first();
        console.log(`[Kick]: Collected ${m.content}`);
        if(m.author.id!=author.id) return;
        if(agreed){
					if(!memberToUse.kickable) return reply("Uh oh! I can't kick this user!");
					
          console.log("[Kick] Kicking...");
					let emb = new Discord.RichEmbed()
			      .setAuthor("Kick Notice!")
			      .setTitle(`You were kicked from the server: ${guild.name}!`)
			      .setColor(9109504)
			      .setThumbnail(Constants.images.WARNING)
			      .addField("Kick reason: ", `${reason}`, true);
		    	memberToUse.send('Uh oh!', {embed: emb}).then(mes=>{
						m.reply("Kicking!");
						memberToUse.kick({reason: `[Kick]: [Author]: ${m.author.tag} [Reason]: ${reason}`});
					}).catch(err=>{
						m.reply("Could not dm the user, but kicking anyway!");
						memberToUse.kick({reason: `[Kick]: [Author]: ${m.author.tag} [Reason]: ${reason}`});
					});
        }else{
          console.log("[Kick] cancelled");
          m.reply("Ok, kick cancelled!");
        }
      }
    });
  }
};
