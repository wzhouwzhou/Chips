
const got = require('got');
getBoobs = (callback) => {
  got('http://api.oboobs.ru/boobs/noise/10732').then(res => {
    try {
      callback(undefined, JSON.parse(res.body).file);
    } catch (err) {
      callback(err);
    }
  }).catch(callback);
};

module.exports = {
  name: "boobs",
  perm: ["server.nsfw"],
  async func(msg, { send, channel }) {
    let emb = new Discord.RichEmbed();
    if(channel.nsfw)
      return getBoobs((a,b)=>{
        emb.setImage(b);
        send(' ', {embed: emb});
      });
    else 
      return ("No NSFW commands are allowed in this channel!");
  }
};
