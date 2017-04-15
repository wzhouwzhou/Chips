module.exports = {
  name: "botpanic",
  async func(msg, { send, member, author, content, channel, guild, args, gMember, Discord }) {
    const used = member || author;
    switch (used.id) {
      case Constants.users.WILLYZ:
      case Constants.users.PGSUPER:
      case Constants.users.ZALGO:
      case Constants.users.XZLQ:
      case Constants.users.KONEKO:
        break;
      default:
        return send(`No I am not having a panic attack, ${member.displayName}!`);
    }
    
    await send(`${member.displayName}, panic mode activated! Chips shutting down...`);
    database.sheets[`botlog`].addRow({time: `${moment().format('ddd, Do of MMM @ HH:mm:ss')}`, action: "PANIC", mainvalue: -100, label: " (code)"},(err) => {console.log(`Error : ${err}`);});
    proc.exit(-100);
  }
};
