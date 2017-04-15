module.exports = {
  name: "ping",
  async func(msg, { send, member }) {
    let sentmsg;
    try {
      sentmsg = await send("Pong! ");
    } catch (err) { return console.error(`Error at sending message of Ping: ${err}`); }

    const m = await sentmsg.edit(`Pong! <@${member.user.id}>`);
    const diff = m.editedAt - m.createdAt;
    console.log("ping pong! ms:" + member.user.username + "\t" + diff);
    database.sheets[`botlog`].addRow({time: `${moment().format('ddd, Do of MMM @ HH:mm:ss')}`, action: "Crowd report: ping", mainvalue: diff, label: "ms"},(err) => {console.log(err);});
    return m.edit("🏓\u2000Pong! <@" + member.user.id + ">, the ping is " + diff + "ms!");
  }
};
