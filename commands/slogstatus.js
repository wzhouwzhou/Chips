
module.exports = {
  name: "slogstatus",
  async func(msg, { send, Discord }) {
    let emb = new Discord.RichEmbed()
      .setColor(205)
      .addField("Spy update:", "Message count: ",true)
      .setTitle(moment(msg.timestamp).format('ddd, Do of MMM @ HH:mm:ss.SSS'))
      .addField("Num msgs in sk: ", `${sMsgs} msgs`)
      .addField("Num msgs in nebula: ", `${nMsgs} msgs`)
      .addField("Num msgs in sinx: ", `${sxMsgs} msgs`)
      .addField("Num msgs in sttoc: ", `${stMsgs} msgs`);
    statusC.sendEmbed(emb);
  }
};
