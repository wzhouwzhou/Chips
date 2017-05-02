module.exports = {
  name: "help",
  async func(msg, { send, prefix }) {
    send(`**Main commands:**
      **{}help** for this help message.
      **{}support** for chips' support server.
      **{}ping** for ping pong.
      **{}aboose** for aboose.
      **{}exposed** for exposed.
      **{}happy** (new command, credits to Tani)
      **{}eat** for your own bag of chips.
      **{}listen** for terminal input (Deprecated)\n**Restricted/Whitelisted commands:**
      {}emojiban to external-emoji ban someone.
      {}-ban to ban people (Disclaimer: This is a fake ban).
      {}botpanic to force shutdown (Auto restart)`.replace(/{}/g, prefix));
  }
};
