module.exports = {
  name: "botpanic",
  async func(msg, { send, reply, member, author, client }) {
    const used = member || author;
    switch (used.id) {
      case Constants.users.WILLYZ:
      case Constants.users.PGSUPER:
      case Constants.users.XZLQ:
      case Constants.users.EVILDEATHPRO:
        break;
      default:
        return reply(`No!`);
    }
    database.sheets[`botlog`].addRow({time: `${moment().format('ddd, Do of MMM @ HH:mm:ss')}`, action: "PANIC", mainvalue: "SIGTERM"},(err) => {console.log(`Error : ${err}`);});
    await client.user.setStatus("idle");
    await client.user.setGame("Restarting");
    await send(`${member.displayName}, panic mode activated! Chips forcibly restarting! (Attempt immediate restart)`);
    await client.user.setStatus("invisible");
    process.exit(-100);
  }
};
