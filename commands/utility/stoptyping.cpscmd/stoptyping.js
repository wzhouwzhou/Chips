'use strict';
module.exports = {
  name: "stoptyping",
  async func(msg, { reply, channel }) {
    await channel.stopTyping(true);
    return reply("Typing forcibly stopped!").then(m=>m.delete(3000));
  }
};
