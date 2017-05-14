module.exports = {
  name: "isNID",
  async func(msg, { send, member, author, content, channel, guild, args, gMember, Discord }) {
    const used = member || author;
    if(!used.hasPermission("BAN_MEMBERS")){
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
    }
    return reply("This command is being deprecated, please use nR ")
    /*
    let QUIET = false;

    if (!args[0]) return send("No user given :(");
    const target = args[0];
    // console.log("Target: "+target);

    let neb=c3.guilds.get(Constants.servers.NEB);
    neb.fetchMember(target).then(u => {
      if(!QUIET)
        return send(target + ": 1");
      else
        return console.log(target + ": 1");
    }).catch(err => {
      if(!QUIET)
        return send(target + ": 0");
      else
        return console.log(target + ": 0");
    });*/
  }
};
