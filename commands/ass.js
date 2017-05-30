
const got = require('got');
getAss = (callback) => {
  got('http://api.obutts.ru/butts/noise/10732').then(res => {
    try {
      let length =  JSON.parse(res.body).length;
      callback(undefined, JSON.parse(res.body)[_.random(0,length)].preview);
    } catch (err) {
      callback(err);
    }
  }).catch(callback);
};

module.exports = {
  name: "ass",
  perm: ["server.nsfw"],
  async func(msg, { member, send, channel }) {
     let emb = new Discord.RichEmbed().setColor(member.displayColor);
    if(channel.nsfw)
      return getAss((a,b)=>{
        b='http://media.obutts.ru/'+b;
        emb.setImage(b);
        send(' ', {embed: emb});
      });
    else
      return ("No NSFW commands are allowed in this channel!");
  }
};
