
const request = require("request");

module.exports = {
  name: "discordstatus",
  perm: ["global.Discord.status"],
  async func(msg, { send, reply }) {
    try{
      request(`https://srhpyqt94yxb.statuspage.io/api/v2/summary.json`,function(error, response, body){
        if (!error)
          try{
            reply(`[${JSON.parse(body).status.indicator=="none"?"Status":JSON.parse(body).status.indicator}]: ${JSON.parse(body).status.description}`);
          } catch(err) {
            console.log(err);
            return reply("Something went wrong getting Discord status!");
          }
        else
          return reply("Something went wrong getting data from Discord status servers!");
      });
    }catch(err){
      return reply("Something went wrong connecting to Discord status servers!");
    }
  }
};
