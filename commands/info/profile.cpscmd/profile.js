const Jimp = require('jimp');
const fs = require('fs');

module.exports = {
  name: "profile",
  perm: ["server.help"],
  async func(msg, { author, member, guild, send }) {
    if(!guild) return send('Not in a server!');
    try{
      let timestamp = process.hrtime();

      let image = (await Jimp.read(path.join(__dirname,'../../../public/img/bg.png'))).clone();
      image.blur( 5 );

      let font = Jimp.FONT_SANS_64_BLACK;

      Jimp.loadFont( font ).then(async function (font) {
        image.print(font, 200-Math.floor((author.tag.length)/2), 50, author.tag.toString(),300);
        image.print(font, 200-Math.floor((member.displayName).length)/2, 100, member.displayName.toString(),300);
        let avatar = await Jimp.read(author.displayAvatarURL(256));
        image.blit(avatar,200,200);
        let filepath= `profile.${timestamp}.${image.getExtension()}`;
        image.write(filepath,()=>{
          send('User Profile',{files: [filepath]}).then(_=>{
            fs.unlinkSync(filepath);
          });
        });

      });
      /*
      image = await Jimp.read(path.join(__dirname,'../../../public/image/loading.gif'));
      await send('',{files: [image]});
      image = await Jimp.read(path.join(__dirname,'../../../public/image/bg.jpg'));
      await send('',{files: [image]});*/
    }catch (err){
      console.error(err);
    }
  }
};
