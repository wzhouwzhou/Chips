const Jimp = require('jimp');
const fs = require('fs');

module.exports = {
  name: "profile",
  perm: ["server.help"],
  async func(msg, { author, member, guild, send }) {
    if(!guild) return send('Not in a server!');
    try{
      let timestamp = process.hrtime();

      let image = (await Jimp.read(path.join(__dirname,'./profilebase.png'))).clone();

      let font = path.join(__dirname,'./genericafnt/font.fnt');

      Jimp.loadFont( font ).then(async function (font) {
        image.print(font, 200-Math.floor((author.tag.length)/2), 50, author.tag.toString());
        image.print(font, 200-Math.floor((member.displayName).length)/2, 200, member.displayName.toString());
        let avatar = await Jimp.read(author.avatarURL(512).replace('.webp','.png'));
        avatar.resize(300, 300);
        image.blit(avatar,200,300);
        let filepath= `${author.tag}profile${author.id}.${timestamp}.${image.getExtension()}`;
        image.write(filepath,async ()=>{
          await send('User Profile',{files: [filepath]});
          fs.unlinkSync(filepath);
        });

      });
    }catch (err){
      console.error(err);
    }
  }
};
