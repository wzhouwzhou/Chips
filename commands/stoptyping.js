'use strict';
module.exports = {
  name: "stoptyping",
  perm: ["global.stoptying"],
  async func(msg, { reply, channel }) {
    await channel.stopTyping(true);
    reply("Typing forcibly stopped!");
  }
};
