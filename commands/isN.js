module.exports = {
  name: "isN",
  async func(msg, { send, member, author, content, channel, guild, args, gMember, Discord }) {
    const used = member || author;
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
        return;
    }

    if (!args[0]) return send("No user given :(");
    const target = args[0].match(Constants.patterns.MENTION)[1];
    // console.log("Target: "+target);

    const mem = gMember(target);

    let neb=c3.guilds.get(Constants.servers.NEB);
    if(neb.members.get(mem.user.id)==null)
      return send("0");
    else if(neb.members.get(mem.user.id)!=null)
      return send("1");
  }
};
