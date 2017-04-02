module.exports = {
  name: "setoutput",
  async func(msg, { send, member, doEval }) {
    switch (member.id) {
      case "259209114268336129":
      case "265611625283715072":
        break;
      default:
        return send("You must be approved to use this command! " + member.displayName);
    }
    try {
      await doEval("testC = channel");
      send("Channel set!");
    } catch (err) {
      send("There was an error setting output channel! (It has been logged)");
      console.error("Error setting output channel: " + err);
    }
  }
};