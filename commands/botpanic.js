module.exports = {
  name: "botpanic",
  async func(msg, { send, reply, member, author, content, channel, guild, args, gMember, Discord }) {
    const used = member || author;
    switch (used.id) {
      case Constants.users.WILLYZ:
      case Constants.users.PGSUPER:
      case Constants.users.ZALGO:
      case Constants.users.XZLQ:
      case Constants.users.KONEKO:
        break;
      default:
        return reply(`No!`);
    }
    database.sheets[`botlog`].addRow({time: `${moment().format('ddd, Do of MMM @ HH:mm:ss')}`, action: "PANIC", mainvalue: "SIGTERM"},(err) => {console.log(`Error : ${err}`);});
    await send(`${member.displayName}, panic mode activated! Chips forcibly shutting down... (5 seconds)`);
    process.exit(-100);
  }
};
