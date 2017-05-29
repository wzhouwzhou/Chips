
const got = require('got');
getAss = (callback) => {
  got('http://api.obutts.ru/butts/noise/10732').then(res => {
    try {
      callback(undefined, JSON.parse(res.body).file);
    } catch (err) {
      callback(err);
    }
  }).catch(callback);
};

module.exports = {
  name: "ass",
  perm: ["server.nsfw"],
  async func(msg, { send, channel }) {
    let emb = new Discord.RichEmbed();
    if(channel.nsfw)
      return getAss((a,b)=>{
        emb.setImage(b);
        send(' ', {embed: emb});
      });
    else 
      return ("No NSFW commands are allowed in this channel!");
  }
};
