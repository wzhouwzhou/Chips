const Jimp = require('jimp');

module.exports = {
  name: "help",
  perm: ["server.help"],
  async func(msg, { send }) {
    try{
      let image = (await Jimp.read(path.join(__dirname,'../../../public/image/chipssplash.png'))).clone();
      image.getBuffer( mime, async (buffer)=> {await send('',{files: [buffer]});});
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
