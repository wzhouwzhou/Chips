
const snekfetch = require('snekfetch');
const got = require('got');
const getCat = () => {
  return new Promise( (resolve,rej)=>{
    got('http://www.random.cat/meow').then(res => {
      try{
        const f = JSON.parse(res.body).file;
        (f!=null)?resolve(f):rej('File not found');
      }catch(err){
        rej(err);
      }
    }).catch(rej);
  });
};

module.exports = {
  name: "cat",
  perm: ["server.cat"],
  async func(msg, { send, channel }) {
    channel.startTyping();
    try{
      await send('',{files: [{attachment: (await snekfetch.get(await getCat())).body}]});
    }catch(err){
      console.log(err);
      send('The cat photographer went missing!').catch(err => console.log(err));
    }
    channel.stopTyping();
  }
};

/*
getCat = () => {
  got('http://www.random.cat/meow').then(res => {
    try {
      callback(undefined, JSON.parse(res.body).file);
    } catch (err) {
      callback(err);
    }
  }).catch(callback);
};
*/
