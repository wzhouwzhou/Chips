module.exports = {
  name: 'slogstatus',
  perm: ['global.owner'],
  async func(msg, { Discord }) {
    let emb = new Discord.MessageEmbed()
      .setColor(205)
      .addField('Current requested spy status:', 'Message count: ', true)
      .setTitle(moment(msg.timestamp).format('ddd, Do of MMM @ HH:mm:ss.SSS'))
      .addField('Num msgs in sk: ', `${sMsgs} msgs`)
      .addField('Num msgs in nebula: ', `${nMsgs} msgs`)
      .addField('Num msgs in sinx: ', `${sxMsgs} msgs`)
      .addField('Num msgs in sttoc: ', `${stMsgs} msgs`)
      .addField('Num msgs in snap: ', `${snMsgs} msgs`);
    statusC.sendEmbed(emb);
  },
};
