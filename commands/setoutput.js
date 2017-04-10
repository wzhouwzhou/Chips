module.exports = {
  name: "setoutput",
  async func(msg, { send, member, author, doEval }) {
    const used = member || author;
    switch (used.id) {
      case Constants.users.WILLYZ:
      case Constants.users.PGSUPER:
        break;
      default:
        return send("You must be approved to use this command! " + member ? member.displayName : author.username);
    }
    let sentmsg;
    try {
      sentmsg = await send("Setting output...");
    } catch (err) { console.error(`Error at sending message of SetOutput: ${err}`); }
    try {
      await doEval("testC = channel");
      sentmsg && sentmsg.edit("Channel set!");
    } catch (err) {
      sentmsg && sentmsg.edit("There was an error setting output channel! (It has been logged)");
      console.error("Error setting output channel: " + err);
    }
  }
};