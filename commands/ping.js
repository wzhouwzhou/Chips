module.exports = {
  name: "ping",
  perm: ["global.ping"],
  async func(msg, { send, member, bot }) {
    let wsPing = client.ping;
    let now = Date.now();
    let sentmsg;
    try {
      sentmsg = await send("Pong! ");
    } catch (err) { return console.error(`Error at sending message of Ping: ${err}`); }
    let sendMetrics = Date.now() - now;

    const m = await sentmsg.edit(`Pong!`);
    const editMetrics = m.editedAt - m.createdAt;

    const edit1 = m.editedAt;
    await sentmsg.react('🇭');
    await sentmsg.react('🇮');
    now = Date.now();
    const reactMetrics = (now - edit1)/2;
    let creactMetrics;
    try{
      await sentmsg.clearReactions();
      creactMetrics = (Date.now() - now).toFixed(2);
    }catch(err){
      creactMetrics = "No data could be collected..perhaps I am missing permissions";
    }
    now = Date.now();
    await sentmsg.delete();
    const delMetrics = Date.now() - now;

    console.log("ping pong! " + member.user.username + "'s ping was " + wsPing + "ms!");
    database.sheets[`botlog`].addRow({time: `${moment().format('ddd, Do of MMM @ HH:mm:ss')}`, action: "Crowd report: ping", mainvalue: wsPing, label: "ms"},(err) => {console.log(err);});

    let bad = new Discord.RichEmbed().setColor(member.color).setTitle("**Ping Metrics**");
    bad.setDescription("All metrics are measured in milliseconds it takes to perform an action.");
    bad.addField("Connecting to Discord: ", wsPing.toFixed(2));
    bad.addField("Sending a msg: ", sendMetrics.toFixed(2));
    bad.addField("Editing a msg: ", editMetrics.toFixed(2));
    bad.addField("Reacting to a msg (rate limit): ", reactMetrics.toFixed(2));
    bad.addField("Clearing message reactions: ", creactMetrics);
    bad.addField("Deleting a msg: ", delMetrics.toFixed(2));

    return send("🏓\u2000Pong! <@" + member.user.id + ">", {embed: bad});
  }
};
