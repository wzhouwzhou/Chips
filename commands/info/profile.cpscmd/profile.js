const Jimp = require('jimp');
const fs = require('fs');
const path = require('path');
const Constants = require(path.join(process.cwd(), './setup/Constants'));

const { pfpW, pfpY, pfpX } = Constants.profileSettings;

module.exports = {
  name: 'profile',
  async func(msg, { author, member, guild, send, channel }) {
    if (!guild) return send('Not in a server!');
    try {
      let timestamp = process.hrtime();

      let image = (await Jimp.read(path.join(__dirname, './profilebaseblank.png'))).clone();

      let ff = path.join(__dirname, './genericafnt/font.fnt');

      channel.startTyping();

      return Jimp.loadFont(ff).then(async font => {
        let avatar = await Jimp.read(author.displayAvatarURL.replace('.webp', '.png'));
        await avatar.resize(pfpW, pfpW);
        await image.blit(avatar, pfpX, pfpY);
        image.print(font, 5, 20, `User: ${author.tag}`);
        image.print(font, 5, 90, `Nickname: ${member.displayName}`);
        let filepath = `${author.tag}profile${author.id}.${timestamp}.${image.getExtension()}`;
        image.write(filepath, async() => {
          await send('User Profile', { files: [filepath] });
          fs.unlinkSync(filepath);
          channel.stopTyping();
        });
      });
    } catch (err) {
      send('Unable to fetch profile');
      throw err;
    }
  },
};
