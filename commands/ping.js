module.exports = {
  name: "ping",
  perm: ["global.ping"],
  async func(msg, { send, member }) {
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

    await sentmsg.delete();
    const delMetrics = Date.now() - edit1;

    console.log("ping pong! " + member.user.username + "'s ping was " + wsPing + "ms!");
    database.sheets[`botlog`].addRow({time: `${moment().format('ddd, Do of MMM @ HH:mm:ss')}`, action: "Crowd report: ping", mainvalue: wsPing, label: "ms"},(err) => {console.log(err);});

    let bad = new Discord.RichEmbed().setColor(member.color).setTitle("Ping Metrics").setDescription("All times are measured in milliseconds.");
    bad.addField("Connecting to Discord: ", wsPing);
    bad.addField("Sending a msg: ", sendMetrics);
    bad.addField("Editing a msg: ", editMetrics);
    bad.addField("Deleting msg: ", delMetrics);

    return send("🏓\u2000Pong! <@" + member.user.id + ">", {embed: bad});
  }
};
