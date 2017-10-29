const request = require('request');

module.exports = {
  name: 'discordstatus',
  perm: ['global.Discord.status'],
  async func(msg, { reply }) {
    try {
      request(`https://srhpyqt94yxb.statuspage.io/api/v2/summary.json`, (error, response, body) => {
        if (!error) {
          let b = JSON.parse(body);
          let updatetime = b.page.updated_at;
          try {
            reply(`[${b.status.indicator == 'none' ? 'Status' : b.status.indicator}]: ${b.status.description} (Last updated at ${updatetime})`);
          } catch (err) {
            console.log(err);
            return reply('Something went wrong getting Discord status!');
          }
        } else { return reply('Something went wrong getting data from Discord status servers!'); }
      });
    } catch (err) {
      return reply('Something went wrong connecting to Discord status servers!');
    }
  },
};
