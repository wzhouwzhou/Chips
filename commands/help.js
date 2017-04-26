module.exports = {
  name: "help",
  async func(msg, { send, prefix }) {
    send(`**Main commands:**
      {}help for this help message.
      {}ping for ping pong.
      {}aboose for aboose.
      {}exposed for exposed.
      {}happy (new command, credits to Tani)
      {}listen for terminal input (Deprecated)
      {}setdm to set dmC\n**Restricted/Whitelisted commands:**
      {}emojiban to external-emoji ban someone.
      {}-ban to ban people.
      {}setoutput to define testC.
      {}setDM to define dmC.
      {}botpanic to force shutdown (Auto restart)`.replace(/{}/g, prefix));
  }
};
