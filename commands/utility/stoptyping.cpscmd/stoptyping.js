'use strict';
module.exports = {
  name: "stoptyping",
  async func(msg, { reply, channel }) {
    await channel.stopTyping(true);
    return reply("Typing forcibly stopped!").then(mm=>mm.delete({timeout: 3000}));
  }
};
