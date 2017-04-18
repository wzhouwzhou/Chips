
module.exports = {
  name: "slogstatus",
  async func(msg, { send, Discord }) {
    let mainContent = new Discord.RichEmbed()
      .setColor(205)
      .addField("Half-Hourly spy update:", "",true)
      .setTitle(moment(message.timestamp).format('ddd, Do of MMM @ HH:mm:ss'))
      .addField("Num msgs in sk: ", sMsgs)
      .addField("Num msgs in nebula: ", nMsgs)
      .addField("Num msgs in sinx: ", sxMsgs);
    statusC.sendEmbed(mainContent);
  }
};
