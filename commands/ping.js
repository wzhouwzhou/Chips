module.exports = {
  name: "ping",
  async func(msg, { send, member }) {
    let sentmessage;
    try {
      sentmsg = await send("Pong! ");
    } catch (err) { console.error(`Error at sending message of SetOutput: ${err}`); }

    return sentmsg.edit(`Pong! ${member.displayName}`).then(m=> {
      const diff = m.editedAt - m.createdAt;
      console.log("ping pong!" + member.user.username + "\t" + diff);
      return m.edit(`🏓\u2000Pong! (${diff} ms)`);
    });
  }
};
