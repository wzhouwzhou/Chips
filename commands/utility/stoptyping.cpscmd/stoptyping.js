'use strict';
module.exports = {
  name: "stoptyping",
  async func(msg, { reply, channel }) {
    await channel.stopTyping(true);
    return await reply("Typing forcibly stopped!");
  }
};
