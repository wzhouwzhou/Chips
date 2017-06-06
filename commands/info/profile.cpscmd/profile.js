const Jimp = require('jimp');
const fs = require('fs');

module.exports = {
  name: "profile",
  perm: ["server.help"],
  async func(msg, { author, send }) {
    try{
      let timestamp = process.hrtime();

      let image = (await Jimp.read(path.join(__dirname,'../../../public/img/bg.png'))).clone();
      image.blur( 10 );

      let font = Jimp.FONT_SANS_16_BLACK;

      Jimp.loadFont( font ).then(function (font) {
        image.print(font, 50, 50, author.tag, 100);

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
