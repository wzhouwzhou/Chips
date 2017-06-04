const Jimp = require('jimp');

module.exports = {
  name: "help",
  perm: ["server.help"],
  async func(msg, { send }) {
    try{
      img = Jimp.read(path.join(__dirname,'public/img/chipssplash.png'));
      send('',{files: [img]});
    }catch (err){
      console.error(err);
    }
  }
};
