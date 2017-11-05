const Jimp = require('jimp');
const fs = require('fs');
const jr = require('util').promisify(Jimp.read);
let fnt;

module.exports = {
  name: 'insult',
  async func(msg, { send, author, Discord }) {
    if (!fnt) fnt = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
    let name = 'hi.png';
    let text = msg.mentions.users.first() ? msg.mentions.users.first().username : author.username;

    let meme = (await jr('https://i.imgur.com/LHQEE08.png')).resize(Jimp.AUTO, 1024).rotate(54);
    await meme.print(fnt, 200, 665, text.split('').join(' '), 380);

    return new Promise((res, rej) => meme.rotate(-54).crop(500, 350, 770, 1100).write(name, () =>
      send(new Discord.MessageEmbed().attachFiles([name]).setImage(`attachment://${name}`))
      .then(mm => {
        fs.unlinkSync(name);
        res(mm);
      })
      .catch(rej)
    ));
  },
};
