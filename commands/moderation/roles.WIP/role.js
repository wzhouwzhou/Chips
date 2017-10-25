module.exports = {
  name: "role",
  customperm: ["MANAGE_ROLES"],
  async func(msg, { reply, member, author, content, guild, args, gMember, Discord }) {
    if(!guild) return reply(`This action may only be used in a server!`);

    if (!args[0]) return send("No action given :(");

    if(args[0].toLowerCase()=="add"){
      let targetuser = args[0].match(Constants.patterns.MENTION)?args[0].match(Constants.patterns.MENTION)[1]:null;
    }else if(args[0].toLowerCase()=="remove"){

    }

    // console.log("Target: "+target);
    const split = content.replace(/\s+/g, ' ').trim().split(" ");
    let reason = split.slice(2, split.length).join(" ");
    if (reason == "") reason = "None";

    const mem = gMember(target);

    let ebanRole=guild.roles.find("name","Emoji Banned");
    if (ebanRole==null)
      ebanRole= await guild.createRole(
        { name: 'Emoji Banned'}
      );

    if(ebanRole==null)console.log("Error getting emoji banned role");

    const channels = guild.channels.filter(c => c.type === 'text');
    if(channels==null)console.log("Error getting text channels");
    for (const channel of channels.values())
      await channel.overwritePermissions(ebanRole, {
        USE_EXTERNAL_EMOJIS: false
      });

    mem.addRole(ebanRole);

    const usernm = mem.user.username;

    send(`<@${author.id}>, user ${usernm} emoji banned successfully!`);

    let emb = new Discord.MessageEmbed()
      .setAuthor("Emoji Ban Log")
      .setTitle(`<@${mem.user.id}> was emoji banned by <@${author.id}>`)
      .setColor(9109504)
      .setThumbnail(Constants.images.WARNING)
      .addField("Emoji Ban reason: ", `${reason}`, true);
  }
};
