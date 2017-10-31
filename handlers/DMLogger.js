module.exports = function(Discord, client, dmC, moment) {
  return async message => {
    await log(message, Discord, client, dmC, moment);
  };
};

async function log(message, Discord, client, dmC, moment) {
  if (dmC == null || message.author.id == client.user.id) return;

  let mainContent = new Discord.MessageEmbed()
    .setAuthor(`DM Received!: ${message.author.username}#${message.author.discriminator}\nUser ID: ${message.author.id}`)
    .setColor(205)
    .addField('message id:', message.id, true)
    .setThumbnail(message.author.displayAvatarURL)
    .setTitle(moment(message.timestamp).format('ddd, Do of MMM @ HH:mm:ss'));
  if (message.cleanContent == '') mainContent.addField(message.author.username, '[ERR]--No Content in Message--');
  else mainContent.addField(message.author.username, message.cleanContent);
  if (message.attachments.length > 1) {
    mainContent.addField('More than one attachment received..');
    message.reply('Please only send one attachment at a time.');
  }
  if (message.attachments.first() != null) mainContent.addField('Attachment URL: ', message.attachments.first().url);
  dmC.sendEmbed(mainContent);

  let msgembeds = message.embeds;
  msgembeds.forEach(item => {
    dmC.sendEmbed(duplicateEmbed(item, Discord));
  });
}

const duplicateEmbed = (me, Discord) => {
  let bad = new Discord.MessageEmbed();
  if (me.author) bad.setAuthor(me.author.name, me.author.iconURL);
  if (me.color) bad.setColor(me.color);
  if (me.createdTimestamp);
  if (me.description) bad.setDescription(me.description);
  me.fields.forEach(fi => {
    bad.addField(fi.name, fi.value, fi.inline);
  });
  if (me.footer) bad.setFooter(me.footer.text, me.footer.iconURL);
  if (me.thumbnail) bad.setThumbnail(me.thumbnail.url);
  if (me.title) bad.setTitle(me.title);
  if (me.url) bad.setURL(me.url);
  return bad;
};
