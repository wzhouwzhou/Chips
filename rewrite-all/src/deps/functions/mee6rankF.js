'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

const needle = require('needle');
const m6api = 'https://mee6.xyz/levels/';
const m6apiSuffix = '?limit=-1&json=1';
mee6Rank = (sid, uid) => {
  return new Promise((res, rej) => {
    if(!sid) rej('No server id');
    if(!uid) rej('No user id');

    needle.get(`${m6api}${sid}${m6apiSuffix}`, (error, resp)=>{
      if(error) return rej(error);
      if(resp.statusCode!=200) return rej(resp.statusCode);
      let members;
      try{
        members = resp.body.players;
        if(!members||members.length<1) throw new Error('No members');
      }catch(err){
        console.error(err);
        return rej('Not registered');
      }
      const filter = (user) => user.id == uid;
      const userI = members.findIndex(filter);
      if(!userI||userI<0) return res(null);
      const userO = members[userI];
      const data = Object.assign({}, userO,
        {
          rank: userI+1,
          lb_length: members.length,
        }
      );
      delete data.avatar;
      delete data.discriminator;
      res(data);
    });
  });
};

exports.mee6Rank = mee6Rank;
