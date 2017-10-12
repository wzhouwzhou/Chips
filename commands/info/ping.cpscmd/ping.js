module.exports = {
  name: "ping",
  async func(msg, { send, author, member, channel }) {
    channel.startTyping();
    let wsPing = client.ping;
    let now = Date.now();
    let sentmsg;
    try {
      sentmsg = await send("Pong! ");
    } catch (err) { return console.error(`Error at sending message of Ping: ${err}`); }
    let sendMetrics = Date.now() - now;

    const m = await sentmsg.edit(`Pong!`);
    const editMetrics = m.editedAt - m.createdAt;

    //const edit1 = m.editedAt;
    //await sentmsg.react('🇭');
    const now2 = Date.now();
    await sentmsg.react('🇮');
    now = Date.now();
    const reactMetrics = (now - now2)/2;
    let creactMetrics;
    try{
      await sentmsg.clearReactions();
      creactMetrics = (Date.now() - now);
    }catch(err){
      creactMetrics = "No data could be collected..perhaps I am missing permissions";
    }
    now = Date.now();
    await sentmsg.delete();
    const delMetrics = Date.now() - now;

    let weighted;
    if(!isNaN(creactMetrics)) // weight: 10%/25%/20%/10%/10%/25%
      weighted = (wsPing/10)+(sendMetrics/4)+(editMetrics/5)+(reactMetrics/10)+(creactMetrics/10)+(delMetrics/4);
    else                      // weight: 11%/26%/21%/11%/00%/21%
      weighted = (wsPing*0.11)+(sendMetrics*0.26)+(editMetrics*0.21)+(reactMetrics*0.11)+(delMetrics*0.21);

    let scale = '';
    if(weighted < 100) scale = "That's amazing!";
    else if(weighted < 200) scale = "That's very good!";
    else if(weighted < 300) scale = "That's pretty decent!";
    else if(weighted < 400) scale = "That's about average!";
    else if(weighted < 500) scale = "That's slightly below average!";
    else if(weighted < 600) scale = "I might be lagging a bit!";
    else if(weighted < 700) scale = "I think I am lagging a fair amount! Try doing -discordstatus to see if it's a problem on Discord's end!";
    else if(weighted < 800) scale = "Perhaps I am having issues with the internet! Try doing -discordstatus to see if it's a problem on Discord's end!";
    else if(weighted < 900) scale = "That's pretty bad! Try doing -discordstatus to see if it's a problem on Discord's end!";
    else if(weighted < 1000)scale = "That's poor! Perhaps I just restarted? Try doing -discordstatus to see if it's a problem on Discord's end!";
    else if(weighted > 1000)scale = "Help! Something must be wrong with me or Discord! Perhaps I just restarted? Try doing -discordstatus to see if it's a problem on Discord's end!";

    console.log("ping pong! " + author.username + "'s ping was " + wsPing + "ms!");

    database.sheets[`botlog`].addRow({time: `${moment().format('ddd, Do of MMM @ HH:mm:ss')}`, action: "Crowd report: ping", mainvalue: wsPing, label: "ms"},(err) => {console.log(err);});

    let bad = new Discord.MessageEmbed().setColor(member?member.color:1).setTitle("**Ping Metrics**");
    bad.setDescription("All metrics are measured in milliseconds it takes to perform an action.");
    bad.addField("Connecting to Discord: ", wsPing.toFixed(2));
    bad.addField("Sending a msg: ", sendMetrics.toFixed(2));
    bad.addField("Editing a msg: ", editMetrics.toFixed(2));
    bad.addField("Reacting to a msg (rate limit): ", reactMetrics.toFixed(2));
    bad.addField("Clearing message reactions: ", typeof creactMetrics!='string'?creactMetrics.toFixed(2):creactMetrics);
    bad.addField("Deleting a msg: ", delMetrics.toFixed(2));
    channel.stopTyping();
    return send(`🏓\u2000Pong! <@${author.id}>, My weighted/overall ping is ${weighted.toFixed(2)}ms! ${scale}`, {embed: bad});
  }
};
