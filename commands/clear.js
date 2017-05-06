module.exports = {
  name: "clear",
  async func(msg, { channel, args, member, reply }) {
    const used = member || author;
    if(!used.hasPermission("MANAGE_MESSAGES")){
      switch (used.id) {
        case Constants.users.WILLYZ:
        case Constants.users.PGSUPER:
        case Constants.users.ZALGO:
        case Constants.users.XZLQ:
        case Constants.users.KONEKO:
        case Constants.users.NELYN:
        case Constants.users.LOAF:
        case Constants.users.ARX:
          break;
        default:
          return reply('You must have ``MANAGE_MESSAGES`` perms to use this command!');
      }
    }

    let nmsgs = parseInt(args[0]);
    if (nmsgs.toString() != args[0]) return reply(`Please enter a valid number of messages to clear.`);
    channel.bulkDelete(nmsgs);
    let result = await reply(`${nmsgs} deleted successfully!`);
    setTimeout(_=>result.delete(),5000);
  }
};
