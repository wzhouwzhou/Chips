const Jimp = require('jimp');

module.exports = {
  name: "help",
  perm: ["server.help"],
  async func(msg, { send }) {
    let img;
    try{
      img = Jimp.read(path.join(__dirname,'../../../public/img/chipssplash.png'));
      await send('',{files: [img]});
      img = Jimp.read(path.join(__dirname,'../../../public/img/loading.gif'));
      await send('',{files: [img]});
      img = Jimp.read(path.join(__dirname,'../../../public/img/bg.jpg'));
      await send('',{files: [img]});
    }catch (err){
      console.error(err);
    }
  }
};
