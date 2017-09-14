const DERP = 'https://cdn.discordapp.com/attachments/257895860757725186/357683542442115074/derp_2.jpeg';
const snekfetch = require('snekfetch');

module.exports = {
  name: "derp",
  async func(msg, { args, send }) {
    if(args[0])
      return await send(args.join(' ').replace(/[^\s]{1,2}/g, m=>`${m[0].toUpperCase()}${m[1]?m[1].toLowerCase():''}`));
    else 
      return await send('', { files: [{ attachment: (await snekfetch.get(DERP)).body }] });
  }
};
