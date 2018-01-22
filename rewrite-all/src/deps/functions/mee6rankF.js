'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

exports.default = ({ needle = require('needle') } = {}) => {
  const m6api = 'https://api.mee6.xyz/plugins/levels/leaderboard/';
  const m6apiSuffix = '?page=';
  const mee6Rank = (sid, uid, page = 0) => new Promise((res, rej) => {
    if (!sid) rej(new Error('No server id'));
    if (!uid) rej(new Error('No user id'));

    needle.get(`${m6api}${sid}${m6apiSuffix}${page}`, (error, resp) => {
      if (error) return rej(error);
      if (resp.statusCode === 404 || ('status_code' in resp.body && resp.body.status_code === 404)) {
        if ('message' in resp.body) return rej(new Error(resp.body.message));
        return rej(new Error('Not registered'));
      }
      if (resp.statusCode !== 200) return rej(resp.statusCode);
      let members;
      try {
        members = resp.body.players;
        if (!members || resp.body.total < 1) throw new Error('No members');
      } catch (err) {
        console.error(err);
        return rej('Not registered');
      }
      const filter = user => user.id === uid;
      const userI = members.findIndex(filter);
      if (userI === undefined || userI === null || userI < 0) return res(exports.default(sid, uid, page + 1));
      const userO = members[userI];
      const data = Object.assign({}, userO,
        {
          rank: userI + 1,
          lb_length: members.length,
        }
      );
      data.discriminator = `0000${data.discriminator}`.split('').slice(-4).join``;
      delete data.avatar;
      delete data.discriminator;
      return res(data);
    });
  });

  return mee6Rank;
};
