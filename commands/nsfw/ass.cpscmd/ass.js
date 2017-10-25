
const got = require('got');
getAss = (callback) => {
  got('http://api.obutts.ru/butts/noise/' + _.random(100,10732)).then(res => {
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
  async func(msg, { member, send, channel }) {
     let emb = new Discord.MessageEmbed().setColor(member.displayColor);
    if(channel.nsfw)
      return getAss((a,b)=>{
        if(a) return send('Something went wrong...');
        b='http://media.obutts.ru/'+b;
        emb.setImage(b);
        send(' ', {embed: emb});
      });
    else
      return ("No NSFW commands are allowed in this channel!");
  }
};
